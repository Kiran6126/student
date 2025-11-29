import { Card } from "../ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { Badge } from "../ui/badge";
import { Progress } from "../ui/progress";

export function GradesView({ studentData }) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2>Gradebook</h2>
          <p className="text-muted-foreground">View your grades across all courses</p>
        </div>
        <Card className="p-4">
          <div className="text-sm text-muted-foreground">Current CGPA</div>
          <div className="text-3xl">{studentData.currentGPA}</div>
        </Card>
      </div>

      {/* Overall Performance Summary */}
      <Card className="p-4">
        <h3 className="mb-4">Performance Summary</h3>
        <div className="grid md:grid-cols-4 gap-4">
          <div className="text-center p-3 bg-blue-900/20 rounded">
            <div className="text-2xl">{Math.round(studentData.subjects.reduce((sum, s) => sum + s.grade, 0) / studentData.subjects.length)}%</div>
            <div className="text-sm text-muted-foreground">Average Grade</div>
          </div>
          <div className="text-center p-3 bg-green-900/20 rounded">
            <div className="text-2xl">{studentData.subjects.filter((s) => s.grade >= 80).length}</div>
            <div className="text-sm text-muted-foreground">Courses Above 80%</div>
          </div>
          <div className="text-center p-3 bg-purple-900/20 rounded">
            <div className="text-2xl">{studentData.completedCredits}</div>
            <div className="text-sm text-muted-foreground">Credits Completed</div>
          </div>
          <div className="text-center p-3 bg-yellow-900/20 rounded">
            <div className="text-2xl">{studentData.totalCredits - studentData.completedCredits}</div>
            <div className="text-sm text-muted-foreground">Credits Remaining</div>
          </div>
        </div>
      </Card>

      {/* Detailed Grades Table */}
      <Card className="p-4">
        <h3 className="mb-4">Course Grades</h3>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Course Code</TableHead>
              <TableHead>Course Name</TableHead>
              <TableHead>Instructor</TableHead>
              <TableHead>Grade</TableHead>
              <TableHead>Progress</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {studentData.subjects.map((subject) => (
              <TableRow key={subject.id}>
                <TableCell>{subject.id}</TableCell>
                <TableCell>{subject.name}</TableCell>
                <TableCell>{subject.instructor}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <span>{subject.grade}%</span>
                    <Progress value={subject.grade} className="w-24" />
                  </div>
                </TableCell>
                <TableCell>{subject.progress}%</TableCell>
                <TableCell>
                  <Badge className={
                    subject.status === 'exemplary' ? 'bg-green-100 text-green-800' :
                    subject.status === 'proficient' ? 'bg-blue-100 text-blue-800' :
                    'bg-yellow-100 text-yellow-800'
                  }>
                    {subject.status}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>

      {/* Learning Outcomes Breakdown */}
      <Card className="p-4">
        <h3 className="mb-4">Learning Outcomes by Course</h3>
        <div className="space-y-6">
          {studentData.subjects.map((subject) => (
            <div key={subject.id}>
              <h4 className="mb-3">{subject.name}</h4>
              <div className="grid md:grid-cols-2 gap-3">
                {subject.outcomes.map((outcome, index) => (
                  <div key={index} className="p-3 bg-muted/30 rounded">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm">{outcome.name}</span>
                      <span>{outcome.score}%</span>
                    </div>
                    <Progress value={outcome.progress} className="h-2" />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
