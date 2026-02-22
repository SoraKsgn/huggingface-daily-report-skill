// Example paper data structure for HuggingFace Daily Report

const examplePapers = [
  {
    title: "SpargeAttention2: Trainable Sparse Attention via Hybrid Top-k+Top-p Masking",
    institution: "Tsinghua University（清华大学）",
    date: "2026 年 2 月 13 日",
    links: {
      project: "https://github.com/thu-ml/SpargeAttn",
      arxiv: "https://arxiv.org/abs/2602.13515",
      pdf: "https://arxiv.org/pdf/2602.13515",
      hfPapers: "https://huggingface.co/papers/2602.13515"
    },
    coreContribution: "提出了一种名为 SpargeAttention2 的可训练稀疏注意力方法，通过混合掩码规则和蒸馏式微调，在扩散模型中实现高稀疏度同时保持生成质量。",
    keyTechniques: [
      {
        name: "混合掩码规则",
        description: "结合 Top-k 和 Top-p 两种常见掩码规则，在高稀疏度下实现更鲁棒的掩码"
      },
      {
        name: "高效可训练实现",
        description: "提出高效的可训练稀疏注意力实现方式"
      },
      {
        name: "蒸馏式微调目标",
        description: "更好地在稀疏注意力微调过程中保持生成质量"
      }
    ],
    experimentalResults: [
      "在视频扩散模型上达到 **95% 注意力稀疏度**",
      "实现 **16.2 倍注意力加速**",
      "保持一致的生成质量，持续优于先前的稀疏注意力方法"
    ]
  },
  {
    title: "Mobile-Agent-v3.5: Multi-platform Fundamental GUI Agents",
    institution: "TongyiLab（阿里通义实验室）",
    date: "2026 年 2 月 14 日",
    links: {
      project: "https://github.com/X-PLUG/MobileAgent/tree/main/Mobile-Agent-v3.5",
      arxiv: "https://arxiv.org/abs/2602.16855",
      pdf: "https://arxiv.org/pdf/2602.16855",
      hfPapers: "https://huggingface.co/papers/2602.16855"
    },
    coreContribution: "推出 GUI-Owl-1.5，最新原生 GUI 代理模型，提供多种尺寸 (2B/4B/8B/32B/235B)，支持多平台（桌面、移动、浏览器等），实现云边协作和实时交互。",
    keyTechniques: [
      {
        name: "混合数据飞轮",
        description: "结合模拟环境和云端沙盒环境构建 UI 理解和轨迹生成的数据管道"
      },
      {
        name: "统一增强 Agent 能力",
        description: "使用统一思维合成管道增强推理能力，重点关注 Tool/MCP 使用、记忆和多 Agent 适配"
      },
      {
        name: "多平台环境 RL 扩展",
        description: "提出新的环境 RL 算法 MRPO，解决多平台冲突和长程任务训练效率低的问题"
      }
    ],
    experimentalResults: [
      "GUI 自动化任务：OSWorld **56.5**, AndroidWorld **71.6**, WebArena **48.4**",
      "定位任务：ScreenSpotPro **80.3**",
      "工具调用任务：OSWorld-MCP **47.6**, MobileWorld **46.8**",
      "记忆和知识任务：GUI-Knowledge Bench **75.5**"
    ]
  }
];

// Example trend summary
const exampleTrends = {
  sectionNumber: 9,
  items: [
    {
      title: "Agent 方向持续火热",
      description: "Mobile-Agent-v3.5、车载 Agent 反馈研究、CTA 框架等多篇论文聚焦 Agent 领域"
    },
    {
      title: "效率优化",
      description: "SpargeAttention2 和 DDiT 分别针对注意力机制和 Diffusion Transformer 提出高效方案"
    },
    {
      title: "大模型技术报告",
      description: "Arcee 发布 400B 参数 MoE 大模型"
    },
    {
      title: "人机交互",
      description: "车载 AI 助手反馈机制研究和人类 - 机器人触觉转移"
    },
    {
      title: "生成模型",
      description: "Google 提出 Unified Latents 框架优化潜在表示学习"
    }
  ]
};

// Example Bitable data for model specifications
const exampleBitableData = [
  {
    model: "Trinity Nano",
    totalParams: "6B",
    activeParams: "1B",
    trainingData: "10 万亿 tokens"
  },
  {
    model: "Trinity Mini",
    totalParams: "26B",
    activeParams: "3B",
    trainingData: "10 万亿 tokens"
  },
  {
    model: "Trinity Large",
    totalParams: "400B",
    activeParams: "13B",
    trainingData: "17 万亿 tokens"
  }
];

module.exports = {
  examplePapers,
  exampleTrends,
  exampleBitableData
};
