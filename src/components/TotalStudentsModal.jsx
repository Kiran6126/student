import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { Badge } from "./ui/badge";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useState } from "react";
import { Search, Filter, Users } from "lucide-react";


const mockStudentDetails = [
  { id: "STU2024001", name: "Alex Johnson", email: "alex.johnson@university.edu", courses: ["CS301", "CS302", "CS303"], avgGrade: 88, status: "active" },
  { id: "STU2024002", name: "Sarah Chen", email: "sarah.chen@university.edu", courses: ["CS301", "CS304", "CS305"], avgGrade: 92, status: "active" },
  { id: "STU2024003", name: "Marcus Williams", email: "marcus.williams@university.edu", courses: ["CS302", "CS303"], avgGrade: 75, status: "active" },
  { id: "STU2024004", name: "Emily Rodriguez", email: "emily.rodriguez@university.edu", courses: ["CS301", "CS304"], avgGrade: 89, status: "active" },
  { id: "STU2024005", name: "David Kim", email: "david.kim@university.edu", courses: ["CS303", "CS305"], avgGrade: 81, status: "active" },
  { id: "STU2024006", name: "Lisa Wang", email: "lisa.wang@university.edu", courses: ["CS301", "CS302", "CS304", "CS305"], avgGrade: 94, status: "active" },
  { id: "STU2024007", name: "Michael Brown", email: "michael.brown@university.edu", courses: ["CS302", "CS303"], avgGrade: 77, status: "active" },
  { id: "STU2024008", name: "Jennifer Davis", email: "jennifer.davis@university.edu", courses: ["CS301", "CS305"], avgGrade: 85, status: "active" }
];

const getGradeColor = (grade) => {
  if (grade >= 90) return "bg-green-100 text-green-800";
  if (grade >= 80) return "bg-blue-100 text-blue-800";
  if (grade >= 70) return "bg-yellow-100 text-yellow-800";
  return "bg-red-100 text-red-800";
};

const getSubjectName = (courseId) => {
  const courseMap = {
    "CS301": "Database Management",
    "CS302": "Frontend Development",
    "CS303": "Object-Oriented Programming",
    "CS304": "Data Visualization",
    "CS305": "Computer Networks"
  };
  return courseMap[courseId] || courseId;
};

export function TotalStudentsModal({ isOpen, onClose, subjects }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCourse, setSelectedCourse] = useState("all");

  const filteredStudents = mockStudentDetails.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCourse = selectedCourse === "all" || student.courses.includes(selectedCourse);
    
    return matchesSearch && matchesCourse;
  });

  const totalStudents = mockStudentDetails.length;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Users className="w-5 h-5" />
            Total Students ({totalStudents})
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          {/* Search and Filter Controls */}
          <div className="flex gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search students by name, ID, or email..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <select
              className="px-3 py-2 border rounded-md bg-background"
              value={selectedCourse}
              onChange={(e) => setSelectedCourse(e.target.value)}
            >
              <option value="all">All Courses</option>
              {subjects.map(subject => (
                <option key={subject.id} value={subject.id}>
                  {getSubjectName(subject.id)}
                </option>
              ))}
            </select>
          </div>

          {/* Students Table */}
          <div className="border rounded-lg">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Student ID</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Enrolled Courses</TableHead>
                  <TableHead>Avg Grade</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredStudents.map((student) => (
                  <TableRow key={student.id}>
                    <TableCell>{student.id}</TableCell>
                    <TableCell>{student.name}</TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {student.email}
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {student.courses.map(courseId => (
                          <Badge key={courseId} variant="outline" className="text-xs">
                            {courseId}
                          </Badge>
                        ))}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={getGradeColor(student.avgGrade)}>
                        {student.avgGrade}%
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary">
                        {student.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Button variant="ghost" size="sm">
                        View Profile
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {filteredStudents.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              <Users className="w-8 h-8 mx-auto mb-2 opacity-50" />
              <p>No students found matching your criteria</p>
            </div>
          )}

          {/* Summary Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t">
            <div className="text-center">
              <div className="text-2xl">{filteredStudents.length}</div>
              <div className="text-sm text-muted-foreground">Filtered Results</div>
            </div>
            <div className="text-center">
              <div className="text-2xl">{totalStudents}</div>
              <div className="text-sm text-muted-foreground">Total Students</div>
            </div>
            <div className="text-center">
              <div className="text-2xl">
                {Math.round(filteredStudents.reduce((sum, s) => sum + s.avgGrade, 0) / filteredStudents.length) || 0}%
              </div>
              <div className="text-sm text-muted-foreground">Avg Grade</div>
            </div>
            <div className="text-center">
              <div className="text-2xl">
                {filteredStudents.filter(s => s.avgGrade >= 80).length}
              </div>
              <div className="text-sm text-muted-foreground">Above 80%</div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}