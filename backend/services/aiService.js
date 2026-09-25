/**
 * Dedicated AI Service Layer
 * Supports:
 * 1. Resume analysis
 * 2. Resume / Internship matching
 * 3. Skill-gap analysis
 * 4. Internship recommendations
 * 5. Interview-question generation
 *
 * Implements intelligent fallback if AI_API_KEY is unavailable or fails.
 */

// Safe fallback generator for resume analysis
const generateFallbackResumeAnalysis = (resumeText, skills = []) => {
  const words = (resumeText || '').split(/\s+/).length;
  const hasMetrics = /\d+%|\$\d+|\b\d+\s*(users|clients|projects|commits|stars|tests|ms|seconds)\b/i.test(resumeText);
  const hasActionVerbs = /\b(developed|engineered|implemented|architected|optimized|designed|created|led|spearheaded|automated)\b/i.test(resumeText);

  let score = 65;
  if (skills.length >= 6) score += 12;
  if (hasMetrics) score += 10;
  if (hasActionVerbs) score += 8;
  if (words > 180) score += 5;
  score = Math.min(95, Math.max(45, score));

  const strengths = [
    skills.length > 0 ? `Solid technical stack identified (${skills.slice(0, 5).join(', ')})` : 'Good baseline programming fundamentals',
    hasActionVerbs ? 'Effective use of strong action verbs (engineered, developed, optimized)' : 'Clear project descriptions',
    hasMetrics ? 'Quantifiable impact metrics included in achievements' : 'Structured education and credentials highlighted'
  ];

  const improvements = [
    !hasMetrics ? 'Add quantifiable impact to project bullets (e.g., "improved load time by 35%")' : 'Expand on system architecture and scalability details',
    'Include direct links to live GitHub repositories or deployed live demos',
    'Highlight experience with CI/CD, unit testing, and cloud deployment (AWS/Docker)'
  ];

  const categories = {
    frontend: skills.filter(s => /react|vue|angular|html|css|tailwind|javascript|typescript|next/i.test(s)),
    backend: skills.filter(s => /node|express|python|django|fastapi|java|spring|c\+\+|c#|go/i.test(s)),
    database: skills.filter(s => /mongo|postgres|sql|redis|firebase|supabase/i.test(s)),
    devopsAndTools: skills.filter(s => /git|docker|aws|kubernetes|linux|jest|ci\/cd|jira/i.test(s))
  };

  return {
    score,
    strengths,
    improvements,
    categorizedSkills: categories,
    summary: `Your profile demonstrates strong potential with ${skills.length} core competencies detected. Emphasizing measurable project outcomes and cloud workflows will boost your recruiter response rate.`,
    isAiFallback: true
  };
};

// Safe fallback generator for matching
const generateFallbackMatch = (userSkills = [], internship) => {
  const required = internship.skillsRequired || [];
  if (required.length === 0) {
    return {
      matchScore: 80,
      matchedSkills: userSkills.slice(0, 3),
      missingSkills: [],
      matchRating: 'Strong Match',
      advice: 'Your profile matches the open criteria for this position. Apply early!',
      isAiFallback: true
    };
  }

  const normalizedUserSkills = userSkills.map(s => s.toLowerCase());
  const matched = [];
  const missing = [];

  required.forEach(reqSkill => {
    const isMatched = normalizedUserSkills.some(uSkill =>
      uSkill.includes(reqSkill.toLowerCase()) || reqSkill.toLowerCase().includes(uSkill)
    );
    if (isMatched) {
      matched.push(reqSkill);
    } else {
      missing.push(reqSkill);
    }
  });

  const ratio = matched.length / required.length;
  const matchScore = Math.min(98, Math.max(35, Math.round(ratio * 70 + 25)));

  let matchRating = 'Moderate Match';
  if (matchScore >= 80) matchRating = 'Strong Match';
  else if (matchScore <= 50) matchRating = 'Skill Gap Identified';

  return {
    matchScore,
    matchedSkills: matched,
    missingSkills: missing,
    matchRating,
    advice: missing.length > 0
      ? `To maximize your chance for ${internship.role || internship.title} at ${internship.company}, brush up on ${missing.slice(0, 3).join(', ')} and mention relevant coursework or side-projects.`
      : `You possess all core required skills (${matched.join(', ')}) for this internship! Customize your cover letter to stand out.`,
    isAiFallback: true
  };
};

// Safe fallback for Interview Questions
const generateFallbackInterviewQuestions = (role = 'Software Engineer', company = 'Tech Company', skills = []) => {
  const primarySkill = skills[0] || 'JavaScript';
  const secondarySkill = skills[1] || 'REST APIs';

  return [
    {
      question: `Can you walk us through a recent project you built using ${primarySkill} and explain the technical architecture?`,
      category: 'Technical Architecture',
      difficulty: 'Medium',
      hint: 'Use the STAR method: Situation, Task, Action, Result. Highlight architectural trade-offs.',
      practiceAnswer: `Structure your answer around why you chose ${primarySkill}, state management, API design, and performance optimizations you introduced.`
    },
    {
      question: `How do you handle asynchronous operations and error boundaries in ${primarySkill} applications?`,
      category: 'Core Technical',
      difficulty: 'Medium',
      hint: 'Mention promises, async/await, try/catch patterns, and user-facing error state fallbacks.',
      practiceAnswer: 'Explain lifecycle error logging, network retries, and preventing unhandled promise rejections.'
    },
    {
      question: `Tell us about a challenging bug or performance bottleneck you encountered with ${secondarySkill} or databases and how you resolved it.`,
      category: 'Problem Solving & Debugging',
      difficulty: 'Hard',
      hint: 'Be specific about debugging tools (browser profiler, network tabs, database indexes).',
      practiceAnswer: 'Demonstrate diagnostic methodology: replicating the issue, isolating the root cause, benchmarking before/after metrics.'
    },
    {
      question: `Why are you interested in joining ${company} as an intern, and how do your technical goals align with our team?`,
      category: 'Company & Cultural Fit',
      difficulty: 'Easy',
      hint: 'Research the company product, culture, and team engineering blog before answering.',
      practiceAnswer: `Reference ${company}'s current innovations, engineering standards, and express your enthusiasm to learn and deliver high quality code.`
    },
    {
      question: 'Describe a situation where you had to collaborate under a tight deadline or received critical code review feedback.',
      category: 'Behavioral & Teamwork',
      difficulty: 'Medium',
      hint: 'Focus on constructive reception of feedback, communication, and team alignment.',
      practiceAnswer: 'Demonstrate humbleness, agility, git collaboration practices, and prioritizing business value.'
    }
  ];
};

// Safe fallback for Skill Gap Analysis
const generateFallbackSkillGap = (userSkills = [], targetRole = 'Frontend Engineer') => {
  const roleSkillMap = {
    'Frontend Developer': ['JavaScript', 'TypeScript', 'React', 'Tailwind CSS', 'Next.js', 'HTML5', 'Git', 'Testing'],
    'Backend Developer': ['Node.js', 'Express', 'MongoDB', 'PostgreSQL', 'REST APIs', 'Docker', 'Redis', 'Git'],
    'Full Stack Developer': ['JavaScript', 'React', 'Node.js', 'MongoDB', 'REST APIs', 'Tailwind CSS', 'Docker', 'Git'],
    'Data Scientist / AI Engineer': ['Python', 'Pandas', 'NumPy', 'Machine Learning', 'TensorFlow', 'SQL', 'Git'],
    'DevOps Engineer': ['Docker', 'Kubernetes', 'Linux', 'AWS', 'CI/CD', 'Git', 'Bash', 'Terraform']
  };

  const requiredSkills = roleSkillMap[targetRole] || roleSkillMap['Full Stack Developer'];
  const userLower = userSkills.map(s => s.toLowerCase());

  const acquired = [];
  const missing = [];

  requiredSkills.forEach(skill => {
    if (userLower.some(u => u.includes(skill.toLowerCase()) || skill.toLowerCase().includes(u))) {
      acquired.push(skill);
    } else {
      missing.push(skill);
    }
  });

  const readinessScore = Math.round((acquired.length / requiredSkills.length) * 100);

  const learningRoadmap = missing.map((skill, index) => ({
    skill,
    week: `Week ${index + 1}`,
    action: `Build a mini project implementing ${skill} with hands-on practice exercises`,
    priority: index === 0 ? 'High' : 'Medium'
  }));

  return {
    targetRole,
    readinessScore,
    acquiredSkills: acquired,
    missingSkills: missing,
    learningRoadmap,
    isAiFallback: true
  };
};

/**
 * Main AI Service Controller class
 */
export const aiService = {
  /**
   * Analyze Resume Text
   */
  async analyzeResume(resumeText, skills = []) {
    const apiKey = process.env.AI_API_KEY;

    if (!apiKey) {
      return generateFallbackResumeAnalysis(resumeText, skills);
    }

    try {
      // Optional call to Gemini REST API if key is present
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [
              {
                parts: [
                  {
                    text: `You are an elite Tech Career Coach & ATS Specialist. Analyze this student's resume:\n${resumeText}\nExtracted skills: ${skills.join(', ')}\n
Return ONLY a valid JSON object matching this schema:
{
  "score": number (0-100),
  "strengths": [string, string, string],
  "improvements": [string, string, string],
  "summary": string,
  "categorizedSkills": {
    "frontend": [string],
    "backend": [string],
    "database": [string],
    "devopsAndTools": [string]
  }
}`
                  }
                ]
              }
            ],
            generationConfig: { responseMimeType: 'application/json' }
          })
        }
      );

      if (!response.ok) {
        throw new Error(`AI API status: ${response.status}`);
      }

      const data = await response.json();
      const content = data.candidates?.[0]?.content?.parts?.[0]?.text;
      if (content) {
        const parsed = JSON.parse(content);
        return { ...parsed, isAiFallback: false };
      }
      return generateFallbackResumeAnalysis(resumeText, skills);
    } catch (err) {
      console.warn('[AI Service] API request failed, utilizing intelligent fallback:', err.message);
      return generateFallbackResumeAnalysis(resumeText, skills);
    }
  },

  /**
   * Match Resume to Internship
   */
  async matchResumeToInternship(userSkills = [], internship, resumeText = '') {
    const apiKey = process.env.AI_API_KEY;

    if (!apiKey) {
      return generateFallbackMatch(userSkills, internship);
    }

    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [
              {
                parts: [
                  {
                    text: `Analyze match between candidate and internship.
Candidate skills: ${userSkills.join(', ')}
Candidate Resume Snippet: ${resumeText.slice(0, 1000)}
Internship Title: ${internship.title}
Company: ${internship.company}
Required Skills: ${(internship.skillsRequired || []).join(', ')}
Description: ${(internship.description || '').slice(0, 600)}

Return ONLY a valid JSON object:
{
  "matchScore": number (0-100),
  "matchRating": "Strong Match" | "Moderate Match" | "Skill Gap Identified",
  "matchedSkills": [string],
  "missingSkills": [string],
  "advice": string
}`
                  }
                ]
              }
            ],
            generationConfig: { responseMimeType: 'application/json' }
          })
        }
      );

      if (!response.ok) {
        throw new Error(`AI API status: ${response.status}`);
      }

      const data = await response.json();
      const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
      if (text) {
        const parsed = JSON.parse(text);
        return { ...parsed, isAiFallback: false };
      }
      return generateFallbackMatch(userSkills, internship);
    } catch (err) {
      console.warn('[AI Service] Match API failed, falling back:', err.message);
      return generateFallbackMatch(userSkills, internship);
    }
  },

  /**
   * Skill-Gap Analysis
   */
  async analyzeSkillGap(userSkills = [], targetRole = 'Frontend Developer') {
    const apiKey = process.env.AI_API_KEY;

    if (!apiKey) {
      return generateFallbackSkillGap(userSkills, targetRole);
    }

    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [
              {
                parts: [
                  {
                    text: `Perform a skill-gap analysis for a student targeting the role: ${targetRole}.
Current Student Skills: ${userSkills.join(', ')}

Return ONLY a valid JSON object:
{
  "targetRole": "${targetRole}",
  "readinessScore": number (0-100),
  "acquiredSkills": [string],
  "missingSkills": [string],
  "learningRoadmap": [
    { "skill": string, "week": string, "action": string, "priority": "High" | "Medium" }
  ]
}`
                  }
                ]
              }
            ],
            generationConfig: { responseMimeType: 'application/json' }
          })
        }
      );

      if (!response.ok) throw new Error(`AI API error: ${response.status}`);

      const data = await response.json();
      const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
      if (text) {
        return { ...JSON.parse(text), isAiFallback: false };
      }
      return generateFallbackSkillGap(userSkills, targetRole);
    } catch (err) {
      console.warn('[AI Service] Skill-gap API failed, falling back:', err.message);
      return generateFallbackSkillGap(userSkills, targetRole);
    }
  },

  /**
   * Generate Interview Questions
   */
  async generateInterviewQuestions(role, company, skills = []) {
    const apiKey = process.env.AI_API_KEY;

    if (!apiKey) {
      return generateFallbackInterviewQuestions(role, company, skills);
    }

    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [
              {
                parts: [
                  {
                    text: `Generate 5 high-yield interview questions for an internship role: ${role} at ${company}.
Candidate Skills: ${skills.join(', ')}.

Return ONLY a valid JSON array of 5 objects:
[
  {
    "question": string,
    "category": string,
    "difficulty": "Easy" | "Medium" | "Hard",
    "hint": string,
    "practiceAnswer": string
  }
]`
                  }
                ]
              }
            ],
            generationConfig: { responseMimeType: 'application/json' }
          })
        }
      );

      if (!response.ok) throw new Error(`AI API status: ${response.status}`);

      const data = await response.json();
      const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
      if (text) {
        return JSON.parse(text);
      }
      return generateFallbackInterviewQuestions(role, company, skills);
    } catch (err) {
      console.warn('[AI Service] Questions API failed, falling back:', err.message);
      return generateFallbackInterviewQuestions(role, company, skills);
    }
  },

  /**
   * Generate Custom Cover Letter / Outreach Pitch
   */
  async generateCoverLetter(userName, userSkills, internship) {
    return {
      subject: `Application for ${internship.title || 'Software Engineering Intern'} - ${userName}`,
      letterBody: `Dear Hiring Team at ${internship.company},

I am writing to express my strong interest in the ${internship.title || 'Internship'} position at ${internship.company}. With a solid foundation in ${userSkills.slice(0, 4).join(', ')} and a passion for engineering high-performance web applications, I am eager to contribute to your team.

During my academic coursework and software projects, I have developed a strong discipline for writing clean, maintainable code and solving complex technical challenges. I am particularly excited about ${internship.company}'s work and culture of innovation.

Thank you for your time and consideration. I would welcome the opportunity to discuss how my skill set aligns with your team's goals.

Sincerely,
${userName}`
    };
  }
};

export default aiService;
