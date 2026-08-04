import { FileText, Download } from 'lucide-react';
import { toast } from 'sonner';

function canPreview(contentType) {
  return (
    contentType === 'application/pdf' ||
    contentType?.startsWith('image/')
  );
}

export default function AttachmentCard({
  id,
  name,
  size,
  contentType,
  onDownload,
  onPreview,
}) {
  const handlePreview = () => {
    if (!canPreview(contentType)) {
      toast.info(
        'Preview is not available for this file type.'
      );

      return;
    }

    onPreview?.();
  };

  const handleDownload = async () => {
    if (!onDownload) {
      return;
    }

    try {
      await onDownload();
    } catch (error) {
      toast.error(
        error?.message ||
          'Failed to download attachment.'
      );
    }
  };

  return (
    <div className="flex items-center justify-between rounded-lg border border-gray-200 px-3 py-2 dark:border-gray-800">
      <div className="flex min-w-0 items-center gap-2">
        <FileText
          size={16}
          className="shrink-0 text-gray-400"
        />

        <div className="min-w-0">
          <button
            type="button"
            onClick={handlePreview}
            disabled={
              !canPreview(contentType)
            }
            className="block max-w-full truncate text-left text-sm font-medium text-gray-700 disabled:cursor-default dark:text-gray-200"
          >
            {name}
          </button>

          <p className="text-xs text-gray-400 dark:text-gray-500">
            {size || contentType || 'Attachment'}
          </p>
        </div>
      </div>

      <button
        type="button"
        onClick={handleDownload}
        aria-label={`Download ${name}`}
        className="rounded-lg p-1.5 text-gray-400 hover:bg-gray-100 hover:text-gray-600 dark:hover:bg-gray-800 dark:hover:text-gray-300"
      >
        <Download size={16} />
      </button>
    </div>
  );
}