import { Card } from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Plus, FileText, Video, Link, Upload, Edit, Trash2 } from "lucide-react";

export function CourseBuilderView({ teacherData }) {
  const seed = parseInt(teacherData.lecturer.id.slice(-2));

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2>Course Builder</h2>
          <p className="text-muted-foreground">Create and organize course content and materials</p>
        </div>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Add Content
        </Button>
      </div>

      <Tabs defaultValue={teacherData.subjects[0].id} className="w-full">
        <TabsList>
          {teacherData.subjects.map((subject) => (
            <TabsTrigger key={subject.id} value={subject.id}>
              {subject.name.split(' ')[0]}
            </TabsTrigger>
          ))}
        </TabsList>

        {teacherData.subjects.map((subject, subIndex) => (
          <TabsContent key={subject.id} value={subject.id} className="mt-4 space-y-4">
            {/* Course Overview */}
            <Card className="p-6">
              <h3 className="mb-4">Course Structure</h3>
              <div className="space-y-4">
                {/* Modules */}
                {[1, 2, 3, 4].map((moduleNum) => (
                  <Card key={moduleNum} className="p-4 bg-muted/30">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <Badge>Module {moduleNum}</Badge>
                        <h4>
                          {subject.outcomes[moduleNum - 1]?.name || `Module ${moduleNum}`}
                        </h4>
                      </div>
                      <div className="flex gap-1">
                        <Button variant="ghost" size="sm">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>

                    {/* Content Items */}
                    <div className="ml-4 space-y-2">
                      <div className="flex items-center gap-2 p-2 bg-background rounded text-sm">
                        <FileText className="w-4 h-4 text-blue-600" />
                        <span>Lecture Notes - Week {moduleNum}</span>
                        <Badge variant="outline" className="ml-auto">PDF</Badge>
                      </div>
                      <div className="flex items-center gap-2 p-2 bg-background rounded text-sm">
                        <Video className="w-4 h-4 text-purple-600" />
                        <span>Video Tutorial {moduleNum}</span>
                        <Badge variant="outline" className="ml-auto">45 min</Badge>
                      </div>
                      {moduleNum <= 2 && (
                        <div className="flex items-center gap-2 p-2 bg-background rounded text-sm">
                          <Link className="w-4 h-4 text-green-600" />
                          <span>External Resources</span>
                          <Badge variant="outline" className="ml-auto">Links</Badge>
                        </div>
                      )}
                    </div>

                    <Button variant="ghost" size="sm" className="mt-2">
                      <Plus className="w-3 h-3 mr-2" />
                      Add Content to Module
                    </Button>
                  </Card>
                ))}
              </div>

              <Button variant="outline" className="w-full mt-4">
                <Plus className="w-4 h-4 mr-2" />
                Add New Module
              </Button>
            </Card>

            {/* Upload New Content */}
            <Card className="p-6">
              <h3 className="mb-4">Upload New Content</h3>
              <div className="space-y-4">
                <div>
                  <label className="text-sm mb-2 block">Content Type</label>
                  <div className="grid grid-cols-4 gap-2">
                    <Button variant="outline" className="h-20 flex flex-col gap-2">
                      <FileText className="w-6 h-6" />
                      <span className="text-xs">Document</span>
                    </Button>
                    <Button variant="outline" className="h-20 flex flex-col gap-2">
                      <Video className="w-6 h-6" />
                      <span className="text-xs">Video</span>
                    </Button>
                    <Button variant="outline" className="h-20 flex flex-col gap-2">
                      <Link className="w-6 h-6" />
                      <span className="text-xs">Link</span>
                    </Button>
                    <Button variant="outline" className="h-20 flex flex-col gap-2">
                      <Upload className="w-6 h-6" />
                      <span className="text-xs">File</span>
                    </Button>
                  </div>
                </div>

                <div>
                  <label className="text-sm mb-2 block">Title</label>
                  <Input placeholder="Content title..." />
                </div>

                <div>
                  <label className="text-sm mb-2 block">Description</label>
                  <Textarea placeholder="Brief description..." rows={3} />
                </div>

                <div className="flex gap-2">
                  <Button variant="outline" className="flex-1">
                    <Upload className="w-4 h-4 mr-2" />
                    Upload File
                  </Button>
                  <Button className="flex-1">Save Content</Button>
                </div>
              </div>
            </Card>

            {/* Course Settings */}
            <Card className="p-6">
              <h3 className="mb-4">Course Settings</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-4 bg-muted/30 rounded">
                  <h4 className="mb-2">Syllabus</h4>
                  <p className="text-sm text-muted-foreground mb-3">
                    Last updated: {seed % 2 === 0 ? "Jan 15, 2024" : "Jan 20, 2024"}
                  </p>
                  <Button variant="outline" size="sm">Edit Syllabus</Button>
                </div>
                <div className="p-4 bg-muted/30 rounded">
                  <h4 className="mb-2">Grading Policy</h4>
                  <p className="text-sm text-muted-foreground mb-3">
                    Assignments: 40%, Exams: 60%
                  </p>
                  <Button variant="outline" size="sm">Update Policy</Button>
                </div>
                <div className="p-4 bg-muted/30 rounded">
                  <h4 className="mb-2">Prerequisites</h4>
                  <p className="text-sm text-muted-foreground mb-3">
                    {subIndex === 0 ? "None" : `CS${300 + subIndex - 1}`}
                  </p>
                  <Button variant="outline" size="sm">Manage Prerequisites</Button>
                </div>
                <div className="p-4 bg-muted/30 rounded">
                  <h4 className="mb-2">Course Duration</h4>
                  <p className="text-sm text-muted-foreground mb-3">
                    16 weeks, {3 + (seed % 2)} credits
                  </p>
                  <Button variant="outline" size="sm">Edit Details</Button>
                </div>
              </div>
            </Card>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
