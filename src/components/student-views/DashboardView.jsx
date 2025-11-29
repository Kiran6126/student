import { useState } from "react";
import { Card } from "../ui/card";
import { Progress } from "../ui/progress";
import { Badge } from "../ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { Calendar, BookOpen, Trophy, Target } from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, LineChart, Line, Legend } from "recharts";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";

const COLORS = ['#4a7c9e', '#2d1b3d', '#1a3a3a', '#6b7280', '#8b5cf6'];

export function DashboardView({ studentData, onEnrolledCoursesClick, onRecentActivityClick }) {
  const [selectedChart, setSelectedChart] = useState(null);

  // Prepare attendance data for pie chart
  const attendanceData = [
    { name: "Present", value: studentData.attendance.present },
    { name: "Absent", value: studentData.attendance.absent },
    { name: "Late", value: studentData.attendance.late }
  ];

  // Prepare CGPA data by semester
  const cgpaData = [
    { semester: "Sem 1", cgpa: (studentData.currentGPA - 0.2).toFixed(2) },
    { semester: "Sem 2", cgpa: (studentData.currentGPA - 0.1).toFixed(2) },
    { semester: "Sem 3", cgpa: (studentData.currentGPA - 0.05).toFixed(2) },
    { semester: "Sem 4", cgpa: studentData.currentGPA.toFixed(2) }
  ];

  // Prepare engagement breakdown data
  const engagementData = [
    { activity: "Lectures", value: 35 },
    { activity: "Assignments", value: 28 },
    { activity: "Reading", value: 20 },
    { activity: "Discussion", value: 10 },
    { activity: "Practice", value: 7 }
  ];

  // Weekly engagement data
  const weeklyEngagementData = [
    { week: "Week 1", hours: 12 },
    { week: "Week 2", hours: 15 },
    { week: "Week 3", hours: 18 },
    { week: "Week 4", hours: 14 },
    { week: "Week 5", hours: 20 },
    { week: "Week 6", hours: 16 }
  ];

  // Subject-wise engagement data
  const subjectEngagementData = studentData.subjects.map((subject) => ({
    name: subject.name.split(' ')[0],
    grade: subject.grade,
    attendance: subject.attendance
  }));

  // Course-wise attendance for detailed modal
  const courseAttendanceData = studentData.subjects.map((subject) => ({
    course: subject.name,
    attendance: subject.attendance,
    present: Math.floor(subject.attendance * 0.85),
    absent: Math.floor((100 - subject.attendance) * 0.7),
    late: Math.floor((100 - subject.attendance) * 0.3)
  }));

  const renderDetailedModal = () => {
    if (!selectedChart) return null;

    return (
      <Dialog open={!!selectedChart} onOpenChange={() => setSelectedChart(null)}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {selectedChart === 'attendance' && 'Detailed Attendance Report'}
              {selectedChart === 'cgpa' && 'Detailed CGPA Analysis'}
              {selectedChart === 'engagement' && 'Detailed Engagement Breakdown'}
              {selectedChart === 'weekly' && 'Detailed Weekly Engagement'}
              {selectedChart === 'subject' && 'Detailed Subject-wise Performance'}
            </DialogTitle>
          </DialogHeader>

          {selectedChart === 'attendance' && (
            <div className="space-y-4">
              <Card className="p-4">
                <h3 className="mb-4">Overall Attendance Summary</h3>
                <div className="grid grid-cols-3 gap-4 mb-4">
                  <div className="text-center p-3 bg-green-900/20 rounded">
                    <div className="text-2xl">{studentData.attendance.present}%</div>
                    <div className="text-sm text-muted-foreground">Present</div>
                  </div>
                  <div className="text-center p-3 bg-red-900/20 rounded">
                    <div className="text-2xl">{studentData.attendance.absent}%</div>
                    <div className="text-sm text-muted-foreground">Absent</div>
                  </div>
                  <div className="text-center p-3 bg-yellow-900/20 rounded">
                    <div className="text-2xl">{studentData.attendance.late}%</div>
                    <div className="text-sm text-muted-foreground">Late</div>
                  </div>
                </div>
              </Card>

              <Card className="p-4">
                <h3 className="mb-4">Course-wise Attendance</h3>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Course</TableHead>
                      <TableHead>Attendance %</TableHead>
                      <TableHead>Present</TableHead>
                      <TableHead>Absent</TableHead>
                      <TableHead>Late</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {courseAttendanceData.map((course, index) => (
                      <TableRow key={index}>
                        <TableCell>{course.course}</TableCell>
                        <TableCell>{course.attendance}%</TableCell>
                        <TableCell>{course.present}%</TableCell>
                        <TableCell>{course.absent}%</TableCell>
                        <TableCell>{course.late}%</TableCell>
                        <TableCell>
                          <Badge className={course.attendance >= 85 ? "bg-green-100 text-green-800" : course.attendance >= 75 ? "bg-yellow-100 text-yellow-800" : "bg-red-100 text-red-800"}>
                            {course.attendance >= 85 ? "Excellent" : course.attendance >= 75 ? "Good" : "Poor"}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Card>
            </div>
          )}

          {selectedChart === 'cgpa' && (
            <div className="space-y-4">
              <Card className="p-4">
                <h3 className="mb-4">CGPA Trend Analysis</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={cgpaData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                    <XAxis dataKey="semester" stroke="#9ca3af" />
                    <YAxis domain={[7.0, 10.0]} stroke="#9ca3af" />
                    <Tooltip contentStyle={{ backgroundColor: '#1a1f2e', border: '1px solid rgba(255,255,255,0.1)' }} />
                    <Line type="monotone" dataKey="cgpa" stroke="#4a7c9e" strokeWidth={3} />
                  </LineChart>
                </ResponsiveContainer>
              </Card>

              <div className="grid grid-cols-2 gap-4">
                {cgpaData.map((sem, index) => (
                  <Card key={index} className="p-4">
                    <h4>{sem.semester}</h4>
                    <div className="text-3xl mt-2">{sem.cgpa}</div>
                    <p className="text-sm text-muted-foreground mt-1">
                      {index > 0 ? `Change: ${(parseFloat(sem.cgpa) - parseFloat(cgpaData[index - 1].cgpa)).toFixed(2)}` : 'Baseline'}
                    </p>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {selectedChart === 'engagement' && (
            <div className="space-y-4">
              <Card className="p-4">
                <h3 className="mb-4">Time Allocation Breakdown</h3>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Activity</TableHead>
                      <TableHead>Percentage</TableHead>
                      <TableHead>Hours per Week</TableHead>
                      <TableHead>Progress</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {engagementData.map((item, index) => (
                      <TableRow key={index}>
                        <TableCell>{item.activity}</TableCell>
                        <TableCell>{item.value}%</TableCell>
                        <TableCell>{Math.round((item.value / 100) * 16)} hrs</TableCell>
                        <TableCell>
                          <Progress value={item.value} className="w-32" />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Card>
            </div>
          )}

          {selectedChart === 'weekly' && (
            <div className="space-y-4">
              <Card className="p-4">
                <h3 className="mb-4">Weekly Study Hours Analysis</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={weeklyEngagementData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                    <XAxis dataKey="week" stroke="#9ca3af" />
                    <YAxis stroke="#9ca3af" />
                    <Tooltip contentStyle={{ backgroundColor: '#1a1f2e', border: '1px solid rgba(255,255,255,0.1)' }} />
                    <Bar dataKey="hours" fill="#4a7c9e" />
                  </BarChart>
                </ResponsiveContainer>

                <div className="grid grid-cols-3 gap-4 mt-4">
                  <Card className="p-3">
                    <div className="text-sm text-muted-foreground">Average</div>
                    <div className="text-2xl">{Math.round(weeklyEngagementData.reduce((sum, w) => sum + w.hours, 0) / weeklyEngagementData.length)} hrs</div>
                  </Card>
                  <Card className="p-3">
                    <div className="text-sm text-muted-foreground">Maximum</div>
                    <div className="text-2xl">{Math.max(...weeklyEngagementData.map(w => w.hours))} hrs</div>
                  </Card>
                  <Card className="p-3">
                    <div className="text-sm text-muted-foreground">Minimum</div>
                    <div className="text-2xl">{Math.min(...weeklyEngagementData.map(w => w.hours))} hrs</div>
                  </Card>
                </div>
              </Card>
            </div>
          )}

          {selectedChart === 'subject' && (
            <div className="space-y-4">
              <Card className="p-4">
                <h3 className="mb-4">Subject-wise Detailed Performance</h3>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Course</TableHead>
                      <TableHead>Grade</TableHead>
                      <TableHead>Attendance</TableHead>
                      <TableHead>Progress</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {studentData.subjects.map((subject, index) => (
                      <TableRow key={index}>
                        <TableCell>{subject.name}</TableCell>
                        <TableCell>{subject.grade}%</TableCell>
                        <TableCell>{subject.attendance}%</TableCell>
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
            </div>
          )}
        </DialogContent>
      </Dialog>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1>Welcome back, {studentData.name}</h1>
          <p className="text-muted-foreground">Student ID: {studentData.id}</p>
          <p className="text-sm text-muted-foreground">Department: {studentData.department}</p>
        </div>
        <div className="text-right">
          <div className="flex items-center gap-2">
            <Trophy className="w-5 h-5 text-yellow-600" />
            <span>Current GPA: {studentData.currentGPA}</span>
          </div>
          <p className="text-sm text-muted-foreground">
            {studentData.completedCredits}/{studentData.totalCredits} credits completed
          </p>
        </div>
      </div>

      {/* Progress Overview */}
      <div className="grid md:grid-cols-3 gap-4">
        <Card className="p-4">
          <div className="flex items-center gap-2 mb-2">
            <BookOpen className="w-4 h-4 text-blue-600" />
            <h3>Course Progress</h3>
          </div>
          <div className="space-y-2">
            <Progress value={Math.round(studentData.subjects.reduce((sum, s) => sum + s.progress, 0) / studentData.subjects.length)} />
            <p className="text-sm text-muted-foreground">
              {Math.round(studentData.subjects.reduce((sum, s) => sum + s.progress, 0) / studentData.subjects.length)}% Average Progress
            </p>
          </div>
        </Card>

        <Card className="p-4 cursor-pointer hover:bg-accent/50 transition-colors" onClick={onEnrolledCoursesClick}>
          <div className="flex items-center gap-2 mb-2">
            <Target className="w-4 h-4 text-green-600" />
            <h3>Courses Enrolled</h3>
          </div>
          <div className="space-y-2">
            <div className="text-2xl">{studentData.subjects.length}</div>
            <p className="text-sm text-muted-foreground">
              Computer Science subjects
            </p>
          </div>
        </Card>

        <Card className="p-4 cursor-pointer hover:bg-accent/50 transition-colors" onClick={onRecentActivityClick}>
          <div className="flex items-center gap-2 mb-2">
            <Calendar className="w-4 h-4 text-purple-600" />
            <h3>Recent Activity</h3>
          </div>
          <div className="space-y-1">
            <p className="text-sm">Last submission: Jan 25</p>
            <p className="text-sm text-muted-foreground">Data Story Project</p>
          </div>
        </Card>
      </div>

      {/* Analytics Charts */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Attendance Pie Chart */}
        <Card className="p-4 cursor-pointer hover:bg-accent/30 transition-colors" onClick={() => setSelectedChart('attendance')}>
          <h3 className="mb-4">Overall Attendance (Click for details)</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={attendanceData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {attendanceData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </Card>

        {/* CGPA Trend */}
        <Card className="p-4 cursor-pointer hover:bg-accent/30 transition-colors" onClick={() => setSelectedChart('cgpa')}>
          <h3 className="mb-4">CGPA Trend (Click for details)</h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={cgpaData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
              <XAxis dataKey="semester" stroke="#9ca3af" />
              <YAxis domain={[7.0, 10.0]} stroke="#9ca3af" />
              <Tooltip contentStyle={{ backgroundColor: '#1a1f2e', border: '1px solid rgba(255,255,255,0.1)' }} />
              <Line type="monotone" dataKey="cgpa" stroke="#4a7c9e" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        {/* Engagement Breakdown */}
        <Card className="p-4 cursor-pointer hover:bg-accent/30 transition-colors" onClick={() => setSelectedChart('engagement')}>
          <h3 className="mb-4">Engagement Breakdown (Click for details)</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={engagementData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ activity, value }) => `${activity}: ${value}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {engagementData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </Card>

        {/* Weekly Engagement Trend */}
        <Card className="p-4 cursor-pointer hover:bg-accent/30 transition-colors" onClick={() => setSelectedChart('weekly')}>
          <h3 className="mb-4">Weekly Engagement Trend (Click for details)</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={weeklyEngagementData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
              <XAxis dataKey="week" stroke="#9ca3af" />
              <YAxis stroke="#9ca3af" />
              <Tooltip contentStyle={{ backgroundColor: '#1a1f2e', border: '1px solid rgba(255,255,255,0.1)' }} />
              <Bar dataKey="hours" fill="#4a7c9e" />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Subject-wise Engagement */}
      <Card className="p-4 cursor-pointer hover:bg-accent/30 transition-colors" onClick={() => setSelectedChart('subject')}>
        <h3 className="mb-4">Subject-wise Performance (Click for details)</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={subjectEngagementData}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
            <XAxis dataKey="name" stroke="#9ca3af" />
            <YAxis stroke="#9ca3af" />
            <Tooltip contentStyle={{ backgroundColor: '#1a1f2e', border: '1px solid rgba(255,255,255,0.1)' }} />
            <Legend />
            <Bar dataKey="grade" fill="#4a7c9e" name="Grade %" />
            <Bar dataKey="attendance" fill="#2d1b3d" name="Attendance %" />
          </BarChart>
        </ResponsiveContainer>
      </Card>

      {renderDetailedModal()}
    </div>
  );
}
