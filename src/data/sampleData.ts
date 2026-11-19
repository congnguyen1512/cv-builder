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
  id: 'cv-nguyen-minh-cong-vi',
  title: 'CV Nguyễn Minh Công — Mobile & Full-Stack / Edge AI (Chuẩn ATS & A4)',
  updatedAt: new Date().toISOString(),
  personalInfo: {
    fullName: 'NGUYỄN MINH CÔNG',
    jobTitle: 'Mobile & Full-Stack Developer | Edge AI & Intelligent Automation',
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
    'Sinh viên năm cuối Kỹ sư Công nghệ Thông tin tại **VKU (Đại học Đà Nẵng)**. Chuyên sâu phát triển ứng dụng di động đa nền tảng với **Flutter (Clean Architecture)**, xây dựng hệ thống Web Full-Stack hiện đại (**React, TypeScript, Node.js, Supabase**) và tích hợp mô hình **Edge AI / Deep Learning (TensorFlow Lite, 1D-CNN + Bi-LSTM, PyTorch)** chạy trực tiếp trên thiết bị di động. Có kinh nghiệm thực chiến phát triển các giải pháp tự động hóa thông minh quy mô lớn với **n8n AI Automation, Python Video Pipeline & Puppeteer**.',
  experience: [
    {
      id: 'exp-1',
      company: 'Trường Đại học CNTT & TT Việt - Hàn (VKU) – ĐH Đà Nẵng',
      position: 'Lead Mobile & Edge AI Engineer (Đồ án Tốt nghiệp Kỹ sư CNTT)',
      location: 'TP. Đà Nẵng',
      startDate: '2026-01',
      endDate: '',
      isCurrent: true,
      description:
        '• Kiến trúc và phát triển nền tảng **Support Family (FamilyGuard)** bằng **Flutter (Clean Architecture)** phục vụ 3 nhóm đối tượng (Người bảo hộ, Người cao tuổi, Trẻ em) kết hợp Caregiver Web Portal.\n• Huấn luyện mô hình học sâu **1D-CNN + Bi-LSTM** trên dữ liệu chuỗi thời gian cảm biến IMU (Gia tốc & Con quay hồi chuyển 50Hz); lượng hóa mô hình sang **TensorFlow Lite chạy On-device ngầm** trên smartphone, phát hiện té ngã thời gian thực với độ trễ thấp và không phụ thuộc thiết bị ngoại vi đắt tiền.\n• Xây dựng Backend với **Node.js, TypeScript, Supabase Realtime và Firebase FCM** xử lý đồng bộ trạng thái tức thì, định vị GPS Geofencing, kích hoạt phát tín hiệu SOS khẩn cấp và đếm ngược xác thực.',
    },
    {
      id: 'exp-2',
      company: 'Freelance & Independent Engineering Projects',
      position: 'Full-Stack & AI Automation Engineer',
      location: 'Đà Nẵng / Remote',
      startDate: '2025-06',
      endDate: '2026-02',
      isCurrent: false,
      description:
        '• Thiết kế & vận hành hệ thống **AI Automation trên n8n** tự động đăng bài lên mạng lưới Fanpage Facebook: tự động nhân bản workflow mẫu, phân bổ 10 slot Fanpage (PhoAiUltimateFacebookPost), cập nhật Credential Via và kích hoạt thông qua **n8n MCP Server & REST API**.\n• Phát triển phần mềm tự động hóa toàn diện quy trình sản xuất video dọc 9:16 (1080x1920) bằng Python: tự động ghép giọng đọc **Neural AI (Edge-TTS)** liền mạch 100%, hiệu ứng chuyển động Ken Burns, render banner tiêu đề và phụ đề tiếng Việt chuẩn vùng an toàn TikTok/Reels.\n• Xây dựng công cụ tự động hóa trình duyệt chống phát hiện bằng **Puppeteer Stealth** và Chrome Extension Manifest V3 xử lý kiểm tra và trích xuất dữ liệu qua GraphQL.',
    },
  ],
  education: [
    {
      id: 'edu-1',
      school: 'Trường Đại học Công nghệ Thông tin và Truyền thông Việt - Hàn (VKU) – Đại học Đà Nẵng',
      degree: 'Kỹ sư Công nghệ Thông tin (Khoa Khoa học Máy tính — Lớp 22SE2, MSSV: 22IT039)',
      startDate: '2022-09',
      endDate: '2027-06',
      isCurrent: true,
      gpa: '3.2 / 4.0',
      achievements: '• GVHD Đồ án Tốt nghiệp: TS. Hồ Văn Hùng; Nghiên cứu & phát triển chuyên sâu về On-Device Edge AI, Mobile Cross-Platform và Cloud Web Systems.',
    },
  ],
  projects: [
    {
      id: 'proj-1',
      name: 'Support Family (FamilyGuard) — Hệ Sinh Thái Chăm Sóc & Bảo Vệ Gia Đình Thông Minh (Edge AI)',
      role: 'Full-Stack Mobile & Edge AI Developer (Đồ án Tốt nghiệp Flagship)',
      startDate: '2026-01',
      endDate: '',
      techStack: ['Flutter', 'Dart', 'Clean Architecture', 'TensorFlow Lite', '1D-CNN + Bi-LSTM', 'Node.js', 'TypeScript', 'Supabase Realtime', 'Firebase FCM'],
      link: 'https://caregiverweb.vercel.app/',
      description:
        '• Xây dựng hệ sinh thái kết nối gia đình đa vai trò: phát hiện té ngã On-device bằng mô hình 1D-CNN + Bi-LSTM (TFLite) từ cảm biến IMU, định vị GPS Geofencing, cảnh báo khẩn cấp SOS và Chat thời gian thực qua Supabase & Firebase FCM.\n• Live Web: caregiverweb.vercel.app | Mã nguồn: github.com/congnguyen1512/Support_Family.',
    },
    {
      id: 'proj-2',
      name: 'Medical AI Dashboard — Hệ Thống Phân Loại Ảnh CT/MRI & Hỗ Trợ Chẩn Đoán Đột Quỵ',
      role: 'AI & Full-Stack Developer',
      startDate: '2025-09',
      endDate: '2026-01',
      techStack: ['Python', 'PyTorch (.pth)', 'Keras / TensorFlow', 'Node.js', 'Express', 'Medical Imaging'],
      link: 'https://dacn3-medical-dashboard.vercel.app/',
      description:
        '• Thiết kế pipeline suy luận AI tự động 2 giai đoạn: Giai đoạn 1 nhận diện tự động ảnh CT hay MRI (Keras), sau đó tự động điều hướng sang mô hình PyTorch chuyên biệt phát hiện tổn thương đột quỵ và hiển thị kết quả chẩn đoán trực quan trên Web Dashboard.\n• Live Web: dacn3-medical-dashboard.vercel.app | GitHub: github.com/congnguyen1512/CT_AND_MRI.',
    },
    {
      id: 'proj-3',
      name: 'Trello Clone — Nền Tảng Quản Lý Dự Án & Kanban Trên Cloud AWS',
      role: 'Full-Stack & Cloud Engineer',
      startDate: '2025-03',
      endDate: '2025-08',
      techStack: ['React', 'Node.js', 'Express', 'MongoDB / PostgreSQL', 'AWS (EC2, S3, CloudFront)', 'Docker', '@dnd-kit'],
      link: 'https://github.com/congnguyen1512/trello_clone_cloud_aws',
      description:
        '• Xây dựng bảng Kanban tương tác kéo thả mượt mà với React & @dnd-kit, backend RESTful API bảo mật với JWT, upload tệp trực tiếp lên Amazon S3 qua Pre-signed URL, đóng gói Docker và triển khai hạ tầng Cloud AWS (EC2, S3, CloudFront).',
    },
  ],
  skills: [
    {
      id: 'sk-1',
      category: 'Mobile & Edge AI',
      skills: [
        { id: 's1', name: 'Flutter & Dart (Clean Architecture)', level: 5 },
        { id: 's2', name: 'TensorFlow Lite On-Device Inference', level: 5 },
        { id: 's3', name: 'IMU Sensors (Accelerometer & Gyroscope 50Hz)', level: 5 },
        { id: 's4', name: 'GPS Tracking, Geofencing & Firebase FCM', level: 5 },
      ],
    },
    {
      id: 'sk-2',
      category: 'Frontend & Backend Web',
      skills: [
        { id: 's5', name: 'React (18/19), TypeScript, Tailwind CSS, Vite', level: 5 },
        { id: 's6', name: 'Node.js, Express.js, RESTful API Design', level: 5 },
        { id: 's7', name: 'Supabase (PostgreSQL, Auth, Realtime) & MySQL', level: 5 },
        { id: 's8', name: 'Python (FastAPI), PHP (Laravel 10)', level: 4 },
      ],
    },
    {
      id: 'sk-3',
      category: 'AI, Deep Learning & Automation',
      skills: [
        { id: 's9', name: 'Deep Learning: 1D-CNN + Bi-LSTM, Keras, PyTorch', level: 5 },
        { id: 's10', name: 'n8n AI Automation (Auto-Post 10-Slot Fanpage & Via)', level: 5 },
        { id: 's11', name: 'Python Video Pipeline (Edge-TTS 9:16 FHD, Ken Burns)', level: 5 },
        { id: 's12', name: 'Puppeteer Stealth, Chrome Extensions (MV3)', level: 4 },
      ],
    },
    {
      id: 'sk-4',
      category: 'DevOps & Công cụ phát triển',
      skills: [
        { id: 's13', name: 'Git, GitHub, Vercel CI/CD, Docker, AWS (EC2/S3)', level: 4 },
        { id: 's14', name: 'Postman, REST/MCP Debugging, Agile/Scrum', level: 5 },
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
      name: 'Đồ án Tốt nghiệp Xuất sắc: Ứng dụng Edge AI & Deep Learning trong Bảo vệ Gia đình',
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
        '• Tích cực đóng góp các dự án mã nguồn mở trên GitHub, hỗ trợ chia sẻ kiến thức về lập trình Flutter và tích hợp mô hình Edge AI TFLite cho sinh viên khóa dưới.',
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
      sectionTitle: 'Điểm nhấn Kỹ thuật & Nghiên cứu',
      items: [
        {
          id: 'ci-1',
          title: 'Nghiên cứu & Ứng dụng Edge AI On-Device trong Y tế & An toàn Gia đình',
          subtitle: 'Trọng tâm nghiên cứu thực chiến — Mô hình 1D-CNN + Bi-LSTM & TFLite Quantization',
          date: '2026',
          description: '• Đột phá kỹ thuật trong việc đưa mô hình Học sâu chạy trực tiếp theo thời gian thực (50Hz) trên thiết bị di động với mức tiêu thụ tài nguyên tối thiểu, không cần kết nối mạng liên tục hay cảm biến đeo chuyên dụng.',
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
  id: 'cv-nguyen-minh-cong-en',
  title: 'CV Nguyen Minh Cong — Mobile & Full-Stack / Edge AI (English ATS)',
  updatedAt: new Date().toISOString(),
  personalInfo: {
    ...SAMPLE_CV_VI.personalInfo,
    fullName: 'NGUYEN MINH CONG',
    jobTitle: 'Mobile & Full-Stack Developer | Edge AI & Intelligent Automation',
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
    'Final-year Information Technology Engineering student at **Vietnam - Korea University of ICT (VKU – The University of Danang)**. Passionate about crafting cross-platform mobile apps with **Flutter (Clean Architecture)**, building scalable Full-Stack Web systems (**React, TypeScript, Node.js, Supabase**), and deploying on-device **Edge AI / Deep Learning models (TensorFlow Lite, 1D-CNN + Bi-LSTM, PyTorch)**. Experienced in large-scale workflow automation using **n8n AI Automation, Python Video Pipeline & Puppeteer**.',
  experience: [
    {
      id: 'exp-1',
      company: 'Vietnam - Korea University of ICT (VKU) – The University of Danang',
      position: 'Lead Mobile & Edge AI Engineer (Graduation Thesis)',
      location: 'Da Nang City, Vietnam',
      startDate: '2026-01',
      endDate: '',
      isCurrent: true,
      description:
        '• Architected the **Support Family (FamilyGuard)** ecosystem using **Flutter (Clean Architecture)** for 3 family roles (Guardian, Senior, Child) alongside a Caregiver Web portal.\n• Trained a hybrid **1D-CNN + Bi-LSTM** deep learning model on IMU time-series sensor signals (Accelerometer & Gyroscope 50Hz); quantized to **TensorFlow Lite for on-device background inference** on smartphones, detecting falls in real-time without expensive wearables.\n• Engineered backend services with **Node.js, TypeScript, Supabase Realtime, and Firebase FCM** for instant state synchronization, GPS Geofencing, and automated emergency SOS alerts.',
    },
    {
      id: 'exp-2',
      company: 'Freelance & Independent Engineering Projects',
      position: 'Full-Stack & AI Automation Engineer',
      location: 'Da Nang / Remote',
      startDate: '2025-06',
      endDate: '2026-02',
      isCurrent: false,
      description:
        '• Engineered an **n8n AI Automation** pipeline for automated Facebook Fanpage publishing: programmatic master workflow cloning, mapping 10 Fanpage slots (PhoAiUltimateFacebookPost), Via credential rotation, and activation via **n8n MCP Server & REST API**.\n• Developed a full-fledged Python 9:16 vertical video production engine (1080x1920) with seamless **Edge-TTS Neural voiceover**, Ken Burns motion effects, title banner rendering, and TikTok/Reels safe-zone subtitles.\n• Created anti-detect browser automation scripts using **Puppeteer Stealth** and Manifest V3 Chrome Extensions for batch GraphQL verification.',
    },
  ],
  education: [
    {
      id: 'edu-1',
      school: 'Vietnam - Korea University of ICT (VKU) – The University of Danang',
      degree: 'B.Eng. in Information Technology / Software Engineering (Class 22SE2, ID: 22IT039)',
      startDate: '2022-09',
      endDate: '2027-06',
      isCurrent: true,
      gpa: '3.2 / 4.0',
      achievements: '• Thesis Advisor: Ph.D. Ho Van Hung; In-depth specialization in On-Device Edge AI, Cross-Platform Mobile, and Cloud Web Architecture.',
    },
  ],
  projects: [
    {
      id: 'proj-1',
      name: 'Support Family (FamilyGuard) — Intelligent Family Safety Care Platform (Edge AI)',
      role: 'Full-Stack Mobile & Edge AI Developer (Flagship Graduation Thesis)',
      startDate: '2026-01',
      endDate: '',
      techStack: ['Flutter', 'Dart', 'Clean Architecture', 'TensorFlow Lite', '1D-CNN + Bi-LSTM', 'Node.js', 'TypeScript', 'Supabase Realtime', 'Firebase FCM'],
      link: 'https://caregiverweb.vercel.app/',
      description:
        '• Multi-role family safety platform: on-device 1D-CNN + Bi-LSTM fall detection (TFLite) via IMU sensors, live GPS Geofencing, emergency SOS dispatch, and real-time chat via Supabase & Firebase FCM.\n• Live Web: caregiverweb.vercel.app | Source: github.com/congnguyen1512/Support_Family.',
    },
    {
      id: 'proj-2',
      name: 'Medical AI Dashboard — Two-Stage CT/MRI & Stroke Classification System',
      role: 'AI & Full-Stack Developer',
      startDate: '2025-09',
      endDate: '2026-01',
      techStack: ['Python', 'PyTorch (.pth)', 'Keras / TensorFlow', 'Node.js', 'Express', 'Medical Imaging'],
      link: 'https://dacn3-medical-dashboard.vercel.app/',
      description:
        '• Two-stage automated AI diagnostic pipeline: Stage 1 automatically identifies CT vs. MRI scan (Keras), dynamically routing to specialized PyTorch stroke classification models with live confidence visualization.\n• Live Web: dacn3-medical-dashboard.vercel.app | GitHub: github.com/congnguyen1512/CT_AND_MRI.',
    },
    {
      id: 'proj-3',
      name: 'Trello Clone — Cloud-Native Collaborative Kanban Platform on AWS',
      role: 'Full-Stack & Cloud Engineer',
      startDate: '2025-03',
      endDate: '2025-08',
      techStack: ['React', 'Node.js', 'Express', 'MongoDB / PostgreSQL', 'AWS (EC2, S3, CloudFront)', 'Docker', '@dnd-kit'],
      link: 'https://github.com/congnguyen1512/trello_clone_cloud_aws',
      description:
        '• Dynamic drag-and-drop Kanban board with React and @dnd-kit, secure JWT RESTful API, direct Amazon S3 upload via Pre-signed URLs, Docker containerization, and AWS Cloud (EC2, S3, CloudFront) deployment.',
    },
  ],
  skills: [
    {
      id: 'sk-1',
      category: 'Mobile & Edge AI',
      skills: [
        { id: 's1', name: 'Flutter & Dart (Clean Architecture)', level: 5 },
        { id: 's2', name: 'TensorFlow Lite On-Device Inference', level: 5 },
        { id: 's3', name: 'IMU Sensors (Accelerometer & Gyroscope 50Hz)', level: 5 },
        { id: 's4', name: 'GPS Tracking, Geofencing & Firebase FCM', level: 5 },
      ],
    },
    {
      id: 'sk-2',
      category: 'Frontend & Backend Web',
      skills: [
        { id: 's5', name: 'React (18/19), TypeScript, Tailwind CSS, Vite', level: 5 },
        { id: 's6', name: 'Node.js, Express.js, RESTful API Design', level: 5 },
        { id: 's7', name: 'Supabase (PostgreSQL, Auth, Realtime) & MySQL', level: 5 },
        { id: 's8', name: 'Python (FastAPI), PHP (Laravel 10)', level: 4 },
      ],
    },
    {
      id: 'sk-3',
      category: 'AI, Deep Learning & Automation',
      skills: [
        { id: 's9', name: 'Deep Learning: 1D-CNN + Bi-LSTM, Keras, PyTorch', level: 5 },
        { id: 's10', name: 'n8n AI Automation (Auto-Post 10-Slot Fanpage & Via)', level: 5 },
        { id: 's11', name: 'Python Video Pipeline (Edge-TTS 9:16 FHD, Ken Burns)', level: 5 },
        { id: 's12', name: 'Puppeteer Stealth, Chrome Extensions (MV3)', level: 4 },
      ],
    },
    {
      id: 'sk-4',
      category: 'Cloud, DevOps & Tools',
      skills: [
        { id: 's13', name: 'Git, GitHub, Vercel CI/CD, Docker, AWS (EC2/S3)', level: 4 },
        { id: 's14', name: 'Postman, REST/MCP Debugging, Agile/Scrum', level: 5 },
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
      name: 'Graduation Thesis Spotlight: Edge AI & Deep Learning in Family Care',
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
      sectionTitle: 'Research & Technical Highlights',
      items: [
        {
          id: 'ci-1',
          title: 'On-Device Edge AI in Healthcare & Family Safety',
          subtitle: 'Core Applied Research — 1D-CNN + Bi-LSTM & TFLite Quantization',
          date: '2026',
          description: '• Low-latency, low-power real-time inference (50Hz) directly on mobile devices without persistent cloud dependency or expensive dedicated wearable hardware.',
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
    ...SAMPLE_CV_VI.design,
    template: 'ats-standard',
    primaryColor: '#0369a1',
    fontFamily: 'Inter',
    language: 'en',
    dateFormat: 'MMM YYYY',
    skillDisplayStyle: 'comma',
  },
};
