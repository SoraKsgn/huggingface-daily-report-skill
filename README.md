# 📊 HuggingFace Daily Report Skill

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![OpenClaw](https://img.shields.io/badge/OpenClaw-Skill-blue)](https://openclaw.ai)
[![GitHub](https://img.shields.io/github/stars/SoraKsgn/huggingface-daily-report-skill?style=social)](https://github.com/SoraKsgn/huggingface-daily-report-skill)

**自动化生成每日 HuggingFace 论文研究报告的 OpenClaw Skill**

**An OpenClaw Skill for automating daily HuggingFace Papers research reports**

---

## 🌍 语言 / Language

- [中文说明](#-简介)
- [English Documentation](#-introduction)

---

## 🇨🇳 中文说明

### ✨ 特性

- 🔍 **真实数据**: 使用 Tavily Search 获取 HuggingFace 每日论文
- 📋 **热度排序**: 自动选择当天热度前 5+ 的论文
- 📄 **完整报告**: 包含论文标题、机构、研究方向、链接、核心贡献、关键技术、实验结果
- 🎯 **验证机制**: 强制验证文档内容完整性（block_count >= 50）
- 📱 **飞书集成**: 自动创建 Feishu 云文档，支持 Bitable 表格
- ⏰ **智能调度**: 支持工作日定时任务（周一到周五 9:00）
- 🔗 **HF 链接**: 每篇论文都包含 HuggingFace Papers 链接

### 📦 安装

```bash
# 方式 1: 通过 ClawHub 安装（推荐）
clawhub install huggingface-daily-report

# 方式 2: 手动克隆
git clone https://github.com/SoraKsgn/huggingface-daily-report-skill.git
cp -r huggingface-daily-report-skill ~/.openclaw/workspace/skills/
```

### 🚀 使用方法

#### 基本用法

当用户请求生成 HuggingFace 论文报告时：

```
用户："生成今日的 HuggingFace 论文报告"
```

Skill 会自动：
1. 使用 Tavily Search 获取当天论文
2. 提取热度前 5+ 篇论文
3. 创建飞书文档（包含完整详情）
4. 验证文档内容完整性
5. 发送消息给用户（包含 HF 链接和文档 URL）

#### 定时任务配置

在 `~/.openclaw/cron/jobs.json` 中添加：

```json
{
  "id": "hf-daily-report",
  "agentId": "main",
  "name": "HF Daily Papers Report",
  "enabled": true,
  "schedule": {
    "kind": "cron",
    "expr": "0 9 * * 1-5",
    "tz": "Asia/Shanghai"
  },
  "sessionTarget": "main",
  "payload": {
    "kind": "agentTurn",
    "message": "Use the huggingface-daily-report skill to generate today's report."
  },
  "delivery": {
    "mode": "message"
  }
}
```

### 📋 报告格式示例

#### 消息格式

```
📊 HuggingFace Daily Papers Report - 2026-02-17

【1. Experiential Reinforcement Learning - Microsoft】
🏢 机构：Microsoft
🔬 研究方向：Agentic RL / Reinforcement Learning
📌 核心：经验驱动的强化学习，提升 Agent 决策能力
📊 结果：多个 RL 基准 SOTA，样本效率显著提升
🔗 HF Papers: https://huggingface.co/papers/2602.13949

【2. BitDance - 字节跳动】
🔬 研究方向：Efficient AI / Model Compression
...
```

#### 文档内容

每篇论文包含：
- 🏢 机构
- 📅 提交日期
- 🔬 研究方向
- 🔗 链接（arXiv、PDF、HF Papers）
- 📌 核心贡献
- 🔬 关键技术
- 📊 实验结果

### 📁 文件结构

```
huggingface-daily-report/
├── SKILL.md              # 技能说明（完整工作流程和规范）
├── README.md             # 使用指南（中英双语）
├── package.json          # 技能元数据
├── .gitignore            # Git 忽略文件
├── scripts/
│   ├── generate_report.js    # 报告生成脚本
│   ├── create_document.js    # 文档创建脚本
│   └── example_data.js       # 示例数据
└── references/           # 参考资料目录
```

### 🔧 依赖

- Node.js 16+
- OpenClaw 2026.2.15+
- Tavily Search Skill
- Feishu Doc Skill
- Feishu Bitable Skill

### 📝 更新日志

#### v1.0.0 (2026-02-22)
- ✨ 初始发布
- ✅ Tavily Search 集成
- ✅ 热度前 5 论文自动选择
- ✅ 文档完整性验证
- ✅ 飞书文档创建
- ✅ 工作日定时任务支持

---

## 🇺🇸 English Documentation

### ✨ Features

- 🔍 **Real Data**: Uses Tavily Search to fetch HuggingFace Daily Papers
- 📋 **Popularity Ranking**: Automatically selects top 5+ papers by popularity
- 📄 **Complete Report**: Includes paper title, institution, research direction, links, core contributions, key techniques, and experimental results
- 🎯 **Verification**: Enforces document integrity check (block_count >= 50)
- 📱 **Feishu Integration**: Automatically creates Feishu cloud documents with Bitable support
- ⏰ **Smart Scheduling**: Supports weekday-only scheduled tasks (Mon-Fri 9:00)
- 🔗 **HF Links**: Every paper includes HuggingFace Papers link

### 📦 Installation

```bash
# Method 1: Install via ClawHub (Recommended)
clawhub install huggingface-daily-report

# Method 2: Manual clone
git clone https://github.com/SoraKsgn/huggingface-daily-report-skill.git
cp -r huggingface-daily-report-skill ~/.openclaw/workspace/skills/
```

### 🚀 Usage

#### Basic Usage

When user requests a HuggingFace paper report:

```
User: "Generate today's HuggingFace paper report"
```

The skill will automatically:
1. Use Tavily Search to fetch today's papers
2. Extract top 5+ papers by popularity
3. Create Feishu document with full details
4. Verify document content integrity
5. Send message to user with HF links and document URL

#### Scheduled Task Configuration

Add to `~/.openclaw/cron/jobs.json`:

```json
{
  "id": "hf-daily-report",
  "agentId": "main",
  "name": "HF Daily Papers Report",
  "enabled": true,
  "schedule": {
    "kind": "cron",
    "expr": "0 9 * * 1-5",
    "tz": "Asia/Shanghai"
  },
  "sessionTarget": "main",
  "payload": {
    "kind": "agentTurn",
    "message": "Use the huggingface-daily-report skill to generate today's report."
  },
  "delivery": {
    "mode": "message"
  }
}
```

### 📋 Report Format Example

#### Message Format

```
📊 HuggingFace Daily Papers Report - 2026-02-17

【1. Experiential Reinforcement Learning - Microsoft】
🏢 Institution: Microsoft
🔬 Research Direction: Agentic RL / Reinforcement Learning
📌 Core: Experience-driven RL for better agent decision-making
📊 Results: SOTA on multiple RL benchmarks, significant sample efficiency improvement
🔗 HF Papers: https://huggingface.co/papers/2602.13949

【2. BitDance - ByteDance】
🔬 Research Direction: Efficient AI / Model Compression
...
```

#### Document Content

Each paper includes:
- 🏢 Institution
- 📅 Submission Date
- 🔬 Research Direction
- 🔗 Links (arXiv, PDF, HF Papers)
- 📌 Core Contribution
- 🔬 Key Techniques
- 📊 Experimental Results

### 📁 File Structure

```
huggingface-daily-report/
├── SKILL.md              # Skill documentation (complete workflow and specs)
├── README.md             # User guide (bilingual)
├── package.json          # Skill metadata
├── .gitignore            # Git ignore file
├── scripts/
│   ├── generate_report.js    # Report generation script
│   ├── create_document.js    # Document creation script
│   └── example_data.js       # Example data
└── references/           # Reference materials
```

### 🔧 Dependencies

- Node.js 16+
- OpenClaw 2026.2.15+
- Tavily Search Skill
- Feishu Doc Skill
- Feishu Bitable Skill

### 📝 Changelog

#### v1.0.0 (2026-02-22)
- ✨ Initial release
- ✅ Tavily Search integration
- ✅ Automatic top 5 papers selection by popularity
- ✅ Document integrity verification
- ✅ Feishu document creation
- ✅ Weekday-only scheduling support

---

## 🤝 贡献 / Contributing

欢迎提交 Issue 和 Pull Request！

Issues and Pull Requests are welcome!

---

## 📄 许可证 / License

MIT License - 详见 [LICENSE](LICENSE)

See [LICENSE](LICENSE) for details.

---

## 🙏 致谢 / Acknowledgments

- [HuggingFace Daily Papers](https://huggingface.co/papers) - Paper data source
- [OpenClaw](https://openclaw.ai) - Agent framework
- [Tavily](https://tavily.com) - AI Search API

---

## 📞 联系方式 / Contact

- **GitHub**: [@SoraKsgn](https://github.com/SoraKsgn)
- **Repository**: [huggingface-daily-report-skill](https://github.com/SoraKsgn/huggingface-daily-report-skill)
- **Issues**: [Report bugs or request features](https://github.com/SoraKsgn/huggingface-daily-report-skill/issues)
