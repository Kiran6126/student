import { Card } from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Progress } from "../ui/progress";
import { Clock, Upload, FileText, CheckCircle } from "lucide-react";

export function AssignmentsView({ studentData }) {
  // Collect all assignments from all subjects
  const allAssignments = studentData.subjects.flatMap((subject) =>
    subject.recentAssignments.map((assignment) => ({
      ...assignment,
      courseName: subject.name,
      courseId: subject.id,
      instructor: subject.instructor
    }))
  );

  const pendingAssignments = allAssignments.filter((a) => a.status === 'pending');
  const inProgressAssignments = allAssignments.filter((a) => a.status === 'in-progress' || a.status === 'submitted');
  const gradedAssignments = allAssignments.filter((a) => a.status === 'graded');

  // Generate additional unique assignments based on student ID
  const seed = parseInt(studentData.id.slice(-3));
  const additionalAssignments = [
    {
      name: "Final Project Proposal",
      courseName: studentData.subjects[seed % studentData.subjects.length].name,
      date: "2024-02-05",
      status: "pending",
      points: 100,
      description: "Submit a detailed proposal for your final project"
    },
    {
      name: "Midterm Exam Preparation",
      courseName: studentData.subjects[(seed + 1) % studentData.subjects.length].name,
      date: "2024-02-01",
      status: "in-progress",
      points: 50,
      description: "Complete practice problems and review materials"
    },
    {
      name: "Code Review Assignment",
      courseName: studentData.subjects[(seed + 2) % studentData.subjects.length].name,
      date: "2024-01-28",
      status: "pending",
      points: 75,
      description: "Review and provide feedback on peer code submissions"
    }
  ];

  const getStatusIcon = (status) => {
    switch (status) {
      case "graded": return <CheckCircle className="w-4 h-4 text-green-600" />;
      case "submitted": return <FileText className="w-4 h-4 text-blue-600" />;
      case "in-progress": return <Upload className="w-4 h-4 text-yellow-600" />;
      default: return <Clock className="w-4 h-4 text-red-600" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "graded": return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
      case "submitted": return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300";
      case "in-progress": return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300";
      default: return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2>Assignments</h2>
          <p className="text-muted-foreground">Manage and track all your assignments</p>
        </div>
        <Button>
          <Upload className="w-4 h-4 mr-2" />
          Submit Assignment
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid md:grid-cols-4 gap-4">
        <Card className="p-4">
          <div className="flex items-center gap-2 mb-2">
            <Clock className="w-4 h-4 text-red-600" />
            <h3>Pending</h3>
          </div>
          <div className="text-2xl">{pendingAssignments.length + additionalAssignments.filter(a => a.status === 'pending').length}</div>
          <p className="text-sm text-muted-foreground">Due soon</p>
        </Card>

        <Card className="p-4">
          <div className="flex items-center gap-2 mb-2">
            <Upload className="w-4 h-4 text-yellow-600" />
            <h3>In Progress</h3>
          </div>
          <div className="text-2xl">{inProgressAssignments.length + additionalAssignments.filter(a => a.status === 'in-progress').length}</div>
          <p className="text-sm text-muted-foreground">Working on</p>
        </Card>

        <Card className="p-4">
          <div className="flex items-center gap-2 mb-2">
            <CheckCircle className="w-4 h-4 text-green-600" />
            <h3>Graded</h3>
          </div>
          <div className="text-2xl">{gradedAssignments.length}</div>
          <p className="text-sm text-muted-foreground">Completed</p>
        </Card>

        <Card className="p-4">
          <div className="flex items-center gap-2 mb-2">
            <FileText className="w-4 h-4 text-blue-600" />
            <h3>Avg Score</h3>
          </div>
          <div className="text-2xl">
            {Math.round(gradedAssignments.reduce((sum, a) => sum + (a.score || 0), 0) / (gradedAssignments.length || 1))}%
          </div>
          <p className="text-sm text-muted-foreground">Overall performance</p>
        </Card>
      </div>

      {/* Assignments Tabs */}
      <Tabs defaultValue="pending" className="w-full">
        <TabsList>
          <TabsTrigger value="pending">Pending ({pendingAssignments.length + 2})</TabsTrigger>
          <TabsTrigger value="progress">In Progress ({inProgressAssignments.length + 1})</TabsTrigger>
          <TabsTrigger value="graded">Graded ({gradedAssignments.length})</TabsTrigger>
          <TabsTrigger value="all">All Assignments</TabsTrigger>
        </TabsList>

        <TabsContent value="pending" className="mt-4">
          <Card className="p-4">
            <h3 className="mb-4">Pending Assignments</h3>
            <div className="space-y-3">
              {additionalAssignments.filter(a => a.status === 'pending').map((assignment, index) => (
                <div key={`add-pending-${index}`} className="p-4 bg-red-900/10 rounded-lg border border-red-900/30">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        {getStatusIcon(assignment.status)}
                        <h4>{assignment.name}</h4>
                      </div>
                      <p className="text-sm text-muted-foreground">{assignment.courseName}</p>
                      <p className="text-sm mt-2">{assignment.description}</p>
                    </div>
                    <Badge className={getStatusColor(assignment.status)}>{assignment.status}</Badge>
                  </div>
                  <div className="flex items-center justify-between mt-3">
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span>Due: {assignment.date}</span>
                      <span>Points: {assignment.points}</span>
                    </div>
                    <Button size="sm">Start Assignment</Button>
                  </div>
                </div>
              ))}
                {pendingAssignments.map((assignment, index) => (
                <div key={`pending-${index}`} className="p-4 bg-red-900/10 rounded-lg border border-red-900/30">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        {getStatusIcon(assignment.status)}
                        <h4>{assignment.name}</h4>
                      </div>
                      <p className="text-sm text-muted-foreground">{assignment.courseName}</p>
                    </div>
                    <Badge className={getStatusColor(assignment.status)}>{assignment.status}</Badge>
                  </div>
                  <div className="flex items-center justify-between mt-3">
                    <span className="text-sm text-muted-foreground">Due: {assignment.date}</span>
                    <Button size="sm">Start Assignment</Button>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="progress" className="mt-4">
          <Card className="p-4">
            <h3 className="mb-4">In Progress Assignments</h3>
            <div className="space-y-3">
              {additionalAssignments.filter(a => a.status === 'in-progress').map((assignment, index) => (
                <div key={`add-progress-${index}`} className="p-4 bg-yellow-900/10 rounded-lg border border-yellow-900/30">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        {getStatusIcon(assignment.status)}
                        <h4>{assignment.name}</h4>
                      </div>
                      <p className="text-sm text-muted-foreground">{assignment.courseName}</p>
                      <p className="text-sm mt-2">{assignment.description}</p>
                    </div>
                    <Badge className={getStatusColor(assignment.status)}>{assignment.status}</Badge>
                  </div>
                  <div className="mt-3">
                    <div className="flex justify-between text-sm mb-2">
                      <span>Progress</span>
                      <span>{50 + (seed % 30)}%</span>
                    </div>
                    <Progress value={50 + (seed % 30)} />
                  </div>
                  <div className="flex items-center justify-between mt-3">
                    <span className="text-sm text-muted-foreground">Due: {assignment.date}</span>
                    <Button size="sm">Continue</Button>
                  </div>
                </div>
              ))}
              {inProgressAssignments.map((assignment, index) => (
                <div key={`progress-${index}`} className="p-4 bg-yellow-900/10 rounded-lg border border-yellow-900/30">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        {getStatusIcon(assignment.status)}
                        <h4>{assignment.name}</h4>
                      </div>
                      <p className="text-sm text-muted-foreground">{assignment.courseName}</p>
                    </div>
                    <Badge className={getStatusColor(assignment.status)}>{assignment.status}</Badge>
                  </div>
                  <div className="flex items-center justify-between mt-3">
                    <span className="text-sm text-muted-foreground">Due: {assignment.date}</span>
                    <Button size="sm">Continue</Button>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="graded" className="mt-4">
          <Card className="p-4">
            <h3 className="mb-4">Graded Assignments</h3>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Assignment</TableHead>
                  <TableHead>Course</TableHead>
                  <TableHead>Date Submitted</TableHead>
                  <TableHead>Score</TableHead>
                  <TableHead>Feedback</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {gradedAssignments.map((assignment, index) => (
                  <TableRow key={index}>
                    <TableCell>{assignment.name}</TableCell>
                    <TableCell>{assignment.courseName}</TableCell>
                    <TableCell>{assignment.date}</TableCell>
                    <TableCell>
                      <Badge className={assignment.score >= 80 ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"}>
                        {assignment.score}%
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Button variant="ghost" size="sm">View</Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        </TabsContent>

        <TabsContent value="all" className="mt-4">
          <Card className="p-4">
            <h3 className="mb-4">All Assignments</h3>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Assignment</TableHead>
                  <TableHead>Course</TableHead>
                  <TableHead>Due Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Score</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {[...additionalAssignments, ...allAssignments].map((assignment, index) => (
                  <TableRow key={index}>
                    <TableCell>{assignment.name}</TableCell>
                    <TableCell>{assignment.courseName}</TableCell>
                    <TableCell>{assignment.date}</TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(assignment.status)}>{assignment.status}</Badge>
                    </TableCell>
                    <TableCell>
                      {assignment.score ? `${assignment.score}%` : '-'}
                    </TableCell>
                    <TableCell>
                      <Button variant="ghost" size="sm">View</Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
