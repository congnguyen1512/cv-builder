import React from 'react';
import {
  Palette,
  Type,
  Sliders,
  Globe2,
  LayoutTemplate,
  Check,
  Sparkles,
  RotateCcw,
  Columns,
} from 'lucide-react';
import {
  CVDocument,
  DesignSettings,
  TemplateId,
  FontFamilyType,
  DateFormatType,
} from '../types/cv';

interface DesignCustomizerProps {
  cv: CVDocument;
  onChange: (updated: CVDocument) => void;
}

const TEMPLATES: {
  id: TemplateId;
  name: string;
  badge: string;
  desc: string;
  layoutPreview: 'single' | 'sidebar' | 'executive' | 'creative' | 'compact';
}[] = [
  {
    id: 'ats-standard',
    name: "ATS Standard (Harvard / Jake's Style)",
    badge: 'ATS 100% • IT / Finance',
    desc: 'Bố cục 1 cột kinh điển, đường kẻ phân tách sắc nét, tối ưu tuyệt đối cho hệ thống lọc hồ sơ tự động (Workday, Greenhouse, Lever).',
    layoutPreview: 'single',
  },
  {
    id: 'modern-professional',
    name: 'Modern Professional (2 Cột Bất đối xứng)',
    badge: '2 Columns • Đa ngành',
    desc: 'Sidebar trái/phải chứa Liên hệ, Kỹ năng, Học vấn & Chứng chỉ; cột chính rộng rãi làm nổi bật Kinh nghiệm & Dự án.',
    layoutPreview: 'sidebar',
  },
  {
    id: 'executive-minimal',
    name: 'Executive / Minimalist',
    badge: 'Senior / Manager',
    desc: 'Khoảng trắng tinh tế, tiêu đề sang trọng, nhấn mạnh tầm nhìn lãnh đạo và kết quả kinh doanh cốt lõi.',
    layoutPreview: 'executive',
  },
  {
    id: 'creative-designer',
    name: 'Creative / Designer Studio',
    badge: 'Product / UX / Marketing',
    desc: 'Header màu chủ đạo hiện đại kết hợp Avatar nổi bật, thẻ kỹ năng trực quan và bố cục năng động.',
    layoutPreview: 'creative',
  },
  {
    id: 'tech-compact',
    name: 'Tech Compact (Silicon Valley 1-Page)',
    badge: 'Gọn 1 trang A4',
    desc: 'Tối ưu mật độ hiển thị cao giúp ứng viên có nhiều dự án & kỹ năng vẫn gói gọn hoàn hảo trong 1 trang A4.',
    layoutPreview: 'compact',
  },
];

const COLOR_PRESETS = [
  { name: 'Navy Executive', hex: '#1e3a8a' },
  { name: 'Indigo Modern', hex: '#4f46e5' },
  { name: 'Slate Classic (ATS)', hex: '#0f172a' },
  { name: 'Emerald Tech', hex: '#047857' },
  { name: 'Teal Ocean', hex: '#0f766e' },
  { name: 'Burgundy Wine', hex: '#881337' },
  { name: 'Violet Creative', hex: '#6d28d9' },
  { name: 'Amber Warm', hex: '#b45309' },
];

const FONTS: { id: FontFamilyType; label: string; styleDesc: string }[] = [
  { id: 'Inter', label: 'Inter', styleDesc: 'Sans-serif hiện đại, chuẩn UI/Tech' },
  { id: 'Plus Jakarta Sans', label: 'Plus Jakarta Sans', styleDesc: 'Trẻ trung, thanh thoát, dễ đọc' },
  { id: 'Roboto', label: 'Roboto', styleDesc: 'Tiêu chuẩn Google, rõ nét mọi kích cỡ' },
  { id: 'Merriweather', label: 'Merriweather', styleDesc: 'Serif cổ điển, chuẩn Harvard/Academic' },
  { id: 'Lora', label: 'Lora', styleDesc: 'Serif sang trọng, dành cho cấp Quản lý' },
];

export const DesignCustomizer: React.FC<DesignCustomizerProps> = ({ cv, onChange }) => {
  const { design } = cv;

  const updateDesign = (patch: Partial<DesignSettings>) => {
    onChange({
      ...cv,
      design: { ...design, ...patch },
    });
  };

  const applyOnePageFit = () => {
    updateDesign({
      fontSize: 8.8,
      lineHeight: 1.28,
      sectionGap: 9,
      pageMargin: 11,
    });
  };

  const resetDefaultSpacing = () => {
    updateDesign({
      fontSize: 9.0,
      lineHeight: 1.30,
      sectionGap: 10,
      pageMargin: 12,
    });
  };

  return (
    <div className="p-4 sm:p-6 space-y-6 max-w-3xl mx-auto pb-24">
      {/* Header Banner */}
      <div className="p-4 rounded-2xl bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-950/40 dark:to-purple-950/20 border border-indigo-200 dark:border-indigo-800/60 space-y-1">
        <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <Palette className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
          <span>Hệ thống Mẫu CV & Thiết kế In ấn (Design Engine)</span>
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300">
          Chuyển đổi linh hoạt giữa 5 kiểu kiến trúc Template mà <strong>không làm mất dữ liệu</strong>. Tự động tương thích 100% font Tiếng Việt và tối ưu chuẩn máy quét ATS.
        </p>
      </div>

      {/* 1. TEMPLATE SELECTOR */}
      <div className="p-5 rounded-2xl border-2 border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-4 shadow-xs">
        <div>
          <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
            <LayoutTemplate className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
            <span>1. Chọn Kiến trúc Template ({TEMPLATES.length} mẫu chuẩn quốc tế)</span>
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Chọn cấu trúc trang phù hợp nhất với vị trí công việc, ngành nghề và số năm kinh nghiệm của bạn.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          {TEMPLATES.map((tpl) => {
            const active = design.template === tpl.id;
            return (
              <div
                key={tpl.id}
                onClick={() => updateDesign({ template: tpl.id })}
                className={`relative p-4 rounded-2xl border-2 text-left cursor-pointer transition-all ${
                  active
                    ? 'border-indigo-600 bg-indigo-50/70 dark:bg-indigo-950/50 ring-2 ring-indigo-500/30 shadow-md'
                    : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-indigo-300'
                }`}
              >
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div>
                    <span className="inline-block text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-indigo-100 dark:bg-indigo-900/70 text-indigo-700 dark:text-indigo-300 mb-1.5 border border-indigo-200 dark:border-indigo-800">
                      {tpl.badge}
                    </span>
                    <h4 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white">
                      {tpl.name}
                    </h4>
                  </div>
                  {active && (
                    <span className="p-1 rounded-full bg-indigo-600 text-white shrink-0 shadow-xs">
                      <Check className="w-4 h-4" />
                    </span>
                  )}
                </div>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  {tpl.desc}
                </p>
              </div>
            );
          })}
        </div>

        {/* Sidebar Position option if Modern Professional is active */}
        {design.template === 'modern-professional' && (
          <div className="p-4 rounded-xl bg-slate-100 dark:bg-slate-800/70 flex flex-wrap items-center justify-between gap-3 border border-slate-200 dark:border-slate-700">
            <span className="text-xs sm:text-sm font-bold flex items-center gap-2 text-slate-700 dark:text-slate-200">
              <Columns className="w-4 h-4 text-indigo-500" />
              Vị trí cột Sidebar (Cột phụ):
            </span>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => updateDesign({ sidebarPosition: 'left' })}
                className={`px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                  design.sidebarPosition === 'left'
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-300 dark:border-slate-700'
                }`}
              >
                Cột Trái (Sidebar Left)
              </button>
              <button
                type="button"
                onClick={() => updateDesign({ sidebarPosition: 'right' })}
                className={`px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                  design.sidebarPosition === 'right'
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-300 dark:border-slate-700'
                }`}
              >
                Cột Phải (Sidebar Right)
              </button>
            </div>
          </div>
        )}
      </div>

      {/* 2. THEME COLOR */}
      <div className="p-5 rounded-2xl border-2 border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-4 shadow-xs">
        <div>
          <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
            <Palette className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
            <span>2. Màu sắc chủ đạo (Primary & Accent Color)</span>
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Được dùng cho họ tên, đường kẻ phân cách, tiêu đề mục và nhãn nổi bật trên trang in A4.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          {COLOR_PRESETS.map((color) => {
            const isSelected = design.primaryColor.toLowerCase() === color.hex.toLowerCase();
            return (
              <button
                key={color.hex}
                type="button"
                onClick={() => updateDesign({ primaryColor: color.hex })}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl border text-xs sm:text-sm font-bold transition-all ${
                  isSelected
                    ? 'border-indigo-600 bg-indigo-50 dark:bg-indigo-950/60 text-indigo-900 dark:text-indigo-100 ring-2 ring-indigo-500/30 shadow-xs'
                    : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:border-indigo-300'
                }`}
              >
                <span
                  className="w-4 h-4 rounded-full border border-white shadow-xs shrink-0"
                  style={{ backgroundColor: color.hex }}
                />
                <span>{color.name}</span>
              </button>
            );
          })}

          {/* Custom Color Picker */}
          <label className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl border border-slate-300 dark:border-slate-700 text-xs sm:text-sm font-bold cursor-pointer bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-200">
            <input
              type="color"
              value={design.primaryColor}
              onChange={(e) => updateDesign({ primaryColor: e.target.value })}
              className="w-5 h-5 rounded cursor-pointer border-0 bg-transparent"
            />
            <span>Mã màu tùy chỉnh ({design.primaryColor})</span>
          </label>
        </div>
      </div>

      {/* 3. TYPOGRAPHY */}
      <div className="p-5 rounded-2xl border-2 border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-4 shadow-xs">
        <div>
          <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
            <Type className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
            <span>3. Bộ Font chữ chuẩn Tiếng Việt (Typography)</span>
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Toàn bộ 5 bộ font được nhúng sẵn ký tự Unicode tiếng Việt đầy đủ dấu (â, ê, ô, ư, ơ...).
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {FONTS.map((f) => {
            const active = design.fontFamily === f.id;
            return (
              <button
                key={f.id}
                type="button"
                onClick={() => updateDesign({ fontFamily: f.id })}
                style={{ fontFamily: `"${f.id}", sans-serif` }}
                className={`p-3.5 rounded-2xl border-2 text-left transition-all ${
                  active
                    ? 'border-indigo-600 bg-indigo-50/70 dark:bg-indigo-950/50 text-indigo-950 dark:text-indigo-100 ring-2 ring-indigo-500/30 shadow-xs'
                    : 'border-slate-200 dark:border-slate-800 hover:border-indigo-300'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-base font-bold">{f.label}</span>
                  {active && <Check className="w-4 h-4 text-indigo-600" />}
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  {f.styleDesc}
                </p>
              </button>
            );
          })}
        </div>
      </div>

      {/* 4. SIZE, SPACING & MARGINS (CO KÉO VỪA KHÍT 1 TRANG A4) */}
      <div className="p-5 rounded-2xl border-2 border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-4 shadow-xs">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
              <Sliders className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
              <span>4. Kích thước & Căn lề A4 (Co kéo vừa khít 1 trang)</span>
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Điều chỉnh thông số vi mô để tránh trường hợp CV thừa vài dòng sang trang 2 lãng phí.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={applyOnePageFit}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs sm:text-sm font-bold bg-indigo-600 text-white hover:bg-indigo-700 shadow-xs transition-colors"
            >
              <Sparkles className="w-4 h-4" />
              <span>Co vừa khít 1 trang A4</span>
            </button>
            <button
              type="button"
              onClick={resetDefaultSpacing}
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs sm:text-sm font-medium bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Mặc định</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
          {/* Font Size */}
          <div className="p-3.5 rounded-xl bg-slate-50/70 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/80 space-y-1.5">
            <div className="flex justify-between items-center">
              <span className="text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-200">
                Cỡ chữ nội dung (Font Size)
              </span>
              <span className="font-mono text-indigo-600 dark:text-indigo-400 font-bold text-xs sm:text-sm">
                {design.fontSize} pt
              </span>
            </div>
            <input
              type="range"
              min={8.5}
              max={11.5}
              step={0.25}
              value={design.fontSize}
              onChange={(e) => updateDesign({ fontSize: parseFloat(e.target.value) })}
              className="w-full accent-indigo-600 cursor-pointer"
            />
            <div className="flex justify-between text-[11px] text-slate-500">
              <span>8.5pt (Gọn nhiều chữ)</span>
              <span>10pt (Chuẩn)</span>
              <span>11.5pt (Thoáng)</span>
            </div>
          </div>

          {/* Line Height */}
          <div className="p-3.5 rounded-xl bg-slate-50/70 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/80 space-y-1.5">
            <div className="flex justify-between items-center">
              <span className="text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-200">
                Độ giãn dòng (Line Spacing)
              </span>
              <span className="font-mono text-indigo-600 dark:text-indigo-400 font-bold text-xs sm:text-sm">
                {design.lineHeight}
              </span>
            </div>
            <input
              type="range"
              min={1.2}
              max={1.65}
              step={0.02}
              value={design.lineHeight}
              onChange={(e) => updateDesign({ lineHeight: parseFloat(e.target.value) })}
              className="w-full accent-indigo-600 cursor-pointer"
            />
            <div className="flex justify-between text-[11px] text-slate-500">
              <span>1.20 (Chặt chẽ)</span>
              <span>1.38 (Cân đối)</span>
              <span>1.65 (Thưa)</span>
            </div>
          </div>

          {/* Section Gap */}
          <div className="p-3.5 rounded-xl bg-slate-50/70 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/80 space-y-1.5">
            <div className="flex justify-between items-center">
              <span className="text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-200">
                Khoảng cách giữa các mục (Gap)
              </span>
              <span className="font-mono text-indigo-600 dark:text-indigo-400 font-bold text-xs sm:text-sm">
                {design.sectionGap} px
              </span>
            </div>
            <input
              type="range"
              min={8}
              max={24}
              step={1}
              value={design.sectionGap}
              onChange={(e) => updateDesign({ sectionGap: parseInt(e.target.value, 10) })}
              className="w-full accent-indigo-600 cursor-pointer"
            />
            <div className="flex justify-between text-[11px] text-slate-500">
              <span>8px (Gần nhau)</span>
              <span>14px (Chuẩn)</span>
              <span>24px (Rộng rãi)</span>
            </div>
          </div>

          {/* Page Margins */}
          <div className="p-3.5 rounded-xl bg-slate-50/70 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/80 space-y-1.5">
            <div className="flex justify-between items-center">
              <span className="text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-200">
                Lề trang giấy A4 (Margins)
              </span>
              <span className="font-mono text-indigo-600 dark:text-indigo-400 font-bold text-xs sm:text-sm">
                {design.pageMargin} mm
              </span>
            </div>
            <input
              type="range"
              min={10}
              max={22}
              step={1}
              value={design.pageMargin}
              onChange={(e) => updateDesign({ pageMargin: parseInt(e.target.value, 10) })}
              className="w-full accent-indigo-600 cursor-pointer"
            />
            <div className="flex justify-between text-[11px] text-slate-500">
              <span>10mm (Tối đa nội dung)</span>
              <span>14mm (Khuyên dùng)</span>
              <span>22mm (Trang trọng)</span>
            </div>
          </div>
        </div>
      </div>

      {/* 5. LOCALIZATION & DATE FORMAT */}
      <div className="p-5 rounded-2xl border-2 border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-4 shadow-xs">
        <div>
          <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
            <Globe2 className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
            <span>5. Ngôn ngữ Tiêu đề & Định dạng Ngày tháng (Localization)</span>
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Tự động đổi tên các tiêu đề (Kinh nghiệm làm việc ↔ Work Experience) chỉ trong 1 chạm.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-200 mb-2">
              Ngôn ngữ nhãn mục trên CV:
            </label>
            <div className="grid grid-cols-2 gap-2.5">
              <button
                type="button"
                onClick={() => updateDesign({ language: 'vi' })}
                className={`py-2.5 px-3 rounded-xl border-2 text-xs sm:text-sm font-bold transition-all ${
                  design.language === 'vi'
                    ? 'border-indigo-600 bg-indigo-600 text-white shadow-xs'
                    : 'border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-indigo-300'
                }`}
              >
                🇻🇳 Tiếng Việt
              </button>
              <button
                type="button"
                onClick={() => updateDesign({ language: 'en' })}
                className={`py-2.5 px-3 rounded-xl border-2 text-xs sm:text-sm font-bold transition-all ${
                  design.language === 'en'
                    ? 'border-indigo-600 bg-indigo-600 text-white shadow-xs'
                    : 'border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-indigo-300'
                }`}
              >
                🇬🇧 English
              </button>
            </div>
          </div>

          <div>
            <label className="block text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-200 mb-2">
              Định dạng hiển thị thời gian:
            </label>
            <div className="grid grid-cols-3 gap-2">
              {(['MM/YYYY', 'MMM YYYY', 'YYYY'] as DateFormatType[]).map((fmt) => (
                <button
                  key={fmt}
                  type="button"
                  onClick={() => updateDesign({ dateFormat: fmt })}
                  className={`py-2.5 px-2 rounded-xl border-2 text-xs sm:text-sm font-bold transition-all ${
                    design.dateFormat === fmt
                      ? 'border-indigo-600 bg-indigo-600 text-white shadow-xs'
                      : 'border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-indigo-300'
                  }`}
                >
                  {fmt}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
