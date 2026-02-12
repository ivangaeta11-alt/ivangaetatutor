import React, { useState } from "react";
import Layout from "./layout/Layout";
import HomePage from "./pages/HomePage";
import ResourcesContainer from "./features/resources/ResourcesContainer";

/**
 * App
 *
 * Acts as:
 * - Application shell
 * - Manual router
 * - Admin authentication manager
 *
 * Does NOT handle:
 * - Data fetching for specific features
 */
const App: React.FC = () => {
  const [view, setView] = useState<
    "home" | "risorse" >("home");


const renderPage = () => {
  switch (view) {
    case "home":
      return (
        <HomePage
          onNavigateRisorse={() => setView("risorse")}
          onNavigateContact={() => {}}
        />
      );

    case "risorse":
      return (
        <ResourcesContainer
          onGoToContact={() => setView("home")}
        />
      );

    default:
      return null;
  }
};


  return (
    <Layout
      currentView={
        view === "admin" ? "home" : (view as any)
      }
      setView={(v) => setView(v as any)}
      onContact={() => {}}
    >
      {renderPage()}
    </Layout>
  );
};

export default App;