import React, { useState, useEffect } from 'react';
import { Terminal, Cpu, Database, Activity, Play, Pause, RotateCcw, Zap, Server, ShieldCheck } from 'lucide-react';

export const InteractiveLab: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'tokens' | 'hashing' | 'topology'>('tokens');

  // --- TAB 1: AI Token Stream Simulator State ---
  const [concurrency, setConcurrency] = useState<number>(16);
  const [modelType, setModelType] = useState<'flash' | 'pro' | 'mesh'>('flash');
  const [speculativeDecoding, setSpeculativeDecoding] = useState<boolean>(true);
  const [isStreaming, setIsStreaming] = useState<boolean>(false);
  const [streamedText, setStreamedText] = useState<string>('');
  const [tokenCounter, setTokenCounter] = useState<number>(0);

  const sampleStream = [
    'Synthesizing', 'topological', 'execution', 'graph...', 'Resolving', 'epistemic', 'dependencies', 'across', 'distributed', 'worker', 'threads.',
    'Verified', 'zero-copy', 'IPC', 'buffer.', 'Compacting', 'episodic', 'memory', 'vectors', 'with', 'sliding', 'HNSW', 'cosine', 'index.',
    'Consensus', 'quorum', 'achieved:', '3/3', 'nodes', 'acknowledged.', 'Dispatching', 'synthesized', 'result', 'to', 'downstream', 'consumer.'
  ];

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isStreaming) {
      interval = setInterval(() => {
        setTokenCounter((prev) => {
          const nextIndex = prev % sampleStream.length;
          setStreamedText((current) => current + (current ? ' ' : '') + sampleStream[nextIndex]);
          return prev + 1;
        });
      }, speculativeDecoding ? 65 : 130);
    }
    return () => clearInterval(interval);
  }, [isStreaming, speculativeDecoding]);

  const resetTokenStream = () => {
    setIsStreaming(false);
    setStreamedText('');
    setTokenCounter(0);
  };

  // Derived metrics for AI Simulator
  const baseTps = modelType === 'flash' ? 180 : modelType === 'pro' ? 85 : 240;
  const speedMultiplier = speculativeDecoding ? 1.6 : 1.0;
  const effectiveTps = Math.round(baseTps * speedMultiplier * (concurrency > 8 ? 0.92 : 1));
  const ttftMs = modelType === 'flash' ? (speculativeDecoding ? 68 : 110) : 210;

  // --- TAB 2: Consistent Hashing State ---
  const [hashMode, setHashMode] = useState<'consistent' | 'modulo'>('consistent');
  const [clusterNodes, setClusterNodes] = useState<string[]>(['Node-01 (US-East)', 'Node-02 (EU-West)', 'Node-03 (AP-South)']);
  const [testKey, setTestKey] = useState<string>('session:usr_98412');
  const [keyRebalanceLog, setKeyRebalanceLog] = useState<string>('Cluster stable. 100% cache hit retention.');

  const sampleKeys = [
    'session:usr_98412',
    'cart:checkout_4412',
    'telemetry:edge_sensor_09',
    'auth:token_bearer_81',
    'cache:rendered_svg_bento',
  ];

  const getAssignedNode = (key: string, nodes: string[], mode: 'consistent' | 'modulo'): string => {
    if (nodes.length === 0) return 'None';
    // Simple deterministic string hash
    let hash = 0;
    for (let i = 0; i < key.length; i++) {
      hash = (hash << 5) - hash + key.charCodeAt(i);
      hash |= 0;
    }
    const positiveHash = Math.abs(hash);
    if (mode === 'modulo') {
      const idx = positiveHash % nodes.length;
      return nodes[idx];
    } else {
      // Virtual node distribution
      const ringToken = positiveHash % 360;
      const slice = 360 / nodes.length;
      const nodeIndex = Math.floor(ringToken / slice) % nodes.length;
      return nodes[nodeIndex];
    }
  };

  const addClusterNode = () => {
    if (clusterNodes.length >= 6) return;
    const newId = `Node-0${clusterNodes.length + 1} (${['SA-East', 'ME-Central', 'CA-Central'][clusterNodes.length - 3] || 'Edge'})`;
    const newNodes = [...clusterNodes, newId];
    setClusterNodes(newNodes);
    
    if (hashMode === 'modulo') {
      setKeyRebalanceLog(`⚠️ Naive Modulo: Adding node triggered ~${Math.round((1 - 1 / newNodes.length) * 100)}% key reassignment! Severe cache invalidation.`);
    } else {
      setKeyRebalanceLog(`✅ Consistent Hashing: Adding node only migrated ~${Math.round((1 / newNodes.length) * 100)}% of keys. Remaining ${Math.round((1 - 1 / newNodes.length) * 100)}% cache keys preserved intact!`);
    }
  };

  const removeClusterNode = () => {
    if (clusterNodes.length <= 2) return;
    const newNodes = clusterNodes.slice(0, clusterNodes.length - 1);
    setClusterNodes(newNodes);

    if (hashMode === 'modulo') {
      setKeyRebalanceLog(`⚠️ Naive Modulo: Evicting node triggered ~${Math.round((1 - 1 / newNodes.length) * 100)}% key reassignment! Severe cache drop.`);
    } else {
      setKeyRebalanceLog(`✅ Consistent Hashing: Only orphaned keys on evicted node reassigned. ~${Math.round((1 - 1 / (newNodes.length + 1)) * 100)}% keys preserved.`);
    }
  };

  // --- TAB 3: Topology Stress Evaluator State ---
  const [selectedArch, setSelectedArch] = useState<'monolith' | 'microservices' | 'event_driven' | 'agent_mesh'>('event_driven');
  const [loadQps, setLoadQps] = useState<number>(85000);

  const archProfiles = {
    monolith: {
      name: 'Modular Monolith',
      p50: `${Math.round(8 + (loadQps / 100000) * 12)} ms`,
      p99: `${Math.round(42 + (loadQps / 50000) * 35)} ms`,
      resilience: 'Single point of failure, simple local transactions',
      overhead: 'Low network hop cost, high deployment lock contention',
      recommendation: 'Ideal for early-stage and medium transactional volume.',
    },
    microservices: {
      name: 'Distributed Microservices (REST/gRPC)',
      p50: `${Math.round(18 + (loadQps / 150000) * 8)} ms`,
      p99: `${Math.round(75 + (loadQps / 70000) * 20)} ms`,
      resilience: 'Isolated failure domains, cascading timeout risks',
      overhead: 'Medium-high service mesh serialization cost',
      recommendation: 'Scales organizational team autonomy at the cost of network hops.',
    },
    event_driven: {
      name: 'Event-Driven CQRS + Kafka Bus',
      p50: `${Math.round(4 + (loadQps / 250000) * 3)} ms`,
      p99: `${Math.round(14 + (loadQps / 200000) * 6)} ms`,
      resilience: 'Zero synchronous blocking, eventual consistency guarantees',
      overhead: 'High storage footprint for immutable commit logs',
      recommendation: 'Best for 10M+ daily events, telemetry, and distributed audits.',
    },
    agent_mesh: {
      name: 'Autonomous Multi-Agent DAG Mesh',
      p50: `${Math.round(65 + (loadQps / 50000) * 20)} ms`,
      p99: `${Math.round(180 + (loadQps / 40000) * 45)} ms`,
      resilience: 'Topological recovery checkpoints, dynamic tool retry',
      overhead: 'GPU context window serialization and vector reranking',
      recommendation: 'Essential for autonomous complex multi-step reasoning systems.',
    },
  };

  return (
    <section id="interactive-lab" className="py-20 border-b border-neutral-200 dark:border-neutral-800 bg-neutral-100/50 dark:bg-neutral-900/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="mb-10">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
            <span>Hands-On Sandbox</span>
            <span aria-hidden="true">·</span>
            <span>Live Architecture Simulation</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-neutral-950 dark:text-white mt-1">
            Interactive Systems Laboratory
          </h2>
          <p className="text-neutral-600 dark:text-neutral-400 text-sm sm:text-base mt-2 max-w-2xl">
            Test and visualize the algorithmic foundations behind low-latency AI inference, consistent ring partitioning, and distributed topology trade-offs.
          </p>
        </div>

        {/* Outer Card with single-elevation depth */}
        <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 shadow-sm overflow-hidden">
          
          {/* Lab Navigation Tabs */}
          <div className="flex items-center gap-1 px-4 sm:px-6 pt-3 border-b border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-950 overflow-x-auto">
            {[
              { id: 'tokens', label: 'AI Inference & Streaming Simulator', icon: Cpu },
              { id: 'hashing', label: 'Consistent Hashing & Partitioning', icon: Database },
              { id: 'topology', label: 'Distributed Architecture Stress Rig', icon: Activity },
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center gap-2 px-4 py-3 text-xs font-semibold border-b-2 transition-colors cursor-pointer whitespace-nowrap ${
                    activeTab === tab.id
                      ? 'border-blue-600 text-blue-600 dark:text-blue-400 dark:border-blue-400 bg-white dark:bg-neutral-900'
                      : 'border-transparent text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* TAB 1: AI Token Stream Simulator */}
          {activeTab === 'tokens' && (
            <div className="p-6 sm:p-8 space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                
                {/* Controls (5 cols) */}
                <div className="lg:col-span-5 space-y-5">
                  <div>
                    <label className="text-xs font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
                      Model Architecture Profile
                    </label>
                    <div className="grid grid-cols-3 gap-2 mt-2">
                      {[
                        { id: 'flash', label: 'Flash 2.5', desc: 'Ultra-fast' },
                        { id: 'pro', label: 'Pro 2.5', desc: 'Deep reasoning' },
                        { id: 'mesh', label: 'Custom Swarm', desc: 'Distributed' },
                      ].map((m) => (
                        <button
                          key={m.id}
                          onClick={() => setModelType(m.id as any)}
                          className={`p-2.5 rounded-lg border text-left cursor-pointer transition-colors ${
                            modelType === m.id
                              ? 'border-blue-600 bg-blue-50/50 dark:bg-blue-950/40 text-blue-900 dark:text-blue-200'
                              : 'border-neutral-200 dark:border-neutral-800 hover:bg-neutral-50 dark:hover:bg-neutral-800 text-neutral-700 dark:text-neutral-300'
                          }`}
                        >
                          <div className="text-xs font-bold">{m.label}</div>
                          <div className="text-[10px] text-neutral-500 dark:text-neutral-400">{m.desc}</div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Concurrency slider */}
                  <div>
                    <div className="flex justify-between items-center text-xs">
                      <span className="font-bold text-neutral-700 dark:text-neutral-300">
                        Concurrent In-Flight Requests
                      </span>
                      <span className="font-mono font-bold text-blue-600 dark:text-blue-400">
                        {concurrency} workers
                      </span>
                    </div>
                    <input
                      type="range"
                      min="1"
                      max="64"
                      value={concurrency}
                      onChange={(e) => setConcurrency(Number(e.target.value))}
                      className="w-full mt-2 accent-blue-600 cursor-pointer"
                    />
                  </div>

                  {/* Speculative Decoding Toggle */}
                  <div className="flex items-center justify-between p-3 rounded-lg border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-950">
                    <div>
                      <div className="text-xs font-semibold text-neutral-900 dark:text-white">
                        Speculative Token Branching
                      </div>
                      <div className="text-[11px] text-neutral-500">
                        Draft model speculative verification
                      </div>
                    </div>
                    <button
                      onClick={() => setSpeculativeDecoding(!speculativeDecoding)}
                      className={`px-3 py-1 text-xs font-bold rounded cursor-pointer transition-colors ${
                        speculativeDecoding
                          ? 'bg-blue-600 text-white'
                          : 'bg-neutral-200 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300'
                      }`}
                    >
                      {speculativeDecoding ? 'ENABLED' : 'DISABLED'}
                    </button>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2 pt-2">
                    <button
                      onClick={() => setIsStreaming(!isStreaming)}
                      className={`flex-1 py-2.5 px-4 text-xs font-semibold rounded-lg flex items-center justify-center gap-2 cursor-pointer shadow-xs transition-colors ${
                        isStreaming
                          ? 'bg-amber-600 hover:bg-amber-700 text-white'
                          : 'bg-blue-600 hover:bg-blue-700 text-white'
                      }`}
                    >
                      {isStreaming ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                      <span>{isStreaming ? 'Pause Stream' : 'Run Live Inference'}</span>
                    </button>
                    <button
                      onClick={resetTokenStream}
                      className="px-3 py-2.5 text-xs font-medium rounded-lg border border-neutral-300 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors cursor-pointer"
                      title="Clear Buffer"
                    >
                      <RotateCcw className="w-4 h-4 text-neutral-600 dark:text-neutral-400" />
                    </button>
                  </div>
                </div>

                {/* Live Output & Telemetry Viewport (7 cols) */}
                <div className="lg:col-span-7 flex flex-col space-y-4">
                  {/* Real-Time Metrics Strip */}
                  <div className="grid grid-cols-3 gap-3">
                    <div className="p-3 rounded-lg border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-950">
                      <div className="text-[10px] uppercase font-bold text-neutral-500">Throughput</div>
                      <div className="font-mono text-xl font-extrabold text-blue-600 dark:text-blue-400 tabular-nums mt-0.5">
                        {effectiveTps} <span className="text-xs font-normal text-neutral-500">tok/s</span>
                      </div>
                    </div>
                    <div className="p-3 rounded-lg border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-950">
                      <div className="text-[10px] uppercase font-bold text-neutral-500">Est. TTFT</div>
                      <div className="font-mono text-xl font-extrabold text-neutral-900 dark:text-white tabular-nums mt-0.5">
                        {ttftMs} <span className="text-xs font-normal text-neutral-500">ms</span>
                      </div>
                    </div>
                    <div className="p-3 rounded-lg border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-950">
                      <div className="text-[10px] uppercase font-bold text-neutral-500">Tokens Streamed</div>
                      <div className="font-mono text-xl font-extrabold text-neutral-900 dark:text-white tabular-nums mt-0.5">
                        {tokenCounter}
                      </div>
                    </div>
                  </div>

                  {/* Terminal-like output display */}
                  <div className="flex-1 min-h-[220px] max-h-[260px] overflow-y-auto p-4 rounded-xl border border-neutral-300 dark:border-neutral-800 bg-neutral-950 text-neutral-100 font-mono text-xs leading-relaxed flex flex-col justify-between shadow-inner">
                    <div className="space-y-1">
                      <div className="text-neutral-500 text-[11px] pb-1 border-b border-neutral-800 flex items-center justify-between">
                        <span>// ACTIVE INFERENCE STREAM // PID: 8092</span>
                        <span className="text-blue-400">{isStreaming ? '● STREAMING' : 'IDLE'}</span>
                      </div>
                      <p className="pt-2 text-neutral-200 whitespace-pre-wrap">
                        {streamedText || 'Click "Run Live Inference" above to start streaming tokens through the simulated pipeline...'}
                        {isStreaming && <span className="inline-block w-2 h-3.5 bg-blue-500 ml-1 animate-pulse" />}
                      </p>
                    </div>

                    <div className="pt-3 text-[10px] text-neutral-500 flex justify-between border-t border-neutral-900 mt-4">
                      <span>Quantization: INT4-GPTQ</span>
                      <span>Memory Bandwidth: ~940 GB/s</span>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          )}

          {/* TAB 2: Consistent Hashing */}
          {activeTab === 'hashing' && (
            <div className="p-6 sm:p-8 space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                
                {/* Controls (5 cols) */}
                <div className="lg:col-span-5 space-y-5">
                  <div>
                    <label className="text-xs font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
                      Partitioning Strategy
                    </label>
                    <div className="grid grid-cols-2 gap-2 mt-2">
                      <button
                        onClick={() => setHashMode('consistent')}
                        className={`p-3 rounded-lg border text-left cursor-pointer transition-colors ${
                          hashMode === 'consistent'
                            ? 'border-blue-600 bg-blue-50/50 dark:bg-blue-950/40 text-blue-900 dark:text-blue-200'
                            : 'border-neutral-200 dark:border-neutral-800 hover:bg-neutral-50 dark:hover:bg-neutral-800'
                        }`}
                      >
                        <div className="text-xs font-bold">Consistent Hashing</div>
                        <div className="text-[10px] text-neutral-500">Virtual token ring</div>
                      </button>

                      <button
                        onClick={() => setHashMode('modulo')}
                        className={`p-3 rounded-lg border text-left cursor-pointer transition-colors ${
                          hashMode === 'modulo'
                            ? 'border-amber-600 bg-amber-50/50 dark:bg-amber-950/40 text-amber-900 dark:text-amber-200'
                            : 'border-neutral-200 dark:border-neutral-800 hover:bg-neutral-50 dark:hover:bg-neutral-800'
                        }`}
                      >
                        <div className="text-xs font-bold">Naive Modulo (N)</div>
                        <div className="text-[10px] text-neutral-500">Hash(key) % NodeCount</div>
                      </button>
                    </div>
                  </div>

                  {/* Node Cluster Management */}
                  <div>
                    <div className="flex justify-between items-center text-xs mb-2">
                      <span className="font-bold text-neutral-700 dark:text-neutral-300">
                        Active Cluster Fleet ({clusterNodes.length} Nodes)
                      </span>
                      <div className="flex gap-1.5">
                        <button
                          onClick={removeClusterNode}
                          disabled={clusterNodes.length <= 2}
                          className="px-2 py-0.5 text-xs font-bold rounded border border-neutral-300 dark:border-neutral-700 disabled:opacity-40 cursor-pointer"
                        >
                          - Node
                        </button>
                        <button
                          onClick={addClusterNode}
                          disabled={clusterNodes.length >= 6}
                          className="px-2 py-0.5 text-xs font-bold rounded bg-blue-600 text-white disabled:opacity-40 cursor-pointer"
                        >
                          + Node
                        </button>
                      </div>
                    </div>

                    <div className="space-y-1.5 max-h-36 overflow-y-auto pr-1">
                      {clusterNodes.map((node, i) => (
                        <div
                          key={node}
                          className="px-3 py-2 text-xs rounded border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-950 flex items-center justify-between"
                        >
                          <span className="font-medium text-neutral-800 dark:text-neutral-200">{node}</span>
                          <span className="font-mono text-[10px] text-blue-600 dark:text-blue-400">
                            {hashMode === 'consistent' ? '256 vnodes' : `Shard ${i}`}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Test Key Selector */}
                  <div>
                    <label className="text-xs font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400 block mb-1.5">
                      Sample Cache Key
                    </label>
                    <div className="flex flex-wrap gap-1.5">
                      {sampleKeys.map((key) => (
                        <button
                          key={key}
                          onClick={() => setTestKey(key)}
                          className={`px-2.5 py-1 text-xs font-mono rounded cursor-pointer transition-colors ${
                            testKey === key
                              ? 'bg-blue-600 text-white font-semibold'
                              : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-200'
                          }`}
                        >
                          {key}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Ring & Sharding Map Visualizer (7 cols) */}
                <div className="lg:col-span-7 flex flex-col space-y-4">
                  <div className="p-4 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-950 flex flex-col justify-between space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
                        Routing Evaluation & Shard Target
                      </span>
                      <span className="text-xs font-mono text-neutral-500">
                        Algorithm: {hashMode === 'consistent' ? 'Consistent Ring' : 'Modulo N'}
                      </span>
                    </div>

                    <div className="p-4 rounded-lg bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 space-y-2">
                      <div className="text-xs text-neutral-500">Evaluated Key:</div>
                      <div className="font-mono text-sm font-bold text-neutral-900 dark:text-white break-all">
                        {testKey}
                      </div>

                      <div className="pt-2 border-t border-neutral-100 dark:border-neutral-800 flex items-center justify-between">
                        <span className="text-xs text-neutral-500">Assigned Destination Node:</span>
                        <span className="font-mono text-xs font-bold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/60 px-2 py-0.5 rounded border border-blue-200 dark:border-blue-900">
                          {getAssignedNode(testKey, clusterNodes, hashMode)}
                        </span>
                      </div>
                    </div>

                    {/* Rebalance Impact Log */}
                    <div className="p-3.5 rounded-lg bg-neutral-100 dark:bg-neutral-900 text-xs font-mono text-neutral-800 dark:text-neutral-200 leading-relaxed">
                      {keyRebalanceLog}
                    </div>

                    <div className="text-[11px] text-neutral-500 dark:text-neutral-400 leading-normal">
                      💡 Try clicking <strong className="text-neutral-700 dark:text-neutral-200">+ Node</strong> or <strong className="text-neutral-700 dark:text-neutral-200">- Node</strong> under Naive Modulo vs Consistent Hashing to see why naive sharding crashes production databases during autoscaling.
                    </div>
                  </div>
                </div>

              </div>
            </div>
          )}

          {/* TAB 3: Distributed Topology Stress Rig */}
          {activeTab === 'topology' && (
            <div className="p-6 sm:p-8 space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                
                {/* 4 Architecture Options */}
                <div className="lg:col-span-5 space-y-4">
                  <label className="text-xs font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
                    System Architecture Paradigm
                  </label>

                  <div className="space-y-2">
                    {[
                      { id: 'monolith', label: 'Modular Monolith' },
                      { id: 'microservices', label: 'Microservices Mesh (gRPC)' },
                      { id: 'event_driven', label: 'Event-Driven CQRS + Kafka' },
                      { id: 'agent_mesh', label: 'Autonomous Multi-Agent DAG' },
                    ].map((arch) => (
                      <button
                        key={arch.id}
                        onClick={() => setSelectedArch(arch.id as any)}
                        className={`w-full p-3 rounded-lg border text-left cursor-pointer transition-colors ${
                          selectedArch === arch.id
                            ? 'border-blue-600 bg-blue-50/50 dark:bg-blue-950/40 text-blue-900 dark:text-blue-200'
                            : 'border-neutral-200 dark:border-neutral-800 hover:bg-neutral-50 dark:hover:bg-neutral-800 text-neutral-800 dark:text-neutral-300'
                        }`}
                      >
                        <div className="text-xs font-bold">{arch.label}</div>
                      </button>
                    ))}
                  </div>

                  <div className="pt-2">
                    <div className="flex justify-between items-center text-xs mb-1">
                      <span className="font-bold text-neutral-700 dark:text-neutral-300">Injected Load</span>
                      <span className="font-mono font-bold text-blue-600 dark:text-blue-400">
                        {loadQps.toLocaleString()} QPS
                      </span>
                    </div>
                    <input
                      type="range"
                      min="10000"
                      max="300000"
                      step="5000"
                      value={loadQps}
                      onChange={(e) => setLoadQps(Number(e.target.value))}
                      className="w-full accent-blue-600 cursor-pointer"
                    />
                  </div>
                </div>

                {/* Architecture Evaluation Card (7 cols) */}
                <div className="lg:col-span-7 space-y-4">
                  <div className="p-5 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-950 space-y-4">
                    <div className="flex items-center justify-between pb-3 border-b border-neutral-200 dark:border-neutral-800">
                      <h4 className="text-base font-bold text-neutral-950 dark:text-white">
                        {archProfiles[selectedArch].name}
                      </h4>
                      <span className="text-xs font-mono text-neutral-500">
                        Load: {(loadQps / 1000).toFixed(0)}k req/s
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div className="p-3 rounded-lg bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800">
                        <div className="text-[10px] uppercase font-bold text-neutral-500">Modeled p50 Latency</div>
                        <div className="font-mono text-lg font-bold text-blue-600 dark:text-blue-400 mt-0.5">
                          {archProfiles[selectedArch].p50}
                        </div>
                      </div>
                      <div className="p-3 rounded-lg bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800">
                        <div className="text-[10px] uppercase font-bold text-neutral-500">Modeled p99 Latency</div>
                        <div className="font-mono text-lg font-bold text-neutral-900 dark:text-white mt-0.5">
                          {archProfiles[selectedArch].p99}
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2 text-xs">
                      <div>
                        <span className="font-bold text-neutral-900 dark:text-neutral-100">Resilience Profile: </span>
                        <span className="text-neutral-600 dark:text-neutral-400">{archProfiles[selectedArch].resilience}</span>
                      </div>
                      <div>
                        <span className="font-bold text-neutral-900 dark:text-neutral-100">Overhead Characteristic: </span>
                        <span className="text-neutral-600 dark:text-neutral-400">{archProfiles[selectedArch].overhead}</span>
                      </div>
                    </div>

                    <div className="p-3 rounded-lg bg-blue-50/50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-900 text-xs text-neutral-700 dark:text-neutral-300">
                      <strong>Architectural Verdict:</strong> {archProfiles[selectedArch].recommendation}
                    </div>
                  </div>
                </div>

              </div>
            </div>
          )}

        </div>

      </div>
    </section>
  );
};
