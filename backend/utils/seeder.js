import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import User from '../models/User.js';
import Internship from '../models/Internship.js';
import Application from '../models/Application.js';
import Interview from '../models/Interview.js';
import Notification from '../models/Notification.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, '..', '.env') });

const sampleInternships = [
  {
    title: 'Frontend Engineer Intern',
    company: 'Stripe',
    companyLogo: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=128&auto=format&fit=crop&q=80',
    location: 'San Francisco, CA (Hybrid)',
    type: 'Hybrid',
    category: 'Software Engineering',
    description: 'Join Stripe payments team to craft accessible, high-performance dashboards and developer portals used by millions of internet businesses worldwide.',
    requirements: [
      'Pursuing a BS or MS in Computer Science or related engineering field',
      'Solid experience with React, TypeScript, and modern CSS/Tailwind',
      'Understanding of web accessibility standards (WCAG) and browser performance',
      'Strong problem-solving skills and eye for clean UI design'
    ],
    skillsRequired: ['React', 'TypeScript', 'Tailwind CSS', 'JavaScript', 'HTML5', 'Git'],
    stipend: { amount: 8200, currency: 'USD', period: 'month' },
    stipendDisplay: '$8,200 / month',
    deadline: new Date(Date.now() + 18 * 24 * 60 * 60 * 1000), // in 18 days
    duration: '12 Weeks (Summer 2026)',
    applyUrl: 'https://stripe.com/jobs',
    featured: true
  },
  {
    title: 'Full Stack Software Engineer Intern',
    company: 'Spotify',
    companyLogo: 'https://images.unsplash.com/photo-1614680376593-902f749f7ffc?w=128&auto=format&fit=crop&q=80',
    location: 'New York, NY / Remote',
    type: 'Remote',
    category: 'Software Engineering',
    description: 'Help develop collaborative playlist tools and podcast creator tools using React, Node.js, and cloud microservices.',
    requirements: [
      'Experience building full-stack web applications with modern frameworks',
      'Familiarity with Node.js, Express, MongoDB or PostgreSQL',
      'Curiosity for music tech, audio streams, and distributed cloud systems'
    ],
    skillsRequired: ['React', 'Node.js', 'Express', 'MongoDB', 'REST APIs', 'Git'],
    stipend: { amount: 7500, currency: 'USD', period: 'month' },
    stipendDisplay: '$7,500 / month',
    deadline: new Date(Date.now() + 25 * 24 * 60 * 60 * 1000),
    duration: '12 Weeks (Summer 2026)',
    applyUrl: 'https://spotifyjobs.com',
    featured: true
  },
  {
    title: 'Software Engineering Intern (Cloud & Systems)',
    company: 'Microsoft',
    companyLogo: 'https://images.unsplash.com/photo-1583321500900-828764eb92ca?w=128&auto=format&fit=crop&q=80',
    location: 'Redmond, WA',
    type: 'On-site',
    category: 'Software Engineering',
    description: 'Work alongside Azure core teams building scalable cloud distributed infrastructure, developer SDKs, and container orchestration engines.',
    requirements: [
      'Enrolled in University Computer Science program',
      'Proficiency in C++, C#, Java, or Python and data structures',
      'Understanding of operating system concepts and network protocols'
    ],
    skillsRequired: ['Python', 'C++', 'Docker', 'Linux', 'Algorithms', 'Git'],
    stipend: { amount: 8000, currency: 'USD', period: 'month' },
    stipendDisplay: '$8,000 / month',
    deadline: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000),
    duration: '12 Weeks',
    applyUrl: 'https://careers.microsoft.com',
    featured: true
  },
  {
    title: 'AI / Machine Learning Research Intern',
    company: 'Google',
    companyLogo: 'https://images.unsplash.com/photo-1572021335469-31706a17aaef?w=128&auto=format&fit=crop&q=80',
    location: 'Mountain View, CA / Remote',
    type: 'Hybrid',
    category: 'Data Science & AI',
    description: 'Collaborate with Google DeepMind researchers to develop, train, and benchmark frontier multimodal transformer architectures.',
    requirements: [
      'Experience with PyTorch, TensorFlow, Python, and matrix computations',
      'Coursework or publications in Deep Learning, NLP, or Computer Vision',
      'Eagerness to explore model reasoning and reinforcement learning'
    ],
    skillsRequired: ['Python', 'PyTorch', 'Machine Learning', 'TensorFlow', 'Algorithms'],
    stipend: { amount: 9200, currency: 'USD', period: 'month' },
    stipendDisplay: '$9,200 / month',
    deadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    duration: '14 Weeks',
    applyUrl: 'https://careers.google.com',
    featured: true
  },
  {
    title: 'Product Design & UI/UX Intern',
    company: 'Figma',
    companyLogo: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=128&auto=format&fit=crop&q=80',
    location: 'San Francisco, CA / Remote',
    type: 'Remote',
    category: 'UI/UX Design',
    description: 'Design next-generation collaborative design canvas features, prototyping interactions, and design token inspection tools.',
    requirements: [
      'Strong portfolio demonstrating UI design, design systems, and user research',
      'Familiarity with Figma, HTML/CSS component structures, and usability testing'
    ],
    skillsRequired: ['Figma', 'UI/UX', 'HTML5', 'CSS3', 'Responsive Design'],
    stipend: { amount: 7000, currency: 'USD', period: 'month' },
    stipendDisplay: '$7,000 / month',
    deadline: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
    duration: '12 Weeks',
    applyUrl: 'https://figma.com/careers',
    featured: false
  },
  {
    title: 'Site Reliability / DevOps Intern',
    company: 'Datadog',
    companyLogo: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=128&auto=format&fit=crop&q=80',
    location: 'Boston, MA / Remote',
    type: 'Remote',
    category: 'DevOps & Cloud',
    description: 'Help manage distributed Kubernetes clusters handling trillions of telemetry events per day. Build automation bots and monitoring dashboards.',
    requirements: [
      'Passion for Linux systems, shell scripting, containers, and networking',
      'Hands-on experience with Docker, Go or Python, and GitHub Actions'
    ],
    skillsRequired: ['Docker', 'Kubernetes', 'Linux', 'Go', 'AWS', 'CI/CD'],
    stipend: { amount: 7200, currency: 'USD', period: 'month' },
    stipendDisplay: '$7,200 / month',
    deadline: new Date(Date.now() + 21 * 24 * 60 * 60 * 1000),
    duration: '12 Weeks',
    applyUrl: 'https://datadoghq.com/careers',
    featured: false
  },
  {
    title: 'Mobile App Developer Intern (iOS/Android)',
    company: 'Uber',
    companyLogo: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=128&auto=format&fit=crop&q=80',
    location: 'San Francisco, CA',
    type: 'On-site',
    category: 'Mobile Development',
    description: 'Work on Uber Rider & Driver core apps, real-time geolocation tracking, and dynamic routing architectures.',
    requirements: [
      'Experience with Swift, Kotlin, or React Native',
      'Solid grasp of mobile lifecycle, UI threading, and REST/WebSocket protocols'
    ],
    skillsRequired: ['React Native', 'JavaScript', 'TypeScript', 'REST APIs', 'Git'],
    stipend: { amount: 7800, currency: 'USD', period: 'month' },
    stipendDisplay: '$7,800 / month',
    deadline: new Date(Date.now() + 12 * 24 * 60 * 60 * 1000),
    duration: '12 Weeks',
    applyUrl: 'https://uber.com/careers',
    featured: false
  },
  {
    title: 'Data Analyst & BI Intern',
    company: 'Airbnb',
    companyLogo: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=128&auto=format&fit=crop&q=80',
    location: 'Remote',
    type: 'Remote',
    category: 'Data Science & AI',
    description: 'Analyze booking behavior, seasonal travel dynamics, and construct automated SQL ETL pipelines and Tableau dashboards.',
    requirements: [
      'Advanced SQL and Python data visualization (Seaborn, Matplotlib, Pandas)',
      'Aptitude for statistical hypothesis testing and A/B test analysis'
    ],
    skillsRequired: ['SQL', 'Python', 'Pandas', 'Data Structures'],
    stipend: { amount: 6800, currency: 'USD', period: 'month' },
    stipendDisplay: '$6,800 / month',
    deadline: new Date(Date.now() + 28 * 24 * 60 * 60 * 1000),
    duration: '10 Weeks',
    applyUrl: 'https://airbnb.com/careers',
    featured: true
  }
];

const seedDatabase = async () => {
  try {
    const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/smart_internship_tracker';
    await mongoose.connect(mongoUri);
    console.log('[Seeder] Connected to MongoDB:', mongoUri);

    // Clear existing data
    await User.deleteMany({});
    await Internship.deleteMany({});
    await Application.deleteMany({});
    await Interview.deleteMany({});
    await Notification.deleteMany({});
    console.log('[Seeder] Cleared previous records.');

    // 1. Create Demo Admin User
    const adminUser = await User.create({
      name: 'System Admin',
      email: 'admin@demo.com',
      password: 'Password123!',
      role: 'admin',
      headline: 'Platform Administrator & Tech Recruiter',
      bio: 'Managing internship partnerships and student opportunities across tech hubs.',
      skills: ['Leadership', 'System Administration', 'React', 'Node.js']
    });
    console.log('[Seeder] Created Admin User: admin@demo.com');

    // 2. Create Demo Student User
    const studentUser = await User.create({
      name: 'Alex Johnson',
      email: 'student@demo.com',
      password: 'Password123!',
      role: 'student',
      headline: 'Senior CS Student | Full Stack & React Specialist',
      bio: 'Passionate computer science student building modern web applications with React, Node.js, and TypeScript. Looking for summer 2026 internships.',
      university: 'Tech Institute of Science',
      graduationYear: 2026,
      location: 'San Jose, CA',
      skills: ['JavaScript', 'TypeScript', 'React', 'Node.js', 'Express', 'Tailwind CSS', 'MongoDB', 'Git', 'REST APIs'],
      targetRoles: ['Frontend Developer', 'Full Stack Developer', 'Software Engineer'],
      resumeScore: 88,
      resumeFileName: 'Alex_Johnson_Software_Resume.pdf',
      resumeParsedText: `Alex Johnson - Software Engineer Intern Candidate
Email: alex.johnson@demo.com | GitHub: github.com/alexj-dev | Portfolio: alexj-portfolio.dev
SKILLS:
Languages & Frameworks: JavaScript, TypeScript, Python, HTML5, CSS3, React.js, Node.js, Express.js, Tailwind CSS
Databases & Cloud: MongoDB, PostgreSQL, Firebase, Docker, Git, RESTful APIs
PROJECTS:
1. Smart Collaborative Platform - Built a real-time collaborative workspace using React, Node.js, and WebSockets. Reduced network latency by 40%.
2. Developer Analytics Dashboard - Created an analytics dashboard with Recharts visualizing GitHub commit histories for 500+ active repositories.
EDUCATION:
B.S. in Computer Science - Tech Institute of Science (GPA: 3.8/4.0), Expected May 2026.`,
      socialLinks: {
        github: 'https://github.com',
        linkedin: 'https://linkedin.com',
        portfolio: 'https://portfolio.dev'
      }
    });
    console.log('[Seeder] Created Student User: student@demo.com');

    // 3. Create Sample Internships
    const internshipsToInsert = sampleInternships.map(item => ({
      ...item,
      postedBy: adminUser._id
    }));
    const createdInternships = await Internship.insertMany(internshipsToInsert);
    console.log(`[Seeder] Created ${createdInternships.length} internships.`);

    // 4. Create Realistic Applications for Demo Student
    const stripeInternship = createdInternships.find(i => i.company === 'Stripe');
    const spotifyInternship = createdInternships.find(i => i.company === 'Spotify');
    const msftInternship = createdInternships.find(i => i.company === 'Microsoft');
    const googleInternship = createdInternships.find(i => i.company === 'Google');
    const datadogInternship = createdInternships.find(i => i.company === 'Datadog');
    const figmaInternship = createdInternships.find(i => i.company === 'Figma');

    const app1 = await Application.create({
      user: studentUser._id,
      internship: stripeInternship?._id,
      company: 'Stripe',
      role: 'Frontend Engineer Intern',
      location: 'San Francisco, CA (Hybrid)',
      stipend: '$8,200 / month',
      status: 'In Review',
      priority: 'High',
      appliedDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
      deadline: stripeInternship?.deadline,
      jobUrl: 'https://stripe.com/jobs',
      notes: 'Applied with tailored resume highlighting React component library and accessibility.',
      aiMatchScore: 92,
      aiFeedback: {
        matchedSkills: ['React', 'TypeScript', 'Tailwind CSS', 'JavaScript'],
        missingSkills: [],
        summary: 'Exceptional match! Your React and TypeScript background aligns closely with the UI core team requirements.'
      },
      timeline: [
        { status: 'Applied', date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), note: 'Submitted application on Stripe career portal' },
        { status: 'In Review', date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), note: 'Application moved to hiring manager review stage' }
      ]
    });

    const app2 = await Application.create({
      user: studentUser._id,
      internship: spotifyInternship?._id,
      company: 'Spotify',
      role: 'Full Stack Software Engineer Intern',
      location: 'New York, NY / Remote',
      stipend: '$7,500 / month',
      status: 'Interviewing',
      priority: 'High',
      appliedDate: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000),
      deadline: spotifyInternship?.deadline,
      jobUrl: 'https://spotifyjobs.com',
      notes: 'Passed initial recruiter phone screen. Round 2 technical coding scheduled.',
      aiMatchScore: 89,
      aiFeedback: {
        matchedSkills: ['React', 'Node.js', 'Express', 'MongoDB'],
        missingSkills: [],
        summary: 'Strong fit for Spotify web infrastructure and collaborative features.'
      },
      timeline: [
        { status: 'Applied', date: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000), note: 'Application sent' },
        { status: 'In Review', date: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000), note: 'Recruiter screened resume' },
        { status: 'Interviewing', date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), note: 'Invited to Round 2 Technical Coding Session' }
      ]
    });

    const app3 = await Application.create({
      user: studentUser._id,
      internship: datadogInternship?._id,
      company: 'Datadog',
      role: 'Site Reliability / DevOps Intern',
      location: 'Remote',
      stipend: '$7,200 / month',
      status: 'Offered',
      priority: 'High',
      appliedDate: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000),
      notes: 'Offer letter received! Stipend: $7,200/mo + housing stipend. Decision deadline next Friday.',
      salaryOffered: '$7,200 / month + $2,000 relocation stipend',
      aiMatchScore: 78,
      timeline: [
        { status: 'Applied', date: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000), note: 'Initial application' },
        { status: 'Interviewing', date: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000), note: 'Final round panel interview' },
        { status: 'Offered', date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), note: 'Official summer offer letter received!' }
      ]
    });

    const app4 = await Application.create({
      user: studentUser._id,
      internship: msftInternship?._id,
      company: 'Microsoft',
      role: 'Software Engineering Intern',
      location: 'Redmond, WA',
      stipend: '$8,000 / month',
      status: 'Wishlist',
      priority: 'Medium',
      deadline: msftInternship?.deadline,
      notes: 'Need to review C++ and OS concepts before submitting application.',
      aiMatchScore: 74
    });

    const app5 = await Application.create({
      user: studentUser._id,
      internship: googleInternship?._id,
      company: 'Google',
      role: 'AI / Machine Learning Research Intern',
      location: 'Mountain View, CA',
      stipend: '$9,200 / month',
      status: 'Applied',
      priority: 'High',
      appliedDate: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000),
      deadline: googleInternship?.deadline,
      notes: 'Applied through university referral link.',
      aiMatchScore: 70
    });

    const app6 = await Application.create({
      user: studentUser._id,
      company: 'Amazon',
      role: 'Software Development Engineer Intern',
      location: 'Seattle, WA',
      stipend: '$8,500 / month',
      status: 'Rejected',
      priority: 'Medium',
      appliedDate: new Date(Date.now() - 35 * 24 * 60 * 60 * 1000),
      notes: 'Position closed due to high applicant volume for the season.',
      timeline: [
        { status: 'Applied', date: new Date(Date.now() - 35 * 24 * 60 * 60 * 1000), note: 'Applied online' },
        { status: 'Rejected', date: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000), note: 'Rejection notice received' }
      ]
    });

    console.log('[Seeder] Created 6 sample student applications.');

    // 5. Create Interview Schedules for Spotify & Stripe
    await Interview.create({
      user: studentUser._id,
      application: app2._id,
      company: 'Spotify',
      role: 'Full Stack Software Engineer Intern',
      roundTitle: 'Round 2: Technical Architecture & Live Coding',
      scheduledDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000 + 4 * 60 * 60 * 1000), // in 3 days
      durationMinutes: 60,
      locationOrLink: 'https://meet.google.com/spo-tech-live',
      interviewers: ['Sarah Lin (Senior Frontend Staff Eng)', 'Marcus V. (Backend Lead)'],
      notes: 'Prepare system design breakdown of real-time audio synchronization and React state cache.',
      aiQuestions: [
        {
          question: 'How would you structure a client-side audio player in React to avoid UI re-render lags?',
          category: 'React Architecture',
          difficulty: 'Medium',
          hint: 'Discuss Web Audio API, refs to audio elements, and isolating player state from parent lists.',
          practiceAnswer: 'Utilize custom audio hook with useRef and useCallback to decouple render cycles from audio timeupdate events.'
        },
        {
          question: 'Can you explain the trade-offs between WebSockets and Server-Sent Events (SSE) for playlist updates?',
          category: 'Network & Realtime',
          difficulty: 'Hard',
          hint: 'Mention bidirectional vs unidirectional data flow, connection overhead, and reconnect handling.',
          practiceAnswer: 'SSE provides automated reconnection and lightweight HTTP/2 multiplexing for server broadcasts; WebSockets allow two-way interactions.'
        },
        {
          question: 'Tell us about a time you had to optimize slow MongoDB queries in an Express API.',
          category: 'Database & Performance',
          difficulty: 'Medium',
          hint: 'Talk about compound indexes, lean queries, and projection limits.',
          practiceAnswer: 'Analyzed query plan with explain(), created compound indexes, and avoided N+1 populated queries.'
        }
      ]
    });

    // 6. Create Notifications
    await Notification.create([
      {
        user: studentUser._id,
        title: 'Upcoming Interview: Spotify',
        message: 'Your Round 2 Technical Interview with Spotify is in 3 days. Review your AI prep questions!',
        type: 'interview',
        link: '/interviews',
        read: false
      },
      {
        user: studentUser._id,
        title: 'Application Deadline Approaching',
        message: 'The deadline for Microsoft Software Engineering Intern is approaching in 10 days.',
        type: 'deadline',
        link: '/applications',
        read: false
      },
      {
        user: studentUser._id,
        title: 'High AI Resume Match Found',
        message: 'Stripe Frontend Engineer Intern has a 92% match with your uploaded profile skills!',
        type: 'ai_match',
        link: '/ai-hub',
        read: true
      },
      {
        user: studentUser._id,
        title: 'Offer Letter Logged',
        message: 'Congratulations on receiving an offer from Datadog!',
        type: 'application',
        link: '/applications',
        read: true
      }
    ]);

    console.log('[Seeder] Created notifications.');
    console.log('========================================');
    console.log(' SEEDING COMPLETE SUCCESSFULLY! ');
    console.log(' Demo Student: student@demo.com | Password123!');
    console.log(' Demo Admin:   admin@demo.com   | Password123!');
    console.log('========================================');

    process.exit(0);
  } catch (err) {
    console.error('[Seeder] Error populating database:', err);
    process.exit(1);
  }
};

seedDatabase();
