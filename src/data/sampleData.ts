import { CVDocument, LanguageCode, SectionId } from '../types/cv';

export const SECTION_LABELS: Record<LanguageCode, Record<SectionId, string>> = {
  vi: {
    summary: 'Tóm tắt chuyên môn',
    experience: 'Kinh nghiệm làm việc',
    education: 'Học vấn',
    projects: 'Dự án tiêu biểu',
    skills: 'Kỹ năng chuyên môn',
    certifications: 'Chứng chỉ & Giải thưởng',
    activities: 'Hoạt động & Tình nguyện',
    references: 'Người tham chiếu',
    custom: 'Mục bổ sung',
  },
  en: {
    summary: 'Professional Summary',
    experience: 'Work Experience',
    education: 'Education',
    projects: 'Key Projects',
    skills: 'Technical Skills',
    certifications: 'Certifications & Awards',
    activities: 'Leadership & Volunteering',
    references: 'References',
    custom: 'Additional Information',
  },
};

export const UI_LABELS: Record<LanguageCode, {
  present: string;
  gpa: string;
  availableUponRequest: string;
  dob: string;
  gender: string;
  techStack: string;
  role: string;
  link: string;
}> = {
  vi: {
    present: 'Hiện tại',
    gpa: 'GPA',
    availableUponRequest: 'Sẵn sàng cung cấp thông tin người tham chiếu khi có yêu cầu.',
    dob: 'Ngày sinh',
    gender: 'Giới tính',
    techStack: 'Công nghệ',
    role: 'Vai trò',
    link: 'Liên kết',
  },
  en: {
    present: 'Present',
    gpa: 'GPA',
    availableUponRequest: 'References available upon request.',
    dob: 'DOB',
    gender: 'Gender',
    techStack: 'Tech Stack',
    role: 'Role',
    link: 'Link',
  },
};

export interface XyzSuggestion {
  category: string;
  label: string;
  formula: string;
  exampleVi: string;
  exampleEn: string;
}

export const XYZ_STAR_SUGGESTIONS: XyzSuggestion[] = [
  {
    category: 'Software / IT',
    label: 'Tối ưu hiệu năng hệ thống (Performance)',
    formula: 'Đạt được [X]% cải thiện bằng cách thực hiện [Y] sử dụng công nghệ [Z]',
    exampleVi: '• Giảm **42% thời gian phản hồi API** (từ 480ms xuống 280ms) cho 1.2M người dùng bằng cách thiết kế lại tầng Redis Caching và tối ưu truy vấn PostgreSQL.',
    exampleEn: '• Reduced **API latency by 42%** (480ms to 280ms) across 1.2M MAU by re-architecting the Redis caching layer and optimizing PostgreSQL composite indexes.',
  },
  {
    category: 'Software / IT',
    label: 'Phát triển tính năng & Kiến trúc Frontend',
    formula: 'Xây dựng [X] giúp tăng [Y]% chỉ số kinh doanh thông qua [Z]',
    exampleVi: '• Kiến trúc và phát triển hệ thống **Micro-frontend bằng React 18 & TypeScript**, rút ngắn **35% thời gian build CI/CD** và tăng điểm Lighthouse Performance từ 68 lên **96**.',
    exampleEn: '• Architected a modular **React 18 & TypeScript frontend**, cutting **CI/CD build times by 35%** and boosting Lighthouse Performance score from 68 to **96**.',
  },
  {
    category: 'Product / UX Design',
    label: 'Cải thiện tỷ lệ chuyển đổi (Conversion Rate)',
    formula: 'Tăng [X]% tỷ lệ chuyển đổi bằng cách nghiên cứu & thiết kế lại [Y]',
    exampleVi: '• Tái thiết kế luồng thanh toán (Checkout Flow) dựa trên A/B Testing với 15,000 người dùng, giúp **tăng 24% tỷ lệ hoàn tất đơn hàng** và giảm 18% tỷ lệ bỏ giỏ hàng.',
    exampleEn: '• Redesigned the mobile checkout flow informed by A/B testing across 15,000 users, **increasing checkout conversion by 24%** and reducing cart drop-off by 18%.',
  },
  {
    category: 'Data / AI / Finance',
    label: 'Tự động hóa & Tiết kiệm chi phí',
    formula: 'Tiết kiệm [X] giờ/chi phí mỗi tháng nhờ tự động hóa quy trình [Y] bằng [Z]',
    exampleVi: '• Xây dựng pipeline tự động hóa báo cáo tài chính bằng **Python & Airflow**, tiết kiệm **120 giờ làm việc thủ công/tháng** và nâng độ chính xác dự báo doanh thu lên **94.5%**.',
    exampleEn: '• Built an automated financial reporting pipeline using **Python & Airflow**, saving **120+ manual hours/month** and improving revenue forecast accuracy to **94.5%**.',
  },
  {
    category: 'Marketing / Growth',
    label: 'Tăng trưởng người dùng & Doanh thu (ROI)',
    formula: 'Tạo ra [X] doanh thu/leads với chi phí giảm [Y]% nhờ chiến dịch [Z]',
    exampleVi: '• Dẫn dắt chiến dịch Performance Marketing đa kênh, mang về **18,500+ khách hàng tiềm năng (MQLs)**, giảm **28% chi phí CPA** và đóng góp **$320,000 doanh thu ARR**.',
    exampleEn: '• Spearheaded multi-channel growth campaigns generating **18,500+ MQLs**, lowering **CPA by 28%** while driving **$320,000 in net-new ARR**.',
  },
  {
    category: 'Leadership / Management',
    label: 'Quản lý đội ngũ & Quy trình Agile',
    formula: 'Dẫn dắt đội ngũ [X] thành viên bàn giao [Y] đúng hạn, cải thiện [Z]%',
    exampleVi: '• Trực tiếp dẫn dắt và mentor đội ngũ **8 kỹ sư Full-Stack**, áp dụng chuẩn Code Review & TDD giúp **giảm 60% lỗi Production** trong 3 quý liên tiếp.',
    exampleEn: '• Led and mentored a cross-functional squad of **8 Full-Stack Engineers**, instituting automated TDD and code reviews that **cut production bugs by 60%** over 3 quarters.',
  },
];

// Default SVG Avatar Data URL (clean professional illustration)
export const DEFAULT_AVATAR_URL =
  'data:image/svg+xml;utf8,' +
  encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 240" fill="none">
  <rect width="240" height="240" rx="40" fill="#EEF2FF"/>
  <circle cx="120" cy="92" r="44" fill="#6366F1"/>
  <path d="M48 212C48 168.922 80.2355 138 120 138C159.765 138 192 168.922 192 212" fill="#4F46E5"/>
</svg>
`);

export const SAMPLE_CV_VI: CVDocument = {
  id: 'cv-senior-fullstack-vi',
  title: 'CV Senior Full-Stack Engineer (Chuẩn ATS)',
  updatedAt: new Date().toISOString(),
  personalInfo: {
    fullName: 'NGUYỄN MINH KHÔI',
    jobTitle: 'Senior Full-Stack Software Engineer',
    avatarUrl: DEFAULT_AVATAR_URL,
    avatarShape: 'circle',
    avatarZoom: 1,
    email: 'minhkhoi.dev@gmail.com',
    phone: '+84 912 345 678',
    address: 'Quận 1, TP. Hồ Chí Minh, Việt Nam',
    dob: '1997-08-15',
    showDob: false,
    gender: 'Nam',
    showGender: false,
    socials: {
      linkedin: 'linkedin.com/in/minhkhoi-dev',
      github: 'github.com/minhkhoi-eng',
      website: 'minhkhoi.dev',
      portfolio: '',
    },
  },
  summary:
    'Kỹ sư Phần mềm Full-Stack với hơn **6 năm kinh nghiệm** kiến trúc và phát triển các hệ thống Web/Cloud hiệu năng cao trong lĩnh vực FinTech và E-Commerce. Chuyên sâu về **TypeScript, React, Next.js, Node.js và Go**, có thành tích thực tế trong việc mở rộng hệ thống phục vụ **2.5M+ người dùng hoạt động hàng tháng (MAU)**, tối ưu 45% chi phí hạ tầng AWS và dẫn dắt đội ngũ 8 kỹ sư đạt chuẩn Engineering Excellence.',
  experience: [
    {
      id: 'exp-1',
      company: 'FinNext Technologies (Singapore / HCMC)',
      position: 'Senior Full-Stack Engineer (Tech Lead)',
      location: 'TP. Hồ Chí Minh',
      startDate: '2023-03',
      endDate: '',
      isCurrent: true,
      description:
        '• Kiến trúc lại hệ thống Core Payment Gateway bằng **Node.js (NestJS), Go và Kafka**, nâng khả năng xử lý từ 300 lên **2,400 giao dịch/giây (TPS)** với độ trễ p99 dưới **120ms**.\n• Dẫn dắt quá trình chuyển đổi Frontend sang **Next.js 14 & React Server Components**, giảm **48% kích thước JS bundle** và nâng điểm Core Web Vitals lên **98/100**.\n• Thiết lập hệ thống CI/CD tự động hóa với **GitHub Actions, Docker & Kubernetes (EKS)**, rút ngắn thời gian triển khai Production từ 45 phút xuống còn **6 phút**.\n• Trực tiếp mentor **7 kỹ sư Junior/Mid-level**, chuẩn hóa quy trình Code Review và Unit/Integration Testing (độ phủ code tăng từ 42% lên **86%**).',
    },
    {
      id: 'exp-2',
      company: 'VinaCommerce Corp',
      position: 'Full-Stack Software Engineer',
      location: 'TP. Hồ Chí Minh',
      startDate: '2020-06',
      endDate: '2023-02',
      isCurrent: false,
      description:
        '• Phát triển hệ thống Quản lý Đơn hàng & Kho vận (OMS/WMS) thời gian thực phục vụ **8,500+ nhà bán hàng**, xử lý trung bình **180,000 đơn hàng/ngày**.\n• Tối ưu hóa các truy vấn phức tạp trên **PostgreSQL & Redis Cluster**, giúp giảm **62% tải CPU cơ sở dữ liệu** trong các đợt cao điểm Flash Sale (11/11, 12/12).\n• Xây dựng bộ **Design System UI Component Library** nội bộ bằng React, TypeScript & Storybook, giúp 4 nhóm sản phẩm tăng **30% tốc độ phát triển tính năng mới**.',
    },
  ],
  education: [
    {
      id: 'edu-1',
      school: 'Trường Đại học Bách Khoa — ĐHQG TP.HCM (HCMUT)',
      degree: 'Kỹ sư Khoa học Máy tính (Computer Science)',
      startDate: '2015-09',
      endDate: '2020-05',
      isCurrent: false,
      gpa: '3.68 / 4.0 (Loại Giỏi)',
      achievements: '• Học bổng Khuyến khích Học tập 4 học kỳ liên tiếp; Giải Nhì cuộc thi Hackathon Sinh viên Công nghệ 2019.',
    },
  ],
  projects: [
    {
      id: 'proj-1',
      name: 'DocuFlow AI — Hệ thống Phân tích & Tìm kiếm Tài liệu Thông minh',
      role: 'Creator & Lead Architect',
      startDate: '2024-01',
      endDate: '2024-08',
      techStack: ['Next.js', 'TypeScript', 'Python', 'FastAPI', 'pgvector', 'OpenAI', 'Tailwind CSS'],
      link: 'https://github.com/minhkhoi-eng/docuflow-ai',
      description:
        '• Xây dựng nền tảng RAG (Retrieval-Augmented Generation) cho phép doanh nghiệp truy vấn hàng chục nghìn tài liệu PDF/계약 với độ chính xác trích dẫn đạt **93%**.\n• Đạt **1,400+ GitHub Stars** và hơn **6,000 người dùng đăng ký** sau 3 tháng ra mắt trên Product Hunt.',
    },
  ],
  skills: [
    {
      id: 'sk-1',
      category: 'Ngôn ngữ lập trình',
      skills: [
        { id: 's1', name: 'TypeScript / JavaScript (ES6+)', level: 5 },
        { id: 's2', name: 'Golang', level: 4 },
        { id: 's3', name: 'Python', level: 4 },
        { id: 's4', name: 'SQL', level: 5 },
      ],
    },
    {
      id: 'sk-2',
      category: 'Frontend & UI',
      skills: [
        { id: 's5', name: 'React 18 / Next.js', level: 5 },
        { id: 's6', name: 'Redux / Zustand / TanStack Query', level: 5 },
        { id: 's7', name: 'Tailwind CSS / Design Systems', level: 5 },
        { id: 's8', name: 'Web Performance & Accessibility', level: 4 },
      ],
    },
    {
      id: 'sk-3',
      category: 'Backend, Data & Cloud DevOps',
      skills: [
        { id: 's9', name: 'Node.js / NestJS / Express', level: 5 },
        { id: 's10', name: 'PostgreSQL / Redis / MongoDB', level: 5 },
        { id: 's11', name: 'Kafka / RabbitMQ / Microservices', level: 4 },
        { id: 's12', name: 'AWS / Docker / Kubernetes / CI-CD', level: 4 },
      ],
    },
    {
      id: 'sk-4',
      category: 'Ngoại ngữ & Kỹ năng mềm',
      skills: [
        { id: 's13', name: 'Tiếng Anh (IELTS 7.5 — Giao tiếp & Tài liệu chuyên sâu)', level: 5 },
        { id: 's14', name: 'Agile / Scrum Leadership', level: 5 },
        { id: 's15', name: 'System Design & Technical Mentoring', level: 5 },
      ],
    },
  ],
  certifications: [
    {
      id: 'cert-1',
      name: 'AWS Certified Solutions Architect – Associate (SAA-C03)',
      issuer: 'Amazon Web Services (AWS)',
      date: '2023-11',
      url: 'https://aws.amazon.com/verification',
    },
    {
      id: 'cert-2',
      name: 'IELTS Academic 7.5 Overall',
      issuer: 'British Council',
      date: '2022-06',
      url: '',
    },
  ],
  activities: [
    {
      id: 'act-1',
      organization: 'Vietnam Web Summit & Cộng đồng GDG HCMC',
      role: 'Diễn giả khách mời & Mentor kỹ thuật',
      startDate: '2022-01',
      endDate: '2024-10',
      description:
        '• Chia sẻ chuyên đề "High-Performance React & Distributed Caching" cho hơn **450 kỹ sư phần mềm**; hướng dẫn 15 sinh viên CNTT hoàn thành đồ án tốt nghiệp.',
    },
  ],
  references: {
    availableUponRequest: true,
    items: [
      {
        id: 'ref-1',
        name: 'Trần Quốc Bảo',
        position: 'VP of Engineering',
        company: 'FinNext Technologies',
        email: 'bao.tran@finnext.io',
        phone: '+84 909 888 777',
      },
    ],
  },
  customSections: [
    {
      id: 'cust-1',
      sectionTitle: 'Công bố & Bài viết kỹ thuật',
      items: [
        {
          id: 'ci-1',
          title: 'Designing Idempotent Payment Systems at Scale',
          subtitle: 'Tác giả chính — Engineering Blog (25,000+ lượt đọc)',
          date: '2024-05',
          description: '• Phân tích chuyên sâu về cơ chế Distributed Lock, Outbox Pattern và xử lý đối soát giao dịch tài chính thời gian thực.',
        },
      ],
    },
  ],
  sectionsOrder: [
    { id: 'summary', visible: true },
    { id: 'experience', visible: true },
    { id: 'projects', visible: true },
    { id: 'skills', visible: true },
    { id: 'education', visible: true },
    { id: 'certifications', visible: true },
    { id: 'custom', visible: true },
    { id: 'activities', visible: false },
    { id: 'references', visible: true },
  ],
  design: {
    template: 'ats-standard',
    primaryColor: '#1e3a8a',
    fontFamily: 'Inter',
    fontSize: 9.0,
    lineHeight: 1.30,
    sectionGap: 10,
    pageMargin: 12,
    language: 'vi',
    dateFormat: 'MM/YYYY',
    skillDisplayStyle: 'comma',
    sidebarPosition: 'left',
  },
};

export const SAMPLE_CV_EN: CVDocument = {
  ...SAMPLE_CV_VI,
  id: 'cv-product-designer-en',
  title: 'CV Senior Product Designer (Modern 2-Column)',
  updatedAt: new Date().toISOString(),
  personalInfo: {
    ...SAMPLE_CV_VI.personalInfo,
    fullName: 'LINH PHAM',
    jobTitle: 'Senior Product Designer (UX/UI & Design Systems)',
    email: 'linh.pham.ux@gmail.com',
    address: 'Ho Chi Minh City, Vietnam',
    avatarShape: 'circle',
    socials: {
      linkedin: 'linkedin.com/in/linhpham-ux',
      github: '',
      website: 'linhpham.design',
      portfolio: 'behance.net/linhpham-ux',
    },
  },
  summary:
    'Product Designer with **5+ years of experience** crafting intuitive B2B SaaS and Consumer FinTech products across APAC. Proven track record of leading end-to-end UX research, building scalable multi-brand **Figma Design Systems**, and collaborating with engineering squads to boost user activation by **32%** and retention by **21%**.',
  design: {
    ...SAMPLE_CV_VI.design,
    template: 'modern-professional',
    primaryColor: '#4f46e5',
    fontFamily: 'Plus Jakarta Sans',
    language: 'en',
    dateFormat: 'MMM YYYY',
    skillDisplayStyle: 'pills',
  },
};
