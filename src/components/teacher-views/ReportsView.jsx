import { Card } from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, LineChart, Line, PieChart, Pie, Cell, Legend } from "recharts";
import { Download, TrendingUp, Users, BookOpen, Award } from "lucide-react";

const COLORS = ['#4a7c9e', '#2d1b3d', '#1a3a3a', '#6b7280', '#8b5cf6'];

export function ReportsView({ teacherData }) {
  const seed = parseInt(teacherData.lecturer.id.slice(-2));

  // Prepare analytics data
  const performanceDistribution = [
    { grade: 'A (90-100)', count: Math.round(teacherData.subjects.reduce((sum, s) => sum + s.enrolledStudents, 0) * 0.15) },
    { grade: 'B (80-89)', count: Math.round(teacherData.subjects.reduce((sum, s) => sum + s.enrolledStudents, 0) * 0.35) },
    { grade: 'C (70-79)', count: Math.round(teacherData.subjects.reduce((sum, s) => sum + s.enrolledStudents, 0) * 0.30) },
    { grade: 'D (60-69)', count: Math.round(teacherData.subjects.reduce((sum, s) => sum + s.enrolledStudents, 0) * 0.15) },
    { grade: 'F (<60)', count: Math.round(teacherData.subjects.reduce((sum, s) => sum + s.enrolledStudents, 0) * 0.05) }
  ];

  const attendanceData = teacherData.subjects.map((subject) => ({
    course: subject.name.split(' ')[0],
    attendance: subject.completionRate,
    target: 85
  }));

  const outcomeData = teacherData.subjects[0].outcomes.map((outcome) => ({
    name: outcome.name.substring(0, 15),
    completion: outcome.completion,
    avgScore: outcome.avgScore
  }));

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2>Reports & Analytics</h2>
          <p className="text-muted-foreground">Comprehensive performance insights and analytics</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export PDF
          </Button>
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export Excel
          </Button>
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid md:grid-cols-4 gap-4">
        <Card className="p-4">
          <div className="flex items-center gap-2 mb-2">
            <Users className="w-4 h-4 text-blue-600" />
            <h3>Total Students</h3>
          </div>
          <div className="text-2xl">
            {teacherData.subjects.reduce((sum, s) => sum + s.enrolledStudents, 0)}
          </div>
          <p className="text-sm text-muted-foreground">Across {teacherData.subjects.length} courses</p>
        </Card>

        <Card className="p-4">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="w-4 h-4 text-green-600" />
            <h3>Avg Performance</h3>
          </div>
          <div className="text-2xl">
            {Math.round(teacherData.subjects.reduce((sum, s) => sum + s.avgGrade, 0) / teacherData.subjects.length)}%
          </div>
          <p className="text-sm text-muted-foreground">Overall average grade</p>
        </Card>

        <Card className="p-4">
          <div className="flex items-center gap-2 mb-2">
            <BookOpen className="w-4 h-4 text-purple-600" />
            <h3>Completion Rate</h3>
          </div>
          <div className="text-2xl">
            {Math.round(teacherData.subjects.reduce((sum, s) => sum + s.completionRate, 0) / teacherData.subjects.length)}%
          </div>
          <p className="text-sm text-muted-foreground">Course completion</p>
        </Card>

        <Card className="p-4">
          <div className="flex items-center gap-2 mb-2">
            <Award className="w-4 h-4 text-yellow-600" />
            <h3>Top Performers</h3>
          </div>
          <div className="text-2xl">
            {performanceDistribution[0].count}
          </div>
          <p className="text-sm text-muted-foreground">Students with A grade</p>
        </Card>
      </div>

      <Tabs defaultValue="performance" className="w-full">
        <TabsList>
          <TabsTrigger value="performance">Performance Analysis</TabsTrigger>
          <TabsTrigger value="attendance">Attendance Reports</TabsTrigger>
          <TabsTrigger value="outcomes">Learning Outcomes</TabsTrigger>
          <TabsTrigger value="comparison">Course Comparison</TabsTrigger>
        </TabsList>

        <TabsContent value="performance" className="mt-4 space-y-4">
          <Card className="p-4">
            <h3 className="mb-4">Grade Distribution</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={performanceDistribution}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis dataKey="grade" stroke="#9ca3af" />
                <YAxis stroke="#9ca3af" />
                <Tooltip contentStyle={{ backgroundColor: '#1a1f2e', border: '1px solid rgba(255,255,255,0.1)' }} />
                <Bar dataKey="count" fill="#4a7c9e" />
              </BarChart>
            </ResponsiveContainer>
          </Card>

          <Card className="p-4">
            <h3 className="mb-4">Performance by Course</h3>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Course</TableHead>
                  <TableHead>Students</TableHead>
                  <TableHead>Avg Grade</TableHead>
                  <TableHead>Pass Rate</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
        <TableBody>
          {teacherData.subjects.map((subject, index) => (
                  <TableRow key={index}>
                    <TableCell>{subject.name}</TableCell>
                    <TableCell>{subject.enrolledStudents}</TableCell>
                    <TableCell>{subject.avgGrade}%</TableCell>
                    <TableCell>
                      {Math.round(85 + (seed + index) % 10)}%
                    </TableCell>
                    <TableCell>
                      <Badge className={
                        subject.avgGrade >= 80 ? "bg-green-100 text-green-800" :
                        subject.avgGrade >= 70 ? "bg-blue-100 text-blue-800" :
                        "bg-yellow-100 text-yellow-800"
                      }>
                        {subject.avgGrade >= 80 ? 'Excellent' : subject.avgGrade >= 70 ? 'Good' : 'Average'}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        </TabsContent>

        <TabsContent value="attendance" className="mt-4 space-y-4">
          <Card className="p-4">
            <h3 className="mb-4">Attendance vs Target</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={attendanceData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis dataKey="course" stroke="#9ca3af" />
                <YAxis stroke="#9ca3af" />
                <Tooltip contentStyle={{ backgroundColor: '#1a1f2e', border: '1px solid rgba(255,255,255,0.1)' }} />
                <Legend />
                <Bar dataKey="attendance" fill="#4a7c9e" name="Actual Attendance %" />
                <Bar dataKey="target" fill="#2d1b3d" name="Target %" />
              </BarChart>
            </ResponsiveContainer>
          </Card>

            <div className="grid md:grid-cols-3 gap-4">
            {teacherData.subjects.map((subject, index) => (
              <Card key={index} className="p-4">
                <h4 className="mb-3">{subject.name.split(' ').slice(0, 2).join(' ')}</h4>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Attendance Rate:</span>
                    <span className="font-medium">{subject.completionRate}%</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>On-time Rate:</span>
                    <span className="font-medium">{Math.round(subject.completionRate * 0.9)}%</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Absent Students:</span>
                    <span className="font-medium">{Math.round(subject.enrolledStudents * (1 - subject.completionRate / 100))}</span>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="outcomes" className="mt-4 space-y-4">
          <Card className="p-4">
            <h3 className="mb-4">Learning Outcomes Achievement</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={outcomeData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis dataKey="name" stroke="#9ca3af" />
                <YAxis stroke="#9ca3af" />
                <Tooltip contentStyle={{ backgroundColor: '#1a1f2e', border: '1px solid rgba(255,255,255,0.1)' }} />
                <Legend />
                <Bar dataKey="completion" fill="#4a7c9e" name="Completion %" />
                <Bar dataKey="avgScore" fill="#2d1b3d" name="Avg Score %" />
              </BarChart>
            </ResponsiveContainer>
          </Card>

          <div className="grid md:grid-cols-2 gap-4">
            {teacherData.subjects.map((subject, subIndex) => (
              <Card key={subIndex} className="p-4">
                <h4 className="mb-3">{subject.name}</h4>
                <div className="space-y-2">
                  {subject.outcomes.map((outcome, oIndex) => (
                    <div key={oIndex} className="flex justify-between items-center">
                      <span className="text-sm">{outcome.name}</span>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline">{outcome.completion}%</Badge>
                        <Badge variant="secondary">{outcome.avgScore}%</Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="comparison" className="mt-4 space-y-4">
          <Card className="p-4">
            <h3 className="mb-4">Course Performance Comparison</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={teacherData.performanceData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis dataKey="week" stroke="#9ca3af" />
                <YAxis stroke="#9ca3af" />
                <Tooltip contentStyle={{ backgroundColor: '#1a1f2e', border: '1px solid rgba(255,255,255,0.1)' }} />
                <Legend />
                {Object.keys(teacherData.performanceData[0]).filter(key => key !== 'week').map((key, index) => (
                  <Line key={key} type="monotone" dataKey={key} stroke={COLORS[index % COLORS.length]} name={key} />
                ))}
              </LineChart>
            </ResponsiveContainer>
          </Card>

          <Card className="p-4">
            <h3 className="mb-4">Detailed Comparison</h3>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Metric</TableHead>
                  {teacherData.subjects.map((subject) => (
                      <TableHead key={subject.id}>{subject.name.split(' ')[0]}</TableHead>
                    ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>Enrollment</TableCell>
                  {teacherData.subjects.map((subject) => (
                    <TableCell key={subject.id}>{subject.enrolledStudents}</TableCell>
                  ))}
                </TableRow>
                <TableRow>
                  <TableCell>Avg Grade</TableCell>
                  {teacherData.subjects.map((subject) => (
                    <TableCell key={subject.id}>{subject.avgGrade}%</TableCell>
                  ))}
                </TableRow>
                <TableRow>
                  <TableCell>Completion</TableCell>
                  {teacherData.subjects.map((subject) => (
                    <TableCell key={subject.id}>{subject.completionRate}%</TableCell>
                  ))}
                </TableRow>
                <TableRow>
                  <TableCell>Assignments</TableCell>
                  {teacherData.subjects.map((subject) => (
                    <TableCell key={subject.id}>{subject.recentAssignments.length}</TableCell>
                  ))}
                </TableRow>
              </TableBody>
            </Table>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
