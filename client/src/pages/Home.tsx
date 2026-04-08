import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, Shield, Zap, Brain, Radio, BarChart3, AlertTriangle } from "lucide-react";

export default function Home() {
  const [, setLocation] = useLocation();

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="text-2xl font-bold gradient-text">Audio Intelligence Security</div>
          <div className="flex gap-6 items-center">
            <button onClick={() => setLocation("/architecture")} className="text-sm hover:text-accent transition-colors">Architecture</button>
            <button onClick={() => setLocation("/dashboard")} className="text-sm hover:text-accent transition-colors">Dashboard</button>
            <button onClick={() => setLocation("/voice-input")} className="text-sm hover:text-accent transition-colors">Voice Input</button>
            <button onClick={() => setLocation("/sensor-map")} className="text-sm hover:text-accent transition-colors">Sensor Map</button>
            <button onClick={() => setLocation("/notifications")} className="text-sm hover:text-accent transition-colors">Alerts</button>
            <button onClick={() => setLocation("/model-training")} className="text-sm hover:text-accent transition-colors">Model Training</button>
            <button onClick={() => setLocation("/applications")} className="text-sm hover:text-accent transition-colors">Applications</button>
            <Button onClick={() => setLocation("/dashboard")} size="sm">Get Started</Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden py-24 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center space-y-8">
            <h1 className="text-5xl md:text-7xl font-bold leading-tight">
              <span className="gradient-text">AI-Powered Audio</span>
              <br />
              <span>Threat Detection</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Advanced acoustic intelligence for smart city surveillance, public safety, and IoT security monitoring. Detect threats in real-time with explainable AI.
            </p>
            <div className="flex gap-4 justify-center pt-4">
              <Button size="lg" onClick={() => setLocation("/dashboard")} className="gap-2">
                View Live Dashboard <ArrowRight className="w-4 h-4" />
              </Button>
              <Button size="lg" variant="outline" onClick={() => setLocation("/architecture")} className="gap-2">
                See System Architecture <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Animated visualization placeholder */}
          <div className="mt-20 relative h-64 rounded-lg glass border border-accent/20 flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-accent/10 to-transparent animate-pulse"></div>
            <div className="relative z-10 text-center">
              <Radio className="w-16 h-16 mx-auto text-accent mb-4 animate-spin" />
              <p className="text-muted-foreground">Real-time Audio Stream Visualization</p>
            </div>
          </div>
        </div>
      </section>

      {/* Key Features Section */}
      <section className="py-20 px-4 bg-card/50">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-4xl font-bold text-center mb-16">Key Features</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="glass border-accent/20 hover:border-accent/40 transition-colors">
              <CardHeader>
                <Brain className="w-8 h-8 text-accent mb-2" />
                <CardTitle>Advanced AI Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Multi-agent intelligence system with SHAP/LIME explainability for transparent threat detection.</p>
              </CardContent>
            </Card>

            <Card className="glass border-accent/20 hover:border-accent/40 transition-colors">
              <CardHeader>
                <Zap className="w-8 h-8 text-accent mb-2" />
                <CardTitle>Real-Time Processing</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Instant audio analysis with sub-second latency for immediate threat response and alerts.</p>
              </CardContent>
            </Card>

            <Card className="glass border-accent/20 hover:border-accent/40 transition-colors">
              <CardHeader>
                <Shield className="w-8 h-8 text-accent mb-2" />
                <CardTitle>Comprehensive Coverage</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Detects gunshots, glass breaks, alarms, screams, and 50+ acoustic threat signatures.</p>
              </CardContent>
            </Card>

            <Card className="glass border-accent/20 hover:border-accent/40 transition-colors">
              <CardHeader>
                <BarChart3 className="w-8 h-8 text-accent mb-2" />
                <CardTitle>Advanced Analytics</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Comprehensive reporting with detection accuracy metrics, response times, and trend analysis.</p>
              </CardContent>
            </Card>

            <Card className="glass border-accent/20 hover:border-accent/40 transition-colors">
              <CardHeader>
                <AlertTriangle className="w-8 h-8 text-accent mb-2" />
                <CardTitle>Smart Alerting</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Configurable threat thresholds with multi-channel notifications and automated response workflows.</p>
              </CardContent>
            </Card>

            <Card className="glass border-accent/20 hover:border-accent/40 transition-colors">
              <CardHeader>
                <Radio className="w-8 h-8 text-accent mb-2" />
                <CardTitle>IoT Integration</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Seamless integration with distributed sensor networks and smart city infrastructure.</p>
              </CardContent>
            </Card>

            <Card className="glass border-accent/20 hover:border-accent/40 transition-colors cursor-pointer" onClick={() => setLocation("/voice-input")}>
              <CardHeader>
                <Zap className="w-8 h-8 text-accent mb-2" />
                <CardTitle>Voice Input</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Record or upload audio directly and analyze for threat detection in real-time.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* AI Architecture Overview */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-4xl font-bold text-center mb-16">System Architecture</h2>
          <div className="space-y-6">
            <div className="glass border-accent/20 p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-accent mb-3">Audio Input Layer</h3>
              <p className="text-muted-foreground">Microphones, IoT sensors, CCTV audio streams, and smart device feeds provide diverse audio sources.</p>
            </div>
            <div className="glass border-accent/20 p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-accent mb-3">Intelligent Processing</h3>
              <p className="text-muted-foreground">Advanced preprocessing, feature extraction, and multi-agent AI analysis with explainable decision-making.</p>
            </div>
            <div className="glass border-accent/20 p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-accent mb-3">Decision & Action</h3>
              <p className="text-muted-foreground">Risk scoring, alert generation, and automated security response with authority notifications.</p>
            </div>
          </div>
          <div className="text-center mt-8">
            <Button onClick={() => setLocation("/architecture")} variant="outline" className="gap-2">
              View Full Architecture <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </section>

      {/* Security Applications */}
      <section className="py-20 px-4 bg-card/50">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-4xl font-bold text-center mb-16">Real-World Applications</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="glass border-accent/20 p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-accent mb-2">Smart City Surveillance</h3>
              <p className="text-muted-foreground">Protect urban areas with distributed audio sensors monitoring public spaces for threats.</p>
            </div>
            <div className="glass border-accent/20 p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-accent mb-2">Airport Security</h3>
              <p className="text-muted-foreground">Detect suspicious activities and emergency situations across terminals and restricted areas.</p>
            </div>
            <div className="glass border-accent/20 p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-accent mb-2">Campus Safety</h3>
              <p className="text-muted-foreground">Protect educational institutions with real-time threat detection and emergency response.</p>
            </div>
            <div className="glass border-accent/20 p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-accent mb-2">Industrial Safety</h3>
              <p className="text-muted-foreground">Monitor manufacturing facilities for equipment failures, alarms, and safety incidents.</p>
            </div>
          </div>
          <div className="text-center mt-8">
            <Button onClick={() => setLocation("/applications")} variant="outline" className="gap-2">
              Explore All Applications <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-4xl text-center space-y-8">
          <h2 className="text-4xl font-bold">Ready to Deploy?</h2>
          <p className="text-xl text-muted-foreground">Experience the power of AI-driven audio intelligence for your security infrastructure.</p>
          <div className="flex gap-4 justify-center">
            <Button size="lg" onClick={() => setLocation("/dashboard")} className="gap-2">
              Access Dashboard <ArrowRight className="w-4 h-4" />
            </Button>
            <Button size="lg" variant="outline" onClick={() => setLocation("/admin")}>
              Admin Panel
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8 px-4 bg-card/50">
        <div className="container mx-auto max-w-6xl text-center text-muted-foreground">
          <p>Audio Intelligence Security Platform &copy; 2026. Advanced AI-powered threat detection for smart cities.</p>
        </div>
      </footer>
    </div>
  );
}
