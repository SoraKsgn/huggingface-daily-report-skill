# 📊 HuggingFace Daily Report Skill

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![OpenClaw](https://img.shields.io/badge/OpenClaw-Skill-blue)](https://openclaw.ai)
[![GitHub](https://img.shields.io/github/stars/SoraKsgn/huggingface-daily-report-skill?style=social)](https://github.com/SoraKsgn/huggingface-daily-report-skill)
[![Model](https://img.shields.io/badge/Model-Qwen3.5--Plus-purple)](https://bailian.aliyun.com/)

**自动化生成每日 HuggingFace 论文研究报告的 OpenClaw Skill**

**An OpenClaw Skill for automating daily HuggingFace Papers research reports**

---

## 📋 目录 / Table of Contents

- [简介 / Introduction](#-简介-introduction)
- [前置要求 / Prerequisites](#-前置要求-prerequisites)
- [安装步骤 / Installation](#-安装步骤-installation)
- [配置说明 / Configuration](#-配置说明-configuration)
- [使用方法 / Usage](#-使用方法-usage)
- [定时任务 / Scheduled Tasks](#-定时任务-scheduled-tasks)
- [报告格式 / Report Format](#-报告格式-report-format)
- [故障排查 / Troubleshooting](#-故障排查-troubleshooting)
- [依赖技能 / Dependencies](#-依赖技能-dependencies)
- [更新日志 / Changelog](#-更新日志-changelog)

---

## 🌟 简介 / Introduction

**中文**: 本 Skill 自动从 HuggingFace Daily Papers 获取最新论文，生成包含热度前 5+ 论文的完整研究报告，并通过飞书发送给用户。

**English**: This Skill automatically fetches the latest papers from HuggingFace Daily Papers, generates a complete research report with the top 5+ papers by popularity, and sends it to users via Feishu.

### ✨ 特性 / Features

| 功能 | 说明 |
|------|------|
| 🔍 **真实数据** | 使用 Tavily Search 获取 HuggingFace 每日论文 |
| 📋 **热度排序** | 自动选择当天热度前 5+ 的论文 |
| 📄 **完整报告** | 包含论文标题、机构、研究方向、链接、核心贡献、关键技术、实验结果 |
| 🎯 **验证机制** | 强制验证文档内容完整性（block_count >= 50） |
| 📱 **飞书集成** | 自动创建 Feishu 云文档，支持 Bitable 表格 |
| ⏰ **智能调度** | 支持工作日定时任务（周一到周五 9:00） |
| 🔗 **HF 链接** | 每篇论文都包含 HuggingFace Papers 链接 |

---

## ⚠️ 前置要求 / Prerequisites

### 系统要求 / System Requirements

| 项目 | 最低要求 | 推荐 |
|------|---------|------|
| **OpenClaw** | 2026.2.15+ | 最新版 |
| **Node.js** | 16+ | 22+ |
| **操作系统** | macOS / Linux / Windows | macOS / Linux |

### 必需技能 / Required Skills

以下技能必须已安装并配置：

| Skill | 用途 | 安装方式 |
|-------|------|---------|
| `tavily-search` | AI 搜索 HuggingFace 论文 | 已内置或从 ClawHub 安装 |
| `feishu-doc` | 创建飞书云文档 | OpenClaw Feishu 扩展 |
| `feishu-bitable` | 创建飞书多维表格 | OpenClaw Feishu 扩展 |
| `feishu-drive` | 飞书云盘操作 | OpenClaw Feishu 扩展 |

检查已安装的技能：
```bash
ls ~/.openclaw/workspace/skills/
```

### 技术栈 / Tech Stack

本 Skill 在构建和测试时使用以下技术组合：

| 组件 | 说明 | 必需 |
|------|------|------|
| **模型** | Qwen3.5-Plus (阿里云百炼) | ✅ 是 |
| **搜索** | Tavily AI Search | ⚠️ 推荐（可替换） |
| **平台** | 飞书 (Feishu) | ✅ 是 |

**说明**：
- **Qwen3.5-Plus**: 用于论文内容分析和报告生成
- **Tavily**: 用于搜索 HuggingFace Daily Papers（可用其他搜索方式替代）
- **飞书**: 用于文档创建和消息推送

> 💡 **提示**: 你可以根据自己的需求替换搜索工具或模型，只需修改 `SKILL.md` 中的相关配置即可。

---

## 📦 安装步骤 / Installation

### 方式 1: 通过 ClawHub 安装（推荐）

```bash
# 安装技能
clawhub install huggingface-daily-report

# 验证安装
ls ~/.openclaw/workspace/skills/huggingface-daily-report/
```

### 方式 2: 手动克隆

```bash
# 1. 克隆仓库
git clone https://github.com/SoraKsgn/huggingface-daily-report-skill.git

# 2. 复制到技能目录
cp -r huggingface-daily-report-skill ~/.openclaw/workspace/skills/

# 3. 验证安装
ls ~/.openclaw/workspace/skills/huggingface-daily-report/
```

### 方式 3: 本地开发

```bash
# 技能已在本地目录
cd ~/.openclaw/workspace/skills/huggingface-daily-report/
```

---

## ⚙️ 配置说明 / Configuration

### 1. 检查依赖技能

```bash
# 检查 tavily-search 是否安装
ls ~/.openclaw/workspace/skills/tavily-search/

# 检查 feishu 扩展是否安装
ls ~/.openclaw/extensions/feishu/
```

### 2. 配置飞书

确保已在 OpenClaw 中配置飞书频道。参考 OpenClaw 文档进行配置。

### 3. 配置模型（可选）

本 Skill 默认使用 `qwen3.5-plus` 模型。如需修改，编辑 `~/.openclaw/openclaw.json`：

```json
{
  "models": {
    "default": "bailian/qwen3.5-plus"
  }
}
```

### 4. 重启 Gateway

```bash
openclaw gateway restart
```

---

## 🚀 使用方法 / Usage

### 基本用法

在飞书中发送：

```
生成今日的 HuggingFace 论文报告
```

或指定日期：

```
生成 2026-02-22 的 HuggingFace 论文报告
```

### 完整流程

Skill 会自动执行以下步骤：

1. **搜索论文**: 使用 Tavily Search 获取 HuggingFace Daily Papers
2. **提取详情**: 获取每篇论文的详细信息
3. **选择前 5**: 按热度排序，选择前 5+ 篇论文
4. **创建文档**: 在飞书云文档中创建完整报告
5. **验证内容**: 检查文档完整性（block_count >= 50）
6. **发送消息**: 发送精简版报告 + 文档链接到飞书

### 输出示例

**飞书消息**：
```
📊 HuggingFace Daily Papers Report - 2026-02-22

【1. 论文标题 - 机构】
🏢 机构：XXX
🔬 研究方向：Agentic RL / Multimodal
📌 核心：...
📊 结果：...
🔗 HF Papers: https://huggingface.co/papers/...

📄 完整文档：https://feishu.cn/docx/...
```

**飞书文档**：

包含完整的论文信息：
- 标题、机构、日期
- 研究方向标签
- 所有链接（arXiv、PDF、HF Papers）
- 核心贡献
- 关键技术（3 项）
- 实验结果

---

## ⏰ 定时任务 / Scheduled Tasks

### 配置工作日报告

编辑 `~/.openclaw/cron/jobs.json`：

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

**说明**：
- `0 9 * * 1-5`: 周一到周五 早上 9:00
- `sessionTarget: main`: 在主会话执行（可发送消息）
- `delivery.mode: message`: 通过消息发送

### 验证定时任务

```bash
# 查看定时任务列表
openclaw cron list

# 预期输出：
# ID          Name                    Schedule              Next    Status
# hf-daily... HF Daily Papers Rep...  0 9 * * 1-5          in 16h  pending
```

---

## 📋 报告格式 / Report Format

### 每篇论文包含

| 字段 | 说明 | 示例 |
|------|------|------|
| 🏢 机构 | 论文所属机构 | Microsoft, Google, 清华大学 |
| 📅 提交日期 | 论文提交日期 | 2026 年 2 月 17 日 |
| 🔬 研究方向 | 研究领域标签 | Agentic RL, Multimodal, Efficient AI |
| 🔗 链接 | arXiv、PDF、HF Papers | https://huggingface.co/papers/... |
| 📌 核心贡献 | 论文核心创新点 | 简短描述 |
| 🔬 关键技术 | 3 项关键技术 | 技术 1, 技术 2, 技术 3 |
| 📊 实验结果 | 主要实验结果 | 性能指标、提升幅度 |

### 研究方向标签示例

| 领域 | 标签示例 |
|------|---------|
| 强化学习 | Agentic RL, Reinforcement Learning |
| 多模态 | Multimodal, Spatial Reasoning, Vision-Language |
| 效率优化 | Efficient AI, Model Compression, Quantization |
| 代码生成 | Code Generation, Programming Assistant |
| 推理能力 | Reasoning, Structured Thinking, Planning |

---

## 🔧 故障排查 / Troubleshooting

### 问题 1: 消息发送失败

**症状**: `cron announce delivery failed`

**解决方案**:
```json
// 确保 cron 配置正确
{
  "sessionTarget": "main",
  "delivery": { "mode": "message" }
}
```

### 问题 2: Tavily 搜索失败

**症状**: `Tavily API key not found`

**解决方案**:
- 检查 Tavily API Key 是否配置
- 或使用其他搜索工具替代 Tavily

### 问题 3: 飞书文档创建失败

**症状**: `Feishu API permission denied`

**解决方案**:
1. 检查飞书配置是否正确
2. 重启 Gateway: `openclaw gateway restart`

### 问题 4: 文档内容为空

**症状**: 文档创建了但是空白

**解决方案**:
- 确保使用了 `feishu_doc(action="append")` 分块写入
- 验证 `block_count >= 50` 后再发送消息
- 检查 SKILL.md 中的工作流程是否正确

---

## 📦 依赖技能 / Dependencies

### 核心依赖

| 技能 | 必需 | 用途 |
|------|------|------|
| `tavily-search` | ✅ | AI 搜索 HuggingFace 论文 |
| `feishu-doc` | ✅ | 创建飞书云文档 |
| `feishu-bitable` | ✅ | 创建飞书多维表格 |
| `feishu-drive` | ✅ | 飞书云盘操作 |

### 可选依赖

| 技能 | 用途 |
|------|------|
| `memory-search` | 搜索历史报告 |
| `web-search` | Tavily 失败时的备用搜索 |

---

## 📝 更新日志 / Changelog

### v1.0.0 (2026-02-22)
- ✨ 初始发布
- ✅ Tavily Search 集成
- ✅ 热度前 5 论文自动选择
- ✅ 文档完整性验证（block_count >= 50）
- ✅ 飞书文档创建
- ✅ 工作日定时任务支持（周一到周五 9:00）
- ✅ 研究方向标签
- ✅ 中英文双语文档

---

## 🔒 安全提示 / Security Notice

⚠️ **重要**: 请勿将 API Keys、Secrets 等敏感信息提交到 Git 仓库。

本仓库已配置 `.gitignore`，提交前请检查：`git status`

---

## 🤝 贡献 / Contributing

欢迎提交 Issue 和 Pull Request！

- **报告问题**: https://github.com/SoraKsgn/huggingface-daily-report-skill/issues
- **功能请求**: https://github.com/SoraKsgn/huggingface-daily-report-skill/discussions

---

## 📄 许可证 / License

MIT License - 详见 [LICENSE](LICENSE)

---

## 🙏 致谢 / Acknowledgments

- [HuggingFace Daily Papers](https://huggingface.co/papers) - 论文数据源
- [OpenClaw](https://openclaw.ai) - Agent 框架
- [Tavily](https://tavily.com) - AI 搜索 API
- [阿里云百炼](https://bailian.aliyun.com/) - Qwen3.5-Plus 模型

---

## 📞 联系方式 / Contact

- **GitHub**: [@SoraKsgn](https://github.com/SoraKsgn)
- **仓库**: [huggingface-daily-report-skill](https://github.com/SoraKsgn/huggingface-daily-report-skill)
- **问题反馈**: [Issues](https://github.com/SoraKsgn/huggingface-daily-report-skill/issues)
