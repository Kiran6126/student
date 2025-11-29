import { useState, useEffect } from "react";
import { Card } from "./ui/card";
import { TeacherNavMenu } from "./TeacherNavMenu";
import { TeacherDashboardView } from "./teacher-views/DashboardView";
import { CoursesView } from "./teacher-views/CoursesView";
import { CourseBuilderView } from "./teacher-views/CourseBuilderView";
import { GradebookView } from "./teacher-views/GradebookView";
import { AssignmentsView } from "./teacher-views/AssignmentsView";
import { AnnouncementsView } from "./teacher-views/AnnouncementsView";
import { MessagesView } from "./teacher-views/MessagesView";
import { ReportsView } from "./teacher-views/ReportsView";
import { CalendarView } from "./teacher-views/CalendarView";
import { ResourcesView } from "./teacher-views/ResourcesView";
import { StudentsListView } from "./StudentsListView";
import { TotalStudentsModal } from "./TotalStudentsModal";
import { PendingReviewsModal } from "./PendingReviewsModal";
import { AvgCompletionModal } from "./AvgCompletionModal";
import { generateTeacherData } from "../data/teacherData";

export function LecturerDashboard({ user }) {
  const [showTotalStudents, setShowTotalStudents] = useState(false);
  const [showPendingReviews, setShowPendingReviews] = useState(false);
  const [showAvgCompletion, setShowAvgCompletion] = useState(false);
  const [currentView, setCurrentView] = useState("dashboard");
  const [teacherData, setTeacherData] = useState(null);

  useEffect(() => {
    // Generate unique teacher data based on user ID and specialization
    const data = generateTeacherData(user.id, user.name, user.specialization || ["Database Management System"]);
    setTeacherData(data);
  }, [user.id, user.name, user.specialization]);

  if (!teacherData) {
    return <div className="p-6">Loading...</div>;
  }

  const renderView = () => {
    switch (currentView) {
      case "dashboard":
        return (
          <TeacherDashboardView
            teacherData={teacherData}
            onTotalStudentsClick={() => setShowTotalStudents(true)}
            onPendingReviewsClick={() => setShowPendingReviews(true)}
            onAvgCompletionClick={() => setShowAvgCompletion(true)}
          />
        );
      case "students":
        return <StudentsListView />;
      case "courses":
        return <CoursesView teacherData={teacherData} />;
      case "builder":
        return <CourseBuilderView teacherData={teacherData} />;
      case "gradebook":
        return <GradebookView teacherData={teacherData} />;
      case "assignments":
        return <AssignmentsView teacherData={teacherData} />;
      case "announcements":
        return <AnnouncementsView teacherData={teacherData} />;
      case "messages":
        return <MessagesView teacherData={teacherData} />;
      case "analytics":
        return <ReportsView teacherData={teacherData} />;
      case "calendar":
        return <CalendarView teacherData={teacherData} />;
      case "resources":
        return <ResourcesView teacherData={teacherData} />;
      case "profile":
        return (
          <div className="space-y-4">
            <Card className="p-4">
              <h2>Profile Settings</h2>
              <p className="text-muted-foreground">Manage your profile and preferences</p>
              <div className="mt-4 space-y-2">
                <div><strong>Name:</strong> {teacherData.lecturer.name}</div>
                <div><strong>Teacher ID:</strong> {teacherData.lecturer.id}</div>
                <div><strong>Department:</strong> {teacherData.lecturer.department}</div>
                <div><strong>Specialization:</strong> {teacherData.lecturer.courses.join(", ")}</div>
              </div>
            </Card>
          </div>
        );
      default:
        return (
          <TeacherDashboardView
            teacherData={teacherData}
            onTotalStudentsClick={() => setShowTotalStudents(true)}
            onPendingReviewsClick={() => setShowPendingReviews(true)}
            onAvgCompletionClick={() => setShowAvgCompletion(true)}
          />
        );
    }
  };

  return (
    <>
      <TeacherNavMenu currentView={currentView} onViewChange={setCurrentView} />
      <div className="p-6">
        {renderView()}

        {/* Modals */}
        <TotalStudentsModal
          isOpen={showTotalStudents}
          onClose={() => setShowTotalStudents(false)}
          subjects={teacherData.subjects}
        />

        <PendingReviewsModal
          isOpen={showPendingReviews}
          onClose={() => setShowPendingReviews(false)}
          subjects={teacherData.subjects}
        />

        <AvgCompletionModal
          isOpen={showAvgCompletion}
          onClose={() => setShowAvgCompletion(false)}
          subjects={teacherData.subjects}
        />
      </div>
    </>
  );
}