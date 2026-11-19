import React, { useEffect, useRef, useState } from 'react';
import {
  ZoomIn,
  ZoomOut,
  Maximize2,
  Printer,
  Mail,
  Phone,
  MapPin,
  Linkedin,
  Github,
  Globe,
  ExternalLink,
  Calendar,
  UserCheck,
  AlertCircle,
  AlertTriangle,
  CheckCircle2,
  Sparkles,
  FileCheck2,
} from 'lucide-react';
import { CVDocument, SectionId } from '../types/cv';
import { SECTION_LABELS, UI_LABELS, DEFAULT_AVATAR_URL } from '../data/sampleData';
import { formatCVDate } from '../utils/atsAnalyzer';
import { FormattedText } from './RichTextEditor';

interface TemplateRendererProps {
  cv: CVDocument;
  onChange?: (updated: CVDocument) => void;
  onAutoFitOnePage?: () => void;
  onPrintPdf: () => void;
}

const A4_HEIGHT_PX = 1122.5; // 297mm at 96dpi

function normalizeUrl(url: string): string {
  if (!url) return '';
  const trimmed = url.trim();
  if (trimmed.startsWith('http://') || trimmed.startsWith('https://') || trimmed.startsWith('mailto:')) {
    return trimmed;
  }
  return `https://${trimmed}`;
}

function cleanDisplayUrl(url: string): string {
  return url.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '');
}

export const TemplateRenderer: React.FC<TemplateRendererProps> = ({
  cv,
  onChange,
  onAutoFitOnePage,
  onPrintPdf,
}) => {
  const [zoom, setZoom] = useState<number>(0.85);
  const [contentHeight, setContentHeight] = useState<number>(A4_HEIGHT_PX);
  const [selectedPageView, setSelectedPageView] = useState<'all' | number>('all');
  const [showOverflowModal, setShowOverflowModal] = useState<boolean>(false);
  const paperRef = useRef<HTMLDivElement | null>(null);

  const { personalInfo, design, sectionsOrder } = cv;
  const lang = design.language || 'vi';
  const ui = UI_LABELS[lang];

  // Observe real-time height of A4 paper to compute exact page count & page break lines
  useEffect(() => {
    const el = paperRef.current;
    if (!el) return;
    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        setContentHeight(entry.target.scrollHeight);
      }
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, [cv]);

  const totalPages = Math.max(1, Math.ceil((contentHeight - 4) / A4_HEIGHT_PX));

  const renderDateRange = (start: string, end: string, isCurrent?: boolean) => {
    const s = formatCVDate(start, design.dateFormat, lang);
    const e = isCurrent ? ui.present : formatCVDate(end, design.dateFormat, lang);
    if (!s && !e) return '';
    if (s && !e) return s;
    return `${s} – ${e}`;
  };

  const renderAvatar = (sizePx = 76, borderColor = design.primaryColor) => {
    if (personalInfo.avatarShape === 'hidden') return null;
    const radius =
      personalInfo.avatarShape === 'circle'
        ? '9999px'
        : personalInfo.avatarShape === 'rounded'
        ? '12px'
        : '2px';

    return (
      <div
        className="shrink-0 overflow-hidden border-2 shadow-2xs"
        style={{
          width: `${sizePx}px`,
          height: `${sizePx}px`,
          borderRadius: radius,
          borderColor,
        }}
      >
        <img
          src={personalInfo.avatarUrl || DEFAULT_AVATAR_URL}
          alt={personalInfo.fullName}
          className="w-full h-full object-cover"
          style={{ transform: `scale(${personalInfo.avatarZoom || 1})` }}
        />
      </div>
    );
  };

  // Contact items list with hyperlinks
  const renderContactLinks = (
    textColorClass = 'text-slate-700',
    vertical = false
  ) => {
    const items: React.ReactNode[] = [];

    if (personalInfo.email) {
      items.push(
        <a
          key="email"
          href={`mailto:${personalInfo.email}`}
          className="inline-flex items-center gap-1 hover:underline"
        >
          <Mail className="w-3 h-3 shrink-0 opacity-80" />
          <span>{personalInfo.email}</span>
        </a>
      );
    }
    if (personalInfo.phone) {
      items.push(
        <a
          key="phone"
          href={`tel:${personalInfo.phone}`}
          className="inline-flex items-center gap-1 hover:underline"
        >
          <Phone className="w-3 h-3 shrink-0 opacity-80" />
          <span>{personalInfo.phone}</span>
        </a>
      );
    }
    if (personalInfo.address) {
      items.push(
        <span key="address" className="inline-flex items-center gap-1">
          <MapPin className="w-3 h-3 shrink-0 opacity-80" />
          <span>{personalInfo.address}</span>
        </span>
      );
    }
    if (personalInfo.showDob && personalInfo.dob) {
      items.push(
        <span key="dob" className="inline-flex items-center gap-1">
          <Calendar className="w-3 h-3 shrink-0 opacity-80" />
          <span>
            {ui.dob}: {formatCVDate(personalInfo.dob, design.dateFormat, lang)}
          </span>
        </span>
      );
    }
    if (personalInfo.showGender && personalInfo.gender) {
      items.push(
        <span key="gender" className="inline-flex items-center gap-1">
          <UserCheck className="w-3 h-3 shrink-0 opacity-80" />
          <span>
            {ui.gender}: {personalInfo.gender}
          </span>
        </span>
      );
    }
    if (personalInfo.socials.linkedin) {
      items.push(
        <a
          key="linkedin"
          href={normalizeUrl(personalInfo.socials.linkedin)}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1 hover:underline"
        >
          <Linkedin className="w-3 h-3 shrink-0 opacity-80" />
          <span>{cleanDisplayUrl(personalInfo.socials.linkedin)}</span>
        </a>
      );
    }
    if (personalInfo.socials.github) {
      items.push(
        <a
          key="github"
          href={normalizeUrl(personalInfo.socials.github)}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1 hover:underline"
        >
          <Github className="w-3 h-3 shrink-0 opacity-80" />
          <span>{cleanDisplayUrl(personalInfo.socials.github)}</span>
        </a>
      );
    }
    if (personalInfo.socials.website) {
      items.push(
        <a
          key="website"
          href={normalizeUrl(personalInfo.socials.website)}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1 hover:underline"
        >
          <Globe className="w-3 h-3 shrink-0 opacity-80" />
          <span>{cleanDisplayUrl(personalInfo.socials.website)}</span>
        </a>
      );
    }
    if (personalInfo.socials.portfolio) {
      items.push(
        <a
          key="portfolio"
          href={normalizeUrl(personalInfo.socials.portfolio)}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1 hover:underline"
        >
          <ExternalLink className="w-3 h-3 shrink-0 opacity-80" />
          <span>{cleanDisplayUrl(personalInfo.socials.portfolio)}</span>
        </a>
      );
    }

    if (vertical) {
      return (
        <div className={`flex flex-col gap-1.5 text-[0.92em] ${textColorClass}`}>
          {items.map((node, i) => (
            <div key={i} className="break-all">
              {node}
            </div>
          ))}
        </div>
      );
    }

    return (
      <div className={`flex flex-wrap items-center gap-x-3 gap-y-1 text-[0.92em] ${textColorClass}`}>
        {items.map((node, i) => (
          <React.Fragment key={i}>
            {node}
            {i < items.length - 1 && <span className="opacity-40 select-none">•</span>}
          </React.Fragment>
        ))}
      </div>
    );
  };

  // Section Heading Renderer according to Template style
  const renderSectionTitle = (title: string, isSidebar = false) => {
    const tpl = design.template;

    if (tpl === 'ats-standard') {
      return (
        <h2
          className="font-bold uppercase tracking-wider border-b-[1.5px] pb-0.5 mb-2 text-[1.05em]"
          style={{
            color: design.primaryColor,
            borderColor: design.primaryColor,
          }}
        >
          {title}
        </h2>
      );
    }

    if (tpl === 'executive-minimal') {
      return (
        <div className="flex items-center gap-2.5 mb-2.5">
          <h2
            className="font-bold uppercase tracking-[0.12em] text-[1.02em] shrink-0"
            style={{ color: design.primaryColor }}
          >
            {title}
          </h2>
          <div
            className="h-[1px] flex-1 opacity-30"
            style={{ backgroundColor: design.primaryColor }}
          />
        </div>
      );
    }

    if (tpl === 'creative-designer') {
      return (
        <div className="flex items-center gap-2 mb-2">
          <span
            className="w-2 h-4 rounded-xs shrink-0"
            style={{ backgroundColor: design.primaryColor }}
          />
          <h2
            className="font-bold uppercase tracking-wide text-[1.06em]"
            style={{ color: design.primaryColor }}
          >
            {title}
          </h2>
        </div>
      );
    }

    // modern-professional or tech-compact
    return (
      <h2
        className={`font-bold uppercase tracking-wider pb-1 mb-2 border-b text-[1.02em] ${
          isSidebar ? 'border-slate-300/80' : 'border-slate-200'
        }`}
        style={{ color: design.primaryColor }}
      >
        {title}
      </h2>
    );
  };

  // Render Skills according to skillDisplayStyle
  const renderSkillsContent = (inSidebar = false) => {
    const style = design.skillDisplayStyle;

    return (
      <div className={inSidebar ? 'space-y-2.5' : 'space-y-1.5'}>
        {cv.skills.map((group) => {
          if (group.skills.length === 0) return null;

          if (style === 'comma') {
            return (
              <div
                key={group.id}
                className={`cv-avoid-break ${
                  inSidebar ? 'flex flex-col gap-0.5' : 'flex flex-wrap items-baseline gap-1.5'
                }`}
              >
                <span className="font-bold text-slate-900 shrink-0">{group.category}:</span>
                <span className="text-slate-700">
                  {group.skills.map((s) => s.name).join(', ')}
                </span>
              </div>
            );
          }

          if (style === 'pills') {
            return (
              <div key={group.id} className="cv-avoid-break space-y-1">
                <div className="font-bold text-slate-900 text-[0.95em]">{group.category}</div>
                <div className="flex flex-wrap gap-1">
                  {group.skills.map((s) => (
                    <span
                      key={s.id}
                      className="px-2 py-0.5 rounded text-[0.88em] font-medium border"
                      style={{
                        borderColor: `${design.primaryColor}35`,
                        backgroundColor: `${design.primaryColor}10`,
                        color: design.primaryColor,
                      }}
                    >
                      {s.name}
                    </span>
                  ))}
                </div>
              </div>
            );
          }

          if (style === 'bars') {
            return (
              <div key={group.id} className="cv-avoid-break space-y-1.5">
                <div className="font-bold text-slate-900 text-[0.95em]">{group.category}</div>
                <div className={`grid ${inSidebar ? 'grid-cols-1' : 'grid-cols-2'} gap-x-4 gap-y-1`}>
                  {group.skills.map((s) => (
                    <div key={s.id} className="space-y-0.5">
                      <div className="flex justify-between text-[0.88em]">
                        <span className="font-medium text-slate-800">{s.name}</span>
                      </div>
                      <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full"
                          style={{
                            width: `${(s.level / 5) * 100}%`,
                            backgroundColor: design.primaryColor,
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          }

          // 'dots'
          return (
            <div key={group.id} className="cv-avoid-break space-y-1">
              <div className="font-bold text-slate-900 text-[0.95em]">{group.category}</div>
              <div className={`grid ${inSidebar ? 'grid-cols-1' : 'grid-cols-2'} gap-x-4 gap-y-1`}>
                {group.skills.map((s) => (
                  <div key={s.id} className="flex items-center justify-between gap-2 text-[0.9em]">
                    <span className="text-slate-800 truncate">{s.name}</span>
                    <div className="flex items-center gap-0.5 shrink-0">
                      {[1, 2, 3, 4, 5].map((dot) => (
                        <span
                          key={dot}
                          className="w-2 h-2 rounded-full"
                          style={{
                            backgroundColor:
                              dot <= s.level ? design.primaryColor : '#cbd5e1',
                          }}
                        />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  // Render any individual section by ID
  const renderSectionBlock = (secId: SectionId, inSidebar = false) => {
    const title = SECTION_LABELS[lang][secId];

    switch (secId) {
      case 'summary':
        if (!cv.summary.trim()) return null;
        return (
          <section key="summary" className="cv-avoid-break">
            {renderSectionTitle(title, inSidebar)}
            <FormattedText text={cv.summary} className="text-slate-700 text-justify" />
          </section>
        );

      case 'experience':
        if (cv.experience.length === 0) return null;
        return (
          <section key="experience">
            {renderSectionTitle(title, inSidebar)}
            <div className="space-y-3">
              {cv.experience.map((exp) => (
                <div key={exp.id} className="cv-avoid-break">
                  <div className="flex flex-wrap items-baseline justify-between gap-x-2">
                    <h3 className="font-bold text-slate-900 text-[1.03em]">
                      {exp.position}
                      {exp.company && (
                        <span className="font-semibold" style={{ color: design.primaryColor }}>
                          {' '}
                          • {exp.company}
                        </span>
                      )}
                    </h3>
                    <span className="text-[0.9em] font-medium text-slate-600 shrink-0">
                      {renderDateRange(exp.startDate, exp.endDate, exp.isCurrent)}
                      {exp.location ? ` | ${exp.location}` : ''}
                    </span>
                  </div>
                  <FormattedText text={exp.description} className="text-slate-700 mt-1" />
                </div>
              ))}
            </div>
          </section>
        );

      case 'education':
        if (cv.education.length === 0) return null;
        return (
          <section key="education">
            {renderSectionTitle(title, inSidebar)}
            <div className="space-y-2.5">
              {cv.education.map((edu) => (
                <div key={edu.id} className="cv-avoid-break">
                  <div className="flex flex-wrap items-baseline justify-between gap-x-2">
                    <h3 className="font-bold text-slate-900">{edu.school}</h3>
                    <span className="text-[0.9em] font-medium text-slate-600 shrink-0">
                      {renderDateRange(edu.startDate, edu.endDate, edu.isCurrent)}
                    </span>
                  </div>
                  <div className="flex flex-wrap items-center justify-between text-slate-700 font-medium">
                    <span>{edu.degree}</span>
                    {edu.gpa && (
                      <span className="text-[0.92em] font-semibold text-slate-800">
                        {edu.gpa.toLowerCase().startsWith('gpa') ? edu.gpa : `${ui.gpa}: ${edu.gpa}`}
                      </span>
                    )}
                  </div>
                  {edu.achievements && (
                    <FormattedText
                      text={edu.achievements}
                      className="text-slate-600 text-[0.94em] mt-0.5"
                    />
                  )}
                </div>
              ))}
            </div>
          </section>
        );

      case 'projects':
        if (cv.projects.length === 0) return null;
        return (
          <section key="projects">
            {renderSectionTitle(title, inSidebar)}
            <div className="space-y-3">
              {cv.projects.map((proj) => (
                <div key={proj.id} className="cv-avoid-break">
                  <div className="flex flex-wrap items-baseline justify-between gap-x-2">
                    <div className="flex flex-wrap items-baseline gap-x-2">
                      <h3 className="font-bold text-slate-900 text-[1.02em]">{proj.name}</h3>
                      {proj.role && (
                        <span className="text-[0.92em] font-semibold text-slate-600">
                          ({proj.role})
                        </span>
                      )}
                      {proj.link && (
                        <a
                          href={normalizeUrl(proj.link)}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-0.5 text-[0.88em] underline font-medium"
                          style={{ color: design.primaryColor }}
                        >
                          <ExternalLink className="w-2.5 h-2.5" />
                          <span>{cleanDisplayUrl(proj.link)}</span>
                        </a>
                      )}
                    </div>
                    <span className="text-[0.9em] font-medium text-slate-600 shrink-0">
                      {renderDateRange(proj.startDate, proj.endDate)}
                    </span>
                  </div>

                  {proj.techStack.length > 0 && (
                    <div className="flex flex-wrap items-center gap-1 mt-0.5 mb-1">
                      <span className="text-[0.88em] font-semibold text-slate-600">
                        {ui.techStack}:
                      </span>
                      {proj.techStack.map((t, i) => (
                        <span
                          key={i}
                          className="px-1.5 py-0.2 rounded text-[0.84em] font-medium bg-slate-100 text-slate-800 border border-slate-200"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  )}

                  <FormattedText text={proj.description} className="text-slate-700 mt-0.5" />
                </div>
              ))}
            </div>
          </section>
        );

      case 'skills':
        if (cv.skills.length === 0) return null;
        return (
          <section key="skills">
            {renderSectionTitle(title, inSidebar)}
            {renderSkillsContent(inSidebar)}
          </section>
        );

      case 'certifications':
        if (cv.certifications.length === 0) return null;
        return (
          <section key="certifications">
            {renderSectionTitle(title, inSidebar)}
            <div className="space-y-1.5">
              {cv.certifications.map((c) => (
                <div
                  key={c.id}
                  className="cv-avoid-break flex flex-wrap items-baseline justify-between gap-x-2"
                >
                  <div>
                    <span className="font-bold text-slate-900">{c.name}</span>
                    {c.issuer && <span className="text-slate-600"> — {c.issuer}</span>}
                    {c.url && (
                      <a
                        href={normalizeUrl(c.url)}
                        target="_blank"
                        rel="noreferrer"
                        className="ml-1.5 inline-flex items-center gap-0.5 text-[0.86em] underline"
                        style={{ color: design.primaryColor }}
                      >
                        <ExternalLink className="w-2.5 h-2.5" />
                        <span>Verify</span>
                      </a>
                    )}
                  </div>
                  <span className="text-[0.9em] text-slate-600 font-medium shrink-0">
                    {formatCVDate(c.date, design.dateFormat, lang)}
                  </span>
                </div>
              ))}
            </div>
          </section>
        );

      case 'activities':
        if (cv.activities.length === 0) return null;
        return (
          <section key="activities">
            {renderSectionTitle(title, inSidebar)}
            <div className="space-y-2.5">
              {cv.activities.map((act) => (
                <div key={act.id} className="cv-avoid-break">
                  <div className="flex flex-wrap items-baseline justify-between gap-x-2">
                    <h3 className="font-bold text-slate-900">
                      {act.role}{' '}
                      {act.organization && (
                        <span className="font-semibold" style={{ color: design.primaryColor }}>
                          • {act.organization}
                        </span>
                      )}
                    </h3>
                    <span className="text-[0.9em] text-slate-600 font-medium shrink-0">
                      {renderDateRange(act.startDate, act.endDate)}
                    </span>
                  </div>
                  <FormattedText text={act.description} className="text-slate-700 mt-0.5" />
                </div>
              ))}
            </div>
          </section>
        );

      case 'references':
        if (!cv.references.availableUponRequest && cv.references.items.length === 0) return null;
        return (
          <section key="references" className="cv-avoid-break">
            {renderSectionTitle(title, inSidebar)}
            {cv.references.availableUponRequest ? (
              <p className="italic text-slate-600">{ui.availableUponRequest}</p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {cv.references.items.map((ref) => (
                  <div key={ref.id} className="text-slate-700">
                    <div className="font-bold text-slate-900">{ref.name}</div>
                    <div className="text-[0.92em]">
                      {ref.position} {ref.company ? `— ${ref.company}` : ''}
                    </div>
                    <div className="text-[0.88em] text-slate-600">
                      {ref.email} {ref.phone ? `• ${ref.phone}` : ''}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        );

      case 'custom':
        if (cv.customSections.length === 0) return null;
        return (
          <React.Fragment key="custom">
            {cv.customSections.map((group) => (
              <section key={group.id}>
                {renderSectionTitle(group.sectionTitle || title, inSidebar)}
                <div className="space-y-2">
                  {group.items.map((item) => (
                    <div key={item.id} className="cv-avoid-break">
                      <div className="flex flex-wrap items-baseline justify-between gap-x-2">
                        <div>
                          <span className="font-bold text-slate-900">{item.title}</span>
                          {item.subtitle && (
                            <span className="text-slate-600 font-medium"> — {item.subtitle}</span>
                          )}
                        </div>
                        {item.date && (
                          <span className="text-[0.9em] text-slate-600 font-medium shrink-0">
                            {formatCVDate(item.date, design.dateFormat, lang)}
                          </span>
                        )}
                      </div>
                      <FormattedText text={item.description} className="text-slate-700 mt-0.5" />
                    </div>
                  ))}
                </div>
              </section>
            ))}
          </React.Fragment>
        );

      default:
        return null;
    }
  };

  const visibleSections = sectionsOrder.filter((s) => s.visible);

  // ============================================================================
  // TEMPLATE LAYOUT RENDERERS
  // ============================================================================
  const renderTemplateContent = () => {
    const padMm = `${design.pageMargin}mm`;
    const gapPx = `${design.sectionGap}px`;

    // 1. MODERN PROFESSIONAL (2-COLUMN ASYMMETRIC)
    if (design.template === 'modern-professional') {
      const SIDEBAR_SEC_IDS: SectionId[] = ['skills', 'education', 'certifications', 'references'];
      const sidebarSecs = visibleSections.filter((s) => SIDEBAR_SEC_IDS.includes(s.id));
      const mainSecs = visibleSections.filter((s) => !SIDEBAR_SEC_IDS.includes(s.id));

      const sidebarNode = (
        <div
          className="w-[33%] shrink-0 p-5 flex flex-col"
          style={{
            backgroundColor: `${design.primaryColor}09`,
            gap: gapPx,
          }}
        >
          {/* Sidebar Personal Header */}
          <div className="flex flex-col items-center text-center gap-2.5 pb-3 border-b border-slate-200">
            {renderAvatar(88, design.primaryColor)}
            <div>
              <h1
                className="font-bold tracking-tight text-[1.45em] leading-tight"
                style={{ color: design.primaryColor }}
              >
                {personalInfo.fullName}
              </h1>
              <p className="font-semibold text-slate-700 text-[0.98em] mt-0.5">
                {personalInfo.jobTitle}
              </p>
            </div>
          </div>

          {/* Contact Vertical */}
          <div>
            {renderSectionTitle(lang === 'vi' ? 'Liên hệ' : 'Contact', true)}
            {renderContactLinks('text-slate-700', true)}
          </div>

          {sidebarSecs.map((sec) => renderSectionBlock(sec.id, true))}
        </div>
      );

      const mainNode = (
        <div
          className="flex-1 flex flex-col cv-page-padding"
          style={{
            padding: padMm,
            gap: gapPx,
          }}
        >
          {mainSecs.map((sec) => renderSectionBlock(sec.id, false))}
        </div>
      );

      return (
        <div className="flex min-h-[297mm]">
          {design.sidebarPosition === 'left' ? (
            <>
              {sidebarNode}
              {mainNode}
            </>
          ) : (
            <>
              {mainNode}
              {sidebarNode}
            </>
          )}
        </div>
      );
    }

    // 2. CREATIVE / DESIGNER STUDIO
    if (design.template === 'creative-designer') {
      return (
        <div>
          {/* Bold Colored Banner Header */}
          <header
            className="text-white flex items-center justify-between gap-5"
            style={{
              backgroundColor: design.primaryColor,
              padding: `${Math.max(10, design.pageMargin - 2)}mm ${padMm}`,
            }}
          >
            <div className="space-y-1.5 flex-1">
              <h1 className="font-extrabold tracking-tight text-[1.9em] leading-none">
                {personalInfo.fullName}
              </h1>
              <p className="text-white/90 font-medium text-[1.12em]">
                {personalInfo.jobTitle}
              </p>
              <div className="pt-1">{renderContactLinks('text-white/90', false)}</div>
            </div>
            {renderAvatar(84, '#ffffff')}
          </header>

          {/* Body */}
          <div
            className="flex flex-col cv-page-padding"
            style={{
              padding: padMm,
              gap: gapPx,
            }}
          >
            {visibleSections.map((sec) => renderSectionBlock(sec.id))}
          </div>
        </div>
      );
    }

    // 3. EXECUTIVE / MINIMALIST
    if (design.template === 'executive-minimal') {
      return (
        <div
          className="flex flex-col cv-page-padding"
          style={{
            padding: padMm,
            gap: gapPx,
          }}
        >
          <header
            className="flex items-center justify-between gap-4 pl-3.5 border-l-4 pb-2"
            style={{ borderColor: design.primaryColor }}
          >
            <div className="space-y-1">
              <h1
                className="font-bold tracking-tight text-[1.85em] leading-none"
                style={{ color: design.primaryColor }}
              >
                {personalInfo.fullName}
              </h1>
              <p className="text-[1.1em] font-semibold text-slate-600">
                {personalInfo.jobTitle}
              </p>
              <div className="pt-1">{renderContactLinks('text-slate-600', false)}</div>
            </div>
            {renderAvatar(72, design.primaryColor)}
          </header>

          {visibleSections.map((sec) => renderSectionBlock(sec.id))}
        </div>
      );
    }

    // 4. TECH COMPACT (1-PAGE DENSE)
    if (design.template === 'tech-compact') {
      return (
        <div
          className="flex flex-col cv-page-padding"
          style={{
            padding: padMm,
            gap: `${Math.max(8, design.sectionGap - 3)}px`,
          }}
        >
          <header className="flex items-start justify-between gap-4 pb-2 border-b-2 border-slate-800">
            <div>
              <h1
                className="font-extrabold text-[1.65em] leading-none tracking-tight"
                style={{ color: design.primaryColor }}
              >
                {personalInfo.fullName}
              </h1>
              <p className="font-bold text-slate-700 text-[1.02em] mt-0.5">
                {personalInfo.jobTitle}
              </p>
            </div>
            <div className="text-right max-w-md">{renderContactLinks('text-slate-700', false)}</div>
          </header>

          {visibleSections.map((sec) => renderSectionBlock(sec.id))}
        </div>
      );
    }

    // 5. DEFAULT: ATS STANDARD (HARVARD / JAKE'S RESUME STYLE)
    return (
      <div
        className="flex flex-col cv-page-padding"
        style={{
          padding: padMm,
          gap: gapPx,
        }}
      >
        <header className="flex flex-col items-center text-center pb-1">
          {personalInfo.avatarShape !== 'hidden' && (
            <div className="mb-2">{renderAvatar(68, design.primaryColor)}</div>
          )}
          <h1
            className="font-bold uppercase tracking-wide text-[1.75em] leading-tight"
            style={{ color: design.primaryColor }}
          >
            {personalInfo.fullName}
          </h1>
          {personalInfo.jobTitle && (
            <p className="font-semibold text-slate-700 text-[1.05em] mt-0.5">
              {personalInfo.jobTitle}
            </p>
          )}
          <div className="mt-1.5 flex justify-center">
            {renderContactLinks('text-slate-700', false)}
          </div>
        </header>

        {visibleSections.map((sec) => renderSectionBlock(sec.id))}
      </div>
    );
  };

  const heightPercent = Math.round((contentHeight / A4_HEIGHT_PX) * 100);
  const isSlightOverflow = totalPages > 1 && heightPercent <= 118;

  const handlePrintClick = () => {
    if (isSlightOverflow) {
      setShowOverflowModal(true);
    } else {
      onPrintPdf();
    }
  };

  return (
    <div className="flex flex-col h-full bg-slate-200/80 dark:bg-slate-950 overflow-hidden relative">
      {/* Dynamic Native Print Engine: Sets physical @page margin to match user's pageMargin setting */}
      <style>{`
        @page {
          size: A4 portrait;
          margin: ${design.pageMargin}mm;
        }
        @media print {
          .cv-page-padding {
            padding: 0 !important;
          }
        }
      `}</style>

      {/* Live A4 Preview Top Toolbar (Hidden when printing) */}
      <div className="no-print px-3 py-2 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-2 shrink-0">
        {/* Left: A4 Status & Page Counter */}
        <div className="flex items-center gap-2 flex-wrap">
          {totalPages === 1 ? (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-bold bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 shadow-2xs">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              <span>Chuẩn 1 trang A4 ({heightPercent}%)</span>
            </span>
          ) : (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-bold bg-amber-50 dark:bg-amber-950/70 text-amber-800 dark:text-amber-200 border border-amber-300 dark:border-amber-700 shadow-2xs">
              <AlertTriangle className="w-3.5 h-3.5 text-amber-600 animate-pulse" />
              <span>{totalPages} trang ({heightPercent}% A4)</span>
            </span>
          )}

          {/* Quick Margins Selector */}
          <div className="hidden sm:flex items-center gap-1 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-xl border border-slate-200 dark:border-slate-700 text-xs">
            <span className="text-slate-500 dark:text-slate-400 font-semibold pr-1">Lề giấy:</span>
            {[
              { label: 'Hẹp', val: 10 },
              { label: 'Chuẩn', val: 12 },
              { label: 'Rộng', val: 15 },
            ].map((m) => (
              <button
                key={m.val}
                type="button"
                onClick={() => onChange && onChange({ ...cv, design: { ...design, pageMargin: m.val } })}
                title={`Căn lề ${m.label} (${m.val}mm)`}
                className={`px-2 py-0.5 rounded-lg font-bold text-xs transition-all ${
                  design.pageMargin === m.val
                    ? 'bg-indigo-600 text-white shadow-2xs'
                    : 'text-slate-600 dark:text-slate-300 hover:bg-white dark:hover:bg-slate-700'
                }`}
              >
                {m.val}mm
              </button>
            ))}
          </div>

          {/* Page Tabs */}
          <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 p-0.5 rounded-lg">
            <button
              type="button"
              onClick={() => setSelectedPageView('all')}
              className={`px-2 py-0.5 rounded text-xs font-semibold transition-all ${
                selectedPageView === 'all'
                  ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-2xs'
                  : 'text-slate-600 dark:text-slate-400'
              }`}
            >
              Tất cả ({totalPages} trang)
            </button>
            {Array.from({ length: totalPages }).map((_, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setSelectedPageView(idx + 1)}
                className={`px-2 py-0.5 rounded text-xs font-semibold transition-all ${
                  selectedPageView === idx + 1
                    ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-2xs'
                    : 'text-slate-600 dark:text-slate-400'
                }`}
              >
                Trang {idx + 1}
              </button>
            ))}
          </div>
        </div>

        {/* Right: Zoom Controls & Quick Print */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 px-1.5 py-1 rounded-lg">
            <button
              type="button"
              onClick={() => setZoom((z) => Math.max(0.5, Number((z - 0.1).toFixed(2))))}
              title="Thu nhỏ"
              className="p-1 rounded hover:bg-white dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300"
            >
              <ZoomOut className="w-3.5 h-3.5" />
            </button>
            <span className="text-xs font-mono font-bold text-slate-700 dark:text-slate-200 w-12 text-center">
              {Math.round(zoom * 100)}%
            </span>
            <button
              type="button"
              onClick={() => setZoom((z) => Math.min(1.5, Number((z + 0.1).toFixed(2))))}
              title="Phóng to"
              className="p-1 rounded hover:bg-white dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300"
            >
              <ZoomIn className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={() => setZoom(0.85)}
              title="Vừa màn hình (85%)"
              className="p-1 rounded hover:bg-white dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300"
            >
              <Maximize2 className="w-3.5 h-3.5" />
            </button>
          </div>

          <button
            type="button"
            onClick={handlePrintClick}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold bg-indigo-600 hover:bg-indigo-700 text-white shadow-xs transition-colors"
          >
            <Printer className="w-4 h-4" />
            <span>Xuất PDF Vector</span>
          </button>
        </div>
      </div>

      {/* Prominent Auto-Fit Alert Banner (When overflowing onto page 2) */}
      {totalPages > 1 && onAutoFitOnePage && (
        <div className="no-print px-4 py-2.5 bg-gradient-to-r from-amber-500/15 via-indigo-500/10 to-amber-500/15 border-b border-amber-300 dark:border-amber-800/80 flex flex-wrap items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-2.5">
            <span className="p-1.5 rounded-xl bg-amber-500 text-white shrink-0 shadow-2xs">
              <AlertTriangle className="w-4 h-4" />
            </span>
            <div className="text-xs sm:text-sm text-slate-800 dark:text-slate-200">
              <strong className="text-amber-800 dark:text-amber-300 font-bold">Hồ sơ đang tràn sang trang 2 ({heightPercent}% A4):</strong> Trang 2 chỉ thừa một ít dòng. Khuyên dùng co vừa khít 1 trang A4 để chuẩn ATS và đẹp mắt nhất.
            </div>
          </div>
          <button
            type="button"
            onClick={onAutoFitOnePage}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-bold bg-amber-600 hover:bg-amber-700 text-white shadow-sm transition-all transform active:scale-95 shrink-0"
          >
            <Sparkles className="w-4 h-4" />
            <span>✨ Tự động Co vừa khít 1 trang A4</span>
          </button>
        </div>
      )}

      {/* Scrollable A4 Canvas Area */}
      <div className="flex-1 overflow-auto p-4 sm:p-8 flex justify-center items-start">
        <div
          className="cv-scale-wrapper transition-transform origin-top"
          style={{
            transform: `scale(${zoom})`,
            marginBottom: `${(zoom - 1) * contentHeight}px`,
          }}
        >
          {/* THE A4 SHEET (Always white ink-accurate paper, even in dark mode) */}
          <div
            id="cv-print-sheet"
            ref={paperRef}
            className="relative bg-white text-slate-900 shadow-2xl mx-auto"
            style={{
              width: '210mm',
              minHeight: '297mm',
              fontFamily: `"${design.fontFamily}", sans-serif`,
              fontSize: `${design.fontSize}pt`,
              lineHeight: design.lineHeight,
              ...(selectedPageView !== 'all'
                ? {
                    maxHeight: '297mm',
                    overflow: 'hidden',
                  }
                : {}),
            }}
          >
            <div
              style={
                selectedPageView !== 'all'
                  ? {
                      transform: `translateY(-${(selectedPageView - 1) * 297}mm)`,
                    }
                  : undefined
              }
            >
              {renderTemplateContent()}
            </div>

            {/* Visual Page Break Indicators (Every 297mm, hidden when printing) */}
            {selectedPageView === 'all' &&
              totalPages > 1 &&
              Array.from({ length: totalPages - 1 }).map((_, idx) => (
                <div
                  key={idx}
                  style={{ top: `${(idx + 1) * 297}mm` }}
                  className="no-print absolute left-0 right-0 z-20 pointer-events-none flex items-center"
                >
                  <div className="w-full border-t-2 border-dashed border-rose-500/80" />
                  <span className="absolute right-2 -top-3 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-rose-600 text-white shadow-sm">
                    ✂ Vạch ngắt trang A4 (Hết trang {idx + 1} → Sang trang {idx + 2})
                  </span>
                </div>
              ))}
          </div>
        </div>
      </div>

      {/* Smart Export Confirmation Modal when slight overflow */}
      {showOverflowModal && (
        <div className="no-print fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 max-w-lg w-full shadow-2xl space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-2xl bg-amber-100 dark:bg-amber-950/80 text-amber-600 dark:text-amber-400 shrink-0">
                <AlertTriangle className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                  Tối ưu trước khi Xuất PDF
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  Phát hiện CV của bạn đang tràn sang trang 2 một ít ({heightPercent}% trang A4).
                </p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900/60 text-xs sm:text-sm text-amber-950 dark:text-amber-200 leading-relaxed">
              Theo chuẩn tuyển dụng quốc tế, hồ sơ xin việc nếu chưa quá 7-10 năm kinh nghiệm nên <strong>gói gọn trong đúng 1 trang A4</strong>. Trang 2 chỉ thừa vài dòng sẽ làm mất cân đối và dễ bị trừ điểm trình bày.
            </div>

            <div className="flex flex-col sm:flex-row gap-2.5 pt-2">
              <button
                type="button"
                onClick={() => {
                  setShowOverflowModal(false);
                  if (onAutoFitOnePage) onAutoFitOnePage();
                  setTimeout(() => onPrintPdf(), 200);
                }}
                className="flex-1 py-3 px-4 rounded-xl text-sm font-bold bg-indigo-600 hover:bg-indigo-700 text-white shadow-md flex items-center justify-center gap-2 transition-all"
              >
                <Sparkles className="w-4 h-4" />
                <span>Tối ưu vừa 1 trang & Xuất PDF ngay</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowOverflowModal(false);
                  onPrintPdf();
                }}
                className="py-3 px-4 rounded-xl text-sm font-semibold bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 transition-all text-center"
              >
                Vẫn xuất 2 trang
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
