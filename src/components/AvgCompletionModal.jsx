import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { Card } from "./ui/card";
import { Progress } from "./ui/progress";
import { Badge } from "./ui/badge";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { TrendingUp, Target, BookOpen, Users } from "lucide-react";


const COLORS = ['#22c55e', '#3b82f6', '#f59e0b', '#ef4444'];

export function AvgCompletionModal({ isOpen, onClose, subjects }) {
  const overallCompletion = Math.round(
    subjects.reduce((sum, subject) => sum + subject.completionRate, 0) / subjects.length
  );

  // Prepare data for charts
  const completionData = subjects.map(subject => ({
    name: subject.name.split(' ').slice(0, 2).join(' '), // Shorten names for chart
    completion: subject.completionRate,
    enrolled: subject.enrolledStudents,
    avgGrade: subject.avgGrade
  }));

  const distributionData = [
    { name: 'Excellent (>85%)', value: subjects.filter(s => s.completionRate > 85).length, color: '#22c55e' },
    { name: 'Good (70-85%)', value: subjects.filter(s => s.completionRate >= 70 && s.completionRate <= 85).length, color: '#3b82f6' },
    { name: 'Needs Attention (60-70%)', value: subjects.filter(s => s.completionRate >= 60 && s.completionRate < 70).length, color: '#f59e0b' },
    { name: 'Poor (<60%)', value: subjects.filter(s => s.completionRate < 60).length, color: '#ef4444' }
  ].filter(item => item.value > 0);

  const getCompletionColor = (rate) => {
    if (rate >= 85) return "bg-green-100 text-green-800";
    if (rate >= 70) return "bg-blue-100 text-blue-800";
    if (rate >= 60) return "bg-yellow-100 text-yellow-800";
    return "bg-red-100 text-red-800";
  };

  const getCompletionLabel = (rate) => {
    if (rate >= 85) return "Excellent";
    if (rate >= 70) return "Good";
    if (rate >= 60) return "Needs Attention";
    return "Poor";
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5" />
            Average Completion Rate ({overallCompletion}%)
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Summary Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <Target className="w-4 h-4 text-green-600" />
                <h4 className="text-sm">Overall Rate</h4>
              </div>
              <div className="text-2xl">{overallCompletion}%</div>
              <p className="text-xs text-muted-foreground">Across all courses</p>
            </Card>

            <Card className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <BookOpen className="w-4 h-4 text-blue-600" />
                <h4 className="text-sm">Best Performing</h4>
              </div>
              <div className="text-lg">
                {subjects.reduce((best, current) => 
                  current.completionRate > best.completionRate ? current : best
                ).name.split(' ')[0]}
              </div>
              <p className="text-xs text-muted-foreground">
                {Math.max(...subjects.map(s => s.completionRate))}% completion
              </p>
            </Card>

            <Card className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <Users className="w-4 h-4 text-purple-600" />
                <h4 className="text-sm">Total Students</h4>
              </div>
              <div className="text-2xl">
                {subjects.reduce((sum, subject) => sum + subject.enrolledStudents, 0)}
              </div>
              <p className="text-xs text-muted-foreground">Across all courses</p>
            </Card>

            <Card className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="w-4 h-4 text-yellow-600" />
                <h4 className="text-sm">Above Target</h4>
              </div>
              <div className="text-2xl">
                {subjects.filter(s => s.completionRate >= 80).length}
              </div>
              <p className="text-xs text-muted-foreground">of {subjects.length} courses</p>
            </Card>
          </div>

          {/* Charts Section */}
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="p-4">
              <h4 className="mb-4">Completion Rate by Course</h4>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={completionData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="completion" fill="#3b82f6" />
                </BarChart>
              </ResponsiveContainer>
            </Card>

            <Card className="p-4">
              <h4 className="mb-4">Performance Distribution</h4>
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={distributionData}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    dataKey="value"
                    label={({ name, value }) => `${name}: ${value}`}
                  >
                    {distributionData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </Card>
          </div>

          {/* Detailed Course Breakdown */}
          <Card className="p-4">
            <h4 className="mb-4">Course Details</h4>
            <div className="space-y-4">
              {subjects
                .sort((a, b) => b.completionRate - a.completionRate)
                .map((subject, index) => (
                  <div key={index} className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h5>{subject.name}</h5>
                        <p className="text-sm text-muted-foreground">
                          {subject.enrolledStudents} students enrolled
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge className={getCompletionColor(subject.completionRate)}>
                          {getCompletionLabel(subject.completionRate)}
                        </Badge>
                        <div className="text-right">
                          <div className="text-lg">{subject.completionRate}%</div>
                          <div className="text-xs text-muted-foreground">
                            Avg Grade: {subject.avgGrade}%
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Completion Progress</span>
                        <span>{subject.completionRate}%</span>
                      </div>
                      <Progress value={subject.completionRate} />
                    </div>

                    {/* Learning Outcomes Progress */}
                    <div className="mt-3 grid md:grid-cols-2 gap-2">
                      {subject.outcomes.slice(0, 4).map((outcome, outcomeIndex) => (
                        <div key={outcomeIndex} className="text-xs">
                          <div className="flex justify-between mb-1">
                            <span>{outcome.name}</span>
                            <span>{outcome.completion}%</span>
                          </div>
                          <Progress value={outcome.completion} className="h-1" />
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
            </div>
          </Card>

          {/* Recommendations */}
          <Card className="p-4">
            <h4 className="mb-3">Recommendations</h4>
            <div className="space-y-2 text-sm">
              {subjects.filter(s => s.completionRate < 70).length > 0 && (
                <div className="p-2 bg-yellow-50 border border-yellow-200 rounded">
                  <span className="text-yellow-800">
                    • Consider additional support for courses with completion rates below 70%
                  </span>
                </div>
              )}
              {subjects.filter(s => s.completionRate > 85).length > 0 && (
                <div className="p-2 bg-green-50 border border-green-200 rounded">
                  <span className="text-green-800">
                    • Share best practices from high-performing courses ({subjects.filter(s => s.completionRate > 85).map(s => s.name.split(' ')[0]).join(', ')})
                  </span>
                </div>
              )}
              <div className="p-2 bg-blue-50 border border-blue-200 rounded">
                <span className="text-blue-800">
                  • Target completion rate: 80% or higher for optimal learning outcomes
                </span>
              </div>
            </div>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
}