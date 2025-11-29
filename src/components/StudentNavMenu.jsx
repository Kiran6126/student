import { useState } from "react";
import { 
  Home, 
  BookOpen, 
  GraduationCap, 
  Calendar, 
  ClipboardList, 
  MessageSquare, 
  HelpCircle, 
  User,
  ChevronDown
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";

export function StudentNavMenu({ currentView, onViewChange }) {
  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: Home },
    { id: "courses", label: "My Courses", icon: BookOpen },
    { id: "grades", label: "Grades", icon: GraduationCap },
    { id: "calendar", label: "Calendar", icon: Calendar },
    { id: "assignments", label: "Assignments", icon: ClipboardList },
    { id: "messages", label: "Messages", icon: MessageSquare },
    { id: "help", label: "Help", icon: HelpCircle },
    { id: "profile", label: "Profile", icon: User }
  ];

  return (
    <div className="border-b border-border bg-card/50">
      <div className="container mx-auto px-4">
        <div className="flex items-center gap-2 overflow-x-auto py-2">
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
