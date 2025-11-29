import { useState } from "react";
import { Card } from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { ResponsiveContainer, LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from "recharts";
import { Users, BookOpen, TrendingUp, AlertTriangle, Plus, Download, Database, Code, Monitor, BarChart3, Network } from "lucide-react";

const getCompletionColor = (rate) => {
  if (rate >= 85) return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
  if (rate >= 70) return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300";
  if (rate >= 60) return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300";
  return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300";
};

const iconMap = {
  "Database Management System": Database,
  "Front-end Development": Monitor,
  "Object-Oriented Programming": Code,
  "Data Visualization": BarChart3,
  "Computer Networks": Network
};

export function TeacherDashboardView({ teacherData, onTotalStudentsClick, onPendingReviewsClick, onAvgCompletionClick }) {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1>Welcome, {teacherData.lecturer.name}</h1>
          <p className="text-muted-foreground">{teacherData.lecturer.department} Department</p>
          <p className="text-sm text-muted-foreground">Teaching: {teacherData.lecturer.courses.join(", ")}</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export Reports
          </Button>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Create Assignment
          </Button>
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid md:grid-cols-4 gap-4">
        <Card className="p-4">
          <div className="flex items-center gap-2 mb-2">
            <BookOpen className="w-4 h-4 text-blue-600" />
            <h3>Total Courses</h3>
          </div>
          <div className="text-2xl">{teacherData.subjects.length}</div>
          <p className="text-sm text-muted-foreground">Active this semester</p>
        </Card>

        <Card className="p-4 cursor-pointer hover:bg-accent/50 transition-colors" onClick={onTotalStudentsClick}>
          <div className="flex items-center gap-2 mb-2">
            <Users className="w-4 h-4 text-green-600" />
            <h3>Total Students</h3>
          </div>
          <div className="text-2xl">
            {teacherData.subjects.reduce((sum, subject) => sum + subject.enrolledStudents, 0)}
          </div>
          <p className="text-sm text-muted-foreground">Across all courses</p>
        </Card>

        <Card className="p-4 cursor-pointer hover:bg-accent/50 transition-colors" onClick={onAvgCompletionClick}>
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="w-4 h-4 text-purple-600" />
            <h3>Avg Completion</h3>
          </div>
          <div className="text-2xl">
            {Math.round(teacherData.subjects.reduce((sum, subject) => sum + subject.completionRate, 0) / teacherData.subjects.length)}%
          </div>
          <p className="text-sm text-muted-foreground">Course completion rate</p>
        </Card>

        <Card className="p-4 cursor-pointer hover:bg-accent/50 transition-colors" onClick={onPendingReviewsClick}>
          <div className="flex items-center gap-2 mb-2">
            <AlertTriangle className="w-4 h-4 text-red-600" />
            <h3>Pending Reviews</h3>
          </div>
          <div className="text-2xl">
            {teacherData.subjects.reduce((sum, subject) => 
              sum + subject.recentAssignments.reduce((assignSum, assign) => assignSum + assign.pending, 0), 0
            )}
          </div>
          <p className="text-sm text-muted-foreground">Assignments to grade</p>
        </Card>
      </div>

      {/* Performance Trend Chart */}
      <Card className="p-4">
        <h3 className="mb-4">Course Performance Trends</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={teacherData.performanceData}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
            <XAxis dataKey="week" stroke="#9ca3af" />
            <YAxis stroke="#9ca3af" />
            <Tooltip contentStyle={{ backgroundColor: '#1a1f2e', border: '1px solid rgba(255,255,255,0.1)' }} />
            {Object.keys(teacherData.performanceData[0]).filter(key => key !== 'week').map((key, index) => (
              <Line key={key} type="monotone" dataKey={key} stroke={['#4a7c9e', '#2d1b3d', '#1a3a3a', '#6b7280', '#8b5cf6'][index % 5]} name={key} />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </Card>

      {/* Course Details Tabs */}
      <Card className="p-4">
        <h3 className="mb-4">Course Management</h3>
        <Tabs defaultValue={teacherData.subjects[0].id} className="w-full">
          <TabsList className={`grid w-full grid-cols-${teacherData.subjects.length}`}>
            {teacherData.subjects.map((subject) => {
              const IconComponent = iconMap[subject.name] || BookOpen;
              return (
                <TabsTrigger key={subject.id} value={subject.id} className="flex items-center gap-1">
                  <IconComponent className="w-3 h-3" />
                  <span className="hidden sm:inline">{subject.name.split(' ')[0]}</span>
                </TabsTrigger>
              );
            })}
          </TabsList>

          {teacherData.subjects.map((subject) => (
            <TabsContent key={subject.id} value={subject.id} className="mt-4 space-y-4">
              {/* Subject Overview */}
              <div className="grid md:grid-cols-3 gap-4">
                <Card className="p-3">
                  <h4 className="mb-2">Enrollment</h4>
                  <div className="text-xl">{subject.enrolledStudents}</div>
                  <p className="text-sm text-muted-foreground">Active students</p>
                </Card>
                <Card className="p-3">
                  <h4 className="mb-2">Completion Rate</h4>
                  <div className="flex items-center gap-2">
                    <div className="text-xl">{subject.completionRate}%</div>
                    <Badge className={getCompletionColor(subject.completionRate)}>
                      {subject.completionRate >= 80 ? 'Excellent' : subject.completionRate >= 70 ? 'Good' : 'Needs Attention'}
                    </Badge>
                  </div>
                </Card>
                <Card className="p-3">
                  <h4 className="mb-2">Average Grade</h4>
                  <div className="text-xl">{subject.avgGrade}%</div>
                  <p className="text-sm text-muted-foreground">Class average</p>
                </Card>
              </div>

              {/* Learning Outcomes */}
              <div>
                <h4 className="mb-3">Learning Outcomes Progress</h4>
                <div className="grid md:grid-cols-2 gap-3">
                  {subject.outcomes.map((outcome, index) => (
                    <Card key={index} className="p-3">
                      <div className="flex justify-between items-center mb-2">
                        <h5 className="text-sm">{outcome.name}</h5>
                        <Badge variant="secondary">{outcome.avgScore}%</Badge>
                      </div>
                      <div className="text-xs text-muted-foreground mb-1">
                        {outcome.completion}% students completed
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div 
                          className="bg-primary h-2 rounded-full" 
                          style={{ width: `${outcome.completion}%` }}
                        ></div>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Recent Assignments */}
              <div>
                <h4 className="mb-3">Recent Assignments</h4>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Assignment</TableHead>
                      <TableHead>Submitted</TableHead>
                      <TableHead>Pending</TableHead>
                      <TableHead>Avg Score</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {subject.recentAssignments.map((assignment, index) => (
                      <TableRow key={index}>
                        <TableCell>{assignment.name}</TableCell>
                        <TableCell>{assignment.submitted}</TableCell>
                        <TableCell>
                          <Badge variant={assignment.pending > 0 ? "destructive" : "secondary"}>
                            {assignment.pending}
                          </Badge>
                        </TableCell>
                        <TableCell>{assignment.avgScore}%</TableCell>
                        <TableCell>
                          <Button variant="ghost" size="sm">Grade</Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </Card>
    </div>
  );
}
