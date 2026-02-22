#!/usr/bin/env node
/**
 * Create Feishu Document from Report Content
 * Uses Feishu API to create and format cloud documents
 */

const https = require('https');

/**
 * Make API request to Feishu
 */
function feishuRequest(endpoint, method = 'POST', body = null) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'open.feishu.cn',
      port: 443,
      path: endpoint,
      method: method,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.FEISHU_TOKEN || 'YOUR_TOKEN'}`
      }
    };
    
    if (body) {
      options.headers['Content-Length'] = Buffer.byteLength(JSON.stringify(body));
    }
    
    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => {
        try {
          resolve(JSON.parse(data));
        } catch (e) {
          resolve({ raw: data });
        }
      });
    });
    
    req.on('error', reject);
    if (body) req.write(JSON.stringify(body));
    req.end();
  });
}

/**
 * Create Feishu document
 */
async function createDocument(title, content) {
  console.log(`Creating Feishu document: ${title}`);
  
  // Step 1: Create document
  const createResponse = await feishuRequest('/open-apis/docx/v1/documents', 'POST', {
    title: title
  });
  
  if (!createResponse.data || !createResponse.data.document_id) {
    throw new Error('Failed to create document: ' + JSON.stringify(createResponse));
  }
  
  const documentId = createResponse.data.document_id;
  console.log(`Document created: ${documentId}`);
  
  // Step 2: Get document token
  const docToken = createResponse.data.document_id; // Usually same as ID
  
  // Step 3: Create blocks with content
  // Split content into blocks (headings, paragraphs, etc.)
  const blocks = parseContentToBlocks(content);
  
  for (const block of blocks) {
    await feishuRequest(`/open-apis/docx/v1/documents/${docToken}/blocks`, 'POST', {
      parent_id: docToken,
      block_type: block.type,
      ...block.data
    });
  }
  
  console.log(`Document populated with ${blocks.length} blocks`);
  
  return {
    documentId,
    url: `https://feishu.cn/docx/${docToken}`
  };
}

/**
 * Parse markdown-like content into Feishu blocks
 */
function parseContentToBlocks(content) {
  const blocks = [];
  const lines = content.split('\n');
  
  for (const line of lines) {
    if (!line.trim()) continue;
    
    if (line.startsWith('# ')) {
      // Heading 1
      blocks.push({
        type: 1, // Heading1
        data: {
          heading1: {
            elements: [{ text_run: { content: line.slice(2) } }]
          }
        }
      });
    } else if (line.startsWith('## ')) {
      // Heading 2
      blocks.push({
        type: 2, // Heading2
        data: {
          heading2: {
            elements: [{ text_run: { content: line.slice(3) } }]
          }
        }
      });
    } else if (line.startsWith('### ')) {
      // Heading 3
      blocks.push({
        type: 3, // Heading3
        data: {
          heading3: {
            elements: [{ text_run: { content: line.slice(4) } }]
          }
        }
      });
    } else if (line.startsWith('- ')) {
      // Bullet point
      blocks.push({
        type: 4, // Bullet
        data: {
          bullet: {
            elements: [{ text_run: { content: line.slice(2) } }]
          }
        }
      });
    } else if (line.startsWith('---')) {
      // Divider
      blocks.push({
        type: 5, // Divider
        data: { divider: {} }
      });
    } else if (line.startsWith('> ')) {
      // Quote
      blocks.push({
        type: 6, // Quote
        data: {
          quote: {
            elements: [{ text_run: { content: line.slice(2) } }]
          }
        }
      });
    } else {
      // Regular text
      blocks.push({
        type: 7, // Text
        data: {
          text: {
            elements: [{ text_run: { content: line } }]
          }
        }
      });
    }
  }
  
  return blocks;
}

/**
 * Main function
 */
async function main() {
  const args = process.argv.slice(2);
  const titleArg = args.find(arg => arg.startsWith('--title='));
  const contentArg = args.find(arg => arg.startsWith('--content='));
  const fileArg = args.find(arg => arg.startsWith('--file='));
  
  if (!titleArg) {
    console.error('Error: --title is required');
    console.error('Usage: node create_document.js --title="Title" --content="Content" or --file=content.md');
    process.exit(1);
  }
  
  const title = titleArg.split('=')[1];
  let content = '';
  
  if (contentArg) {
    content = contentArg.split('=')[1];
  } else if (fileArg) {
    const fs = require('fs');
    const filePath = fileArg.split('=')[1];
    content = fs.readFileSync(filePath, 'utf8');
  } else {
    console.error('Error: --content or --file is required');
    process.exit(1);
  }
  
  try {
    const result = await createDocument(title, content);
    console.log(`\n✅ Document created successfully!`);
    console.log(`URL: ${result.url}`);
  } catch (error) {
    console.error('Error creating document:', error.message);
    process.exit(1);
  }
}

// Export functions
module.exports = {
  createDocument,
  parseContentToBlocks,
  feishuRequest
};

// Run if called directly
if (require.main === module) {
  main().catch(console.error);
}
