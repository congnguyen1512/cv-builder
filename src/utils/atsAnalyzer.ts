import { CVDocument, DateFormatType, LanguageCode } from '../types/cv';

const MONTHS_EN = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const MONTHS_VI = ['Th01', 'Th02', 'Th03', 'Th04', 'Th05', 'Th06', 'Th07', 'Th08', 'Th09', 'Th10', 'Th11', 'Th12'];

export function formatCVDate(dateStr: string, format: DateFormatType, lang: LanguageCode = 'vi'): string {
  if (!dateStr || !dateStr.trim()) return '';
  const trimmed = dateStr.trim();
  const parts = trimmed.split('-');
  if (parts.length >= 2) {
    const year = parts[0];
    const monthIndex = parseInt(parts[1], 10) - 1;
    if (isNaN(monthIndex) || monthIndex < 0 || monthIndex > 11) {
      return trimmed;
    }
    const monthNum = String(monthIndex + 1).padStart(2, '0');
    if (format === 'YYYY') return year;
    if (format === 'MMM YYYY') {
      const mName = lang === 'en' ? MONTHS_EN[monthIndex] : MONTHS_VI[monthIndex];
      return `${mName} ${year}`;
    }
    return `${monthNum}/${year}`;
  }
  return trimmed;
}

export interface AtsCheckItem {
  id: string;
  title: string;
  category: 'contact' | 'impact' | 'structure' | 'keywords';
  score: number;
  maxScore: number;
  status: 'pass' | 'warning' | 'fail';
  feedback: string;
  targetSection?: string;
}

export interface AtsScoreResult {
  totalScore: number;
  grade: 'Xuất sắc (ATS Ready)' | 'Tốt (Cần tinh chỉnh nhẹ)' | 'Trung bình (Cần bổ sung)' | 'Cần cải thiện nhiều';
  checks: AtsCheckItem[];
  metricsCount: number;
  wordCount: number;
}

const CLICHE_WORDS = [
  'chăm chỉ',
  'nhiệt tình',
  'ham học hỏi',
  'chịu được áp lực cao',
  'hardworking',
  'hard-working',
  'team player',
  'go-getter',
  'synergy',
  'think outside the box',
];

export function evaluateCVScore(cv: CVDocument): AtsScoreResult {
  const checks: AtsCheckItem[] = [];

  // 1. Contact Info (15 pts)
  const hasName = Boolean(cv.personalInfo.fullName.trim());
  const hasEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cv.personalInfo.email.trim());
  const hasPhone = Boolean(cv.personalInfo.phone.trim());
  const hasJobTitle = Boolean(cv.personalInfo.jobTitle.trim());
  const hasSocial = Boolean(
    cv.personalInfo.socials.linkedin.trim() ||
    cv.personalInfo.socials.github.trim() ||
    cv.personalInfo.socials.website.trim() ||
    cv.personalInfo.socials.portfolio.trim()
  );

  let contactScore = 0;
  if (hasName) contactScore += 3;
  if (hasEmail) contactScore += 4;
  if (hasPhone) contactScore += 3;
  if (hasJobTitle) contactScore += 3;
  if (hasSocial) contactScore += 2;

  checks.push({
    id: 'contact-info',
    title: 'Thông tin liên hệ & Liên kết chuyên môn',
    category: 'contact',
    score: contactScore,
    maxScore: 15,
    status: contactScore >= 13 ? 'pass' : contactScore >= 9 ? 'warning' : 'fail',
    feedback:
      contactScore === 15
        ? 'Đầy đủ Họ tên, Vị trí ứng tuyển, Email, SĐT và LinkedIn/Portfolio.'
        : 'Hãy đảm bảo điền đủ Email chuẩn, SĐT, Vị trí ứng tuyển và ít nhất 1 link LinkedIn/GitHub/Portfolio.',
    targetSection: 'personal',
  });

  // 2. Professional Summary (15 pts)
  const summaryWords = cv.summary
    .replace(/[*_•#]/g, ' ')
    .trim()
    .split(/\s+/)
    .filter(Boolean).length;

  let summaryScore = 0;
  let summaryStatus: 'pass' | 'warning' | 'fail' = 'fail';
  let summaryFeedback = '';

  if (summaryWords >= 25 && summaryWords <= 90) {
    summaryScore = 15;
    summaryStatus = 'pass';
    summaryFeedback = `Độ dài Tóm tắt chuyên môn lý tưởng (${summaryWords} từ).`;
  } else if (summaryWords >= 12) {
    summaryScore = 10;
    summaryStatus = 'warning';
    summaryFeedback =
      summaryWords < 25
        ? `Phần tóm tắt hơi ngắn (${summaryWords} từ). Nên viết từ 30–75 từ nêu rõ số năm kinh nghiệm và thế mạnh cốt lõi.`
        : `Phần tóm tắt hơi dài (${summaryWords} từ). Nên cô đọng dưới 85 từ để HR đọc nhanh trong 6 giây.`;
  } else {
    summaryScore = 0;
    summaryStatus = 'fail';
    summaryFeedback = 'Chưa có hoặc quá ngắn phần Tóm tắt chuyên môn (Professional Summary).';
  }

  checks.push({
    id: 'summary-check',
    title: 'Tóm tắt chuyên môn (Professional Summary)',
    category: 'structure',
    score: summaryScore,
    maxScore: 15,
    status: summaryStatus,
    feedback: summaryFeedback,
    targetSection: 'summary',
  });

  // 3. Quantifiable Impact in Experience & Projects (25 pts)
  const allExpAndProjText = [
    ...cv.experience.map((e) => e.description),
    ...cv.projects.map((p) => p.description),
  ].join('\n');

  const metricMatches =
    allExpAndProjText.match(/(\d+(\.\d+)?\s*(%|x|X|\+|k|K|M|B|ms|s|giờ|hours|ngày|days|users|người|triệu|tỷ|USD|\$|TPS|MAU|ARR))/g) || [];
  const metricsCount = metricMatches.length;

  let impactScore = 0;
  if (metricsCount >= 5) impactScore = 25;
  else if (metricsCount >= 3) impactScore = 18;
  else if (metricsCount >= 1) impactScore = 10;
  else impactScore = 0;

  checks.push({
    id: 'quantifiable-metrics',
    title: 'Số liệu định lượng kết quả (Công thức XYZ / STAR)',
    category: 'impact',
    score: impactScore,
    maxScore: 25,
    status: impactScore >= 20 ? 'pass' : impactScore >= 10 ? 'warning' : 'fail',
    feedback:
      metricsCount >= 5
        ? `Tuyệt vời! Phát hiện ${metricsCount} chỉ số định lượng (%, $, quy mô, hiệu năng) chứng minh năng lực thực tế.`
        : `Chỉ tìm thấy ${metricsCount} số liệu định lượng. Hãy bổ sung các con số cụ thể (VD: tăng 35% hiệu năng, giảm $12k chi phí, phục vụ 100k users).`,
    targetSection: 'experience',
  });

  // 4. Experience & Bullet Structure (20 pts)
  const expCount = cv.experience.length;
  const bulletLines = allExpAndProjText
    .split('\n')
    .filter((l) => l.trim().startsWith('•') || l.trim().startsWith('-') || l.trim().startsWith('*')).length;

  let expScore = 0;
  if (expCount >= 2 && bulletLines >= 5) expScore = 20;
  else if (expCount >= 1 && bulletLines >= 2) expScore = 13;
  else if (expCount >= 1) expScore = 7;

  checks.push({
    id: 'experience-bullets',
    title: 'Cấu trúc Kinh nghiệm & Gạch đầu dòng (Bullet Points)',
    category: 'structure',
    score: expScore,
    maxScore: 20,
    status: expScore >= 18 ? 'pass' : expScore >= 10 ? 'warning' : 'fail',
    feedback:
      expScore >= 18
        ? `Có ${expCount} mục kinh nghiệm với ${bulletLines} dòng gạch đầu dòng rõ ràng, dễ quét bằng mắt và ATS.`
        : 'Nên trình bày mô tả công việc dưới dạng các dòng gạch đầu dòng (•) thay vì đoạn văn dài.',
    targetSection: 'experience',
  });

  // 5. Categorized Skills & ATS Format (15 pts)
  const totalSkills = cv.skills.reduce((acc, g) => acc + g.skills.length, 0);
  let skillScore = 0;
  if (cv.skills.length >= 2 && totalSkills >= 8) skillScore = 15;
  else if (totalSkills >= 4) skillScore = 10;
  else if (totalSkills >= 1) skillScore = 5;

  checks.push({
    id: 'skills-depth',
    title: 'Mật độ Kỹ năng & Phân nhóm từ khóa ATS',
    category: 'keywords',
    score: skillScore,
    maxScore: 15,
    status: skillScore >= 13 ? 'pass' : skillScore >= 8 ? 'warning' : 'fail',
    feedback:
      skillScore >= 13
        ? `Đã liệt kê ${totalSkills} kỹ năng chia thành ${cv.skills.length} nhóm chuyên môn rõ ràng.`
        : `Hiện có ${totalSkills} kỹ năng. Nên liệt kê ít nhất 8–12 kỹ năng cốt lõi chia theo nhóm để tăng điểm khớp từ khóa ATS.`,
    targetSection: 'skills',
  });

  // 6. Cliché & Buzzword Check + Education (10 pts)
  const fullTextLower = [
    cv.summary,
    allExpAndProjText,
    ...cv.education.map((e) => `${e.school} ${e.degree}`),
  ]
    .join(' ')
    .toLowerCase();

  const foundCliches = CLICHE_WORDS.filter((w) => fullTextLower.includes(w.toLowerCase()));
  const hasEdu = cv.education.length > 0 && Boolean(cv.education[0].school.trim());

  let qualityScore = 0;
  if (hasEdu) qualityScore += 5;
  if (foundCliches.length === 0) qualityScore += 5;
  else if (foundCliches.length === 1) qualityScore += 2;

  checks.push({
    id: 'cliche-and-edu',
    title: 'Học vấn & Tránh từ ngữ sáo rỗng (Buzzwords)',
    category: 'keywords',
    score: qualityScore,
    maxScore: 10,
    status: qualityScore >= 9 ? 'pass' : qualityScore >= 5 ? 'warning' : 'fail',
    feedback:
      foundCliches.length > 0
        ? `Phát hiện từ sáo rỗng: "${foundCliches.join(', ')}". Hãy thay bằng hành động và kết quả thực tế.`
        : hasEdu
        ? 'Thông tin Học vấn đầy đủ, ngôn từ chuyên nghiệp không chứa từ sáo rỗng.'
        : 'Hãy bổ sung thông tin Học vấn (Trường học, Chuyên ngành).',
    targetSection: 'education',
  });

  const totalScore = checks.reduce((sum, c) => sum + c.score, 0);
  const wordCount = fullTextLower.split(/\s+/).filter(Boolean).length;

  let grade: AtsScoreResult['grade'] = 'Cần cải thiện nhiều';
  if (totalScore >= 85) grade = 'Xuất sắc (ATS Ready)';
  else if (totalScore >= 70) grade = 'Tốt (Cần tinh chỉnh nhẹ)';
  else if (totalScore >= 50) grade = 'Trung bình (Cần bổ sung)';

  return {
    totalScore,
    grade,
    checks,
    metricsCount,
    wordCount,
  };
}

// Curated dictionary of common tech, business, design, and soft skill terms for accurate JD extraction
const KNOWN_KEYWORDS = [
  'react', 'next.js', 'nextjs', 'typescript', 'javascript', 'node.js', 'nodejs', 'nestjs',
  'golang', 'go', 'python', 'java', 'spring boot', 'c#', '.net', 'php', 'laravel', 'vue', 'angular',
  'tailwind', 'css', 'html', 'graphql', 'rest api', 'grpc', 'microservices', 'postgresql', 'mysql',
  'mongodb', 'redis', 'kafka', 'rabbitmq', 'elasticsearch', 'docker', 'kubernetes', 'k8s', 'aws',
  'gcp', 'azure', 'ci/cd', 'github actions', 'gitlab ci', 'terraform', 'linux', 'git', 'agile',
  'scrum', 'tdd', 'unit test', 'jest', 'cypress', 'playwright', 'figma', 'design system', 'ux research',
  'wireframe', 'prototyping', 'a/b testing', 'product management', 'roadmap', 'kpi', 'okr', 'sql',
  'power bi', 'tableau', 'machine learning', 'ai', 'llm', 'rag', 'fastapi', 'django', 'SEO',
  'performance', 'scalability', 'security', 'oauth', 'jwt', 'system design', 'mentoring', 'leadership'
];

export interface JdMatchResult {
  matchPercentage: number;
  matchedKeywords: string[];
  missingKeywords: string[];
  totalExtracted: number;
}

export function matchJobDescription(cv: CVDocument, jdText: string): JdMatchResult {
  if (!jdText.trim()) {
    return {
      matchPercentage: 0,
      matchedKeywords: [],
      missingKeywords: [],
      totalExtracted: 0,
    };
  }

  const cvFullText = [
    cv.personalInfo.jobTitle,
    cv.summary,
    ...cv.experience.map((e) => `${e.position} ${e.company} ${e.description}`),
    ...cv.projects.map((p) => `${p.name} ${p.role} ${p.techStack.join(' ')} ${p.description}`),
    ...cv.skills.flatMap((g) => [g.category, ...g.skills.map((s) => s.name)]),
    ...cv.certifications.map((c) => `${c.name} ${c.issuer}`),
  ]
    .join(' ')
    .toLowerCase();

  const jdLower = jdText.toLowerCase();
  const extractedSet = new Set<string>();

  // 1. Check known industry keywords present in JD
  for (const kw of KNOWN_KEYWORDS) {
    const escaped = kw.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(`(^|[^a-z0-9])${escaped}([^a-z0-9]|$)`, 'i');
    if (regex.test(jdLower)) {
      extractedSet.add(kw);
    }
  }

  // 2. Also extract capitalized tech/domain terms from JD (e.g., FinTech, SaaS, CRM, ERP, BigQuery, Snowflake...)
  const capitalizedTokens = jdText.match(/\b([A-Z][A-Za-z0-9+#.-]{2,15})\b/g) || [];
  const STOP_CAP_WORDS = new Set([
    'The', 'And', 'For', 'With', 'You', 'Are', 'Will', 'Our', 'Who', 'What', 'Why', 'How',
    'Tuyển', 'Dụng', 'Mô', 'Tả', 'Công', 'Việc', 'Yêu', 'Cầu', 'Quyền', 'Lợi', 'Kinh', 'Nghiệm',
    'Ứng', 'Viên', 'Làm', 'Tại', 'Các', 'Một', 'Trong', 'Cho', 'Của', 'Được', 'Năng', 'Lực',
    'Full', 'Time', 'Senior', 'Junior', 'Middle', 'Lead', 'Manager', 'Staff', 'Team', 'Company',
  ]);

  for (const tok of capitalizedTokens) {
    const clean = tok.replace(/[.,;:()]/g, '');
    if (clean.length >= 2 && !STOP_CAP_WORDS.has(clean)) {
      extractedSet.add(clean.toLowerCase());
    }
  }

  const allKeywords = Array.from(extractedSet);
  const matchedKeywords: string[] = [];
  const missingKeywords: string[] = [];

  for (const kw of allKeywords) {
    if (cvFullText.includes(kw.toLowerCase())) {
      matchedKeywords.push(kw);
    } else {
      missingKeywords.push(kw);
    }
  }

  const totalExtracted = allKeywords.length;
  const matchPercentage =
    totalExtracted === 0 ? 0 : Math.round((matchedKeywords.length / totalExtracted) * 100);

  return {
    matchPercentage,
    matchedKeywords,
    missingKeywords,
    totalExtracted,
  };
}
