import React from 'react';
import { Link } from 'react-router-dom';
import { 
  BarChart2, 
  Database, 
  FileText, 
  Settings, 
  Users, 
  Activity
} from 'lucide-react';

const sidebarItems = [
  { icon: BarChart2, label: 'Workflow Visualization', path: '/' },
  { icon: Database, label: 'Data Sources', path: '/data-sources' },
  { icon: FileText, label: 'Data Models', path: '/data-models' },
  { icon: Activity, label: 'Monitoring', path: '/monitoring' },
  { icon: Users, label: 'Team Collaboration', path: '/collaboration' },
  { icon: Settings, label: 'Settings', path: '/settings' },
];

const Sidebar = () => {
  return (
    <div className="bg-gray-800 text-white w-64 min-h-screen p-4">
      <h2 className="text-2xl font-bold mb-6">Data Workflow Tool</h2>
      <nav>
        <ul>
          {sidebarItems.map((item, index) => (
            <li key={index} className="mb-4">
              <Link to={item.path} className="flex items-center hover:text-gray-300">
                <item.icon className="mr-2 h-5 w-5" />
                <span>{item.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
