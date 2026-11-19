import React, { useRef } from 'react';
import { Upload, EyeOff, Circle, Square, ZoomIn, RotateCcw } from 'lucide-react';
import { AvatarShape } from '../types/cv';
import { DEFAULT_AVATAR_URL } from '../data/sampleData';

interface AvatarUploaderProps {
  avatarUrl: string;
  avatarShape: AvatarShape;
  avatarZoom: number;
  onChange: (updates: { avatarUrl?: string; avatarShape?: AvatarShape; avatarZoom?: number }) => void;
}

export const AvatarUploader: React.FC<AvatarUploaderProps> = ({
  avatarUrl,
  avatarShape,
  avatarZoom,
  onChange,
}) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      const img = new Image();
      img.onload = () => {
        // Resize to max 360x360 square crop for fast localStorage & crisp print
        const canvas = document.createElement('canvas');
        const size = 320;
        canvas.width = size;
        canvas.height = size;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          const minSide = Math.min(img.width, img.height);
          const sx = (img.width - minSide) / 2;
          const sy = (img.height - minSide) / 2;
          ctx.drawImage(img, sx, sy, minSide, minSide, 0, 0, size, size);
          const dataUrl = canvas.toDataURL('image/jpeg', 0.88);
          onChange({
            avatarUrl: dataUrl,
            avatarShape: avatarShape === 'hidden' ? 'circle' : avatarShape,
          });
        }
      };
      img.src = reader.result as string;
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/80">
      {/* Avatar Preview Box */}
      <div className="relative w-24 h-24 shrink-0 flex items-center justify-center bg-slate-200 dark:bg-slate-700 overflow-hidden border-2 border-white dark:border-slate-600 shadow-sm"
        style={{
          borderRadius:
            avatarShape === 'circle'
              ? '9999px'
              : avatarShape === 'rounded'
              ? '16px'
              : '6px',
        }}
      >
        {avatarShape === 'hidden' ? (
          <div className="flex flex-col items-center justify-center text-slate-400 text-xs text-center px-1">
            <EyeOff className="w-6 h-6 mb-1 text-slate-400" />
            <span className="font-semibold leading-tight">Đang ẩn ảnh (Chuẩn ATS)</span>
          </div>
        ) : (
          <img
            src={avatarUrl || DEFAULT_AVATAR_URL}
            alt="Avatar"
            className="w-full h-full object-cover transition-transform"
            style={{ transform: `scale(${avatarZoom || 1})` }}
          />
        )}
      </div>

      {/* Controls */}
      <div className="flex-1 space-y-3 w-full">
        <div className="flex flex-wrap items-center gap-2">
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
          />
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold bg-indigo-600 text-white hover:bg-indigo-700 transition-colors shadow-xs"
          >
            <Upload className="w-4 h-4" />
            <span>Tải ảnh từ máy tính</span>
          </button>

          <button
            type="button"
            onClick={() => onChange({ avatarUrl: DEFAULT_AVATAR_URL, avatarZoom: 1 })}
            title="Khôi phục ảnh mẫu mặc định"
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs sm:text-sm font-semibold bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5 text-slate-500" />
            <span>Dùng ảnh mẫu</span>
          </button>
        </div>

        {/* Shape Selector */}
        <div>
          <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 block mb-1">
            Kiểu khung ảnh hiển thị trên CV:
          </span>
          <div className="flex flex-wrap items-center gap-1.5">
            {(
              [
                { id: 'circle', label: 'Hình tròn', icon: Circle },
                { id: 'rounded', label: 'Bo góc mềm', icon: Square },
                { id: 'square', label: 'Khung vuông', icon: Square },
                { id: 'hidden', label: 'Ẩn ảnh (Chuẩn quốc tế ATS)', icon: EyeOff },
              ] as const
            ).map((item) => {
              const Icon = item.icon;
              const active = avatarShape === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => onChange({ avatarShape: item.id })}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                    active
                      ? 'bg-indigo-50 dark:bg-indigo-950/80 text-indigo-700 dark:text-indigo-300 border-indigo-400 dark:border-indigo-600 font-bold shadow-2xs'
                      : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Zoom Slider */}
        {avatarShape !== 'hidden' && (
          <div className="flex items-center gap-2.5 max-w-sm pt-1">
            <ZoomIn className="w-4 h-4 text-slate-500 shrink-0" />
            <span className="text-xs font-medium text-slate-600 dark:text-slate-400 w-20 shrink-0">
              Thu/Phóng:
            </span>
            <input
              type="range"
              min={1}
              max={1.6}
              step={0.05}
              value={avatarZoom || 1}
              onChange={(e) => onChange({ avatarZoom: parseFloat(e.target.value) })}
              className="w-full accent-indigo-600 h-2 bg-slate-200 dark:bg-slate-700 rounded-lg cursor-pointer"
            />
            <span className="text-xs font-mono font-bold text-slate-700 dark:text-slate-300 w-12 text-right">
              {Math.round((avatarZoom || 1) * 100)}%
            </span>
          </div>
        )}
      </div>
    </div>
  );
};
