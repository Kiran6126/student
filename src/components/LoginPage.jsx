import { useState } from "react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Checkbox } from "./ui/checkbox";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { GraduationCap, User, BookOpen, Lock, Mail } from "lucide-react";
import { students } from "../data/students";
import { teachers } from "../data/teachers";
import { getRandomCode } from "../data/authCodes";
import { SignupForm } from "./SignupForm";

export function LoginPage({ onLogin }) {
  const [studentCredentials, setStudentCredentials] = useState({ id: "", password: "" });
  const [lecturerCredentials, setLecturerCredentials] = useState({ id: "", password: "" });
  const [studentError, setStudentError] = useState("");
  const [lecturerError, setLecturerError] = useState("");
  const [rememberStudent, setRememberStudent] = useState(false);
  const [rememberLecturer, setRememberLecturer] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  // Authenticator CAPTCHA-style codes for student & lecturer logins
  const [studentCaptcha, setStudentCaptcha] = useState(() => getRandomCode());
  const [studentCaptchaInput, setStudentCaptchaInput] = useState("");
  const [lecturerCaptcha, setLecturerCaptcha] = useState(() => getRandomCode());
  const [lecturerCaptchaInput, setLecturerCaptchaInput] = useState("");

  const handleStudentLogin = (e) => {
    e.preventDefault();
    setStudentError("");
    // Verify authenticator code
    if (!studentCaptchaInput || studentCaptchaInput.trim() !== studentCaptcha) {
      setStudentError("Invalid authenticator code. Please enter the code shown.");
      return;
    }
    const student = students.find(
      s => s.id === studentCredentials.id && s.password === studentCredentials.password
    );
    
    if (student) {
      onLogin('student', student, rememberStudent);
    } else {
      setStudentError("Invalid Student ID or password");
    }
  };

  const handleSignupSuccess = (newUser) => {
    setShowSignup(false);
  };

  const handleLecturerLogin = (e) => {
    e.preventDefault();
    setLecturerError("");
    // Verify authenticator code
    if (!lecturerCaptchaInput || lecturerCaptchaInput.trim() !== lecturerCaptcha) {
      setLecturerError("Invalid authenticator code. Please enter the code shown.");
      return;
    }
    const lecturer = teachers.find(
      l => l.id === lecturerCredentials.id && l.password === lecturerCredentials.password
    );
    
    if (lecturer) {
      onLogin('lecturer', lecturer, rememberLecturer);
    } else {
      setLecturerError("Invalid Teacher ID or password");
    }
  };

  const refreshStudentCaptcha = () => {
    setStudentCaptcha(getRandomCode());
    setStudentCaptchaInput("");
  };

  const refreshLecturerCaptcha = () => {
    setLecturerCaptcha(getRandomCode());
    setLecturerCaptchaInput("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f1419] via-[#1a1f2e] to-[#1a3a3a] flex items-center justify-center p-4">
      {showSignup ? (
        <div className="w-full">
          <button
            onClick={() => setShowSignup(false)}
            className="absolute top-4 left-4 text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2"
          >
            ← Back to Login
          </button>
          <SignupForm onSignupSuccess={handleSignupSuccess} />
        </div>
      ) : (
        <Card className="w-full max-w-md p-8 shadow-2xl border-2 border-[#2a4a5a]/60 bg-gradient-to-b from-[#1a2332] to-[#15202b] relative overflow-hidden">
        {/* Decorative background elements */}
        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-[#2a4a5a]/20 to-transparent pointer-events-none" />
        <div className="absolute -top-20 -right-20 w-40 h-40 bg-[#1a3a3a]/30 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-[#2a4a5a]/20 rounded-full blur-3xl pointer-events-none" />
        
        {/* Header - Highlighted */}
        <div className="text-center mb-8 relative z-10">
          <div className="inline-block p-4 rounded-2xl bg-gradient-to-br from-[#2a4a5a]/30 to-[#1a3a3a]/30 border-2 border-[#3a5a6a]/50 shadow-lg shadow-[#1a3a3a]/50 mb-4">
            <div className="flex items-center justify-center gap-3">
              <div className="p-2 rounded-lg bg-[#2a4a5a]/40 border border-[#3a5a6a]/30">
                <GraduationCap className="w-8 h-8 text-[#4a9eff]" />
              </div>
              <h1 className="text-3xl bg-gradient-to-r from-[#5ab4ff] via-[#4a9eff] to-[#3a8aef] bg-clip-text text-transparent drop-shadow-lg">
                OutcomeTracker
              </h1>
            </div>
          </div>
          <p className="text-muted-foreground">Computer Science Learning Management</p>
        </div>

        <Tabs defaultValue="student" className="w-full relative z-10">
          <TabsList className="grid w-full grid-cols-2 h-12 bg-[#0f1419]/80 border border-[#2a4a5a]/40 p-1">
            <TabsTrigger value="student" className="flex items-center gap-2 data-[state=active]:bg-gradient-to-br data-[state=active]:from-[#2a4a5a]/40 data-[state=active]:to-[#1a3a3a]/40 data-[state=active]:border data-[state=active]:border-[#3a5a6a]/60 data-[state=active]:shadow-lg">
              <User className="w-4 h-4" />
              Student
            </TabsTrigger>
            <TabsTrigger value="lecturer" className="flex items-center gap-2 data-[state=active]:bg-gradient-to-br data-[state=active]:from-[#2a4a5a]/40 data-[state=active]:to-[#1a3a3a]/40 data-[state=active]:border data-[state=active]:border-[#3a5a6a]/60 data-[state=active]:shadow-lg">
              <BookOpen className="w-4 h-4" />
              Lecturer
            </TabsTrigger>
          </TabsList>

          <TabsContent value="student" className="mt-4">
            <form onSubmit={handleStudentLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="student-id">Student ID</Label>
                <div className="relative">
                  <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="student-id"
                    type="text"
                    placeholder="1234500001"
                    className="pl-10"
                    autoComplete="username"
                    value={studentCredentials.id}
                    onChange={(e) => setStudentCredentials({...studentCredentials, id: e.target.value})}
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="student-password">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="student-password"
                    type="password"
                    placeholder="Enter your password"
                    className="pl-10"
                    autoComplete="current-password"
                    value={studentCredentials.password}
                    onChange={(e) => setStudentCredentials({...studentCredentials, password: e.target.value})}
                    required
                  />
                </div>
              </div>
              {/* Authenticator code display */}
              <div className="space-y-2">
                <Label>Authenticator Code</Label>
                <div className="flex items-center gap-3">
                  <div className="px-4 py-2 bg-gradient-to-br from-[#10151a] to-[#16212a] rounded-md font-mono tracking-widest text-lg text-foreground border border-[#2a4a5a]">
                    {studentCaptcha}
                  </div>
                  <Button variant="outline" size="sm" onClick={refreshStudentCaptcha}>Refresh</Button>
                </div>
                <Input
                  id="student-authenticator"
                  name="student-authenticator"
                  type="text"
                  placeholder="Enter the code shown"
                  value={studentCaptchaInput}
                  onChange={(e) => setStudentCaptchaInput(e.target.value)}
                  maxLength={6}
                  required
                />
              </div>
              
              {/* Remember Me Checkbox with Highlight */}
              <div className="flex items-center space-x-2 p-3 rounded-lg bg-[#1a3a3a]/30 border-2 border-[#2a4a5a]/40 hover:border-[#3a5a6a]/60 transition-colors">
                  <Checkbox 
                  id="remember-student" 
                  checked={rememberStudent}
                  onCheckedChange={(checked) => setRememberStudent(!!checked)}
                  className="data-[state=checked]:bg-[#4a9eff] data-[state=checked]:border-[#3a8aef]"
                />
                <label
                  htmlFor="remember-student"
                  className="text-sm cursor-pointer select-none"
                >
                  Remember me
                </label>
              </div>
              
              {studentError && (
                <p className="text-sm text-destructive">{studentError}</p>
              )}
              <Button type="submit" className="w-full">
                Sign In as Student
              </Button>
            </form>
          </TabsContent>

          <TabsContent value="lecturer" className="mt-4">
            <form onSubmit={handleLecturerLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="lecturer-id">Teacher ID</Label>
                <div className="relative">
                  <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="lecturer-id"
                    type="text"
                    placeholder="20001"
                    className="pl-10"
                    autoComplete="username"
                    value={lecturerCredentials.id}
                    onChange={(e) => setLecturerCredentials({...lecturerCredentials, id: e.target.value})}
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="lecturer-password">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="lecturer-password"
                    type="password"
                    placeholder="Enter your password"
                    className="pl-10"
                    autoComplete="current-password"
                    value={lecturerCredentials.password}
                    onChange={(e) => setLecturerCredentials({...lecturerCredentials, password: e.target.value})}
                    required
                  />
                </div>
              </div>
              {/* Authenticator code display */}
              <div className="space-y-2">
                <Label>Authenticator Code</Label>
                <div className="flex items-center gap-3">
                  <div className="px-4 py-2 bg-gradient-to-br from-[#10151a] to-[#16212a] rounded-md font-mono tracking-widest text-lg text-foreground border border-[#2a4a5a]">
                    {lecturerCaptcha}
                  </div>
                  <Button variant="outline" size="sm" onClick={refreshLecturerCaptcha}>Refresh</Button>
                </div>
                <Input
                  id="lecturer-authenticator"
                  name="lecturer-authenticator"
                  type="text"
                  placeholder="Enter the code shown"
                  value={lecturerCaptchaInput}
                  onChange={(e) => setLecturerCaptchaInput(e.target.value)}
                  maxLength={6}
                  required
                />
              </div>
              
              {/* Remember Me Checkbox with Highlight */}
              <div className="flex items-center space-x-2 p-3 rounded-lg bg-[#1a3a3a]/30 border-2 border-[#2a4a5a]/40 hover:border-[#3a5a6a]/60 transition-colors">
                <Checkbox 
                  id="remember-lecturer" 
                  checked={rememberLecturer}
                  onCheckedChange={(checked) => setRememberLecturer(!!checked)}
                  className="data-[state=checked]:bg-[#4a9eff] data-[state=checked]:border-[#3a8aef]"
                />
                <label
                  htmlFor="remember-lecturer"
                  className="text-sm cursor-pointer select-none"
                >
                  Remember me
                </label>
              </div>
              
              {lecturerError && (
                <p className="text-sm text-destructive">{lecturerError}</p>
              )}
              <Button type="submit" className="w-full">
                Sign In as Lecturer
              </Button>
            </form>
          </TabsContent>
        </Tabs>

        <div className="mt-6 pt-6 border-t border-[#2a4a5a]/40 text-center">
          <p className="text-muted-foreground text-sm mb-3">Don't have an account?</p>
          <Button
            variant="outline"
            className="w-full"
            onClick={() => setShowSignup(true)}
          >
            Create New Account
          </Button>
        </div>
      </Card>
      )}
    </div>
  );
}