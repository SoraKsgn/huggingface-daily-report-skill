# 📊 HuggingFace Daily Report Skill

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![OpenClaw](https://img.shields.io/badge/OpenClaw-Skill-blue)](https://openclaw.ai)
[![GitHub](https://img.shields.io/github/stars/SoraKsgn/huggingface-daily-report-skill?style=social)](https://github.com/SoraKsgn/huggingface-daily-report-skill)
[![Model](https://img.shields.io/badge/Model-Qwen3.5--Plus-purple)](https://bailian.aliyun.com/)

**An OpenClaw Skill for automating daily HuggingFace Papers research reports**

---

## 📋 Table of Contents

- [Prerequisites](#-prerequisites)
- [Installation](#-installation)
- [Configuration](#-configuration)
- [Usage](#-usage)
- [Scheduled Tasks](#-scheduled-tasks)
- [Report Format](#-report-format)
- [Troubleshooting](#-troubleshooting)
- [Dependencies](#-dependencies)

---

## ⚠️ Prerequisites

### System Requirements

| Item | Minimum | Recommended |
|------|---------|-------------|
| **OpenClaw** | 2026.2.15+ | Latest |
| **Node.js** | 16+ | 22+ |
| **OS** | macOS / Linux / Windows | macOS / Linux |

### Required Skills

The following skills must be installed and configured:

```bash
# Check installed skills
ls ~/.openclaw/workspace/skills/
```

**Required Skills List**:

| Skill | Purpose | Installation |
|-------|---------|-------------|
| `tavily-search` | AI search for HuggingFace papers | Built-in or from ClawHub |
| `feishu-doc` | Create Feishu cloud documents | OpenClaw Feishu extension |
| `feishu-bitable` | Create Feishu Bitable tables | OpenClaw Feishu extension |
| `feishu-drive` | Feishu Drive operations | OpenClaw Feishu extension |

### Feishu Bot Configuration

#### 1. Create Feishu App

1. Visit [Feishu Open Platform](https://open.feishu.cn/app)
2. Click "Create App"
3. Fill in app information:
   - **App Name**: `HuggingFace Report Bot`
   - **App Icon**: Any
   - **App Description**: Auto-generate HuggingFace paper reports

#### 2. Configure Bot Permissions

Go to "Bot" → "Permissions", add the following permissions:

```
✅ Send Messages
✅ Create Cloud Documents
✅ Create Bitable Tables
✅ Access Drive
✅ Read User Information
```

#### 3. Get Credentials

Go to "Credentials & Basic Information", record:

```
App ID: cli_xxxxxxxxxxxxxxxx
App Secret: xxxxxxxxxxxxxxxxxxxxxxxx
```

#### 4. Configure Bot

Add to OpenClaw configuration file:

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

### API Configuration

#### Model API (Required)

Current model configuration:

| Item | Configuration |
|------|---------------|
| **Provider** | Alibaba Cloud Bailian |
| **Model Name** | Qwen3.5-Plus |
| **Model ID** | `bailian/qwen3.5-plus` |
| **Context Window** | 256K tokens |
| **Usage** | Paper content analysis, report generation |

**Configuration**:

In `~/.openclaw/openclaw.json`:

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

#### Tavily API (Optional but Recommended)

| Item | Configuration |
|------|---------------|
| **Service** | Tavily AI Search |
| **Usage** | Search HuggingFace papers |
| **Free Quota** | 1000 requests/month |
| **Config** | `TAVILY_API_KEY` environment variable |

**Get API Key**:

1. Visit https://tavily.com/
2. Register account
3. Get API Key
4. Add to environment variables:

```bash
export TAVILY_API_KEY="tvly-xxxxxxxxxxxxxxxxxxxxxxxx"
```

### Other Configuration

#### Git Configuration (for skill updates)

```bash
git config --global user.name "Your Name"
git config --global user.email "your@email.com"
```

#### SSH Key (Optional, for GitHub push)

```bash
ssh-keygen -t ed25519 -C "your@email.com"
# Add public key to GitHub: https://github.com/settings/keys
```

---

## 📦 Installation

### Method 1: Install via ClawHub (Recommended)

```bash
# Install skill
clawhub install huggingface-daily-report

# Verify installation
ls ~/.openclaw/workspace/skills/huggingface-daily-report/
```

### Method 2: Manual Installation

```bash
# 1. Clone repository
git clone https://github.com/SoraKsgn/huggingface-daily-report-skill.git

# 2. Copy to skills directory
cp -r huggingface-daily-report-skill ~/.openclaw/workspace/skills/

# 3. Verify installation
ls ~/.openclaw/workspace/skills/huggingface-daily-report/
```

### Method 3: Local Installation (Development)

```bash
# If already developing locally
cd ~/.openclaw/workspace/skills/
# Skill is already in this directory
```

---

## ⚙️ Configuration

### 1. Check Dependencies

```bash
# Check if tavily-search is installed
ls ~/.openclaw/workspace/skills/tavily-search/

# Check if feishu extension is installed
ls ~/.openclaw/extensions/feishu/
```

### 2. Configure Feishu

Edit `~/.openclaw/openclaw.json`:

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

### 3. Configure Model

Edit `~/.openclaw/openclaw.json`:

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

### 4. Configure Tavily (Optional)

```bash
# Add to ~/.zshrc or ~/.bashrc
export TAVILY_API_KEY="tvly-xxxxxxxxxxxxxxxxxxxxxxxx"

# Or add to ~/.openclaw/openclaw.json
{
  "env": {
    "TAVILY_API_KEY": "tvly-xxxxxxxxxxxxxxxxxxxxxxxx"
  }
}
```

### 5. Restart Gateway

```bash
openclaw gateway restart
```

---

## 🚀 Usage

### Basic Usage

Send in Feishu:

```
Generate today's HuggingFace paper report
```

Or specify a date:

```
Generate HuggingFace paper report for 2026-02-22
```

### Complete Workflow

The skill will automatically execute the following steps:

1. **Search Papers**: Use Tavily Search to fetch HuggingFace Daily Papers
2. **Extract Details**: Get detailed information for each paper
3. **Select Top 5**: Sort by popularity, select top 5+ papers
4. **Create Document**: Create complete report in Feishu cloud document
5. **Verify Content**: Check document integrity (block_count >= 50)
6. **Send Message**: Send condensed report + document link to Feishu

### Output Example

**Feishu Message**:

```
📊 HuggingFace Daily Papers Report - 2026-02-22

【1. Paper Title - Institution】
🏢 Institution: XXX
🔬 Research Direction: Agentic RL / Multimodal
📌 Core: ...
📊 Results: ...
🔗 HF Papers: https://huggingface.co/papers/...

📄 Full Document: https://feishu.cn/docx/...
```

**Feishu Document**:

Contains complete paper information:
- Title, Institution, Date
- Research direction tags
- All links (arXiv, PDF, HF Papers)
- Core contributions
- Key techniques (3 items)
- Experimental results

---

## ⏰ Scheduled Tasks

### Configure Weekday Reports

Edit `~/.openclaw/cron/jobs.json`:

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

**Explanation**:
- `0 9 * * 1-5`: Monday to Friday at 9:00 AM
- `sessionTarget: main`: Execute in main session (can send messages)
- `delivery.mode: message`: Send via message

### Verify Scheduled Tasks

```bash
# List scheduled tasks
openclaw cron list

# Expected output:
# ID          Name                    Schedule              Next    Status
# hf-daily... HF Daily Papers Rep...  0 9 * * 1-5          in 16h  pending
```

---

## 📋 Report Format

### Each Paper Includes

| Field | Description | Example |
|-------|-------------|---------|
| 🏢 Institution | Paper institution | Microsoft, Google, Tsinghua |
| 📅 Submission Date | Paper submission date | February 17, 2026 |
| 🔬 Research Direction | Research field tags | Agentic RL, Multimodal, Efficient AI |
| 🔗 Links | arXiv, PDF, HF Papers | https://huggingface.co/papers/... |
| 📌 Core Contribution | Core innovation | Brief description |
| 🔬 Key Techniques | 3 key techniques | Technique 1, Technique 2, Technique 3 |
| 📊 Experimental Results | Main results | Performance metrics, improvements |

### Research Direction Tags Examples

| Field | Tag Examples |
|-------|-------------|
| Reinforcement Learning | Agentic RL, Reinforcement Learning |
| Multimodal | Multimodal, Spatial Reasoning, Vision-Language |
| Efficiency | Efficient AI, Model Compression, Quantization |
| Code Generation | Code Generation, Programming Assistant |
| Reasoning | Reasoning, Structured Thinking, Planning |

---

## 🔧 Troubleshooting

### Issue 1: Message Send Failed

**Symptom**: `cron announce delivery failed`

**Solution**:
```json
// Ensure cron configuration is correct
{
  "sessionTarget": "main",
  "delivery": { "mode": "message" }
}
```

### Issue 2: Tavily Search Failed

**Symptom**: `Tavily API key not found`

**Solution**:
```bash
# Check if API Key is configured
echo $TAVILY_API_KEY

# If empty, add configuration
export TAVILY_API_KEY="tvly-xxxxxxxx"
```

### Issue 3: Feishu Document Creation Failed

**Symptom**: `Feishu API permission denied`

**Solution**:
1. Check if Feishu app permissions are complete
2. Check if App ID and App Secret are correct
3. Restart Gateway: `openclaw gateway restart`

### Issue 4: Empty Document Content

**Symptom**: Document created but blank

**Solution**:
- Ensure using `feishu_doc(action="append")` to write in blocks
- Verify `block_count >= 50` before sending message
- Check if workflow in SKILL.md is correct

---

## 📦 Dependencies

### Core Dependencies

| Skill | Required | Purpose |
|-------|----------|---------|
| `tavily-search` | ✅ | AI search for HuggingFace papers |
| `feishu-doc` | ✅ | Create Feishu cloud documents |
| `feishu-bitable` | ✅ | Create Feishu Bitable tables |
| `feishu-drive` | ✅ | Feishu Drive operations |

### Optional Dependencies

| Skill | Purpose |
|-------|---------|
| `memory-search` | Search historical reports |
| `web-search` | Fallback search if Tavily fails |

---

## 📝 Changelog

### v1.0.0 (2026-02-22)
- ✨ Initial release
- ✅ Tavily Search integration
- ✅ Automatic top 5 papers selection by popularity
- ✅ Document integrity verification (block_count >= 50)
- ✅ Feishu document creation
- ✅ Weekday-only scheduling support (Mon-Fri 9:00)
- ✅ Research direction tags
- ✅ Bilingual documentation (CN/EN)

---

## 🤝 Contributing

Issues and Pull Requests are welcome!

- **Report Issues**: https://github.com/SoraKsgn/huggingface-daily-report-skill/issues
- **Feature Requests**: https://github.com/SoraKsgn/huggingface-daily-report-skill/discussions

---

## 📄 License

MIT License - See [LICENSE](LICENSE) for details.

---

## 🙏 Acknowledgments

- [HuggingFace Daily Papers](https://huggingface.co/papers) - Paper data source
- [OpenClaw](https://openclaw.ai) - Agent framework
- [Tavily](https://tavily.com) - AI Search API
- [Alibaba Cloud Bailian](https://bailian.aliyun.com/) - Qwen3.5-Plus model

---

## 📞 Contact

- **GitHub**: [@SoraKsgn](https://github.com/SoraKsgn)
- **Repository**: [huggingface-daily-report-skill](https://github.com/SoraKsgn/huggingface-daily-report-skill)
- **Issues**: [Report bugs or request features](https://github.com/SoraKsgn/huggingface-daily-report-skill/issues)
