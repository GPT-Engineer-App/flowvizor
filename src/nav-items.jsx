import { BarChart2, Database, FileText, Settings as SettingsIcon, Users, Activity } from "lucide-react";
import Index from "./pages/Index.jsx";
import DataSources from "./pages/DataSources.jsx";
import DataModels from "./pages/DataModels.jsx";
import Monitoring from "./pages/Monitoring.jsx";
import Collaboration from "./pages/Collaboration.jsx";
import SettingsPage from "./pages/Settings.jsx";

/**
 * Central place for defining the navigation items. Used for navigation components and routing.
 */
export const navItems = [
  {
    title: "Workflow Visualization",
    to: "/",
    icon: <BarChart2 className="h-4 w-4" />,
    page: <Index />,
  },
  {
    title: "Data Sources",
    to: "/data-sources",
    icon: <Database className="h-4 w-4" />,
    page: <DataSources />,
  },
  {
    title: "Data Models",
    to: "/data-models",
    icon: <FileText className="h-4 w-4" />,
    page: <DataModels />,
  },
  {
    title: "Monitoring",
    to: "/monitoring",
    icon: <Activity className="h-4 w-4" />,
    page: <Monitoring />,
  },
  {
    title: "Team Collaboration",
    to: "/collaboration",
    icon: <Users className="h-4 w-4" />,
    page: <Collaboration />,
  },
  {
    title: "Settings",
    to: "/settings",
    icon: <SettingsIcon className="h-4 w-4" />,
    page: <SettingsPage />,
  },
];
