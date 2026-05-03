import { useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChevronLeft, Zap } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ScatterChart, Scatter } from "recharts";

type ThreatExplanation = {
  id: string;
  name: string;
  confidence: number;
  riskScore: number;
  time: number;
  icon: string;
  reasoning: string;
  limeText: string;
  heatmapText: string;
  featureImportance: { feature: string; importance: number }[];
  steps: { title: string; desc: string; color: string; borderColor: string }[];
};

const explanations: Record<string, ThreatExplanation> = {
  gunshot: {
    id: "gunshot",
    name: "Gunshot Detection",
    confidence: 92,
    riskScore: 95,
    time: 0.23,
    icon: "🔫",
    reasoning: "High energy spike in 3–6 kHz band matched gunshot acoustic signature with 92% confidence. The temporal pattern shows a sharp impulse followed by rapid decay, characteristic of ballistic projectile sound. Background noise correlation is minimal (8%), indicating a genuine threat event rather than ambient noise.",
    limeText: "LIME analysis shows that the model primarily relies on frequency-domain features, particularly the energy concentration in the 3-6 kHz band, which is the acoustic signature of gunshot events.",
    heatmapText: "The heatmap shows a concentrated energy spike in the 3-6 kHz frequency band, which is characteristic of gunshot acoustic signatures. The sharp temporal onset and rapid decay pattern further supports the threat classification.",
    featureImportance: [
      { feature: "3-6 kHz Energy", importance: 92 },
      { feature: "Impulse Sharpness", importance: 87 },
      { feature: "Frequency Bandwidth", importance: 78 },
      { feature: "Temporal Pattern", importance: 72 },
      { feature: "Harmonic Content", importance: 65 },
      { feature: "Background Noise", importance: 45 },
      { feature: "Duration", importance: 38 },
    ],
    steps: [
      { title: "Step 1: Feature Extraction", desc: "Extracted 128 audio features including MFCC, spectral centroid, zero-crossing rate, and temporal characteristics.", color: "text-cyan-400", borderColor: "border-l-cyan-500" },
      { title: "Step 2: Preprocessing", desc: "Applied noise reduction and normalization. Identified signal-to-noise ratio of 18dB, indicating strong threat signature.", color: "text-blue-400", borderColor: "border-l-blue-500" },
      { title: "Step 3: Model Inference", desc: "Gunshot detection model returned 92% confidence. Scream: 5%, Glass break: 2%, Alarm: 1%.", color: "text-purple-400", borderColor: "border-l-purple-500" },
      { title: "Step 4: Context Analysis", desc: "Event occurred in high-risk urban zone during evening hours. Historical pattern matches threat profile with 88% similarity.", color: "text-orange-400", borderColor: "border-l-orange-500" },
      { title: "Step 5: Final Decision", desc: "Multi-agent consensus: CRITICAL THREAT. Confidence: 92%. Risk Score: 95. Action: ALERT AUTHORITIES.", color: "text-red-400", borderColor: "border-l-red-500" }
    ]
  },
  glass: {
    id: "glass",
    name: "Glass Break",
    confidence: 89,
    riskScore: 82,
    time: 0.31,
    icon: "🔨",
    reasoning: "Detected high-frequency noise bursts with rapid zero-crossing rates typical of shattering glass. The acoustic envelope features an initial impact followed by a chaotic, extended high-frequency decay.",
    limeText: "LIME analysis reveals the model prioritizes zero-crossing rate and high-frequency spectral flux (>5 kHz) to distinguish glass breaking from other impact sounds.",
    heatmapText: "The heatmap highlights a broad-spectrum high-frequency splash immediately following a brief low-frequency impact, precisely matching glass shattering patterns.",
    featureImportance: [
      { feature: "Zero-Crossing Rate", importance: 94 },
      { feature: "Spectral Flux", importance: 88 },
      { feature: ">5 kHz Energy", importance: 82 },
      { feature: "Decay Envelope", importance: 71 },
      { feature: "Impact Transient", importance: 68 },
      { feature: "Duration", importance: 55 },
    ],
    steps: [
      { title: "Step 1: Feature Extraction", desc: "Calculated zero-crossing rates and high-frequency spectral centroids.", color: "text-cyan-400", borderColor: "border-l-cyan-500" },
      { title: "Step 2: Preprocessing", desc: "Filtered out low-frequency rumble below 500Hz to isolate the shatter.", color: "text-blue-400", borderColor: "border-l-blue-500" },
      { title: "Step 3: Model Inference", desc: "Glass break model returned 89% confidence. Gunshot: 4%, Scream: 0%.", color: "text-purple-400", borderColor: "border-l-purple-500" },
      { title: "Step 4: Context Analysis", desc: "Detected near building perimeter during closed hours.", color: "text-orange-400", borderColor: "border-l-orange-500" },
      { title: "Step 5: Final Decision", desc: "Multi-agent consensus: HIGH RISK. Action: DISPATCH PATROL.", color: "text-red-400", borderColor: "border-l-red-500" }
    ]
  },
  alarm: {
    id: "alarm",
    name: "Alarm Detection",
    confidence: 96,
    riskScore: 78,
    time: 1.20,
    icon: "🚨",
    reasoning: "Consistent, repeating tonal frequencies detected at standard alarm pitch ranges (e.g., 1-2 kHz or 3-4 kHz). The strict periodicity of the signal is the primary classification driver.",
    limeText: "LIME identifies the repetitive temporal pattern and strict harmonic isolation as the defining features for the Alarm classification.",
    heatmapText: "The spectrogram shows clear, parallel horizontal lines corresponding to the fundamental frequency and harmonics of a siren or mechanical alarm.",
    featureImportance: [
      { feature: "Periodicity", importance: 97 },
      { feature: "Harmonic Purity", importance: 91 },
      { feature: "Sustained Energy", importance: 85 },
      { feature: "Pitch Contour", importance: 76 },
      { feature: "Amplitude Mod", importance: 64 },
    ],
    steps: [
      { title: "Step 1: Feature Extraction", desc: "Analyzed autocorrelation and sustained harmonic content.", color: "text-cyan-400", borderColor: "border-l-cyan-500" },
      { title: "Step 2: Preprocessing", desc: "Noise gating applied to isolate tonal peaks.", color: "text-blue-400", borderColor: "border-l-blue-500" },
      { title: "Step 3: Model Inference", desc: "Alarm detection model returned 96% confidence.", color: "text-purple-400", borderColor: "border-l-purple-500" },
      { title: "Step 4: Context Analysis", desc: "Pattern matches registered facility fire alarm frequency.", color: "text-orange-400", borderColor: "border-l-orange-500" },
      { title: "Step 5: Final Decision", desc: "Multi-agent consensus: MODERATE/HIGH RISK. Action: VERIFY WITH CAMERAS.", color: "text-red-400", borderColor: "border-l-red-500" }
    ]
  },
  scream: {
    id: "scream",
    name: "Human Scream",
    confidence: 85,
    riskScore: 88,
    time: 0.65,
    icon: "😱",
    reasoning: "Identified chaotic pitch contours and high vocal effort typical of distress vocalization. The formants indicate human vocal tract resonances combined with non-linear vocal cord vibration (roughness).",
    limeText: "LIME highlights the acoustic 'roughness' and rapid pitch instability as the primary factors distinguishing a scream from normal speech or singing.",
    heatmapText: "The heatmap displays broad, noisy formant bands typical of vocal tract saturation during extreme distress, unlike the clean harmonics of normal speech.",
    featureImportance: [
      { feature: "Acoustic Roughness", importance: 93 },
      { feature: "Pitch Instability", importance: 89 },
      { feature: "Vocal Effort", importance: 84 },
      { feature: "Formant Dispersion", importance: 75 },
      { feature: "Harmonic-to-Noise", importance: 62 },
    ],
    steps: [
      { title: "Step 1: Feature Extraction", desc: "Extracted vocal formants, pitch contours, and acoustic roughness metrics.", color: "text-cyan-400", borderColor: "border-l-cyan-500" },
      { title: "Step 2: Preprocessing", desc: "Separated human voice frequencies from background traffic noise.", color: "text-blue-400", borderColor: "border-l-blue-500" },
      { title: "Step 3: Model Inference", desc: "Scream detection model returned 85% confidence. Speech: 12%.", color: "text-purple-400", borderColor: "border-l-purple-500" },
      { title: "Step 4: Context Analysis", desc: "Detected in isolated pedestrian zone late at night.", color: "text-orange-400", borderColor: "border-l-orange-500" },
      { title: "Step 5: Final Decision", desc: "Multi-agent consensus: CRITICAL THREAT. Action: NOTIFY POLICE.", color: "text-red-400", borderColor: "border-l-red-500" }
    ]
  }
};

const generateHeatmap = () => Array.from({ length: 20 }, (_, i) => ({
  time: i * 50,
  freq_1k: Math.random() * 100,
  freq_2k: Math.random() * 100,
  freq_3k: Math.random() * 100 + 50,
  freq_4k: Math.random() * 100 + 60,
  freq_5k: Math.random() * 100 + 70,
  freq_6k: Math.random() * 100 + 65
}));

export default function ExplainableAI() {
  const [, setLocation] = useLocation();
  const [selectedThreat, setSelectedThreat] = useState<string>("gunshot");
  
  const currentData = explanations[selectedThreat];
  const spectrogramHeatmap = generateHeatmap();

  return (
    <div className="min-h-screen bg-background text-foreground pb-12">
      {/* Header */}
      <header className="border-b border-border bg-card/50 sticky top-0 z-40">
        <div className="container mx-auto px-4 py-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={() => setLocation("/dashboard")} className="hover:bg-accent/20">
              <ChevronLeft className="w-5 h-5" />
            </Button>
            <div>
              <h1 className="text-3xl font-bold">Explainable AI Panel</h1>
              <p className="text-muted-foreground text-sm">Transparent threat detection reasoning</p>
            </div>
          </div>
          
          {/* Threat Selector Tabs */}
          <div className="flex flex-wrap gap-2">
            {Object.values(explanations).map(threat => (
              <Button
                key={threat.id}
                onClick={() => setSelectedThreat(threat.id)}
                variant={selectedThreat === threat.id ? "default" : "outline"}
                className={`gap-2 ${selectedThreat === threat.id ? 'bg-accent text-black hover:bg-accent/90' : ''}`}
              >
                <span>{threat.icon}</span>
                {threat.name}
              </Button>
            ))}
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Main Explanation */}
        <Card className="glass border-accent/20 mb-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="w-5 h-5 text-accent" />
              Threat Classification Explanation
            </CardTitle>
            <CardDescription>Why the AI classified this event as a threat</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="glass border-border p-6 rounded-lg">
              <h3 className="text-xl font-bold text-accent mb-3 flex items-center gap-2">
                <span>{currentData.icon}</span>
                Event: {currentData.name}
              </h3>
              <p className="text-muted-foreground mb-4">
                <strong className="text-foreground">Classification:</strong> {currentData.name} with {currentData.confidence}% confidence
              </p>
              <p className="text-muted-foreground mb-4">
                <strong className="text-foreground">Reasoning:</strong> {currentData.reasoning}
              </p>
              <div className={`mt-4 p-4 rounded-lg border ${currentData.riskScore >= 90 ? 'bg-red-500/10 border-red-500/30' : 'bg-orange-500/10 border-orange-500/30'}`}>
                <p className={`text-sm font-semibold ${currentData.riskScore >= 90 ? 'text-red-400' : 'text-orange-400'}`}>
                  {currentData.riskScore >= 90 ? '⚠️ CRITICAL THREAT DETECTED' : '⚠️ HIGH RISK THREAT DETECTED'}
                </p>
                <p className="text-sm text-muted-foreground mt-2">
                  {currentData.steps[4].desc.split('Action: ')[1] || 'Recommend immediate alert to authorities.'}
                </p>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              <div className="glass border-border p-4 rounded-lg">
                <div className="text-sm text-muted-foreground mb-2">Confidence Score</div>
                <div className="text-3xl font-bold text-accent">{currentData.confidence}%</div>
              </div>
              <div className="glass border-border p-4 rounded-lg">
                <div className="text-sm text-muted-foreground mb-2">Decision Time</div>
                <div className="text-3xl font-bold text-accent">{currentData.time}s</div>
              </div>
              <div className="glass border-border p-4 rounded-lg">
                <div className="text-sm text-muted-foreground mb-2">Risk Score</div>
                <div className={`text-3xl font-bold ${currentData.riskScore >= 90 ? 'text-red-400' : 'text-orange-400'}`}>
                  {currentData.riskScore}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* SHAP Feature Importance */}
        <div className="grid lg:grid-cols-2 gap-6 mb-8">
          <Card className="glass border-accent/20 animate-in fade-in slide-in-from-bottom-6 duration-700">
            <CardHeader>
              <CardTitle>SHAP Feature Importance</CardTitle>
              <CardDescription>Impact of each feature on the decision</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={currentData.featureImportance} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                  <XAxis type="number" domain={[0, 100]} stroke="rgba(255,255,255,0.3)" />
                  <YAxis dataKey="feature" type="category" stroke="rgba(255,255,255,0.3)" width={120} tick={{ fontSize: 12 }} />
                  <Tooltip contentStyle={{ backgroundColor: "rgba(0,0,0,0.8)", border: "1px solid rgba(0,255,255,0.3)" }} />
                  <Bar dataKey="importance" fill="rgba(0, 255, 255, 0.6)" animationDuration={1000} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* LIME Explanation */}
          <Card className="glass border-accent/20 animate-in fade-in slide-in-from-bottom-6 duration-700">
            <CardHeader>
              <CardTitle>LIME Local Explanation</CardTitle>
              <CardDescription>Local interpretable model-agnostic explanation</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                {currentData.featureImportance.slice(0, 5).map((item, idx) => (
                  <div key={idx}>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium">{item.feature}</span>
                      <span className="text-sm text-accent">{item.importance}%</span>
                    </div>
                    <div className="w-full h-2 bg-border rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-cyan-500 to-accent rounded-full transition-all duration-1000 ease-out"
                        style={{ width: `${item.importance}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6 p-4 glass border-border rounded-lg bg-accent/5">
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {currentData.limeText}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Spectrogram Heatmap */}
        <Card className="glass border-accent/20 mb-8 animate-in fade-in slide-in-from-bottom-8 duration-1000">
          <CardHeader>
            <CardTitle>Spectrogram Heatmap Analysis</CardTitle>
            <CardDescription>Time-frequency representation of the audio signal</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <ResponsiveContainer width="100%" height={250}>
                <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                  <XAxis dataKey="time" stroke="rgba(255,255,255,0.3)" label={{ value: "Time (ms)", position: "insideBottomRight", offset: -10 }} />
                  <YAxis stroke="rgba(255,255,255,0.3)" label={{ value: "Frequency (kHz)", angle: -90, position: "insideLeft" }} />
                  <Tooltip contentStyle={{ backgroundColor: "rgba(0,0,0,0.8)", border: "1px solid rgba(0,255,255,0.3)" }} />
                  <Scatter name="Energy Band" data={spectrogramHeatmap.map(d => ({ x: d.time, y: (d.freq_3k + d.freq_4k + d.freq_5k + d.freq_6k) / 4 }))} fill="rgba(239, 68, 68, 0.6)" animationDuration={1000} />
                </ScatterChart>
              </ResponsiveContainer>
              <div className="p-4 glass border-border rounded-lg bg-accent/5">
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {currentData.heatmapText}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Decision Tree */}
        <Card className="glass border-accent/20 animate-in fade-in slide-in-from-bottom-8 duration-1000">
          <CardHeader>
            <CardTitle>Decision Reasoning Chain</CardTitle>
            <CardDescription>Step-by-step threat classification logic</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {currentData.steps.map((step, idx) => (
                <div key={idx} className={`glass border-border p-5 rounded-lg border-l-4 ${step.borderColor} transition-colors hover:bg-white/5`}>
                  <div className={`font-semibold mb-2 ${step.color}`}>{step.title}</div>
                  <p className="text-sm text-muted-foreground leading-relaxed">{step.desc}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
