import React, { useEffect, useRef, useState } from 'react';
import {
  FileText,
  Undo2,
  Redo2,
  Download,
  Upload,
  Printer,
  Moon,
  Sun,
  CheckCircle2,
  ShieldCheck,
  Palette,
  Eye,
  Edit3,
  FolderOpen,
} from 'lucide-react';
import { CVDocument, SectionConfig, SectionId } from './types/cv';
import { SAMPLE_CV_VI, SAMPLE_CV_EN } from './data/sampleData';
import { evaluateCVScore } from './utils/atsAnalyzer';
import { LeftSidebar } from './components/LeftSidebar';
import { FormEditor } from './components/FormEditor';
import { DesignCustomizer } from './components/DesignCustomizer';
import { AtsPanel } from './components/AtsPanel';
import { TemplateRenderer } from './components/TemplateRenderer';

const STORAGE_KEY = 'cv_builder_pro_documents_v2';
const ACTIVE_ID_KEY = 'cv_builder_pro_active_id_v2';
const THEME_KEY = 'cv_builder_pro_theme_v1';

export const App: React.FC = () => {
  // 1. Load initial CVs from localStorage or fallback to SAMPLE_CV_VI & SAMPLE_CV_EN
  const [cvList, setCvList] = useState<CVDocument[]>(() => {
    try {
      let raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) {
        raw = localStorage.getItem('cv_builder_pro_documents_v1');
      }
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed) && parsed.length > 0) {
          // Check if this contains old mock profile data
          const isOldMock = parsed.some(
            (item: CVDocument) =>
              item.personalInfo?.fullName === 'NGUYỄN MINH KHÔI' ||
              item.personalInfo?.fullName === 'Trần Đình Khoa' ||
              item.id === 'cv-senior-fullstack-vi'
          );
          if (!isOldMock) {
            return parsed.map((item: CVDocument) => {
              const updatedEducation = Array.isArray(item.education)
                ? item.education.map((edu) => {
                    if (
                      edu.gpa === 'Khóa 2022 – 2027' ||
                      edu.gpa === 'Cohort 2022 – 2027' ||
                      !edu.gpa
                    ) {
                      return { ...edu, gpa: '3.2 / 4.0' };
                    }
                    return edu;
                  })
                : item.education;

              const updatedDesign =
                item.design &&
                item.design.template === 'ats-standard' &&
                item.design.fontSize === 9.5 &&
                item.design.sectionGap === 14 &&
                item.design.pageMargin === 14
                  ? {
                      ...item.design,
                      fontSize: 9.0,
                      lineHeight: 1.30,
                      sectionGap: 10,
                      pageMargin: 12,
                    }
                  : item.design;

              return {
                ...item,
                education: updatedEducation,
                design: updatedDesign,
              };
            });
          }
        }
      }
    } catch (e) {
      console.error('Failed to load CVs from localStorage', e);
    }
    return [SAMPLE_CV_VI, SAMPLE_CV_EN];
  });

  const [activeCvId, setActiveCvId] = useState<string>(() => {
    const saved = localStorage.getItem(ACTIVE_ID_KEY) || localStorage.getItem('cv_builder_pro_active_id_v1');
    if (saved && saved !== 'cv-senior-fullstack-vi') {
      return saved;
    }
    return SAMPLE_CV_VI.id;
  });

  const [darkMode, setDarkMode] = useState<boolean>(() => {
    return localStorage.getItem(THEME_KEY) === 'dark';
  });

  // Undo / Redo History Stacks (per session for active CV)
  const [past, setPast] = useState<CVDocument[]>([]);
  const [future, setFuture] = useState<CVDocument[]>([]);

  // Navigation states
  const [activeSection, setActiveSection] = useState<string>('personal');
  const [activeCenterTab, setActiveCenterTab] = useState<'editor' | 'design' | 'ats'>('editor');
  const [mobileView, setMobileView] = useState<'sidebar' | 'center' | 'preview'>('center');
  const [lastSavedTime, setLastSavedTime] = useState<string>(
    new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit', second: '2-digit' })
  );

  const jsonInputRef = useRef<HTMLInputElement | null>(null);

  const activeCv = cvList.find((c) => c.id === activeCvId) || cvList[0];

  // Apply Dark Mode class to <html>
  useEffect(() => {
    const root = document.documentElement;
    if (darkMode) {
      root.classList.add('dark');
      localStorage.setItem(THEME_KEY, 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem(THEME_KEY, 'light');
    }
  }, [darkMode]);

  // Auto-save to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(cvList));
      localStorage.setItem(ACTIVE_ID_KEY, activeCv.id);
      setLastSavedTime(
        new Date().toLocaleTimeString('vi-VN', {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
        })
      );
    } catch (e) {
      console.error('Auto-save error:', e);
    }
  }, [cvList, activeCv.id]);

  // Update active CV with Undo/Redo support
  const updateActiveCv = (updated: CVDocument, recordHistory = true) => {
    if (recordHistory) {
      setPast((prev) => [...prev.slice(-29), activeCv]);
      setFuture([]);
    }
    const stamped = { ...updated, updatedAt: new Date().toISOString() };
    setCvList((prev) => prev.map((item) => (item.id === activeCv.id ? stamped : item)));
  };

  const handleUndo = () => {
    if (past.length === 0) return;
    const previous = past[past.length - 1];
    setPast((prev) => prev.slice(0, -1));
    setFuture((prev) => [activeCv, ...prev]);
    updateActiveCv(previous, false);
  };

  const handleRedo = () => {
    if (future.length === 0) return;
    const next = future[0];
    setFuture((prev) => prev.slice(1));
    setPast((prev) => [...prev, activeCv]);
    updateActiveCv(next, false);
  };

  // Keyboard shortcuts for Undo (Ctrl+Z) & Redo (Ctrl+Y)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'z' && !e.shiftKey) {
        // Only trigger global undo if not typing inside an input/textarea
        const tag = (e.target as HTMLElement)?.tagName;
        if (tag !== 'INPUT' && tag !== 'TEXTAREA') {
          e.preventDefault();
          handleUndo();
        }
      } else if (
        (e.ctrlKey || e.metaKey) &&
        (e.key.toLowerCase() === 'y' || (e.shiftKey && e.key.toLowerCase() === 'z'))
      ) {
        const tag = (e.target as HTMLElement)?.tagName;
        if (tag !== 'INPUT' && tag !== 'TEXTAREA') {
          e.preventDefault();
          handleRedo();
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  });

  // Multi-CV Operations
  const handleCreateCv = () => {
    const newId = `cv-${Date.now()}`;
    const freshCv: CVDocument = {
      ...SAMPLE_CV_VI,
      id: newId,
      title: `CV Ứng tuyển mới (${cvList.length + 1})`,
      updatedAt: new Date().toISOString(),
    };
    setCvList((prev) => [freshCv, ...prev]);
    setActiveCvId(newId);
    setPast([]);
    setFuture([]);
  };

  const handleDuplicateCv = (id: string) => {
    const source = cvList.find((c) => c.id === id);
    if (!source) return;
    const newId = `cv-${Date.now()}`;
    const cloned: CVDocument = {
      ...JSON.parse(JSON.stringify(source)),
      id: newId,
      title: `${source.title} (Bản sao)`,
      updatedAt: new Date().toISOString(),
    };
    setCvList((prev) => [cloned, ...prev]);
    setActiveCvId(newId);
  };

  const handleRenameCv = (id: string, newTitle: string) => {
    setCvList((prev) =>
      prev.map((c) => (c.id === id ? { ...c, title: newTitle, updatedAt: new Date().toISOString() } : c))
    );
  };

  const handleDeleteCv = (id: string) => {
    if (cvList.length <= 1) return;
    const nextList = cvList.filter((c) => c.id !== id);
    setCvList(nextList);
    if (activeCvId === id) {
      setActiveCvId(nextList[0].id);
    }
  };

  const handleLoadSample = (lang: 'vi' | 'en') => {
    const templateSample = lang === 'vi' ? SAMPLE_CV_VI : SAMPLE_CV_EN;
    const loaded: CVDocument = {
      ...JSON.parse(JSON.stringify(templateSample)),
      id: activeCv.id,
      title: templateSample.title,
    };
    updateActiveCv(loaded);
  };

  // Reorder & Toggle Sections
  const handleReorderSections = (newOrder: SectionConfig[]) => {
    updateActiveCv({ ...activeCv, sectionsOrder: newOrder });
  };

  const handleToggleSectionVisibility = (secId: SectionId) => {
    const updatedOrder = activeCv.sectionsOrder.map((s) =>
      s.id === secId ? { ...s, visible: !s.visible } : s
    );
    updateActiveCv({ ...activeCv, sectionsOrder: updatedOrder });
  };

  // JSON Export & Import
  const handleExportJson = () => {
    const dataStr = JSON.stringify(activeCv, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    const safeName = activeCv.personalInfo.fullName
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '');
    a.href = url;
    a.download = `cv-${safeName || 'backup'}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImportJson = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const parsed = JSON.parse(reader.result as string) as CVDocument;
        if (parsed && parsed.personalInfo && parsed.design) {
          const importedCv: CVDocument = {
            ...parsed,
            id: `cv-import-${Date.now()}`,
            title: parsed.title || `CV Nhập từ JSON`,
          };
          setCvList((prev) => [importedCv, ...prev]);
          setActiveCvId(importedCv.id);
        } else {
          alert('File JSON không đúng định dạng CV Builder Pro.');
        }
      } catch {
        alert('Không thể đọc file JSON. Vui lòng kiểm tra lại.');
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  // Print Vector PDF
  const handlePrintPdf = () => {
    window.print();
  };

  // Auto-fit 1 page helper
  const handleAutoFitOnePage = () => {
    updateActiveCv({
      ...activeCv,
      design: {
        ...activeCv.design,
        fontSize: 9.0,
        lineHeight: 1.28,
        sectionGap: 10,
        pageMargin: 11,
      },
    });
  };

  const atsScore = evaluateCVScore(activeCv).totalScore;

  return (
    <div id="app-workspace" className="h-screen w-screen flex flex-col overflow-hidden bg-slate-50 dark:bg-slate-950">
      {/* ====================================================================
          TOP NAVIGATION HEADER (Hidden when printing PDF)
         ==================================================================== */}
      <header className="no-print h-16 px-4 sm:px-6 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between gap-3 shrink-0 z-30">
        {/* Brand & Active CV Title */}
        <div className="flex items-center gap-3.5 min-w-0">
          <div className="w-9 h-9 rounded-xl bg-indigo-600 flex items-center justify-center text-white shadow-sm shrink-0">
            <FileText className="w-5 h-5" />
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-2.5">
              <h1 className="text-base font-extrabold tracking-tight text-slate-900 dark:text-white truncate">
                CV Builder Pro
              </h1>
              <span className="hidden md:inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-50 dark:bg-emerald-950/70 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Đã lưu tự động lúc {lastSavedTime}</span>
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium truncate">
              Đang chỉnh sửa: <span className="font-semibold text-slate-700 dark:text-slate-200">{activeCv.title}</span>
            </p>
          </div>
        </div>

        {/* Center / Right Action Toolbar */}
        <div className="flex items-center gap-2 sm:gap-2.5">
          {/* Undo / Redo */}
          <div className="flex items-center bg-slate-100 dark:bg-slate-800 rounded-lg p-1 border border-slate-200/80 dark:border-slate-700">
            <button
              type="button"
              onClick={handleUndo}
              disabled={past.length === 0}
              title="Hoàn tác chỉnh sửa (Ctrl+Z)"
              className="p-1.5 rounded-md text-slate-700 dark:text-slate-300 hover:bg-white dark:hover:bg-slate-700 disabled:opacity-30 transition-all"
            >
              <Undo2 className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={handleRedo}
              disabled={future.length === 0}
              title="Làm lại chỉnh sửa (Ctrl+Y)"
              className="p-1.5 rounded-md text-slate-700 dark:text-slate-300 hover:bg-white dark:hover:bg-slate-700 disabled:opacity-30 transition-all"
            >
              <Redo2 className="w-4 h-4" />
            </button>
          </div>

          {/* ATS Score Quick Pill */}
          <button
            type="button"
            onClick={() => {
              setActiveCenterTab('ats');
              setMobileView('center');
            }}
            title="Nhấn để xem phân tích chi tiết ATS & gợi ý cải thiện"
            className={`hidden sm:inline-flex items-center gap-2 px-3 py-2 rounded-xl text-xs sm:text-sm font-bold border transition-all ${
              atsScore >= 85
                ? 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border-emerald-300 dark:border-emerald-800 hover:bg-emerald-100'
                : 'bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border-indigo-300 dark:border-indigo-800 hover:bg-indigo-100'
            }`}
          >
            <ShieldCheck className="w-4 h-4" />
            <span>Điểm ATS: {atsScore}/100</span>
          </button>

          {/* JSON Export / Import */}
          <input
            ref={jsonInputRef}
            type="file"
            accept=".json,application/json"
            onChange={handleImportJson}
            className="hidden"
          />
          <button
            type="button"
            onClick={handleExportJson}
            title="Sao lưu toàn bộ hồ sơ CV ra file .JSON trên máy của bạn"
            className="hidden md:inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs sm:text-sm font-semibold bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 transition-colors"
          >
            <Download className="w-4 h-4 text-slate-500" />
            <span>Sao lưu JSON</span>
          </button>
          <button
            type="button"
            onClick={() => jsonInputRef.current?.click()}
            title="Khôi phục hồ sơ CV từ file .JSON trước đó"
            className="hidden md:inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs sm:text-sm font-semibold bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 transition-colors"
          >
            <Upload className="w-4 h-4 text-slate-500" />
            <span>Mở JSON</span>
          </button>

          {/* Dark Mode Toggle */}
          <button
            type="button"
            onClick={() => setDarkMode(!darkMode)}
            title={darkMode ? 'Chuyển sang Giao diện Sáng' : 'Chuyển sang Giao diện Tối'}
            className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
          >
            {darkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-600" />}
          </button>

          {/* Vector PDF Print Button */}
          <button
            type="button"
            onClick={handlePrintPdf}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold bg-indigo-600 text-white hover:bg-indigo-700 shadow-sm transition-all"
          >
            <Printer className="w-4 h-4" />
            <span>Xuất PDF Chuẩn A4</span>
          </button>
        </div>
      </header>

      {/* ====================================================================
          MOBILE / TABLET RESPONSIVE TAB BAR (< lg screens)
         ==================================================================== */}
      <div className="no-print lg:hidden grid grid-cols-3 gap-1 p-1.5 bg-slate-100 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 shrink-0">
        <button
          type="button"
          onClick={() => setMobileView('sidebar')}
          className={`flex items-center justify-center gap-1.5 py-1.5 rounded-lg text-xs font-bold ${
            mobileView === 'sidebar'
              ? 'bg-white dark:bg-slate-800 text-indigo-600 shadow-2xs'
              : 'text-slate-600 dark:text-slate-400'
          }`}
        >
          <FolderOpen className="w-3.5 h-3.5" />
          <span>Mục & Hồ sơ</span>
        </button>
        <button
          type="button"
          onClick={() => setMobileView('center')}
          className={`flex items-center justify-center gap-1.5 py-1.5 rounded-lg text-xs font-bold ${
            mobileView === 'center'
              ? 'bg-white dark:bg-slate-800 text-indigo-600 shadow-2xs'
              : 'text-slate-600 dark:text-slate-400'
          }`}
        >
          <Edit3 className="w-3.5 h-3.5" />
          <span>Chỉnh sửa</span>
        </button>
        <button
          type="button"
          onClick={() => setMobileView('preview')}
          className={`flex items-center justify-center gap-1.5 py-1.5 rounded-lg text-xs font-bold ${
            mobileView === 'preview'
              ? 'bg-white dark:bg-slate-800 text-indigo-600 shadow-2xs'
              : 'text-slate-600 dark:text-slate-400'
          }`}
        >
          <Eye className="w-3.5 h-3.5" />
          <span>Xem trước A4</span>
        </button>
      </div>

      {/* ====================================================================
          3-PANE SPLIT-SCREEN WORKSPACE
         ==================================================================== */}
      <div className="flex-1 flex overflow-hidden">
        {/* PANE 1: LEFT SIDEBAR (Navigation, Multi-CV & Drag-Drop Sections) */}
        <div
          className={`no-print h-full ${
            mobileView === 'sidebar' ? 'block w-full' : 'hidden'
          } lg:block lg:w-80 shrink-0`}
        >
          <LeftSidebar
            cvList={cvList}
            activeCvId={activeCv.id}
            onSelectCv={(id) => {
              setActiveCvId(id);
              setPast([]);
              setFuture([]);
            }}
            onCreateCv={handleCreateCv}
            onDuplicateCv={handleDuplicateCv}
            onRenameCv={handleRenameCv}
            onDeleteCv={handleDeleteCv}
            onLoadSample={handleLoadSample}
            sectionsOrder={activeCv.sectionsOrder}
            onReorderSections={handleReorderSections}
            onToggleSectionVisibility={handleToggleSectionVisibility}
            activeSection={activeSection}
            onSelectSection={(sec) => {
              setActiveSection(sec);
              setMobileView('center');
            }}
            activeCenterTab={activeCenterTab}
            onChangeCenterTab={(tab) => {
              setActiveCenterTab(tab);
              setMobileView('center');
            }}
            atsScore={atsScore}
          />
        </div>

        {/* PANE 2: CENTER PANEL (Smart Form Editor / Design Engine / ATS & JD Matcher) */}
        <div
          className={`no-print h-full overflow-y-auto bg-slate-50/70 dark:bg-slate-950 border-r border-slate-200 dark:border-slate-800 ${
            mobileView === 'center' ? 'block w-full' : 'hidden'
          } lg:block lg:w-[46%] xl:w-[44%] shrink-0`}
        >
          {/* Sub-header inside Center Panel for quick switching on mobile/desktop */}
          <div className="sticky top-0 z-20 px-4 py-2.5 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 flex items-center justify-between gap-2 shadow-xs">
            <div className="flex items-center gap-1.5 w-full sm:w-auto">
              <button
                type="button"
                onClick={() => setActiveCenterTab('editor')}
                className={`flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                  activeCenterTab === 'editor'
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                <Edit3 className="w-4 h-4" />
                <span>1. Nhập nội dung CV</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveCenterTab('design')}
                className={`flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                  activeCenterTab === 'design'
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                <Palette className="w-4 h-4" />
                <span>2. Chọn Mẫu & Font</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveCenterTab('ats')}
                className={`flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                  activeCenterTab === 'ats'
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                <ShieldCheck className="w-4 h-4" />
                <span>3. Điểm ATS & JD</span>
              </button>
            </div>
          </div>

          {activeCenterTab === 'editor' && (
            <FormEditor
              cv={activeCv}
              onChange={updateActiveCv}
              activeSection={activeSection}
              onSelectSection={setActiveSection}
            />
          )}

          {activeCenterTab === 'design' && (
            <DesignCustomizer cv={activeCv} onChange={updateActiveCv} />
          )}

          {activeCenterTab === 'ats' && (
            <AtsPanel
              cv={activeCv}
              onChange={updateActiveCv}
              onJumpToSection={(sec) => {
                setActiveCenterTab('editor');
                setActiveSection(sec);
              }}
            />
          )}
        </div>

        {/* PANE 3: RIGHT PANEL (LIVE A4 PREVIEW & VECTOR PRINT TARGET) */}
        <div
          id="preview-pane"
          className={`h-full flex-1 min-w-0 ${
            mobileView === 'preview' ? 'block w-full' : 'hidden'
          } lg:block`}
        >
          <TemplateRenderer
            cv={activeCv}
            onChange={updateActiveCv}
            onAutoFitOnePage={handleAutoFitOnePage}
            onPrintPdf={handlePrintPdf}
          />
        </div>
      </div>
    </div>
  );
};

export default App;
