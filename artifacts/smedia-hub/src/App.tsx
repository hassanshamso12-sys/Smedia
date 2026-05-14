import { Switch, Route, Router as WouterRouter } from "wouter";
import DynamicTheme from "@/components/UI/DynamicTheme";
import LandingPage from "@/pages/LandingPage";
import AboutPage from "@/pages/AboutPage";
import ContactPage from "@/pages/ContactPage";
import ServicePage from "@/pages/ServicePage";
import DashboardPage from "@/pages/DashboardPage";
import SupportPage from "@/pages/SupportPage";
import SignupPage from "@/pages/SignupPage";
import NotFound from "@/pages/not-found";
import { AuthProvider } from "@/lib/context/AuthContext";

function Router() {
  return (
    <Switch>
      <Route path="/" component={LandingPage} />
      <Route path="/about" component={AboutPage} />
      <Route path="/contact" component={ContactPage} />
      <Route path="/services/:slug" component={ServicePage} />
      <Route path="/dashboard" component={DashboardPage} />
      <Route path="/support" component={SupportPage} />
      <Route path="/signup" component={SignupPage} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <AuthProvider>
      <DynamicTheme />
      <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
        <Router />
      </WouterRouter>
    </AuthProvider>
  );
}

export default App;
