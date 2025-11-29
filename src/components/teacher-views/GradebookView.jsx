import { Card } from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Download, Upload, Filter, Search } from "lucide-react";

export function GradebookView({ teacherData }) {
  // Generate sample student grades based on teacher's courses
  const generateStudentGrades = (subject) => {
    const students = [];
    for (let i = 0; i < Math.min(10, subject.enrolledStudents); i++) {
      const baseGrade = subject.avgGrade;
        students.push({
        id: `1234500${String(i + 1).padStart(3, '0')}`,
        name: `Student ${i + 1}`,
        attendance: subject.completionRate + ((i % 10) - 5),
        assignments: subject.recentAssignments.map((a, idx) => ({
          name: a.name,
          score: baseGrade + ((i + idx) % 20) - 10
        })),
        midterm: baseGrade + ((i % 15) - 7),
        final: baseGrade + ((i % 18) - 9),
        overall: baseGrade + ((i % 12) - 6)
      });
    }
    return students;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2>Gradebook</h2>
          <p className="text-muted-foreground">Manage student grades and performance</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Upload className="w-4 h-4 mr-2" />
            Import Grades
          </Button>
          <Button>
            <Download className="w-4 h-4 mr-2" />
            Export Gradebook
          </Button>
        </div>
      </div>

      {/* Filters */}
      <Card className="p-4">
        <div className="grid md:grid-cols-3 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search students..." className="pl-10" />
          </div>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Filter by performance" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Students</SelectItem>
              <SelectItem value="excellent">Excellent (≥90%)</SelectItem>
              <SelectItem value="good">Good (80-89%)</SelectItem>
              <SelectItem value="average">Average (70-79%)</SelectItem>
              <SelectItem value="below">Below Average (&lt;70%)</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Filter className="w-4 h-4 mr-2" />
            More Filters
          </Button>
        </div>
      </Card>

      {/* Course Tabs */}
      <Tabs defaultValue={teacherData.subjects[0].id} className="w-full">
        <TabsList className="grid w-full" style={{ gridTemplateColumns: `repeat(${teacherData.subjects.length}, 1fr)` }}>
          {teacherData.subjects.map((subject) => (
            <TabsTrigger key={subject.id} value={subject.id}>
              {subject.name.split(' ')[0]}
            </TabsTrigger>
          ))}
        </TabsList>

  {teacherData.subjects.map((subject) => {
          const students = generateStudentGrades(subject);
          
          return (
            <TabsContent key={subject.id} value={subject.id} className="mt-4 space-y-4">
              {/* Grade Summary */}
              <Card className="p-4">
                <h3 className="mb-4">{subject.name} - Grade Summary</h3>
                <div className="grid md:grid-cols-5 gap-4">
                  <div className="text-center p-3 bg-green-900/20 rounded">
                    <div className="text-sm text-muted-foreground mb-1">A (90-100%)</div>
                    <div className="text-2xl">{students.filter(s => s.overall >= 90).length}</div>
                  </div>
                  <div className="text-center p-3 bg-blue-900/20 rounded">
                    <div className="text-sm text-muted-foreground mb-1">B (80-89%)</div>
                    <div className="text-2xl">{students.filter(s => s.overall >= 80 && s.overall < 90).length}</div>
                  </div>
                  <div className="text-center p-3 bg-yellow-900/20 rounded">
                    <div className="text-sm text-muted-foreground mb-1">C (70-79%)</div>
                    <div className="text-2xl">{students.filter(s => s.overall >= 70 && s.overall < 80).length}</div>
                  </div>
                  <div className="text-center p-3 bg-orange-900/20 rounded">
                    <div className="text-sm text-muted-foreground mb-1">D (60-69%)</div>
                    <div className="text-2xl">{students.filter(s => s.overall >= 60 && s.overall < 70).length}</div>
                  </div>
                  <div className="text-center p-3 bg-red-900/20 rounded">
                    <div className="text-sm text-muted-foreground mb-1">F (&lt;60%)</div>
                    <div className="text-2xl">{students.filter(s => s.overall < 60).length}</div>
                  </div>
                </div>
              </Card>

              {/* Detailed Gradebook */}
              <Card className="p-4 overflow-x-auto">
                <h3 className="mb-4">Student Grades</h3>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Student ID</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>Attendance</TableHead>
                      {subject.recentAssignments.map((a, idx) => (
                        <TableHead key={idx}>{a.name.substring(0, 15)}...</TableHead>
                      ))}
                      <TableHead>Midterm</TableHead>
                      <TableHead>Final</TableHead>
                      <TableHead>Overall</TableHead>
                      <TableHead>Grade</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {students.map((student) => (
                      <TableRow key={student.id}>
                        <TableCell>{student.id}</TableCell>
                        <TableCell>{student.name}</TableCell>
                        <TableCell>{student.attendance}%</TableCell>
                        {student.assignments.map((a, idx) => (
                          <TableCell key={idx}>
                            <Input 
                              type="number" 
                              className="w-16 h-8" 
                              value={a.score}
                              readOnly
                            />
                          </TableCell>
                        ))}
                        <TableCell>
                          <Input 
                            type="number" 
                            className="w-16 h-8" 
                            value={student.midterm}
                            readOnly
                          />
                        </TableCell>
                        <TableCell>
                          <Input 
                            type="number" 
                            className="w-16 h-8" 
                            value={student.final}
                            readOnly
                          />
                        </TableCell>
                        <TableCell>
                          <Badge className={
                            student.overall >= 80 ? "bg-green-100 text-green-800" :
                            student.overall >= 70 ? "bg-blue-100 text-blue-800" :
                            "bg-yellow-100 text-yellow-800"
                          }>
                            {student.overall}%
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge>
                            {student.overall >= 90 ? 'A' :
                             student.overall >= 80 ? 'B' :
                             student.overall >= 70 ? 'C' :
                             student.overall >= 60 ? 'D' : 'F'}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Card>

              {/* Grade Statistics */}
              <Card className="p-4">
                <h3 className="mb-4">Class Statistics</h3>
                <div className="grid md:grid-cols-4 gap-4">
                  <div className="p-3 bg-muted/30 rounded">
                    <div className="text-sm text-muted-foreground mb-1">Average Grade</div>
                    <div className="text-2xl">{subject.avgGrade}%</div>
                  </div>
                  <div className="p-3 bg-muted/30 rounded">
                    <div className="text-sm text-muted-foreground mb-1">Highest Grade</div>
                    <div className="text-2xl">{Math.max(...students.map(s => s.overall))}%</div>
                  </div>
                  <div className="p-3 bg-muted/30 rounded">
                    <div className="text-sm text-muted-foreground mb-1">Lowest Grade</div>
                    <div className="text-2xl">{Math.min(...students.map(s => s.overall))}%</div>
                  </div>
                  <div className="p-3 bg-muted/30 rounded">
                    <div className="text-sm text-muted-foreground mb-1">Pass Rate</div>
                    <div className="text-2xl">
                      {Math.round((students.filter(s => s.overall >= 60).length / students.length) * 100)}%
                    </div>
                  </div>
                </div>
              </Card>
            </TabsContent>
          );
        })}
      </Tabs>
    </div>
  );
}