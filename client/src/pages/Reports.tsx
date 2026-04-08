import { useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChevronLeft, Download, Calendar, TrendingUp } from "lucide-react";
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

const threatEventsData = [
  { date: "Mar 08", events: 12, alerts: 2 },
  { date: "Mar 09", events: 15, alerts: 3 },
  { date: "Mar 10", events: 18, alerts: 4 },
  { date: "Mar 11", events: 22, alerts: 5 },
  { date: "Mar 12", events: 19, alerts: 3 },
  { date: "Mar 13", events: 25, alerts: 6 },
  { date: "Mar 14", events: 28, alerts: 7 }
];

const detectionAccuracyData = [
  { model: "Gunshot", accuracy: 92 },
  { model: "Glass Break", accuracy: 87 },
  { model: "Alarm", accuracy: 95 },
  { model: "Scream", accuracy: 78 },
  { model: "Vehicle", accuracy: 84 }
];

const sensorActivityData = [
  { sensor: "Sensor-01", events: 45, uptime: 99.8 },
  { sensor: "Sensor-02", events: 38, uptime: 99.5 },
  { sensor: "Sensor-03", events: 52, uptime: 98.2 },
  { sensor: "Sensor-04", events: 41, uptime: 99.9 },
  { sensor: "Sensor-05", events: 35, uptime: 97.5 }
];

const threatTypeDistribution = [
  { name: "Gunshot", value: 35, color: "#ff6b6b" },
  { name: "Glass Break", value: 25, color: "#4ecdc4" },
  { name: "Alarm", value: 20, color: "#ffd93d" },
  { name: "Scream", value: 15, color: "#a8e6cf" },
  { name: "Vehicle", value: 5, color: "#ff8b94" }
];

const responseTimeData = [
  { range: "0-0.1s", count: 45 },
  { range: "0.1-0.2s", count: 38 },
  { range: "0.2-0.3s", count: 22 },
  { range: "0.3-0.5s", count: 8 },
  { range: ">0.5s", count: 2 }
];

export default function Reports() {
  const [, setLocation] = useLocation();
  const [dateRange, setDateRange] = useState("7days");

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
              <h1 className="text-3xl font-bold">Visualization & Reports</h1>
              <p className="text-muted-foreground text-sm">Analytics and performance metrics</p>
            </div>
          </div>
          <Button className="gap-2">
            <Download className="w-4 h-4" />
            Export Report
          </Button>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Date Range Selector */}
        <div className="flex gap-2 mb-8">
          {["7days", "30days", "90days", "custom"].map((range) => (
            <Button
              key={range}
              variant={dateRange === range ? "default" : "outline"}
              onClick={() => setDateRange(range)}
              className="gap-2"
            >
              <Calendar className="w-4 h-4" />
              {range === "7days" ? "Last 7 Days" : range === "30days" ? "Last 30 Days" : range === "90days" ? "Last 90 Days" : "Custom Range"}
            </Button>
          ))}
        </div>

        {/* Key Metrics */}
        <div className="grid md:grid-cols-4 gap-4 mb-8">
          <Card className="glass border-accent/20">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Events</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">139</div>
              <p className="text-xs text-muted-foreground mt-2">+12% from previous period</p>
            </CardContent>
          </Card>

          <Card className="glass border-accent/20">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Avg Detection Time</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">0.18s</div>
              <p className="text-xs text-muted-foreground mt-2">Sub-second response</p>
            </CardContent>
          </Card>

          <Card className="glass border-accent/20">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Avg Accuracy</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-400">88.4%</div>
              <p className="text-xs text-muted-foreground mt-2">Across all models</p>
            </CardContent>
          </Card>

          <Card className="glass border-accent/20">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">System Uptime</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-400">99.2%</div>
              <p className="text-xs text-muted-foreground mt-2">Highly reliable</p>
            </CardContent>
          </Card>
        </div>

        {/* Charts Grid */}
        <div className="grid lg:grid-cols-2 gap-6 mb-8">
          {/* Threat Events Over Time */}
          <Card className="glass border-accent/20">
            <CardHeader>
              <CardTitle>Threat Events Over Time</CardTitle>
              <CardDescription>Daily event and alert count</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={threatEventsData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                  <XAxis dataKey="date" stroke="rgba(255,255,255,0.3)" />
                  <YAxis stroke="rgba(255,255,255,0.3)" />
                  <Tooltip contentStyle={{ backgroundColor: "rgba(0,0,0,0.8)", border: "1px solid rgba(0,255,255,0.3)" }} />
                  <Legend />
                  <Line type="monotone" dataKey="events" stroke="rgba(0, 255, 255, 1)" dot={false} name="Events" />
                  <Line type="monotone" dataKey="alerts" stroke="rgba(239, 68, 68, 1)" dot={false} name="Alerts" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Detection Accuracy by Model */}
          <Card className="glass border-accent/20">
            <CardHeader>
              <CardTitle>Detection Accuracy by Model</CardTitle>
              <CardDescription>Performance metrics for each threat type</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={detectionAccuracyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                  <XAxis dataKey="model" stroke="rgba(255,255,255,0.3)" />
                  <YAxis stroke="rgba(255,255,255,0.3)" />
                  <Tooltip contentStyle={{ backgroundColor: "rgba(0,0,0,0.8)", border: "1px solid rgba(0,255,255,0.3)" }} />
                  <Bar dataKey="accuracy" fill="rgba(0, 255, 255, 0.6)" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Threat Type Distribution */}
          <Card className="glass border-accent/20">
            <CardHeader>
              <CardTitle>Threat Type Distribution</CardTitle>
              <CardDescription>Breakdown of detected threats</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={threatTypeDistribution}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, value }) => `${name} ${value}%`}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {threatTypeDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ backgroundColor: "rgba(0,0,0,0.8)", border: "1px solid rgba(0,255,255,0.3)" }} />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Response Time Distribution */}
          <Card className="glass border-accent/20">
            <CardHeader>
              <CardTitle>Response Time Distribution</CardTitle>
              <CardDescription>Detection latency analysis</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={responseTimeData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                  <XAxis dataKey="range" stroke="rgba(255,255,255,0.3)" />
                  <YAxis stroke="rgba(255,255,255,0.3)" />
                  <Tooltip contentStyle={{ backgroundColor: "rgba(0,0,0,0.8)", border: "1px solid rgba(0,255,255,0.3)" }} />
                  <Bar dataKey="count" fill="rgba(0, 255, 255, 0.6)" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Sensor Activity */}
        <Card className="glass border-accent/20 mb-8">
          <CardHeader>
            <CardTitle>Sensor Activity & Performance</CardTitle>
            <CardDescription>Individual sensor metrics and uptime</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {sensorActivityData.map((sensor, idx) => (
                <div key={idx} className="glass border-border p-4 rounded-lg">
                  <div className="flex items-center justify-between mb-3">
                    <div className="font-semibold">{sensor.sensor}</div>
                    <div className="text-right">
                      <div className="text-sm font-medium">{sensor.events} events</div>
                      <div className="text-xs text-muted-foreground">{sensor.uptime}% uptime</div>
                    </div>
                  </div>
                  <div className="w-full h-2 bg-border rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-cyan-500 to-accent rounded-full"
                      style={{ width: `${sensor.uptime}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Export Options */}
        <Card className="glass border-accent/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Download className="w-5 h-5 text-accent" />
              Export & Download
            </CardTitle>
            <CardDescription>Generate and download reports in various formats</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-4">
              <Button variant="outline" className="h-auto py-4 flex flex-col items-center gap-2">
                <span className="text-2xl">📊</span>
                <span>PDF Report</span>
                <span className="text-xs text-muted-foreground">Full analytics report</span>
              </Button>
              <Button variant="outline" className="h-auto py-4 flex flex-col items-center gap-2">
                <span className="text-2xl">📈</span>
                <span>CSV Export</span>
                <span className="text-xs text-muted-foreground">Raw data export</span>
              </Button>
              <Button variant="outline" className="h-auto py-4 flex flex-col items-center gap-2">
                <span className="text-2xl">📋</span>
                <span>Executive Summary</span>
                <span className="text-xs text-muted-foreground">High-level overview</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
