# 📊 HuggingFace Daily Report Skill

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![OpenClaw](https://img.shields.io/badge/OpenClaw-Skill-blue)](https://openclaw.ai)
[![GitHub](https://img.shields.io/github/stars/SoraKsgn/huggingface-daily-report-skill?style=social)](https://github.com/SoraKsgn/huggingface-daily-report-skill)
[![Model](https://img.shields.io/badge/Model-Qwen3.5--Plus-purple)](https://bailian.aliyun.com/)

**自动化生成每日 HuggingFace 论文研究报告的 OpenClaw Skill**

**An OpenClaw Skill for automating daily HuggingFace Papers research reports**

---

## 🌍 语言 / Language

### 🇨🇳 中文文档

完整的中文文档，包含：
- ⚠️ 前置要求（系统、技能、飞书权限、API 配置）
- 📦 安装步骤
- ⚙️ 配置说明（飞书、模型、Tavily）
- 🚀 使用方法
- ⏰ 定时任务配置
- 📋 报告格式
- 🔧 故障排查

👉 **查看**: [README.zh.md](README.zh.md)

---

### 🇺🇸 English Documentation

Complete English documentation including:
- ⚠️ Prerequisites (System, Skills, Feishu Permissions, API Config)
- 📦 Installation Steps
- ⚙️ Configuration (Feishu, Model, Tavily)
- 🚀 Usage Guide
- ⏰ Scheduled Tasks
- 📋 Report Format
- 🔧 Troubleshooting

👉 **View**: [README.en.md](README.en.md)

---

## ✨ 特性 / Features

- 🔍 **真实数据** / **Real Data**: 使用 Tavily Search 获取 HuggingFace 每日论文
- 📋 **热度排序** / **Popularity Ranking**: 自动选择当天热度前 5+ 的论文
- 📄 **完整报告** / **Complete Report**: 包含论文标题、机构、研究方向、链接、核心贡献、关键技术、实验结果
- 🎯 **验证机制** / **Verification**: 强制验证文档内容完整性（block_count >= 50）
- 📱 **飞书集成** / **Feishu Integration**: 自动创建 Feishu 云文档，支持 Bitable 表格
- ⏰ **智能调度** / **Smart Scheduling**: 支持工作日定时任务（周一到周五 9:00）
- 🔗 **HF 链接** / **HF Links**: 每篇论文都包含 HuggingFace Papers 链接

---

## 🚀 快速开始 / Quick Start

### 中文用户

1. 查看 [README.zh.md](README.zh.md) 了解完整配置
2. 确保已安装所有依赖技能
3. 配置飞书机器人和 API
4. 安装技能：`clawhub install huggingface-daily-report`
5. 在飞书中发送："生成今日的 HuggingFace 论文报告"

### English Users

1. Check [README.en.md](README.en.md) for complete setup
2. Ensure all required skills are installed
3. Configure Feishu bot and APIs
4. Install skill: `clawhub install huggingface-daily-report`
5. Send in Feishu: "Generate today's HuggingFace paper report"

---

## 📋 前置要求摘要 / Prerequisites Summary

### 必需技能 / Required Skills

| Skill | 用途 / Purpose |
|-------|---------------|
| `tavily-search` | AI 搜索 HuggingFace 论文 |
| `feishu-doc` | 创建飞书云文档 |
| `feishu-bitable` | 创建飞书多维表格 |
| `feishu-drive` | 飞书云盘操作 |

### API 配置 / API Configuration

| 服务 / Service | 用途 / Usage | 必需 / Required |
|---------------|-------------|----------------|
| 阿里云百炼 / Alibaba Bailian | Qwen3.5-Plus 模型 | ✅ 必需 |
| Tavily AI Search | 搜索 HuggingFace 论文 | ⚠️ 推荐 |
| 飞书开放平台 / Feishu Open Platform | 机器人权限 | ✅ 必需 |

### 系统要求 / System Requirements

| 项目 / Item | 最低要求 / Minimum | 推荐 / Recommended |
|------------|-------------------|-------------------|
| OpenClaw | 2026.2.15+ | 最新版 / Latest |
| Node.js | 16+ | 22+ |
| 操作系统 / OS | macOS / Linux / Windows | macOS / Linux |

---

## 📁 文件结构 / File Structure

```
huggingface-daily-report/
├── README.md             # 主 README（本文件）/ Main README
├── README.zh.md          # 中文文档 / Chinese Documentation
├── README.en.md          # 英文文档 / English Documentation
├── SKILL.md              # 技能说明 / Skill Documentation
├── package.json          # 技能元数据 / Skill Metadata
├── .gitignore            # Git 忽略文件
├── LICENSE               # MIT 许可证
├── scripts/
│   ├── generate_report.js    # 报告生成脚本
│   ├── create_document.js    # 文档创建脚本
│   └── example_data.js       # 示例数据
└── references/           # 参考资料目录
```

---

## 📞 联系方式 / Contact

- **GitHub**: [@SoraKsgn](https://github.com/SoraKsgn)
- **仓库 / Repository**: [huggingface-daily-report-skill](https://github.com/SoraKsgn/huggingface-daily-report-skill)
- **问题反馈 / Issues**: [Report bugs or request features](https://github.com/SoraKsgn/huggingface-daily-report-skill/issues)

---

## 📄 许可证 / License

MIT License - 详见 [LICENSE](LICENSE)

See [LICENSE](LICENSE) for details.

---

## 🙏 致谢 / Acknowledgments

- [HuggingFace Daily Papers](https://huggingface.co/papers) - 论文数据源 / Paper data source
- [OpenClaw](https://openclaw.ai) - Agent 框架 / Agent framework
- [Tavily](https://tavily.com) - AI 搜索 API / AI Search API
- [阿里云百炼](https://bailian.aliyun.com/) - Qwen3.5-Plus 模型 / Qwen3.5-Plus model
