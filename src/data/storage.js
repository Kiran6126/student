// Centralized storage CRUD operations for students and teachers
// All operations automatically persist to localStorage

import { saveStudents, resetStudents, flushStudents } from "./students";
import { saveTeachers, resetTeachers } from "./teachers";
import { students } from "./students";
import { teachers } from "./teachers";

// Re-export flush helper so other modules can force a write without importing
// students.js directly.
export { flushStudents } from "./students";

// ============= STUDENTS CRUD =============

/**
 * Get all students
 * @returns {Array} List of all students
 */
export function getStudents() {
  // Return a shallow copy of the array and its objects to avoid expensive
  // JSON serialize/parse operations which block the main thread on large datasets.
  return students.map(s => ({ ...s }));
}

/**
 * Get a single student by ID
 * @param {string} id - Student ID
 * @returns {Object|null} Student object or null if not found
 */
export function getStudentById(id) {
  const student = students.find(s => s.id === id);
  return student ? { ...student } : null;
}

/**
 * Create a new student
 * @param {Object} studentData - { id, name, email, password }
 * @returns {Object} Created student object
 * @throws {Error} if student already exists
 */
export function createStudent(studentData) {
  if (!studentData.id || !studentData.name || !studentData.email) {
    throw new Error("Student must have id, name, and email");
  }

  if (students.find(s => s.id === studentData.id)) {
    throw new Error(`Student with ID ${studentData.id} already exists`);
  }

  const newStudent = {
    id: studentData.id,
    name: studentData.name,
    email: studentData.email,
    password: studentData.password || `Student@${studentData.id.slice(-3)}`
  };

  students.push(newStudent);
  saveStudents(students);
  // Ensure persistence immediately so a following reload/login sees the new student
  try { console.debug(`[storage] createStudent pushed`, newStudent); flushStudents(); console.debug(`[storage] createStudent flushed`); } catch (e) { /* ignore */ }
  return { ...newStudent };
}

/**
 * Update an existing student
 * @param {string} id - Student ID
 * @param {Object} updates - Fields to update (name, email, password)
 * @returns {Object} Updated student object
 * @throws {Error} if student not found
 */
export function updateStudent(id, updates) {
  const index = students.findIndex(s => s.id === id);
  if (index === -1) {
    throw new Error(`Student with ID ${id} not found`);
  }

  students[index] = { ...students[index], ...updates, id };
  saveStudents(students);
  try { flushStudents(); } catch (e) { /* ignore */ }
  return { ...students[index] };
}

/**
 * Delete a student
 * @param {string} id - Student ID
 * @returns {boolean} true if deleted, false if not found
 */
export function deleteStudent(id) {
  const index = students.findIndex(s => s.id === id);
  if (index === -1) {
    return false;
  }

  students.splice(index, 1);
  saveStudents(students);
  try { flushStudents(); } catch (e) { /* ignore */ }
  return true;
}

/**
 * Search students by name or email
 * @param {string} query - Search term
 * @returns {Array} Matching students
 */
export function searchStudents(query) {
  const q = query.toLowerCase();
  return students.filter(
    s => s.name.toLowerCase().includes(q) || s.email.toLowerCase().includes(q)
  );
}

// ============= TEACHERS CRUD =============

/**
 * Get all teachers
 * @returns {Array} List of all teachers
 */
export function getTeachers() {
  return teachers.map(t => ({ ...t }));
}

/**
 * Get a single teacher by ID
 * @param {string} id - Teacher ID
 * @returns {Object|null} Teacher object or null if not found
 */
export function getTeacherById(id) {
  const teacher = teachers.find(t => t.id === id);
  return teacher ? { ...teacher } : null;
}

/**
 * Create a new teacher
 * @param {Object} teacherData - { id, name, email, password, specialization }
 * @returns {Object} Created teacher object
 * @throws {Error} if teacher already exists
 */
export function createTeacher(teacherData) {
  if (!teacherData.id || !teacherData.name || !teacherData.email) {
    throw new Error("Teacher must have id, name, and email");
  }

  if (teachers.find(t => t.id === teacherData.id)) {
    throw new Error(`Teacher with ID ${teacherData.id} already exists`);
  }

  const newTeacher = {
    id: teacherData.id,
    name: teacherData.name,
    email: teacherData.email,
    password: teacherData.password || `Teacher@${teacherData.id.slice(-3)}`,
    specialization: Array.isArray(teacherData.specialization) ? teacherData.specialization : []
  };

  teachers.push(newTeacher);
  saveTeachers(teachers);
  return { ...newTeacher };
}

/**
 * Update an existing teacher
 * @param {string} id - Teacher ID
 * @param {Object} updates - Fields to update (name, email, password, specialization)
 * @returns {Object} Updated teacher object
 * @throws {Error} if teacher not found
 */
export function updateTeacher(id, updates) {
  const index = teachers.findIndex(t => t.id === id);
  if (index === -1) {
    throw new Error(`Teacher with ID ${id} not found`);
  }

  teachers[index] = { ...teachers[index], ...updates, id };
  saveTeachers(teachers);
  return { ...teachers[index] };
}

/**
 * Delete a teacher
 * @param {string} id - Teacher ID
 * @returns {boolean} true if deleted, false if not found
 */
export function deleteTeacher(id) {
  const index = teachers.findIndex(t => t.id === id);
  if (index === -1) {
    return false;
  }

  teachers.splice(index, 1);
  saveTeachers(teachers);
  return true;
}

/**
 * Search teachers by name or email
 * @param {string} query - Search term
 * @returns {Array} Matching teachers
 */
export function searchTeachers(query) {
  const q = query.toLowerCase();
  return teachers.filter(
    t => t.name.toLowerCase().includes(q) || t.email.toLowerCase().includes(q)
  );
}

// ============= RESET OPERATIONS =============

/**
 * Reset all data to defaults
 */
export function resetAllData() {
  resetStudents();
  resetTeachers();
}

/**
 * Export data as JSON (for backup)
 * @returns {Object} { students, teachers, exportDate }
 */
export function exportData() {
  return {
    students: JSON.parse(JSON.stringify(students)),
    teachers: JSON.parse(JSON.stringify(teachers)),
    exportDate: new Date().toISOString()
  };
}

/**
 * Import data from JSON (for restore)
 * @param {Object} data - { students, teachers }
 */
export function importData(data) {
  try {
    if (data.students && Array.isArray(data.students)) {
      saveStudents(data.students);
    }
    if (data.teachers && Array.isArray(data.teachers)) {
      saveTeachers(data.teachers);
    }
  } catch (e) {
    throw new Error(`Failed to import data: ${e.message}`);
  }
}
