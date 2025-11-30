import { useState, useEffect } from "react";
import { Button } from "./components/ui/button";
import { LoginPage } from "./components/LoginPage";
import { StudentDashboard } from "./components/StudentDashboard";
import { LecturerDashboard } from "./components/LecturerDashboard";
import { AdminDashboard } from "./components/AdminDashboard";
import { GraduationCap, LogOut } from "lucide-react";
import { getStudentById, getTeacherById } from "./data/storage";

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
    // Update address bar to include user id and dashboard route
    try {
      const newPath = `/${user.id}/dashboard`;
      window.history.replaceState({}, "", newPath);
    } catch (e) {
      // ignore
    }
  };

  const handleLogout = () => {
    setCurrentUser(null);
    try {
      localStorage.removeItem("currentUser");
    } catch (e) {
      // ignore
    }
    try {
      window.history.replaceState({}, "", "/");
    } catch (e) {}
  };

  // If app loads at /:id/dashboard, try to auto-select that user (no password required).
  // Allow path-based selection to override a persisted `currentUser` only when the
  // path id differs from the current user's id. This enables deep-linking to
  // another user's dashboard even when someone else was previously remembered.
  useEffect(() => {
    try {
      const parts = window.location.pathname.split("/").filter(Boolean);
      if (parts.length >= 2 && parts[1] === "dashboard") {
        const id = parts[0];
        // If we already have a current user matching this id, nothing to do.
        if (currentUser && currentUser.id === id) return;

        // try student first
        const student = getStudentById(id);
        if (student) {
          setCurrentUser({ id: student.id, name: student.name, email: student.email, type: "student" });
          return;
        }
        const teacher = getTeacherById(id);
        if (teacher) {
          setCurrentUser({ id: teacher.id, name: teacher.name, email: teacher.email, type: "lecturer", specialization: teacher.specialization });
          return;
        }
      }
    } catch (e) {
      // ignore
    }
  }, [currentUser]);

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