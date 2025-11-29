import { 
  Home, 
  BookOpen, 
  FileEdit, 
  GraduationCap, 
  ClipboardList, 
  Users, 
  Bell, 
  MessageSquare, 
  BarChart3, 
  Calendar, 
  FolderOpen, 
  User
} from "lucide-react";
import { Button } from "./ui/button";

export function TeacherNavMenu({ currentView, onViewChange }) {
  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: Home },
    { id: "courses", label: "My Courses", icon: BookOpen },
    { id: "builder", label: "Course Builder", icon: FileEdit },
    { id: "gradebook", label: "Gradebook", icon: GraduationCap },
    { id: "assignments", label: "Assignments", icon: ClipboardList },
    { id: "students", label: "Students", icon: Users },
    { id: "announcements", label: "Announcements", icon: Bell },
    { id: "messages", label: "Messages", icon: MessageSquare },
    { id: "analytics", label: "Reports", icon: BarChart3 },
    { id: "calendar", label: "Calendar", icon: Calendar },
    { id: "resources", label: "Resources", icon: FolderOpen },
    { id: "profile", label: "Profile", icon: User }
  ];

  return (
    <div className="border-b border-border bg-card/50">
      <div className="container mx-auto px-4">
        <div className="flex items-center gap-2 overflow-x-auto py-2 scrollbar-hide">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <Button
                key={item.id}
                variant={currentView === item.id ? "default" : "ghost"}
                size="sm"
                onClick={() => onViewChange(item.id)}
                className="flex items-center gap-2 whitespace-nowrap"
              >
                <Icon className="w-4 h-4" />
                <span className="hidden sm:inline">{item.label}</span>
              </Button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
