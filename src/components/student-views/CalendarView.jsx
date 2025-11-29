import { Card } from "../ui/card";
import { Badge } from "../ui/badge";
import { Calendar as CalendarIcon, Clock } from "lucide-react";

export function CalendarView({ studentData }) {
  // Collect all assignments with dates
  const allEvents = studentData.subjects.flatMap((subject) =>
    subject.recentAssignments.map((assignment) => ({
      ...assignment,
      courseName: subject.name,
      courseId: subject.id
    }))
  ).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const upcomingEvents = allEvents.filter((e) => e.status === 'pending' || e.status === 'in-progress');
  const completedEvents = allEvents.filter((e) => e.status === 'graded' || e.status === 'submitted');

  return (
    <div className="space-y-6">
      <div>
        <h2>Calendar & Schedule</h2>
        <p className="text-muted-foreground">View all your important dates and deadlines</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Upcoming Deadlines */}
        <Card className="p-4">
          <div className="flex items-center gap-2 mb-4">
            <CalendarIcon className="w-5 h-5 text-yellow-600" />
            <h3>Upcoming Deadlines</h3>
          </div>
          <div className="space-y-3">
            {upcomingEvents.length > 0 ? (
              upcomingEvents.map((event, index) => (
                <div key={index} className="p-3 bg-yellow-900/20 rounded border border-yellow-900/30">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h4 className="text-sm">{event.name}</h4>
                      <p className="text-xs text-muted-foreground">{event.courseName}</p>
                    </div>
                    <Badge variant="outline">{event.status}</Badge>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Clock className="w-3 h-3" />
                    <span>{event.date}</span>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-sm text-muted-foreground">No upcoming deadlines</p>
            )}
          </div>
        </Card>

        {/* Completed Assignments */}
        <Card className="p-4">
          <div className="flex items-center gap-2 mb-4">
            <CalendarIcon className="w-5 h-5 text-green-600" />
            <h3>Recently Completed</h3>
          </div>
          <div className="space-y-3">
            {completedEvents.slice(0, 5).map((event, index) => (
              <div key={index} className="p-3 bg-green-900/20 rounded border border-green-900/30">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h4 className="text-sm">{event.name}</h4>
                    <p className="text-xs text-muted-foreground">{event.courseName}</p>
                  </div>
                  {event.score && (
                    <Badge className="bg-green-100 text-green-800">{event.score}%</Badge>
                  )}
                </div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Clock className="w-3 h-3" />
                  <span>{event.date}</span>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* All Events Timeline */}
      <Card className="p-4">
        <h3 className="mb-4">Complete Timeline</h3>
        <div className="space-y-2">
          {allEvents.map((event, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-muted/30 rounded hover:bg-muted/50 transition-colors">
              <div className="flex-1">
                <div className="flex items-center gap-3">
                  <div className="text-sm">{event.date}</div>
                  <div className="w-px h-8 bg-border"></div>
                  <div>
                    <div className="text-sm">{event.name}</div>
                    <div className="text-xs text-muted-foreground">{event.courseName}</div>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {event.score ? (
                  <Badge variant="secondary">{event.score}%</Badge>
                ) : (
                  <Badge variant="outline">{event.status}</Badge>
                )}
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
