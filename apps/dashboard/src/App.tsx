import React, { useState } from "react";
import { motion } from "framer-motion";
import { Home, BarChart2, FileText, Users, Settings } from "lucide-react";
import AnalyticsDashboard from "./components/AnalyticsDashboard";

interface SidebarProps {
  activeView: string;
  onViewChange: (view: string) => void;
}

const EnhancedSidebar: React.FC<SidebarProps> = ({ activeView, onViewChange }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const menuItems = [
    { id: "overview", label: "Overview", icon: <Home size={20} /> },
    { id: "analytics", label: "Analytics", icon: <BarChart2 size={20} /> },
    { id: "reports", label: "Reports", icon: <FileText size={20} /> },
    { id: "users", label: "Users", icon: <Users size={20} /> },
    { id: "settings", label: "Settings", icon: <Settings size={20} /> },
  ];

  return (
    <motion.aside
      animate={{ width: isCollapsed ? 90 : 260 }}
      transition={{ type: "spring", stiffness: 220, damping: 26 }}
      className="relative h-full bg-slate-950/70 backdrop-blur-xl border-r border-slate-800 flex flex-col shadow-xl"
    >
      <div className="flex items-center gap-3 px-6 py-5 border-b border-slate-800">
        <motion.div
          whileHover={{ rotate: 10 }}
          className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center shadow-lg"
        >
          <span className="text-white font-extrabold text-lg">PG</span>
        </motion.div>

        {!isCollapsed && (
          <div className="overflow-hidden">
            <h1 className="text-white font-semibold text-lg tracking-wide">PulseGrid</h1>
            <p className="text-slate-400 text-xs">Analytics Platform</p>
          </div>
        )}
      </div>

      <nav className="flex-1 px-3 py-4 overflow-y-auto scrollbar-thin scrollbar-thumb-slate-700/40 scrollbar-track-transparent">
        <ul className="space-y-2">
          {menuItems.map((item) => {
            const isActive = item.id === activeView;
            return (
              <motion.li key={item.id} whileHover={{ x: 4 }}>
                <button
                  onClick={() => onViewChange(item.id)}
                  className={`relative w-full flex items-center gap-3 px-3 py-3 rounded-lg transition-all
                    ${isActive
                      ? "bg-gradient-to-r from-blue-600/70 to-purple-700/70 text-white shadow-md"
                      : "text-slate-300 hover:bg-slate-800/70 hover:text-white"
                    }`}
                >
                  <span className="flex-shrink-0">{item.icon}</span>
                  {!isCollapsed && (
                    <span className="flex-1 text-left text-sm font-medium tracking-wide">
                      {item.label}
                    </span>
                  )}
                  {isActive && (
                    <motion.div
                      layoutId="activeIndicator"
                      className="absolute left-0 top-0 bottom-0 w-1.5 bg-gradient-to-b from-blue-400 to-purple-400 rounded-r-md"
                    />
                  )}
                </button>
              </motion.li>
            );
          })}
        </ul>
      </nav>

      <div className="border-t border-slate-800 px-3 py-4">
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="w-full flex items-center justify-center gap-2 bg-slate-800/60 hover:bg-slate-700/70 text-slate-300 rounded-lg py-2 transition-all"
        >
          {isCollapsed ? "»" : "«"}
        </button>
      </div>
    </motion.aside>
  );
};

const App: React.FC = () => {
  const [activeView, setActiveView] = useState<string>("overview");

  return (
    <div className="flex h-screen bg-slate-950 overflow-hidden">
      <EnhancedSidebar activeView={activeView} onViewChange={setActiveView} />

      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top bar placeholder (optional) */}
        <div className="bg-white/5 border-b border-slate-800 px-6 py-4">
          <h2 className="text-white text-lg font-semibold">
            {activeView === "overview" ? "Dashboard Overview" : "Advanced Analytics"}
          </h2>
          <p className="text-slate-400 text-sm">
            {activeView === "overview" ? "Real-time insights and performance metrics" : "Deep dive into your analytics data"}
          </p>
        </div>

        {/* Main content */}
        <div className="flex-1 overflow-auto">
          {/* For now, show the same dashboard on both tabs; swap if you add more views */}
          <AnalyticsDashboard />
        </div>
      </div>
    </div>
  );
};

export default App;
