#!/usr/bin/env node
/**
 * HuggingFace Daily Report Generator
 * Fetches papers from HuggingFace and generates structured report content
 */

const https = require('https');

// Configuration
const CONFIG = {
  hfPapersUrl: 'https://huggingface.co/papers',
  defaultPaperCount: 8,
  maxPaperCount: 10
};

/**
 * Fetch content from URL
 */
async function fetchUrl(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => resolve(data));
    }).on('error', reject);
  });
}

/**
 * Parse paper ID from HuggingFace URL
 */
function extractPaperId(url) {
  const match = url.match(/papers\/(\d+\.\d+)/);
  return match ? match[1] : null;
}

/**
 * Generate report structure for a single paper
 */
function generatePaperSection(paper, index) {
  const { title, institution, date, links, coreContribution, keyTechniques, experimentalResults } = paper;
  
  let content = `## ${index}. ${title}\n\n`;
  
  if (institution) {
    content += `**🏢 机构**: ${institution}\n\n`;
  }
  
  if (date) {
    content += `**📅 提交日期**: ${date}\n\n`;
  }
  
  if (links) {
    content += `**🔗 链接**: \n`;
    if (links.project) content += `- 项目地址：${links.project}\n`;
    if (links.arxiv) content += `- arXiv 地址：${links.arxiv}\n`;
    if (links.pdf) content += `- PDF 地址：${links.pdf}\n`;
    if (links.hfPapers) content += `- HF Papers 地址：${links.hfPapers}\n`;
    content += `\n`;
  }
  
  if (coreContribution) {
    content += `**📌 核心贡献**:\n${coreContribution}\n\n`;
  }
  
  if (keyTechniques && keyTechniques.length > 0) {
    content += `**🔬 关键技术**:\n`;
    keyTechniques.forEach((tech, i) => {
      content += `${i + 1}. **${tech.name}**: ${tech.description}\n`;
    });
    content += `\n`;
  }
  
  if (experimentalResults && experimentalResults.length > 0) {
    content += `**📊 实验结果**:\n`;
    experimentalResults.forEach(result => {
      content += `- ${result}\n`;
    });
    content += `\n`;
  }
  
  content += `---\n\n`;
  
  return content;
}

/**
 * Generate trend summary section
 */
function generateTrendSummary(trends) {
  let content = `## ${trends.sectionNumber || 'N'}. 今日趋势总结\n\n`;
  
  trends.items.forEach((trend, i) => {
    content += `${i + 1}. **${trend.title}**: ${trend.description}\n`;
  });
  
  content += `\n---\n\n`;
  return content;
}

/**
 * Generate complete report for Feishu document
 */
function generateReport(papers, trends, options = {}) {
  const { title, date, includeTOC = true } = options;
  
  let report = '';
  
  // Title
  report += `# ${title || 'Hugging Face Daily Papers Report'}\n\n`;
  
  // Date
  if (date) {
    report += `**日期**: ${date}\n\n`;
  }
  
  // Table of Contents
  if (includeTOC && papers.length >= 3) {
    report += `## 目录\n`;
    papers.forEach((paper, i) => {
      const anchor = paper.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
      report += `- [${i + 1}. ${paper.title.split(':')[0]}](#${anchor})\n`;
    });
    report += `- [${papers.length + 1}. 今日趋势总结](#今日趋势总结)\n\n`;
    report += `---\n\n`;
  }
  
  // Paper sections
  papers.forEach((paper, i) => {
    report += generatePaperSection(paper, i + 1);
  });
  
  // Trend summary
  report += generateTrendSummary(trends);
  
  // Footer
  report += `*报告由蛋仔 🐰 自动生成*\n`;
  
  return report;
}

/**
 * Generate condensed report for message sending
 */
function generateMessageReport(papers, trends, options = {}) {
  const { date, includeDocLink = true, docUrl = '' } = options;
  
  let message = `📊 *HuggingFace Daily Papers Report*\n\n`;
  
  if (date) {
    message += `📅 日期：${date}\n\n`;
  }
  
  message += `━━━━━━━━━━━━━━━━━━━━━\n\n`;
  
  // Paper summaries (condensed)
  papers.forEach((paper, i) => {
    const shortTitle = paper.title.length > 50 ? paper.title.slice(0, 50) + '...' : paper.title;
    
    message += `【${i + 1}. ${shortTitle}】\n`;
    
    if (paper.institution) {
      message += `🏢 机构：${paper.institution}\n`;
    }
    
    if (paper.coreContribution) {
      const shortContrib = paper.coreContribution.length > 80 
        ? paper.coreContribution.slice(0, 80) + '...' 
        : paper.coreContribution;
      message += `📌 核心：${shortContrib}\n`;
    }
    
    if (paper.experimentalResults && paper.experimentalResults.length > 0) {
      message += `📊 结果：${paper.experimentalResults[0]}\n`;
    }
    
    message += `\n`;
  });
  
  message += `━━━━━━━━━━━━━━━━━━━━━\n\n`;
  
  // Trend summary
  message += `📈 *今日趋势*:\n`;
  trends.items.forEach((trend, i) => {
    message += `• ${trend.title}: ${trend.description}\n`;
  });
  
  message += `\n`;
  
  // Document link
  if (includeDocLink && docUrl) {
    message += `\n📄 *完整文档*: ${docUrl}\n`;
  }
  
  message += `\n_报告由蛋仔 🐰 自动生成_`;
  
  return message;
}

/**
 * Main function
 */
async function main() {
  const args = process.argv.slice(2);
  const dateArg = args.find(arg => arg.startsWith('--date='));
  const titleArg = args.find(arg => arg.startsWith('--title='));
  const countArg = args.find(arg => arg.startsWith('--count='));
  
  const date = dateArg ? dateArg.split('=')[1] : new Date().toISOString().split('T')[0];
  const title = titleArg ? titleArg.split('=')[1] : `${date} Hugging Face Daily Papers Report`;
  const paperCount = countArg ? parseInt(countArg.split('=')[1]) : CONFIG.defaultPaperCount;
  
  console.log(`Generating HuggingFace Daily Report...`);
  console.log(`Date: ${date}`);
  console.log(`Title: ${title}`);
  console.log(`Paper Count: ${paperCount}`);
  console.log('');
  
  // Note: This is a template script
  // In practice, you would:
  // 1. Use web_search or web_fetch to get papers from HuggingFace
  // 2. Parse the HTML/JSON to extract paper details
  // 3. Call generateReport() with the extracted data
  
  console.log('To use this script:');
  console.log('1. Implement paper fetching logic (use web_search/web_fetch tools)');
  console.log('2. Parse paper details from HuggingFace Papers page');
  console.log('3. Call generateReport() with extracted data');
  console.log('4. Use feishu_doc tool to create the document');
  console.log('');
  console.log('Example usage:');
  console.log('  node scripts/generate_report.js --date=2026-02-22 --title="My Report" --count=8');
}

// Export functions for use in other scripts
module.exports = {
  fetchUrl,
  extractPaperId,
  generatePaperSection,
  generateTrendSummary,
  generateReport,
  generateMessageReport,  // For message sending
  CONFIG
};

// Run if called directly
if (require.main === module) {
  main().catch(console.error);
}
