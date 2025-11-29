import { Card } from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Mail, Send, Inbox, Star } from "lucide-react";

export function MessagesView({ teacherData }) {
  const seed = parseInt(teacherData.lecturer.id.slice(-2));
  
  const messages = [
    {
      id: 1,
      from: `Student ${1234500000 + seed}`,
      subject: "Question about Assignment",
      preview: "I have a question regarding the latest assignment deadline...",
      date: "2024-01-25",
      read: seed % 2 === 0,
      starred: false,
      course: teacherData.subjects[0].name
    },
    {
      id: 2,
      from: `Student ${1234500000 + seed + 10}`,
      subject: "Request for Office Hours",
      preview: "Could I schedule a meeting during your office hours to discuss my project?",
      date: "2024-01-24",
      read: false,
      starred: seed % 3 === 0,
      course: teacherData.subjects[0].name
    },
    {
      id: 3,
      from: "Department Chair",
      subject: "Faculty Meeting Schedule",
      preview: "The next faculty meeting is scheduled for February 1st at 2 PM...",
      date: "2024-01-23",
      read: true,
      starred: true,
      course: "Administrative"
    }
  ];

  const unreadCount = messages.filter(m => !m.read).length;
  const starredCount = messages.filter(m => m.starred).length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2>Messages</h2>
          <p className="text-muted-foreground">Communicate with students and colleagues</p>
        </div>
        <Button>
          <Send className="w-4 h-4 mr-2" />
          Compose
        </Button>
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        <Card className="p-4">
          <div className="flex items-center gap-2 mb-2">
            <Inbox className="w-4 h-4 text-blue-600" />
            <h3>Total</h3>
          </div>
          <div className="text-2xl">{messages.length}</div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center gap-2 mb-2">
            <Mail className="w-4 h-4 text-red-600" />
            <h3>Unread</h3>
          </div>
          <div className="text-2xl">{unreadCount}</div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center gap-2 mb-2">
            <Star className="w-4 h-4 text-yellow-600" />
            <h3>Starred</h3>
          </div>
          <div className="text-2xl">{starredCount}</div>
        </Card>
      </div>

      <Tabs defaultValue="inbox">
        <TabsList>
          <TabsTrigger value="inbox">Inbox</TabsTrigger>
          <TabsTrigger value="sent">Sent</TabsTrigger>
          <TabsTrigger value="starred">Starred</TabsTrigger>
        </TabsList>

        <TabsContent value="inbox" className="mt-4">
          <Card className="p-4">
            <div className="space-y-3">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`p-4 rounded-lg border cursor-pointer hover:bg-accent/50 transition-colors ${
                    !message.read ? 'bg-blue-900/10 border-blue-900/30' : 'bg-muted/20'
                  }`}
                >
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h4 className={!message.read ? "font-bold" : ""}>{message.subject}</h4>
                      <p className="text-sm text-muted-foreground">From: {message.from}</p>
                    </div>
                    <span className="text-sm text-muted-foreground">{message.date}</span>
                  </div>
                  <p className="text-sm mb-2">{message.preview}</p>
                  <Badge variant="outline">{message.course}</Badge>
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>
      </Tabs>

      <Card className="p-4">
        <h3 className="mb-4">Quick Reply</h3>
        <div className="space-y-4">
          <Input placeholder="To..." />
          <Input placeholder="Subject..." />
          <Textarea placeholder="Message..." rows={4} />
          <Button>
            <Send className="w-4 h-4 mr-2" />
            Send
          </Button>
        </div>
      </Card>
    </div>
  );
}
