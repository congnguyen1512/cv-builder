import React, { useState } from 'react';
import {
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Search,
  Plus,
  Sparkles,
  ArrowRight,
  FileSearch,
  Copy,
  Check,
} from 'lucide-react';
import { CVDocument } from '../types/cv';
import { evaluateCVScore, matchJobDescription } from '../utils/atsAnalyzer';
import { XYZ_STAR_SUGGESTIONS } from '../data/sampleData';

interface AtsPanelProps {
  cv: CVDocument;
  onChange: (updated: CVDocument) => void;
  onJumpToSection: (section: string) => void;
}

const SAMPLE_JD = `We are looking for a Senior Full-Stack Engineer to join our FinTech platform team.
Requirements:
- 4+ years of experience with TypeScript, React, Next.js, and Node.js (NestJS) or Golang.
- Strong experience designing Microservices, REST API, GraphQL, and event-driven architectures using Kafka or Redis.
- Hands-on experience with PostgreSQL, Docker, Kubernetes (K8s), AWS, Terraform, and CI/CD pipelines (GitHub Actions).
- Proven track record in system design, performance optimization, Scalability, Security (OAuth, JWT), and Automated Unit Test (Jest, Playwright).
- Experience working in Agile / Scrum teams and mentoring junior developers.`;

export const AtsPanel: React.FC<AtsPanelProps> = ({ cv, onChange, onJumpToSection }) => {
  const [jdText, setJdText] = useState(SAMPLE_JD);
  const [copiedIdx, setCopiedIdx] = useState<number | null>(null);

  const scoreResult = evaluateCVScore(cv);
  const jdMatch = matchJobDescription(cv, jdText);

  const addMissingKeywordToSkills = (keyword: string) => {
    const formatted =
      keyword.length <= 4
        ? keyword.toUpperCase()
        : keyword.charAt(0).toUpperCase() + keyword.slice(1);

    const existingGroups = [...cv.skills];
    if (existingGroups.length === 0) {
      existingGroups.push({
        id: `sk-${Date.now()}`,
        category: 'Kỹ năng chuyên môn',
        skills: [{ id: `s-${Date.now()}`, name: formatted, level: 4 }],
      });
    } else {
      const firstGroup = { ...existingGroups[0] };
      firstGroup.skills = [
        ...firstGroup.skills,
        { id: `s-${Date.now()}-${Math.random().toString(36).slice(2, 5)}`, name: formatted, level: 4 },
      ];
      existingGroups[0] = firstGroup;
    }

    onChange({
      ...cv,
      skills: existingGroups,
    });
  };

  const copyText = (text: string, idx: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIdx(idx);
    setTimeout(() => setCopiedIdx(null), 1500);
  };

  return (
    <div className="p-4 sm:p-6 space-y-6 max-w-3xl mx-auto pb-24">
      {/* Intro Banner */}
      <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-950/40 dark:to-teal-950/20 border border-emerald-200 dark:border-emerald-800/60 space-y-1">
        <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
          <span>Kiểm tra Điểm ATS & So khớp Từ khóa Tuyển dụng (JD)</span>
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300">
          Hệ thống phân tích tự động kiểm tra định dạng CV, số liệu định lượng, độ dài tối ưu và đối chiếu từ khóa với mô tả công việc (JD) thực tế.
        </p>
      </div>

      {/* 1. ATS SCORE CHECKER CARD */}
      <div className="p-5 sm:p-6 rounded-2xl border-2 border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800">
              <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span>Đánh giá Chuẩn Tuyển dụng ATS & HR</span>
            </div>
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
              Xếp hạng Hồ sơ: {scoreResult.grade}
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
              Đã phát hiện <strong className="text-slate-900 dark:text-slate-200">{scoreResult.metricsCount} số liệu định lượng (%, $, số người)</strong> • Tổng độ dài:{' '}
              <strong className="text-slate-900 dark:text-slate-200">{scoreResult.wordCount} từ</strong> (Khuyến nghị chuẩn A4: 300–650 từ)
            </p>
          </div>

          {/* Score Circle */}
          <div className="flex items-center gap-3 shrink-0">
            <div
              className={`w-24 h-24 rounded-2xl flex flex-col items-center justify-center border-4 font-bold shadow-xs ${
                scoreResult.totalScore >= 85
                  ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300'
                  : scoreResult.totalScore >= 70
                  ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300'
                  : 'border-amber-500 bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300'
              }`}
            >
              <span className="text-3xl leading-none">{scoreResult.totalScore}</span>
              <span className="text-xs opacity-75 mt-1 font-semibold">/ 100 điểm</span>
            </div>
          </div>
        </div>

        {/* Checklist */}
        <div className="space-y-3">
          <div className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            Chi tiết các tiêu chí kiểm tra:
          </div>
          {scoreResult.checks.map((item) => (
            <div
              key={item.id}
              className="flex items-start justify-between gap-3 p-3.5 sm:p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/80 dark:border-slate-800 transition-colors"
            >
              <div className="flex items-start gap-3">
                {item.status === 'pass' && (
                  <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                )}
                {item.status === 'warning' && (
                  <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                )}
                {item.status === 'fail' && (
                  <XCircle className="w-5 h-5 text-rose-500 shrink-0 mt-0.5" />
                )}
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100">
                      {item.title}
                    </h4>
                    <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-slate-200">
                      {item.score}/{item.maxScore}đ
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">
                    {item.feedback}
                  </p>
                </div>
              </div>

              {item.targetSection && item.status !== 'pass' && (
                <button
                  type="button"
                  onClick={() => onJumpToSection(item.targetSection!)}
                  className="shrink-0 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs sm:text-sm font-bold bg-indigo-50 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 hover:bg-indigo-100 border border-indigo-200 dark:border-indigo-800 transition-colors"
                >
                  <span>Sửa ngay</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* 2. JOB DESCRIPTION (JD) MATCHER */}
      <div className="p-5 sm:p-6 rounded-2xl border-2 border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div>
            <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <FileSearch className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
              <span>2. So khớp Từ khóa Bản mô tả Công việc (Job Description)</span>
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
              Dán yêu cầu tuyển dụng (JD) vào bên dưới để hệ thống quét các từ khóa/kỹ năng đang thiếu trong CV của bạn.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className="px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-bold bg-indigo-100 dark:bg-indigo-950 text-indigo-800 dark:text-indigo-200 border border-indigo-300 dark:border-indigo-700">
              Độ khớp từ khóa JD: {jdMatch.matchPercentage}%
            </span>
          </div>
        </div>

        <textarea
          rows={5}
          value={jdText}
          onChange={(e) => setJdText(e.target.value)}
          placeholder="Dán nội dung Job Description (Yêu cầu công việc, Kỹ năng cần có...) vào đây..."
          className="w-full p-3.5 text-xs sm:text-sm rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500/40"
        />

        {/* Matched vs Missing Keywords */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Missing Keywords */}
          <div className="p-4 rounded-xl bg-amber-50/70 dark:bg-amber-950/20 border-2 border-amber-200 dark:border-amber-900/50 space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="text-xs sm:text-sm font-bold text-amber-900 dark:text-amber-300 flex items-center gap-2">
                <Search className="w-4 h-4 text-amber-600" />
                Từ khóa trong JD nhưng THIẾU trong CV ({jdMatch.missingKeywords.length})
              </span>
            </div>
            {jdMatch.missingKeywords.length === 0 ? (
              <p className="text-xs sm:text-sm text-emerald-600 dark:text-emerald-400 font-bold">
                ✓ Tuyệt vời! CV của bạn đã bao phủ toàn bộ từ khóa quan trọng trong JD này.
              </p>
            ) : (
              <div className="flex flex-wrap gap-2">
                {jdMatch.missingKeywords.map((kw) => (
                  <button
                    key={kw}
                    type="button"
                    onClick={() => addMissingKeywordToSkills(kw)}
                    title="Nhấn để thêm ngay từ khóa này vào mục Kỹ năng của CV"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs sm:text-sm font-bold bg-white dark:bg-slate-900 text-amber-800 dark:text-amber-300 border border-amber-300 dark:border-amber-700 hover:bg-amber-600 hover:text-white transition-colors shadow-2xs"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>{kw}</span>
                  </button>
                ))}
              </div>
            )}
            {jdMatch.missingKeywords.length > 0 && (
              <p className="text-xs text-amber-800 dark:text-amber-300 pt-1 font-medium">
                💡 Mẹo: Nhấn vào bất kỳ từ khóa nào ở trên để tự động bổ sung vào mục Kỹ năng của CV.
              </p>
            )}
          </div>

          {/* Matched Keywords */}
          <div className="p-4 rounded-xl bg-emerald-50/70 dark:bg-emerald-950/20 border-2 border-emerald-200 dark:border-emerald-900/50 space-y-2.5">
            <span className="text-xs sm:text-sm font-bold text-emerald-900 dark:text-emerald-300 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              Từ khóa JD ĐÃ CÓ trong CV ({jdMatch.matchedKeywords.length})
            </span>
            <div className="flex flex-wrap gap-2">
              {jdMatch.matchedKeywords.map((kw) => (
                <span
                  key={kw}
                  className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-xs sm:text-sm font-semibold bg-emerald-100/90 dark:bg-emerald-900/60 text-emerald-800 dark:text-emerald-200"
                >
                  ✓ {kw}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 3. XYZ / STAR FORMULA LIBRARY */}
      <div className="p-5 sm:p-6 rounded-2xl border-2 border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs space-y-4">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-indigo-100 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              3. Thư viện Mẫu câu Thành tích XYZ / STAR (Google & Harvard)
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
              Công thức chuẩn: Đạt được [X - Kết quả định lượng] thông qua [Y - Bối cảnh] bằng cách [Z - Hành động/Kỹ thuật].
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-3">
          {XYZ_STAR_SUGGESTIONS.map((s, idx) => (
            <div
              key={idx}
              className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-800/40 space-y-2 shadow-2xs"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs sm:text-sm font-bold text-indigo-700 dark:text-indigo-400">
                  [{s.category}] {s.label}
                </span>
                <button
                  type="button"
                  onClick={() => copyText(s.exampleVi, idx)}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-bold bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 hover:bg-indigo-50 text-slate-700 dark:text-slate-300 shadow-2xs transition-colors"
                >
                  {copiedIdx === idx ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span className="text-emerald-600">Đã chép</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Sao chép mẫu</span>
                    </>
                  )}
                </button>
              </div>
              <p className="text-xs sm:text-sm text-slate-800 dark:text-slate-200 font-medium leading-relaxed">
                {s.exampleVi}
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400 italic">
                {s.exampleEn}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
