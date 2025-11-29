import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../ui/accordion";
import { Badge } from "../ui/badge";
import { HelpCircle, Search, MessageCircle, Book, Video, FileText, Mail, Phone } from "lucide-react";

export function HelpView({ studentData }) {
  // Generate unique help tickets based on student ID
  const seed = parseInt(studentData.id.slice(-3));

  const recentTickets = [
    {
      id: `TKT-${seed}001`,
      subject: "Unable to access course materials",
      status: "resolved",
      date: "2024-01-20",
      category: "Technical"
    },
    {
      id: `TKT-${seed}002`,
      subject: "Grade discrepancy in " + studentData.subjects[seed % studentData.subjects.length].name,
      status: "in-progress",
      date: "2024-01-22",
      category: "Academic"
    }
  ];

  const faqs = [
    {
      question: "How do I submit an assignment?",
      answer: "Navigate to the Assignments page, select the assignment you want to submit, click on 'Submit Assignment', upload your file, and click 'Submit'. You'll receive a confirmation email once submitted."
    },
    {
      question: "How can I check my grades?",
      answer: "Go to the Grades section from the navigation menu. You'll see a complete breakdown of your grades for all courses, including individual assignments and your current CGPA."
    },
    {
      question: "What if I miss a deadline?",
      answer: "Contact your instructor immediately through the Messages section. Depending on your instructor's policy and the circumstances, you may be able to submit late with a penalty or request an extension."
    },
    {
      question: "How do I contact my instructor?",
      answer: "You can send messages to your instructors through the Messages section. Click 'Compose', select the instructor from the dropdown, and send your message."
    },
    {
      question: "Where can I find course materials?",
      answer: "Course materials are available in each course's page under the Courses section. You can also check your instructor's announcements for links to additional resources."
    },
    {
      question: "How is my CGPA calculated?",
      answer: "Your CGPA is calculated based on the weighted average of all your course grades. Each course is weighted by its credit hours. You can view the detailed calculation in the Grades section."
    },
    {
      question: "What should I do if I'm struggling with a course?",
      answer: "Reach out to your instructor during office hours, join study groups with classmates, utilize tutoring services available through the Help Center, or schedule an appointment with your academic advisor."
    },
    {
      question: "How do I reset my password?",
      answer: "Click on 'Forgot Password' on the login page, enter your student ID and registered email address. You'll receive a password reset link via email."
    }
  ];

  const resources = [
    {
      title: "Student Handbook",
      description: "Complete guide to policies, procedures, and academic guidelines",
      icon: Book,
      color: "text-blue-600"
    },
    {
      title: "Video Tutorials",
      description: "Step-by-step guides for using the OutcomeTracker platform",
      icon: Video,
      color: "text-purple-600"
    },
    {
      title: "Documentation",
      description: "Detailed documentation for all platform features",
      icon: FileText,
      color: "text-green-600"
    },
    {
      title: "Live Chat Support",
      description: "Chat with support staff for immediate assistance",
      icon: MessageCircle,
      color: "text-yellow-600"
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case "resolved": return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
      case "in-progress": return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300";
      default: return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300";
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2>Help & Support</h2>
        <p className="text-muted-foreground">Get assistance and find answers to your questions</p>
      </div>

      {/* Quick Actions */}
      <div className="grid md:grid-cols-2 gap-4">
        <Card className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <MessageCircle className="w-6 h-6 text-blue-600" />
            <h3>Submit a Support Ticket</h3>
          </div>
          <p className="text-sm text-muted-foreground mb-4">
            Need help? Submit a ticket and our support team will get back to you.
          </p>
          <Button className="w-full">Create New Ticket</Button>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <Phone className="w-6 h-6 text-green-600" />
            <h3>Emergency Contact</h3>
          </div>
          <p className="text-sm text-muted-foreground mb-2">
            For urgent issues, contact us directly:
          </p>
          <div className="space-y-1 text-sm">
            <p>Phone: +1 (555) 123-4567</p>
            <p>Email: support@outcometracker.edu</p>
            <p>Hours: Mon-Fri, 8 AM - 6 PM</p>
          </div>
        </Card>
      </div>

      {/* Resources */}
      <div>
        <h3 className="mb-4">Help Resources</h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {resources.map((resource, index) => (
            <Card key={index} className="p-4 cursor-pointer hover:bg-accent/50 transition-colors">
              <resource.icon className={`w-8 h-8 mb-3 ${resource.color}`} />
              <h4 className="mb-2">{resource.title}</h4>
              <p className="text-sm text-muted-foreground">{resource.description}</p>
            </Card>
          ))}
        </div>
      </div>

      {/* Recent Support Tickets */}
      <Card className="p-4">
        <div className="flex items-center justify-between mb-4">
          <h3>Your Recent Tickets</h3>
          <Button variant="outline" size="sm">View All</Button>
        </div>
        <div className="space-y-3">
          {recentTickets.map((ticket) => (
            <div key={ticket.id} className="p-3 bg-muted/30 rounded-lg flex items-center justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-sm text-muted-foreground">{ticket.id}</span>
                  <Badge variant="outline">{ticket.category}</Badge>
                </div>
                <h4 className="text-sm">{ticket.subject}</h4>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-sm text-muted-foreground">{ticket.date}</span>
                <Badge className={getStatusColor(ticket.status)}>{ticket.status}</Badge>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* FAQ Search */}
      <Card className="p-4">
        <div className="flex items-center gap-2 mb-4">
          <HelpCircle className="w-5 h-5 text-primary" />
          <h3>Frequently Asked Questions</h3>
        </div>
        <div className="mb-4">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search FAQs..." className="pl-10" />
          </div>
        </div>
        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger>{faq.question}</AccordionTrigger>
              <AccordionContent>
                <p className="text-muted-foreground">{faq.answer}</p>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </Card>

      {/* Contact Form */}
      <Card className="p-4">
        <h3 className="mb-4">Send Us a Message</h3>
        <div className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm mb-2 block">Name</label>
              <Input value={studentData.name} readOnly />
            </div>
            <div>
              <label className="text-sm mb-2 block">Student ID</label>
              <Input value={studentData.id} readOnly />
            </div>
          </div>
          <div>
            <label className="text-sm mb-2 block">Category</label>
            <Input placeholder="Technical, Academic, Administrative, etc." />
          </div>
          <div>
            <label className="text-sm mb-2 block">Subject</label>
            <Input placeholder="Brief description of your issue" />
          </div>
          <div>
            <label className="text-sm mb-2 block">Description</label>
            <Textarea 
              placeholder="Please provide detailed information about your issue or question..." 
              rows={5}
            />
          </div>
          <div className="flex justify-end gap-2">
            <Button variant="outline">Cancel</Button>
            <Button>
              <Mail className="w-4 h-4 mr-2" />
              Submit Request
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
