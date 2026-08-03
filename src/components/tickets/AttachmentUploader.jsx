import { useRef } from 'react';
import { UploadCloud, FileText, X } from 'lucide-react';

// UI-only file picker: shows a dropzone-style button, and once a file
// is "selected" shows its name with a remove option. No upload, no
// storage, no backend — the File object never leaves the browser.
export default function AttachmentUploader({ file, onChange }) {
  const inputRef = useRef(null);

  const handleFileSelect = (e) => {
    const selected = e.target.files?.[0] ?? null;
    onChange(selected);
  };

  if (file) {
    return (
      <div className="flex items-center justify-between rounded-lg border border-gray-200 px-3 py-2 dark:border-gray-800">
        <div className="flex min-w-0 items-center gap-2">
          <FileText size={16} className="shrink-0 text-gray-400" />
          <span className="truncate text-sm text-gray-700 dark:text-gray-200">{file.name}</span>
        </div>
        <button
          type="button"
          onClick={() => onChange(null)}
          aria-label="Remove file"
          className="shrink-0 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
        >
          <X size={16} />
        </button>
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={() => inputRef.current?.click()}
      className="flex w-full flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed border-gray-300 py-8 text-center text-sm text-gray-400 transition-colors hover:border-blue-400 hover:text-blue-500 dark:border-gray-700"
    >
      <UploadCloud size={22} />
      <span>
        Drag and drop a file here or <span className="font-medium text-blue-600">browse</span>
      </span>
      <span className="text-xs text-gray-400 dark:text-gray-500">Supports JPG, PNG, PDF, DOCX (Max 10MB)</span>
      <input
        ref={inputRef}
        type="file"
        className="hidden"
        onChange={handleFileSelect}
        accept=".jpg,.jpeg,.png,.pdf,.docx"
      />
    </button>
  );
}