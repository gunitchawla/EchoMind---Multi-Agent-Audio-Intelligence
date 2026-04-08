import { useState, useEffect, useRef } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChevronLeft, MapPin, AlertCircle, Wifi, WifiOff, Zap } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface Sensor {
  id: string;
  name: string;
  lat: number;
  lng: number;
  status: "online" | "offline" | "warning";
  threatLevel: number;
  lastUpdate: Date;
  detections: number;
  type: "microphone" | "cctv" | "iot";
}

export default function SensorMap() {
  const [, setLocation] = useLocation();
  const mapRef = useRef<HTMLDivElement>(null);
  const [sensors, setSensors] = useState<Sensor[]>([
    {
      id: "sensor-1",
      name: "Downtown Plaza",
      lat: 40.7128,
      lng: -74.006,
      status: "online",
      threatLevel: 45,
      lastUpdate: new Date(),
      detections: 3,
      type: "microphone"
    },
    {
      id: "sensor-2",
      name: "Central Park",
      lat: 40.785,
      lng: -73.968,
      status: "online",
      threatLevel: 12,
      lastUpdate: new Date(Date.now() - 5000),
      detections: 0,
      type: "microphone"
    },
    {
      id: "sensor-3",
      name: "Airport Terminal A",
      lat: 40.7769,
      lng: -73.8740,
      status: "warning",
      threatLevel: 78,
      lastUpdate: new Date(Date.now() - 30000),
      detections: 8,
      type: "cctv"
    },
    {
      id: "sensor-4",
      name: "Transit Station",
      lat: 40.7505,
      lng: -73.9972,
      status: "online",
      threatLevel: 34,
      lastUpdate: new Date(Date.now() - 2000),
      detections: 1,
      type: "iot"
    },
    {
      id: "sensor-5",
      name: "Shopping District",
      lat: 40.758,
      lng: -73.9855,
      status: "offline",
      threatLevel: 0,
      lastUpdate: new Date(Date.now() - 300000),
      detections: 0,
      type: "microphone"
    }
  ]);

  const [selectedSensor, setSelectedSensor] = useState<Sensor | null>(null);
  const [mapLoaded, setMapLoaded] = useState(false);

  useEffect(() => {
    // Simulate map loading
    const timer = setTimeout(() => setMapLoaded(true), 500);
    return () => clearTimeout(timer);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "online":
        return "bg-green-500/20 text-green-400 border-green-500/30";
      case "warning":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
      case "offline":
        return "bg-red-500/20 text-red-400 border-red-500/30";
      default:
        return "bg-gray-500/20 text-gray-400 border-gray-500/30";
    }
  };

  const getThreatColor = (level: number) => {
    if (level > 70) return "text-red-400";
    if (level > 40) return "text-yellow-400";
    return "text-green-400";
  };

  const getThreatBgColor = (level: number) => {
    if (level > 70) return "bg-red-500/20";
    if (level > 40) return "bg-yellow-500/20";
    return "bg-green-500/20";
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="border-b border-border bg-card/50 sticky top-0 z-40">
        <div className="container mx-auto px-4 py-6 flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => setLocation("/")} className="hover:bg-accent/20">
            <ChevronLeft className="w-5 h-5" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold">Sensor Network Map</h1>
            <p className="text-muted-foreground text-sm">Real-time sensor locations and threat visualization</p>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="grid lg:grid-cols-4 gap-6">
          {/* Map Area */}
          <div className="lg:col-span-3">
            <Card className="glass border-accent/20 overflow-hidden h-[600px]">
              <div
                ref={mapRef}
                className="w-full h-full bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative flex items-center justify-center"
              >
                {!mapLoaded ? (
                  <div className="text-center">
                    <div className="animate-spin mb-4">
                      <MapPin className="w-12 h-12 text-accent" />
                    </div>
                    <p className="text-muted-foreground">Loading map...</p>
                  </div>
                ) : (
                  <>
                    {/* Map Background Grid */}
                    <div className="absolute inset-0 opacity-10">
                      <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                        <defs>
                          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="0.5" />
                          </pattern>
                        </defs>
                        <rect width="100%" height="100%" fill="url(#grid)" />
                      </svg>
                    </div>

                    {/* Sensor Markers */}
                    <div className="absolute inset-0">
                      {sensors.map((sensor, idx) => {
                        const x = ((sensor.lng + 74.2) / 1.2) * 100;
                        const y = ((40.9 - sensor.lat) / 0.2) * 100;
                        return (
                          <div
                            key={sensor.id}
                            className="absolute cursor-pointer transform -translate-x-1/2 -translate-y-1/2 group"
                            style={{ left: `${Math.max(5, Math.min(95, x))}%`, top: `${Math.max(5, Math.min(95, y))}%` }}
                            onClick={() => setSelectedSensor(sensor)}
                          >
                            {/* Threat Heatmap Ring */}
                            <div
                              className={`absolute inset-0 rounded-full blur-xl opacity-60 group-hover:opacity-100 transition-opacity ${getThreatBgColor(
                                sensor.threatLevel
                              )}`}
                              style={{
                                width: `${40 + sensor.threatLevel / 2}px`,
                                height: `${40 + sensor.threatLevel / 2}px`,
                                left: "-50%",
                                top: "-50%"
                              }}
                            ></div>

                            {/* Sensor Marker */}
                            <div
                              className={`relative w-8 h-8 rounded-full flex items-center justify-center border-2 transition-all group-hover:scale-125 ${
                                selectedSensor?.id === sensor.id
                                  ? "border-accent bg-accent/30 scale-125"
                                  : sensor.status === "offline"
                                  ? "border-red-500 bg-red-500/20"
                                  : sensor.status === "warning"
                                  ? "border-yellow-500 bg-yellow-500/20"
                                  : "border-green-500 bg-green-500/20"
                              }`}
                            >
                              <MapPin className="w-4 h-4 text-accent" />
                            </div>

                            {/* Threat Level Badge */}
                            <div
                              className={`absolute top-0 right-0 text-xs font-bold px-2 py-1 rounded-full ${getThreatColor(
                                sensor.threatLevel
                              )} ${getThreatBgColor(sensor.threatLevel)}`}
                            >
                              {sensor.threatLevel}
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    {/* Map Legend */}
                    <div className="absolute bottom-4 left-4 glass border-border p-4 rounded-lg text-sm space-y-2">
                      <div className="font-semibold text-accent mb-3">Legend</div>
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-green-500"></div>
                        <span>Online</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                        <span>Warning</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-red-500"></div>
                        <span>Offline</span>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </Card>
          </div>

          {/* Sensor Details Panel */}
          <div className="lg:col-span-1 space-y-4">
            {selectedSensor ? (
              <Card className="glass border-accent/20 sticky top-24">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-accent" />
                    Sensor Details
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="text-sm text-muted-foreground mb-1">Name</div>
                    <div className="font-semibold">{selectedSensor.name}</div>
                  </div>

                  <div>
                    <div className="text-sm text-muted-foreground mb-1">Status</div>
                    <Badge className={`${getStatusColor(selectedSensor.status)}`}>
                      {selectedSensor.status === "online" && <Wifi className="w-3 h-3 mr-1" />}
                      {selectedSensor.status === "offline" && <WifiOff className="w-3 h-3 mr-1" />}
                      {selectedSensor.status === "warning" && <AlertCircle className="w-3 h-3 mr-1" />}
                      {selectedSensor.status.toUpperCase()}
                    </Badge>
                  </div>

                  <div>
                    <div className="text-sm text-muted-foreground mb-1">Threat Level</div>
                    <div className="flex items-center gap-2">
                      <div className="flex-1 h-2 bg-border rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-green-500 via-yellow-500 to-red-500 rounded-full"
                          style={{ width: `${selectedSensor.threatLevel}%` }}
                        ></div>
                      </div>
                      <div className={`text-lg font-bold ${getThreatColor(selectedSensor.threatLevel)}`}>
                        {selectedSensor.threatLevel}
                      </div>
                    </div>
                  </div>

                  <div>
                    <div className="text-sm text-muted-foreground mb-1">Type</div>
                    <Badge variant="outline" className="capitalize">
                      {selectedSensor.type}
                    </Badge>
                  </div>

                  <div>
                    <div className="text-sm text-muted-foreground mb-1">Detections Today</div>
                    <div className="text-2xl font-bold text-accent">{selectedSensor.detections}</div>
                  </div>

                  <div>
                    <div className="text-sm text-muted-foreground mb-1">Last Update</div>
                    <div className="text-xs">
                      {selectedSensor.lastUpdate.toLocaleTimeString()}
                    </div>
                  </div>

                  <div className="pt-4 border-t border-border space-y-2">
                    <Button className="w-full" variant="outline">
                      View Details
                    </Button>
                    <Button className="w-full" variant="outline">
                      Configure
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card className="glass border-accent/20 sticky top-24">
                <CardHeader>
                  <CardTitle>Select a Sensor</CardTitle>
                </CardHeader>
                <CardContent className="text-center text-muted-foreground">
                  <p>Click on a sensor marker on the map to view details.</p>
                </CardContent>
              </Card>
            )}

            {/* Sensor List */}
            <Card className="glass border-accent/20">
              <CardHeader>
                <CardTitle className="text-lg">Active Sensors ({sensors.filter(s => s.status === "online").length})</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 max-h-96 overflow-y-auto">
                  {sensors.map((sensor) => (
                    <div
                      key={sensor.id}
                      onClick={() => setSelectedSensor(sensor)}
                      className={`glass border-border p-3 rounded-lg cursor-pointer transition-all hover:border-accent/40 ${
                        selectedSensor?.id === sensor.id ? "border-accent bg-accent/10" : ""
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="font-semibold text-sm">{sensor.name}</div>
                        <div
                          className={`w-2 h-2 rounded-full ${
                            sensor.status === "online"
                              ? "bg-green-500"
                              : sensor.status === "warning"
                              ? "bg-yellow-500"
                              : "bg-red-500"
                          }`}
                        ></div>
                      </div>
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <span>{sensor.detections} detections</span>
                        <span className={getThreatColor(sensor.threatLevel)}>
                          <Zap className="w-3 h-3 inline mr-1" />
                          {sensor.threatLevel}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
