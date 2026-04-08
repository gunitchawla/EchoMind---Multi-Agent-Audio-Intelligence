import { useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChevronLeft, Users, Radio, Settings, LogOut, Plus, Edit2, Trash2 } from "lucide-react";
import { trpc } from "@/lib/trpc";

const mockUsers = [
  { id: 1, name: "Admin User", email: "admin@security.com", role: "admin", status: "active" },
  { id: 2, name: "Security Officer", email: "officer@security.com", role: "user", status: "active" },
  { id: 3, name: "Monitoring Team", email: "monitor@security.com", role: "user", status: "active" }
];

const mockSensors = [
  { id: 1, name: "Sensor-01", location: "Downtown Square", status: "online", type: "microphone", lastSeen: "2 mins ago" },
  { id: 2, name: "Sensor-02", location: "Park Avenue", status: "online", type: "iot_sensor", lastSeen: "1 min ago" },
  { id: 3, name: "Sensor-03", location: "Central Station", status: "offline", type: "cctv_audio", lastSeen: "15 mins ago" },
  { id: 4, name: "Sensor-04", location: "Market District", status: "online", type: "microphone", lastSeen: "30 secs ago" },
  { id: 5, name: "Sensor-05", location: "Harbor Area", status: "maintenance", type: "iot_sensor", lastSeen: "2 hours ago" }
];

export default function AdminPanel() {
  const [, setLocation] = useLocation();
  const [activeTab, setActiveTab] = useState<"users" | "sensors" | "settings">("users");
  const [users, setUsers] = useState(mockUsers);
  const [sensors, setSensors] = useState(mockSensors);

  const dashboardStats = trpc.dashboard.stats.useQuery();

  const handleDeleteUser = (id: number) => {
    setUsers(users.filter(u => u.id !== id));
  };

  const handleDeleteSensor = (id: number) => {
    setSensors(sensors.filter(s => s.id !== id));
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
            <h1 className="text-3xl font-bold">Admin Panel</h1>
          </div>
          <Button variant="outline" onClick={() => setLocation("/")} className="gap-2">
            <LogOut className="w-4 h-4" />
            Exit Admin
          </Button>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Stats Overview */}
        <div className="grid md:grid-cols-4 gap-4 mb-8">
          <Card className="glass border-accent/20">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Users</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{users.length}</div>
              <p className="text-xs text-muted-foreground mt-2">Active administrators and operators</p>
            </CardContent>
          </Card>

          <Card className="glass border-accent/20">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Active Sensors</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-400">{sensors.filter(s => s.status === "online").length}/{sensors.length}</div>
              <p className="text-xs text-muted-foreground mt-2">Sensors online and operational</p>
            </CardContent>
          </Card>

          <Card className="glass border-accent/20">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">System Health</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-400">98%</div>
              <p className="text-xs text-muted-foreground mt-2">Overall system uptime</p>
            </CardContent>
          </Card>

          <Card className="glass border-accent/20">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Alerts Today</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-red-400">{dashboardStats.data?.activeAlerts || 0}</div>
              <p className="text-xs text-muted-foreground mt-2">Active threat alerts</p>
            </CardContent>
          </Card>
        </div>

        {/* Tab Navigation */}
        <div className="flex gap-2 mb-8 border-b border-border">
          <Button
            variant={activeTab === "users" ? "default" : "ghost"}
            onClick={() => setActiveTab("users")}
            className="gap-2 rounded-none border-b-2 border-transparent data-[active=true]:border-accent"
            data-active={activeTab === "users"}
          >
            <Users className="w-4 h-4" />
            User Management
          </Button>
          <Button
            variant={activeTab === "sensors" ? "default" : "ghost"}
            onClick={() => setActiveTab("sensors")}
            className="gap-2 rounded-none border-b-2 border-transparent data-[active=true]:border-accent"
            data-active={activeTab === "sensors"}
          >
            <Radio className="w-4 h-4" />
            Sensor Network
          </Button>
          <Button
            variant={activeTab === "settings" ? "default" : "ghost"}
            onClick={() => setActiveTab("settings")}
            className="gap-2 rounded-none border-b-2 border-transparent data-[active=true]:border-accent"
            data-active={activeTab === "settings"}
          >
            <Settings className="w-4 h-4" />
            Configuration
          </Button>
        </div>

        {/* Users Tab */}
        {activeTab === "users" && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">User Management</h2>
              <Button className="gap-2">
                <Plus className="w-4 h-4" />
                Add User
              </Button>
            </div>

            <Card className="glass border-accent/20">
              <CardHeader>
                <CardTitle>Active Users</CardTitle>
                <CardDescription>Manage system administrators and operators</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {users.map((user) => (
                    <div key={user.id} className="glass border-border p-4 rounded-lg flex items-center justify-between hover:border-accent/40 transition-colors">
                      <div className="flex-1">
                        <div className="font-semibold">{user.name}</div>
                        <div className="text-sm text-muted-foreground">{user.email}</div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <div className="text-sm font-medium capitalize">{user.role}</div>
                          <div className={`text-xs ${user.status === "active" ? "text-green-400" : "text-yellow-400"}`}>
                            {user.status}
                          </div>
                        </div>
                        <Button variant="ghost" size="icon" className="hover:bg-accent/20">
                          <Edit2 className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="hover:bg-red-500/20"
                          onClick={() => handleDeleteUser(user.id)}
                        >
                          <Trash2 className="w-4 h-4 text-red-400" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Sensors Tab */}
        {activeTab === "sensors" && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Sensor Network Management</h2>
              <Button className="gap-2">
                <Plus className="w-4 h-4" />
                Add Sensor
              </Button>
            </div>

            <Card className="glass border-accent/20">
              <CardHeader>
                <CardTitle>Deployed Sensors</CardTitle>
                <CardDescription>Monitor and manage audio sensor nodes</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {sensors.map((sensor) => (
                    <div key={sensor.id} className="glass border-border p-4 rounded-lg hover:border-accent/40 transition-colors">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex-1">
                          <div className="font-semibold flex items-center gap-2">
                            {sensor.name}
                            <span className={`w-2 h-2 rounded-full ${
                              sensor.status === "online" ? "bg-green-400" :
                              sensor.status === "offline" ? "bg-red-400" :
                              "bg-yellow-400"
                            }`}></span>
                          </div>
                          <div className="text-sm text-muted-foreground">{sensor.location}</div>
                        </div>
                        <div className="text-right">
                          <div className="text-sm font-medium capitalize">{sensor.type.replace("_", " ")}</div>
                          <div className="text-xs text-muted-foreground">{sensor.lastSeen}</div>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="ghost" size="sm" className="hover:bg-accent/20">
                          <Edit2 className="w-4 h-4" />
                          Configure
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="hover:bg-red-500/20"
                          onClick={() => handleDeleteSensor(sensor.id)}
                        >
                          <Trash2 className="w-4 h-4 text-red-400" />
                          Remove
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Sensor Statistics */}
            <div className="grid md:grid-cols-3 gap-6">
              <Card className="glass border-accent/20">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Online Sensors</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-green-400">{sensors.filter(s => s.status === "online").length}</div>
                </CardContent>
              </Card>

              <Card className="glass border-accent/20">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Offline Sensors</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-red-400">{sensors.filter(s => s.status === "offline").length}</div>
                </CardContent>
              </Card>

              <Card className="glass border-accent/20">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Maintenance</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-yellow-400">{sensors.filter(s => s.status === "maintenance").length}</div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {/* Settings Tab */}
        {activeTab === "settings" && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">System Configuration</h2>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Alert Thresholds */}
              <Card className="glass border-accent/20">
                <CardHeader>
                  <CardTitle>Alert Thresholds</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Gunshot Detection Threshold</label>
                    <input type="range" min="0" max="100" defaultValue="85" className="w-full" />
                    <div className="text-xs text-muted-foreground mt-1">Current: 85%</div>
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Glass Break Threshold</label>
                    <input type="range" min="0" max="100" defaultValue="80" className="w-full" />
                    <div className="text-xs text-muted-foreground mt-1">Current: 80%</div>
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Scream Detection Threshold</label>
                    <input type="range" min="0" max="100" defaultValue="75" className="w-full" />
                    <div className="text-xs text-muted-foreground mt-1">Current: 75%</div>
                  </div>
                  <Button className="w-full mt-4">Save Thresholds</Button>
                </CardContent>
              </Card>

              {/* Notification Settings */}
              <Card className="glass border-accent/20">
                <CardHeader>
                  <CardTitle>Notification Settings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-medium">Email Alerts</label>
                    <input type="checkbox" defaultChecked className="w-4 h-4" />
                  </div>
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-medium">SMS Alerts</label>
                    <input type="checkbox" defaultChecked className="w-4 h-4" />
                  </div>
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-medium">Push Notifications</label>
                    <input type="checkbox" defaultChecked className="w-4 h-4" />
                  </div>
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-medium">Critical Alerts Only</label>
                    <input type="checkbox" className="w-4 h-4" />
                  </div>
                  <Button className="w-full mt-4">Save Settings</Button>
                </CardContent>
              </Card>

              {/* System Maintenance */}
              <Card className="glass border-accent/20">
                <CardHeader>
                  <CardTitle>System Maintenance</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button variant="outline" className="w-full">Backup Database</Button>
                  <Button variant="outline" className="w-full">Clear Cache</Button>
                  <Button variant="outline" className="w-full">Update Models</Button>
                  <Button variant="outline" className="w-full">System Diagnostics</Button>
                </CardContent>
              </Card>

              {/* API Configuration */}
              <Card className="glass border-accent/20">
                <CardHeader>
                  <CardTitle>API Configuration</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">API Key</label>
                    <input type="password" value="sk_live_••••••••••••••••" className="w-full bg-border/50 border border-border rounded px-3 py-2 text-sm" readOnly />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Webhook URL</label>
                    <input type="text" placeholder="https://your-domain.com/webhook" className="w-full bg-border/50 border border-border rounded px-3 py-2 text-sm" />
                  </div>
                  <Button className="w-full">Update Configuration</Button>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
