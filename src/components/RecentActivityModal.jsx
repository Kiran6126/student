import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { Badge } from "./ui/badge";
import { Calendar, Clock, FileText, CheckCircle, AlertCircle } from "lucide-react";



const getActivityIcon = (status) => {
  switch (status) {
    case "graded": return CheckCircle;
    case "submitted": return FileText;
    case "pending": return AlertCircle;
    case "in-progress": return Clock;
    default: return FileText;
  }
};

const getStatusColor = (status) => {
  switch (status) {
    case "graded": return "bg-green-100 text-green-800";
    case "submitted": return "bg-blue-100 text-blue-800";
    case "pending": return "bg-yellow-100 text-yellow-800";
    case "in-progress": return "bg-purple-100 text-purple-800";
    default: return "bg-gray-100 text-gray-800";
  }
};

export function RecentActivityModal({ isOpen, onClose, courses }) {
  // Flatten all assignments from all courses and sort by date
  const allActivities = courses.flatMap(course => 
  course.recentAssignments.map((assignment) => ({
      ...assignment,
      courseName: course.name,
      courseId: course.id
    }))
  ).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Recent Activity</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          {allActivities.map((activity, index) => {
            const IconComponent = getActivityIcon(activity.status);
            return (
              <div key={index} className="flex items-start gap-3 p-3 border rounded-lg">
                <div className="p-1.5 bg-muted rounded-full">
                  <IconComponent className="w-4 h-4" />
                </div>
                
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-1">
                    <div>
                      <h5 className="text-sm">{activity.name}</h5>
                      <p className="text-xs text-muted-foreground">{activity.courseName}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge className={getStatusColor(activity.status)} variant="secondary">
                        {activity.status}
                      </Badge>
                      {activity.score && (
                        <Badge variant="outline">{activity.score}%</Badge>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {activity.date}
                    </div>
                    <div className="flex items-center gap-1">
                      <FileText className="w-3 h-3" />
                      {activity.courseId}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
          
          {allActivities.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              <Clock className="w-8 h-8 mx-auto mb-2 opacity-50" />
              <p>No recent activity found</p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}