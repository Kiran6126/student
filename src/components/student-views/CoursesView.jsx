import { Card } from "../ui/card";
import { Progress } from "../ui/progress";
import { Badge } from "../ui/badge";

const getStatusColor = (status) => {
  switch (status) {
    case "exemplary": return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
    case "proficient": return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300";
    case "developing": return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300";
    case "beginning": return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300";
    default: return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300";
  }
};

export function CoursesView({ studentData }) {
  return (
    <div className="space-y-6">
      <div>
        <h2>My Courses</h2>
        <p className="text-muted-foreground">View all your enrolled courses and their progress</p>
      </div>

      <div className="grid gap-6">
        {studentData.subjects.map((subject) => (
          <Card key={subject.id} className="p-4">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h4>{subject.name}</h4>
                <p className="text-sm text-muted-foreground mt-1">Instructor: {subject.instructor}</p>
              </div>
              <div className="flex items-center gap-2">
                <Badge className={getStatusColor(subject.status)}>
                  {subject.status}
                </Badge>
                <div className="text-right">
                  <div className="text-sm">Grade: {subject.grade}%</div>
                  <div className="text-xs text-muted-foreground">Progress: {subject.progress}%</div>
                </div>
              </div>
            </div>

            <div className="mb-4">
              <Progress value={subject.progress} className="mb-2" />
            </div>

            {/* Learning Outcomes for this subject */}
            <div className="mb-4">
              <h5 className="mb-3">Learning Outcomes</h5>
              <div className="grid md:grid-cols-2 gap-3">
                {subject.outcomes.map((outcome, index) => (
                  <div key={index} className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span>{outcome.name}</span>
                      <span>{outcome.score}%</span>
                    </div>
                    <Progress value={outcome.progress} className="h-2" />
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Assignments */}
            <div>
              <h5 className="mb-2">Recent Assignments</h5>
              <div className="space-y-2">
                {subject.recentAssignments.map((assignment, index) => (
                  <div key={index} className="flex justify-between items-center text-sm">
                    <span>{assignment.name}</span>
                    <div className="flex items-center gap-2">
                      {assignment.score ? (
                        <Badge variant="secondary">{assignment.score}%</Badge>
                      ) : (
                        <Badge variant="outline">{assignment.status}</Badge>
                      )}
                      <span className="text-muted-foreground">{assignment.date}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
