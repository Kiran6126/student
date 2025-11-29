import { Card } from "./ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { Badge } from "./ui/badge";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Label } from "./ui/label";
import * as React from "react";
import { useState, useMemo, useCallback } from "react";
import { Search, Plus, Edit2, Trash2 } from "lucide-react";
import { getStudents, createStudent, updateStudent, deleteStudent, flushStudents } from "../data/storage";

export function StudentsListView() {
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [students, setStudents] = useState(getStudents());
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({ id: "", name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Memoize generated performance data to avoid regenerating on every render
  const studentsWithGrades = useMemo(() => {
    return students.map((student, index) => ({
      ...student,
      cgpa: (3.0 + Math.random() * 1.0).toFixed(2),
      attendance: Math.floor(70 + Math.random() * 30),
      status: index % 3 === 0 ? "Excellent" : index % 3 === 1 ? "Good" : "Average"
    }));
  }, [students]);

  // Debounce search input to avoid heavy filtering on every keystroke
  React.useEffect(() => {
    const t = setTimeout(() => setDebouncedSearch(searchTerm), 200);
    return () => clearTimeout(t);
  }, [searchTerm]);

  const filteredStudents = useMemo(() => {
    const q = debouncedSearch.toLowerCase();
    return studentsWithGrades.filter(
      student => student.name.toLowerCase().includes(q) || student.id.includes(q)
    );
  }, [studentsWithGrades, debouncedSearch]);

  const getStatusColor = useCallback((status) => {
    switch (status) {
      case "Excellent": return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
      case "Good": return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300";
      case "Average": return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300";
      default: return "bg-gray-100 text-gray-800";
    }
  }, []);

  // Generate email from student ID (roll number)
  // Pattern: student ID last 3 digits, lowercase name without spaces
  const generateEmail = (id, name) => {
    if (!id || !name) return "";
    const rollNum = id.slice(-3); // Last 3 digits
    const namePart = name.toLowerCase().replace(/\s+/g, ".");
    return `${namePart}.${rollNum}@university.edu`;
  };

  // Generate password from student ID (roll number)
  // Pattern: Student@XXX (where XXX is last 3 digits of ID)
  const generatePassword = (id) => {
    if (!id) return "";
    const rollNum = id.slice(-3);
    return `Student@${rollNum}`;
  };

  const resetForm = () => {
    setFormData({ id: "", name: "", email: "", password: "" });
    setError("");
    setEditingId(null);
  };

  const handleOpenCreate = () => {
    resetForm();
    setIsCreateOpen(true);
  };

  const handleIdChange = (newId) => {
    setFormData({
      ...formData,
      id: newId,
      email: generateEmail(newId, formData.name),
      password: generatePassword(newId)
    });
  };

  const handleNameChange = (newName) => {
    setFormData({
      ...formData,
      name: newName,
      email: generateEmail(formData.id, newName)
    });
  };

  const handleSave = () => {
    setError("");
    setSuccess("");

    if (!formData.id || !formData.name || !formData.email) {
      setError("ID, Name, and Email are required");
      return;
    }

    try {
      if (editingId) {
        // Update mode
        updateStudent(editingId, {
          name: formData.name,
          email: formData.email,
          password: formData.password
        });
          const created = createStudent(formData);
          try { console.debug('[StudentsListView] createStudent returned', created); } catch (e) {}
      } else {
        // Create mode
        createStudent(formData);
        setSuccess(`Student ${formData.name} created successfully!`);
        // Update persisted snapshot after save
        try { readPersisted(); } catch (e) {}
      }

      // Refresh the student list
      setStudents(getStudents());
      setIsCreateOpen(false);
      resetForm();

      // Auto-hide success message after 3 seconds
      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDelete = (id, name) => {
    if (window.confirm(`Are you sure you want to delete ${name}?`)) {
      try {
        deleteStudent(id);
        setStudents(getStudents());
        setSuccess(`Student ${name} deleted successfully!`);
        setTimeout(() => setSuccess(""), 3000);
      } catch (err) {
        setError(err.message);
      }
    }
  };

  const handleEdit = useCallback((student) => {
    handleOpenEdit(student);
  }, []);

  // Memoized row component to avoid re-rendering all rows on small state changes
  const StudentRow = React.useCallback(({ student }) => {
    return (
      <TableRow key={student.id}>
        <TableCell>{student.id}</TableCell>
        <TableCell>{student.name}</TableCell>
        <TableCell className="text-sm text-muted-foreground">{student.email}</TableCell>
        <TableCell>{student.cgpa}</TableCell>
        <TableCell>{student.attendance}%</TableCell>
        <TableCell>
          <Badge className={getStatusColor(student.status)}>
            {student.status}
          </Badge>
        </TableCell>
        <TableCell className="text-right flex gap-2 justify-end">
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleEdit(student)}
            className="gap-1"
          >
            <Edit2 className="w-4 h-4" />
            Edit
          </Button>
          <Button
            variant="destructive"
            size="sm"
            onClick={() => handleDelete(student.id, student.name)}
            className="gap-1"
          >
            <Trash2 className="w-4 h-4" />
            Delete
          </Button>
        </TableCell>
      </TableRow>
    );
  }, [getStatusColor, handleDelete, handleEdit]);

  // Persisted snapshot (from localStorage) for diagnostics
  const [persistedSnapshot, setPersistedSnapshot] = useState({ lastSaved: null, count: 0, lastIds: [] });

  const readPersisted = () => {
    try {
      const raw = localStorage.getItem("students");
      const arr = raw ? JSON.parse(raw) : [];
      const lastSaved = localStorage.getItem("students_last_saved") || null;
      setPersistedSnapshot({ lastSaved, count: Array.isArray(arr) ? arr.length : 0, lastIds: Array.isArray(arr) ? arr.slice(-3).map(s => s.id) : [] });
    } catch (e) {
      setPersistedSnapshot({ lastSaved: null, count: 0, lastIds: [] });
    }
  };

  React.useEffect(() => {
    // Initial read of persisted snapshot
    readPersisted();
  }, []);

  return (
    <div className="space-y-4">
      {/* Diagnostic panel: shows persisted state and allows forcing a flush */}
      <div className="flex items-center justify-between">
        <div className="text-sm text-muted-foreground">
          Persisted: <strong id="persisted-count">{ /* filled by readPersisted */ }</strong>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={() => {
            // Force write and then update persisted snapshot
            try { flushStudents(); } catch (e) {}
            readPersisted();
          }}>Force Save Now</Button>
          <Button variant="outline" size="sm" onClick={() => readPersisted()}>Refresh Persisted View</Button>
        </div>
      </div>

      {/* Success/Error Messages */}
      {success && (
        <div className="bg-green-100 text-green-800 p-3 rounded-md">
          {success}
        </div>
      )}
      {error && (
        <div className="bg-red-100 text-red-800 p-3 rounded-md">
          {error}
        </div>
      )}

      <Card className="p-4">
        <div className="flex items-center justify-between mb-4">
          <h2>Student List</h2>
          <div className="flex gap-4 items-center">
            <div className="relative w-64">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search by name or ID..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
              <DialogTrigger asChild>
                <Button onClick={handleOpenCreate} className="gap-2">
                  <Plus className="w-4 h-4" />
                  Add Student
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>
                    {editingId ? "Edit Student" : "Create New Student"}
                  </DialogTitle>
                  <DialogDescription>
                    {editingId ? "Update student information" : "Add a new student to the system"}
                  </DialogDescription>
                </DialogHeader>
                <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); handleSave(); }}>
                  <div>
                    <Label htmlFor="student-id">Student ID (Roll Number)</Label>
                    <Input
                      id="student-id"
                      placeholder="e.g., 1234500001"
                      value={formData.id}
                      onChange={(e) => handleIdChange(e.target.value)}
                      disabled={editingId !== null}
                    />
                  </div>
                  <div>
                    <Label htmlFor="student-name">Full Name</Label>
                    <Input
                      id="student-name"
                      placeholder="e.g., John Doe"
                      value={formData.name}
                      onChange={(e) => handleNameChange(e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="student-email">Email (Auto-generated)</Label>
                    <Input
                      id="student-email"
                      type="email"
                      placeholder="Auto-generated from name and ID"
                      value={formData.email}
                      readOnly
                      className="bg-gray-100 cursor-not-allowed"
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      Pattern: firstname.lastname.XXX@university.edu (XXX = last 3 digits of ID)
                    </p>
                  </div>
                  <div>
                    <Label htmlFor="student-password">Password (Auto-generated)</Label>
                    <Input
                      id="student-password"
                      type="password"
                      placeholder="Auto-generated from ID"
                      value={formData.password}
                      readOnly
                      autoComplete="off"
                      className="bg-gray-100 cursor-not-allowed"
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      Pattern: Student@XXX (XXX = last 3 digits of ID)
                    </p>
                  </div>
                  {error && (
                    <div className="text-sm text-red-600">{error}</div>
                  )}
                  <div className="flex gap-2 justify-end">
                    <Button variant="outline" type="button" onClick={() => setIsCreateOpen(false)}>
                      Cancel
                    </Button>
                    <Button type="submit">
                      {editingId ? "Update" : "Create"}
                    </Button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        <div className="rounded-md border border-border overflow-auto max-h-[600px]">
          <Table>
            <TableHeader className="sticky top-0 bg-card">
              <TableRow>
                <TableHead>Student ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>CGPA</TableHead>
                <TableHead>Attendance</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredStudents.map((student) => (
                <React.Fragment key={student.id}>
                  <StudentRow student={student} />
                </React.Fragment>
              ))}
            </TableBody>
          </Table>
        </div>

        <div className="mt-4 text-sm text-muted-foreground">
          Showing {filteredStudents.length} of {studentsWithGrades.length} students
        </div>

        <div className="mt-2 text-xs text-muted-foreground border-t pt-2">
          <div>Persisted count: <strong>{persistedSnapshot.count}</strong></div>
          <div>Last saved: <strong>{persistedSnapshot.lastSaved || 'n/a'}</strong></div>
          <div>Recent persisted IDs: <strong>{persistedSnapshot.lastIds.join(', ') || 'n/a'}</strong></div>
        </div>
      </Card>
    </div>
  );
}
