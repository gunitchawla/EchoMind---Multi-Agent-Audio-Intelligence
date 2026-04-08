import { useState, useRef, useEffect } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChevronLeft, Upload, Play, Trash2, Brain, BarChart3, Zap, CheckCircle, AlertCircle, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

interface TrainingDataset {
  id: string;
  name: string;
  soundType: string;
  samples: number;
  duration: number;
  uploadDate: Date;
  status: "pending" | "processing" | "ready";
}

interface TrainingModel {
  id: string;
  version: number;
  createdDate: Date;
  accuracy: number;
  precision: number;
  recall: number;
  f1Score: number;
  trainingTime: number;
  samplesUsed: number;
  status: "training" | "completed" | "deployed";
  soundTypes: string[];
}

interface ModelPerformance {
  soundType: string;
  accuracy: number;
  detections: number;
  falsePositives: number;
}

export default function ModelTraining() {
  const [, setLocation] = useLocation();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [datasets, setDatasets] = useState<TrainingDataset[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('audio_intelligence_datasets_v2');
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          return parsed.map((d: any) => ({ ...d, uploadDate: new Date(d.uploadDate) }));
        } catch (e) { console.error(e); }
      }
    }
    return [
      {
        id: "ds-1",
        name: "Gunshot Detection Dataset",
        soundType: "Gunshot",
        samples: 15000,
        duration: 75000,
        uploadDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
        status: "ready"
      },
      {
        id: "ds-2",
        name: "Glass Breaking Sounds",
        soundType: "Glass Break",
        samples: 12000,
        duration: 60000,
        uploadDate: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000),
        status: "ready"
      },
      {
        id: "ds-3",
        name: "Alarm & Siren Sounds",
        soundType: "Alarm",
        samples: 14000,
        duration: 70000,
        uploadDate: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000),
        status: "ready"
      },
      {
        id: "ds-4",
        name: "Human Scream Dataset",
        soundType: "Scream",
        samples: 10000,
        duration: 50000,
        uploadDate: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000),
        status: "ready"
      },
      {
        id: "ds-5",
        name: "Vehicle Sounds Collection",
        soundType: "Vehicle",
        samples: 18000,
        duration: 90000,
        uploadDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
        status: "processing"
      }
    ];
  });

  const [models, setModels] = useState<TrainingModel[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('audio_intelligence_models_v2');
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          return parsed.map((m: any) => ({ ...m, createdDate: new Date(m.createdDate) }));
        } catch (e) { console.error(e); }
      }
    }
    return [
      {
        id: "model-1",
        version: 1,
        createdDate: new Date(Date.now() - 25 * 24 * 60 * 60 * 1000),
        accuracy: 95.8,
        precision: 96.1,
        recall: 94.5,
        f1Score: 95.3,
        trainingTime: 7200,
        samplesUsed: 25000,
        status: "deployed",
        soundTypes: ["Gunshot", "Glass Break", "Alarm"]
      },
      {
        id: "model-2",
        version: 2,
        createdDate: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000),
        accuracy: 98.4,
        precision: 98.7,
        recall: 97.9,
        f1Score: 98.3,
        trainingTime: 10800,
        samplesUsed: 38000,
        status: "deployed",
        soundTypes: ["Gunshot", "Glass Break", "Alarm", "Scream"]
      },
      {
        id: "model-3",
        version: 3,
        createdDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
        accuracy: 99.6,
        precision: 99.8,
        recall: 99.4,
        f1Score: 99.6,
        trainingTime: 18000,
        samplesUsed: 51000,
        status: "training",
        soundTypes: ["Gunshot", "Glass Break", "Alarm", "Scream", "Vehicle"]
      }
    ];
  });

  useEffect(() => {
    localStorage.setItem('audio_intelligence_datasets_v2', JSON.stringify(datasets));
  }, [datasets]);

  useEffect(() => {
    localStorage.setItem('audio_intelligence_models_v2', JSON.stringify(models));
  }, [models]);

  const [isTraining, setIsTraining] = useState(false);
  const [trainingProgress, setTrainingProgress] = useState(0);
  const [selectedModel, setSelectedModel] = useState<TrainingModel | null>(models[1]);

  const performanceData: ModelPerformance[] = [
    { soundType: "Gunshot", accuracy: 99.8, detections: 15450, falsePositives: 3 },
    { soundType: "Glass Break", accuracy: 99.1, detections: 12280, falsePositives: 12 },
    { soundType: "Alarm", accuracy: 99.4, detections: 14300, falsePositives: 8 },
    { soundType: "Scream", accuracy: 98.8, detections: 10170, falsePositives: 15 }
  ];

  const accuracyTrend = [
    { version: 1, accuracy: 95.8, precision: 96.1, recall: 94.5 },
    { version: 2, accuracy: 98.4, precision: 98.7, recall: 97.9 },
    { version: 3, accuracy: 99.6, precision: 99.8, recall: 99.4 }
  ];

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const newDataset: TrainingDataset = {
        id: `ds-${Date.now()}`,
        name: files[0].name.replace(/\.[^/.]+$/, ""),
        soundType: "Custom",
        samples: Math.floor(Math.random() * 2000) + 500,
        duration: Math.floor(Math.random() * 15000) + 2500,
        uploadDate: new Date(),
        status: "pending"
      };
      setDatasets(prev => [newDataset, ...prev]);
    }
  };

  const startTraining = () => {
    setIsTraining(true);
    setTrainingProgress(0);

    const interval = setInterval(() => {
      setTrainingProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsTraining(false);
          // Add new trained model
          const newModel: TrainingModel = {
            id: `model-${Date.now()}`,
            version: models.length + 1,
            createdDate: new Date(),
            accuracy: 97.2 + Math.random() * 2,
            precision: 97.8 + Math.random() * 2,
            recall: 96.5 + Math.random() * 2,
            f1Score: 97.1 + Math.random() * 2,
            trainingTime: 4500,
            samplesUsed: 15000,
            status: "completed",
            soundTypes: ["Gunshot", "Glass Break", "Alarm", "Scream", "Vehicle"]
          };
          setModels(prev => [newModel, ...prev]);
          return 100;
        }
        return prev + Math.random() * 15;
      });
    }, 500);
  };

  const trainDataset = (datasetId: string) => {
    setDatasets(prev => prev.map(d => d.id === datasetId ? { ...d, status: "processing" } : d));

    setTimeout(() => {
      setDatasets(prev => {
        const dataset = prev.find(d => d.id === datasetId);

        setModels(prevModels => {
          const baseAccuracy = 85 + Math.random() * 14;
          const newModel: TrainingModel = {
            id: `model-${Date.now()}`,
            version: prevModels.length + 1,
            createdDate: new Date(),
            accuracy: baseAccuracy,
            precision: baseAccuracy + (Math.random() * 2 - 1),
            recall: baseAccuracy + (Math.random() * 2 - 1),
            f1Score: baseAccuracy + (Math.random() * 2 - 1),
            trainingTime: Math.floor(Math.random() * 3000) + 1000,
            samplesUsed: dataset ? dataset.samples : 1000,
            status: "completed",
            soundTypes: dataset ? [dataset.soundType] : ["Custom"]
          };
          return [newModel, ...prevModels];
        });

        return prev.map(d => d.id === datasetId ? { ...d, status: "ready" } : d);
      });
    }, 3000);
  };

  const deleteDataset = (id: string) => {
    setDatasets(prev => prev.filter(d => d.id !== id));
  };

  const formatDuration = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    return `${hours}h ${mins}m`;
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
            <h1 className="text-3xl font-bold">AI Model Training</h1>
            <p className="text-muted-foreground text-sm">Upload training data and optimize threat detection accuracy</p>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <Tabs defaultValue="datasets" className="space-y-6">
          <TabsList className="grid w-full max-w-md grid-cols-3 bg-card/50">
            <TabsTrigger value="datasets">Training Data</TabsTrigger>
            <TabsTrigger value="models">Models</TabsTrigger>
            <TabsTrigger value="performance">Performance</TabsTrigger>
          </TabsList>

          {/* Training Datasets Tab */}
          <TabsContent value="datasets" className="space-y-6">
            <div className="grid lg:grid-cols-3 gap-6">
              {/* Upload Section */}
              <div className="lg:col-span-2 space-y-6">
                <Card className="glass border-accent/20">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Upload className="w-5 h-5 text-accent" />
                      Upload Training Data
                    </CardTitle>
                    <CardDescription>Add audio samples to improve model accuracy</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="border-2 border-dashed border-accent/30 rounded-lg p-8 text-center hover:border-accent/60 transition-colors cursor-pointer"
                      onClick={() => fileInputRef.current?.click()}>
                      <Upload className="w-12 h-12 mx-auto text-accent mb-3 opacity-70" />
                      <p className="font-semibold mb-1">Drop audio files here</p>
                      <p className="text-sm text-muted-foreground">or click to browse</p>
                      <p className="text-xs text-muted-foreground mt-2">Supported: MP3, WAV, OGG (Max 100MB)</p>
                      <input
                        ref={fileInputRef}
                        type="file"
                        multiple
                        accept="audio/*"
                        onChange={handleFileUpload}
                        className="hidden"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="glass border-border p-4 rounded-lg text-center">
                        <div className="text-2xl font-bold text-accent">{datasets.reduce((sum, d) => sum + d.samples, 0)}</div>
                        <div className="text-xs text-muted-foreground">Total Samples</div>
                      </div>
                      <div className="glass border-border p-4 rounded-lg text-center">
                        <div className="text-2xl font-bold text-accent">{(datasets.reduce((sum, d) => sum + d.duration, 0) / 3600).toFixed(1)}h</div>
                        <div className="text-xs text-muted-foreground">Total Duration</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Datasets List */}
                <Card className="glass border-accent/20">
                  <CardHeader>
                    <CardTitle>Training Datasets ({datasets.length})</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {datasets.map(dataset => (
                      <div key={dataset.id} className="glass border-border p-4 rounded-lg">
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex-1">
                            <div className="font-semibold flex items-center gap-2">
                              {dataset.name}
                              <Badge className={`text-xs ${dataset.status === "ready"
                                ? "bg-green-500/20 text-green-400"
                                : dataset.status === "processing"
                                  ? "bg-yellow-500/20 text-yellow-400"
                                  : "bg-blue-500/20 text-blue-400"
                                }`}>
                                {dataset.status === "ready" && <CheckCircle className="w-3 h-3 mr-1" />}
                                {dataset.status === "processing" && <Clock className="w-3 h-3 mr-1 animate-spin" />}
                                {dataset.status === "pending" && <AlertCircle className="w-3 h-3 mr-1" />}
                                {dataset.status}
                              </Badge>
                            </div>
                            <p className="text-xs text-muted-foreground mt-1">
                              {dataset.samples} samples • {formatDuration(dataset.duration)} • {dataset.soundType}
                            </p>
                          </div>
                          <div className="flex items-center gap-2">
                            {dataset.status === "pending" && (
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => trainDataset(dataset.id)}
                                className="h-8 gap-1.5"
                              >
                                <Brain className="w-3.5 h-3.5" />
                                <span className="text-xs">Train</span>
                              </Button>
                            )}
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => deleteDataset(dataset.id)}
                              className="hover:bg-red-500/20"
                            >
                              <Trash2 className="w-4 h-4 text-red-400" />
                            </Button>
                          </div>
                        </div>
                        <div className="text-xs text-muted-foreground">
                          Uploaded {dataset.uploadDate.toLocaleDateString()}
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>

              {/* Quick Stats */}
              <div className="space-y-4">
                <Card className="glass border-accent/20">
                  <CardHeader>
                    <CardTitle className="text-lg">Dataset Stats</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <div className="text-sm text-muted-foreground mb-1">Sound Types</div>
                      <div className="text-2xl font-bold text-accent">5</div>
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground mb-1">Ready Datasets</div>
                      <div className="text-2xl font-bold text-green-400">4</div>
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground mb-1">Processing</div>
                      <div className="text-2xl font-bold text-yellow-400">1</div>
                    </div>
                    <Button className="w-full mt-4" variant="outline">
                      Validate Data
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Models Tab */}
          <TabsContent value="models" className="space-y-6">
            <div className="grid lg:grid-cols-3 gap-6">
              {/* Training Section */}
              <div className="lg:col-span-2 space-y-6">
                {isTraining && (
                  <Card className="glass border-accent/20 bg-accent/5">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Brain className="w-5 h-5 text-accent animate-pulse" />
                        Model Training in Progress
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <div className="flex justify-between mb-2">
                          <span className="text-sm font-semibold">Training Progress</span>
                          <span className="text-sm text-accent">{Math.round(trainingProgress)}%</span>
                        </div>
                        <div className="w-full h-3 bg-border rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-cyan-500 to-accent rounded-full transition-all duration-300"
                            style={{ width: `${trainingProgress}%` }}
                          ></div>
                        </div>
                      </div>
                      <div className="grid grid-cols-3 gap-3 text-sm">
                        <div className="glass border-border p-2 rounded text-center">
                          <div className="text-xs text-muted-foreground">Samples</div>
                          <div className="font-semibold">14,000</div>
                        </div>
                        <div className="glass border-border p-2 rounded text-center">
                          <div className="text-xs text-muted-foreground">Epochs</div>
                          <div className="font-semibold">{Math.round(trainingProgress / 10)}/10</div>
                        </div>
                        <div className="glass border-border p-2 rounded text-center">
                          <div className="text-xs text-muted-foreground">Time</div>
                          <div className="font-semibold">{Math.round(trainingProgress / 2)}m</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}

                {!isTraining && (
                  <Card className="glass border-accent/20">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Zap className="w-5 h-5 text-accent" />
                        Start Model Training
                      </CardTitle>
                      <CardDescription>Train a new model using all available datasets</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <label className="text-sm font-semibold">Model Configuration</label>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between p-3 glass border-border rounded-lg">
                            <span className="text-sm">Learning Rate</span>
                            <input type="number" defaultValue="0.001" step="0.0001" className="w-24 px-2 py-1 bg-background border border-border rounded text-sm" />
                          </div>
                          <div className="flex items-center justify-between p-3 glass border-border rounded-lg">
                            <span className="text-sm">Batch Size</span>
                            <select className="w-24 px-2 py-1 bg-background border border-border rounded text-sm">
                              <option>32</option>
                              <option>64</option>
                              <option>128</option>
                            </select>
                          </div>
                          <div className="flex items-center justify-between p-3 glass border-border rounded-lg">
                            <span className="text-sm">Epochs</span>
                            <input type="number" defaultValue="10" min="1" max="100" className="w-24 px-2 py-1 bg-background border border-border rounded text-sm" />
                          </div>
                        </div>
                      </div>
                      <Button onClick={startTraining} className="w-full gap-2 py-6">
                        <Brain className="w-4 h-4" />
                        Start Training
                      </Button>
                    </CardContent>
                  </Card>
                )}

                {/* Models List */}
                <Card className="glass border-accent/20">
                  <CardHeader>
                    <CardTitle>Trained Models ({models.length})</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {models.map(model => (
                      <div
                        key={model.id}
                        onClick={() => setSelectedModel(model)}
                        className={`glass border-border p-4 rounded-lg cursor-pointer transition-all hover:border-accent/40 ${selectedModel?.id === model.id ? "border-accent bg-accent/10" : ""
                          }`}
                      >
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex-1">
                            <div className="font-semibold flex items-center gap-2">
                              Model v{model.version}
                              <Badge className={`text-xs ${model.status === "deployed"
                                ? "bg-green-500/20 text-green-400"
                                : model.status === "training"
                                  ? "bg-yellow-500/20 text-yellow-400"
                                  : "bg-blue-500/20 text-blue-400"
                                }`}>
                                {model.status === "deployed" && <CheckCircle className="w-3 h-3 mr-1" />}
                                {model.status === "training" && <Clock className="w-3 h-3 mr-1 animate-spin" />}
                                {model.status}
                              </Badge>
                            </div>
                            <p className="text-xs text-muted-foreground mt-1">
                              {model.createdDate.toLocaleDateString()} • {model.samplesUsed} samples • {formatDuration(model.trainingTime)}
                            </p>
                          </div>
                        </div>
                        <div className="grid grid-cols-4 gap-2 text-sm">
                          <div className="text-center">
                            <div className="text-xs text-muted-foreground">Accuracy</div>
                            <div className="font-bold text-accent">{model.accuracy.toFixed(1)}%</div>
                          </div>
                          <div className="text-center">
                            <div className="text-xs text-muted-foreground">Precision</div>
                            <div className="font-bold text-cyan-400">{model.precision.toFixed(1)}%</div>
                          </div>
                          <div className="text-center">
                            <div className="text-xs text-muted-foreground">Recall</div>
                            <div className="font-bold text-purple-400">{model.recall.toFixed(1)}%</div>
                          </div>
                          <div className="text-center">
                            <div className="text-xs text-muted-foreground">F1 Score</div>
                            <div className="font-bold text-green-400">{model.f1Score.toFixed(1)}%</div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>

              {/* Model Details */}
              {selectedModel && (
                <Card className="glass border-accent/20 sticky top-24 h-fit">
                  <CardHeader>
                    <CardTitle className="text-lg">Model v{selectedModel.version} Details</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <div className="text-sm text-muted-foreground mb-1">Accuracy</div>
                      <div className="text-3xl font-bold text-accent">{selectedModel.accuracy.toFixed(1)}%</div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div className="glass border-border p-3 rounded-lg text-center">
                        <div className="text-xs text-muted-foreground">Precision</div>
                        <div className="font-bold text-cyan-400">{selectedModel.precision.toFixed(1)}%</div>
                      </div>
                      <div className="glass border-border p-3 rounded-lg text-center">
                        <div className="text-xs text-muted-foreground">Recall</div>
                        <div className="font-bold text-purple-400">{selectedModel.recall.toFixed(1)}%</div>
                      </div>
                    </div>

                    <div className="glass border-border p-3 rounded-lg text-center">
                      <div className="text-xs text-muted-foreground">F1 Score</div>
                      <div className="font-bold text-green-400">{selectedModel.f1Score.toFixed(1)}%</div>
                    </div>

                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Sound Types</span>
                        <span className="font-semibold">{selectedModel.soundTypes.length}</span>
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {selectedModel.soundTypes.map(type => (
                          <Badge key={type} variant="outline" className="text-xs">
                            {type}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {selectedModel.status === "completed" && (
                      <Button className="w-full gap-2">
                        <CheckCircle className="w-4 h-4" />
                        Deploy Model
                      </Button>
                    )}

                    {selectedModel.status === "deployed" && (
                      <Button variant="outline" className="w-full gap-2 text-green-400">
                        <CheckCircle className="w-4 h-4" />
                        Currently Deployed
                      </Button>
                    )}
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>

          {/* Performance Tab */}
          <TabsContent value="performance" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Accuracy Trend */}
              <Card className="glass border-accent/20">
                <CardHeader>
                  <CardTitle>Model Accuracy Trend</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={accuracyTrend}>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                      <XAxis dataKey="version" stroke="rgba(255,255,255,0.3)" />
                      <YAxis stroke="rgba(255,255,255,0.3)" domain={[80, 100]} />
                      <Tooltip contentStyle={{ backgroundColor: "rgba(0,0,0,0.8)", border: "1px solid rgba(0,255,255,0.3)" }} />
                      <Legend />
                      <Line type="monotone" dataKey="accuracy" stroke="rgba(0, 255, 255, 1)" strokeWidth={2} />
                      <Line type="monotone" dataKey="precision" stroke="rgba(168, 85, 247, 1)" strokeWidth={2} />
                      <Line type="monotone" dataKey="recall" stroke="rgba(239, 68, 68, 1)" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Per-Sound Type Performance */}
              <Card className="glass border-accent/20">
                <CardHeader>
                  <CardTitle>Detection Accuracy by Sound Type</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={performanceData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                      <XAxis dataKey="soundType" stroke="rgba(255,255,255,0.3)" />
                      <YAxis stroke="rgba(255,255,255,0.3)" domain={[85, 100]} />
                      <Tooltip contentStyle={{ backgroundColor: "rgba(0,0,0,0.8)", border: "1px solid rgba(0,255,255,0.3)" }} />
                      <Bar dataKey="accuracy" fill="rgba(0, 255, 255, 0.7)" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Detection Statistics */}
              <Card className="glass border-accent/20">
                <CardHeader>
                  <CardTitle>Detection Statistics</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {performanceData.map(perf => (
                    <div key={perf.soundType} className="glass border-border p-3 rounded-lg">
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-semibold text-sm">{perf.soundType}</span>
                        <span className="text-sm text-accent font-bold">{perf.accuracy.toFixed(1)}%</span>
                      </div>
                      <div className="flex gap-2 text-xs text-muted-foreground">
                        <span>✓ {perf.detections} correct</span>
                        <span>✗ {perf.falsePositives} false</span>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Model Comparison */}
              <Card className="glass border-accent/20">
                <CardHeader>
                  <CardTitle>Latest Model Metrics</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {selectedModel && (
                    <>
                      <div>
                        <div className="flex justify-between mb-2">
                          <span className="text-sm text-muted-foreground">Accuracy</span>
                          <span className="text-sm font-bold text-accent">{selectedModel.accuracy.toFixed(1)}%</span>
                        </div>
                        <div className="w-full h-2 bg-border rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-cyan-500 to-accent"
                            style={{ width: `${selectedModel.accuracy}%` }}
                          ></div>
                        </div>
                      </div>

                      <div>
                        <div className="flex justify-between mb-2">
                          <span className="text-sm text-muted-foreground">Precision</span>
                          <span className="text-sm font-bold text-cyan-400">{selectedModel.precision.toFixed(1)}%</span>
                        </div>
                        <div className="w-full h-2 bg-border rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-cyan-500 to-blue-500"
                            style={{ width: `${selectedModel.precision}%` }}
                          ></div>
                        </div>
                      </div>

                      <div>
                        <div className="flex justify-between mb-2">
                          <span className="text-sm text-muted-foreground">Recall</span>
                          <span className="text-sm font-bold text-purple-400">{selectedModel.recall.toFixed(1)}%</span>
                        </div>
                        <div className="w-full h-2 bg-border rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-purple-500 to-pink-500"
                            style={{ width: `${selectedModel.recall}%` }}
                          ></div>
                        </div>
                      </div>

                      <div>
                        <div className="flex justify-between mb-2">
                          <span className="text-sm text-muted-foreground">F1 Score</span>
                          <span className="text-sm font-bold text-green-400">{selectedModel.f1Score.toFixed(1)}%</span>
                        </div>
                        <div className="w-full h-2 bg-border rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-green-500 to-emerald-500"
                            style={{ width: `${selectedModel.f1Score}%` }}
                          ></div>
                        </div>
                      </div>
                    </>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
