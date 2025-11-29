import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { Users, TrendingUp, BookOpen, AlertTriangle, Plus, Download, Filter } from "lucide-react";

const mockAdminData = {
  totalStudents: 156,
  activeOutcomes: 12,
  averageCompletion: 73,
  studentsAtRisk: 8,
  outcomeDistribution: [
    { name: "Critical Thinking", students: 145, avgScore: 82 },
    { name: "Communication", students: 142, avgScore: 87 },
    { name: "Technical Skills", students: 138, avgScore: 75 },
    { name: "Leadership", students: 134, avgScore: 79 },
    { name: "Research Methods", students: 129, avgScore: 73 },
    { name: "Problem Solving", students: 125, avgScore: 81 }
  ],
  progressData: [
    { outcome: "Critical Thinking", exemplary: 45, proficient: 67, developing: 28, beginning: 5 },
    { outcome: "Communication", exemplary: 52, proficient: 63, developing: 22, beginning: 5 },
    { outcome: "Technical Skills", exemplary: 38, proficient: 58, developing: 35, beginning: 7 },
    { outcome: "Leadership", exemplary: 41, proficient: 61, developing: 27, beginning: 5 }
  ],
  recentStudents: [
    { id: "STU2024001", name: "Alex Johnson", gpa: 3.7, outcomes: 8, lastActive: "2024-01-22", status: "on-track" },
    { id: "STU2024002", name: "Sarah Chen", gpa: 3.9, outcomes: 10, lastActive: "2024-01-21", status: "exemplary" },
    { id: "STU2024003", name: "Marcus Williams", gpa: 2.8, outcomes: 6, lastActive: "2024-01-19", status: "at-risk" },
    { id: "STU2024004", name: "Emily Rodriguez", gpa: 3.5, outcomes: 9, lastActive: "2024-01-22", status: "on-track" },
    { id: "STU2024005", name: "David Kim", gpa: 3.2, outcomes: 7, lastActive: "2024-01-20", status: "on-track" }
  ]
};

const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff7c7c'];

const getStatusColor = (status) => {
  switch (status) {
    case "exemplary": return "bg-green-100 text-green-800";
    case "on-track": return "bg-blue-100 text-blue-800";
    case "at-risk": return "bg-red-100 text-red-800";
    default: return "bg-gray-100 text-gray-800";
  }
};

export function AdminDashboard() {
  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1>Outcome Tracking Dashboard</h1>
          <p className="text-muted-foreground">Monitor and manage student learning outcomes</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </Button>
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Add Outcome
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid md:grid-cols-4 gap-4">
        <Card className="p-4">
          <div className="flex items-center gap-2 mb-2">
            <Users className="w-4 h-4 text-blue-600" />
            <h3>Total Students</h3>
          </div>
          <div className="text-2xl">{mockAdminData.totalStudents}</div>
          <p className="text-sm text-muted-foreground">Active learners</p>
        </Card>

        <Card className="p-4">
          <div className="flex items-center gap-2 mb-2">
            <BookOpen className="w-4 h-4 text-green-600" />
            <h3>Active Outcomes</h3>
          </div>
          <div className="text-2xl">{mockAdminData.activeOutcomes}</div>
          <p className="text-sm text-muted-foreground">Being tracked</p>
        </Card>

        <Card className="p-4">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="w-4 h-4 text-purple-600" />
            <h3>Avg Completion</h3>
          </div>
          <div className="text-2xl">{mockAdminData.averageCompletion}%</div>
          <p className="text-sm text-muted-foreground">Across all outcomes</p>
        </Card>

        <Card className="p-4">
          <div className="flex items-center gap-2 mb-2">
            <AlertTriangle className="w-4 h-4 text-red-600" />
            <h3>Students At Risk</h3>
          </div>
          <div className="text-2xl">{mockAdminData.studentsAtRisk}</div>
          <p className="text-sm text-muted-foreground">Need attention</p>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card className="p-4">
          <h3 className="mb-4">Outcome Performance Distribution</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={mockAdminData.progressData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="outcome" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="exemplary" stackId="a" fill="#22c55e" />
              <Bar dataKey="proficient" stackId="a" fill="#3b82f6" />
              <Bar dataKey="developing" stackId="a" fill="#f59e0b" />
              <Bar dataKey="beginning" stackId="a" fill="#ef4444" />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        <Card className="p-4">
          <h3 className="mb-4">Student Enrollment by Outcome</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={mockAdminData.outcomeDistribution}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="students" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Student Management Table */}
      <Card className="p-4">
        <div className="flex items-center justify-between mb-4">
          <h3>Recent Student Activity</h3>
          <Button variant="outline" size="sm">View All Students</Button>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Student ID</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>GPA</TableHead>
              <TableHead>Outcomes Completed</TableHead>
              <TableHead>Last Active</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockAdminData.recentStudents.map((student) => (
              <TableRow key={student.id}>
                <TableCell>{student.id}</TableCell>
                <TableCell>{student.name}</TableCell>
                <TableCell>{student.gpa}</TableCell>
                <TableCell>{student.outcomes}/12</TableCell>
                <TableCell>{student.lastActive}</TableCell>
                <TableCell>
                  <Badge className={getStatusColor(student.status)}>
                    {student.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Button variant="ghost" size="sm">View Details</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>

      {/* Outcome Management */}
      <Card className="p-4">
        <div className="flex items-center justify-between mb-4">
          <h3>Learning Outcomes Overview</h3>
          <Button variant="outline" size="sm">Manage Outcomes</Button>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {mockAdminData.outcomeDistribution.map((outcome, index) => (
            <Card key={index} className="p-3">
              <h4 className="mb-2">{outcome.name}</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Students Enrolled:</span>
                  <span>{outcome.students}</span>
                </div>
                <div className="flex justify-between">
                  <span>Average Score:</span>
                  <span>{outcome.avgScore}%</span>
                </div>
                <Button variant="ghost" size="sm" className="w-full mt-2">
                  View Details
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </Card>
    </div>
  );
}