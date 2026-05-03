import { useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight, ChevronLeft } from "lucide-react";

interface ArchitectureModule {
  id: string;
  name: string;
  description: string;
  details: string[];
  connectsTo: string[];
  color: string;
}

const modules: ArchitectureModule[] = [
  {
    id: "input",
    name: "Audio Input Layer",
    description: "Diverse audio sources for threat detection",
    details: [
      "Microphone Capture",
      "IoT Audio Sensors",
      "CCTV Audio Streams",
      "Call Recording Systems",
      "Smart Device Audio Feeds"
    ],
    connectsTo: ["preprocessing"],
    color: "from-blue-500 to-cyan-500"
  },
  {
    id: "preprocessing",
    name: "Audio Preprocessing",
    description: "Signal processing and feature extraction",
    details: [
      "Noise Reduction",
      "Signal Filtering",
      "Audio Normalization",
      "Audio Segmentation",
      "Feature Extraction (MFCC, Spectrogram, Chroma)"
    ],
    connectsTo: ["understanding", "knowledge"],
    color: "from-purple-500 to-pink-500"
  },
  {
    id: "understanding",
    name: "Audio Understanding AI",
    description: "Deep learning-based audio analysis",
    details: [
      "Speech Recognition",
      "Sound Event Detection (Gunshot, Glass Break, Alarm, Scream)",
      "Speaker Identification",
      "Acoustic Scene Classification",
      "Confidence Scoring"
    ],
    connectsTo: ["multiagent", "explainable"],
    color: "from-cyan-500 to-blue-500"
  },
  {
    id: "multiagent",
    name: "Multi-Agent Intelligence",
    description: "Coordinated decision-making system",
    details: [
      "Perception Agent",
      "Context Analysis Agent",
      "Threat Detection Agent",
      "Decision Coordination Agent"
    ],
    connectsTo: ["decision", "knowledge"],
    color: "from-green-500 to-emerald-500"
  },
  {
    id: "knowledge",
    name: "Knowledge Integration",
    description: "Context and historical data",
    details: [
      "Threat Intelligence Feeds",
      "Historical Audio Logs",
      "Context Database",
      "Security Policy Engine",
      "Event Correlation Engine"
    ],
    connectsTo: ["multiagent", "decision"],
    color: "from-orange-500 to-red-500"
  },
  {
    id: "explainable",
    name: "Explainable AI Module",
    description: "Transparency and interpretability",
    details: [
      "SHAP Analysis",
      "LIME Explanation",
      "Feature Importance Visualization",
      "Decision Reasoning Generation"
    ],
    connectsTo: ["decision", "visualization"],
    color: "from-yellow-500 to-orange-500"
  },
  {
    id: "decision",
    name: "Decision & Action Layer",
    description: "Alert generation and response",
    details: [
      "Risk Score Generation",
      "Alert Triggering",
      "Automated Security Response",
      "Authority Notification",
      "Camera Recording Activation"
    ],
    connectsTo: ["visualization"],
    color: "from-red-500 to-pink-500"
  },
  {
    id: "visualization",
    name: "Visualization Dashboard",
    description: "Real-time monitoring interface",
    details: [
      "Real-time Event Monitoring",
      "Threat Alert Panel",
      "Audio Timeline Viewer",
      "Risk Score Visualization",
      "System Logs & Reports"
    ],
    connectsTo: [],
    color: "from-indigo-500 to-purple-500"
  }
];

export default function Architecture() {
  const [, setLocation] = useLocation();
  const [selectedModule, setSelectedModule] = useState<string | null>(null);

  const selected = modules.find(m => m.id === selectedModule);
  const getModuleName = (id: string) => modules.find(m => m.id === id)?.name ?? id;
  const getIncomingModules = (id: string) => modules.filter(m => m.connectsTo.includes(id));

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="border-b border-border bg-card/50">
        <div className="container mx-auto px-4 py-6 flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => setLocation("/")} className="hover:bg-accent/20">
            <ChevronLeft className="w-5 h-5" />
          </Button>
          <h1 className="text-3xl font-bold">System Architecture</h1>
        </div>
      </header>

      <div className="container mx-auto px-4 py-12 max-w-7xl">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Architecture Diagram */}
          <div className="lg:col-span-2">
            <div className="space-y-4">
              {/* Pipeline Flow */}
              <div className="space-y-3">
                {modules.map((module, index) => (
                  <div key={module.id}>
                    <button
                      onClick={() => setSelectedModule(module.id)}
                      className={`w-full glass border-2 transition-all duration-300 p-4 rounded-lg text-left hover:border-accent/60 ${
                        selectedModule === module.id
                          ? "border-accent bg-accent/10"
                          : "border-border hover:border-accent/40"
                      }`}
                    >
                      <div className={`bg-gradient-to-r ${module.color} bg-clip-text text-transparent font-semibold mb-1`}>
                        {module.name}
                      </div>
                      <p className="text-sm text-muted-foreground">{module.description}</p>
                      {module.connectsTo.length > 0 && (
                        <p className="text-xs text-accent/80 mt-2">
                          Connects to: {module.connectsTo.map(getModuleName).join(" -> ")}
                        </p>
                      )}
                    </button>
                    {index < modules.length - 1 && (
                      <div className="flex justify-center py-2">
                        <ArrowRight className="w-5 h-5 text-accent/50 rotate-90" />
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Animated flow indicator */}
              <div className="mt-8 glass border-accent/20 p-6 rounded-lg">
                <h3 className="font-semibold text-accent mb-4">Data Flow</h3>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <p>✓ Audio signals flow through preprocessing pipeline</p>
                  <p>✓ AI models analyze features and detect threats</p>
                  <p>✓ Multi-agent system coordinates decision-making</p>
                  <p>✓ Explainable AI provides reasoning transparency</p>
                  <p>✓ Alerts trigger automated security responses</p>
                </div>
              </div>

              <div className="glass border-accent/20 p-6 rounded-lg">
                <h3 className="font-semibold text-accent mb-4">Connectivity Map</h3>
                <div className="space-y-2 text-sm text-muted-foreground">
                  {modules.map((module) => (
                    <p key={module.id}>
                      <span className="text-foreground font-medium">{module.name}</span>
                      {" -> "}
                      {module.connectsTo.length > 0
                        ? module.connectsTo.map(getModuleName).join(" / ")
                        : "Terminal output layer"}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Details Panel */}
          <div className="lg:col-span-1">
            {selected ? (
              <div className="glass border-accent/20 rounded-lg p-6 sticky top-24">
                <div className="mb-6">
                  <div className={`bg-gradient-to-r ${selected.color} bg-clip-text text-transparent text-2xl font-bold mb-2`}>
                    {selected.name}
                  </div>
                  <p className="text-muted-foreground">{selected.description}</p>
                </div>

                <div className="space-y-3">
                  <h4 className="font-semibold text-accent">Components:</h4>
                  <ul className="space-y-2">
                    {selected.details.map((detail, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm">
                        <span className="text-accent mt-1">•</span>
                        <span className="text-muted-foreground">{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-6 space-y-3">
                  <h4 className="font-semibold text-accent">Connectivity:</h4>
                  <div className="text-sm text-muted-foreground space-y-1">
                    <p>
                      <span className="text-foreground">Incoming:</span>{" "}
                      {getIncomingModules(selected.id).map((module) => module.name).join(", ") || "None (entry layer)"}
                    </p>
                    <p>
                      <span className="text-foreground">Outgoing:</span>{" "}
                      {selected.connectsTo.map(getModuleName).join(", ") || "None (final layer)"}
                    </p>
                  </div>
                </div>

                <Button
                  onClick={() => setSelectedModule(null)}
                  variant="outline"
                  className="w-full mt-6"
                >
                  Clear Selection
                </Button>
              </div>
            ) : (
              <div className="glass border-accent/20 rounded-lg p-6 sticky top-24 text-center">
                <p className="text-muted-foreground mb-4">Click on any module to view details</p>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <p>The system processes audio through 8 integrated layers:</p>
                  <ul className="mt-4 space-y-1">
                    <li>1. Input Collection</li>
                    <li>2. Signal Processing</li>
                    <li>3. AI Analysis</li>
                    <li>4. Multi-Agent Coordination</li>
                    <li>5. Knowledge Integration</li>
                    <li>6. Explainability</li>
                    <li>7. Decision Making</li>
                    <li>8. Visualization</li>
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Key Concepts */}
        <div className="mt-16 grid md:grid-cols-2 gap-6">
          <Card className="glass border-accent/20 p-6">
            <h3 className="text-lg font-semibold text-accent mb-3">Feature Extraction</h3>
            <p className="text-muted-foreground text-sm mb-4">
              The system extracts multiple audio features to identify threats:
            </p>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• <strong>MFCC:</strong> Mel-frequency cepstral coefficients</li>
              <li>• <strong>Spectrogram:</strong> Time-frequency representation</li>
              <li>• <strong>Chroma:</strong> Pitch and harmonic content</li>
            </ul>
          </Card>

          <Card className="glass border-accent/20 p-6">
            <h3 className="text-lg font-semibold text-accent mb-3">Threat Detection</h3>
            <p className="text-muted-foreground text-sm mb-4">
              Specialized models detect critical acoustic events:
            </p>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• <strong>Gunshot:</strong> High-frequency impulse detection</li>
              <li>• <strong>Glass Break:</strong> Shattering acoustic signature</li>
              <li>• <strong>Scream:</strong> High-pitched vocal distress</li>
            </ul>
          </Card>
        </div>
      </div>
    </div>
  );
}
