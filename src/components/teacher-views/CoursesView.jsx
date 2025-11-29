import { Card } from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Progress } from "../ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Users, TrendingUp, BookOpen, Settings, Eye } from "lucide-react";

export function CoursesView({ teacherData }) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2>My Courses</h2>
          <p className="text-muted-foreground">Manage your teaching courses for this semester</p>
        </div>
        <Button>
          <BookOpen className="w-4 h-4 mr-2" />
          Create New Course
        </Button>
      </div>

      {/* Course Cards */}
      <div className="grid gap-6">
  {teacherData.subjects.map((subject, index) => (
          <Card key={index} className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3>{subject.name}</h3>
                  <Badge>Active</Badge>
                </div>
                <p className="text-sm text-muted-foreground">Course ID: {subject.id}</p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Settings className="w-4 h-4" />
                </Button>
                <Button variant="outline" size="sm">
                  <Eye className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Course Stats */}
            <div className="grid md:grid-cols-4 gap-4 mb-6">
              <div className="p-3 bg-blue-900/20 rounded">
                <div className="flex items-center gap-2 mb-1">
                  <Users className="w-4 h-4 text-blue-600" />
                  <span className="text-sm">Students</span>
                </div>
                <div className="text-2xl">{subject.enrolledStudents}</div>
              </div>
              <div className="p-3 bg-green-900/20 rounded">
                <div className="flex items-center gap-2 mb-1">
                  <TrendingUp className="w-4 h-4 text-green-600" />
                  <span className="text-sm">Completion</span>
                </div>
                <div className="text-2xl">{subject.completionRate}%</div>
              </div>
              <div className="p-3 bg-purple-900/20 rounded">
                <div className="flex items-center gap-2 mb-1">
                  <BookOpen className="w-4 h-4 text-purple-600" />
                  <span className="text-sm">Avg Grade</span>
                </div>
                <div className="text-2xl">{subject.avgGrade}%</div>
              </div>
              <div className="p-3 bg-yellow-900/20 rounded">
                <div className="flex items-center gap-2 mb-1">
                  <Settings className="w-4 h-4 text-yellow-600" />
                  <span className="text-sm">Assignments</span>
                </div>
                <div className="text-2xl">{subject.recentAssignments.length}</div>
              </div>
            </div>

            {/* Learning Outcomes Progress */}
            <div className="mb-4">
              <h4 className="mb-3">Learning Outcomes Progress</h4>
              <div className="grid md:grid-cols-2 gap-3">
                {subject.outcomes.map((outcome, oIndex) => (
                  <div key={oIndex} className="p-3 bg-muted/30 rounded">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm">{outcome.name}</span>
                      <span className="text-sm">{outcome.completion}%</span>
                    </div>
                    <Progress value={outcome.completion} className="h-2" />
                    <p className="text-xs text-muted-foreground mt-1">
                      Avg Score: {outcome.avgScore}%
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="flex gap-2">
              <Button variant="outline" size="sm">View Gradebook</Button>
              <Button variant="outline" size="sm">Course Materials</Button>
              <Button variant="outline" size="sm">Student List</Button>
              <Button variant="outline" size="sm">Announcements</Button>
            </div>
          </Card>
        ))}
      </div>

      {/* Course Settings */}
      <Card className="p-6">
        <h3 className="mb-4">Course Management Tools</h3>
        <div className="grid md:grid-cols-3 gap-4">
          <Button variant="outline" className="h-24 flex flex-col gap-2">
            <BookOpen className="w-6 h-6" />
            <span>Manage Syllabus</span>
          </Button>
          <Button variant="outline" className="h-24 flex flex-col gap-2">
            <Users className="w-6 h-6" />
            <span>Student Analytics</span>
          </Button>
          <Button variant="outline" className="h-24 flex flex-col gap-2">
            <Settings className="w-6 h-6" />
            <span>Course Settings</span>
          </Button>
        </div>
      </Card>
    </div>
  );
}
