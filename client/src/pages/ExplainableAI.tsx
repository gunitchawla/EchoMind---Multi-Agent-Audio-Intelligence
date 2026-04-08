import { useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChevronLeft, Zap } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ScatterChart, Scatter } from "recharts";

const featureImportance = [
  { feature: "3-6 kHz Energy", importance: 92 },
  { feature: "Impulse Sharpness", importance: 87 },
  { feature: "Frequency Bandwidth", importance: 78 },
  { feature: "Temporal Pattern", importance: 72 },
  { feature: "Harmonic Content", importance: 65 },
  { feature: "Background Noise", importance: 45 },
  { feature: "Duration", importance: 38 },
  { feature: "Amplitude Peak", importance: 32 }
];

const spectrogramHeatmap = Array.from({ length: 20 }, (_, i) => ({
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
  const [selectedFeature, setSelectedFeature] = useState<string | null>("3-6 kHz Energy");

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="border-b border-border bg-card/50 sticky top-0 z-40">
        <div className="container mx-auto px-4 py-6 flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => setLocation("/dashboard")} className="hover:bg-accent/20">
            <ChevronLeft className="w-5 h-5" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold">Explainable AI Panel</h1>
            <p className="text-muted-foreground text-sm">Transparent threat detection reasoning</p>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Main Explanation */}
        <Card className="glass border-accent/20 mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="w-5 h-5 text-accent" />
              Threat Classification Explanation
            </CardTitle>
            <CardDescription>Why the AI classified this event as a threat</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="glass border-border p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-accent mb-3">Event: Gunshot Detection</h3>
              <p className="text-muted-foreground mb-4">
                <strong>Classification:</strong> Gunshot with 92% confidence
              </p>
              <p className="text-muted-foreground mb-4">
                <strong>Reasoning:</strong> High energy spike in 3–6 kHz band matched gunshot acoustic signature with 92% confidence. The temporal pattern shows a sharp impulse followed by rapid decay, characteristic of ballistic projectile sound. Background noise correlation is minimal (8%), indicating a genuine threat event rather than ambient noise.
              </p>
              <div className="mt-4 p-4 bg-red-500/10 border border-red-500/30 rounded-lg">
                <p className="text-sm text-red-400 font-semibold">⚠️ CRITICAL THREAT DETECTED</p>
                <p className="text-sm text-muted-foreground mt-2">Recommend immediate alert to authorities and emergency response activation.</p>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              <div className="glass border-border p-4 rounded-lg">
                <div className="text-sm text-muted-foreground mb-2">Confidence Score</div>
                <div className="text-3xl font-bold text-accent">92%</div>
              </div>
              <div className="glass border-border p-4 rounded-lg">
                <div className="text-sm text-muted-foreground mb-2">Decision Time</div>
                <div className="text-3xl font-bold text-accent">0.23s</div>
              </div>
              <div className="glass border-border p-4 rounded-lg">
                <div className="text-sm text-muted-foreground mb-2">Risk Score</div>
                <div className="text-3xl font-bold text-red-400">95</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* SHAP Feature Importance */}
        <div className="grid lg:grid-cols-2 gap-6 mb-8">
          <Card className="glass border-accent/20">
            <CardHeader>
              <CardTitle>SHAP Feature Importance</CardTitle>
              <CardDescription>Impact of each feature on the decision</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={featureImportance} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                  <XAxis type="number" stroke="rgba(255,255,255,0.3)" />
                  <YAxis dataKey="feature" type="category" stroke="rgba(255,255,255,0.3)" width={120} tick={{ fontSize: 12 }} />
                  <Tooltip contentStyle={{ backgroundColor: "rgba(0,0,0,0.8)", border: "1px solid rgba(0,255,255,0.3)" }} />
                  <Bar dataKey="importance" fill="rgba(0, 255, 255, 0.6)" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* LIME Explanation */}
          <Card className="glass border-accent/20">
            <CardHeader>
              <CardTitle>LIME Local Explanation</CardTitle>
              <CardDescription>Local interpretable model-agnostic explanation</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                {featureImportance.slice(0, 5).map((item, idx) => (
                  <div key={idx}>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium">{item.feature}</span>
                      <span className="text-sm text-accent">{item.importance}%</span>
                    </div>
                    <div className="w-full h-2 bg-border rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-cyan-500 to-accent rounded-full"
                        style={{ width: `${item.importance}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6 p-4 glass border-border rounded-lg">
                <p className="text-sm text-muted-foreground">
                  LIME analysis shows that the model primarily relies on frequency-domain features, particularly the energy concentration in the 3-6 kHz band, which is the acoustic signature of gunshot events.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Spectrogram Heatmap */}
        <Card className="glass border-accent/20 mb-8">
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
                  <Scatter name="3-6 kHz Band" data={spectrogramHeatmap.map(d => ({ x: d.time, y: (d.freq_3k + d.freq_4k + d.freq_5k + d.freq_6k) / 4 }))} fill="rgba(239, 68, 68, 0.6)" />
                </ScatterChart>
              </ResponsiveContainer>
              <div className="p-4 glass border-border rounded-lg">
                <p className="text-sm text-muted-foreground">
                  The heatmap shows a concentrated energy spike in the 3-6 kHz frequency band, which is characteristic of gunshot acoustic signatures. The sharp temporal onset and rapid decay pattern further supports the threat classification.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Decision Tree */}
        <Card className="glass border-accent/20">
          <CardHeader>
            <CardTitle>Decision Reasoning Chain</CardTitle>
            <CardDescription>Step-by-step threat classification logic</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="glass border-border p-4 rounded-lg border-l-4 border-l-cyan-500">
                <div className="font-semibold text-cyan-400 mb-1">Step 1: Feature Extraction</div>
                <p className="text-sm text-muted-foreground">Extracted 128 audio features including MFCC, spectral centroid, zero-crossing rate, and temporal characteristics.</p>
              </div>

              <div className="glass border-border p-4 rounded-lg border-l-4 border-l-blue-500">
                <div className="font-semibold text-blue-400 mb-1">Step 2: Preprocessing</div>
                <p className="text-sm text-muted-foreground">Applied noise reduction and normalization. Identified signal-to-noise ratio of 18dB, indicating strong threat signature.</p>
              </div>

              <div className="glass border-border p-4 rounded-lg border-l-4 border-l-purple-500">
                <div className="font-semibold text-purple-400 mb-1">Step 3: Model Inference</div>
                <p className="text-sm text-muted-foreground">Gunshot detection model returned 92% confidence. Scream detection: 5%, Glass break: 2%, Alarm: 1%.</p>
              </div>

              <div className="glass border-border p-4 rounded-lg border-l-4 border-l-orange-500">
                <div className="font-semibold text-orange-400 mb-1">Step 4: Context Analysis</div>
                <p className="text-sm text-muted-foreground">Event occurred in high-risk urban zone during evening hours. Historical pattern matches threat profile with 88% similarity.</p>
              </div>

              <div className="glass border-border p-4 rounded-lg border-l-4 border-l-red-500">
                <div className="font-semibold text-red-400 mb-1">Step 5: Final Decision</div>
                <p className="text-sm text-muted-foreground">Multi-agent consensus: CRITICAL THREAT. Confidence: 92%. Risk Score: 95. Action: ALERT AUTHORITIES.</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
