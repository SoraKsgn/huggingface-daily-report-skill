# 📊 HuggingFace 每日论文报告 Skill

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![OpenClaw](https://img.shields.io/badge/OpenClaw-Skill-blue)](https://openclaw.ai)
[![GitHub](https://img.shields.io/github/stars/SoraKsgn/huggingface-daily-report-skill?style=social)](https://github.com/SoraKsgn/huggingface-daily-report-skill)
[![Model](https://img.shields.io/badge/Model-Qwen3.5--Plus-purple)](https://bailian.aliyun.com/)

**自动化生成每日 HuggingFace 论文研究报告的 OpenClaw Skill**

---

## 📋 目录

- [前置要求](#-前置要求)
- [安装步骤](#-安装步骤)
- [配置说明](#-配置说明)
- [使用方法](#-使用方法)
- [定时任务](#-定时任务配置)
- [报告格式](#-报告格式)
- [故障排查](#-故障排查)
- [依赖技能](#-依赖技能)

---

## ⚠️ 前置要求

### 系统要求

| 项目 | 最低要求 | 推荐 |
|------|---------|------|
| **OpenClaw** | 2026.2.15+ | 最新版 |
| **Node.js** | 16+ | 22+ |
| **操作系统** | macOS / Linux / Windows | macOS / Linux |

### 必需的技能

以下技能必须已安装并配置：

```bash
# 检查已安装的技能
ls ~/.openclaw/workspace/skills/
```

**必需技能列表**：

| Skill | 用途 | 安装方式 |
|-------|------|---------|
| `tavily-search` | AI 搜索 HuggingFace 论文 | 已内置或从 ClawHub 安装 |
| `feishu-doc` | 创建飞书云文档 | OpenClaw Feishu 扩展 |
| `feishu-bitable` | 创建飞书多维表格 | OpenClaw Feishu 扩展 |
| `feishu-drive` | 飞书云盘操作 | OpenClaw Feishu 扩展 |

### 飞书机器人配置

#### 1. 创建飞书应用

1. 访问 [飞书开放平台](https://open.feishu.cn/app)
2. 点击「创建应用」
3. 填写应用信息：
   - **应用名称**: `HuggingFace Report Bot`
   - **应用图标**: 任意
   - **应用描述**: 自动生成 HuggingFace 论文报告

#### 2. 配置机器人权限

进入「机器人」→「权限管理」，添加以下权限：

```
✅ 发送消息
✅ 创建云文档
✅ 创建多维表格
✅ 访问云空间
✅ 读取用户信息
```

#### 3. 获取凭证

进入「凭证与基础信息」，记录：

```
App ID: cli_xxxxxxxxxxxxxxxx
App Secret: xxxxxxxxxxxxxxxxxxxxxxxx
```

#### 4. 配置机器人

在 OpenClaw 配置文件中添加：

```json
{
  "channels": {
    "feishu": {
      "enabled": true,
      "appId": "cli_xxxxxxxxxxxxxxxx",
      "appSecret": "xxxxxxxxxxxxxxxxxxxxxxxx",
      "dmPolicy": "open"
    }
  }
}
```

### API 配置

#### 模型 API（必需）

当前使用的模型配置：

| 项目 | 配置 |
|------|------|
| **模型提供商** | 阿里云百炼 (Bailian) |
| **模型名称** | Qwen3.5-Plus |
| **模型 ID** | `bailian/qwen3.5-plus` |
| **上下文窗口** | 256K tokens |
| **用途** | 论文内容分析、报告生成 |

**配置方式**：

在 `~/.openclaw/openclaw.json` 中配置：

```json
{
  "models": {
    "default": "bailian/qwen3.5-plus",
    "aliases": {
      "qwen3.5-plus": "bailian/qwen3.5-plus"
    }
  },
  "providers": {
    "bailian": {
      "apiKey": "YOUR_BAILIAN_API_KEY"
    }
  }
}
```

#### Tavily API（可选但推荐）

| 项目 | 配置 |
|------|------|
| **服务** | Tavily AI Search |
| **用途** | 搜索 HuggingFace 论文 |
| **免费额度** | 1000 次/月 |
| **配置** | `TAVILY_API_KEY` 环境变量 |

**获取 API Key**：

1. 访问 https://tavily.com/
2. 注册账号
3. 获取 API Key
4. 添加到环境变量：

```bash
export TAVILY_API_KEY="tvly-xxxxxxxxxxxxxxxxxxxxxxxx"
```

### 其他配置

#### Git 配置（用于技能更新）

```bash
git config --global user.name "Your Name"
git config --global user.email "your@email.com"
```

#### SSH Key（可选，用于 GitHub 推送）

```bash
ssh-keygen -t ed25519 -C "your@email.com"
# 添加公钥到 GitHub: https://github.com/settings/keys
```

---

## 📦 安装步骤

### 方式 1: 通过 ClawHub 安装（推荐）

```bash
# 安装技能
clawhub install huggingface-daily-report

# 验证安装
ls ~/.openclaw/workspace/skills/huggingface-daily-report/
```

### 方式 2: 手动安装

```bash
# 1. 克隆仓库
git clone https://github.com/SoraKsgn/huggingface-daily-report-skill.git

# 2. 复制到技能目录
cp -r huggingface-daily-report-skill ~/.openclaw/workspace/skills/

# 3. 验证安装
ls ~/.openclaw/workspace/skills/huggingface-daily-report/
```

### 方式 3: 从本地安装（开发用）

```bash
# 如果已经在本地开发
cd ~/.openclaw/workspace/skills/
# 技能已在此目录
```

---

## ⚙️ 配置说明

### 1. 检查依赖技能

```bash
# 检查 tavily-search 是否安装
ls ~/.openclaw/workspace/skills/tavily-search/

# 检查 feishu 扩展是否安装
ls ~/.openclaw/extensions/feishu/
```

### 2. 配置飞书

编辑 `~/.openclaw/openclaw.json`：

```json
{
  "channels": {
    "feishu": {
      "enabled": true,
      "appId": "cli_xxxxxxxxxxxxxxxx",
      "appSecret": "xxxxxxxxxxxxxxxxxxxxxxxx",
      "dmPolicy": "open",
      "allowFrom": ["*"]
    }
  }
}
```

### 3. 配置模型

编辑 `~/.openclaw/openclaw.json`：

```json
{
  "models": {
    "default": "bailian/qwen3.5-plus",
    "aliases": {
      "qwen3.5-plus": "bailian/qwen3.5-plus"
    }
  },
  "providers": {
    "bailian": {
      "apiKey": "sk-xxxxxxxxxxxxxxxxxxxxxxxx"
    }
  }
}
```

### 4. 配置 Tavily（可选）

```bash
# 添加到 ~/.zshrc 或 ~/.bashrc
export TAVILY_API_KEY="tvly-xxxxxxxxxxxxxxxxxxxxxxxx"

# 或者添加到 ~/.openclaw/openclaw.json
{
  "env": {
    "TAVILY_API_KEY": "tvly-xxxxxxxxxxxxxxxxxxxxxxxx"
  }
}
```

### 5. 重启 Gateway

```bash
openclaw gateway restart
```

---

## 🚀 使用方法

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

## ⏰ 定时任务配置

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

## 📋 报告格式

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

## 🔧 故障排查

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
```bash
# 检查 API Key 是否配置
echo $TAVILY_API_KEY

# 如果为空，添加配置
export TAVILY_API_KEY="tvly-xxxxxxxx"
```

### 问题 3: 飞书文档创建失败

**症状**: `Feishu API permission denied`

**解决方案**:
1. 检查飞书应用权限是否完整
2. 检查 App ID 和 App Secret 是否正确
3. 重启 Gateway: `openclaw gateway restart`

### 问题 4: 文档内容为空

**症状**: 文档创建了但是空白

**解决方案**:
- 确保使用了 `feishu_doc(action="append")` 分块写入
- 验证 `block_count >= 50` 后再发送消息
- 检查 SKILL.md 中的工作流程是否正确

---

## 📦 依赖技能

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

## 📝 更新日志

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

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

- **报告问题**: https://github.com/SoraKsgn/huggingface-daily-report-skill/issues
- **功能请求**: https://github.com/SoraKsgn/huggingface-daily-report-skill/discussions

---

## 📄 许可证

MIT License - 详见 [LICENSE](LICENSE)

---

## 🙏 致谢

- [HuggingFace Daily Papers](https://huggingface.co/papers) - 论文数据源
- [OpenClaw](https://openclaw.ai) - Agent 框架
- [Tavily](https://tavily.com) - AI 搜索 API
- [阿里云百炼](https://bailian.aliyun.com/) - Qwen3.5-Plus 模型

---

## 📞 联系方式

- **GitHub**: [@SoraKsgn](https://github.com/SoraKsgn)
- **仓库**: [huggingface-daily-report-skill](https://github.com/SoraKsgn/huggingface-daily-report-skill)
- **问题反馈**: [Issues](https://github.com/SoraKsgn/huggingface-daily-report-skill/issues)
