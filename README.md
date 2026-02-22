# 📊 HuggingFace Daily Report Skill

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![OpenClaw](https://img.shields.io/badge/OpenClaw-Skill-blue)](https://openclaw.ai)

**自动化生成每日 HuggingFace 论文研究报告的 OpenClaw Skill**

## ✨ 特性

- 🔍 **真实数据**: 使用 Tavily Search 获取 HuggingFace 每日论文
- 📋 **热度排序**: 自动选择当天热度前 5+ 的论文
- 📄 **完整报告**: 包含论文标题、机构、研究方向、链接、核心贡献、关键技术、实验结果
- 🎯 **验证机制**: 强制验证文档内容完整性（block_count >= 50）
- 📱 **飞书集成**: 自动创建 Feishu 云文档，支持 Bitable 表格
- ⏰ **智能调度**: 支持工作日定时任务（周一到周五 9:00）
- 🔗 **HF 链接**: 每篇论文都包含 HuggingFace Papers 链接

## 📦 安装

```bash
# 通过 ClawHub 安装（推荐）
clawhub install huggingface-daily-report

# 或者手动克隆
git clone https://github.com/YOUR_USERNAME/huggingface-daily-report-skill.git
cp -r huggingface-daily-report-skill ~/.openclaw/workspace/skills/
```

## 🚀 使用方法

### 基本用法

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

### 定时任务配置

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

## 📁 文件结构

```
huggingface-daily-report/
├── SKILL.md              # 技能说明（完整工作流程和规范）
├── README.md             # 使用指南
├── package.json          # 技能元数据
├── .gitignore            # Git 忽略文件
├── scripts/
│   ├── generate_report.js    # 报告生成脚本
│   ├── create_document.js    # 文档创建脚本
│   └── example_data.js       # 示例数据
└── references/           # 参考资料目录
```

## 📋 报告格式示例

### 消息格式

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

### 文档内容

每篇论文包含：
- 🏢 机构
- 📅 提交日期
- 🔬 研究方向
- 🔗 链接（arXiv、PDF、HF Papers）
- 📌 核心贡献
- 🔬 关键技术
- 📊 实验结果

## 🔧 依赖

- Node.js 16+
- OpenClaw 2026.2.15+
- Tavily Search Skill
- Feishu Doc Skill
- Feishu Bitable Skill

## 📝 更新日志

### v1.0.0 (2026-02-22)
- ✨ 初始发布
- ✅ Tavily Search 集成
- ✅ 热度前 5 论文自动选择
- ✅ 文档完整性验证
- ✅ 飞书文档创建
- ✅ 工作日定时任务支持

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

## 📄 许可证

MIT License - 详见 [LICENSE](LICENSE)

## 🙏 致谢

- [HuggingFace Daily Papers](https://huggingface.co/papers) - 论文数据源
- [OpenClaw](https://openclaw.ai) - Agent 框架
- [Tavily](https://tavily.com) - AI 搜索 API
