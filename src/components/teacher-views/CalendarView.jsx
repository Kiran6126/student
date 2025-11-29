import { Card } from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Calendar, Clock, MapPin, Users, Plus } from "lucide-react";

export function CalendarView({ teacherData }) {
  const seed = parseInt(teacherData.lecturer.id.slice(-2));

  // Generate events based on teacher's courses
  const events = [
    {
      id: 1,
      title: `${teacherData.subjects[0].name} - Lecture`,
      date: "2024-02-05",
      time: "10:00 AM - 11:30 AM",
      location: `Room ${301 + seed % 10}`,
      type: "lecture",
      course: teacherData.subjects[0].name,
      attendees: teacherData.subjects[0].enrolledStudents
    },
    {
      id: 2,
      title: `${teacherData.subjects[0].name} - Lab Session`,
      date: "2024-02-06",
      time: "2:00 PM - 4:00 PM",
      location: `Lab ${seed % 5 + 1}`,
      type: "lab",
      course: teacherData.subjects[0].name,
      attendees: teacherData.subjects[0].enrolledStudents
    },
    {
      id: 3,
      title: "Office Hours",
      date: "2024-02-07",
      time: "3:00 PM - 5:00 PM",
      location: `Office ${seed % 20 + 100}`,
      type: "office-hours",
      course: "All Courses",
      attendees: null
    },
    ...(teacherData.subjects.length > 1 ? [{
      id: 4,
      title: `${teacherData.subjects[1].name} - Lecture`,
      date: "2024-02-07",
      time: "9:00 AM - 10:30 AM",
      location: `Room ${302 + seed % 10}`,
      type: "lecture",
      course: teacherData.subjects[1].name,
      attendees: teacherData.subjects[1].enrolledStudents
    }] : []),
    {
      id: 5,
      title: "Faculty Meeting",
      date: "2024-02-08",
      time: "2:00 PM - 3:30 PM",
      location: "Conference Room A",
      type: "meeting",
      course: "Administrative",
      attendees: null
    },
    {
      id: 6,
      title: "Assignment Review Session",
      date: "2024-02-09",
      time: "11:00 AM - 12:00 PM",
      location: `Room ${303 + seed % 10}`,
      type: "review",
      course: teacherData.subjects[seed % teacherData.subjects.length].name,
      attendees: Math.round(teacherData.subjects[0].enrolledStudents * 0.3)
    },
    {
      id: 7,
      title: "Midterm Exam",
      date: "2024-02-12",
      time: "10:00 AM - 12:00 PM",
      location: `Exam Hall ${seed % 3 + 1}`,
      type: "exam",
      course: teacherData.subjects[0].name,
      attendees: teacherData.subjects[0].enrolledStudents
    }
  ];

  const upcomingEvents = events.filter(e => new Date(e.date) >= new Date('2024-02-05'));
  const todayEvents = events.filter(e => e.date === '2024-02-05');

  const getEventColor = (type) => {
    switch (type) {
      case "lecture": return "bg-blue-900/20 border-blue-900/30";
      case "lab": return "bg-purple-900/20 border-purple-900/30";
      case "office-hours": return "bg-green-900/20 border-green-900/30";
      case "meeting": return "bg-yellow-900/20 border-yellow-900/30";
      case "exam": return "bg-red-900/20 border-red-900/30";
      case "review": return "bg-indigo-900/20 border-indigo-900/30";
      default: return "bg-muted/30 border-border";
    }
  };

  const getEventBadgeColor = (type) => {
    switch (type) {
      case "lecture": return "bg-blue-100 text-blue-800";
      case "lab": return "bg-purple-100 text-purple-800";
      case "office-hours": return "bg-green-100 text-green-800";
      case "meeting": return "bg-yellow-100 text-yellow-800";
      case "exam": return "bg-red-100 text-red-800";
      case "review": return "bg-indigo-100 text-indigo-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2>Calendar & Schedule</h2>
          <p className="text-muted-foreground">Manage your teaching schedule and events</p>
        </div>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Add Event
        </Button>
      </div>

      {/* Quick Stats */}
      <div className="grid md:grid-cols-4 gap-4">
        <Card className="p-4">
          <div className="flex items-center gap-2 mb-2">
            <Calendar className="w-4 h-4 text-blue-600" />
            <h3>Today's Events</h3>
          </div>
          <div className="text-2xl">{todayEvents.length}</div>
          <p className="text-sm text-muted-foreground">Scheduled activities</p>
        </Card>

        <Card className="p-4">
          <div className="flex items-center gap-2 mb-2">
            <Clock className="w-4 h-4 text-green-600" />
            <h3>This Week</h3>
          </div>
          <div className="text-2xl">{upcomingEvents.length}</div>
          <p className="text-sm text-muted-foreground">Total events</p>
        </Card>

        <Card className="p-4">
          <div className="flex items-center gap-2 mb-2">
            <Users className="w-4 h-4 text-purple-600" />
            <h3>Office Hours</h3>
          </div>
          <div className="text-2xl">{events.filter(e => e.type === 'office-hours').length}</div>
          <p className="text-sm text-muted-foreground">Sessions this week</p>
        </Card>

        <Card className="p-4">
          <div className="flex items-center gap-2 mb-2">
            <MapPin className="w-4 h-4 text-red-600" />
            <h3>Lectures</h3>
          </div>
          <div className="text-2xl">{events.filter(e => e.type === 'lecture').length}</div>
          <p className="text-sm text-muted-foreground">Classes this week</p>
        </Card>
      </div>

      {/* Today's Schedule */}
      <Card className="p-4">
        <h3 className="mb-4">Today's Schedule - Feb 5, 2024</h3>
        <div className="space-y-3">
          {todayEvents.length > 0 ? (
            todayEvents.map((event) => (
              <div key={event.id} className={`p-4 rounded-lg border ${getEventColor(event.type)}`}>
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4>{event.title}</h4>
                      <Badge className={getEventBadgeColor(event.type)}>
                        {event.type.replace('-', ' ')}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{event.course}</p>
                  </div>
                </div>
                <div className="grid md:grid-cols-3 gap-4 mt-3">
                  <div className="flex items-center gap-2 text-sm">
                    <Clock className="w-4 h-4 text-muted-foreground" />
                    <span>{event.time}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <MapPin className="w-4 h-4 text-muted-foreground" />
                    <span>{event.location}</span>
                  </div>
                  {event.attendees && (
                    <div className="flex items-center gap-2 text-sm">
                      <Users className="w-4 h-4 text-muted-foreground" />
                      <span>{event.attendees} students</span>
                    </div>
                  )}
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-muted-foreground py-8">No events scheduled for today</p>
          )}
        </div>
      </Card>

      {/* Weekly Schedule */}
      <Card className="p-4">
        <h3 className="mb-4">This Week's Schedule</h3>
        <div className="space-y-2">
          {upcomingEvents.map((event) => (
            <div key={event.id} className={`p-4 rounded-lg border ${getEventColor(event.type)} hover:bg-opacity-50 transition-all cursor-pointer`}>
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <Badge variant="outline">{event.date}</Badge>
                    <h4 className="text-sm">{event.title}</h4>
                    <Badge className={getEventBadgeColor(event.type)}>
                      {event.type.replace('-', ' ')}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      <span>{event.time}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      <span>{event.location}</span>
                    </div>
                    {event.attendees && (
                      <div className="flex items-center gap-1">
                        <Users className="w-3 h-3" />
                        <span>{event.attendees} students</span>
                      </div>
                    )}
                  </div>
                </div>
                <Button variant="ghost" size="sm">Details</Button>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Course Schedule Overview */}
      <Card className="p-4">
        <h3 className="mb-4">Course Schedule</h3>
        <div className="grid md:grid-cols-2 gap-4">
          {teacherData.subjects.map((subject, index) => {
            const courseEvents = events.filter(e => e.course === subject.name);
            return (
              <Card key={index} className="p-4 bg-muted/30">
                <h4 className="mb-3">{subject.name}</h4>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Total Sessions:</span>
                    <span className="font-medium">{courseEvents.length}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Lectures:</span>
                    <span className="font-medium">{courseEvents.filter(e => e.type === 'lecture').length}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Labs:</span>
                    <span className="font-medium">{courseEvents.filter(e => e.type === 'lab').length}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Next Session:</span>
                    <span className="font-medium">
                      {courseEvents.length > 0 ? courseEvents[0].date : 'N/A'}
                    </span>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </Card>
    </div>
  );
}
