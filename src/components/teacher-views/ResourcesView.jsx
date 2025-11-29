import { Card } from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { FileText, Video, Link as LinkIcon, Image, File, Upload, Download, Folder, Search, Plus } from "lucide-react";

export function ResourcesView({ teacherData }) {
  const seed = parseInt(teacherData.lecturer.id.slice(-2));

  const getResourceIcon = (type) => {
    switch (type) {
      case "pdf": return <FileText className="w-5 h-5 text-red-600" />;
      case "video": return <Video className="w-5 h-5 text-purple-600" />;
      case "link": return <LinkIcon className="w-5 h-5 text-blue-600" />;
      case "image": return <Image className="w-5 h-5 text-green-600" />;
      default: return <File className="w-5 h-5 text-gray-600" />;
    }
  };

  const generateResources = (subject, subIndex) => {
    return [
      {
        name: `${subject.name} - Course Syllabus`,
        type: "pdf",
        size: "2.5 MB",
        uploadDate: "2024-01-10",
        downloads: 35 + (seed + subIndex) % 20,
        folder: "Course Materials"
      },
      {
        name: "Week 1 - Introduction Slides",
        type: "pdf",
        size: "5.2 MB",
        uploadDate: "2024-01-15",
        downloads: 32 + (seed + subIndex) % 15,
        folder: "Lecture Slides"
      },
      {
        name: "Tutorial Video - Basics",
        type: "video",
        size: "125 MB",
        uploadDate: "2024-01-16",
        downloads: 28 + (seed + subIndex) % 18,
        folder: "Videos"
      },
      {
        name: "Assignment Template",
        type: "pdf",
        size: "1.8 MB",
        uploadDate: "2024-01-18",
        downloads: 30 + (seed + subIndex) % 12,
        folder: "Assignments"
      },
      {
        name: "Reference Documentation",
        type: "link",
        size: "-",
        uploadDate: "2024-01-12",
        downloads: 45 + (seed + subIndex) % 25,
        folder: "References"
      },
      {
        name: "Lab Exercise 1",
        type: "pdf",
        size: "3.2 MB",
        uploadDate: "2024-01-20",
        downloads: 27 + (seed + subIndex) % 10,
        folder: "Lab Materials"
      },
      {
        name: "Sample Code Repository",
        type: "link",
        size: "-",
        uploadDate: "2024-01-14",
        downloads: 38 + (seed + subIndex) % 16,
        folder: "Code Samples"
      },
      {
        name: "Midterm Study Guide",
        type: "pdf",
        size: "4.1 MB",
        uploadDate: "2024-01-22",
        downloads: 41 + (seed + subIndex) % 14,
        folder: "Exam Preparation"
      }
    ];
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2>Course Resources</h2>
          <p className="text-muted-foreground">Manage and share course materials with students</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Folder className="w-4 h-4 mr-2" />
            New Folder
          </Button>
          <Button>
            <Upload className="w-4 h-4 mr-2" />
            Upload Files
          </Button>
        </div>
      </div>

      {/* Storage Overview */}
      <div className="grid md:grid-cols-4 gap-4">
        <Card className="p-4">
          <div className="flex items-center gap-2 mb-2">
            <File className="w-4 h-4 text-blue-600" />
            <h3>Total Files</h3>
          </div>
          <div className="text-2xl">
            {teacherData.subjects.length * 8}
          </div>
          <p className="text-sm text-muted-foreground">Across all courses</p>
        </Card>

        <Card className="p-4">
          <div className="flex items-center gap-2 mb-2">
            <FileText className="w-4 h-4 text-red-600" />
            <h3>Documents</h3>
          </div>
          <div className="text-2xl">
            {teacherData.subjects.length * 5}
          </div>
          <p className="text-sm text-muted-foreground">PDF files</p>
        </Card>

        <Card className="p-4">
          <div className="flex items-center gap-2 mb-2">
            <Video className="w-4 h-4 text-purple-600" />
            <h3>Videos</h3>
          </div>
          <div className="text-2xl">
            {teacherData.subjects.length * 1}
          </div>
          <p className="text-sm text-muted-foreground">Video tutorials</p>
        </Card>

        <Card className="p-4">
          <div className="flex items-center gap-2 mb-2">
            <Download className="w-4 h-4 text-green-600" />
            <h3>Total Downloads</h3>
          </div>
          <div className="text-2xl">
            {280 + (seed * 10)}
          </div>
          <p className="text-sm text-muted-foreground">By students</p>
        </Card>
      </div>

      {/* Search Bar */}
      <Card className="p-4">
        <div className="relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search resources..." className="pl-10" />
        </div>
      </Card>

      {/* Resources by Course */}
      <Tabs defaultValue={teacherData.subjects[0].id} className="w-full">
        <TabsList>
          {teacherData.subjects.map((subject) => (
              <TabsTrigger key={subject.id} value={subject.id}>
                {subject.name.split(' ')[0]}
              </TabsTrigger>
            ))}
        </TabsList>

  {teacherData.subjects.map((subject, subIndex) => {
          const resources = generateResources(subject, subIndex);
          const folders = [...new Set(resources.map(r => r.folder))];

          return (
            <TabsContent key={subject.id} value={subject.id} className="mt-4 space-y-4">
              {/* Quick Upload */}
              <Card className="p-4 bg-muted/30 border-dashed">
                <div className="flex items-center justify-center gap-4 py-6">
                  <Upload className="w-8 h-8 text-muted-foreground" />
                  <div>
                    <h4>Drag and drop files here</h4>
                    <p className="text-sm text-muted-foreground">
                      or click to browse (Max 100MB per file)
                    </p>
                  </div>
                  <Button>Browse Files</Button>
                </div>
              </Card>

              {/* Folders */}
              <Card className="p-4">
                <h3 className="mb-4">Folders</h3>
                <div className="grid md:grid-cols-4 gap-3">
                  {folders.map((folder, fIndex) => {
                    const folderResources = resources.filter(r => r.folder === folder);
                    return (
                      <div key={fIndex} className="p-4 bg-muted/30 rounded-lg cursor-pointer hover:bg-muted/50 transition-colors">
                        <div className="flex items-center gap-2 mb-2">
                          <Folder className="w-5 h-5 text-yellow-600" />
                          <h4 className="text-sm">{folder}</h4>
                        </div>
                        <p className="text-xs text-muted-foreground">
                          {folderResources.length} {folderResources.length === 1 ? 'file' : 'files'}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </Card>

              {/* Files List */}
              <Card className="p-4">
                <div className="flex items-center justify-between mb-4">
                  <h3>All Files</h3>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <Download className="w-4 h-4 mr-2" />
                      Download All
                    </Button>
                  </div>
                </div>
                <div className="space-y-2">
                  {resources.map((resource, rIndex) => (
                    <div key={rIndex} className="flex items-center justify-between p-3 bg-muted/20 rounded-lg hover:bg-muted/40 transition-colors">
                      <div className="flex items-center gap-3 flex-1">
                        {getResourceIcon(resource.type)}
                        <div className="flex-1">
                          <h4 className="text-sm">{resource.name}</h4>
                          <div className="flex items-center gap-3 text-xs text-muted-foreground">
                            <span>{resource.folder}</span>
                            <span>•</span>
                            <span>{resource.size}</span>
                            <span>•</span>
                            <span>Uploaded {resource.uploadDate}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Badge variant="outline">
                          {resource.downloads} downloads
                        </Badge>
                        <Button variant="ghost" size="sm">
                          <Download className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Resource Statistics */}
              <Card className="p-4">
                <h3 className="mb-4">Resource Statistics</h3>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="p-4 bg-muted/30 rounded">
                    <h4 className="mb-2">Most Downloaded</h4>
                    <p className="text-sm">{resources.sort((a, b) => b.downloads - a.downloads)[0].name}</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {resources.sort((a, b) => b.downloads - a.downloads)[0].downloads} downloads
                    </p>
                  </div>
                  <div className="p-4 bg-muted/30 rounded">
                    <h4 className="mb-2">Recently Added</h4>
                    <p className="text-sm">{resources.sort((a, b) => new Date(b.uploadDate).getTime() - new Date(a.uploadDate).getTime())[0].name}</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {resources.sort((a, b) => new Date(b.uploadDate).getTime() - new Date(a.uploadDate).getTime())[0].uploadDate}
                    </p>
                  </div>
                  <div className="p-4 bg-muted/30 rounded">
                    <h4 className="mb-2">Total Size</h4>
                    <p className="text-sm">
                      {resources.reduce((sum, r) => {
                        const size = parseFloat(r.size);
                        return sum + (isNaN(size) ? 0 : size);
                      }, 0).toFixed(1)} MB
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {resources.length} files
                    </p>
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
