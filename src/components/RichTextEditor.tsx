import React, { useRef, useState } from 'react';
import { Bold, Italic, Underline, List, Link as LinkIcon, Sparkles, Plus, ChevronDown } from 'lucide-react';
import { XYZ_STAR_SUGGESTIONS } from '../data/sampleData';

interface RichTextEditorProps {
  value: string;
  onChange: (val: string) => void;
  placeholder?: string;
  rows?: number;
  showXyzHelper?: boolean;
}

export const RichTextEditor: React.FC<RichTextEditorProps> = ({
  value,
  onChange,
  placeholder,
  rows = 4,
  showXyzHelper = true,
}) => {
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const wrapSelection = (prefix: string, suffix: string, defaultText = 'văn bản') => {
    const el = textareaRef.current;
    if (!el) return;
    const start = el.selectionStart;
    const end = el.selectionEnd;
    const selected = value.substring(start, end) || defaultText;
    const nextValue = value.substring(0, start) + prefix + selected + suffix + value.substring(end);
    onChange(nextValue);
    setTimeout(() => {
      el.focus();
      el.setSelectionRange(start + prefix.length, start + prefix.length + selected.length);
    }, 0);
  };

  const insertBullet = () => {
    const el = textareaRef.current;
    if (!el) return;
    const start = el.selectionStart;
    const prefix = start > 0 && value[start - 1] !== '\n' ? '\n• ' : '• ';
    const nextValue = value.substring(0, start) + prefix + value.substring(start);
    onChange(nextValue);
    setTimeout(() => {
      el.focus();
      el.setSelectionRange(start + prefix.length, start + prefix.length);
    }, 0);
  };

  const insertLink = () => {
    const url = window.prompt('Nhập đường dẫn URL (VD: https://github.com/...):', 'https://');
    if (!url) return;
    wrapSelection('[', `](${url})`, 'Liên kết');
  };

  const appendSuggestion = (text: string) => {
    const next = value.trim() ? `${value.trim()}\n${text}` : text;
    onChange(next);
    setShowSuggestions(false);
  };

  return (
    <div className="border border-slate-300 dark:border-slate-700 rounded-xl overflow-hidden bg-white dark:bg-slate-900 focus-within:ring-2 focus-within:ring-indigo-500 focus-within:border-indigo-500 transition-all shadow-2xs">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-1.5 px-2.5 py-2 bg-slate-50 dark:bg-slate-800/80 border-b border-slate-200 dark:border-slate-700">
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => wrapSelection('**', '**', 'in đậm')}
            title="In đậm (**text**)"
            className="p-1.5 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 transition-colors"
          >
            <Bold className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => wrapSelection('*', '*', 'in nghiêng')}
            title="In nghiêng (*text*)"
            className="p-1.5 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 transition-colors"
          >
            <Italic className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => wrapSelection('<u>', '</u>', 'gạch chân')}
            title="Gạch chân (<u>text</u>)"
            className="p-1.5 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 transition-colors"
          >
            <Underline className="w-4 h-4" />
          </button>
          <div className="w-px h-5 bg-slate-300 dark:bg-slate-600 mx-1" />
          <button
            type="button"
            onClick={insertBullet}
            title="Thêm dấu đầu dòng (•)"
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 transition-colors"
          >
            <List className="w-4 h-4" />
            <span>Thêm Bullet (•)</span>
          </button>
          <button
            type="button"
            onClick={insertLink}
            title="Chèn liên kết [Tên](URL)"
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 transition-colors"
          >
            <LinkIcon className="w-4 h-4" />
            <span>Chèn Link</span>
          </button>
        </div>

        {showXyzHelper && (
          <div className="relative">
            <button
              type="button"
              onClick={() => setShowSuggestions(!showSuggestions)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-indigo-50 dark:bg-indigo-950/70 text-indigo-700 dark:text-indigo-300 hover:bg-indigo-100 dark:hover:bg-indigo-900/60 border border-indigo-200/80 dark:border-indigo-800 transition-colors"
            >
              <Sparkles className="w-4 h-4 text-indigo-600" />
              <span>Gợi ý mẫu câu STAR / XYZ</span>
              <ChevronDown className="w-3.5 h-3.5" />
            </button>
          </div>
        )}
      </div>

      {/* XYZ / STAR Suggestion Drawer */}
      {showSuggestions && (
        <div className="p-3.5 bg-indigo-50/70 dark:bg-indigo-950/40 border-b border-indigo-200 dark:border-indigo-900/50 space-y-2.5 max-h-72 overflow-y-auto">
          <div className="flex items-center justify-between">
            <span className="text-xs sm:text-sm font-bold text-indigo-950 dark:text-indigo-200">
              💡 Mẫu câu chuẩn ATS: Động từ hành động + Nhiệm vụ + Kết quả định lượng (%, $, con số)
            </span>
            <button
              type="button"
              onClick={() => setShowSuggestions(false)}
              className="text-xs font-semibold text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 px-2 py-0.5 rounded bg-white dark:bg-slate-800 border"
            >
              Đóng lại
            </button>
          </div>
          <div className="grid grid-cols-1 gap-2.5">
            {XYZ_STAR_SUGGESTIONS.map((item, idx) => (
              <div
                key={idx}
                className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-indigo-100 dark:border-slate-800 text-xs sm:text-sm space-y-2 shadow-2xs"
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="font-bold text-indigo-600 dark:text-indigo-400">
                    [{item.category}] {item.label}
                  </span>
                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      onClick={() => appendSuggestion(item.exampleVi)}
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-indigo-600 text-white hover:bg-indigo-700 text-xs font-bold"
                    >
                      <Plus className="w-3.5 h-3.5" /> Chèn mẫu Tiếng Việt
                    </button>
                    <button
                      type="button"
                      onClick={() => appendSuggestion(item.exampleEn)}
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-slate-700 text-white hover:bg-slate-800 text-xs font-bold"
                    >
                      <Plus className="w-3.5 h-3.5" /> Chèn EN
                    </button>
                  </div>
                </div>
                <p className="text-slate-700 dark:text-slate-300 leading-relaxed font-normal">{item.exampleVi}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Textarea */}
      <textarea
        ref={textareaRef}
        rows={rows}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder || 'Nhập mô tả (Hỗ trợ **in đậm**, *in nghiêng*, • dấu đầu dòng)...'}
        className="w-full px-3.5 py-3 text-sm sm:text-base bg-transparent text-slate-800 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none resize-y leading-relaxed font-normal"
      />
    </div>
  );
};

// Safe inline parser for **bold**, *italic*, <u>underline</u>, and [label](url)
function parseInlineFormatting(line: string): React.ReactNode[] {
  const tokenRegex = /(\*\*[^*]+\*\*|\*[^*]+\*|<u>.*?<\/u>|\[[^\]]+\]\([^)]+\))/g;
  const parts = line.split(tokenRegex);

  return parts.map((part, idx) => {
    if (part.startsWith('**') && part.endsWith('**') && part.length > 4) {
      return (
        <strong key={idx} className="font-semibold">
          {part.slice(2, -2)}
        </strong>
      );
    }
    if (part.startsWith('*') && part.endsWith('*') && part.length > 2) {
      return <em key={idx}>{part.slice(1, -1)}</em>;
    }
    if (part.startsWith('<u>') && part.endsWith('</u>')) {
      return <u key={idx}>{part.slice(3, -4)}</u>;
    }
    const linkMatch = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
    if (linkMatch) {
      const [, label, href] = linkMatch;
      const safeHref = href.startsWith('http') || href.startsWith('mailto:') ? href : `https://${href}`;
      return (
        <a
          key={idx}
          href={safeHref}
          target="_blank"
          rel="noreferrer"
          className="underline decoration-current/60 hover:opacity-80"
        >
          {label}
        </a>
      );
    }
    return <React.Fragment key={idx}>{part}</React.Fragment>;
  });
}

export const FormattedText: React.FC<{ text: string; className?: string }> = ({ text, className = '' }) => {
  if (!text || !text.trim()) return null;

  const lines = text.split('\n').filter((l) => l.trim().length > 0);

  return (
    <div className={`space-y-1 ${className}`}>
      {lines.map((rawLine, idx) => {
        const trimmed = rawLine.trim();
        const isBullet =
          trimmed.startsWith('•') || trimmed.startsWith('- ') || trimmed.startsWith('* ');
        const cleanContent = isBullet ? trimmed.replace(/^([•\-*])\s*/, '') : trimmed;

        if (isBullet) {
          return (
            <div key={idx} className="flex items-start gap-1.5 pl-0.5">
              <span className="select-none shrink-0 leading-[inherit]">•</span>
              <div className="flex-1">{parseInlineFormatting(cleanContent)}</div>
            </div>
          );
        }

        return <p key={idx}>{parseInlineFormatting(cleanContent)}</p>;
      })}
    </div>
  );
};
