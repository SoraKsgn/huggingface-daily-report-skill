---
name: huggingface-daily-report
description: Generates daily HuggingFace Papers research reports with detailed paper analysis and Bitable integration
homepage: https://docs.openclaw.ai
---

# HuggingFace Daily Report Skill

## Purpose
Automatically generates comprehensive daily research reports from HuggingFace Papers, including:
- Detailed paper analysis (title, institution, date, links, core contributions, key techniques, experimental results)
- Trend summary and analysis
- Bitable integration for structured data (optional)
- Feishu document creation with standardized formatting

## Usage
When user requests daily HuggingFace paper report or similar:

### Basic Workflow (CRITICAL ORDER)
1. **Search with Tavily** (PRIORITY): Use `tavily_search` to find HuggingFace Daily Papers for the target date
   - Search query: "Hugging Face Daily Papers [date]" or "huggingface.co/papers/date/[YYYY-MM-DD]"
   - Extract the HF Papers URL from search results
   - Use `tavily_extract` to get the full paper list from the HF page
2. **Select Top 5 Papers**: **MUST select at least 5 papers ranked by热度 (popularity)**
   - Sort by engagement metrics (upvotes, comments, views)
   - **Minimum 5 papers, maximum 10 papers**
   - Do NOT skip any top-5 papers
3. **Extract Details**: For EACH of the top 5+ papers, extract:
   - Title and authors
   - Institution
   - Submission date
   - **Research Direction** (研究方向): e.g., Agentic RL, Multimodal, Spatial Reasoning, Code Generation, etc.
   - Links (arXiv, PDF, project page, **HF Papers** - must include in message)
   - Core contributions
   - Key techniques
   - Experimental results
4. **Create Document FIRST**: Use `feishu_doc` tool to create cloud document
5. **Write Content**: Use `feishu_doc(action="append")` to write ALL content in blocks
6. **Verify Document**: Use `feishu_doc(action="read")` to confirm content is written (block_count > 50)
7. **Send Message LAST**: Use `message` tool to send report with document link (ONLY after verification passes)
8. **Optional Bitable**: Create Bitable for structured data if requested

### ⚠️ CRITICAL RULES
- **NEVER send message before document is fully written**
- **ALWAYS verify document content with `read` action before sending message**
- **Message must include HF Papers link for each paper**
- **Minimum block_count: 50+ blocks** (ensures all content is written)

### Output Modes
**Both message and document** (default):
- Send formatted report via message
- Create Feishu cloud document with full details
- Return document link in message

**Message only** (when user asks for quick summary):
- Send condensed report via message
- Skip document creation

**Document only** (when user asks to save without sending):
- Create Feishu cloud document
- Return document link without sending full report

### Commands
```bash
# Generate report for today
node scripts/generate_report.js

# Generate report for specific date
node scripts/generate_report.js --date 2026-02-22

# Create Feishu document
node scripts/create_document.js --title "Report Title"
```

## Report Structure

### Document Title Format
`YYYY-MM-DD Hugging Face Daily Papers Report`

### Content Structure
```markdown
# Hugging Face Daily Papers Report

## 目录
- [1. Paper Title 1](#1-paper-title-1)
- [2. Paper Title 2](#2-paper-title-2)
- ...
- [N. 今日趋势总结](#n-今日趋势总结)

---

## 1. Paper Title

**🏢 机构**: Institution Name

**📅 提交日期**: YYYY 年 M 月 D 日

**🔥 热度**: 当日最热 / 高度关注 / 持续上升 / 新兴热点

**🔬 研究方向**: [研究方向，例如：Agentic RL, Multimodal, Spatial Reasoning, Code Generation, etc.]

**📌 核心贡献**:
详细描述核心贡献（2-3 句话）。必须清晰说明论文的主要创新点和解决的问题。

**🔬 关键技术**:
- **Technique 1**: 简短描述
- **Technique 2**: 简短描述
- **Technique 3**: 简短描述

**📊 实验结果**:
- 具体的实验结果和性能指标
- 与 baseline 的对比数据
- 关键发现和洞察

**🔗 链接**: 
- HF Papers 地址：https://huggingface.co/papers/...（必需）
- arXiv 地址：https://arxiv.org/abs/...
- PDF 地址：https://arxiv.org/pdf/...
- 项目地址：https://...

---

## N. 今日趋势总结

1. **Trend 1**: Description
2. **Trend 2**: Description
3. **Trend 3**: Description

---

*报告由蛋仔 🐰 自动生成*
```

## Paper Data Format

Each paper should include:

```javascript
{
  title: "Paper Title",
  institution: "Institution Name",
  date: "YYYY-MM-DD",
  links: {
    project: "https://...",
    arxiv: "https://arxiv.org/abs/...",
    pdf: "https://arxiv.org/pdf/...",
    hfPapers: "https://huggingface.co/papers/..."
  },
  coreContribution: "Brief description",
  keyTechniques: [
    { name: "Technique 1", description: "..." },
    { name: "Technique 2", description: "..." }
  ],
  experimentalResults: [
    "Result 1 with metrics",
    "Result 2 with metrics"
  ]
}
```

## Bitable Integration (Optional)

For papers with structured data (e.g., model specifications, benchmark results):

1. **Create Bitable**: `feishu_bitable_create_app()`
2. **Configure Fields**: Add appropriate field types
3. **Insert Data**: `feishu_bitable_create_record()`
4. **Embed Link**: Include Bitable URL in document

### Example: Model Specifications Table
```markdown
## 📊 Model Specifications

**🔗 查看详细表格**: https://feishu.cn/base/APP_TOKEN

> 💡 **使用说明**: 这是一个实时更新的多维表格，支持筛选、排序和协作编辑。
```

## Tools Used

### Priority Tools (REQUIRED)
- **`tavily_search`** (PRIORITY #1): Search for HuggingFace Daily Papers
  - **ALWAYS use tavily_search FIRST** before any other search tool
  - Search query format: "Hugging Face Daily Papers [YYYY-MM-DD]" or "huggingface.co/papers/date/[YYYY-MM-DD]"
  - Extract the official HF Papers URL from results
  
- **`tavily_extract`** (PRIORITY #2): Extract paper list from HF Papers page
  - Use the URL from tavily_search results
  - Get complete paper list with titles, institutions, and HF links
  - Extract engagement metrics (upvotes, comments) for ranking

### Secondary Tools
- `message`: Send report directly to user (required - use action="send")
- `feishu_doc`: Create and format Feishu documents (required)
- `feishu_bitable_create_app`: Create Bitable for structured data (optional)
- `feishu_bitable_create_field`: Configure Bitable fields
- `feishu_bitable_create_record`: Insert data into Bitable

### Fallback Tools (ONLY if tavily fails)
- `web_search`: Fallback search (requires Brave API key)
- `web_fetch`: Fallback extraction

### Message Format
When sending via `message` tool:
- Use `action="send"`
- Format report with clear sections and emoji
- **Include HF Papers link for EACH paper** (required)
- **Include 核心贡献，关键技术，实验结果 for each paper** (required)
- Include document link at the end
- Keep it readable (use bullet points, bold text)
- For Feishu channel: omit `target` to reply to current conversation

Example:
```json
{
  "action": "send",
  "message": "📊 HuggingFace Daily Report - 2026-02-22\n\n【1. Paper Title - Institution】\n🔥 热度：当日最热\n🔬 方向：Agentic RL / Multimodal\n📌 核心：详细描述核心贡献\n🔬 技术：Technique1, Technique2, Technique3\n📊 结果：具体的实验结果和性能指标\n🔗 HF Papers: https://huggingface.co/papers/...\n\n【2. Paper Title - Institution】\n🔥 热度：高度关注\n🔬 方向：Code Generation / Efficiency\n📌 核心：...\n🔬 技术：...\n📊 结果：...\n🔗 HF Papers: https://huggingface.co/papers/...\n\n📈 今日趋势：高效模型、具身智能成为热点\n\n📄 完整文档：https://feishu.cn/docx/...\n\n*报告由 蛋仔 🐰 整理*"
}
```

## Example Workflow

### Standard Report (Message + Document) - CORRECT ORDER with TAVILY
```
User: "生成 2026-02-17 的 HuggingFace 论文报告"

Assistant:
1. **TAVILY SEARCH** (PRIORITY): 
   - tavily_search(query="Hugging Face Daily Papers February 17 2026", n=10)
   - Extract HF Papers URL from results (e.g., https://huggingface.co/papers/date/2026-02-17)
   
2. **TAVILY EXTRACT**:
   - tavily_extract(url="https://huggingface.co/papers/date/2026-02-17")
   - Get complete paper list with titles, institutions, upvotes, comments
   
3. **SELECT TOP 5+ PAPERS**:
   - Sort by upvotes/comments (popularity)
   - **MUST include at least top 5 papers**
   - Extract HF Papers link for each (e.g., /papers/2602.10809)
   
4. **EXTRACT DETAILS**: For each of top 5+ papers:
   - Get arXiv ID from HF link
   - Extract institution, core contribution, key techniques, results
   
5. **CREATE DOCUMENT**: feishu_doc(action="create", title="2026-02-17 Hugging Face Daily Papers Report")
   
6. **WRITE CONTENT**: feishu_doc(action="append", ...) for each section
   - Append TOC first
   - Append each paper section (one append per paper)
   - Append trends summary
   
7. **VERIFY**: feishu_doc(action="read", doc_token="...")
   - Check block_count >= 50
   - Verify all 5+ papers are included
   
8. **SEND MESSAGE WITH HF LINKS**: message(action="send", message="...")
   - Include HF Papers link for EACH paper
   - Include verified document URL

Message Output (WITH HF LINKS):
📊 HuggingFace Daily Papers Report - 2026-02-22

【1. SpargeAttention2 - 清华大学】
核心贡献：可训练稀疏注意力方法...
关键技术：混合掩码规则、高效实现...
实验结果：95% 稀疏度，16.2 倍加速...
🔗 HF Papers: https://huggingface.co/papers/2602.13515

【2. Mobile-Agent-v3.5 - 阿里通义】
...
🔗 HF Papers: https://huggingface.co/papers/2602.16855

📈 今日趋势：
• Agent 方向持续火热
• 效率优化方案涌现
...

📄 完整文档：https://feishu.cn/docx/...
```

### Document Only
```
User: "把报告存到云文档，不用发给我"

Assistant:
1. Generate report content
2. Create Feishu document
3. Return only document link (no message send)
```

### Quick Summary (Message Only)
```
User: "快速看看今天有什么论文"

Assistant:
1. Fetch top 5 papers
2. Send condensed summary via message
3. Skip document creation
```

## Paper Selection Rules (CRITICAL)

### Minimum Paper Count
- **MUST include at least 5 papers** from the target date
- **Maximum 10 papers** (to avoid overly long reports)
- **DO NOT skip any top-5 papers** by popularity

### Ranking Criteria
Select papers based on热度 (popularity) in this order:
1. **Upvotes/Stars** (primary metric)
2. **Comments count** (secondary metric)
3. **Views/Downloads** (tertiary metric)

### Verification Checklist (BEFORE writing report)
- [ ] Tavily search completed successfully
- [ ] HF Papers page extracted
- [ ] **At least 5 papers identified**
- [ ] Papers sorted by popularity (high to low)
- [ ] Each paper has HF Papers URL
- [ ] No top-5 papers are missing

### ⚠️ Common Mistakes to AVOID
- ❌ Skipping papers due to "lack of information" - include all top 5 regardless
- ❌ Replacing papers with "more interesting" ones - follow popularity ranking
- ❌ Including papers from wrong date - verify date matches request
- ❌ Using fake/simulated data - always use tavily to get real papers

---

## Best Practices

1. **Document First, Message Last** (CRITICAL):
   - **Step 1**: Create document with `feishu_doc(action="create")`
   - **Step 2**: Write ALL content with multiple `feishu_doc(action="append")` calls
   - **Step 3**: Verify with `feishu_doc(action="read")` - check block_count >= 50
   - **Step 4**: ONLY THEN send message with document link
   - **NEVER** send message before verification passes

2. **Paper Selection**: Focus on top 8-10 trending papers

3. **Detail Level**: Include all key information (institution, date, links, contributions, techniques, results)

4. **Link Format**: Use clear labels (项目地址，arXiv 地址，etc.)

5. **HF Papers Link in Message** (REQUIRED):
   - Each paper in message MUST include HF Papers link
   - Format: `🔗 HF Papers: https://huggingface.co/papers/...`
   - Place after experimental results for each paper

6. **Trend Analysis**: Summarize 3-5 key trends at the end

7. **Document Structure**: Use numbered headings (## 1., ## 2., etc.)

8. **Table of Contents**: Auto-generate for documents with 3+ sections

9. **Bitable Usage**: Use for structured data that benefits from filtering/sorting

10. **Message Formatting**:
    - Use emoji for visual clarity (📊, 🏢, 📅, 🔗, 📌, 🔬, 📊, 📈, 📄)
    - Keep sections concise in message (full details in document)
    - Use bullet points and bold text for readability
    - Put document link at the end
    - **Include HF link for each paper**

11. **Verification Checklist** (before sending message):
    - [ ] Document created successfully
    - [ ] All content blocks appended (6+ papers × 3-4 blocks each + TOC + trends)
    - [ ] `block_count >= 50` verified via `read` action
    - [ ] Document URL extracted and ready to include in message
    - [ ] Each paper has HF Papers link ready for message

## Error Handling

### Tavily Search Failures
- If tavily_search returns no results:
  - Try alternative query: "huggingface.co/papers/date/[YYYY-MM-DD]"
  - Try searching for individual paper IDs
  - **DO NOT fabricate papers** - report the error to user
  
### Paper Count Issues
- If fewer than 5 papers found for the date:
  - Inform user: "Only X papers found for [date]"
  - Include all available papers
  - Do NOT pad with papers from other dates
  
### Feishu API Failures
- If Feishu API fails, retry with exponential backoff
- If Bitable creation fails, continue with text-based format

### Data Completeness
- If paper details are incomplete, note missing information
- **NEVER fabricate data** - use "信息待补充" for missing details

## Summary: Key Requirements

### ⭐ CRITICAL RULES (MUST FOLLOW)
1. **ALWAYS use tavily_search FIRST** - never skip or use other tools first
2. **MUST include at least top 5 papers** by popularity (upvotes/comments)
3. **DO NOT skip any top-5 papers** - include all of them regardless of topic
4. **Verify before sending** - check block_count >= 50 via feishu_doc(action="read")
5. **Include HF Papers link for EACH paper** in the message

### 📋 Paper Selection
- **Minimum**: 5 papers (mandatory)
- **Maximum**: 10 papers (recommended)
- **Ranking**: By 热度 (popularity) - upvotes, comments, views
- **Date**: Must match the requested date exactly

### 🔍 Search Priority
1. tavily_search (REQUIRED - always first)
2. tavily_extract (REQUIRED - get paper details)
3. web_search (FALLBACK ONLY - if tavily fails)
4. web_fetch (FALLBACK ONLY - if tavily fails)

---

## Customization

### Report Frequency
- Daily (default): Generate report for today's papers
- Weekly: Aggregate papers from the past week
- Custom date range: Specify start and end dates

### Paper Count
- **Minimum: 5 papers (MANDATORY)**
- Recommended: 5-8 papers
- Maximum: 10 papers (to avoid overly long reports)

### Output Format
- Feishu document (default)
- Markdown file (for local storage)
- Email summary (optional)
