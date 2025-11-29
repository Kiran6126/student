import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Clock, FileText, Calendar, User } from "lucide-react";

export function PendingReviewsModal({ isOpen, onClose, subjects }) {
  // Extract all pending assignments from all subjects
  const pendingAssignments = subjects.flatMap(subject => 
    subject.recentAssignments
      .filter((assignment) => assignment.pending > 0)
      .map((assignment) => ({
        ...assignment,
        subjectName: subject.name,
        subjectId: subject.id,
        totalStudents: subject.enrolledStudents
      }))
  );

  const totalPending = pendingAssignments.reduce((sum, assignment) => sum + assignment.pending, 0);

  const getPriorityColor = (pending, total) => {
    const percentage = (pending / total) * 100;
    if (percentage > 20) return "bg-red-100 text-red-800";
    if (percentage > 10) return "bg-yellow-100 text-yellow-800";
    return "bg-blue-100 text-blue-800";
  };

  const getDaysOverdue = (submittedDate) => {
    // Mock calculation - in real app this would be based on due dates
    const submitted = new Date(submittedDate);
    const now = new Date();
    const diffTime = now.getTime() - submitted.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return Math.max(0, diffDays - 3); // Assuming 3 days is the standard grading window
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Clock className="w-5 h-5" />
            Pending Reviews ({totalPending} assignments)
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Summary Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card className="p-3">
              <div className="text-center">
                <div className="text-2xl">{totalPending}</div>
                <div className="text-sm text-muted-foreground">Total Pending</div>
              </div>
            </Card>
            
            <Card className="p-3">
              <div className="text-center">
                <div className="text-2xl text-red-600">
                  {pendingAssignments.filter(a => getDaysOverdue(a.submittedDate || '2024-01-20') > 0).length}
                </div>
                <div className="text-sm text-muted-foreground">Overdue</div>
              </div>
            </Card>
            
            <Card className="p-3">
              <div className="text-center">
                <div className="text-2xl text-yellow-600">
                  {pendingAssignments.filter(a => a.pending > (a.totalStudents * 0.2)).length}
                </div>
                <div className="text-sm text-muted-foreground">High Priority</div>
              </div>
            </Card>
            
            <Card className="p-3">
              <div className="text-center">
                <div className="text-2xl">{subjects.length}</div>
                <div className="text-sm text-muted-foreground">Courses Affected</div>
              </div>
            </Card>
          </div>

          {/* Pending Assignments Table */}
          <div className="border rounded-lg">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Assignment</TableHead>
                  <TableHead>Course</TableHead>
                  <TableHead>Pending Count</TableHead>
                  <TableHead>Submitted</TableHead>
                  <TableHead>Priority</TableHead>
                  <TableHead>Days Since</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {pendingAssignments
                  .sort((a, b) => b.pending - a.pending) // Sort by pending count
                  .map((assignment, index) => {
                    const daysOverdue = getDaysOverdue(assignment.submittedDate || '2024-01-20');
                    const priorityColor = getPriorityColor(assignment.pending, assignment.totalStudents);
                    
                    return (
                      <TableRow key={index}>
                        <TableCell>
                          <div>
                            <div>{assignment.name}</div>
                            <div className="text-xs text-muted-foreground">
                              {assignment.subjectId}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="text-sm">{assignment.subjectName}</div>
                        </TableCell>
                        <TableCell>
                          <Badge className={priorityColor}>
                            {assignment.pending} of {assignment.totalStudents}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="text-sm">{assignment.submitted}</div>
                        </TableCell>
                        <TableCell>
                          <Badge variant={assignment.pending > (assignment.totalStudents * 0.2) ? "destructive" : "secondary"}>
                            {assignment.pending > (assignment.totalStudents * 0.2) ? "High" : "Normal"}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className={`text-sm ${daysOverdue > 0 ? 'text-red-600' : 'text-muted-foreground'}`}>
                            {daysOverdue > 0 ? `${daysOverdue} days overdue` : '< 3 days'}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-1">
                            <Button variant="ghost" size="sm">
                              Grade
                            </Button>
                            <Button variant="ghost" size="sm">
                              View
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </div>

          {pendingAssignments.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              <FileText className="w-8 h-8 mx-auto mb-2 opacity-50" />
              <p>No pending reviews found</p>
              <p className="text-sm">All assignments are up to date!</p>
            </div>
          )}

          {/* Quick Actions */}
          {pendingAssignments.length > 0 && (
            <div className="flex gap-2 pt-4 border-t">
              <Button>Grade All High Priority</Button>
              <Button variant="outline">Send Reminder</Button>
              <Button variant="outline">Export List</Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}