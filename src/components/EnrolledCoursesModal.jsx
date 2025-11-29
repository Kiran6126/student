import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Progress } from "./ui/progress";
import { Database, Monitor, Code, BarChart3, Network } from "lucide-react";

const getStatusColor = (status) => {
  switch (status) {
    case "exemplary": return "bg-green-100 text-green-800";
    case "proficient": return "bg-blue-100 text-blue-800";
    case "developing": return "bg-yellow-100 text-yellow-800";
    case "beginning": return "bg-red-100 text-red-800";
    default: return "bg-gray-100 text-gray-800";
  }
};

const getCourseIcon = (courseId) => {
  const iconMap = {
    "CS301": Database,
    "CS302": Monitor,
    "CS303": Code,
    "CS304": BarChart3,
    "CS305": Network
  };
  return iconMap[courseId] || Code;
};

export function EnrolledCoursesModal({ isOpen, onClose, courses }) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Enrolled Courses</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="grid gap-4">
            {courses.map((course) => {
              const IconComponent = getCourseIcon(course.id);
              return (
                <Card key={course.id} className="p-4">
                  <div className="flex items-start gap-4">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <IconComponent className="w-6 h-6 text-primary" />
                    </div>
                    
                    <div className="flex-1 space-y-3">
                      <div className="flex items-start justify-between">
                        <div>
                          <h4>{course.name}</h4>
                          <p className="text-sm text-muted-foreground">
                            Instructor: {course.instructor} • Course ID: {course.id}
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge className={getStatusColor(course.status)}>
                            {course.status}
                          </Badge>
                          <div className="text-right text-sm">
                            <div>Grade: {course.grade}%</div>
                            <div className="text-muted-foreground">Progress: {course.progress}%</div>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Course Progress</span>
                          <span>{course.progress}%</span>
                        </div>
                        <Progress value={course.progress} />
                      </div>

                      <div className="grid md:grid-cols-2 gap-2">
                        {course.outcomes.map((outcome, index) => (
                          <div key={index} className="text-sm">
                            <div className="flex justify-between mb-1">
                              <span>{outcome.name}</span>
                              <span>{outcome.score}%</span>
                            </div>
                            <Progress value={outcome.progress} className="h-1" />
                          </div>
                        ))}
                      </div>

                      <div className="pt-2 border-t">
                        <div className="text-sm">
                          <span className="text-muted-foreground">Recent Assignments: </span>
                          {course.recentAssignments.filter((a) => a.score).length} completed, {" "}
                          {course.recentAssignments.filter((a) => !a.score).length} pending
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}