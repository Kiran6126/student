import { useState, useEffect } from "react";
import { StudentNavMenu } from "./StudentNavMenu";
import { DashboardView } from "./student-views/DashboardView";
import { CoursesView } from "./student-views/CoursesView";
import { GradesView } from "./student-views/GradesView";
import { CalendarView } from "./student-views/CalendarView";
import { AssignmentsView } from "./student-views/AssignmentsView";
import { MessagesView } from "./student-views/MessagesView";
import { HelpView } from "./student-views/HelpView";
import { EnrolledCoursesModal } from "./EnrolledCoursesModal";
import { RecentActivityModal } from "./RecentActivityModal";
import { Card } from "./ui/card";
import { generateStudentData } from "../data/studentData";

export function StudentDashboard({ user }) {
  const [showEnrolledCourses, setShowEnrolledCourses] = useState(false);
  const [showRecentActivity, setShowRecentActivity] = useState(false);
  const [currentView, setCurrentView] = useState("dashboard");
  const [studentData, setStudentData] = useState(null);

  useEffect(() => {
    // Generate unique student data based on user ID
    const data = generateStudentData(user.id, user.name);
    setStudentData(data);
  }, [user.id, user.name]);

  if (!studentData) {
    return <div className="p-6">Loading...</div>;
  }

  const renderView = () => {
    switch (currentView) {
      case "dashboard":
        return (
          <DashboardView
            studentData={studentData}
            onEnrolledCoursesClick={() => setShowEnrolledCourses(true)}
            onRecentActivityClick={() => setShowRecentActivity(true)}
          />
        );
      case "courses":
        return <CoursesView studentData={studentData} />;
      case "grades":
        return <GradesView studentData={studentData} />;
      case "calendar":
        return <CalendarView studentData={studentData} />;
      case "assignments":
        return <AssignmentsView studentData={studentData} />;
      case "messages":
        return <MessagesView studentData={studentData} />;
      case "help":
        return <HelpView studentData={studentData} />;
      case "profile":
        return (
          <div className="space-y-4">
            <Card className="p-4">
              <h2>Profile Settings</h2>
              <p className="text-muted-foreground">Manage your personal information and preferences</p>
              <div className="mt-4 space-y-2">
                <div><strong>Name:</strong> {studentData.name}</div>
                <div><strong>Student ID:</strong> {studentData.id}</div>
                <div><strong>Department:</strong> {studentData.department}</div>
                <div><strong>CGPA:</strong> {studentData.currentGPA}</div>
                <div><strong>Credits Completed:</strong> {studentData.completedCredits}/{studentData.totalCredits}</div>
              </div>
            </Card>
          </div>
        );
      default:
        return (
          <DashboardView
            studentData={studentData}
            onEnrolledCoursesClick={() => setShowEnrolledCourses(true)}
            onRecentActivityClick={() => setShowRecentActivity(true)}
          />
        );
    }
  };

  return (
    <>
      <StudentNavMenu currentView={currentView} onViewChange={setCurrentView} />
      <div className="p-6">
        {renderView()}

        {/* Modals */}
        <EnrolledCoursesModal
          isOpen={showEnrolledCourses}
          onClose={() => setShowEnrolledCourses(false)}
          courses={studentData.subjects}
        />

        <RecentActivityModal
          isOpen={showRecentActivity}
          onClose={() => setShowRecentActivity(false)}
          courses={studentData.subjects}
        />
      </div>
    </>
  );
}