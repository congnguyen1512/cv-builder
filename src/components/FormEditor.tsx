import React, { useState } from 'react';
import {
  ChevronDown,
  ChevronUp,
  Plus,
  Copy,
  Trash2,
  GripVertical,
  User,
  FileText,
  Briefcase,
  GraduationCap,
  FolderGit2,
  Wrench,
  Award,
  HeartHandshake,
  Users,
  Layers,
  Globe,
  Github,
  Linkedin,
  Mail,
  Phone,
  MapPin,
  Calendar,
  ArrowUp,
  ArrowDown,
  X,
  Target,
  Sparkles,
  Info,
  CheckCircle2,
} from 'lucide-react';
import {
  CVDocument,
  WorkExperienceItem,
  EducationItem,
  ProjectItem,
  SkillGroup,
  CertificationItem,
  ActivityItem,
  ReferenceItem,
  CustomSectionGroup,
  SkillDisplayStyle,
} from '../types/cv';
import { AvatarUploader } from './AvatarUploader';
import { RichTextEditor } from './RichTextEditor';

interface FormEditorProps {
  cv: CVDocument;
  onChange: (updated: CVDocument) => void;
  activeSection: string;
  onSelectSection: (sec: string) => void;
}

const uid = (prefix = 'id') => `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`;

const SectionPurposeBanner: React.FC<{
  purpose: string;
  location?: string;
  tip?: string;
  a4Position?: string;
  tips?: string;
  accentColor?: string;
}> = ({ purpose, location, tip, a4Position, tips, accentColor }) => {
  const displayLocation = a4Position || location || 'Trang A4';
  const displayTip = tips || tip || '';

  return (
    <div className="p-3.5 sm:p-4 rounded-2xl bg-slate-50/90 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 text-xs sm:text-sm space-y-2 shadow-2xs">
      <div className="flex items-start gap-2.5">
        <Target className="w-4 h-4 text-indigo-600 dark:text-indigo-400 shrink-0 mt-0.5" />
        <div className="text-slate-700 dark:text-slate-200 leading-relaxed">
          <strong className="text-slate-900 dark:text-white font-bold">Mục đích phần này: </strong>
          {purpose}
        </div>
      </div>
      {(displayLocation || displayTip) && (
        <div className="flex items-start gap-2.5">
          <Sparkles className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
          <div className="text-slate-600 dark:text-slate-300 leading-relaxed">
            <strong className="text-slate-800 dark:text-slate-200 font-semibold">Vị trí & Mẹo chuẩn ATS: </strong>
            <span className="text-indigo-600 dark:text-indigo-400 font-bold">[{displayLocation}]</span>
            {displayTip ? ` — ${displayTip}` : ''}
          </div>
        </div>
      )}
    </div>
  );
};

export const FormEditor: React.FC<FormEditorProps> = ({
  cv,
  onChange,
  activeSection,
  onSelectSection,
}) => {
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    personal: true,
    summary: true,
    experience: true,
    education: false,
    projects: true,
    skills: true,
    certifications: false,
    activities: false,
    references: false,
    custom: false,
  });

  const [techInputMap, setTechInputMap] = useState<Record<string, string>>({});
  const [newSkillNameMap, setNewSkillNameMap] = useState<Record<string, string>>({});

  // Sync activeSection click from LeftSidebar to auto-open that accordion
  React.useEffect(() => {
    if (activeSection) {
      setOpenSections((prev) => ({ ...prev, [activeSection]: true }));
      const el = document.getElementById(`editor-sec-${activeSection}`);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  }, [activeSection]);

  const toggleSection = (key: string) => {
    const nextState = !openSections[key];
    setOpenSections((prev) => ({ ...prev, [key]: nextState }));
    if (nextState) onSelectSection(key);
  };

  const expandAll = (expand: boolean) => {
    setOpenSections({
      personal: expand,
      summary: expand,
      experience: expand,
      education: expand,
      projects: expand,
      skills: expand,
      certifications: expand,
      activities: expand,
      references: expand,
      custom: expand,
    });
  };

  // Generic helper to reorder array items
  const moveArrayItem = <T,>(arr: T[], index: number, direction: -1 | 1): T[] => {
    const target = index + direction;
    if (target < 0 || target >= arr.length) return arr;
    const copy = [...arr];
    const [item] = copy.splice(index, 1);
    copy.splice(target, 0, item);
    return copy;
  };

  const inputClass =
    'w-full px-3.5 py-2.5 text-sm sm:text-base rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all font-normal';

  const labelClass = 'block text-sm font-bold text-slate-700 dark:text-slate-200 mb-1.5 flex items-center gap-1.5';

  return (
    <div className="p-4 sm:p-6 space-y-5 max-w-3xl mx-auto pb-24">
      {/* Header Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-200 dark:border-slate-800">
        <div>
          <h2 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white">
            Trình Soạn Thảo CV Thông Minh
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
            Điền thông tin bên dưới — Bản xem trước A4 bên phải sẽ tự động cập nhật ngay lập tức.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => expandAll(true)}
            className="px-3 py-1.5 rounded-lg text-xs font-bold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
          >
            Mở rộng tất cả
          </button>
          <button
            type="button"
            onClick={() => expandAll(false)}
            className="px-3 py-1.5 rounded-lg text-xs font-bold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
          >
            Thu gọn tất cả
          </button>
        </div>
      </div>

      {/* 1. PERSONAL INFO */}
      <section
        id="editor-sec-personal"
        className="rounded-2xl border-2 border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm overflow-hidden"
      >
        <button
          type="button"
          onClick={() => toggleSection('personal')}
          className="w-full flex items-center justify-between px-5 py-4 bg-slate-50/90 dark:bg-slate-800/70 hover:bg-slate-100/90 dark:hover:bg-slate-800 transition-colors text-left"
        >
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-950 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0 shadow-2xs">
              <User className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="text-base sm:text-lg font-black text-slate-900 dark:text-white">
                  1. Thông tin cá nhân & Liên hệ
                </h3>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
                  Bắt buộc • Đầu trang
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
                Họ tên, Chức danh ứng tuyển, Ảnh đại diện, Email, Số điện thoại & Mạng xã hội
              </p>
            </div>
          </div>
          {openSections.personal ? (
            <ChevronUp className="w-5 h-5 text-slate-400" />
          ) : (
            <ChevronDown className="w-5 h-5 text-slate-400" />
          )}
        </button>

        {openSections.personal && (
          <div className="p-5 space-y-5 border-t border-slate-200 dark:border-slate-800">
            {/* Purpose & ATS Tip Banner */}
            <SectionPurposeBanner
              purpose="Hiển thị trang trọng tại phần đầu trang CV (Header). Đây là thông tin quan trọng nhất giúp nhà tuyển dụng biết bạn là ai, ứng tuyển vị trí nào và liên hệ mời phỏng vấn."
              location="Đầu trang 1 (Header)"
              tip="Sử dụng Email nghiêm túc chứa họ tên. Nếu nộp đơn vào các tập đoàn Đa quốc gia hoặc thị trường Mỹ/Âu, nên chọn 'Ẩn ảnh' để đảm bảo chuẩn chống thiên vị hồ sơ ATS."
            />

            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 block mb-2">
                Ảnh đại diện (Avatar)
              </label>
              <AvatarUploader
                avatarUrl={cv.personalInfo.avatarUrl}
                avatarShape={cv.personalInfo.avatarShape}
                avatarZoom={cv.personalInfo.avatarZoom}
                onChange={(updates) =>
                  onChange({
                    ...cv,
                    personalInfo: { ...cv.personalInfo, ...updates },
                  })
                }
              />
            </div>

            <div className="pt-2">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 block mb-3">
                Thông tin định danh & Vị trí ứng tuyển
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className={labelClass}>Họ và tên (Full Name) *</label>
                  <input
                    type="text"
                    value={cv.personalInfo.fullName}
                    onChange={(e) =>
                      onChange({
                        ...cv,
                        personalInfo: { ...cv.personalInfo, fullName: e.target.value },
                      })
                    }
                    placeholder="VD: NGUYỄN MINH KHÔI"
                    className={inputClass}
                  />
                  <span className="text-xs text-slate-500 mt-1 block">Khuyến nghị viết IN HOA để làm nổi bật tên bạn</span>
                </div>
                <div>
                  <label className={labelClass}>Vị trí ứng tuyển (Job Title) *</label>
                  <input
                    type="text"
                    value={cv.personalInfo.jobTitle}
                    onChange={(e) =>
                      onChange({
                        ...cv,
                        personalInfo: { ...cv.personalInfo, jobTitle: e.target.value },
                      })
                    }
                    placeholder="VD: Senior Full-Stack Engineer"
                    className={inputClass}
                  />
                  <span className="text-xs text-slate-500 mt-1 block">Khớp chính xác với tên vị trí tuyển dụng trên JD</span>
                </div>
              </div>
            </div>

            <div className="pt-2">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 block mb-3">
                Thông tin liên hệ trực tiếp
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className={labelClass}>
                    <Mail className="w-4 h-4 text-slate-500" />
                    <span>Email liên hệ *</span>
                  </label>
                  <input
                    type="email"
                    value={cv.personalInfo.email}
                    onChange={(e) =>
                      onChange({
                        ...cv,
                        personalInfo: { ...cv.personalInfo, email: e.target.value },
                      })
                    }
                    placeholder="khoi.nguyen@example.com"
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className={labelClass}>
                    <Phone className="w-4 h-4 text-slate-500" />
                    <span>Số điện thoại *</span>
                  </label>
                  <input
                    type="text"
                    value={cv.personalInfo.phone}
                    onChange={(e) =>
                      onChange({
                        ...cv,
                        personalInfo: { ...cv.personalInfo, phone: e.target.value },
                      })
                    }
                    placeholder="+84 912 345 678"
                    className={inputClass}
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className={labelClass}>
                    <MapPin className="w-4 h-4 text-slate-500" />
                    <span>Địa chỉ cư trú (Thành phố, Quốc gia)</span>
                  </label>
                  <input
                    type="text"
                    value={cv.personalInfo.address}
                    onChange={(e) =>
                      onChange({
                        ...cv,
                        personalInfo: { ...cv.personalInfo, address: e.target.value },
                      })
                    }
                    placeholder="Quận 1, TP. Hồ Chí Minh, Việt Nam"
                    className={inputClass}
                  />
                  <span className="text-xs text-slate-500 mt-1 block">Chỉ cần ghi Quận/Huyện, Tỉnh/Thành phố (không cần ghi số nhà cụ thể để bảo mật)</span>
                </div>

                {/* DOB & Gender with Show/Hide Toggles */}
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-bold text-slate-700 dark:text-slate-200 flex items-center gap-1.5">
                      <Calendar className="w-4 h-4 text-slate-500" /> Ngày sinh
                    </label>
                    <label className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 dark:text-slate-300 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={cv.personalInfo.showDob}
                        onChange={(e) =>
                          onChange({
                            ...cv,
                            personalInfo: { ...cv.personalInfo, showDob: e.target.checked },
                          })
                        }
                        className="rounded text-indigo-600 w-4 h-4"
                      />
                      <span>Hiển thị trên CV</span>
                    </label>
                  </div>
                  <input
                    type="date"
                    value={cv.personalInfo.dob}
                    onChange={(e) =>
                      onChange({
                        ...cv,
                        personalInfo: { ...cv.personalInfo, dob: e.target.value },
                      })
                    }
                    className={inputClass}
                  />
                </div>

                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-bold text-slate-700 dark:text-slate-200">
                      Giới tính
                    </label>
                    <label className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 dark:text-slate-300 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={cv.personalInfo.showGender}
                        onChange={(e) =>
                          onChange({
                            ...cv,
                            personalInfo: { ...cv.personalInfo, showGender: e.target.checked },
                          })
                        }
                        className="rounded text-indigo-600 w-4 h-4"
                      />
                      <span>Hiển thị trên CV</span>
                    </label>
                  </div>
                  <input
                    type="text"
                    value={cv.personalInfo.gender}
                    onChange={(e) =>
                      onChange({
                        ...cv,
                        personalInfo: { ...cv.personalInfo, gender: e.target.value },
                      })
                    }
                    placeholder="Nam / Nữ / Male / Female"
                    className={inputClass}
                  />
                </div>
              </div>
            </div>

            {/* Social / Portfolio Links */}
            <div className="pt-2 border-t border-slate-200 dark:border-slate-800">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 block mb-3">
                Liên kết Mạng xã hội & Portfolio (Tự động gắn Icon & Hyperlink trên PDF)
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className={labelClass}>
                    <Linkedin className="w-4 h-4 text-sky-600" />
                    <span>LinkedIn Profile</span>
                  </label>
                  <input
                    type="text"
                    value={cv.personalInfo.socials.linkedin}
                    onChange={(e) =>
                      onChange({
                        ...cv,
                        personalInfo: {
                          ...cv.personalInfo,
                          socials: { ...cv.personalInfo.socials, linkedin: e.target.value },
                        },
                      })
                    }
                    placeholder="linkedin.com/in/username"
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className={labelClass}>
                    <Github className="w-4 h-4 text-slate-700 dark:text-slate-300" />
                    <span>GitHub Profile</span>
                  </label>
                  <input
                    type="text"
                    value={cv.personalInfo.socials.github}
                    onChange={(e) =>
                      onChange({
                        ...cv,
                        personalInfo: {
                          ...cv.personalInfo,
                          socials: { ...cv.personalInfo.socials, github: e.target.value },
                        },
                      })
                    }
                    placeholder="github.com/username"
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className={labelClass}>
                    <Globe className="w-4 h-4 text-emerald-600" />
                    <span>Website cá nhân / Blog</span>
                  </label>
                  <input
                    type="text"
                    value={cv.personalInfo.socials.website}
                    onChange={(e) =>
                      onChange({
                        ...cv,
                        personalInfo: {
                          ...cv.personalInfo,
                          socials: { ...cv.personalInfo.socials, website: e.target.value },
                        },
                      })
                    }
                    placeholder="yourportfolio.dev"
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className={labelClass}>
                    <span>Portfolio khác (Behance, Dribbble, Medium)</span>
                  </label>
                  <input
                    type="text"
                    value={cv.personalInfo.socials.portfolio}
                    onChange={(e) =>
                      onChange({
                        ...cv,
                        personalInfo: {
                          ...cv.personalInfo,
                          socials: { ...cv.personalInfo.socials, portfolio: e.target.value },
                        },
                      })
                    }
                    placeholder="behance.net/username"
                    className={inputClass}
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* 2. PROFESSIONAL SUMMARY */}
      <section
        id="editor-sec-summary"
        className="rounded-2xl border-2 border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm overflow-hidden"
      >
        <button
          type="button"
          onClick={() => toggleSection('summary')}
          className="w-full flex items-center justify-between px-5 py-4 bg-slate-50/90 dark:bg-slate-800/70 hover:bg-slate-100/90 dark:hover:bg-slate-800 transition-colors text-left"
        >
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-violet-100 dark:bg-violet-950 text-violet-600 dark:text-violet-400 flex items-center justify-center shrink-0 shadow-2xs">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="text-base sm:text-lg font-black text-slate-900 dark:text-white">
                  2. Tóm tắt chuyên môn / Mục tiêu nghề nghiệp
                </h3>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-violet-100 dark:bg-violet-950 text-violet-700 dark:text-violet-300 border border-violet-200 dark:border-violet-800">
                  Gây ấn tượng 6s đầu
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
                3–4 câu ngắn gọn nêu số năm kinh nghiệm, kỹ năng cốt lõi và giá trị nổi bật nhất
              </p>
            </div>
          </div>
          {openSections.summary ? (
            <ChevronUp className="w-5 h-5 text-slate-400" />
          ) : (
            <ChevronDown className="w-5 h-5 text-slate-400" />
          )}
        </button>

        {openSections.summary && (
          <div className="p-5 border-t border-slate-200 dark:border-slate-800 space-y-4">
            <SectionPurposeBanner
              purpose="Đây là đoạn văn ngắn đúc kết toàn bộ hồ sơ. Nhà tuyển dụng thường đọc phần này trong 6 giây đầu tiên để quyết định có tiếp tục đọc chi tiết hay không."
              location="Ngay dưới mục Thông tin cá nhân"
              tip="Công thức chuẩn: [Số năm KN] + [Vị trí chuyên môn] + [Kỹ năng thế mạnh cốt lõi] + [Thành tựu định lượng nổi bật hoặc mục tiêu đóng góp]."
            />
            <RichTextEditor
              value={cv.summary}
              onChange={(val) => onChange({ ...cv, summary: val })}
              rows={4}
              showXyzHelper={false}
              placeholder="VD: Kỹ sư Phần mềm Full-Stack với hơn 5 năm kinh nghiệm xây dựng hệ thống thanh toán và vi dịch vụ chịu tải cao. Thành thạo TypeScript, React, Go và Kubernetes. Từng tối ưu độ trễ hệ thống giảm 40% cho hơn 1.5 triệu người dùng hoạt động hàng tháng..."
            />
          </div>
        )}
      </section>

      {/* 3. WORK EXPERIENCE */}
      <section
        id="editor-sec-experience"
        className="rounded-2xl border-2 border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm overflow-hidden"
      >
        <button
          type="button"
          onClick={() => toggleSection('experience')}
          className="w-full flex items-center justify-between px-5 py-4 bg-slate-50/90 dark:bg-slate-800/70 hover:bg-slate-100/90 dark:hover:bg-slate-800 transition-colors text-left"
        >
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-indigo-100 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shrink-0 shadow-2xs">
              <Briefcase className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="text-base sm:text-lg font-black text-slate-900 dark:text-white">
                  3. Kinh nghiệm làm việc ({cv.experience.length})
                </h3>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800">
                  Trọng tâm • Chiếm 50% điểm
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
                Sắp xếp theo thứ tự thời gian gần nhất trước. Dùng công thức STAR / XYZ và số liệu định lượng.
              </p>
            </div>
          </div>
          {openSections.experience ? (
            <ChevronUp className="w-5 h-5 text-slate-400" />
          ) : (
            <ChevronDown className="w-5 h-5 text-slate-400" />
          )}
        </button>

        {openSections.experience && (
          <div className="p-5 border-t border-slate-200 dark:border-slate-800 space-y-5">
            <SectionPurposeBanner
              purpose="Phần quan trọng nhất quyết định bạn có được mời phỏng vấn hay không. Nhà tuyển dụng tìm kiếm minh chứng năng lực thực tế, công nghệ đã áp dụng và kết quả bạn từng mang lại."
              location="Thân CV (Vị trí ưu tiên hàng đầu)"
              tip="Áp dụng công thức STAR (Tình huống - Nhiệm vụ - Hành động - Kết quả). Luôn bắt đầu bằng Động từ hành động mạnh mẽ và đính kèm số liệu định lượng (%, $, số người dùng, thời gian rút ngắn)."
            />

            {cv.experience.map((exp, idx) => {
              const updateExp = (patch: Partial<WorkExperienceItem>) => {
                const next = [...cv.experience];
                next[idx] = { ...next[idx], ...patch };
                onChange({ ...cv, experience: next });
              };

              return (
                <div
                  key={exp.id}
                  className="p-4 sm:p-5 rounded-2xl border-2 border-slate-200 dark:border-slate-700/80 bg-slate-50/50 dark:bg-slate-800/30 space-y-4 shadow-2xs"
                >
                  {/* Item Header & Action Buttons */}
                  <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-slate-200 dark:border-slate-700">
                    <div className="flex items-center gap-2 min-w-0">
                      <GripVertical className="w-4 h-4 text-slate-400 shrink-0" />
                      <span className="px-2 py-0.5 rounded-md text-xs font-black bg-indigo-600 text-white">
                        #{idx + 1}
                      </span>
                      {idx === 0 && (
                        <span className="px-2 py-0.5 rounded-md text-xs font-bold bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300">
                          Gần nhất / Hiện tại
                        </span>
                      )}
                      <span className="text-sm font-bold text-slate-900 dark:text-slate-100 truncate">
                        {exp.position || 'Chức danh mới'} @ {exp.company || 'Tên công ty'}
                      </span>
                    </div>

                    <div className="flex items-center gap-1 shrink-0">
                      <button
                        type="button"
                        onClick={() =>
                          onChange({ ...cv, experience: moveArrayItem(cv.experience, idx, -1) })
                        }
                        disabled={idx === 0}
                        title="Di chuyển lên trên"
                        className="inline-flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-medium hover:bg-slate-200 dark:hover:bg-slate-700 disabled:opacity-30 text-slate-600 dark:text-slate-300"
                      >
                        <ArrowUp className="w-3.5 h-3.5" />
                        <span className="hidden sm:inline">Lên</span>
                      </button>
                      <button
                        type="button"
                        onClick={() =>
                          onChange({ ...cv, experience: moveArrayItem(cv.experience, idx, 1) })
                        }
                        disabled={idx === cv.experience.length - 1}
                        title="Di chuyển xuống dưới"
                        className="inline-flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-medium hover:bg-slate-200 dark:hover:bg-slate-700 disabled:opacity-30 text-slate-600 dark:text-slate-300"
                      >
                        <ArrowDown className="w-3.5 h-3.5" />
                        <span className="hidden sm:inline">Xuống</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          const clone: WorkExperienceItem = {
                            ...exp,
                            id: uid('exp'),
                            position: `${exp.position} (Bản sao)`,
                          };
                          const next = [...cv.experience];
                          next.splice(idx + 1, 0, clone);
                          onChange({ ...cv, experience: next });
                        }}
                        title="Nhân bản mục này"
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700"
                      >
                        <Copy className="w-3.5 h-3.5 text-indigo-500" />
                        <span>Nhân bản</span>
                      </button>
                      <button
                        type="button"
                        onClick={() =>
                          onChange({
                            ...cv,
                            experience: cv.experience.filter((item) => item.id !== exp.id),
                          })
                        }
                        title="Xóa mục kinh nghiệm này"
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold hover:bg-rose-100 dark:hover:bg-rose-950/60 text-rose-600 border border-rose-200 dark:border-rose-900/60"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>Xóa</span>
                      </button>
                    </div>
                  </div>

                  {/* Subgroup: Thông tin công ty & vị trí */}
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 block mb-2">
                      📌 Thông tin Công ty & Chức danh
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                      <div>
                        <label className={labelClass}>Tên công ty / Doanh nghiệp *</label>
                        <input
                          type="text"
                          value={exp.company}
                          onChange={(e) => updateExp({ company: e.target.value })}
                          placeholder="VD: Shopee / VNG Corporation"
                          className={inputClass}
                        />
                      </div>
                      <div>
                        <label className={labelClass}>Chức danh / Vị trí đảm nhiệm *</label>
                        <input
                          type="text"
                          value={exp.position}
                          onChange={(e) => updateExp({ position: e.target.value })}
                          placeholder="VD: Senior Full-Stack Engineer"
                          className={inputClass}
                        />
                      </div>
                      <div>
                        <label className={labelClass}>Địa điểm làm việc</label>
                        <input
                          type="text"
                          value={exp.location}
                          onChange={(e) => updateExp({ location: e.target.value })}
                          placeholder="TP. Hồ Chí Minh / Hà Nội / Remote"
                          className={inputClass}
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className={labelClass}>Từ tháng</label>
                          <input
                            type="month"
                            value={exp.startDate}
                            onChange={(e) => updateExp({ startDate: e.target.value })}
                            className={inputClass}
                          />
                        </div>
                        <div>
                          <div className="flex items-center justify-between mb-1.5">
                            <label className="text-sm font-bold text-slate-700 dark:text-slate-200">
                              Đến tháng
                            </label>
                            <label className="inline-flex items-center gap-1 text-xs font-semibold text-indigo-600 dark:text-indigo-400 cursor-pointer">
                              <input
                                type="checkbox"
                                checked={exp.isCurrent}
                                onChange={(e) => updateExp({ isCurrent: e.target.checked })}
                                className="rounded text-indigo-600 w-3.5 h-3.5"
                              />
                              <span>Đang làm ở đây</span>
                            </label>
                          </div>
                          <input
                            type="month"
                            disabled={exp.isCurrent}
                            value={exp.endDate}
                            onChange={(e) => updateExp({ endDate: e.target.value })}
                            className={`${inputClass} disabled:opacity-40`}
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Subgroup: Chi tiết công việc & Thành tích */}
                  <div className="pt-2">
                    <label className={labelClass}>
                      ✍️ Trách nhiệm cốt lõi & Thành tựu định lượng (Dùng công thức XYZ/STAR)
                    </label>
                    <span className="text-xs text-slate-500 block mb-2">
                      Mỗi ý nên là 1 bullet point (•) bắt đầu bằng động từ hành động và có số liệu cụ thể (%, $, số lượng).
                    </span>
                    <RichTextEditor
                      value={exp.description}
                      onChange={(val) => updateExp({ description: val })}
                      rows={5}
                      showXyzHelper={true}
                    />
                  </div>
                </div>
              );
            })}

            <button
              type="button"
              onClick={() =>
                onChange({
                  ...cv,
                  experience: [
                    ...cv.experience,
                    {
                      id: uid('exp'),
                      company: '',
                      position: '',
                      location: '',
                      startDate: '2024-01',
                      endDate: '',
                      isCurrent: true,
                      description: '• ',
                    },
                  ],
                })
              }
              className="w-full py-3 rounded-2xl border-2 border-dashed border-indigo-400 dark:border-indigo-700 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-950/40 text-sm font-bold flex items-center justify-center gap-2 shadow-2xs transition-colors"
            >
              <Plus className="w-4 h-4" />
              <span>+ Thêm Vị trí Kinh nghiệm làm việc mới</span>
            </button>
          </div>
        )}
      </section>

      {/* 4. EDUCATION */}
      <section
        id="editor-sec-education"
        className="rounded-2xl border-2 border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm overflow-hidden"
      >
        <button
          type="button"
          onClick={() => toggleSection('education')}
          className="w-full flex items-center justify-between px-5 py-4 bg-slate-50/90 dark:bg-slate-800/70 hover:bg-slate-100/90 dark:hover:bg-slate-800 transition-colors text-left"
        >
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0 shadow-2xs">
              <GraduationCap className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="text-base sm:text-lg font-black text-slate-900 dark:text-white">
                  4. Học vấn & Bằng cấp ({cv.education.length})
                </h3>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                  Trình độ đào tạo
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
                Trường Đại học, Chuyên ngành đào tạo, Bằng cấp, GPA & Thành tích học tập
              </p>
            </div>
          </div>
          {openSections.education ? (
            <ChevronUp className="w-5 h-5 text-slate-400" />
          ) : (
            <ChevronDown className="w-5 h-5 text-slate-400" />
          )}
        </button>

        {openSections.education && (
          <div className="p-5 border-t border-slate-200 dark:border-slate-800 space-y-5">
            <SectionPurposeBanner
              purpose="Chứng minh nền tảng học thuật và chuyên môn được đào tạo bài bản từ các trường Đại học, Cao đẳng hoặc Học viện uy tín."
              location="Thân CV (Sinh viên mới ra trường nên đặt trên Kinh nghiệm; người đã đi làm nên đặt dưới Kinh nghiệm)"
              tip="Chỉ ghi GPA nếu đạt mức Khá/Giỏi trở lên (>= 3.0/4.0 hoặc >= 7.5/10). Liệt kê học bổng, đề tài nghiên cứu hoặc đồ án tốt nghiệp tiêu biểu nếu có."
            />

            {cv.education.map((edu, idx) => {
              const updateEdu = (patch: Partial<EducationItem>) => {
                const next = [...cv.education];
                next[idx] = { ...next[idx], ...patch };
                onChange({ ...cv, education: next });
              };

              return (
                <div
                  key={edu.id}
                  className="p-4 sm:p-5 rounded-2xl border-2 border-slate-200 dark:border-slate-700/80 bg-slate-50/50 dark:bg-slate-800/30 space-y-4 shadow-2xs"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-slate-200 dark:border-slate-700">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded-md text-xs font-black bg-emerald-600 text-white">
                        #{idx + 1}
                      </span>
                      <span className="text-sm font-bold text-slate-900 dark:text-slate-100">
                        {edu.school || 'Trường học'} — {edu.degree || 'Chuyên ngành'}
                      </span>
                    </div>

                    <div className="flex items-center gap-1">
                      <button
                        type="button"
                        onClick={() =>
                          onChange({ ...cv, education: moveArrayItem(cv.education, idx, -1) })
                        }
                        disabled={idx === 0}
                        title="Di chuyển lên"
                        className="p-1 rounded hover:bg-slate-200 dark:hover:bg-slate-700 disabled:opacity-30"
                      >
                        <ArrowUp className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() =>
                          onChange({ ...cv, education: moveArrayItem(cv.education, idx, 1) })
                        }
                        disabled={idx === cv.education.length - 1}
                        title="Di chuyển xuống"
                        className="p-1 rounded hover:bg-slate-200 dark:hover:bg-slate-700 disabled:opacity-30"
                      >
                        <ArrowDown className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() =>
                          onChange({
                            ...cv,
                            education: cv.education.filter((i) => i.id !== edu.id),
                          })
                        }
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold hover:bg-rose-100 dark:hover:bg-rose-950/60 text-rose-600 border border-rose-200 dark:border-rose-900/60"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>Xóa</span>
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <div>
                      <label className={labelClass}>Trường học / Học viện đào tạo *</label>
                      <input
                        type="text"
                        value={edu.school}
                        onChange={(e) => updateEdu({ school: e.target.value })}
                        placeholder="VD: Đại học Bách Khoa TP.HCM"
                        className={inputClass}
                      />
                    </div>
                    <div>
                      <label className={labelClass}>Bằng cấp / Ngành học chính *</label>
                      <input
                        type="text"
                        value={edu.degree}
                        onChange={(e) => updateEdu({ degree: e.target.value })}
                        placeholder="VD: Cử nhân Khoa học Máy tính"
                        className={inputClass}
                      />
                    </div>
                    <div>
                      <label className={labelClass}>Điểm trung bình (GPA) / Xếp loại tốt nghiệp</label>
                      <input
                        type="text"
                        value={edu.gpa}
                        onChange={(e) => updateEdu({ gpa: e.target.value })}
                        placeholder="VD: 3.65 / 4.0 (Loại Giỏi)"
                        className={inputClass}
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className={labelClass}>Từ năm</label>
                        <input
                          type="month"
                          value={edu.startDate}
                          onChange={(e) => updateEdu({ startDate: e.target.value })}
                          className={inputClass}
                        />
                      </div>
                      <div>
                        <label className={labelClass}>Đến năm / Tốt nghiệp</label>
                        <input
                          type="month"
                          value={edu.endDate}
                          onChange={(e) => updateEdu({ endDate: e.target.value })}
                          className={inputClass}
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className={labelClass}>Thành tích nổi bật, Học bổng hoặc Đề tài nghiên cứu</label>
                    <RichTextEditor
                      value={edu.achievements}
                      onChange={(val) => updateEdu({ achievements: val })}
                      rows={2}
                      showXyzHelper={false}
                      placeholder="VD: Học bổng khuyến khích học tập 3 kỳ liên tiếp. Giải Ba nghiên cứu khoa học cấp Trường năm 2022..."
                    />
                  </div>
                </div>
              );
            })}

            <button
              type="button"
              onClick={() =>
                onChange({
                  ...cv,
                  education: [
                    ...cv.education,
                    {
                      id: uid('edu'),
                      school: '',
                      degree: '',
                      startDate: '2018-09',
                      endDate: '2022-06',
                      isCurrent: false,
                      gpa: '',
                      achievements: '',
                    },
                  ],
                })
              }
              className="w-full py-3 rounded-2xl border-2 border-dashed border-emerald-400 dark:border-emerald-700 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-950/40 text-sm font-bold flex items-center justify-center gap-2 shadow-2xs transition-colors"
            >
              <Plus className="w-4 h-4" />
              <span>+ Thêm Bằng cấp / Học vấn mới</span>
            </button>
          </div>
        )}
      </section>

      {/* 5. PROJECTS */}
      <section
        id="editor-sec-projects"
        className="rounded-2xl border-2 border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm overflow-hidden"
      >
        <button
          type="button"
          onClick={() => toggleSection('projects')}
          className="w-full flex items-center justify-between px-5 py-4 bg-slate-50/90 dark:bg-slate-800/70 hover:bg-slate-100/90 dark:hover:bg-slate-800 transition-colors text-left"
        >
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-amber-100 dark:bg-amber-950 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0 shadow-2xs">
              <FolderGit2 className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="text-base sm:text-lg font-black text-slate-900 dark:text-white">
                  5. Dự án tiêu biểu ({cv.projects.length})
                </h3>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-800">
                  Minh chứng năng lực
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
                Sản phẩm thực tế, Vai trò, Tech Stack tags, Link Demo / GitHub & Kết quả đạt được
              </p>
            </div>
          </div>
          {openSections.projects ? (
            <ChevronUp className="w-5 h-5 text-slate-400" />
          ) : (
            <ChevronDown className="w-5 h-5 text-slate-400" />
          )}
        </button>

        {openSections.projects && (
          <div className="p-5 border-t border-slate-200 dark:border-slate-800 space-y-5">
            <SectionPurposeBanner
              purpose="Minh chứng khả năng biến kiến thức thành sản phẩm thực tế. Cực kỳ có giá trị đối với Lập trình viên, Designer, Product Manager và người chuyển ngành."
              location="Thân CV"
              tip="Ghi rõ vai trò cá nhân của bạn, các công nghệ sử dụng (Tech Stack) và cung cấp đường link Demo hoặc GitHub để nhà tuyển dụng bấm vào xem trực tiếp trên bản PDF."
            />

            {cv.projects.map((proj, idx) => {
              const updateProj = (patch: Partial<ProjectItem>) => {
                const next = [...cv.projects];
                next[idx] = { ...next[idx], ...patch };
                onChange({ ...cv, projects: next });
              };

              const techInputVal = techInputMap[proj.id] || '';

              const addTechTag = () => {
                const clean = techInputVal.trim();
                if (!clean) return;
                const tags = clean
                  .split(',')
                  .map((t) => t.trim())
                  .filter(Boolean);
                updateProj({ techStack: [...proj.techStack, ...tags] });
                setTechInputMap((prev) => ({ ...prev, [proj.id]: '' }));
              };

              return (
                <div
                  key={proj.id}
                  className="p-4 sm:p-5 rounded-2xl border-2 border-slate-200 dark:border-slate-700/80 bg-slate-50/50 dark:bg-slate-800/30 space-y-4 shadow-2xs"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-slate-200 dark:border-slate-700">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded-md text-xs font-black bg-amber-600 text-white">
                        #{idx + 1}
                      </span>
                      <span className="text-sm font-bold text-slate-900 dark:text-slate-100">
                        {proj.name || 'Dự án mới'} {proj.role && `(${proj.role})`}
                      </span>
                    </div>

                    <div className="flex items-center gap-1">
                      <button
                        type="button"
                        onClick={() =>
                          onChange({ ...cv, projects: moveArrayItem(cv.projects, idx, -1) })
                        }
                        disabled={idx === 0}
                        title="Di chuyển lên"
                        className="p-1 rounded hover:bg-slate-200 dark:hover:bg-slate-700 disabled:opacity-30"
                      >
                        <ArrowUp className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() =>
                          onChange({ ...cv, projects: moveArrayItem(cv.projects, idx, 1) })
                        }
                        disabled={idx === cv.projects.length - 1}
                        title="Di chuyển xuống"
                        className="p-1 rounded hover:bg-slate-200 dark:hover:bg-slate-700 disabled:opacity-30"
                      >
                        <ArrowDown className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          const clone: ProjectItem = {
                            ...proj,
                            id: uid('proj'),
                            name: `${proj.name} (Bản sao)`,
                          };
                          const next = [...cv.projects];
                          next.splice(idx + 1, 0, clone);
                          onChange({ ...cv, projects: next });
                        }}
                        title="Nhân bản dự án này"
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700"
                      >
                        <Copy className="w-3.5 h-3.5 text-amber-500" />
                        <span>Nhân bản</span>
                      </button>
                      <button
                        type="button"
                        onClick={() =>
                          onChange({
                            ...cv,
                            projects: cv.projects.filter((i) => i.id !== proj.id),
                          })
                        }
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold hover:bg-rose-100 dark:hover:bg-rose-950/60 text-rose-600 border border-rose-200 dark:border-rose-900/60"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>Xóa</span>
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <div>
                      <label className={labelClass}>Tên dự án *</label>
                      <input
                        type="text"
                        value={proj.name}
                        onChange={(e) => updateProj({ name: e.target.value })}
                        placeholder="VD: Nền tảng Thương mại Điện tử Đa kênh"
                        className={inputClass}
                      />
                    </div>
                    <div>
                      <label className={labelClass}>Vai trò trong dự án *</label>
                      <input
                        type="text"
                        value={proj.role}
                        onChange={(e) => updateProj({ role: e.target.value })}
                        placeholder="VD: Lead Backend Developer"
                        className={inputClass}
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <label className={labelClass}>Link Demo trực tuyến hoặc GitHub Repo</label>
                      <input
                        type="text"
                        value={proj.link}
                        onChange={(e) => updateProj({ link: e.target.value })}
                        placeholder="VD: https://github.com/username/project hoặc https://myproject.com"
                        className={inputClass}
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-2 sm:col-span-2">
                      <div>
                        <label className={labelClass}>Từ tháng</label>
                        <input
                          type="month"
                          value={proj.startDate}
                          onChange={(e) => updateProj({ startDate: e.target.value })}
                          className={inputClass}
                        />
                      </div>
                      <div>
                        <label className={labelClass}>Đến tháng</label>
                        <input
                          type="month"
                          value={proj.endDate}
                          onChange={(e) => updateProj({ endDate: e.target.value })}
                          className={inputClass}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Tech Stack Tags */}
                  <div>
                    <label className={labelClass}>Thẻ Công nghệ sử dụng (Tech Stack Tags)</label>
                    <div className="flex flex-wrap gap-1.5 mb-2.5">
                      {proj.techStack.map((tag, tIdx) => (
                        <span
                          key={tIdx}
                          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-200 border border-amber-300 dark:border-amber-800"
                        >
                          {tag}
                          <button
                            type="button"
                            onClick={() =>
                              updateProj({
                                techStack: proj.techStack.filter((_, i) => i !== tIdx),
                              })
                            }
                            className="hover:text-rose-600 rounded-full"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </span>
                      ))}
                    </div>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={techInputVal}
                        onChange={(e) =>
                          setTechInputMap((prev) => ({ ...prev, [proj.id]: e.target.value }))
                        }
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            e.preventDefault();
                            addTechTag();
                          }
                        }}
                        placeholder="Gõ công nghệ (VD: React, Node.js, AWS) rồi nhấn Enter..."
                        className={inputClass}
                      />
                      <button
                        type="button"
                        onClick={addTechTag}
                        className="px-4 py-2 rounded-xl bg-indigo-600 text-white text-xs sm:text-sm font-bold hover:bg-indigo-700 shrink-0 shadow-xs"
                      >
                        + Thêm Tag
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className={labelClass}>Mô tả chi tiết & Kết quả đạt được</label>
                    <RichTextEditor
                      value={proj.description}
                      onChange={(val) => updateProj({ description: val })}
                      rows={4}
                      showXyzHelper={true}
                    />
                  </div>
                </div>
              );
            })}

            <button
              type="button"
              onClick={() =>
                onChange({
                  ...cv,
                  projects: [
                    ...cv.projects,
                    {
                      id: uid('proj'),
                      name: '',
                      role: '',
                      startDate: '2024-01',
                      endDate: '2024-06',
                      techStack: [],
                      link: '',
                      description: '• ',
                    },
                  ],
                })
              }
              className="w-full py-3 rounded-2xl border-2 border-dashed border-amber-400 dark:border-amber-700 text-amber-700 dark:text-amber-400 hover:bg-amber-50 dark:hover:bg-amber-950/40 text-sm font-bold flex items-center justify-center gap-2 shadow-2xs transition-colors"
            >
              <Plus className="w-4 h-4" />
              <span>+ Thêm Dự án tiêu biểu mới</span>
            </button>
          </div>
        )}
      </section>

      {/* 6. SKILLS */}
      <section
        id="editor-sec-skills"
        className="rounded-2xl border-2 border-cyan-200/80 dark:border-cyan-900/60 bg-white dark:bg-slate-900 shadow-xs overflow-hidden transition-all"
      >
        <button
          type="button"
          onClick={() => toggleSection('skills')}
          className="w-full flex items-center justify-between px-5 py-4 bg-gradient-to-r from-cyan-50/70 to-teal-50/40 dark:from-cyan-950/40 dark:to-teal-950/20 hover:from-cyan-100/70 dark:hover:from-cyan-950/60 transition-colors text-left"
        >
          <div className="flex items-center gap-3.5">
            <div className="p-2.5 rounded-xl bg-cyan-500 text-white shadow-sm">
              <Wrench className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">
                  6. Kỹ năng chuyên môn & Công nghệ
                </h3>
                <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-cyan-100 dark:bg-cyan-900/80 text-cyan-800 dark:text-cyan-200 border border-cyan-300 dark:border-cyan-700">
                  {cv.skills.length} nhóm kỹ năng
                </span>
                <span className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                  Từ khóa quét ATS cốt lõi
                </span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">
                Phân loại theo nhóm (Ngôn ngữ lập trình, Frameworks, Công cụ, Kỹ năng mềm). Hệ thống ATS so khớp từ khóa chính ở mục này.
              </p>
            </div>
          </div>
          {openSections.skills ? (
            <ChevronUp className="w-5 h-5 text-slate-500" />
          ) : (
            <ChevronDown className="w-5 h-5 text-slate-500" />
          )}
        </button>

        {openSections.skills && (
          <div className="p-5 border-t border-cyan-100 dark:border-cyan-950/60 space-y-5">
            <SectionPurposeBanner
              purpose="Mục quyết định hệ thống quét ATS (Workday, Lever, Taleo) có đưa CV của bạn qua vòng sơ loại hồ sơ hay không. Thuật toán ATS sẽ trích xuất và đối chiếu chính xác từ khóa kỹ thuật với bản mô tả công việc (JD)."
              a4Position="Nằm ở cột bên trái (đối với mẫu 2 cột) hoặc bên dưới Tóm tắt chuyên môn / Kinh nghiệm (đối với mẫu 1 cột)."
              tips="Khuyên dùng kiểu 'Dấu phẩy (Chuẩn ATS)' hoặc 'Thẻ Tags (Pills)'. Tránh thanh phần trăm (%) vì máy chấm ATS không đọc được và dễ bị đánh giá là thiếu khách quan."
              accentColor="cyan"
            />

            {/* Skill Display Style Selector */}
            <div className="p-4 rounded-2xl bg-cyan-50/50 dark:bg-cyan-950/30 border border-cyan-200 dark:border-cyan-900/50 space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold text-slate-800 dark:text-slate-200 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
                  Kiểu hiển thị Kỹ năng trên trang A4:
                </span>
                <span className="text-xs text-slate-500 dark:text-slate-400">
                  (Tự động điều chỉnh theo chuẩn ATS)
                </span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {(
                  [
                    { id: 'comma', label: 'Dấu phẩy (Chuẩn ATS)', note: 'Khuyên dùng 100%' },
                    { id: 'pills', label: 'Thẻ Tags (Pills)', note: 'Đẹp & Hiện đại' },
                    { id: 'bars', label: 'Thanh mức độ', note: 'Progress Bar' },
                    { id: 'dots', label: 'Chấm mức độ', note: 'Dots Rating' },
                  ] as { id: SkillDisplayStyle; label: string; note: string }[]
                ).map((st) => {
                  const isSelected = cv.design.skillDisplayStyle === st.id;
                  return (
                    <button
                      key={st.id}
                      type="button"
                      onClick={() =>
                        onChange({
                          ...cv,
                          design: { ...cv.design, skillDisplayStyle: st.id },
                        })
                      }
                      className={`p-2.5 rounded-xl text-left border transition-all ${
                        isSelected
                          ? 'bg-cyan-600 text-white border-cyan-600 shadow-sm ring-2 ring-cyan-400/40'
                          : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-cyan-300'
                      }`}
                    >
                      <div className="text-xs font-bold leading-tight">{st.label}</div>
                      <div
                        className={`text-[10px] mt-0.5 ${
                          isSelected ? 'text-cyan-100 font-semibold' : 'text-slate-500 dark:text-slate-400'
                        }`}
                      >
                        {st.note}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Skill Groups */}
            <div className="space-y-4">
              {cv.skills.map((group, gIdx) => {
                const updateGroup = (patch: Partial<SkillGroup>) => {
                  const next = [...cv.skills];
                  next[gIdx] = { ...next[gIdx], ...patch };
                  onChange({ ...cv, skills: next });
                };

                const newSkillText = newSkillNameMap[group.id] || '';

                const addSkillsToGroup = () => {
                  const clean = newSkillText.trim();
                  if (!clean) return;
                  const items = clean
                    .split(',')
                    .map((s) => s.trim())
                    .filter(Boolean)
                    .map((name) => ({ id: uid('s'), name, level: 4 }));
                  updateGroup({ skills: [...group.skills, ...items] });
                  setNewSkillNameMap((prev) => ({ ...prev, [group.id]: '' }));
                };

                return (
                  <div
                    key={group.id}
                    className="p-4 sm:p-5 rounded-2xl border-2 border-slate-200 dark:border-slate-700/80 bg-slate-50/70 dark:bg-slate-800/40 space-y-3.5 shadow-2xs"
                  >
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-2 flex-1">
                        <span className="text-xs font-bold px-2 py-1 rounded-md bg-cyan-100 dark:bg-cyan-900/60 text-cyan-800 dark:text-cyan-200">
                          Nhóm #{gIdx + 1}
                        </span>
                        <input
                          type="text"
                          value={group.category}
                          onChange={(e) => updateGroup({ category: e.target.value })}
                          placeholder="Tên nhóm kỹ năng (VD: Ngôn ngữ lập trình, Frameworks, Cloud, Database...)"
                          className="flex-1 px-3 py-1.5 text-sm font-bold rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-cyan-500 focus:outline-hidden"
                        />
                      </div>
                      <button
                        type="button"
                        onClick={() =>
                          onChange({
                            ...cv,
                            skills: cv.skills.filter((g) => g.id !== group.id),
                          })
                        }
                        className="p-2 rounded-lg hover:bg-rose-100 dark:hover:bg-rose-950/60 text-rose-600 transition-colors"
                        title="Xóa nhóm kỹ năng này"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Skills Tag Cloud */}
                    <div className="space-y-1.5">
                      <div className="text-xs font-semibold text-slate-600 dark:text-slate-400">
                        Danh sách kỹ năng trong nhóm ({group.skills.length}):
                      </div>
                      <div className="flex flex-wrap gap-2 min-h-[38px] p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700/80">
                        {group.skills.length === 0 ? (
                          <span className="text-xs text-slate-400 italic">
                            Chưa có kỹ năng nào. Nhập tên kỹ năng ở ô bên dưới và bấm Enter hoặc nút 'Thêm'.
                          </span>
                        ) : (
                          group.skills.map((sk, sIdx) => (
                            <div
                              key={sk.id}
                              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-cyan-50 dark:bg-cyan-950/60 border border-cyan-200 dark:border-cyan-800 text-xs sm:text-sm font-medium text-slate-800 dark:text-slate-200 shadow-2xs"
                            >
                              <span className="font-semibold text-cyan-950 dark:text-cyan-100">
                                {sk.name}
                              </span>
                              {(cv.design.skillDisplayStyle === 'bars' ||
                                cv.design.skillDisplayStyle === 'dots') && (
                                <select
                                  value={sk.level}
                                  onChange={(e) => {
                                    const nextSkills = [...group.skills];
                                    nextSkills[sIdx] = {
                                      ...sk,
                                      level: parseInt(e.target.value, 10),
                                    };
                                    updateGroup({ skills: nextSkills });
                                  }}
                                  className="text-xs bg-white dark:bg-slate-800 rounded px-1.5 py-0.5 text-cyan-700 dark:text-cyan-300 font-bold border border-cyan-300 dark:border-cyan-700"
                                >
                                  <option value={3}>3/5 (Khá)</option>
                                  <option value={4}>4/5 (Tốt)</option>
                                  <option value={5}>5/5 (Xuất sắc)</option>
                                  <option value={2}>2/5 (Cơ bản)</option>
                                </select>
                              )}
                              <button
                                type="button"
                                onClick={() =>
                                  updateGroup({
                                    skills: group.skills.filter((item) => item.id !== sk.id),
                                  })
                                }
                                className="text-slate-400 hover:text-rose-600 transition-colors ml-0.5"
                                title="Xóa kỹ năng này"
                              >
                                <X className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          ))
                        )}
                      </div>
                    </div>

                    {/* Quick Add Input */}
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={newSkillText}
                        onChange={(e) =>
                          setNewSkillNameMap((prev) => ({ ...prev, [group.id]: e.target.value }))
                        }
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            e.preventDefault();
                            addSkillsToGroup();
                          }
                        }}
                        placeholder="Nhập kỹ năng (VD: React, TypeScript, Docker...) — nhấn Enter hoặc Thêm"
                        className={inputClass}
                      />
                      <button
                        type="button"
                        onClick={addSkillsToGroup}
                        className="px-4 py-2.5 rounded-xl bg-cyan-600 text-white text-sm font-bold hover:bg-cyan-700 shrink-0 transition-colors shadow-2xs"
                      >
                        + Thêm
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            <button
              type="button"
              onClick={() =>
                onChange({
                  ...cv,
                  skills: [
                    ...cv.skills,
                    {
                      id: uid('sk-grp'),
                      category: 'Nhóm kỹ năng mới',
                      skills: [],
                    },
                  ],
                })
              }
              className="w-full py-3 rounded-2xl border-2 border-dashed border-cyan-400 dark:border-cyan-700 text-cyan-700 dark:text-cyan-400 hover:bg-cyan-50 dark:hover:bg-cyan-950/40 text-sm font-bold flex items-center justify-center gap-2 shadow-2xs transition-colors"
            >
              <Plus className="w-4 h-4" />
              <span>+ Thêm Nhóm kỹ năng mới</span>
            </button>
          </div>
        )}
      </section>

      {/* 7. CERTIFICATIONS & AWARDS */}
      <section
        id="editor-sec-certifications"
        className="rounded-2xl border-2 border-teal-200/80 dark:border-teal-900/60 bg-white dark:bg-slate-900 shadow-xs overflow-hidden transition-all"
      >
        <button
          type="button"
          onClick={() => toggleSection('certifications')}
          className="w-full flex items-center justify-between px-5 py-4 bg-gradient-to-r from-teal-50/70 to-emerald-50/40 dark:from-teal-950/40 dark:to-emerald-950/20 hover:from-teal-100/70 dark:hover:from-teal-950/60 transition-colors text-left"
        >
          <div className="flex items-center gap-3.5">
            <div className="p-2.5 rounded-xl bg-teal-600 text-white shadow-sm">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">
                  7. Chứng chỉ & Giải thưởng
                </h3>
                <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-teal-100 dark:bg-teal-900/80 text-teal-800 dark:text-teal-200 border border-teal-300 dark:border-teal-700">
                  {cv.certifications.length} chứng chỉ
                </span>
                <span className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-teal-50 dark:bg-teal-950/60 text-teal-700 dark:text-teal-300 border border-teal-200 dark:border-teal-800">
                  Bảo chứng năng lực
                </span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">
                Chứng chỉ quốc tế, giải thưởng chuyên môn, kết quả thi năng lực (IELTS, TOEIC, AWS, Google Cloud...).
              </p>
            </div>
          </div>
          {openSections.certifications ? (
            <ChevronUp className="w-5 h-5 text-slate-500" />
          ) : (
            <ChevronDown className="w-5 h-5 text-slate-500" />
          )}
        </button>

        {openSections.certifications && (
          <div className="p-5 border-t border-teal-100 dark:border-teal-950/60 space-y-4">
            <SectionPurposeBanner
              purpose="Khẳng định năng lực chuyên môn và sự chuẩn hóa qua các tổ chức khảo thí quốc tế có uy tín. Đây là điểm cộng lớn giúp hồ sơ của bạn nổi bật khi tuyển dụng các vị trí đòi hỏi chuẩn mực ngành."
              a4Position="Thường đặt ở cột bên phải gần mục Học vấn hoặc cuối trang."
              tips="Ghi chính xác tên chứng chỉ (VD: AWS Certified Solutions Architect - Associate), đơn vị cấp và kèm liên kết xác thực (Credly / Badge URL) để nhà tuyển dụng kiểm chứng ngay lập tức."
              accentColor="teal"
            />

            <div className="space-y-4">
              {cv.certifications.map((cert, idx) => {
                const updateCert = (patch: Partial<CertificationItem>) => {
                  const next = [...cv.certifications];
                  next[idx] = { ...next[idx], ...patch };
                  onChange({ ...cv, certifications: next });
                };
                return (
                  <div
                    key={cert.id}
                    className="p-4 sm:p-5 rounded-2xl border-2 border-slate-200 dark:border-slate-700/80 bg-slate-50/70 dark:bg-slate-800/40 space-y-3 shadow-2xs"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold px-2 py-1 rounded-md bg-teal-100 dark:bg-teal-900/60 text-teal-800 dark:text-teal-200">
                          #{idx + 1}
                        </span>
                        <span className="text-sm font-bold text-slate-800 dark:text-slate-200">
                          {cert.name || 'Chứng chỉ / Giải thưởng mới'}
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={() =>
                          onChange({
                            ...cv,
                            certifications: cv.certifications.filter((c) => c.id !== cert.id),
                          })
                        }
                        className="p-1.5 rounded-lg hover:bg-rose-100 dark:hover:bg-rose-950/60 text-rose-600 transition-colors"
                        title="Xóa chứng chỉ này"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                      <div>
                        <label className={labelClass}>Tên Chứng chỉ / Giải thưởng *</label>
                        <input
                          type="text"
                          value={cert.name}
                          onChange={(e) => updateCert({ name: e.target.value })}
                          placeholder="VD: AWS Certified Solutions Architect - Associate"
                          className={inputClass}
                        />
                      </div>
                      <div>
                        <label className={labelClass}>Tổ chức cấp bằng / Chứng nhận *</label>
                        <input
                          type="text"
                          value={cert.issuer}
                          onChange={(e) => updateCert({ issuer: e.target.value })}
                          placeholder="VD: Amazon Web Services (AWS)"
                          className={inputClass}
                        />
                      </div>
                      <div>
                        <label className={labelClass}>Thời gian cấp / Đạt giải</label>
                        <input
                          type="month"
                          value={cert.date}
                          onChange={(e) => updateCert({ date: e.target.value })}
                          className={inputClass}
                        />
                      </div>
                      <div>
                        <label className={labelClass}>Đường link chứng thực trực tuyến (URL)</label>
                        <input
                          type="text"
                          value={cert.url}
                          onChange={(e) => updateCert({ url: e.target.value })}
                          placeholder="https://www.credly.com/badges/..."
                          className={inputClass}
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <button
              type="button"
              onClick={() =>
                onChange({
                  ...cv,
                  certifications: [
                    ...cv.certifications,
                    { id: uid('cert'), name: '', issuer: '', date: '2024-01', url: '' },
                  ],
                })
              }
              className="w-full py-3 rounded-2xl border-2 border-dashed border-teal-400 dark:border-teal-700 text-teal-700 dark:text-teal-400 hover:bg-teal-50 dark:hover:bg-teal-950/40 text-sm font-bold flex items-center justify-center gap-2 shadow-2xs transition-colors"
            >
              <Plus className="w-4 h-4" />
              <span>+ Thêm Chứng chỉ / Giải thưởng</span>
            </button>
          </div>
        )}
      </section>

      {/* 8. ACTIVITIES & VOLUNTEERING */}
      <section
        id="editor-sec-activities"
        className="rounded-2xl border-2 border-rose-200/80 dark:border-rose-900/60 bg-white dark:bg-slate-900 shadow-xs overflow-hidden transition-all"
      >
        <button
          type="button"
          onClick={() => toggleSection('activities')}
          className="w-full flex items-center justify-between px-5 py-4 bg-gradient-to-r from-rose-50/70 to-pink-50/40 dark:from-rose-950/40 dark:to-pink-950/20 hover:from-rose-100/70 dark:hover:from-rose-950/60 transition-colors text-left"
        >
          <div className="flex items-center gap-3.5">
            <div className="p-2.5 rounded-xl bg-rose-500 text-white shadow-sm">
              <HeartHandshake className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">
                  8. Hoạt động ngoại khóa & Đóng góp cộng đồng
                </h3>
                <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-rose-100 dark:bg-rose-900/80 text-rose-800 dark:text-rose-200 border border-rose-300 dark:border-rose-700">
                  {cv.activities.length} hoạt động
                </span>
                <span className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-rose-50 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300 border border-rose-200 dark:border-rose-800">
                  Kỹ năng mềm & Đội nhóm
                </span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">
                Câu lạc bộ, sự kiện hội thảo, hoạt động tình nguyện, ban tổ chức cuộc thi hoặc dự án cộng đồng.
              </p>
            </div>
          </div>
          {openSections.activities ? (
            <ChevronUp className="w-5 h-5 text-slate-500" />
          ) : (
            <ChevronDown className="w-5 h-5 text-slate-500" />
          )}
        </button>

        {openSections.activities && (
          <div className="p-5 border-t border-rose-100 dark:border-rose-950/60 space-y-4">
            <SectionPurposeBanner
              purpose="Thể hiện phẩm chất cá nhân, khả năng lãnh đạo (Leadership), kỹ năng giao tiếp và tinh thần trách nhiệm xã hội. Rất quan trọng đối với sinh viên mới ra trường và ứng viên Junior."
              a4Position="Nằm ở nửa dưới của trang A4 hoặc cuối cột phụ."
              tips="Ghi rõ vai trò cụ thể (Trưởng ban tổ chức, Diễn giả, Tình nguyện viên chính) và kết quả đem lại cho cộng đồng kèm số liệu định lượng (VD: Điều phối sự kiện 500+ sinh viên tham gia)."
              accentColor="rose"
            />

            <div className="space-y-4">
              {cv.activities.map((act, idx) => {
                const updateAct = (patch: Partial<ActivityItem>) => {
                  const next = [...cv.activities];
                  next[idx] = { ...next[idx], ...patch };
                  onChange({ ...cv, activities: next });
                };
                return (
                  <div
                    key={act.id}
                    className="p-4 sm:p-5 rounded-2xl border-2 border-slate-200 dark:border-slate-700/80 bg-slate-50/70 dark:bg-slate-800/40 space-y-3.5 shadow-2xs"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold px-2 py-1 rounded-md bg-rose-100 dark:bg-rose-900/60 text-rose-800 dark:text-rose-200">
                          #{idx + 1}
                        </span>
                        <span className="text-sm font-bold text-slate-800 dark:text-slate-200">
                          {act.organization || 'Tổ chức / Sự kiện'} — {act.role || 'Vai trò'}
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={() =>
                          onChange({
                            ...cv,
                            activities: cv.activities.filter((a) => a.id !== act.id),
                          })
                        }
                        className="p-1.5 rounded-lg hover:bg-rose-100 dark:hover:bg-rose-950/60 text-rose-600 transition-colors"
                        title="Xóa hoạt động này"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                      <div>
                        <label className={labelClass}>Tên Tổ chức / CLB / Sự kiện *</label>
                        <input
                          type="text"
                          value={act.organization}
                          onChange={(e) => updateAct({ organization: e.target.value })}
                          placeholder="VD: GDSC (Google Developer Student Club)"
                          className={inputClass}
                        />
                      </div>
                      <div>
                        <label className={labelClass}>Vai trò / Vị trí đảm nhiệm *</label>
                        <input
                          type="text"
                          value={act.role}
                          onChange={(e) => updateAct({ role: e.target.value })}
                          placeholder="VD: Trưởng ban Nội dung / Lead Organizer"
                          className={inputClass}
                        />
                      </div>
                      <div>
                        <label className={labelClass}>Từ tháng / năm</label>
                        <input
                          type="month"
                          value={act.startDate}
                          onChange={(e) => updateAct({ startDate: e.target.value })}
                          className={inputClass}
                        />
                      </div>
                      <div>
                        <label className={labelClass}>Đến tháng / năm</label>
                        <input
                          type="month"
                          value={act.endDate}
                          onChange={(e) => updateAct({ endDate: e.target.value })}
                          className={inputClass}
                        />
                      </div>
                    </div>

                    <div>
                      <label className={labelClass}>Mô tả đóng góp & Kết quả nổi bật</label>
                      <RichTextEditor
                        value={act.description}
                        onChange={(val) => updateAct({ description: val })}
                        rows={3}
                        showXyzHelper={false}
                      />
                    </div>
                  </div>
                );
              })}
            </div>

            <button
              type="button"
              onClick={() =>
                onChange({
                  ...cv,
                  activities: [
                    ...cv.activities,
                    {
                      id: uid('act'),
                      organization: '',
                      role: '',
                      startDate: '2023-01',
                      endDate: '2024-01',
                      description: '• ',
                    },
                  ],
                })
              }
              className="w-full py-3 rounded-2xl border-2 border-dashed border-rose-400 dark:border-rose-700 text-rose-700 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 text-sm font-bold flex items-center justify-center gap-2 shadow-2xs transition-colors"
            >
              <Plus className="w-4 h-4" />
              <span>+ Thêm Hoạt động ngoại khóa</span>
            </button>
          </div>
        )}
      </section>

      {/* 9. REFERENCES */}
      <section
        id="editor-sec-references"
        className="rounded-2xl border-2 border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-xs overflow-hidden transition-all"
      >
        <button
          type="button"
          onClick={() => toggleSection('references')}
          className="w-full flex items-center justify-between px-5 py-4 bg-gradient-to-r from-slate-100/80 to-slate-50/40 dark:from-slate-800/80 dark:to-slate-800/40 hover:from-slate-200/80 dark:hover:from-slate-800 transition-colors text-left"
        >
          <div className="flex items-center gap-3.5">
            <div className="p-2.5 rounded-xl bg-slate-700 text-white shadow-sm">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">
                  9. Người tham chiếu (References)
                </h3>
                <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-slate-200">
                  {cv.references.availableUponRequest ? 'Sẵn sàng khi có yêu cầu' : `${cv.references.items.length} người`}
                </span>
                <span className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-300 dark:border-slate-700">
                  Xác thực thông tin
                </span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">
                Cung cấp danh bạ sếp cũ / giảng viên hướng dẫn hoặc để dòng bảo mật thông tin.
              </p>
            </div>
          </div>
          {openSections.references ? (
            <ChevronUp className="w-5 h-5 text-slate-500" />
          ) : (
            <ChevronDown className="w-5 h-5 text-slate-500" />
          )}
        </button>

        {openSections.references && (
          <div className="p-5 border-t border-slate-200 dark:border-slate-800 space-y-4">
            <SectionPurposeBanner
              purpose="Cung cấp thông tin người có thể bảo chứng năng lực, thái độ và hiệu suất công việc của bạn khi nhà tuyển dụng tiến hành bước thẩm định (Background Check)."
              a4Position="Luôn đặt ở cuối cùng của CV (Chân trang A4)."
              tips="Nếu CV của bạn đã đầy 1 trang A4, hãy tích chọn 'Sẵn sàng cung cấp thông tin khi có yêu cầu'. Điều này giúp tiết kiệm diện tích cho Kinh nghiệm làm việc và bảo mật thông tin cá nhân của người giới thiệu."
              accentColor="slate"
            />

            <label className="flex items-start gap-3 p-4 rounded-2xl bg-indigo-50/70 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800 cursor-pointer shadow-2xs">
              <input
                type="checkbox"
                checked={cv.references.availableUponRequest}
                onChange={(e) =>
                  onChange({
                    ...cv,
                    references: {
                      ...cv.references,
                      availableUponRequest: e.target.checked,
                    },
                  })
                }
                className="mt-0.5 w-4 h-4 rounded text-indigo-600 focus:ring-indigo-500"
              />
              <div>
                <span className="text-sm font-bold text-indigo-950 dark:text-indigo-100 block">
                  Hiển thị dòng: "Sẵn sàng cung cấp thông tin người tham chiếu khi có yêu cầu"
                </span>
                <span className="text-xs text-indigo-700 dark:text-indigo-300 mt-0.5 block">
                  Khuyên dùng khi cần tiết kiệm diện tích để CV gói gọn trong 1 trang A4.
                </span>
              </div>
            </label>

            {!cv.references.availableUponRequest && (
              <div className="space-y-4">
                {cv.references.items.map((ref, idx) => {
                  const updateRef = (patch: Partial<ReferenceItem>) => {
                    const next = [...cv.references.items];
                    next[idx] = { ...next[idx], ...patch };
                    onChange({
                      ...cv,
                      references: { ...cv.references, items: next },
                    });
                  };
                  return (
                    <div
                      key={ref.id}
                      className="p-4 sm:p-5 rounded-2xl border-2 border-slate-200 dark:border-slate-700 bg-slate-50/70 dark:bg-slate-800/40 space-y-3.5 shadow-2xs"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold px-2 py-1 rounded-md bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-slate-200">
                            #{idx + 1}
                          </span>
                          <span className="text-sm font-bold text-slate-800 dark:text-slate-200">
                            {ref.name || 'Người tham chiếu'}
                          </span>
                        </div>
                        <button
                          type="button"
                          onClick={() =>
                            onChange({
                              ...cv,
                              references: {
                                ...cv.references,
                                items: cv.references.items.filter((r) => r.id !== ref.id),
                              },
                            })
                          }
                          className="p-1.5 rounded-lg hover:bg-rose-100 dark:hover:bg-rose-950/60 text-rose-600 transition-colors"
                          title="Xóa người tham chiếu"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                        <div>
                          <label className={labelClass}>Họ và tên người tham chiếu *</label>
                          <input
                            type="text"
                            value={ref.name}
                            onChange={(e) => updateRef({ name: e.target.value })}
                            placeholder="VD: TS. Nguyễn Văn A"
                            className={inputClass}
                          />
                        </div>
                        <div>
                          <label className={labelClass}>Chức vụ / Vị trí *</label>
                          <input
                            type="text"
                            value={ref.position}
                            onChange={(e) => updateRef({ position: e.target.value })}
                            placeholder="VD: Engineering Director / Trưởng khoa CNTT"
                            className={inputClass}
                          />
                        </div>
                        <div>
                          <label className={labelClass}>Cơ quan / Công ty</label>
                          <input
                            type="text"
                            value={ref.company}
                            onChange={(e) => updateRef({ company: e.target.value })}
                            placeholder="VD: VNG Corporation / Đại học Bách Khoa"
                            className={inputClass}
                          />
                        </div>
                        <div>
                          <label className={labelClass}>Email / Số điện thoại liên hệ</label>
                          <input
                            type="text"
                            value={ref.email}
                            onChange={(e) => updateRef({ email: e.target.value })}
                            placeholder="VD: direct-manager@company.com"
                            className={inputClass}
                          />
                        </div>
                      </div>
                    </div>
                  );
                })}

                <button
                  type="button"
                  onClick={() =>
                    onChange({
                      ...cv,
                      references: {
                        ...cv.references,
                        items: [
                          ...cv.references.items,
                          {
                            id: uid('ref'),
                            name: '',
                            position: '',
                            company: '',
                            email: '',
                            phone: '',
                          },
                        ],
                      },
                    })
                  }
                  className="w-full py-3 rounded-2xl border-2 border-dashed border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 text-sm font-bold flex items-center justify-center gap-2 shadow-2xs transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  <span>+ Thêm Người tham chiếu cụ thể</span>
                </button>
              </div>
            )}
          </div>
        )}
      </section>

      {/* 10. CUSTOM SECTIONS */}
      <section
        id="editor-sec-custom"
        className="rounded-2xl border-2 border-purple-200/80 dark:border-purple-900/60 bg-white dark:bg-slate-900 shadow-xs overflow-hidden transition-all"
      >
        <button
          type="button"
          onClick={() => toggleSection('custom')}
          className="w-full flex items-center justify-between px-5 py-4 bg-gradient-to-r from-purple-50/70 to-indigo-50/40 dark:from-purple-950/40 dark:to-indigo-950/20 hover:from-purple-100/70 dark:hover:from-purple-950/60 transition-colors text-left"
        >
          <div className="flex items-center gap-3.5">
            <div className="p-2.5 rounded-xl bg-purple-600 text-white shadow-sm">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">
                  10. Mục tùy chỉnh (Custom Sections)
                </h3>
                <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-purple-100 dark:bg-purple-900/80 text-purple-800 dark:text-purple-200 border border-purple-300 dark:border-purple-700">
                  {cv.customSections.length} mục tự tạo
                </span>
                <span className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-purple-50 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-800">
                  Mở rộng linh hoạt
                </span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">
                Tự tạo thêm mục đặc thù theo ngành (Công bố khoa học / Publications, Bằng sáng chế, Sở thích cá nhân...).
              </p>
            </div>
          </div>
          {openSections.custom ? (
            <ChevronUp className="w-5 h-5 text-slate-500" />
          ) : (
            <ChevronDown className="w-5 h-5 text-slate-500" />
          )}
        </button>

        {openSections.custom && (
          <div className="p-5 border-t border-purple-100 dark:border-purple-950/60 space-y-4">
            <SectionPurposeBanner
              purpose="Cung cấp không gian tự do để bạn trình bày các nội dung đặc thù không nằm trong 9 mục chuẩn, như: Công trình nghiên cứu, Bằng sáng chế độc quyền, Báo chí đưa tin, Sở thích..."
              a4Position="Vị trí linh hoạt. Bạn có thể kéo thả sắp xếp lại thứ tự xuất hiện ở menu 'Cấu trúc các mục CV' ở thanh bên trái."
              tips="Đặt tiêu đề mục ngắn gọn, rõ ràng (VD: 'Công bố khoa học (Publications)' thay vì đặt quá dài). Tận dụng gạch đầu dòng mô tả cô đọng."
              accentColor="purple"
            />

            <div className="space-y-4">
              {cv.customSections.map((group, gIdx) => {
                const updateCustomGroup = (patch: Partial<CustomSectionGroup>) => {
                  const next = [...cv.customSections];
                  next[gIdx] = { ...next[gIdx], ...patch };
                  onChange({ ...cv, customSections: next });
                };

                return (
                  <div
                    key={group.id}
                    className="p-4 sm:p-5 rounded-2xl border-2 border-slate-200 dark:border-slate-700 bg-slate-50/70 dark:bg-slate-800/40 space-y-3.5 shadow-2xs"
                  >
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex-1">
                        <label className={labelClass}>Tiêu đề Mục tùy chỉnh #{gIdx + 1} *</label>
                        <input
                          type="text"
                          value={group.sectionTitle}
                          onChange={(e) => updateCustomGroup({ sectionTitle: e.target.value })}
                          placeholder="VD: Công bố khoa học (Publications) / Bằng sáng chế / Sở thích"
                          className="w-full px-3.5 py-2.5 text-sm font-bold rounded-xl border border-purple-300 dark:border-purple-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-purple-500 focus:outline-hidden"
                        />
                      </div>
                      <button
                        type="button"
                        onClick={() =>
                          onChange({
                            ...cv,
                            customSections: cv.customSections.filter((g) => g.id !== group.id),
                          })
                        }
                        className="mt-6 p-2 rounded-lg hover:bg-rose-100 dark:hover:bg-rose-950/60 text-rose-600 transition-colors"
                        title="Xóa toàn bộ mục tùy chỉnh này"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="space-y-3 pt-2">
                      <div className="text-xs font-semibold text-slate-600 dark:text-slate-400">
                        Danh sách các mục con:
                      </div>
                      {group.items.map((item, iIdx) => {
                        const updateItem = (patch: Partial<typeof item>) => {
                          const nextItems = [...group.items];
                          nextItems[iIdx] = { ...nextItems[iIdx], ...patch };
                          updateCustomGroup({ items: nextItems });
                        };
                        return (
                          <div
                            key={item.id}
                            className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 space-y-3 shadow-2xs"
                          >
                            <div className="flex items-center justify-between">
                              <span className="text-xs font-bold px-2 py-0.5 rounded bg-purple-100 dark:bg-purple-950/70 text-purple-700 dark:text-purple-300">
                                Mục con #{iIdx + 1}
                              </span>
                              <button
                                type="button"
                                onClick={() =>
                                  updateCustomGroup({
                                    items: group.items.filter((x) => x.id !== item.id),
                                  })
                                }
                                className="p-1 text-slate-400 hover:text-rose-600 transition-colors"
                                title="Xóa mục con này"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                              <div>
                                <label className={labelClass}>Tiêu đề chính</label>
                                <input
                                  type="text"
                                  value={item.title}
                                  onChange={(e) => updateItem({ title: e.target.value })}
                                  placeholder="VD: Nghiên cứu ứng dụng LLM trong Y tế"
                                  className={inputClass}
                                />
                              </div>
                              <div>
                                <label className={labelClass}>Phụ đề / Tổ chức / Nhà xuất bản</label>
                                <input
                                  type="text"
                                  value={item.subtitle}
                                  onChange={(e) => updateItem({ subtitle: e.target.value })}
                                  placeholder="VD: Tạp chí Tin học Y sinh Việt Nam"
                                  className={inputClass}
                                />
                              </div>
                              <div>
                                <label className={labelClass}>Thời gian</label>
                                <input
                                  type="month"
                                  value={item.date}
                                  onChange={(e) => updateItem({ date: e.target.value })}
                                  className={inputClass}
                                />
                              </div>
                            </div>
                            <div>
                              <label className={labelClass}>Chi tiết / Mô tả</label>
                              <RichTextEditor
                                value={item.description}
                                onChange={(val) => updateItem({ description: val })}
                                rows={2}
                                showXyzHelper={false}
                              />
                            </div>
                          </div>
                        );
                      })}

                      <button
                        type="button"
                        onClick={() =>
                          updateCustomGroup({
                            items: [
                              ...group.items,
                              {
                                id: uid('ci'),
                                title: '',
                                subtitle: '',
                                date: '',
                                description: '• ',
                              },
                            ],
                          })
                        }
                        className="px-3.5 py-2 rounded-xl bg-purple-50 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300 text-xs font-bold hover:bg-purple-100 inline-flex items-center gap-1.5 transition-colors border border-purple-200 dark:border-purple-800"
                      >
                        <Plus className="w-3.5 h-3.5" /> Thêm mục con
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            <button
              type="button"
              onClick={() =>
                onChange({
                  ...cv,
                  customSections: [
                    ...cv.customSections,
                    {
                      id: uid('cust'),
                      sectionTitle: 'Mục tùy chỉnh mới',
                      items: [
                        {
                          id: uid('ci'),
                          title: '',
                          subtitle: '',
                          date: '',
                          description: '',
                        },
                      ],
                    },
                  ],
                })
              }
              className="w-full py-3 rounded-2xl border-2 border-dashed border-purple-400 dark:border-purple-700 text-purple-700 dark:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-950/40 text-sm font-bold flex items-center justify-center gap-2 shadow-2xs transition-colors"
            >
              <Plus className="w-4 h-4" />
              <span>+ Tạo thêm Mục tùy chỉnh mới</span>
            </button>
          </div>
        )}
      </section>
    </div>
  );
};
