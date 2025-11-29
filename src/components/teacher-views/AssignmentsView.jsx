import { Card } from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { Plus, Edit, Eye, Trash2, Clock } from "lucide-react";

 

export function AssignmentsView({ teacherData }) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2>Assignments & Quizzes</h2>
          <p className="text-muted-foreground">Create and manage course assessments</p>
        </div>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Create Assignment
        </Button>
      </div>

      <Tabs defaultValue={teacherData.subjects[0].id} className="w-full">
        <TabsList>
          {teacherData.subjects.map((subject) => (
            <TabsTrigger key={subject.id} value={subject.id}>
              {subject.name.split(' ')[0]}
            </TabsTrigger>
          ))}
        </TabsList>

        {teacherData.subjects.map((subject) => (
          <TabsContent key={subject.id} value={subject.id} className="mt-4 space-y-4">
            <div className="grid md:grid-cols-3 gap-4">
              <Card className="p-4">
                <h4 className="mb-2">Total Assignments</h4>
                <div className="text-2xl">{subject.recentAssignments.length}</div>
              </Card>
              <Card className="p-4">
                <h4 className="mb-2">Pending Reviews</h4>
                <div className="text-2xl text-red-600">
                  {subject.recentAssignments.reduce((sum, a) => sum + a.pending, 0)}
                </div>
              </Card>
              <Card className="p-4">
                <h4 className="mb-2">Avg Submission Rate</h4>
                <div className="text-2xl">
                  {Math.round((subject.recentAssignments.reduce((sum, a) => sum + a.submitted, 0) / 
                    (subject.recentAssignments.length * subject.enrolledStudents)) * 100)}%
                </div>
              </Card>
            </div>

            <Card className="p-4">
              <h3 className="mb-4">Assignment List</h3>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Assignment</TableHead>
                    <TableHead>Submitted</TableHead>
                    <TableHead>Pending</TableHead>
                    <TableHead>Avg Score</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {subject.recentAssignments.map((assignment, idx) => (
                    <TableRow key={idx}>
                      <TableCell>{assignment.name}</TableCell>
                      <TableCell>{assignment.submitted}/{subject.enrolledStudents}</TableCell>
                      <TableCell>
                        <Badge variant={assignment.pending > 0 ? "destructive" : "secondary"}>
                          {assignment.pending}
                        </Badge>
                      </TableCell>
                      <TableCell>{assignment.avgScore}%</TableCell>
                      <TableCell>
                        <Badge className={assignment.pending > 0 ? "bg-yellow-100 text-yellow-800" : "bg-green-100 text-green-800"}>
                          {assignment.pending > 0 ? "In Progress" : "Completed"}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-1">
                          <Button variant="ghost" size="sm"><Eye className="w-4 h-4" /></Button>
                          <Button variant="ghost" size="sm"><Edit className="w-4 h-4" /></Button>
                          <Button variant="ghost" size="sm"><Trash2 className="w-4 h-4" /></Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Card>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
