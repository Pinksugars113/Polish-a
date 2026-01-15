import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Layout } from "@/components/Layout";
import NotFound from "@/pages/not-found";
import Collection from "@/pages/Collection";
import AddPolish from "@/pages/AddPolish";
import EditPolish from "@/pages/EditPolish";
import Match from "@/pages/Match";
import Settings from "@/pages/Settings";
import ManiHistory from "@/pages/ManiHistory";

function Router() {
  return (
    <Layout>
      <Switch>
        <Route path="/" component={Collection} />
        <Route path="/add" component={AddPolish} />
        <Route path="/edit/:id" component={EditPolish} />
        <Route path="/match" component={Match} />
        <Route path="/history" component={ManiHistory} />
        <Route path="/settings" component={Settings} />
        <Route component={NotFound} />
      </Switch>
    </Layout>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
