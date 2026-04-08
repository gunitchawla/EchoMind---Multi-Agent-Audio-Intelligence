import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChevronLeft, Building2, Plane, GraduationCap, Factory, AlertCircle, MapPin } from "lucide-react";

const applications = [
  {
    id: "smart-city",
    title: "Smart City Surveillance",
    icon: Building2,
    description: "Protect urban areas with distributed audio sensors",
    benefits: [
      "Real-time threat detection in public spaces",
      "Reduced response time to emergencies",
      "Integrated with city infrastructure",
      "Privacy-respecting audio analysis"
    ],
    stats: {
      coverage: "95%",
      responseTime: "0.2s",
      accuracy: "92%"
    }
  },
  {
    id: "airport",
    title: "Airport Security",
    icon: Plane,
    description: "Detect suspicious activities and emergencies",
    benefits: [
      "Terminal and restricted area monitoring",
      "Gunshot and explosion detection",
      "Crowd panic detection",
      "Automated emergency response"
    ],
    stats: {
      coverage: "100%",
      responseTime: "0.15s",
      accuracy: "94%"
    }
  },
  {
    id: "campus",
    title: "Campus Safety",
    icon: GraduationCap,
    description: "Protect educational institutions",
    benefits: [
      "Dormitory and facility monitoring",
      "Emergency situation detection",
      "Student safety alerts",
      "Integration with campus security"
    ],
    stats: {
      coverage: "88%",
      responseTime: "0.25s",
      accuracy: "89%"
    }
  },
  {
    id: "industrial",
    title: "Industrial Safety",
    icon: Factory,
    description: "Monitor manufacturing and facilities",
    benefits: [
      "Equipment failure detection",
      "Alarm system monitoring",
      "Worker safety alerts",
      "Compliance reporting"
    ],
    stats: {
      coverage: "92%",
      responseTime: "0.3s",
      accuracy: "91%"
    }
  },
  {
    id: "emergency",
    title: "Emergency Response",
    icon: AlertCircle,
    description: "Support emergency services",
    benefits: [
      "Gunshot location detection",
      "Accident scene monitoring",
      "Crowd control assistance",
      "Real-time incident tracking"
    ],
    stats: {
      coverage: "98%",
      responseTime: "0.18s",
      accuracy: "93%"
    }
  },
  {
    id: "smart-building",
    title: "Smart Buildings",
    icon: MapPin,
    description: "Integrated building management",
    benefits: [
      "Occupancy-based security",
      "Intrusion detection",
      "Emergency evacuation support",
      "Energy-efficient monitoring"
    ],
    stats: {
      coverage: "90%",
      responseTime: "0.22s",
      accuracy: "90%"
    }
  }
];

export default function Applications() {
  const [, setLocation] = useLocation();

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="border-b border-border bg-card/50 sticky top-0 z-40">
        <div className="container mx-auto px-4 py-6 flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => setLocation("/")} className="hover:bg-accent/20">
            <ChevronLeft className="w-5 h-5" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold">Security Applications</h1>
            <p className="text-muted-foreground text-sm">Real-world use cases and deployments</p>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-12 max-w-7xl">
        {/* Introduction */}
        <div className="mb-12 text-center">
          <h2 className="text-4xl font-bold mb-4">Versatile Security Solutions</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            The Audio Intelligence Security Platform adapts to diverse environments and use cases, from urban surveillance to industrial safety monitoring.
          </p>
        </div>

        {/* Applications Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {applications.map((app) => {
            const Icon = app.icon;
            return (
              <Card key={app.id} className="glass border-accent/20 hover:border-accent/40 transition-all hover:shadow-lg hover:shadow-accent/10">
                <CardHeader>
                  <div className="flex items-start justify-between mb-3">
                    <Icon className="w-8 h-8 text-accent" />
                  </div>
                  <CardTitle>{app.title}</CardTitle>
                  <CardDescription>{app.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    {app.benefits.slice(0, 3).map((benefit, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-sm">
                        <span className="text-accent mt-1">✓</span>
                        <span className="text-muted-foreground">{benefit}</span>
                      </div>
                    ))}
                  </div>

                  <div className="pt-4 border-t border-border">
                    <div className="grid grid-cols-3 gap-2 text-center">
                      <div>
                        <div className="text-xs text-muted-foreground mb-1">Coverage</div>
                        <div className="font-semibold text-accent text-sm">{app.stats.coverage}</div>
                      </div>
                      <div>
                        <div className="text-xs text-muted-foreground mb-1">Response</div>
                        <div className="font-semibold text-accent text-sm">{app.stats.responseTime}</div>
                      </div>
                      <div>
                        <div className="text-xs text-muted-foreground mb-1">Accuracy</div>
                        <div className="font-semibold text-accent text-sm">{app.stats.accuracy}</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Detailed Use Cases */}
        <div className="space-y-8 mb-12">
          <h2 className="text-3xl font-bold">Detailed Use Cases</h2>

          {/* Smart City */}
          <Card className="glass border-accent/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building2 className="w-6 h-6 text-accent" />
                Smart City Surveillance
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                Deploy distributed audio sensors across city infrastructure to monitor public spaces, parks, and streets for security threats in real-time.
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="glass border-border p-4 rounded-lg">
                  <h4 className="font-semibold text-accent mb-2">Deployment</h4>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• Street light audio sensors</li>
                    <li>• Park monitoring stations</li>
                    <li>• Transit hub coverage</li>
                    <li>• Public facility protection</li>
                  </ul>
                </div>
                <div className="glass border-border p-4 rounded-lg">
                  <h4 className="font-semibold text-accent mb-2">Threats Detected</h4>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• Gunshots and explosions</li>
                    <li>• Violent altercations</li>
                    <li>• Crowd panic situations</li>
                    <li>• Emergency vehicle alerts</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Airport Security */}
          <Card className="glass border-accent/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Plane className="w-6 h-6 text-accent" />
                Airport Security
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                Comprehensive audio monitoring across terminals, gates, and restricted areas to detect security threats and emergency situations instantly.
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="glass border-border p-4 rounded-lg">
                  <h4 className="font-semibold text-accent mb-2">Coverage Areas</h4>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• Passenger terminals</li>
                    <li>• Security checkpoints</li>
                    <li>• Baggage handling areas</li>
                    <li>• Tarmac and runways</li>
                  </ul>
                </div>
                <div className="glass border-border p-4 rounded-lg">
                  <h4 className="font-semibold text-accent mb-2">Response Actions</h4>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• Immediate security alert</li>
                    <li>• Area lockdown activation</li>
                    <li>• Emergency services dispatch</li>
                    <li>• Flight operations pause</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Campus Safety */}
          <Card className="glass border-accent/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <GraduationCap className="w-6 h-6 text-accent" />
                Campus Safety
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                Protect students and staff with comprehensive audio monitoring across dormitories, classrooms, and campus facilities.
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="glass border-border p-4 rounded-lg">
                  <h4 className="font-semibold text-accent mb-2">Monitored Locations</h4>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• Dormitory buildings</li>
                    <li>• Academic facilities</li>
                    <li>• Library and study areas</li>
                    <li>• Campus grounds</li>
                  </ul>
                </div>
                <div className="glass border-border p-4 rounded-lg">
                  <h4 className="font-semibold text-accent mb-2">Safety Features</h4>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• Emergency alert system</li>
                    <li>• Distress call detection</li>
                    <li>• Campus police integration</li>
                    <li>• Student notification</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Industrial Safety */}
          <Card className="glass border-accent/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Factory className="w-6 h-6 text-accent" />
                Industrial Safety
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                Monitor manufacturing facilities and industrial sites for equipment failures, safety incidents, and worker emergencies.
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="glass border-border p-4 rounded-lg">
                  <h4 className="font-semibold text-accent mb-2">Industrial Applications</h4>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• Manufacturing floors</li>
                    <li>• Equipment monitoring</li>
                    <li>• Hazardous areas</li>
                    <li>• Worker safety zones</li>
                  </ul>
                </div>
                <div className="glass border-border p-4 rounded-lg">
                  <h4 className="font-semibold text-accent mb-2">Incident Detection</h4>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• Equipment alarms</li>
                    <li>• Worker distress signals</li>
                    <li>• Safety violations</li>
                    <li>• Compliance monitoring</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Implementation Guide */}
        <Card className="glass border-accent/20">
          <CardHeader>
            <CardTitle>Implementation & Deployment</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-4 gap-4">
              <div className="glass border-border p-4 rounded-lg text-center">
                <div className="text-2xl font-bold text-accent mb-2">1</div>
                <h4 className="font-semibold mb-2">Assessment</h4>
                <p className="text-sm text-muted-foreground">Evaluate site requirements and sensor placement</p>
              </div>
              <div className="glass border-border p-4 rounded-lg text-center">
                <div className="text-2xl font-bold text-accent mb-2">2</div>
                <h4 className="font-semibold mb-2">Installation</h4>
                <p className="text-sm text-muted-foreground">Deploy sensors and establish network connectivity</p>
              </div>
              <div className="glass border-border p-4 rounded-lg text-center">
                <div className="text-2xl font-bold text-accent mb-2">3</div>
                <h4 className="font-semibold mb-2">Configuration</h4>
                <p className="text-sm text-muted-foreground">Calibrate detection models and alert thresholds</p>
              </div>
              <div className="glass border-border p-4 rounded-lg text-center">
                <div className="text-2xl font-bold text-accent mb-2">4</div>
                <h4 className="font-semibold mb-2">Operation</h4>
                <p className="text-sm text-muted-foreground">Monitor and maintain system performance</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
