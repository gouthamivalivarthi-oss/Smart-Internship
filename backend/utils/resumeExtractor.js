import fs from 'fs';
import path from 'path';

// Master dictionary of tech skills and keywords
export const KNOWN_SKILLS = [
  'javascript', 'typescript', 'python', 'java', 'c++', 'c#', 'go', 'golang', 'rust', 'ruby', 'php', 'swift', 'kotlin',
  'react', 'react.js', 'next.js', 'vue', 'vue.js', 'angular', 'svelte', 'html', 'html5', 'css', 'css3', 'tailwind', 'tailwind css',
  'node.js', 'node', 'express', 'express.js', 'fastapi', 'flask', 'django', 'spring', 'spring boot', 'asp.net',
  'mongodb', 'postgresql', 'postgres', 'mysql', 'sqlite', 'redis', 'firebase', 'supabase', 'prisma', 'mongoose',
  'graphql', 'rest api', 'restful', 'grpc', 'microservices', 'websockets',
  'docker', 'kubernetes', 'aws', 'amazon web services', 'azure', 'gcp', 'google cloud', 'ci/cd', 'github actions', 'jenkins',
  'git', 'github', 'gitlab', 'linux', 'bash', 'shell', 'jira', 'agile', 'scrum',
  'machine learning', 'deep learning', 'nlp', 'computer vision', 'tensorflow', 'pytorch', 'scikit-learn', 'pandas', 'numpy',
  'data structures', 'algorithms', 'system design', 'object oriented programming', 'oop', 'unit testing', 'jest', 'cypress',
  'figma', 'ui/ux', 'responsive design', 'web development', 'frontend', 'backend', 'full stack'
];

export const parseResumeFile = async (filePath) => {
  const ext = path.extname(filePath).toLowerCase();
  let text = '';

  try {
    if (ext === '.pdf') {
      try {
        const pdfParse = (await import('pdf-parse')).default;
        const dataBuffer = fs.readFileSync(filePath);
        const data = await pdfParse(dataBuffer);
        text = data.text || '';
      } catch (err) {
        console.warn('PDF parsing module fallback: reading buffer string', err.message);
        const rawBuffer = fs.readFileSync(filePath);
        text = rawBuffer.toString('utf-8', 0, Math.min(rawBuffer.length, 10000));
      }
    } else {
      // txt, doc, docx or text-based fallback
      text = fs.readFileSync(filePath, 'utf-8');
    }
  } catch (error) {
    console.error('Error reading resume file:', error.message);
    text = '';
  }

  return analyzeResumeText(text);
};

export const analyzeResumeText = (text) => {
  const normalized = (text || '').toLowerCase();
  const matchedSkillsSet = new Set();

  KNOWN_SKILLS.forEach(skill => {
    // Escape regex specials
    const escaped = skill.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(`(?:^|[^a-zA-Z0-9_#+])${escaped}(?:$|[^a-zA-Z0-9_#+])`, 'i');
    if (regex.test(normalized)) {
      // Normalize skill naming
      let cleanName = skill;
      if (skill === 'react.js') cleanName = 'React';
      else if (skill === 'node.js') cleanName = 'Node.js';
      else if (skill === 'tailwind css') cleanName = 'Tailwind CSS';
      else if (skill === 'c#') cleanName = 'C#';
      else if (skill === 'c++') cleanName = 'C++';
      else cleanName = skill.charAt(0).toUpperCase() + skill.slice(1);

      matchedSkillsSet.add(cleanName);
    }
  });

  const extractedSkills = Array.from(matchedSkillsSet);

  // Section checks
  const sections = {
    hasExperience: /experience|employment|work history|internship/i.test(normalized),
    hasEducation: /education|university|college|bachelor|master|degree|gpa/i.test(normalized),
    hasProjects: /projects|portfolio|open source|built/i.test(normalized),
    hasContact: /email|phone|linkedin|github|contact/i.test(normalized),
    hasSkills: /skills|technologies|proficiencies|competencies/i.test(normalized)
  };

  let score = 30; // base score
  if (sections.hasExperience) score += 20;
  if (sections.hasEducation) score += 15;
  if (sections.hasProjects) score += 15;
  if (sections.hasContact) score += 10;
  if (extractedSkills.length >= 5) score += 10;
  score = Math.min(100, Math.max(20, score));

  return {
    rawText: text.slice(0, 8000), // capped length
    extractedSkills,
    sections,
    score
  };
};
