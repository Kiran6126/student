const DEFAULT_TEACHERS = [
  { id: "20001", name: "Rajesh Nair", email: "rajesh.nair@university.edu", password: "Teacher@001", specialization: ["Database Management System"] },
  { id: "20002", name: "Kavita Menon", email: "kavita.menon@university.edu", password: "Teacher@002", specialization: ["Front-end Development"] },
  { id: "20003", name: "Amitabh Reddy", email: "amitabh.reddy@university.edu", password: "Teacher@003", specialization: ["Object-Oriented Programming"] },
  { id: "20004", name: "Priya Sinha", email: "priya.sinha@university.edu", password: "Teacher@004", specialization: ["Data Visualization"] },
  { id: "20005", name: "Manoj Pillai", email: "manoj.pillai@university.edu", password: "Teacher@005", specialization: ["Computer Networks"] },
  { id: "20006", name: "Sneha Deshmukh", email: "sneha.deshmukh@university.edu", password: "Teacher@006", specialization: ["Database Management System", "Data Visualization"] },
  { id: "20007", name: "Rakesh Iyer", email: "rakesh.iyer@university.edu", password: "Teacher@007", specialization: ["Front-end Development", "Object-Oriented Programming"] },
  { id: "20008", name: "Nivedita Sharma", email: "nivedita.sharma@university.edu", password: "Teacher@008", specialization: ["Computer Networks", "Database Management System"] },
  { id: "20009", name: "Ajay Kapoor", email: "ajay.kapoor@university.edu", password: "Teacher@009", specialization: ["Object-Oriented Programming", "Data Visualization"] },
  { id: "20010", name: "Deepa Patil", email: "deepa.patil@university.edu", password: "Teacher@010", specialization: ["Front-end Development"] },
  { id: "20011", name: "Arvind Krishnan", email: "arvind.krishnan@university.edu", password: "Teacher@011", specialization: ["Computer Networks"] },
  { id: "20012", name: "Sonali Bhatia", email: "sonali.bhatia@university.edu", password: "Teacher@012", specialization: ["Data Visualization"] },
  { id: "20013", name: "Rohit Rajan", email: "rohit.rajan@university.edu", password: "Teacher@013", specialization: ["Database Management System"] },
  { id: "20014", name: "Shalini Verma", email: "shalini.verma@university.edu", password: "Teacher@014", specialization: ["Front-end Development", "Computer Networks"] },
  { id: "20015", name: "Suresh Das", email: "suresh.das@university.edu", password: "Teacher@015", specialization: ["Object-Oriented Programming"] }
];

// Load from localStorage if available, otherwise use default list
let teachers = (() => {
  try {
    const raw = localStorage.getItem("teachers");
    if (raw) return JSON.parse(raw);
  } catch (e) {
    // ignore parse/storage errors
  }
  return DEFAULT_TEACHERS.slice();
})();

export { teachers };

let _teachersSaveTimer = null;
export function saveTeachers(updatedTeachers) {
  teachers = Array.isArray(updatedTeachers) ? updatedTeachers : [];

  // Debounce actual localStorage write to avoid blocking UI on frequent updates
  try {
    if (_teachersSaveTimer) clearTimeout(_teachersSaveTimer);
    _teachersSaveTimer = setTimeout(() => {
      try {
        localStorage.setItem("teachers", JSON.stringify(teachers));
      } catch (e) {
        // ignore storage errors
      }
      _teachersSaveTimer = null;
    }, 150);
  } catch (e) {
    // ignore
  }
}

export function resetTeachers() {
  try {
    teachers = DEFAULT_TEACHERS.slice();
    localStorage.removeItem("teachers");
  } catch (e) {
    // ignore
  }
}