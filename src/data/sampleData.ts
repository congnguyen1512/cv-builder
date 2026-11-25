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
    custom: 'Technical Highlights',
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
    category: 'Mobile & Edge AI',
    label: 'Tối ưu mô hình AI chạy trên thiết bị (On-Device Inference)',
    formula: 'Lượng hóa & triển khai [X] đạt [Y]% độ chính xác với độ trễ [Z]ms trên di động',
    exampleVi: '• Huấn luyện và lượng hóa mô hình **1D-CNN + Bi-LSTM sang TensorFlow Lite**, đạt **94.8% độ chính xác phát hiện té ngã** với độ trễ suy luận chỉ **18ms** chạy ngầm liên tục trên smartphone.',
    exampleEn: '• Trained and quantized a hybrid **1D-CNN + Bi-LSTM model to TensorFlow Lite**, achieving **94.8% fall detection accuracy** with **18ms inference latency** running in background on mobile devices.',
  },
  {
    category: 'Full-Stack & Cloud',
    label: 'Kiến trúc hệ thống thời gian thực (Realtime & Cloud)',
    formula: 'Xây dựng [X] phục vụ [Y] người dùng với độ trễ [Z]ms thông qua [Công nghệ]',
    exampleVi: '• Xây dựng hệ sinh thái kết nối thời gian thực bằng **Flutter, Node.js & Supabase**, đồng bộ tọa độ GPS và cảnh báo khẩn cấp SOS tới người thân trong **dưới 150ms**.',
    exampleEn: '• Architected a real-time safety ecosystem using **Flutter, Node.js & Supabase**, broadcasting live GPS telemetry and SOS alerts to family members in **under 150ms**.',
  },
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
  id: 'cv-nguyen-minh-cong-frontend-react-vi',
  title: 'CV Nguyễn Minh Công — Frontend Developer (React / TypeScript)',
  updatedAt: new Date().toISOString(),
  personalInfo: {
    fullName: 'NGUYỄN MINH CÔNG',
    jobTitle: 'Frontend Developer (React / TypeScript)',
    avatarUrl: DEFAULT_AVATAR_URL,
    avatarShape: 'circle',
    avatarZoom: 1,
    email: 'nguyenminhcong.lbu@gmail.com',
    phone: '0394 093 282',
    address: 'Ngũ Hành Sơn, TP. Đà Nẵng, Việt Nam',
    dob: '2004-12-15',
    showDob: false,
    gender: 'Nam',
    showGender: false,
    socials: {
      linkedin: 'https://www.linkedin.com/in/công-nguyễn-minh-023064450',
      github: 'https://github.com/congnguyen1512',
      website: 'https://caregiverweb.vercel.app',
      portfolio: 'https://dacn3-medical-dashboard.vercel.app',
    },
  },
  summary:
    'Frontend Software Engineer với nền tảng vững chắc về **React (v18/v19), TypeScript và Tailwind CSS**. Có kinh nghiệm thực chiến trong việc chuyển hóa bản vẽ thiết kế (Figma, UI/UX Design) thành giao diện Web **Responsive mượt mà trên mọi thiết bị** (Mobile, Tablet, Desktop) và tích hợp **RESTful API / Realtime WebSockets** bài bản với cơ chế xử lý lỗi chặt chẽ. Đam mê xây dựng sản phẩm chất lượng cao, tối ưu Web Performance (Lighthouse 98+) và làm việc nhóm hiệu quả theo quy trình Agile/Git workflow.',
  education: [
    {
      id: 'edu-1',
      school: 'Trường Đại học Công nghệ Thông tin và Truyền thông Việt - Hàn (VKU) – Đại học Đà Nẵng',
      degree: 'Kỹ sư Công nghệ Thông tin (Khoa Khoa học Máy tính — Lớp 22SE2, MSSV: 22IT039)',
      startDate: '2022-09',
      endDate: '2027-06',
      isCurrent: true,
      gpa: '3.2 / 4.0',
      achievements: '• Chuyên sâu về Frontend Architecture (React, TypeScript), UI/UX Engineering và Tích hợp API; GVHD Đồ án: TS. Hồ Văn Hùng.',
    },
  ],
  experience: [
    {
      id: 'exp-1',
      company: 'Trường Đại học CNTT & TT Việt - Hàn (VKU) – ĐH Đà Nẵng',
      position: 'Lead Frontend Developer (Caregiver Web Portal & Family Platform)',
      location: 'TP. Đà Nẵng',
      startDate: '2026-01',
      endDate: '',
      isCurrent: true,
      description:
        '• Trực tiếp phát triển giao diện Web Dashboard bằng **React, TypeScript, Tailwind CSS và Vite**, tối ưu hóa hiển thị Responsive 100% trên mọi kích thước màn hình từ bản vẽ thiết kế UI/UX.\n• Thiết kế kiến trúc tích hợp **RESTful API và Supabase Realtime (WebSockets)**, xử lý dữ liệu bất đồng bộ (định vị GPS, bản đồ tương tác, cảnh báo khẩn cấp SOS) với cơ chế retry và fallback an toàn.\n• Tối ưu kích thước bundle, áp dụng code-splitting và memoization giúp thời gian tải trang ban đầu (FCP) dưới **0.8s** và đạt điểm **Lighthouse Performance 98/100**.',
    },
    {
      id: 'exp-2',
      company: 'Freelance & Independent Engineering Projects',
      position: 'Frontend & Web Applications Developer',
      location: 'Đà Nẵng / Remote',
      startDate: '2025-06',
      endDate: '2026-02',
      isCurrent: false,
      description:
        '• Xây dựng các ứng dụng Single-Page Application (SPA) bằng **React 19 & TypeScript**: chuẩn hóa Design System, Dark/Light Mode và luồng tương tác người dùng mượt mà.\n• Thiết kế tầng API Client với Axios & Custom Hooks, tích hợp cơ chế **Auto-Fallback dưới 50ms** khi gặp lỗi Rate Limit (HTTP 429) hoặc timeout mạng.\n• Quản lý mã nguồn bằng Git/GitHub, cấu hình pipeline CI/CD tự động deploy lên Vercel, đảm bảo chuẩn Clean Code và khả năng tái sử dụng linh hoạt của các React Components.',
    },
  ],
  projects: [
    {
      id: 'proj-1',
      name: 'Trello Clone — Nền Tảng Kanban Quản Lý Dự Án Trực Quan Trên Cloud AWS',
      role: 'Frontend & Full-Stack Developer',
      startDate: '2025-03',
      endDate: '2025-08',
      techStack: ['React', 'TypeScript', 'Tailwind CSS', '@dnd-kit (Drag & Drop)', 'RESTful API', 'Docker', 'AWS S3'],
      link: 'https://github.com/congnguyen1512/trello_clone_cloud_aws',
      description:
        '• Xây dựng giao diện bảng Kanban kéo thả tương tác cao bằng **React và @dnd-kit**: hỗ trợ kéo thả Cards/Lists, gán nhãn, deadline, thiết kế chuẩn Responsive UI/UX SaaS hiện đại.\n• Tích hợp hệ thống **RESTful API** xác thực bảo mật JWT, đồng bộ trạng thái thời gian thực và quản lý upload tệp đính kèm lên Amazon S3 qua Pre-signed URLs.',
    },
    {
      id: 'proj-2',
      name: 'Caregiver Web Portal — Hệ Thống Giám Sát & Quản Trị Sức Khỏe Gia Đình',
      role: 'Lead Frontend Developer',
      startDate: '2026-01',
      endDate: '',
      techStack: ['React', 'TypeScript', 'Tailwind CSS', 'Vite', 'Supabase Realtime', 'RESTful API', 'Leaflet Maps'],
      link: 'https://caregiverweb.vercel.app/',
      description:
        '• Xây dựng toàn bộ giao diện Web Portal từ Figma wireframes: hiển thị bản đồ định vị GPS thời gian thực (Leaflet), nhận cảnh báo khẩn cấp SOS tức thì và quản trị dữ liệu thành viên.\n• Xây dựng tầng API Integration với Custom React Hooks, quản lý Cache dữ liệu và phân chia giao diện Responsive chuyên nghiệp.',
    },
    {
      id: 'proj-3',
      name: 'GGTran — Ứng Dụng Web Dịch Thuật Đa Nhà Cung Cấp Với Cơ Chế Auto-Fallback',
      role: 'Frontend Developer (React 19)',
      startDate: '2025-09',
      endDate: '2026-01',
      techStack: ['React 19', 'TypeScript', 'Tailwind CSS', 'Vite', 'Axios', 'REST API Failover Architecture'],
      link: 'https://github.com/congnguyen1512',
      description:
        '• Xây dựng ứng dụng dịch thuật thời gian thực bằng **React 19 & TypeScript**, tích hợp kết nối đồng thời nhiều RESTful APIs với cơ chế tự động chuyển đổi nhà cung cấp dự phòng khi quá tải trong <50ms.\n• Tối ưu hóa giao diện người dùng Responsive, lưu trữ lịch sử dịch cục bộ và hiển thị độ trễ API trực quan.',
    },
  ],
  skills: [
    {
      id: 'sk-1',
      category: 'Frontend Core & UI/UX',
      skills: [
        { id: 's1', name: 'React (v18 & v19) & Modern Hooks', level: 5 },
        { id: 's2', name: 'TypeScript & JavaScript (ES6+)', level: 5 },
        { id: 's3', name: 'Tailwind CSS & Responsive Web Design', level: 5 },
        { id: 's4', name: 'Figma-to-Code & Design Systems', level: 5 },
        { id: 's5', name: 'HTML5, CSS3 / Flexbox & Grid', level: 5 },
      ],
    },
    {
      id: 'sk-2',
      category: 'API Integration & State Management',
      skills: [
        { id: 's6', name: 'RESTful API Integration (Axios / Fetch)', level: 5 },
        { id: 's7', name: 'TanStack Query / Async State Handling', level: 5 },
        { id: 's8', name: 'Realtime WebSockets & Supabase Sync', level: 5 },
        { id: 's9', name: 'Context API / Zustand / Redux Toolkit', level: 4 },
      ],
    },
    {
      id: 'sk-3',
      category: 'Build Tools & DevOps',
      skills: [
        { id: 's10', name: 'Vite & Webpack Bundling', level: 5 },
        { id: 's11', name: 'Git, GitHub Flow & Code Review', level: 5 },
        { id: 's12', name: 'Vercel CI/CD & Automated Deployments', level: 5 },
        { id: 's13', name: 'Web Performance & Accessibility (a11y)', level: 4 },
      ],
    },
    {
      id: 'sk-4',
      category: 'Backend & Nền tảng mở rộng',
      skills: [
        { id: 's14', name: 'Node.js, Express.js & RESTful Design', level: 4 },
        { id: 's15', name: 'PostgreSQL, Supabase & Postman API Testing', level: 5 },
        { id: 's16', name: 'Agile / Scrum Team Collaboration', level: 5 },
      ],
    },
  ],
  certifications: [
    {
      id: 'cert-1',
      name: 'Kỹ sư Công nghệ Thông tin (Chuyên ngành Kỹ thuật Phần mềm)',
      issuer: 'Trường Đại học CNTT & TT Việt - Hàn (VKU) – ĐH Đà Nẵng',
      date: '2022 - 2027',
      url: 'https://vku.udn.vn',
    },
    {
      id: 'cert-2',
      name: 'Đồ án Tốt nghiệp Xuất sắc: Nền tảng Chăm sóc Gia đình & Web Portal Realtime',
      issuer: 'Khoa Khoa học Máy tính — VKU (GVHD: TS. Hồ Văn Hùng)',
      date: '2026',
      url: 'https://caregiverweb.vercel.app/',
    },
  ],
  activities: [
    {
      id: 'act-1',
      organization: 'Cộng đồng Công nghệ VKU & Mã nguồn Mở',
      role: 'Thành viên & Chia sẻ Kỹ thuật',
      startDate: '2023-01',
      endDate: '2026-03',
      description:
        '• Tích cực đóng góp các dự án mã nguồn mở trên GitHub, hỗ trợ chia sẻ kiến thức về lập trình React và xây dựng giao diện Responsive cho sinh viên khóa dưới.',
    },
  ],
  references: {
    availableUponRequest: true,
    items: [
      {
        id: 'ref-1',
        name: 'TS. Hồ Văn Hùng',
        position: 'Giảng viên hướng dẫn Đồ án Tốt nghiệp',
        company: 'Khoa Khoa học Máy tính — Trường ĐH CNTT & TT Việt - Hàn (VKU)',
        email: 'hvhung@vku.udn.vn',
        phone: 'Liên hệ qua khoa / trường',
      },
    ],
  },
  customSections: [
    {
      id: 'cust-1',
      sectionTitle: 'Điểm nhấn Kỹ thuật Frontend',
      items: [
        {
          id: 'ci-1',
          title: 'Tối ưu hóa Hiệu năng Web & Trải nghiệm Người dùng (Web Vitals & Responsive)',
          subtitle: 'Trọng tâm phát triển sản phẩm — React 18/19, TypeScript & Tailwind CSS',
          date: '2026',
          description: '• Thành thạo biến ý tưởng từ Figma thành mã nguồn sạch, tối ưu hóa tái sử dụng Component, thời gian tải trang nhanh và xử lý mượt mà dữ liệu API thời gian thực.',
        },
      ],
    },
  ],
  sectionsOrder: [
    { id: 'summary', visible: true },
    { id: 'education', visible: true },
    { id: 'experience', visible: true },
    { id: 'projects', visible: true },
    { id: 'skills', visible: true },
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
    sectionGap: 9,
    pageMargin: 11,
    language: 'vi',
    dateFormat: 'MM/YYYY',
    skillDisplayStyle: 'comma',
    sidebarPosition: 'left',
  },
};

export const SAMPLE_CV_EN: CVDocument = {
  ...SAMPLE_CV_VI,
  id: 'cv-nguyen-minh-cong-frontend-react-en',
  title: 'CV Nguyen Minh Cong — Frontend Developer (React / TypeScript) — ATS Standard',
  updatedAt: new Date().toISOString(),
  personalInfo: {
    ...SAMPLE_CV_VI.personalInfo,
    fullName: 'NGUYEN MINH CONG',
    jobTitle: 'Frontend Developer (React / TypeScript)',
    email: 'nguyenminhcong.lbu@gmail.com',
    phone: '+84 394 093 282',
    address: 'Da Nang City, Vietnam',
    avatarShape: 'circle',
    socials: {
      linkedin: 'https://www.linkedin.com/in/công-nguyễn-minh-023064450',
      github: 'https://github.com/congnguyen1512',
      website: 'https://caregiverweb.vercel.app',
      portfolio: 'https://dacn3-medical-dashboard.vercel.app',
    },
  },
  summary:
    'Frontend Software Engineer with deep expertise in **React (v18/v19), TypeScript, and Tailwind CSS**. Proven track record of translating Figma UI/UX designs into pixel-perfect, fully **responsive web applications** across all screen sizes (Mobile, Tablet, Desktop) and architecting structured **RESTful API & Realtime WebSocket integrations**. Passionate about clean modular code, state management (TanStack Query / Context), and web performance optimization (Lighthouse 98+).',
  education: [
    {
      id: 'edu-1',
      school: 'Vietnam - Korea University of ICT (VKU) – The University of Danang',
      degree: 'B.Eng. in Information Technology / Software Engineering (Class 22SE2, ID: 22IT039)',
      startDate: '2022-09',
      endDate: '2027-06',
      isCurrent: true,
      gpa: '3.2 / 4.0',
      achievements: '• Specialization in Frontend Engineering (React, TypeScript), UI/UX Systems, and Realtime API Integration. Thesis Advisor: Ph.D. Ho Van Hung.',
    },
  ],
  experience: [
    {
      id: 'exp-1',
      company: 'Vietnam - Korea University of ICT (VKU) – The University of Danang',
      position: 'Lead Frontend Developer (Caregiver Web Portal & Family Platform)',
      location: 'Da Nang City, Vietnam',
      startDate: '2026-01',
      endDate: '',
      isCurrent: true,
      description:
        '• Built the core Web Portal dashboard from scratch using **React, TypeScript, Tailwind CSS, and Vite**, achieving 100% responsive parity across Desktop, Tablet, and Mobile.\n• Integrated **RESTful APIs and Supabase Realtime (WebSockets)** for live GPS telemetry, interactive map rendering, and instant emergency alerts with robust error boundaries.\n• Applied route-based code splitting and component memoization, reducing First Contentful Paint (FCP) to **under 0.8s** and scoring **98/100 on Google Lighthouse**.',
    },
    {
      id: 'exp-2',
      company: 'Freelance & Independent Engineering Projects',
      position: 'Frontend & Web Applications Developer',
      location: 'Da Nang / Remote',
      startDate: '2025-06',
      endDate: '2026-02',
      isCurrent: false,
      description:
        '• Engineered modern SPAs using **React 19 & TypeScript**: standardized design systems, light/dark theme toggles, and seamless interactive user flows.\n• Architected a prioritized multi-provider API layer with **automated <50ms fallback** on HTTP 429 rate limits or timeouts, ensuring continuous 99.9% availability.\n• Maintained code quality via Git/GitHub, automated Vercel CI/CD deployment pipelines, and focused on component modularity and reusability.',
    },
  ],
  projects: [
    {
      id: 'proj-1',
      name: 'Trello Clone — Cloud-Native Drag & Drop Kanban Web Platform',
      role: 'Frontend & Full-Stack Developer',
      startDate: '2025-03',
      endDate: '2025-08',
      techStack: ['React', 'TypeScript', 'Tailwind CSS', '@dnd-kit', 'RESTful API', 'Docker', 'AWS S3'],
      link: 'https://github.com/congnguyen1512/trello_clone_cloud_aws',
      description:
        '• Developed an interactive drag-and-drop Kanban board with **React and @dnd-kit**: supporting multi-column cards, color labels, deadlines, and a responsive SaaS layout.\n• Integrated secure JWT-authenticated **RESTful APIs**, instant state synchronization, and direct media attachment uploads to Amazon S3 via Pre-signed URLs.',
    },
    {
      id: 'proj-2',
      name: 'Caregiver Web Portal — Real-time Family Health & Safety Dashboard',
      role: 'Lead Frontend Developer',
      startDate: '2026-01',
      endDate: '',
      techStack: ['React', 'TypeScript', 'Tailwind CSS', 'Vite', 'Supabase Realtime', 'RESTful API', 'Leaflet Maps'],
      link: 'https://caregiverweb.vercel.app/',
      description:
        '• Developed a responsive web portal from Figma wireframes: live GPS geofencing maps (Leaflet), instant emergency alert dispatcher, and family record management.\n• Engineered custom React hooks for API data caching, resilient WebSocket listeners, and clean component isolation.',
    },
    {
      id: 'proj-3',
      name: 'GGTran — Resilient Multi-Provider AI Translation Web Application',
      role: 'Frontend Developer (React 19)',
      startDate: '2025-09',
      endDate: '2026-01',
      techStack: ['React 19', 'TypeScript', 'Tailwind CSS', 'Vite', 'Axios', 'REST API Failover'],
      link: 'https://github.com/congnguyen1512',
      description:
        '• Built a responsive translation web app with **React 19 & TypeScript**, connecting multiple AI APIs with prioritized <50ms automated fallback upon rate limits.\n• Features localized translation history caching, low-latency client rendering, and live provider attribution telemetry.',
    },
  ],
  skills: [
    {
      id: 'sk-1',
      category: 'Frontend Core & UI/UX',
      skills: [
        { id: 's1', name: 'React (v18 & v19) & Modern Hooks', level: 5 },
        { id: 's2', name: 'TypeScript & JavaScript (ES6+)', level: 5 },
        { id: 's3', name: 'Tailwind CSS & Responsive Web Design', level: 5 },
        { id: 's4', name: 'Figma-to-Code & Design Systems', level: 5 },
        { id: 's5', name: 'HTML5, CSS3 / Flexbox & Grid', level: 5 },
      ],
    },
    {
      id: 'sk-2',
      category: 'API Integration & State Management',
      skills: [
        { id: 's6', name: 'RESTful API Integration (Axios / Fetch)', level: 5 },
        { id: 's7', name: 'TanStack Query / Async State Handling', level: 5 },
        { id: 's8', name: 'Realtime WebSockets & Supabase Sync', level: 5 },
        { id: 's9', name: 'Context API / Zustand / Redux Toolkit', level: 4 },
      ],
    },
    {
      id: 'sk-3',
      category: 'Build Tools & DevOps',
      skills: [
        { id: 's10', name: 'Vite & Webpack Bundling', level: 5 },
        { id: 's11', name: 'Git, GitHub Flow & Code Review', level: 5 },
        { id: 's12', name: 'Vercel CI/CD & Automated Deployments', level: 5 },
        { id: 's13', name: 'Web Performance & Accessibility (a11y)', level: 4 },
      ],
    },
    {
      id: 'sk-4',
      category: 'Backend & Broader Engineering',
      skills: [
        { id: 's14', name: 'Node.js, Express.js & RESTful Design', level: 4 },
        { id: 's15', name: 'PostgreSQL, Supabase & Postman API Testing', level: 5 },
        { id: 's16', name: 'Agile / Scrum Team Collaboration', level: 5 },
      ],
    },
  ],
  certifications: [
    {
      id: 'cert-1',
      name: 'B.Eng. in Information Technology (Software Engineering)',
      issuer: 'Vietnam - Korea University of ICT (VKU) – The University of Danang',
      date: '2022 - 2027',
      url: 'https://vku.udn.vn',
    },
    {
      id: 'cert-2',
      name: 'Graduation Thesis Spotlight: Realtime Web Portal & Family Platform',
      issuer: 'Faculty of Computer Science — VKU (Advisor: Ph.D. Ho Van Hung)',
      date: '2026',
      url: 'https://caregiverweb.vercel.app/',
    },
  ],
  references: {
    availableUponRequest: true,
    items: [
      {
        id: 'ref-1',
        name: 'Ph.D. Ho Van Hung',
        position: 'Graduation Thesis Advisor',
        company: 'Faculty of Computer Science — VKU',
        email: 'hvhung@vku.udn.vn',
        phone: 'Available through university office',
      },
    ],
  },
  customSections: [
    {
      id: 'cust-1',
      sectionTitle: 'Frontend Technical Highlights',
      items: [
        {
          id: 'ci-1',
          title: 'Modern Web Performance, Responsive Architecture & Realtime APIs',
          subtitle: 'Core Focus — React 18/19, TypeScript & Tailwind CSS',
          date: '2026',
          description: '• Proven proficiency in translating Figma designs into high-performance, mobile-first responsive interfaces and engineering resilient RESTful & WebSocket API integrations.',
        },
      ],
    },
  ],
  sectionsOrder: [
    { id: 'summary', visible: true },
    { id: 'education', visible: true },
    { id: 'experience', visible: true },
    { id: 'projects', visible: true },
    { id: 'skills', visible: true },
    { id: 'certifications', visible: true },
    { id: 'custom', visible: true },
    { id: 'activities', visible: false },
    { id: 'references', visible: true },
  ],
  design: {
    ...SAMPLE_CV_VI.design,
    template: 'ats-standard',
    primaryColor: '#0369a1',
    fontFamily: 'Inter',
    language: 'en',
    dateFormat: 'MMM YYYY',
    skillDisplayStyle: 'comma',
  },
};
