import { Card } from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Megaphone, Plus, Edit, Trash2 } from "lucide-react";

 

export function AnnouncementsView({ teacherData }) {
  const seed = parseInt(teacherData.lecturer.id.slice(-2));
  
  const announcements = [
    {
      id: 1,
      title: "Midterm Exam Schedule",
      content: "The midterm exams will be held from February 15-20. Please review the course materials and prepare accordingly.",
      course: teacherData.subjects[0].name,
      date: "2024-01-25",
      priority: "high"
    },
    {
      id: 2,
      title: "Office Hours Update",
      content: "My office hours for this week have been moved to Thursday 2-4 PM due to a faculty meeting.",
      course: "All Courses",
      date: "2024-01-24",
      priority: "medium"
    },
    {
      id: 3,
      title: "Guest Lecture Next Week",
      content: "We have a special guest lecturer from Industry next Tuesday. Attendance is highly recommended.",
      course: teacherData.subjects[seed % teacherData.subjects.length].name,
      date: "2024-01-23",
      priority: "high"
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2>Announcements</h2>
          <p className="text-muted-foreground">Post updates and announcements to your students</p>
        </div>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          New Announcement
        </Button>
      </div>

      <Card className="p-4">
        <h3 className="mb-4">Create Announcement</h3>
        <div className="space-y-4">
          <div>
            <label className="text-sm mb-2 block">Title</label>
            <Input placeholder="Announcement title..." />
          </div>
          <div>
            <label className="text-sm mb-2 block">Course</label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select course" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Courses</SelectItem>
                {teacherData.subjects.map((subject) => (
                  <SelectItem key={subject.id} value={subject.id}>{subject.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <label className="text-sm mb-2 block">Priority</label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="high">High</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="low">Low</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <label className="text-sm mb-2 block">Content</label>
            <Textarea placeholder="Type your announcement..." rows={4} />
          </div>
          <div className="flex justify-end gap-2">
            <Button variant="outline">Save Draft</Button>
            <Button>
              <Megaphone className="w-4 h-4 mr-2" />
              Post Announcement
            </Button>
          </div>
        </div>
      </Card>

      <Card className="p-4">
        <h3 className="mb-4">Recent Announcements</h3>
        <div className="space-y-3">
          {announcements.map((announcement) => (
            <div key={announcement.id} className="p-4 bg-muted/30 rounded-lg">
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h4>{announcement.title}</h4>
                    <Badge className={
                      announcement.priority === 'high' ? 'bg-red-100 text-red-800' :
                      announcement.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-blue-100 text-blue-800'
                    }>
                      {announcement.priority}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{announcement.course} • {announcement.date}</p>
                </div>
                <div className="flex gap-1">
                  <Button variant="ghost" size="sm"><Edit className="w-4 h-4" /></Button>
                  <Button variant="ghost" size="sm"><Trash2 className="w-4 h-4" /></Button>
                </div>
              </div>
              <p className="text-sm">{announcement.content}</p>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
