import { useState } from "react";
import { Button } from "./components/ui/button";
import { LoginPage } from "./components/LoginPage";
import { StudentDashboard } from "./components/StudentDashboard";
import { LecturerDashboard } from "./components/LecturerDashboard";
import { AdminDashboard } from "./components/AdminDashboard";
import { GraduationCap, LogOut } from "lucide-react";

export default function App() {
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const raw = localStorage.getItem("currentUser");
      return raw ? JSON.parse(raw) : null;
    } catch (e) {
      return null;
    }
  });

  const handleLogin = (userType, userData, remember = false) => {
    const user = {
      id: userData.id,
      name: userData.name,
      email: userData.email,
      type: userType,
      specialization: userData.specialization
    };

    setCurrentUser(user);
    try {
      if (remember) {
        localStorage.setItem("currentUser", JSON.stringify(user));
      } else {
        localStorage.removeItem("currentUser");
      }
    } catch (e) {
      // ignore storage errors
    }
  };

  const handleLogout = () => {
    setCurrentUser(null);
    try {
      localStorage.removeItem("currentUser");
    } catch (e) {
      // ignore
    }
  };

  // Show login page if no user is logged in
  if (!currentUser) {
    return <LoginPage onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation Header */}
      <div className="border-b bg-card border-border">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <GraduationCap className="w-6 h-6 text-primary" />
              <span className="text-lg">OutcomeTracker</span>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-sm">
                <span className="text-muted-foreground">Welcome, </span>
                <span>{currentUser.name}</span>
                <span className="text-muted-foreground"> ({currentUser.type})</span>
              </div>
              <Button variant="outline" size="sm" onClick={handleLogout}>
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div>
        {currentUser.type === 'student' && <StudentDashboard user={currentUser} />}
        {currentUser.type === 'lecturer' && <LecturerDashboard user={currentUser} />}
        {currentUser.type === 'admin' && <AdminDashboard />}
      </div>
    </div>
  );
}