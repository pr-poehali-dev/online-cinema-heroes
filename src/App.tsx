import { useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import ChannelsPage from "./pages/ChannelsPage";
import CartoonPage from "./pages/CartoonPage";
import SeriesPage from "./pages/SeriesPage";

const queryClient = new QueryClient();

export type Page = "home" | "channels" | "cartoons" | "series";

export interface NavState {
  page: Page;
  cartoonId?: string;
}

const AppInner = () => {
  const [nav, setNav] = useState<NavState>({ page: "home" });
  const navigate = (state: NavState) => setNav(state);

  return (
    <div className="min-h-screen stars-bg font-nunito">
      <Navbar currentPage={nav.page} navigate={navigate} />
      <main>
        {nav.page === "home" && <HomePage navigate={navigate} />}
        {nav.page === "channels" && <ChannelsPage navigate={navigate} />}
        {nav.page === "cartoons" && <CartoonPage navigate={navigate} />}
        {nav.page === "series" && nav.cartoonId && (
          <SeriesPage cartoonId={nav.cartoonId} navigate={navigate} />
        )}
      </main>
    </div>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <AppInner />
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
