// Generate unique teacher data based on specialization
export function generateTeacherData(teacherId, teacherName, specialization) {
  // Use teacher ID to generate consistent random values
  const seed = parseInt(teacherId.slice(-2));

  const subjectMapping = {
    "Database Management System": {
      id: "CS301",
      name: "Database Management System",
      enrolledStudents: 35 + (seed % 20),
      completionRate: 70 + (seed % 25),
      avgGrade: 75 + (seed % 20),
      outcomes: [
        { name: "SQL Proficiency", completion: 75 + ((seed * 2) % 20), avgScore: 78 + ((seed * 3) % 18) },
        { name: "Database Design", completion: 70 + ((seed * 3) % 25), avgScore: 75 + ((seed * 2) % 20) },
        { name: "Query Optimization", completion: 65 + ((seed * 4) % 30), avgScore: 70 + ((seed * 4) % 25) },
        { name: "Transaction Management", completion: 70 + ((seed * 2) % 25), avgScore: 75 + ((seed * 3) % 20) }
      ],
      recentAssignments: [
        { name: "ER Diagram Design", submitted: 30 + (seed % 15), pending: Math.floor((seed % 5)), avgScore: 78 + (seed % 17) },
        { name: "SQL Queries Lab", submitted: 32 + (seed % 13), pending: Math.floor((seed % 4)), avgScore: 75 + (seed % 20) },
        { name: "Normalization Exercise", submitted: 28 + (seed % 17), pending: Math.floor((seed % 6)), avgScore: 80 + (seed % 15) }
      ]
    },
    "Front-end Development": {
      id: "CS302",
      name: "Front-end Development",
      enrolledStudents: 30 + (seed % 25),
      completionRate: 75 + (seed % 20),
      avgGrade: 80 + (seed % 15),
      outcomes: [
        { name: "HTML/CSS Mastery", completion: 80 + ((seed * 2) % 15), avgScore: 82 + ((seed * 3) % 13) },
        { name: "JavaScript Programming", completion: 75 + ((seed * 3) % 20), avgScore: 78 + ((seed * 2) % 17) },
        { name: "React Framework", completion: 70 + ((seed * 4) % 25), avgScore: 75 + ((seed * 4) % 20) },
        { name: "UI/UX Design", completion: 75 + ((seed * 2) % 20), avgScore: 80 + ((seed * 3) % 15) }
      ],
      recentAssignments: [
        { name: "Portfolio Website", submitted: 27 + (seed % 18), pending: Math.floor((seed % 4)), avgScore: 85 + (seed % 12) },
        { name: "React Component Library", submitted: 29 + (seed % 16), pending: Math.floor((seed % 3)), avgScore: 82 + (seed % 15) },
        { name: "Responsive Design Challenge", submitted: 26 + (seed % 19), pending: Math.floor((seed % 5)), avgScore: 87 + (seed % 10) }
      ]
    },
    "Object-Oriented Programming": {
      id: "CS303",
      name: "Object-Oriented Programming",
      enrolledStudents: 40 + (seed % 25),
      completionRate: 68 + (seed % 27),
      avgGrade: 72 + (seed % 23),
      outcomes: [
        { name: "Class Design", completion: 72 + ((seed * 2) % 23), avgScore: 75 + ((seed * 3) % 20) },
        { name: "Inheritance & Polymorphism", completion: 65 + ((seed * 3) % 30), avgScore: 70 + ((seed * 2) % 25) },
        { name: "Design Patterns", completion: 60 + ((seed * 4) % 35), avgScore: 68 + ((seed * 4) % 27) },
        { name: "Code Organization", completion: 70 + ((seed * 2) % 25), avgScore: 73 + ((seed * 3) % 22) }
      ],
      recentAssignments: [
        { name: "Library Management System", submitted: 35 + (seed % 20), pending: Math.floor((seed % 7)), avgScore: 72 + (seed % 23) },
        { name: "Design Patterns Implementation", submitted: 37 + (seed % 18), pending: Math.floor((seed % 5)), avgScore: 70 + (seed % 25) },
        { name: "Unit Testing Project", submitted: 33 + (seed % 22), pending: Math.floor((seed % 8)), avgScore: 75 + (seed % 20) }
      ]
    },
    "Data Visualization": {
      id: "CS304",
      name: "Data Visualization",
      enrolledStudents: 28 + (seed % 18),
      completionRate: 80 + (seed % 15),
      avgGrade: 82 + (seed % 13),
      outcomes: [
        { name: "Chart Creation", completion: 85 + ((seed * 2) % 12), avgScore: 87 + ((seed * 3) % 10) },
        { name: "Dashboard Design", completion: 78 + ((seed * 3) % 17), avgScore: 82 + ((seed * 2) % 13) },
        { name: "Statistical Analysis", completion: 75 + ((seed * 4) % 20), avgScore: 80 + ((seed * 4) % 15) },
        { name: "Interactive Visualization", completion: 77 + ((seed * 2) % 18), avgScore: 83 + ((seed * 3) % 12) }
      ],
      recentAssignments: [
        { name: "Sales Dashboard", submitted: 26 + (seed % 12), pending: Math.floor((seed % 2)), avgScore: 88 + (seed % 10) },
        { name: "Interactive Chart Library", submitted: 24 + (seed % 14), pending: Math.floor((seed % 3)), avgScore: 85 + (seed % 12) },
        { name: "Data Story Project", submitted: 25 + (seed % 13), pending: Math.floor((seed % 4)), avgScore: 86 + (seed % 11) }
      ]
    },
    "Computer Networks": {
      id: "CS305",
      name: "Computer Networks",
      enrolledStudents: 33 + (seed % 22),
      completionRate: 65 + (seed % 30),
      avgGrade: 70 + (seed % 25),
      outcomes: [
        { name: "Network Protocols", completion: 70 + ((seed * 2) % 25), avgScore: 72 + ((seed * 3) % 23) },
        { name: "Security Fundamentals", completion: 63 + ((seed * 3) % 32), avgScore: 68 + ((seed * 2) % 27) },
        { name: "Network Configuration", completion: 65 + ((seed * 4) % 30), avgScore: 70 + ((seed * 4) % 25) },
        { name: "Performance Analysis", completion: 68 + ((seed * 2) % 27), avgScore: 73 + ((seed * 3) % 22) }
      ],
      recentAssignments: [
        { name: "Network Setup Lab", submitted: 29 + (seed % 16), pending: Math.floor((seed % 6)), avgScore: 70 + (seed % 25) },
        { name: "Security Protocol Analysis", submitted: 30 + (seed % 15), pending: Math.floor((seed % 5)), avgScore: 72 + (seed % 23) },
        { name: "Performance Testing", submitted: 27 + (seed % 18), pending: Math.floor((seed % 7)), avgScore: 68 + (seed % 27) }
      ]
    }
  };

  // Get subjects based on specialization
  const subjects = specialization.map(spec => subjectMapping[spec]);

  // Generate performance data
  const performanceData = [
    { week: "Week 1", ...generateWeekData(subjects, seed, 0) },
    { week: "Week 2", ...generateWeekData(subjects, seed, 1) },
    { week: "Week 3", ...generateWeekData(subjects, seed, 2) },
    { week: "Week 4", ...generateWeekData(subjects, seed, 3) }
  ];

  return {
    lecturer: {
      name: teacherName,
      id: teacherId,
      department: "Computer Science",
      courses: specialization
    },
    subjects: subjects,
    performanceData: performanceData
  };
}

function generateWeekData(subjects, seed, weekIndex) {
  const data = {};
  subjects.forEach((subject, index) => {
    const shortName = subject.name.split(' ')[0].toLowerCase();
    data[shortName] = subject.avgGrade + (weekIndex * 2) + ((seed + index) % 5);
  });
  return data;
}
