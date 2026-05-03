import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChevronLeft, AlertTriangle, Radio, TrendingUp, Activity } from "lucide-react";
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts";
import { trpc } from "@/lib/trpc";

// Mock data for visualization
const waveformData = Array.from({ length: 100 }, (_, i) => ({
  time: i,
  amplitude: Math.sin(i * 0.1) * (50 + Math.random() * 30)
}));

const spectrogramData = Array.from({ length: 12 }, (_, i) => ({
  frequency: `${(i + 1) * 1}kHz`,
  energy: Math.random() * 100,
  threat: Math.random() > 0.7
}));

const threatTimelineData = [
  { time: "00:00", events: 2, alerts: 0 },
  { time: "04:00", events: 5, alerts: 1 },
  { time: "08:00", events: 8, alerts: 2 },
  { time: "12:00", events: 12, alerts: 3 },
  { time: "16:00", events: 15, alerts: 4 },
  { time: "20:00", events: 18, alerts: 5 },
  { time: "24:00", events: 22, alerts: 6 }
];

const threatAlerts = [
  { id: 1, type: "Gunshot", confidence: 79, timestamp: "14:32:15", sensor: "Sensor-05", severity: "high" },
  { id: 2, type: "Glass Break", confidence: 72, timestamp: "14:28:42", sensor: "Sensor-12", severity: "medium" },
  { id: 3, type: "Alarm", confidence: 68, timestamp: "14:25:30", sensor: "Sensor-08", severity: "high" },
  { id: 4, type: "Scream", confidence: 65, timestamp: "14:20:15", sensor: "Sensor-03", severity: "medium" }
];

export default function Dashboard() {
  const [, setLocation] = useLocation();
  const [riskScore, setRiskScore] = useState(45);
  const [activeAlerts, setActiveAlerts] = useState(threatAlerts.length);

  const dashboardStats = trpc.dashboard.stats.useQuery();

  useEffect(() => {
    const interval = setInterval(() => {
      setRiskScore(prev => Math.max(20, Math.min(95, prev + (Math.random() - 0.5) * 10)));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const getRiskColor = (score: number) => {
    if (score < 30) return "text-green-400";
    if (score < 60) return "text-yellow-400";
    if (score < 80) return "text-orange-400";
    return "text-red-500";
  };

  const getRiskBgColor = (score: number) => {
    if (score < 30) return "bg-green-500/20";
    if (score < 60) return "bg-yellow-500/20";
    if (score < 80) return "bg-orange-500/20";
    return "bg-red-500/20";
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="border-b border-border bg-card/50 sticky top-0 z-40">
        <div className="container mx-auto px-4 py-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={() => setLocation("/")} className="hover:bg-accent/20">
              <ChevronLeft className="w-5 h-5" />
            </Button>
            <div>
              <h1 className="text-3xl font-bold">Live AI Monitoring Dashboard</h1>
              <p className="text-muted-foreground text-sm">Real-time threat detection and analysis</p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => setLocation("/simulation")}>Simulation</Button>
            <Button variant="outline" onClick={() => setLocation("/explainable-ai")}>Explainable AI</Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Key Metrics */}
        <div className="grid md:grid-cols-4 gap-4 mb-8">
          <Card className="glass border-accent/20">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Events</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{dashboardStats.data?.totalEvents || 0}</div>
              <p className="text-xs text-muted-foreground mt-2">Last 24 hours</p>
            </CardContent>
          </Card>

          <Card className="glass border-accent/20">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Active Alerts</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-red-400">{activeAlerts}</div>
              <p className="text-xs text-muted-foreground mt-2">Requires attention</p>
            </CardContent>
          </Card>

          <Card className="glass border-accent/20">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Active Sensors</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-400">{dashboardStats.data?.activeSensors || 0}/{dashboardStats.data?.totalSensors || 0}</div>
              <p className="text-xs text-muted-foreground mt-2">Online status</p>
            </CardContent>
          </Card>

          <Card className={`glass border-accent/20 ${getRiskBgColor(riskScore)}`}>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Risk Score</CardTitle>
            </CardHeader>
            <CardContent>
              <div className={`text-3xl font-bold ${getRiskColor(riskScore)}`}>{Math.round(riskScore)}</div>
              <p className="text-xs text-muted-foreground mt-2">System-wide threat level</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-3 gap-6 mb-8">
          {/* Real-Time Waveform */}
          <Card className="glass border-accent/20 lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Radio className="w-5 h-5 text-accent animate-pulse" />
                Real-Time Audio Waveform
              </CardTitle>
              <CardDescription>Live audio signal visualization</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={200}>
                <AreaChart data={waveformData}>
                  <defs>
                    <linearGradient id="colorAmplitude" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="rgba(0, 255, 255, 0.8)" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="rgba(0, 255, 255, 0)" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                  <XAxis dataKey="time" stroke="rgba(255,255,255,0.3)" />
                  <YAxis stroke="rgba(255,255,255,0.3)" />
                  <Tooltip contentStyle={{ backgroundColor: "rgba(0,0,0,0.8)", border: "1px solid rgba(0,255,255,0.3)" }} />
                  <Area type="monotone" dataKey="amplitude" stroke="rgba(0, 255, 255, 1)" fillOpacity={1} fill="url(#colorAmplitude)" />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Risk Score Gauge */}
          <Card className="glass border-accent/20">
            <CardHeader>
              <CardTitle>Risk Score Meter</CardTitle>
              <CardDescription>Threat level indicator</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center justify-center py-8">
              <div className={`relative w-32 h-32 rounded-full flex items-center justify-center border-4 ${getRiskBgColor(riskScore)} border-accent/50`}>
                <div className="text-center">
                  <div className={`text-4xl font-bold ${getRiskColor(riskScore)}`}>{Math.round(riskScore)}</div>
                  <div className="text-xs text-muted-foreground mt-1">
                    {riskScore < 30 ? "Low" : riskScore < 60 ? "Medium" : riskScore < 80 ? "High" : "Critical"}
                  </div>
                </div>
              </div>
              <div className="mt-6 w-full space-y-2 text-xs text-muted-foreground">
                <div className="flex justify-between">
                  <span>Low</span>
                  <span>Critical</span>
                </div>
                <div className="w-full h-2 bg-gradient-to-r from-green-500 via-yellow-500 via-orange-500 to-red-500 rounded-full"></div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Spectrogram and Timeline */}
        <div className="grid lg:grid-cols-2 gap-6 mb-8">
          {/* Spectrogram */}
          <Card className="glass border-accent/20">
            <CardHeader>
              <CardTitle>Spectrogram Analysis</CardTitle>
              <CardDescription>Frequency domain analysis</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={spectrogramData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                  <XAxis dataKey="frequency" stroke="rgba(255,255,255,0.3)" />
                  <YAxis stroke="rgba(255,255,255,0.3)" />
                  <Tooltip contentStyle={{ backgroundColor: "rgba(0,0,0,0.8)", border: "1px solid rgba(0,255,255,0.3)" }} />
                  <Bar dataKey="energy" fill="rgba(0, 255, 255, 0.6)" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Event Timeline */}
          <Card className="glass border-accent/20">
            <CardHeader>
              <CardTitle>Threat Timeline</CardTitle>
              <CardDescription>Events over time</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={200}>
                <LineChart data={threatTimelineData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                  <XAxis dataKey="time" stroke="rgba(255,255,255,0.3)" />
                  <YAxis stroke="rgba(255,255,255,0.3)" />
                  <Tooltip contentStyle={{ backgroundColor: "rgba(0,0,0,0.8)", border: "1px solid rgba(0,255,255,0.3)" }} />
                  <Line type="monotone" dataKey="events" stroke="rgba(0, 255, 255, 1)" dot={false} />
                  <Line type="monotone" dataKey="alerts" stroke="rgba(239, 68, 68, 1)" dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Threat Alerts */}
        <Card className="glass border-accent/20 mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-red-400" />
              Recent Threat Alerts
            </CardTitle>
            <CardDescription>Active and recent detections</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {threatAlerts.map((alert) => (
                <div key={alert.id} className="glass border-border p-4 rounded-lg flex items-center justify-between hover:border-accent/40 transition-colors">
                  <div className="flex-1">
                    <div className="flex items-center gap-3">
                      <div className={`w-3 h-3 rounded-full ${alert.severity === "critical" ? "bg-red-500" :
                        alert.severity === "high" ? "bg-orange-500" :
                          "bg-yellow-500"
                        } animate-pulse`}></div>
                      <div>
                        <div className="font-semibold">{alert.type}</div>
                        <div className="text-xs text-muted-foreground">{alert.sensor} • {alert.timestamp}</div>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-accent font-semibold">{alert.confidence}%</div>
                    <div className="text-xs text-muted-foreground capitalize">{alert.severity}</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Agent Decision Panel */}
        <Card className="glass border-accent/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="w-5 h-5 text-accent" />
              AI Agent Decision Panel
            </CardTitle>
            <CardDescription>Multi-agent reasoning and decision-making</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="glass border-border p-4 rounded-lg">
                <h4 className="font-semibold text-accent mb-2">Perception Agent</h4>
                <p className="text-sm text-muted-foreground">Detected gunshot-like acoustic signature in 3-6 kHz band with 92% confidence.</p>
              </div>
              <div className="glass border-border p-4 rounded-lg">
                <h4 className="font-semibold text-accent mb-2">Context Analysis</h4>
                <p className="text-sm text-muted-foreground">Event occurred in high-risk urban area during evening hours. Historical pattern matches threat profile.</p>
              </div>
              <div className="glass border-border p-4 rounded-lg">
                <h4 className="font-semibold text-accent mb-2">Threat Detection</h4>
                <p className="text-sm text-muted-foreground">Multi-agent consensus: HIGH THREAT. Recommend immediate alert and authority notification.</p>
              </div>
              <div className="glass border-border p-4 rounded-lg">
                <h4 className="font-semibold text-accent mb-2">Final Decision</h4>
                <p className="text-sm text-muted-foreground">CRITICAL ALERT ISSUED. Authorities notified. Recording activated. Response time: 0.23s.</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
