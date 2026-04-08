import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import Architecture from "./pages/Architecture";
import Dashboard from "./pages/Dashboard";
import ExplainableAI from "./pages/ExplainableAI";
import Simulation from "./pages/Simulation";
import Applications from "./pages/Applications";
import AdminPanel from "./pages/AdminPanel";
import Reports from "./pages/Reports";
import VoiceInput from "./pages/VoiceInput";
import SensorMap from "./pages/SensorMap";
import Notifications from "./pages/Notifications";
import ModelTraining from "./pages/ModelTraining";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/architecture" component={Architecture} />
      <Route path="/dashboard" component={Dashboard} />
      <Route path="/explainable-ai" component={ExplainableAI} />
      <Route path="/simulation" component={Simulation} />
      <Route path="/applications" component={Applications} />
      <Route path="/admin" component={AdminPanel} />
      <Route path="/reports" component={Reports} />
      <Route path="/voice-input" component={VoiceInput} />
      <Route path="/sensor-map" component={SensorMap} />
      <Route path="/notifications" component={Notifications} />
      <Route path="/model-training" component={ModelTraining} />
      <Route path="/404" component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider
        defaultTheme="dark"
      >
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
