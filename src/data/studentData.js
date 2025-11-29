// Generate unique student data for each student
export function generateStudentData(studentId, studentName) {
  // Use student ID to generate consistent random values
  const seed = parseInt(studentId.slice(-3));
  
  // Generate CGPA between 7.5 and 10.0
  const cgpa = (7.5 + (seed % 25) / 10).toFixed(2);
  
  // Generate attendance between 75% and 98%
  const overallAttendance = 75 + (seed % 24);
  
  // Department assignment based on ID
  const departments = [
    "Computer Science & Engineering",
    "Information Technology",
    "Computer Applications",
    "Software Engineering"
  ];
  const department = departments[seed % departments.length];
  
  // Generate subject-specific data
  const subjects = [
    {
      id: "CS301",
      name: "Database Management System",
      instructor: "Dr. Rajesh Nair",
      progress: 70 + (seed % 30),
      grade: 75 + (seed % 25),
      status: getStatus(75 + (seed % 25)),
      attendance: 70 + ((seed * 2) % 30),
      outcomes: [
        { name: "SQL Proficiency", progress: 75 + ((seed * 3) % 25), score: 78 + ((seed * 2) % 22) },
        { name: "Database Design", progress: 70 + ((seed * 5) % 30), score: 75 + ((seed * 3) % 25) },
        { name: "Query Optimization", progress: 65 + ((seed * 7) % 35), score: 70 + ((seed * 4) % 30) },
        { name: "Transaction Management", progress: 70 + ((seed * 4) % 30), score: 75 + ((seed * 5) % 25) }
      ],
      recentAssignments: [
        { name: "ER Diagram Design", score: 75 + (seed % 25), date: "2024-01-20", status: "graded" },
        { name: "SQL Queries Lab", score: 70 + ((seed * 2) % 30), date: "2024-01-18", status: "graded" },
        { name: "Normalization Exercise", score: null, date: "2024-01-22", status: "pending" }
      ]
    },
    {
      id: "CS302",
      name: "Front-end Development",
      instructor: "Prof. Kavita Menon",
      progress: 75 + ((seed * 2) % 25),
      grade: 80 + ((seed * 3) % 20),
      status: getStatus(80 + ((seed * 3) % 20)),
      attendance: 75 + ((seed * 3) % 25),
      outcomes: [
        { name: "HTML/CSS Mastery", progress: 80 + ((seed * 2) % 20), score: 82 + ((seed * 3) % 18) },
        { name: "JavaScript Programming", progress: 75 + ((seed * 4) % 25), score: 78 + ((seed * 2) % 22) },
        { name: "React Framework", progress: 70 + ((seed * 3) % 30), score: 75 + ((seed * 4) % 25) },
        { name: "UI/UX Design", progress: 75 + ((seed * 5) % 25), score: 80 + ((seed * 2) % 20) }
      ],
      recentAssignments: [
        { name: "Portfolio Website", score: 80 + ((seed * 2) % 20), date: "2024-01-21", status: "graded" },
        { name: "React Component Library", score: 75 + ((seed * 3) % 25), date: "2024-01-19", status: "graded" },
        { name: "Responsive Design Challenge", score: null, date: "2024-01-23", status: "submitted" }
      ]
    },
    {
      id: "CS303",
      name: "Object-Oriented Programming",
      instructor: "Dr. Amitabh Reddy",
      progress: 65 + ((seed * 3) % 35),
      grade: 70 + ((seed * 4) % 30),
      status: getStatus(70 + ((seed * 4) % 30)),
      attendance: 65 + ((seed * 4) % 35),
      outcomes: [
        { name: "Class Design", progress: 70 + ((seed * 2) % 30), score: 72 + ((seed * 3) % 28) },
        { name: "Inheritance & Polymorphism", progress: 65 + ((seed * 5) % 35), score: 68 + ((seed * 4) % 32) },
        { name: "Design Patterns", progress: 60 + ((seed * 4) % 40), score: 65 + ((seed * 5) % 35) },
        { name: "Code Organization", progress: 70 + ((seed * 3) % 30), score: 72 + ((seed * 2) % 28) }
      ],
      recentAssignments: [
        { name: "Library Management System", score: 70 + ((seed * 3) % 30), date: "2024-01-17", status: "graded" },
        { name: "Design Patterns Implementation", score: 65 + ((seed * 4) % 35), date: "2024-01-15", status: "graded" },
        { name: "Unit Testing Project", score: null, date: "2024-01-24", status: "pending" }
      ]
    },
    {
      id: "CS304",
      name: "Data Visualization",
      instructor: "Dr. Priya Sinha",
      progress: 75 + ((seed * 4) % 25),
      grade: 78 + ((seed * 2) % 22),
      status: getStatus(78 + ((seed * 2) % 22)),
      attendance: 75 + ((seed * 5) % 25),
      outcomes: [
        { name: "Chart Creation", progress: 80 + ((seed * 3) % 20), score: 82 + ((seed * 2) % 18) },
        { name: "Dashboard Design", progress: 75 + ((seed * 2) % 25), score: 78 + ((seed * 3) % 22) },
        { name: "Statistical Analysis", progress: 75 + ((seed * 4) % 25), score: 77 + ((seed * 4) % 23) },
        { name: "Interactive Visualization", progress: 75 + ((seed * 5) % 25), score: 80 + ((seed * 3) % 20) }
      ],
      recentAssignments: [
        { name: "Sales Dashboard", score: 78 + ((seed * 2) % 22), date: "2024-01-22", status: "graded" },
        { name: "Interactive Chart Library", score: 75 + ((seed * 3) % 25), date: "2024-01-20", status: "graded" },
        { name: "Data Story Project", score: null, date: "2024-01-25", status: "in-progress" }
      ]
    },
    {
      id: "CS305",
      name: "Computer Networks",
      instructor: "Prof. Manoj Pillai",
      progress: 68 + ((seed * 5) % 32),
      grade: 72 + ((seed * 3) % 28),
      status: getStatus(72 + ((seed * 3) % 28)),
      attendance: 68 + ((seed * 6) % 32),
      outcomes: [
        { name: "Network Protocols", progress: 70 + ((seed * 4) % 30), score: 72 + ((seed * 3) % 28) },
        { name: "Security Fundamentals", progress: 65 + ((seed * 3) % 35), score: 68 + ((seed * 5) % 32) },
        { name: "Network Configuration", progress: 68 + ((seed * 5) % 32), score: 70 + ((seed * 4) % 30) },
        { name: "Performance Analysis", progress: 70 + ((seed * 2) % 30), score: 75 + ((seed * 3) % 25) }
      ],
      recentAssignments: [
        { name: "Network Setup Lab", score: 72 + ((seed * 3) % 28), date: "2024-01-19", status: "graded" },
        { name: "Security Protocol Analysis", score: 68 + ((seed * 4) % 32), date: "2024-01-16", status: "graded" },
        { name: "Performance Testing", score: null, date: "2024-01-24", status: "submitted" }
      ]
    }
  ];

  // Calculate completed credits (assuming each course is worth credits)
  const completedCredits = 84 + (seed % 20);
  
  return {
    name: studentName,
    id: studentId,
    currentGPA: parseFloat(cgpa),
    department: department,
    completedCredits: completedCredits,
    totalCredits: 120,
    attendance: {
      present: overallAttendance,
      absent: Math.floor((100 - overallAttendance) * 0.7),
      late: Math.floor((100 - overallAttendance) * 0.3)
    },
    subjects: subjects
  };
}

function getStatus(grade) {
  if (grade >= 90) return "exemplary";
  if (grade >= 80) return "proficient";
  if (grade >= 70) return "developing";
  return "beginning";
}
