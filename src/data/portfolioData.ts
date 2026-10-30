export interface Project {
  id: string;
  title: string;
  subtitle: string;
  category: 'ai' | 'systems' | 'devtools';
  year: string;
  image: string;
  summary: string;
  highlightMetric: string;
  tags: string[];
  githubUrl?: string;
  liveUrl?: string;
  caseStudy: {
    overview: string;
    challenge: string;
    architecture: {
      title: string;
      description: string;
      diagramSteps: string[];
    };
    keyDecisions: string[];
    results: { label: string; value: string; detail: string }[];
    demoType?: 'agent' | 'telemetry' | 'canvas';
  };
}

export interface SkillCategory {
  title: string;
  description: string;
  skills: { name: string; level: number; experience: string; note: string }[];
}

export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  period: string;
  location: string;
  summary: string;
  achievements: string[];
  techStack: string[];
}

export interface Article {
  id: string;
  title: string;
  slug: string;
  date: string;
  readTime: string;
  category: string;
  excerpt: string;
  content: string[];
  keyTakeaways: string[];
}

export const PERSONAL_INFO = {
  name: 'Kishan Yadav',
  role: 'Staff Systems Architect & AI Engineer',
  tagline: 'Engineering resilient distributed systems and intelligent human-AI interfaces at scale.',
  bio: 'Specializing in high-throughput distributed systems, autonomous multi-agent orchestration, and sub-second human-AI interactions. 8+ years shipping mission-critical infrastructure handling tens of millions of daily operations.',
  email: 'kishanyadav743@gmail.com',
  github: 'https://github.com',
  linkedin: 'https://linkedin.com',
  twitter: 'https://x.com',
  location: 'San Francisco, CA & Global Remote',
  availability: 'Available for Select Advisory & Architecture Consulting',
  metrics: [
    { label: 'Years Experience', value: '8+', caption: 'Production software' },
    { label: 'Peak Operations', value: '45M/d', caption: 'Processed reliably' },
    { label: 'System Uptime', value: '99.99%', caption: 'Production SLA' },
    { label: 'Open Source Tools', value: '24', caption: 'Packages & libraries' },
  ],
  heroImage: '/src/assets/images/hero_engineer_portrait_1793358313824.jpg',
};

export const PROJECTS: Project[] = [
  {
    id: 'aether-flow',
    title: 'AetherFlow',
    subtitle: 'Autonomous Agent Orchestration Engine',
    category: 'ai',
    year: '2026',
    image: '/src/assets/images/project_ai_orchestration_1793358313888.jpg',
    summary: 'A high-concurrency event-driven orchestrator for multi-agent reasoning graphs, dynamic vector memory compaction, and deterministic state recovery.',
    highlightMetric: '4.2x faster agent convergence · 12k concurrent graph loops',
    tags: ['Rust', 'TypeScript', 'WebSockets', 'Vector Store', 'gRPC'],
    githubUrl: 'https://github.com',
    liveUrl: 'https://example.com/aetherflow',
    caseStudy: {
      overview: 'Modern agentic workflows suffer from runaway recursive execution, state divergence, and prohibitive context token latency when orchestrating multiple collaborating models.',
      challenge: 'Scaling agentic reasoning across 10,000+ parallel business processes without unbounded token accumulation or cascading failure loops during tool invocations.',
      architecture: {
        title: 'Directed Acyclic Graph (DAG) Execution Pipeline',
        description: 'Engineered a Rust-based worker pool that translates natural language task decomposition into isolated Directed Acyclic Graph execution steps with transaction rollbacks.',
        diagramSteps: [
          'Task Ingestion & Semantic Intent Classifier (sub-10ms)',
          'Topological Graph Planner with Dynamic Tool Permissions',
          'Episodic Working Memory Compactor (sliding semantic compression)',
          'Consensus Evaluator & Automated Loop Mitigation',
        ],
      },
      keyDecisions: [
        'Implemented custom zero-copy binary serialization between worker threads, eliminating 68% of node IPC overhead.',
        'Engineered an adaptive context pruning algorithm that cuts token bloat by 52% while retaining 98.4% retrieval accuracy.',
        'Constructed deterministic replay logs for debugging edge-case execution paths post-mortem.',
      ],
      results: [
        { label: 'Task Latency', value: '-62%', detail: 'Mean completion time from 4.8s to 1.8s' },
        { label: 'Concurrency', value: '12,500', detail: 'Simultaneous active agent loops per cluster' },
        { label: 'Token Efficiency', value: '52% Saved', detail: 'Context window compression reduction' },
      ],
      demoType: 'agent',
    },
  },
  {
    id: 'pulse-scale',
    title: 'PulseScale',
    subtitle: 'High-Throughput Edge Telemetry Pipeline',
    category: 'systems',
    year: '2025',
    image: '/src/assets/images/project_edge_analytics_1793358315416.jpg',
    summary: 'Distributed telemetry ingestion engine capable of processing 45M events per second with sub-12ms p99 query latency on columnar edge storage.',
    highlightMetric: '45M events/sec · p99 < 12ms · 60% compute cost reduction',
    tags: ['Go', 'ClickHouse', 'Kafka', 'eBPF', 'React'],
    githubUrl: 'https://github.com',
    liveUrl: 'https://example.com/pulsescale',
    caseStudy: {
      overview: 'High-frequency microservice infrastructures generate petabytes of metric points that overwhelm traditional time-series databases during traffic anomalies.',
      challenge: 'Achieving sub-second anomaly detection across 200,000 edge nodes without incurring millions in annual cloud ingestion costs.',
      architecture: {
        title: 'Zero-Allocation Kernel-Level Metric Ingestion',
        description: 'Leveraged eBPF kernel probes to aggregate TCP socket metrics directly in kernel memory before feeding batched columnar streams into distributed ClickHouse clusters.',
        diagramSteps: [
          'eBPF Kernel Probes capturing socket packet timings',
          'Shared Ring-Buffer Ingestion without user-space context switches',
          'Partitioned Kafka Bus with adaptive LZ4 compression',
          'Distributed Columnar Aggregation with 1-second rollups',
        ],
      },
      keyDecisions: [
        'Bypassed user-space syscalls by writing custom eBPF filters for zero-allocation telemetry scraping.',
        'Swapped traditional row-based storage for specialized columnar ClickHouse schemas with dictionary encoding.',
        'Implemented tiered data retention: hot NVMe for 7 days, cold S3 object storage for 180 days with seamless federated SQL.',
      ],
      results: [
        { label: 'Throughput', value: '45M / sec', detail: 'Sustained metric event ingestion rate' },
        { label: 'p99 Latency', value: '11.4 ms', detail: 'Query response across multi-billion row tables' },
        { label: 'Infrastructure Cost', value: '-58%', detail: 'Annual cloud spend reduction' },
      ],
      demoType: 'telemetry',
    },
  },
  {
    id: 'vektra-studio',
    title: 'Vektra Studio',
    subtitle: 'Collaborative Real-Time Vector Canvas',
    category: 'devtools',
    year: '2025',
    image: '/src/assets/images/project_collaborative_design_1793358314961.jpg',
    summary: 'A sub-16ms collaborative digital workspace supporting 100+ concurrent editors on infinite vector canvas surfaces using CRDTs and WebAssembly.',
    highlightMetric: '60 FPS multi-cursor canvas · < 25ms conflict resolution',
    tags: ['TypeScript', 'WebGL', 'WebAssembly', 'CRDTs', 'Rust'],
    githubUrl: 'https://github.com',
    liveUrl: 'https://example.com/vektra',
    caseStudy: {
      overview: 'Building fluid web canvas apps often leads to browser thread lockups when dozens of remote users mutate complex vector paths concurrently.',
      challenge: 'Providing buttery-smooth 60 FPS viewport transforms while synchronizing complex Bezier curves and boolean geometry operations over high-latency networks.',
      architecture: {
        title: 'Decoupled GPU Render Pipeline + State Synchronization',
        description: 'Separated the rendering engine into an offscreen WebGL canvas driven by Rust WebAssembly, synced via state-based Yjs CRDTs over WebSockets.',
        diagramSteps: [
          'Input events sampled at 120Hz on dedicated animation frame loop',
          'Wasm Bezier tessellation and spatial BVH tree acceleration',
          'Yjs CRDT delta compression for state mutations',
          'P2P WebRTC fallback for ultra-low latency cursor sync',
        ],
      },
      keyDecisions: [
        'Rendered vector geometry directly on GPU via custom shader tessellation instead of DOM SVG nodes.',
        'Used compact binary delta encoding for CRDT updates, reducing network overhead to under 4KB/sec per active editor.',
        'Added offline-first capability with IndexedDB snapshot persistence and automated conflict resolution.',
      ],
      results: [
        { label: 'Framerate', value: '60 FPS', detail: 'Consistent under 100 concurrent collaborators' },
        { label: 'Sync Latency', value: '< 22 ms', detail: 'Cross-continental cursor update delivery' },
        { label: 'Memory Footprint', value: '48 MB', detail: 'Average tab memory consumption' },
      ],
      demoType: 'canvas',
    },
  },
  {
    id: 'hypershard-kv',
    title: 'HyperShard KV',
    subtitle: 'Distributed In-Memory Consistent Store',
    category: 'systems',
    year: '2024',
    image: '/src/assets/images/project_ai_orchestration_1793358313888.jpg',
    summary: 'Fault-tolerant distributed key-value store using Consistent Hashing with virtual vnodes, Gossip protocol node discovery, and Raft consensus.',
    highlightMetric: '850k ops/sec · Zero-downtime cluster rebalancing',
    tags: ['Go', 'Raft Consensus', 'Consistent Hashing', 'gRPC'],
    githubUrl: 'https://github.com',
    liveUrl: 'https://example.com/hypershard',
    caseStudy: {
      overview: 'Standard cache clusters suffer severe cache invalidation thundering herds and node eviction spikes when expanding or contracting host fleets.',
      challenge: 'Distributing data across dynamically elastic Kubernetes pods without triggering expensive global key migrations or cache misses.',
      architecture: {
        title: 'Virtual Ring Partitioning with Dynamic Weighting',
        description: 'Configured 256 virtual nodes per physical host on a 160-bit SHA-1 consistent ring, ensuring only 1/N keys migrate during cluster topology adjustments.',
        diagramSteps: [
          'Murmur3 Key Hash generation & Ring Token mapping',
          'Virtual Node Lookup in O(log N) binary search tree',
          'Quorum Read/Write verification (W=2, R=2, N=3)',
          'Merkle Tree anti-entropy background reconciliation',
        ],
      },
      keyDecisions: [
        'Implemented Raft leader election for partition metadata while maintaining leaderless dynamo-style read/writes for payload keys.',
        'Designed active write pipelining that batches network syscalls into 64KB TCP frames.',
        'Integrated automated Merkle tree state sync to resolve partition splits cleanly without manual intervention.',
      ],
      results: [
        { label: 'Throughput', value: '850K ops/s', detail: 'Benchmarked on 5-node c6i.4xlarge cluster' },
        { label: 'Rebalance Overhead', value: '< 3.8%', detail: 'Keys migrated during node join/leave' },
        { label: 'Fault Tolerance', value: '2 Node Loss', detail: 'Continuous availability without data loss' },
      ],
    },
  },
  {
    id: 'synapse-cli',
    title: 'Synapse CLI',
    subtitle: 'Developer Toolchain for AI Evaluation',
    category: 'devtools',
    year: '2024',
    image: '/src/assets/images/project_edge_analytics_1793358315416.jpg',
    summary: 'A fast, scriptable terminal tool for automated prompt regression testing, synthetic data generation, and semantic drift detection.',
    highlightMetric: '15k GitHub stars · 180+ engineering teams adopted',
    tags: ['TypeScript', 'Node.js', 'CLI', 'Docker', 'SQLite'],
    githubUrl: 'https://github.com',
    liveUrl: 'https://example.com/synapse',
    caseStudy: {
      overview: 'Engineers deploying LLMs to production lacked the rigorous regression tooling standard in traditional software compilation and CI/CD pipelines.',
      challenge: 'Automating quality gates and semantic safety checks across 500+ test scenarios within a developer’s local 30-second git pre-push hook.',
      architecture: {
        title: 'Parallel Evaluation Runner & Drift Metric Engine',
        description: 'Lightweight daemon running test matrices locally with cached vector embeddings and deterministic golden test fixtures.',
        diagramSteps: [
          'Pre-commit trigger parsing changed prompt templates',
          'Concurrent batch execution against local mock or remote APIs',
          'Cosine similarity & BLEU / semantic judge scoring',
          'Terminal rich report with side-by-side diff matrix',
        ],
      },
      keyDecisions: [
        'Cached embedding computations in local embedded SQLite, enabling sub-second re-runs on incremental prompt edits.',
        'Created expressive YAML assertion DSL allowing engineers to write unit tests for probabilistic outputs.',
        'Packaged as a standalone zero-dependency single binary.',
      ],
      results: [
        { label: 'Adoption', value: '15,000+', detail: 'Developers across enterprise AI teams' },
        { label: 'Evaluation Speed', value: '4x Faster', detail: 'Compared to existing Python-based suites' },
        { label: 'Prompt Regressions', value: '-82%', detail: 'Fewer production hallucinations reported' },
      ],
    },
  },
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    title: 'Distributed Systems & Backend',
    description: 'High-concurrency servers, event streaming, memory stores, and fault-tolerant architecture.',
    skills: [
      { name: 'Rust & Go', level: 95, experience: '6+ yrs', note: 'Low-latency network servers, zero-copy memory buffers, custom daemons' },
      { name: 'Distributed Consensus (Raft / Paxos)', level: 90, experience: '5+ yrs', note: 'Cluster leader election, state machine replication, quorum reads' },
      { name: 'Kafka & Event Streaming', level: 92, experience: '7+ yrs', note: 'Partitioned logs, consumer groups, exactly-once processing pipelines' },
      { name: 'ClickHouse, PostgreSQL, Redis', level: 94, experience: '8+ yrs', note: 'Columnar analytical queries, query optimization, high-throughput caching' },
      { name: 'gRPC & Protocol Buffers', level: 90, experience: '6+ yrs', note: 'High-speed microservice RPC, schema versioning, bi-directional streams' },
    ],
  },
  {
    title: 'AI & Intelligent Systems Architecture',
    description: 'Agentic workflows, model orchestration, embedding pipelines, and semantic evaluation.',
    skills: [
      { name: 'Multi-Agent Graph Orchestration', level: 95, experience: '3+ yrs', note: 'DAG task scheduling, episodic memory compaction, tool call routing' },
      { name: 'Vector Databases (Pinecone, Qdrant, pgvector)', level: 92, experience: '4+ yrs', note: 'HNSW indexing, hybrid lexical/semantic retrieval, reranking' },
      { name: 'Gemini & Modern LLM Integration', level: 96, experience: '4+ yrs', note: 'Structured JSON outputs, function calling, multimodal inputs, streaming' },
      { name: 'Evaluation Harnesses & Drift Detection', level: 90, experience: '3+ yrs', note: 'Automated CI/CD test matrices, hallucination mitigation, prompt DSL' },
    ],
  },
  {
    title: 'Frontend & Human-Computer Interface',
    description: 'Design systems, performant web applications, canvas rendering, and real-time collaboration.',
    skills: [
      { name: 'TypeScript & Modern React (v19)', level: 98, experience: '8+ yrs', note: 'Concurrent rendering, custom hooks architecture, strict type safety' },
      { name: 'Tailwind CSS & Design Systems', level: 95, experience: '6+ yrs', note: 'Zero-slop design constitution, accessible UI tokens, dark mode systems' },
      { name: 'WebGL, Canvas & WebAssembly', level: 88, experience: '4+ yrs', note: 'GPU-accelerated rendering, 60 FPS viewports, Wasm numerical logic' },
      { name: 'CRDTs & Real-time Collaboration (Yjs)', level: 90, experience: '4+ yrs', note: 'Conflict-free state replication, undo/redo stacks, presence awareness' },
    ],
  },
  {
    title: 'Cloud, Infrastructure & SRE',
    description: 'Cloud-native deployments, container orchestration, observability, and cost governance.',
    skills: [
      { name: 'Kubernetes & Docker', level: 92, experience: '7+ yrs', note: 'Production cluster management, custom operators, Helm packaging' },
      { name: 'GCP & AWS Cloud Architecture', level: 94, experience: '8+ yrs', note: 'Serverless containers, VPC peering, global CDN, multi-region failover' },
      { name: 'Terraform & Infrastructure as Code', level: 88, experience: '5+ yrs', note: 'Declarative resource provisioning, state locking, module design' },
      { name: 'Observability (Prometheus, Grafana, eBPF)', level: 92, experience: '6+ yrs', note: 'SLO/SLI alerts, distributed tracing (OpenTelemetry), kernel metrics' },
    ],
  },
];

export const EXPERIENCES: ExperienceItem[] = [
  {
    id: 'exp-1',
    role: 'Staff Systems Architect',
    company: 'Hyperscale Labs',
    period: '2023 — Present',
    location: 'San Francisco, CA (Hybrid)',
    summary: 'Lead architectural direction for core distributed runtime and agent orchestration platforms serving Fortune 500 enterprise clients.',
    achievements: [
      'Architected AetherFlow engine handling over 12,000 concurrent autonomous task loops with 99.99% uptime.',
      'Reduced average agent workflow latency by 62% through speculative execution and sliding vector window compaction.',
      'Mentored a team of 18 senior backend and platform engineers across distributed systems and AI disciplines.',
      'Authored corporate engineering standards for zero-downtime database migrations and distributed consensus.',
    ],
    techStack: ['Rust', 'Go', 'Kubernetes', 'ClickHouse', 'TypeScript', 'Gemini APIs'],
  },
  {
    id: 'exp-2',
    role: 'Senior Platform Engineer',
    company: 'CloudVector Technologies',
    period: '2020 — 2023',
    location: 'New York, NY (Remote)',
    summary: 'Designed and scaled the real-time telemetry pipeline, ingest pipelines, and distributed event bus for edge IoT infrastructure.',
    achievements: [
      'Scaled telemetry pipeline from 5M to 45M events per second while slashing infrastructure costs by 58%.',
      'Engineered kernel-level eBPF packet capture reducing CPU usage by 40% across 200,000 connected nodes.',
      'Implemented consistent hashing distributed cache preventing stampede thundering herds during cluster scaling.',
      'Received the annual Engineering Excellence Award for zero-outage multi-region migration.',
    ],
    techStack: ['Go', 'Kafka', 'ClickHouse', 'eBPF', 'Terraform', 'React'],
  },
  {
    id: 'exp-3',
    role: 'Lead Full-Stack Engineer',
    company: 'Nexus Intelligence',
    period: '2018 — 2020',
    location: 'Austin, TX',
    summary: 'Spearheaded frontend design systems and high-frequency analytical dashboards for quantitative risk analysts.',
    achievements: [
      'Built a WebGL-based financial visualization engine rendering 500k data points at 60 FPS in browser viewports.',
      'Created component library used by 6 internal product squads, reducing feature cycle delivery by 35%.',
      'Established continuous automated testing pipeline reaching 94% unit and end-to-end test coverage.',
    ],
    techStack: ['TypeScript', 'React', 'WebGL', 'Node.js', 'PostgreSQL', 'Docker'],
  },
];

export const ARTICLES: Article[] = [
  {
    id: 'article-1',
    title: 'Designing Predictable Latency in LLM Agent Swarms',
    slug: 'predictable-latency-agent-swarms',
    date: 'February 2026',
    readTime: '6 min read',
    category: 'AI Architecture',
    excerpt: 'How we mitigated tail latency spikes and infinite recursion in multi-agent graph workflows using speculative execution and topological barriers.',
    keyTakeaways: [
      'Recursive prompt chaining causes compounding tail latencies (p99 > 15s).',
      'Speculative tool branch execution cuts wall-clock time by 42%.',
      'Semantic checkpointing prevents state corruption during model failures.',
    ],
    content: [
      'When deploying production multi-agent systems, the most insidious issue is not model accuracy—it is non-deterministic latency compounding. When Agent A depends on Agent B, which invokes two external tools before delegating to Agent C, your p99 latency degrades geometrically.',
      'To solve this in AetherFlow, we transitioned from traditional synchronous message passing to a topological DAG barrier scheduler. Independent tool calls are executed concurrently across an asynchronous Tokio pool in Rust.',
      'Furthermore, we introduced an episodic memory compression protocol. Instead of appending full conversation turns to the context window, an embedding-based similarity filter extracts only actionable key-value mutations. The result is a 52% reduction in prompt tokens with zero loss in analytical reasoning.',
    ],
  },
  {
    id: 'article-2',
    title: 'Consistent Hashing & Dynamic Sharding in Modern Edge Stores',
    slug: 'consistent-hashing-dynamic-sharding',
    date: 'December 2025',
    readTime: '8 min read',
    category: 'Distributed Systems',
    excerpt: 'A practical breakdown of virtual node ring partitioning, Merkle anti-entropy trees, and minimizing key rebalance overhead during node membership shifts.',
    keyTakeaways: [
      'Naive modulo hashing triggers massive cache invalidation during auto-scaling.',
      'Virtual nodes (vnodes) smooth out distribution variance across uneven server hardware.',
      'Merkle tree comparison detects partition divergence with logarithmic network bandwidth.',
    ],
    content: [
      'In a distributed key-value store, standard hashing formulas (hash(key) % N) fail catastrophically when servers are added or removed: almost every key maps to a new server index, inducing a complete cache miss blizzard.',
      'Consistent hashing maps both keys and servers to a uniform 360-degree circular keyspace. When a node leaves, only keys assigned to that immediate segment need reassignment (1/N of total data).',
      'In our implementation, we assign 256 virtual node tokens per physical core. By weighting token density according to available RAM and network bandwidth, heterogeneous clusters achieve near-perfect uniform distribution with under 0.8% variance.',
    ],
  },
  {
    id: 'article-3',
    title: 'From 0 to 45M Events/Sec: Anatomy of an eBPF Telemetry Pipeline',
    slug: 'ebpf-telemetry-pipeline-45m-events',
    date: 'September 2025',
    readTime: '10 min read',
    category: 'Kernel & Systems',
    excerpt: 'Replacing user-space scraping with Linux kernel probes to achieve zero-copy metric aggregation without impacting production application throughput.',
    keyTakeaways: [
      'User-space syscall overhead dominates telemetry compute costs at scale.',
      'eBPF programs run safely in kernel context with verification guarantees.',
      'Columnar batching in ClickHouse maximizes compression ratios up to 14:1.',
    ],
    content: [
      'At 45 million events per second, the context-switch cost of user-space syscalls (read, write, poll) consumes more CPU cycles than the actual business logic of the host application.',
      'By compiling targeted eBPF bytecode loaded directly into Linux kernel sockets, we aggregate TCP packet timings, HTTP request boundaries, and error codes in shared ring-buffers in kernel memory.',
      'The user-space collector only awakens once per second to pull already-aggregated statistical summaries, feeding LZ4-compressed Kafka streams that write directly into columnar ClickHouse engines.',
    ],
  },
];

export const TESTIMONIALS = [
  {
    quote: 'Kishan transformed our core data infrastructure. He possesses that rare dual ability: designing mathematically sound distributed systems architectures while executing flawless production deployments.',
    author: 'Elena Rostova',
    role: 'VP of Engineering',
    company: 'Hyperscale Technologies',
  },
  {
    quote: 'Working with Kishan on autonomous agent pipelines was a masterclass in software craftsmanship. His attention to latency, failure modes, and developer ergonomics is unmatched.',
    author: 'Marcus Chen, Ph.D.',
    role: 'Lead AI Research Scientist',
    company: 'Vector Foundation',
  },
  {
    quote: 'Kishan designed and shipped our high-throughput pipeline under an aggressive deadline with zero downtime. He simply delivers at the highest engineering standard.',
    author: 'Sarah Jenkins',
    role: 'Chief Technology Officer',
    company: 'StreamMetrics Corp',
  },
];
