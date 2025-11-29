import { Card } from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Mail, Send, Inbox, Star, Archive, Search } from "lucide-react";

export function MessagesView({ studentData }) {
  // Generate unique messages based on student ID
  const seed = parseInt(studentData.id.slice(-3));

  const messages = [
    {
      id: 1,
      from: studentData.subjects[0].instructor,
      subject: "Assignment Feedback: " + studentData.subjects[0].recentAssignments[0].name,
      preview: "Great work on your submission! Here are some areas for improvement...",
      date: "2024-01-25",
      read: seed % 2 === 0,
      starred: seed % 3 === 0,
      course: studentData.subjects[0].name
    },
    {
      id: 2,
      from: studentData.subjects[1].instructor,
      subject: "Upcoming Quiz Announcement",
      preview: "Just a reminder that we have a quiz scheduled for next week covering chapters 5-7...",
      date: "2024-01-24",
      read: seed % 2 === 1,
      starred: false,
      course: studentData.subjects[1].name
    },
    {
      id: 3,
      from: studentData.subjects[2].instructor,
      subject: "Office Hours Change",
      preview: "My office hours for this week have been moved to Thursday 2-4 PM...",
      date: "2024-01-23",
      read: true,
      starred: seed % 4 === 0,
      course: studentData.subjects[2].name
    },
    {
      id: 4,
      from: "Academic Advisor",
      subject: "Course Registration for Next Semester",
      preview: "Course registration opens next week. Please schedule an advising appointment...",
      date: "2024-01-22",
      read: seed % 3 === 0,
      starred: false,
      course: "General"
    },
    {
      id: 5,
      from: studentData.subjects[3].instructor,
      subject: "Project Group Formation",
      preview: "Please form groups of 3-4 students for the final project. Submit your group by...",
      date: "2024-01-21",
      read: true,
      starred: seed % 5 === 0,
      course: studentData.subjects[3].name
    },
    {
      id: 6,
      from: studentData.subjects[4].instructor,
      subject: "Lab Session Rescheduled",
      preview: "Due to a scheduling conflict, next week's lab has been moved to...",
      date: "2024-01-20",
      read: seed % 2 === 0,
      starred: false,
      course: studentData.subjects[4].name
    },
    {
      id: 7,
      from: "Department Chair",
      subject: "CS Department Town Hall Meeting",
      preview: "Join us for our semester town hall on Friday at 3 PM in Auditorium 101...",
      date: "2024-01-19",
      read: true,
      starred: false,
      course: "General"
    },
    {
      id: 8,
      from: studentData.subjects[(seed + 1) % studentData.subjects.length].instructor,
      subject: "Extra Credit Opportunity",
      preview: "I'm offering an extra credit assignment worth 5% of your final grade...",
      date: "2024-01-18",
      read: seed % 3 === 1,
      starred: seed % 4 === 0,
      course: studentData.subjects[(seed + 1) % studentData.subjects.length].name
    }
  ];

  const unreadMessages = messages.filter(m => !m.read);
  const starredMessages = messages.filter(m => m.starred);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2>Messages</h2>
          <p className="text-muted-foreground">Communication with instructors and staff</p>
        </div>
        <Button>
          <Send className="w-4 h-4 mr-2" />
          Compose
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid md:grid-cols-3 gap-4">
        <Card className="p-4">
          <div className="flex items-center gap-2 mb-2">
            <Inbox className="w-4 h-4 text-blue-600" />
            <h3>Total Messages</h3>
          </div>
          <div className="text-2xl">{messages.length}</div>
          <p className="text-sm text-muted-foreground">In your inbox</p>
        </Card>

        <Card className="p-4">
          <div className="flex items-center gap-2 mb-2">
            <Mail className="w-4 h-4 text-red-600" />
            <h3>Unread</h3>
          </div>
          <div className="text-2xl">{unreadMessages.length}</div>
          <p className="text-sm text-muted-foreground">New messages</p>
        </Card>

        <Card className="p-4">
          <div className="flex items-center gap-2 mb-2">
            <Star className="w-4 h-4 text-yellow-600" />
            <h3>Starred</h3>
          </div>
          <div className="text-2xl">{starredMessages.length}</div>
          <p className="text-sm text-muted-foreground">Important messages</p>
        </Card>
      </div>

      {/* Search Bar */}
      <Card className="p-4">
        <div className="relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search messages..." className="pl-10" />
        </div>
      </Card>

      {/* Messages Tabs */}
      <Tabs defaultValue="inbox" className="w-full">
        <TabsList>
          <TabsTrigger value="inbox">
            <Inbox className="w-4 h-4 mr-2" />
            Inbox ({messages.length})
          </TabsTrigger>
          <TabsTrigger value="unread">
            <Mail className="w-4 h-4 mr-2" />
            Unread ({unreadMessages.length})
          </TabsTrigger>
          <TabsTrigger value="starred">
            <Star className="w-4 h-4 mr-2" />
            Starred ({starredMessages.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="inbox" className="mt-4">
          <Card className="p-4">
            <h3 className="mb-4">All Messages</h3>
            <div className="space-y-2">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`p-4 rounded-lg border cursor-pointer hover:bg-accent/50 transition-colors ${
                    !message.read ? 'bg-blue-900/10 border-blue-900/30' : 'bg-muted/20 border-border'
                  }`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2 flex-1">
                      {message.starred && <Star className="w-4 h-4 text-yellow-600 fill-yellow-600" />}
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <h4 className={!message.read ? "font-bold" : ""}>{message.subject}</h4>
                          {!message.read && <Badge variant="destructive" className="h-5 px-2 text-xs">New</Badge>}
                        </div>
                        <p className="text-sm text-muted-foreground">From: {message.from}</p>
                      </div>
                    </div>
                    <div className="text-sm text-muted-foreground">{message.date}</div>
                  </div>
                  <p className="text-sm mb-2">{message.preview}</p>
                  <div className="flex items-center justify-between">
                    <Badge variant="outline">{message.course}</Badge>
                    <Button variant="ghost" size="sm">Read More</Button>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="unread" className="mt-4">
          <Card className="p-4">
            <h3 className="mb-4">Unread Messages</h3>
            <div className="space-y-2">
              {unreadMessages.length > 0 ? (
                unreadMessages.map((message) => (
                  <div
                    key={message.id}
                    className="p-4 rounded-lg border bg-blue-900/10 border-blue-900/30 cursor-pointer hover:bg-blue-900/20 transition-colors"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-2 flex-1">
                        {message.starred && <Star className="w-4 h-4 text-yellow-600 fill-yellow-600" />}
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <h4 className="font-bold">{message.subject}</h4>
                            <Badge variant="destructive" className="h-5 px-2 text-xs">New</Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">From: {message.from}</p>
                        </div>
                      </div>
                      <div className="text-sm text-muted-foreground">{message.date}</div>
                    </div>
                    <p className="text-sm mb-2">{message.preview}</p>
                    <div className="flex items-center justify-between">
                      <Badge variant="outline">{message.course}</Badge>
                      <Button variant="ghost" size="sm">Read Now</Button>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-center text-muted-foreground py-8">No unread messages</p>
              )}
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="starred" className="mt-4">
          <Card className="p-4">
            <h3 className="mb-4">Starred Messages</h3>
            <div className="space-y-2">
              {starredMessages.length > 0 ? (
                starredMessages.map((message) => (
                  <div
                    key={message.id}
                    className="p-4 rounded-lg border bg-yellow-900/10 border-yellow-900/30 cursor-pointer hover:bg-yellow-900/20 transition-colors"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-2 flex-1">
                        <Star className="w-4 h-4 text-yellow-600 fill-yellow-600" />
                        <div className="flex-1">
                          <h4 className={!message.read ? "font-bold" : ""}>{message.subject}</h4>
                          <p className="text-sm text-muted-foreground">From: {message.from}</p>
                        </div>
                      </div>
                      <div className="text-sm text-muted-foreground">{message.date}</div>
                    </div>
                    <p className="text-sm mb-2">{message.preview}</p>
                    <div className="flex items-center justify-between">
                      <Badge variant="outline">{message.course}</Badge>
                      <Button variant="ghost" size="sm">Read More</Button>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-center text-muted-foreground py-8">No starred messages</p>
              )}
            </div>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Compose Area */}
      <Card className="p-4">
        <h3 className="mb-4">Quick Reply</h3>
        <div className="space-y-4">
          <div>
            <label className="text-sm mb-2 block">To</label>
            <Input placeholder="Select instructor..." />
          </div>
          <div>
            <label className="text-sm mb-2 block">Subject</label>
            <Input placeholder="Enter subject..." />
          </div>
          <div>
            <label className="text-sm mb-2 block">Message</label>
            <Textarea placeholder="Type your message..." rows={4} />
          </div>
          <div className="flex justify-end gap-2">
            <Button variant="outline">Save Draft</Button>
            <Button>
              <Send className="w-4 h-4 mr-2" />
              Send Message
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
