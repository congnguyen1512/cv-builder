import React, { useState } from 'react';
import {
  FileText,
  Plus,
  Copy,
  Trash2,
  Edit3,
  Check,
  GripVertical,
  Eye,
  EyeOff,
  User,
  Briefcase,
  GraduationCap,
  FolderGit2,
  Wrench,
  Award,
  HeartHandshake,
  Users,
  Layers,
  Sparkles,
  Palette,
  ShieldCheck,
  ArrowUp,
  ArrowDown,
} from 'lucide-react';
import { CVDocument, SectionConfig, SectionId } from '../types/cv';
import { SECTION_LABELS } from '../data/sampleData';

interface LeftSidebarProps {
  cvList: CVDocument[];
  activeCvId: string;
  onSelectCv: (id: string) => void;
  onCreateCv: () => void;
  onDuplicateCv: (id: string) => void;
  onRenameCv: (id: string, newTitle: string) => void;
  onDeleteCv: (id: string) => void;
  onLoadSample: (lang: 'vi' | 'en') => void;
  sectionsOrder: SectionConfig[];
  onReorderSections: (newOrder: SectionConfig[]) => void;
  onToggleSectionVisibility: (id: SectionId) => void;
  activeSection: string;
  onSelectSection: (section: string) => void;
  activeCenterTab: 'editor' | 'design' | 'ats';
  onChangeCenterTab: (tab: 'editor' | 'design' | 'ats') => void;
  atsScore: number;
}

const SECTION_ICONS: Record<SectionId, React.ElementType> = {
  summary: FileText,
  experience: Briefcase,
  education: GraduationCap,
  projects: FolderGit2,
  skills: Wrench,
  certifications: Award,
  activities: HeartHandshake,
  references: Users,
  custom: Layers,
};

export const LeftSidebar: React.FC<LeftSidebarProps> = ({
  cvList,
  activeCvId,
  onSelectCv,
  onCreateCv,
  onDuplicateCv,
  onRenameCv,
  onDeleteCv,
  onLoadSample,
  sectionsOrder,
  onReorderSections,
  onToggleSectionVisibility,
  activeSection,
  onSelectSection,
  activeCenterTab,
  onChangeCenterTab,
  atsScore,
}) => {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [renameValue, setRenameValue] = useState('');
  const [draggedIdx, setDraggedIdx] = useState<number | null>(null);
  const [dragOverIdx, setDragOverIdx] = useState<number | null>(null);

  const activeCv = cvList.find((c) => c.id === activeCvId) || cvList[0];
  const lang = activeCv?.design.language || 'vi';

  const startRename = (cv: CVDocument) => {
    setEditingId(cv.id);
    setRenameValue(cv.title);
  };

  const commitRename = (id: string) => {
    if (renameValue.trim()) {
      onRenameCv(id, renameValue.trim());
    }
    setEditingId(null);
  };

  const handleDragStart = (idx: number) => {
    setDraggedIdx(idx);
  };

  const handleDragOver = (e: React.DragEvent, idx: number) => {
    e.preventDefault();
    setDragOverIdx(idx);
  };

  const handleDrop = (idx: number) => {
    if (draggedIdx === null || draggedIdx === idx) {
      setDraggedIdx(null);
      setDragOverIdx(null);
      return;
    }
    const updated = [...sectionsOrder];
    const [moved] = updated.splice(draggedIdx, 1);
    updated.splice(idx, 0, moved);
    onReorderSections(updated);
    setDraggedIdx(null);
    setDragOverIdx(null);
  };

  const moveSection = (idx: number, direction: -1 | 1) => {
    const targetIdx = idx + direction;
    if (targetIdx < 0 || targetIdx >= sectionsOrder.length) return;
    const updated = [...sectionsOrder];
    const [moved] = updated.splice(idx, 1);
    updated.splice(targetIdx, 0, moved);
    onReorderSections(updated);
  };

  return (
    <aside className="w-full bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 flex flex-col h-full select-none overflow-hidden">
      {/* Mode Switcher Tabs (Soạn thảo / Thiết kế / Chấm điểm ATS) */}
      <div className="p-3 border-b border-slate-200 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-900/80">
        <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2 px-1 flex items-center justify-between">
          <span>Khu vực chức năng</span>
          <span className="text-[10px] font-semibold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950 px-1.5 py-0.5 rounded">3 Chế độ</span>
        </div>
        <div className="grid grid-cols-3 gap-1.5 p-1 bg-slate-200/80 dark:bg-slate-800 rounded-xl">
          <button
            type="button"
            onClick={() => onChangeCenterTab('editor')}
            className={`flex flex-col items-center justify-center py-2 px-1 rounded-lg text-xs font-bold transition-all ${
              activeCenterTab === 'editor'
                ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-sm'
                : 'text-slate-700 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white'
            }`}
          >
            <FileText className="w-4 h-4 mb-1" />
            <span>Nội dung</span>
          </button>
          <button
            type="button"
            onClick={() => onChangeCenterTab('design')}
            className={`flex flex-col items-center justify-center py-2 px-1 rounded-lg text-xs font-bold transition-all ${
              activeCenterTab === 'design'
                ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-sm'
                : 'text-slate-700 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white'
            }`}
          >
            <Palette className="w-4 h-4 mb-1" />
            <span>Mẫu & Font</span>
          </button>
          <button
            type="button"
            onClick={() => onChangeCenterTab('ats')}
            className={`relative flex flex-col items-center justify-center py-2 px-1 rounded-lg text-xs font-bold transition-all ${
              activeCenterTab === 'ats'
                ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-sm'
                : 'text-slate-700 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white'
            }`}
          >
            <ShieldCheck className="w-4 h-4 mb-1" />
            <span>ATS ({atsScore})</span>
          </button>
        </div>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto divide-y divide-slate-200 dark:divide-slate-800">
        {/* 1. Multi-CV Management */}
        <div className="p-4 space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-extrabold uppercase tracking-wider text-slate-800 dark:text-slate-200">
                  Hồ sơ xin việc ({cvList.length})
                </span>
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                Quản lý các phiên bản CV khác nhau
              </p>
            </div>
            <button
              type="button"
              onClick={onCreateCv}
              title="Tạo thêm 1 bản CV mới toanh"
              className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-bold bg-indigo-600 text-white hover:bg-indigo-700 transition-colors shadow-xs"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Tạo mới</span>
            </button>
          </div>

          <div className="space-y-2 max-h-48 overflow-y-auto pr-0.5">
            {cvList.map((cv) => {
              const isSelected = cv.id === activeCvId;
              const isEditing = editingId === cv.id;

              return (
                <div
                  key={cv.id}
                  onClick={() => !isEditing && onSelectCv(cv.id)}
                  className={`group flex items-center justify-between gap-2 px-3 py-2.5 rounded-xl border text-sm cursor-pointer transition-all ${
                    isSelected
                      ? 'bg-indigo-50/90 dark:bg-indigo-950/70 border-indigo-500 dark:border-indigo-600 text-indigo-950 dark:text-indigo-100 font-semibold ring-1 ring-indigo-500/20 shadow-xs'
                      : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/60'
                  }`}
                >
                  {isEditing ? (
                    <div className="flex items-center gap-1.5 w-full" onClick={(e) => e.stopPropagation()}>
                      <input
                        type="text"
                        value={renameValue}
                        onChange={(e) => setRenameValue(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && commitRename(cv.id)}
                        autoFocus
                        className="flex-1 min-w-0 px-2 py-1 rounded bg-white dark:bg-slate-800 border border-indigo-500 text-sm focus:outline-none"
                      />
                      <button
                        type="button"
                        onClick={() => commitRename(cv.id)}
                        className="p-1.5 text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-950/50 rounded"
                      >
                        <Check className="w-4 h-4" />
                      </button>
                    </div>
                  ) : (
                    <>
                      <div className="flex items-center gap-2.5 min-w-0 flex-1">
                        <FileText
                          className={`w-4 h-4 shrink-0 ${
                            isSelected ? 'text-indigo-600 dark:text-indigo-400' : 'text-slate-400'
                          }`}
                        />
                        <div className="min-w-0 flex-1">
                          <span className="truncate block font-medium" title={cv.title}>
                            {cv.title}
                          </span>
                          {isSelected && (
                            <span className="text-[10px] text-indigo-600 dark:text-indigo-400 font-bold block">
                              ● Đang mở soạn thảo
                            </span>
                          )}
                        </div>
                      </div>

                      <div
                        className="flex items-center gap-1 opacity-80 group-hover:opacity-100 shrink-0"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <button
                          type="button"
                          onClick={() => startRename(cv)}
                          title="Đổi tên CV này"
                          className="p-1.5 rounded-md hover:bg-slate-200/80 dark:hover:bg-slate-700 text-slate-500 hover:text-slate-900 dark:hover:text-slate-100"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => onDuplicateCv(cv.id)}
                          title="Nhân bản CV này để ứng tuyển vị trí khác"
                          className="p-1.5 rounded-md hover:bg-slate-200/80 dark:hover:bg-slate-700 text-slate-500 hover:text-indigo-600"
                        >
                          <Copy className="w-3.5 h-3.5" />
                        </button>
                        {cvList.length > 1 && (
                          <button
                            type="button"
                            onClick={() => onDeleteCv(cv.id)}
                            title="Xóa bản CV này"
                            className="p-1.5 rounded-md hover:bg-rose-100 dark:hover:bg-rose-950/60 text-slate-400 hover:text-rose-600"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>
                    </>
                  )}
                </div>
              );
            })}
          </div>

          {/* Quick Load Sample CV */}
          <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
            <span className="text-[11px] font-semibold text-slate-500 block mb-1.5">
              Nạp dữ liệu mẫu nhanh:
            </span>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => onLoadSample('vi')}
                className="inline-flex items-center justify-center gap-1.5 px-2.5 py-2 rounded-xl text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-indigo-50 dark:hover:bg-indigo-950/50 hover:text-indigo-600 border border-slate-200/60 dark:border-slate-700 transition-colors"
              >
                <Sparkles className="w-3.5 h-3.5 text-indigo-500" />
                <span>Mẫu Tiếng Việt</span>
              </button>
              <button
                type="button"
                onClick={() => onLoadSample('en')}
                className="inline-flex items-center justify-center gap-1.5 px-2.5 py-2 rounded-xl text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-indigo-50 dark:hover:bg-indigo-950/50 hover:text-indigo-600 border border-slate-200/60 dark:border-slate-700 transition-colors"
              >
                <Sparkles className="w-3.5 h-3.5 text-indigo-500" />
                <span>Mẫu English</span>
              </button>
            </div>
          </div>
        </div>

        {/* 2. Sections Navigation & Drag-and-Drop Reorder */}
        <div className="p-4 space-y-3">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-extrabold uppercase tracking-wider text-slate-800 dark:text-slate-200">
                Cấu trúc các mục CV
              </span>
              <span className="text-[10px] font-semibold text-slate-500 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-full">
                Kéo-Thả A4
              </span>
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
              Kéo ⠿ để đổi vị trí • Nhấn 👁 để ẩn/hiện mục
            </p>
          </div>

          {/* Fixed Top Section: Personal Info */}
          <div
            onClick={() => {
              onChangeCenterTab('editor');
              onSelectSection('personal');
            }}
            className={`flex items-center justify-between px-3 py-2.5 rounded-xl border text-sm cursor-pointer transition-all ${
              activeSection === 'personal' && activeCenterTab === 'editor'
                ? 'bg-indigo-50 dark:bg-indigo-950/70 border-indigo-500 dark:border-indigo-600 text-indigo-800 dark:text-indigo-200 font-bold shadow-xs'
                : 'bg-slate-50/80 dark:bg-slate-800/40 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100/70'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <div className="p-1 rounded-md bg-indigo-100 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400">
                <User className="w-4 h-4" />
              </div>
              <span className="font-semibold">Thông tin cá nhân (Header)</span>
            </div>
            <span className="text-[11px] px-2 py-0.5 rounded-full bg-indigo-100 dark:bg-indigo-900/60 text-indigo-700 dark:text-indigo-300 font-bold">
              Bắt buộc
            </span>
          </div>

          {/* Reorderable Sections */}
          <div className="space-y-1.5">
            {sectionsOrder.map((sec, idx) => {
              const Icon = SECTION_ICONS[sec.id] || FileText;
              const label =
                (lang === 'vi' ? sec.customLabelVi : sec.customLabelEn) ||
                SECTION_LABELS[lang][sec.id];
              const isSelected = activeSection === sec.id && activeCenterTab === 'editor';
              const isDragOver = dragOverIdx === idx;

              return (
                <div
                  key={sec.id}
                  draggable
                  onDragStart={() => handleDragStart(idx)}
                  onDragOver={(e) => handleDragOver(e, idx)}
                  onDrop={() => handleDrop(idx)}
                  onDragEnd={() => {
                    setDraggedIdx(null);
                    setDragOverIdx(null);
                  }}
                  onClick={() => {
                    onChangeCenterTab('editor');
                    onSelectSection(sec.id);
                  }}
                  className={`group flex items-center justify-between gap-1.5 px-2.5 py-2.5 rounded-xl border text-sm cursor-pointer transition-all ${
                    isDragOver
                      ? 'border-indigo-500 bg-indigo-50/80 dark:bg-indigo-950/50 scale-[1.01]'
                      : isSelected
                      ? 'bg-indigo-50 dark:bg-indigo-950/70 border-indigo-500 dark:border-indigo-600 text-indigo-800 dark:text-indigo-200 font-bold shadow-xs'
                      : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/60'
                  } ${!sec.visible ? 'opacity-50 bg-slate-100/60' : ''}`}
                >
                  <div className="flex items-center gap-2 min-w-0 flex-1">
                    <GripVertical className="w-4 h-4 text-slate-400 cursor-grab active:cursor-grabbing shrink-0" />
                    <Icon className="w-4 h-4 text-slate-500 dark:text-slate-400 shrink-0" />
                    <span className="truncate font-medium">{label}</span>
                  </div>

                  <div
                    className="flex items-center gap-1 shrink-0"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <button
                      type="button"
                      onClick={() => moveSection(idx, -1)}
                      disabled={idx === 0}
                      title="Chuyển mục này lên trên"
                      className="p-1 rounded opacity-0 group-hover:opacity-100 disabled:opacity-20 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600"
                    >
                      <ArrowUp className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => moveSection(idx, 1)}
                      disabled={idx === sectionsOrder.length - 1}
                      title="Chuyển mục này xuống dưới"
                      className="p-1 rounded opacity-0 group-hover:opacity-100 disabled:opacity-20 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600"
                    >
                      <ArrowDown className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => onToggleSectionVisibility(sec.id)}
                      title={sec.visible ? 'Đang hiển thị trên CV (Nhấn để ẩn)' : 'Đang ẩn khỏi CV (Nhấn để hiện lại)'}
                      className={`p-1.5 rounded-lg transition-colors ${
                        sec.visible
                          ? 'text-indigo-600 dark:text-indigo-400 hover:bg-indigo-100 dark:hover:bg-indigo-900/50'
                          : 'text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
                      }`}
                    >
                      {sec.visible ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </aside>
  );
};
