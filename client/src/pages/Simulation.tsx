import { useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChevronLeft, Play, Zap, AlertTriangle } from "lucide-react";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";

const playSimulationSound = (type: string) => {
  const soundMap: Record<string, string> = {
    'gunshot': '/sounds/gunshot.mp3',
    'alarm': '/sounds/alarm.mp3',
    'glass': '/sounds/glass.mp3',
    'scream': '/sounds/scream.mp3'
  };

  const url = soundMap[type];
  if (url) {
    const audio = new Audio(url);
    audio.play().catch(e => console.error("Error playing sound:", e));
  }
};

interface SimulationResult {
  eventType: string;
  confidence: number;
  riskScore: number;
  detectionTime: number;
  actions: string[];
  status: "idle" | "running" | "complete";
}

const scenarios = [
  {
    id: "gunshot",
    name: "Gunshot Detection",
    description: "Simulate gunshot acoustic signature detection",
    icon: "🔫",
    expectedConfidence: 92
  },
  {
    id: "glass",
    name: "Glass Break",
    description: "Simulate glass shattering sound event",
    icon: "🔨",
    expectedConfidence: 87
  },
  {
    id: "alarm",
    name: "Alarm Activation",
    description: "Simulate security alarm trigger",
    icon: "🚨",
    expectedConfidence: 95
  },
  {
    id: "scream",
    name: "Human Scream",
    description: "Simulate human distress vocalization",
    icon: "😱",
    expectedConfidence: 78
  }
];

export default function Simulation() {
  const [, setLocation] = useLocation();
  const [selectedScenario, setSelectedScenario] = useState<string | null>(null);
  const [result, setResult] = useState<SimulationResult | null>(null);
  const [isRunning, setIsRunning] = useState(false);
  const sendSmsMutation = trpc.alerts.sendSms.useMutation();

  const runSimulation = async (scenarioId: string) => {
    setIsRunning(true);
    // Play the exact sound immediately when clicked
    playSimulationSound(scenarioId);
    
    setResult({
      eventType: scenarios.find(s => s.id === scenarioId)?.name || "",
      confidence: 0,
      riskScore: 0,
      detectionTime: 0,
      actions: [],
      status: "running"
    });

    // Simulate detection process
    for (let i = 0; i <= 100; i += 20) {
      await new Promise(resolve => setTimeout(resolve, 200));
      const scenario = scenarios.find(s => s.id === scenarioId);
      setResult(prev => prev ? {
        ...prev,
        confidence: Math.min(i + Math.random() * 20, scenario?.expectedConfidence || 90),
        riskScore: Math.min(i * 0.9, 95),
        detectionTime: (i / 100) * 0.5
      } : null);
    }

    const scenario = scenarios.find(s => s.id === scenarioId);
    const actions = [
      "✓ Audio signal captured and analyzed",
      "✓ Threat classification completed",
      "✓ Risk score calculated",
      "✓ Alert generated",
      "✓ Authorities notified",
      "✓ Camera recording activated",
      "✓ Emergency response initiated"
    ];

    setResult({
      eventType: scenario?.name || "",
      confidence: scenario?.expectedConfidence || 90,
      riskScore: 75,
      detectionTime: 0.23,
      actions,
      status: "complete"
    });

    setIsRunning(false);

    try {
      await sendSmsMutation.mutateAsync({
        mobileNumber: "+919050500171",
        threatType: scenario?.name || "Simulated Threat",
        riskScore: 75
      });
      toast.success(`Critical Alert SMS sent to +919050500171`);
    } catch (e) {
      toast.error("Failed to send alert SMS");
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground relative overflow-x-hidden">
      {/* Blinking Red/Orange Alert Overlay for running simulation */}
      {isRunning && (
        <div className="pointer-events-none fixed inset-0 z-50 animate-pulse bg-gradient-to-br from-red-500/15 via-orange-500/10 to-red-600/15 transition-opacity duration-300" />
      )}
      {/* Header */}
      <header className="border-b border-border bg-card/50 sticky top-0 z-40">
        <div className="container mx-auto px-4 py-6 flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => setLocation("/dashboard")} className="hover:bg-accent/20">
            <ChevronLeft className="w-5 h-5" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold">Security Response Simulation</h1>
            <p className="text-muted-foreground text-sm">Test AI threat detection with realistic scenarios</p>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Scenario Selection */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {scenarios.map((scenario) => (
            <Card
              key={scenario.id}
              className={`glass border-accent/20 cursor-pointer transition-all hover:border-accent/40 ${
                selectedScenario === scenario.id ? "border-accent bg-accent/10" : ""
              }`}
              onClick={() => setSelectedScenario(scenario.id)}
            >
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <span className="text-3xl">{scenario.icon}</span>
                      {scenario.name}
                    </CardTitle>
                    <CardDescription>{scenario.description}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Button
                  onClick={(e) => {
                    e.stopPropagation();
                    runSimulation(scenario.id);
                  }}
                  disabled={isRunning}
                  className="w-full gap-2"
                >
                  <Play className="w-4 h-4" />
                  {isRunning && selectedScenario === scenario.id ? "Running..." : "Run Simulation"}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Simulation Results */}
        {result && (
          <div className="space-y-6">
            {/* Detection Progress */}
            <Card className="glass border-accent/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="w-5 h-5 text-accent animate-pulse" />
                  Detection Progress
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium">Confidence Score</span>
                    <span className="text-accent font-semibold">{Math.round(result.confidence)}%</span>
                  </div>
                  <div className="w-full h-3 bg-border rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-cyan-500 to-accent rounded-full transition-all duration-300"
                      style={{ width: `${result.confidence}%` }}
                    ></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium">Risk Score</span>
                    <span className="text-red-400 font-semibold">{Math.round(result.riskScore)}</span>
                  </div>
                  <div className="w-full h-3 bg-border rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500 rounded-full transition-all duration-300"
                      style={{ width: `${result.riskScore}%` }}
                    ></div>
                  </div>
                </div>

                <div className="grid md:grid-cols-3 gap-4 pt-4">
                  <div className="glass border-border p-4 rounded-lg text-center">
                    <div className="text-sm text-muted-foreground mb-1">Event Type</div>
                    <div className="font-semibold text-accent">{result.eventType}</div>
                  </div>
                  <div className="glass border-border p-4 rounded-lg text-center">
                    <div className="text-sm text-muted-foreground mb-1">Detection Time</div>
                    <div className="font-semibold text-accent">{result.detectionTime.toFixed(2)}s</div>
                  </div>
                  <div className="glass border-border p-4 rounded-lg text-center">
                    <div className="text-sm text-muted-foreground mb-1">Status</div>
                    <div className={`font-semibold ${result.status === "complete" ? "text-green-400" : "text-yellow-400"}`}>
                      {result.status === "complete" ? "Complete" : "Processing"}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Decision Pipeline */}
            <Card className="glass border-accent/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-accent" />
                  Decision Pipeline Flow
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {result.actions.map((action, idx) => (
                    <div key={idx} className="glass border-border p-4 rounded-lg flex items-center gap-3 animate-fade-in">
                      <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0">
                        <span className="text-accent font-semibold text-sm">{idx + 1}</span>
                      </div>
                      <span className="text-muted-foreground">{action}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Response Summary */}
            <Card className="glass border-accent/20">
              <CardHeader>
                <CardTitle>Automated Response Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="glass border-border p-4 rounded-lg">
                    <h4 className="font-semibold text-accent mb-2">Immediate Actions</h4>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li>✓ Critical alert issued to security team</li>
                      <li>✓ Local authorities notified</li>
                      <li>✓ All cameras in area activated</li>
                      <li>✓ Recording saved for investigation</li>
                    </ul>
                  </div>
                  <div className="glass border-border p-4 rounded-lg">
                    <h4 className="font-semibold text-accent mb-2">Follow-up Actions</h4>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li>✓ Event logged in audit trail</li>
                      <li>✓ Incident report generated</li>
                      <li>✓ Sensor data archived</li>
                      <li>✓ Model performance updated</li>
                    </ul>
                  </div>
                </div>

                <div className="p-4 bg-green-500/10 border border-green-500/30 rounded-lg">
                  <p className="text-sm text-green-400 font-semibold">✓ SIMULATION COMPLETE</p>
                  <p className="text-sm text-muted-foreground mt-2">
                    The AI system successfully detected and responded to the threat scenario. All automated response protocols executed within acceptable time parameters.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Run Another Simulation */}
            <div className="text-center">
              <Button
                onClick={() => {
                  setResult(null);
                  setSelectedScenario(null);
                }}
                variant="outline"
                className="gap-2"
              >
                Run Another Simulation
              </Button>
            </div>
          </div>
        )}

        {/* Information Panel */}
        {!result && (
          <Card className="glass border-accent/20">
            <CardHeader>
              <CardTitle>How Simulations Work</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                Select a scenario above to simulate a realistic threat detection event. The system will process the audio, perform AI analysis, and demonstrate the complete response pipeline.
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="glass border-border p-4 rounded-lg">
                  <h4 className="font-semibold text-accent mb-2">What Happens</h4>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>1. Audio signal is captured and processed</li>
                    <li>2. AI models analyze acoustic features</li>
                    <li>3. Multi-agent system evaluates threat</li>
                    <li>4. Risk score is calculated</li>
                    <li>5. Automated responses are triggered</li>
                  </ul>
                </div>
                <div className="glass border-border p-4 rounded-lg">
                  <h4 className="font-semibold text-accent mb-2">Key Metrics</h4>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• <strong>Confidence:</strong> Model certainty (0-100%)</li>
                    <li>• <strong>Risk Score:</strong> Threat severity (0-100)</li>
                    <li>• <strong>Detection Time:</strong> Response latency</li>
                    <li>• <strong>Actions:</strong> Automated responses</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
