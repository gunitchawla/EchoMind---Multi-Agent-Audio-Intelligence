import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChevronLeft, Bell, Mail, MessageSquare, AlertTriangle, CheckCircle, Clock, Trash2, Settings } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface Notification {
  id: string;
  type: "critical" | "warning" | "info";
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
  source: string;
  channels: ("in-app" | "email" | "sms")[];
}

interface AlertRule {
  id: string;
  name: string;
  threatType: string;
  minRiskScore: number;
  enabled: boolean;
  channels: ("in-app" | "email" | "sms")[];
  recipients: string[];
}

export default function Notifications() {
  const [, setLocation] = useLocation();
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: "notif-1",
      type: "critical",
      title: "🚨 Critical Threat Detected",
      message: "Gunshot detected at Downtown Plaza sensor with 92% confidence",
      timestamp: new Date(Date.now() - 2 * 60000),
      read: false,
      source: "Downtown Plaza",
      channels: ["in-app", "email", "sms"]
    },
    {
      id: "notif-2",
      type: "warning",
      title: "⚠️ High Risk Alert",
      message: "Glass breaking sound detected at Shopping District - Risk Score: 78",
      timestamp: new Date(Date.now() - 15 * 60000),
      read: false,
      source: "Shopping District",
      channels: ["in-app", "email"]
    },
    {
      id: "notif-3",
      type: "info",
      title: "✓ Threat Cleared",
      message: "Alert at Central Park has been resolved. No ongoing threats detected.",
      timestamp: new Date(Date.now() - 45 * 60000),
      read: true,
      source: "Central Park",
      channels: ["in-app"]
    },
    {
      id: "notif-4",
      type: "warning",
      title: "⚠️ Sensor Warning",
      message: "Airport Terminal A sensor showing degraded performance",
      timestamp: new Date(Date.now() - 90 * 60000),
      read: true,
      source: "Airport Terminal A",
      channels: ["in-app", "email"]
    }
  ]);

  const [alertRules, setAlertRules] = useState<AlertRule[]>([
    {
      id: "rule-1",
      name: "Critical Gunshot Detection",
      threatType: "Gunshot",
      minRiskScore: 80,
      enabled: true,
      channels: ["in-app", "email", "sms"],
      recipients: ["security@example.com", "+1234567890"]
    },
    {
      id: "rule-2",
      name: "High Risk Glass Break",
      threatType: "Glass Break",
      minRiskScore: 70,
      enabled: true,
      channels: ["in-app", "email"],
      recipients: ["security@example.com"]
    },
    {
      id: "rule-3",
      name: "Scream Detection",
      threatType: "Scream",
      minRiskScore: 60,
      enabled: true,
      channels: ["in-app"],
      recipients: ["alerts@example.com"]
    }
  ]);

  const [showNewRuleForm, setShowNewRuleForm] = useState(false);
  const [unreadCount, setUnreadCount] = useState(notifications.filter(n => !n.read).length);

  useEffect(() => {
    setUnreadCount(notifications.filter(n => !n.read).length);
  }, [notifications]);

  const getTypeColor = (type: string) => {
    switch (type) {
      case "critical":
        return "bg-red-500/20 text-red-400 border-red-500/30";
      case "warning":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
      case "info":
        return "bg-blue-500/20 text-blue-400 border-blue-500/30";
      default:
        return "bg-gray-500/20 text-gray-400 border-gray-500/30";
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "critical":
        return <AlertTriangle className="w-4 h-4" />;
      case "warning":
        return <AlertTriangle className="w-4 h-4" />;
      case "info":
        return <CheckCircle className="w-4 h-4" />;
      default:
        return <Bell className="w-4 h-4" />;
    }
  };

  const markAsRead = (id: string) => {
    setNotifications(prev =>
      prev.map(n => n.id === id ? { ...n, read: true } : n)
    );
  };

  const deleteNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const toggleRuleEnabled = (id: string) => {
    setAlertRules(prev =>
      prev.map(r => r.id === id ? { ...r, enabled: !r.enabled } : r)
    );
  };

  const deleteRule = (id: string) => {
    setAlertRules(prev => prev.filter(r => r.id !== id));
  };

  const formatTime = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) return "Just now";
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    return `${days}d ago`;
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="border-b border-border bg-card/50 sticky top-0 z-40">
        <div className="container mx-auto px-4 py-6 flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => setLocation("/")} className="hover:bg-accent/20">
            <ChevronLeft className="w-5 h-5" />
          </Button>
          <div className="flex-1">
            <h1 className="text-3xl font-bold">Notifications & Alerts</h1>
            <p className="text-muted-foreground text-sm">Manage real-time alerts and notification rules</p>
          </div>
          {unreadCount > 0 && (
            <Badge className="bg-red-500/20 text-red-400 border-red-500/30 text-lg px-3 py-1">
              {unreadCount} Unread
            </Badge>
          )}
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <Tabs defaultValue="notifications" className="space-y-6">
          <TabsList className="grid w-full max-w-md grid-cols-2 bg-card/50">
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="rules">Alert Rules</TabsTrigger>
          </TabsList>

          {/* Notifications Tab */}
          <TabsContent value="notifications" className="space-y-4">
            <div className="grid lg:grid-cols-3 gap-6">
              {/* Notification List */}
              <div className="lg:col-span-2 space-y-3">
                {notifications.length === 0 ? (
                  <Card className="glass border-accent/20">
                    <CardContent className="py-12 text-center">
                      <Bell className="w-12 h-12 mx-auto text-muted-foreground mb-4 opacity-50" />
                      <p className="text-muted-foreground">No notifications yet</p>
                    </CardContent>
                  </Card>
                ) : (
                  notifications.map(notif => (
                    <Card
                      key={notif.id}
                      className={`glass border-accent/20 transition-all ${
                        !notif.read ? "border-accent/40 bg-accent/5" : ""
                      }`}
                    >
                      <CardContent className="p-4">
                        <div className="flex gap-4">
                          <div className={`flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center ${getTypeColor(notif.type)}`}>
                            {getTypeIcon(notif.type)}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between gap-2">
                              <div>
                                <h3 className="font-semibold">{notif.title}</h3>
                                <p className="text-sm text-muted-foreground mt-1">{notif.message}</p>
                              </div>
                              {!notif.read && (
                                <div className="w-2 h-2 rounded-full bg-accent flex-shrink-0 mt-2"></div>
                              )}
                            </div>
                            <div className="flex items-center gap-2 mt-3 flex-wrap">
                              <span className="text-xs text-muted-foreground flex items-center gap-1">
                                <Clock className="w-3 h-3" />
                                {formatTime(notif.timestamp)}
                              </span>
                              <span className="text-xs text-muted-foreground">•</span>
                              <span className="text-xs text-muted-foreground">{notif.source}</span>
                              <div className="flex gap-1 ml-auto">
                                {notif.channels.includes("in-app") && (
                                  <Badge variant="outline" className="text-xs">
                                    <Bell className="w-2 h-2 mr-1" />
                                    In-App
                                  </Badge>
                                )}
                                {notif.channels.includes("email") && (
                                  <Badge variant="outline" className="text-xs">
                                    <Mail className="w-2 h-2 mr-1" />
                                    Email
                                  </Badge>
                                )}
                                {notif.channels.includes("sms") && (
                                  <Badge variant="outline" className="text-xs">
                                    <MessageSquare className="w-2 h-2 mr-1" />
                                    SMS
                                  </Badge>
                                )}
                              </div>
                            </div>
                          </div>
                          <div className="flex gap-2 flex-shrink-0">
                            {!notif.read && (
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => markAsRead(notif.id)}
                                className="hover:bg-accent/20"
                              >
                                Mark Read
                              </Button>
                            )}
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => deleteNotification(notif.id)}
                              className="hover:bg-red-500/20"
                            >
                              <Trash2 className="w-4 h-4 text-red-400" />
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                )}
              </div>

              {/* Statistics */}
              <div className="space-y-4">
                <Card className="glass border-accent/20">
                  <CardHeader>
                    <CardTitle className="text-lg">Statistics</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <div className="text-sm text-muted-foreground mb-1">Total Notifications</div>
                      <div className="text-3xl font-bold text-accent">{notifications.length}</div>
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground mb-1">Unread</div>
                      <div className="text-2xl font-bold text-yellow-400">{unreadCount}</div>
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground mb-1">Critical Alerts</div>
                      <div className="text-2xl font-bold text-red-400">
                        {notifications.filter(n => n.type === "critical").length}
                      </div>
                    </div>
                    <Button className="w-full mt-4" variant="outline">
                      Mark All as Read
                    </Button>
                  </CardContent>
                </Card>

                <Card className="glass border-accent/20">
                  <CardHeader>
                    <CardTitle className="text-lg">Notification Channels</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center justify-between p-3 glass border-border rounded-lg">
                      <div className="flex items-center gap-2">
                        <Bell className="w-4 h-4 text-accent" />
                        <span className="text-sm">In-App</span>
                      </div>
                      <input type="checkbox" defaultChecked className="w-4 h-4" />
                    </div>
                    <div className="flex items-center justify-between p-3 glass border-border rounded-lg">
                      <div className="flex items-center gap-2">
                        <Mail className="w-4 h-4 text-accent" />
                        <span className="text-sm">Email</span>
                      </div>
                      <input type="checkbox" defaultChecked className="w-4 h-4" />
                    </div>
                    <div className="flex items-center justify-between p-3 glass border-border rounded-lg">
                      <div className="flex items-center gap-2">
                        <MessageSquare className="w-4 h-4 text-accent" />
                        <span className="text-sm">SMS</span>
                      </div>
                      <input type="checkbox" className="w-4 h-4" />
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Alert Rules Tab */}
          <TabsContent value="rules" className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold">Alert Rules</h2>
              <Button onClick={() => setShowNewRuleForm(!showNewRuleForm)} className="gap-2">
                <Settings className="w-4 h-4" />
                New Rule
              </Button>
            </div>

            {showNewRuleForm && (
              <Card className="glass border-accent/20 bg-accent/5">
                <CardHeader>
                  <CardTitle>Create New Alert Rule</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="text-sm font-semibold mb-2 block">Rule Name</label>
                    <input
                      type="text"
                      placeholder="e.g., Critical Gunshot Detection"
                      className="w-full px-3 py-2 bg-background border border-border rounded-lg text-foreground placeholder-muted-foreground"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-semibold mb-2 block">Threat Type</label>
                      <select className="w-full px-3 py-2 bg-background border border-border rounded-lg text-foreground">
                        <option>Gunshot</option>
                        <option>Glass Break</option>
                        <option>Alarm</option>
                        <option>Scream</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-sm font-semibold mb-2 block">Min Risk Score</label>
                      <input
                        type="number"
                        min="0"
                        max="100"
                        defaultValue="70"
                        className="w-full px-3 py-2 bg-background border border-border rounded-lg text-foreground"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-semibold mb-2 block">Notification Channels</label>
                    <div className="space-y-2">
                      <label className="flex items-center gap-2">
                        <input type="checkbox" defaultChecked className="w-4 h-4" />
                        <span className="text-sm">In-App</span>
                      </label>
                      <label className="flex items-center gap-2">
                        <input type="checkbox" defaultChecked className="w-4 h-4" />
                        <span className="text-sm">Email</span>
                      </label>
                      <label className="flex items-center gap-2">
                        <input type="checkbox" className="w-4 h-4" />
                        <span className="text-sm">SMS</span>
                      </label>
                    </div>
                  </div>
                  <div className="flex gap-2 pt-4">
                    <Button className="flex-1">Create Rule</Button>
                    <Button
                      variant="outline"
                      className="flex-1"
                      onClick={() => setShowNewRuleForm(false)}
                    >
                      Cancel
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            <div className="space-y-3">
              {alertRules.map(rule => (
                <Card key={rule.id} className="glass border-accent/20">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="font-semibold">{rule.name}</h3>
                          <Badge variant={rule.enabled ? "default" : "outline"}>
                            {rule.enabled ? "Active" : "Inactive"}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-3">
                          Triggers when {rule.threatType} threat score exceeds {rule.minRiskScore}
                        </p>
                        <div className="flex gap-2 flex-wrap">
                          {rule.channels.map(channel => (
                            <Badge key={channel} variant="outline" className="text-xs">
                              {channel === "in-app" && <Bell className="w-2 h-2 mr-1" />}
                              {channel === "email" && <Mail className="w-2 h-2 mr-1" />}
                              {channel === "sms" && <MessageSquare className="w-2 h-2 mr-1" />}
                              {channel}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div className="flex gap-2 flex-shrink-0">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => toggleRuleEnabled(rule.id)}
                          className="hover:bg-accent/20"
                        >
                          {rule.enabled ? "Disable" : "Enable"}
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => deleteRule(rule.id)}
                          className="hover:bg-red-500/20"
                        >
                          <Trash2 className="w-4 h-4 text-red-400" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
