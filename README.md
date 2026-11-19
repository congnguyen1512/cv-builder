# CV Builder Pro — Trình tạo Hồ sơ xin việc Chuẩn A4 & ATS

Ứng dụng web soạn thảo CV hiện đại theo bố cục **3 khu vực (Split-Screen)**, chuẩn kích thước in ấn **A4 (210mm × 297mm)** và tối ưu hóa 100% cho hệ thống lọc hồ sơ tự động (**ATS**).

## Chạy ứng dụng

```bash
cd "C:\Users\Hoang Luu\.gemini\antigravity\scratch\cv-builder"
npm run dev
```

## Kiến trúc thư mục

- `src/types/cv.ts`: Cấu trúc dữ liệu toàn diện cho 10 mục CV, cấu hình thiết kế, đa ngôn ngữ (`vi` / `en`) và định dạng ngày tháng.
- `src/data/sampleData.ts`: Dữ liệu mẫu CV Tiếng Việt (Senior Full-Stack Engineer) & Tiếng Anh (Senior Product Designer), nhãn đa ngôn ngữ và bộ mẫu câu công thức **XYZ / STAR**.
- `src/utils/atsAnalyzer.ts`: Bộ chấm điểm **ATS & CV Score (thang 100 điểm)** và công cụ **So khớp từ khóa JD (Job Description Matcher)**.
- `src/components/LeftSidebar.tsx`: Quản lý nhiều bản CV (Tạo mới, Nhân bản, Đổi tên, Xóa, Nạp mẫu) và Kéo-Thả (Drag & Drop) sắp xếp thứ tự + Ẩn/Hiện từng mục.
- `src/components/FormEditor.tsx`: Trình nhập liệu thông minh dạng Accordion, tích hợp Rich Text tối giản, quản lý ảnh đại diện (cắt/zoom/ẩn ảnh chuẩn ATS) và gợi ý công thức XYZ/STAR.
- `src/components/DesignCustomizer.tsx`: 5 mẫu Template (`ATS Standard`, `Modern Professional 2 cột`, `Executive Minimalist`, `Creative Designer`, `Tech Compact`), tùy chỉnh màu sắc, 5 bộ font Tiếng Việt, thanh trượt cỡ chữ / giãn dòng / khoảng cách mục / căn lề trang và nút tự động co vừa 1 trang A4.
- `src/components/AtsPanel.tsx`: Bảng phân tích điểm CV chi tiết và so khớp từ khóa JD với nút thêm nhanh từ khóa còn thiếu vào CV.
- `src/components/TemplateRenderer.tsx` & `src/index.css`: Bản xem trước A4 thời gian thực (Zoom 50%–150%, vạch báo ngắt trang `297mm`, chuyển trang) và hệ thống xuất **Vector PDF (`@media print`)** giữ nguyên văn bản bôi đen/copy được và hyperlink bấm được.
