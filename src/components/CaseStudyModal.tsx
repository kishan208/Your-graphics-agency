import React, { useState, useEffect } from 'react';
import { X, ExternalLink, Github, CheckCircle2, ArrowRight, Play, RotateCcw } from 'lucide-react';
import { Project } from '../data/portfolioData';

interface CaseStudyModalProps {
  project: Project | null;
  onClose: () => void;
}

export const CaseStudyModal: React.FC<CaseStudyModalProps> = ({ project, onClose }) => {
  const [activeTab, setActiveTab] = useState<'architecture' | 'decisions' | 'benchmark' | 'demo'>('architecture');
  
  // Interactive mini-demo states
  const [agentStep, setAgentStep] = useState<number>(0);
  const [agentRunning, setAgentRunning] = useState<boolean>(false);
  const [telemetryRate, setTelemetryRate] = useState<number>(25); // Million events/sec
  const [bezierCurvature, setBezierCurvature] = useState<number>(50);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!project) return null;

  const runAgentSimulation = () => {
    if (agentRunning) return;
    setAgentRunning(true);
    setAgentStep(1);

    const timeouts = [
      setTimeout(() => setAgentStep(2), 600),
      setTimeout(() => setAgentStep(3), 1300),
      setTimeout(() => setAgentStep(4), 2100),
      setTimeout(() => {
        setAgentStep(5);
        setAgentRunning(false);
      }, 2900),
    ];

    return () => timeouts.forEach(clearTimeout);
  };

  const resetAgentSimulation = () => {
    setAgentStep(0);
    setAgentRunning(false);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-neutral-950/75 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl max-h-[90vh] bg-white dark:bg-neutral-900 rounded-2xl shadow-2xl border border-neutral-200 dark:border-neutral-800 flex flex-col overflow-hidden text-neutral-900 dark:text-neutral-100"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header bar */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-950/50">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
              <span>{project.subtitle}</span>
              <span aria-hidden="true">·</span>
              <span>{project.year}</span>
            </div>
            <h2 className="text-2xl font-bold tracking-tight text-neutral-950 dark:text-white mt-1">
              {project.title}
            </h2>
          </div>

          <div className="flex items-center gap-2">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="p-2 text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
                title="View Source on GitHub"
              >
                <Github className="w-5 h-5" />
              </a>
            )}
            <button
              onClick={onClose}
              className="p-2 text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors cursor-pointer"
              aria-label="Close dialog"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tab selection */}
        <div className="flex items-center gap-1 px-6 pt-3 border-b border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 overflow-x-auto">
          {[
            { id: 'architecture', label: 'Architecture Blueprint' },
            { id: 'decisions', label: 'Engineering Decisions' },
            { id: 'benchmark', label: 'Benchmarks & Results' },
            { id: 'demo', label: 'Interactive Test Rig' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-2.5 text-xs font-semibold whitespace-nowrap border-b-2 transition-colors cursor-pointer ${
                activeTab === tab.id
                  ? 'border-blue-600 text-blue-600 dark:text-blue-400 dark:border-blue-400'
                  : 'border-transparent text-neutral-500 hover:text-neutral-800 dark:text-neutral-400 dark:hover:text-neutral-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content body with custom scrolling */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Executive Overview banner */}
          <div className="p-4 rounded-xl bg-neutral-100/70 dark:bg-neutral-800/40 border border-neutral-200 dark:border-neutral-800">
            <div className="text-xs font-semibold uppercase tracking-wider text-neutral-500 dark:text-neutral-400 mb-1">
              Core Technical Problem & Mandate
            </div>
            <p className="text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed">
              {project.caseStudy.challenge}
            </p>
          </div>

          {/* TAB 1: Architecture Blueprint */}
          {activeTab === 'architecture' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-base font-bold text-neutral-950 dark:text-white">
                  {project.caseStudy.architecture.title}
                </h3>
                <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-1 leading-relaxed">
                  {project.caseStudy.architecture.description}
                </p>
              </div>

              {/* Sequential Pipeline Flow Diagram */}
              <div className="space-y-3">
                <div className="text-xs font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
                  Execution Pipeline Stages
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {project.caseStudy.architecture.diagramSteps.map((step, idx) => (
                    <div
                      key={idx}
                      className="p-3.5 rounded-lg border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-950 flex items-start gap-3"
                    >
                      <span className="font-mono text-xs font-bold text-blue-600 dark:text-blue-400 shrink-0 mt-0.5">
                        0{idx + 1}.
                      </span>
                      <span className="text-xs font-medium text-neutral-800 dark:text-neutral-200 leading-snug">
                        {step}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tech Stack Chips (Unboxed, accessible) */}
              <div className="pt-2">
                <div className="text-xs font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400 mb-2">
                  Underlying Technology Stack
                </div>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-1 text-xs font-mono font-medium rounded bg-neutral-100 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200 border border-neutral-200 dark:border-neutral-700"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: Engineering Decisions & Trade-offs */}
          {activeTab === 'decisions' && (
            <div className="space-y-4">
              <h3 className="text-base font-bold text-neutral-950 dark:text-white">
                Key Architectural Decisions & Trade-Offs
              </h3>
              <div className="space-y-3">
                {project.caseStudy.keyDecisions.map((decision, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-950 flex items-start gap-3"
                  >
                    <CheckCircle2 className="w-5 h-5 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
                    <p className="text-xs sm:text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed">
                      {decision}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: Benchmarks & Quantified Results */}
          {activeTab === 'benchmark' && (
            <div className="space-y-6">
              <h3 className="text-base font-bold text-neutral-950 dark:text-white">
                Verifiable Production Benchmarks
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {project.caseStudy.results.map((result) => (
                  <div
                    key={result.label}
                    className="p-4 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-950 flex flex-col justify-between"
                  >
                    <div className="text-xs font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
                      {result.label}
                    </div>
                    <div className="my-2 text-2xl sm:text-3xl font-extrabold font-mono text-neutral-950 dark:text-white tabular-nums">
                      {result.value}
                    </div>
                    <div className="text-xs text-neutral-600 dark:text-neutral-400 leading-snug">
                      {result.detail}
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-4 rounded-xl bg-blue-50/50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-900/50 text-xs sm:text-sm text-neutral-700 dark:text-neutral-300">
                <span className="font-semibold text-neutral-950 dark:text-white">Measurement Methodology:</span> Evaluated against sustained stress suites across distributed multi-region worker instances simulating actual enterprise burst loads.
              </div>
            </div>
          )}

          {/* TAB 4: Interactive Test Rig */}
          {activeTab === 'demo' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-base font-bold text-neutral-950 dark:text-white">
                  Interactive In-Browser Simulation
                </h3>
                <p className="text-xs text-neutral-600 dark:text-neutral-400 mt-0.5">
                  Simulate the system's runtime pipeline behavior and examine parameter sensitivities.
                </p>
              </div>

              {/* DEMO A: AetherFlow Agent Runner */}
              {project.id === 'aether-flow' && (
                <div className="p-5 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-950 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
                      Topological Task Decomposition Rig
                    </span>
                    <div className="flex gap-2">
                      <button
                        onClick={resetAgentSimulation}
                        disabled={agentRunning}
                        className="px-2.5 py-1 text-xs font-medium rounded border border-neutral-300 dark:border-neutral-700 hover:bg-neutral-200 dark:hover:bg-neutral-800 flex items-center gap-1 cursor-pointer disabled:opacity-50"
                      >
                        <RotateCcw className="w-3.5 h-3.5" />
                        <span>Reset</span>
                      </button>
                      <button
                        onClick={runAgentSimulation}
                        disabled={agentRunning}
                        className="px-3 py-1 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
                      >
                        <Play className="w-3.5 h-3.5" />
                        <span>{agentRunning ? 'Orchestrating...' : 'Trigger DAG Run'}</span>
                      </button>
                    </div>
                  </div>

                  {/* Pipeline Step Progress */}
                  <div className="space-y-2 pt-2">
                    {[
                      { step: 1, title: 'Parsing Task Decomposition', time: '8ms' },
                      { step: 2, title: 'Resolving Parallel Tool Dependencies', time: '14ms' },
                      { step: 3, title: 'Asynchronous Speculative Execution (2 Tools)', time: '41ms' },
                      { step: 4, title: 'Episodic Memory Compaction (Pruned 58%)', time: '12ms' },
                      { step: 5, title: 'Consensus Check Passed · Result Synthesized', time: 'Total: 75ms' },
                    ].map((item) => (
                      <div
                        key={item.step}
                        className={`p-3 rounded-lg border text-xs flex items-center justify-between transition-all ${
                          agentStep >= item.step
                            ? 'bg-blue-50 dark:bg-blue-950/40 border-blue-300 dark:border-blue-800 text-blue-900 dark:text-blue-200'
                            : 'bg-white dark:bg-neutral-900 border-neutral-200 dark:border-neutral-800 text-neutral-400'
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <span
                            className={`w-2 h-2 rounded-full ${
                              agentStep >= item.step ? 'bg-blue-600 dark:bg-blue-400' : 'bg-neutral-300 dark:bg-neutral-700'
                            }`}
                          />
                          <span className="font-medium">{item.title}</span>
                        </div>
                        <span className="font-mono tabular-nums text-neutral-500 dark:text-neutral-400">
                          {agentStep >= item.step ? item.time : 'waiting'}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* DEMO B: PulseScale Telemetry Simulator */}
              {project.id === 'pulse-scale' && (
                <div className="p-5 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-950 space-y-5">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
                      Edge Telemetry Ingest Load Generator
                    </span>
                    <span className="font-mono text-xs font-bold text-blue-600 dark:text-blue-400">
                      {telemetryRate} Million Events/Second
                    </span>
                  </div>

                  <input
                    type="range"
                    min="1"
                    max="50"
                    value={telemetryRate}
                    onChange={(e) => setTelemetryRate(Number(e.target.value))}
                    className="w-full accent-blue-600 cursor-pointer"
                  />

                  <div className="grid grid-cols-3 gap-3 pt-2">
                    <div className="p-3 rounded-lg bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800">
                      <div className="text-[11px] text-neutral-500">eBPF Ring Buffer</div>
                      <div className="font-mono text-sm font-bold text-neutral-900 dark:text-white mt-1">
                        {(telemetryRate * 0.08).toFixed(1)} GB/s
                      </div>
                    </div>
                    <div className="p-3 rounded-lg bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800">
                      <div className="text-[11px] text-neutral-500">Est. p99 Ingest Latency</div>
                      <div className="font-mono text-sm font-bold text-neutral-900 dark:text-white mt-1">
                        {(8 + (telemetryRate / 50) * 4).toFixed(1)} ms
                      </div>
                    </div>
                    <div className="p-3 rounded-lg bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800">
                      <div className="text-[11px] text-neutral-500">ClickHouse LZ4 Ratio</div>
                      <div className="font-mono text-sm font-bold text-neutral-900 dark:text-white mt-1">
                        12.8 : 1
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* DEMO C: Generic / Default Rig */}
              {(project.id !== 'aether-flow' && project.id !== 'pulse-scale') && (
                <div className="p-5 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-950 space-y-4">
                  <div className="text-xs font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
                    System Parameter Evaluation Console
                  </div>
                  <p className="text-xs text-neutral-600 dark:text-neutral-400">
                    Adjust computational load parameter to view modeled partition impact:
                  </p>
                  <input
                    type="range"
                    min="10"
                    max="100"
                    value={bezierCurvature}
                    onChange={(e) => setBezierCurvature(Number(e.target.value))}
                    className="w-full accent-blue-600 cursor-pointer"
                  />
                  <div className="flex justify-between items-center text-xs font-mono">
                    <span className="text-neutral-500">Cluster Node Weight: {bezierCurvature}%</span>
                    <span className="text-blue-600 dark:text-blue-400 font-bold">
                      Allocated Virtual Tokens: {bezierCurvature * 16}
                    </span>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer actions */}
        <div className="px-6 py-4 border-t border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-950/50 flex items-center justify-between">
          <div className="text-xs text-neutral-500 dark:text-neutral-400">
            Press <kbd className="px-1.5 py-0.5 rounded bg-neutral-200 dark:bg-neutral-800 font-mono text-[10px]">ESC</kbd> to close
          </div>
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-neutral-800 dark:text-neutral-200 bg-neutral-200/80 hover:bg-neutral-300 dark:bg-neutral-800 dark:hover:bg-neutral-700 rounded-lg transition-colors cursor-pointer"
          >
            Close Case Study
          </button>
        </div>
      </div>
    </div>
  );
};
