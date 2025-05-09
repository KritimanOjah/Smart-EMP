

export const employees = [
  {
    id: "emp001",
    firstName: "Arjun",
    email: "employee1@example.com",
    password: "123",
    taskNumber: {
      active: 1,
      newTask: 1,
      completed: 1,
      failed: 1
    },
    tasks: [
      {
        active: true,
        newTask: true,
        completed: false,
        failed: false,
        title: "Design UI",
        description: "Design the dashboard UI in Figma.",
        date: "2025-05-01",
        category: "Design"
      },
      {
        active: false,
        newTask: false,
        completed: true,
        failed: false,
        title: "Submit Timesheet",
        description: "Submit weekly timesheet by Friday.",
        date: "2025-04-30",
        category: "Admin"
      },
      {
        active: false,
        newTask: false,
        completed: false,
        failed: true,
        title: "Fix Login Bug",
        description: "Fix the login issue for iOS devices.",
        date: "2025-04-28",
        category: "Development"
      }
    ]
  },
  {
    id: "emp002",
    firstName: "Neha",
    email: "employee2@example.com",
    password: "123",
    taskNumber: {
      active: 2,
      newTask: 2,
      completed: 1,
      failed: 1
    },
    tasks: [
      {
        active: true,
        newTask: true,
        completed: false,
        failed: false,
        title: "Database Optimization",
        description: "Optimize PostgreSQL queries for the billing service.",
        date: "2025-05-02",
        category: "Backend"
      },
      {
        active: false,
        newTask: false,
        completed: true,
        failed: false,
        title: "Code Review",
        description: "Review PRs for the payments module.",
        date: "2025-04-29",
        category: "Development"
      },
      {
        active: false,
        newTask: false,
        completed: false,
        failed: true,
        title: "API Testing",
        description: "Write test cases for the invoice API.",
        date: "2025-04-26",
        category: "Testing"
      },
      {
        active: true,
        newTask: true,
        completed: false,
        failed: false,
        title: "Client Call",
        description: "Attend the weekly call with client.",
        date: "2025-05-03",
        category: "Communication"
      }
    ]
  },
  {
    id: "emp003",
    firstName: "Riya",
    email: "employee3@example.com",
    password: "123",
    taskNumber: {
      active: 1,
      newTask: 1,
      completed: 1,
      failed: 1
    },
    tasks: [
      {
        active: false,
        newTask: false,
        completed: true,
        failed: false,
        title: "Update Docs",
        description: "Update API documentation with new endpoints.",
        date: "2025-04-25",
        category: "Documentation"
      },
      {
        active: true,
        newTask: true,
        completed: false,
        failed: false,
        title: "Create Deployment Script",
        description: "Automate deployment using GitHub Actions.",
        date: "2025-05-02",
        category: "DevOps"
      },
      {
        active: false,
        newTask: false,
        completed: false,
        failed: true,
        title: "Fix Mobile UI",
        description: "Resolve layout bugs on mobile view.",
        date: "2025-04-28",
        category: "Frontend"
      }
    ]
  },
  {
    id: "emp004",
    firstName: "Kabir",
    email: "employee4@example.com",
    password: "123",
    taskNumber: {
      active: 2,
      newTask: 2,
      completed: 2,
      failed: 1
    },
    tasks: [
      {
        active: true,
        newTask: true,
        completed: false,
        failed: false,
        title: "Write Unit Tests",
        description: "Cover 80% codebase with unit tests.",
        date: "2025-05-01",
        category: "Testing"
      },
      {
        active: false,
        newTask: false,
        completed: true,
        failed: false,
        title: "Release Patch",
        description: "Deploy emergency fix to production.",
        date: "2025-04-29",
        category: "Deployment"
      },
      {
        active: false,
        newTask: false,
        completed: false,
        failed: true,
        title: "Research Microservices",
        description: "Explore microservices architecture for scalability.",
        date: "2025-04-27",
        category: "Research"
      },
      {
        active: true,
        newTask: true,
        completed: false,
        failed: false,
        title: "Setup Monitoring",
        description: "Implement monitoring with Grafana.",
        date: "2025-05-02",
        category: "DevOps"
      },
      {
        active: false,
        newTask: false,
        completed: true,
        failed: false,
        title: "Team Meeting",
        description: "Weekly scrum update meeting.",
        date: "2025-04-30",
        category: "Meeting"
      }
    ]
  },
  {
    id: "emp005",
    firstName: "Tanvi",
    email: "employee5@example.com",
    password: "123",
    taskNumber: {
      active: 2,
      newTask: 2,
      completed: 1,
      failed: 1
    },
    tasks: [
      {
        active: true,
        newTask: true,
        completed: false,
        failed: false,
        title: "Create Landing Page",
        description: "Design and implement marketing landing page.",
        date: "2025-05-01",
        category: "Frontend"
      },
      {
        active: false,
        newTask: false,
        completed: true,
        failed: false,
        title: "Fix Navbar Bug",
        description: "Resolve navbar dropdown issue.",
        date: "2025-04-28",
        category: "Bug Fix"
      },
      {
        active: false,
        newTask: false,
        completed: false,
        failed: true,
        title: "SEO Audit",
        description: "Perform SEO audit on main site.",
        date: "2025-04-27",
        category: "SEO"
      },
      {
        active: true,
        newTask: true,
        completed: false,
        failed: false,
        title: "Image Optimization",
        description: "Compress large images on homepage.",
        date: "2025-05-02",
        category: "Performance"
      }
    ]
  }
];

  
  export const admin = [
    {
      id: "admin001",
      email: "admin@example.com",
      password: "123"
    }
  ];
  

  
export const setLocalStorage = () => {
    localStorage.setItem('employees', JSON.stringify(employees));
    localStorage.setItem('admin', JSON.stringify(admin));
  };
  
  export const getLocalStorage = () => {
    const employees = JSON.parse(localStorage.getItem('employees') || '[]');
    const admin = JSON.parse(localStorage.getItem('admin') || '[]');
    
    console.log('Employees:', employees);
    console.log('Admin:', admin);
    
    return { employees, admin }; 
  };
    