import { Switch, Route, Router as WouterRouter } from "wouter";
import DynamicTheme from "@/components/UI/DynamicTheme";
import LandingPage from "@/pages/LandingPage";
import AboutPage from "@/pages/AboutPage";
import DashboardPage from "@/pages/DashboardPage";
import SupportPage from "@/pages/SupportPage";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={LandingPage} />
      <Route path="/about" component={AboutPage} />
      <Route path="/dashboard" component={DashboardPage} />
      <Route path="/support" component={SupportPage} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <>
      <DynamicTheme />
      <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
        <Router />
      </WouterRouter>
    </>
  );
}

export default App;
