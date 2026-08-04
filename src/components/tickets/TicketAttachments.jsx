import {
  useRef,
  useState,
} from 'react';

import {
  Download,
  File,
  Image,
  Paperclip,
  Upload,
} from 'lucide-react';

function isPreviewable(
  contentType = ''
) {
  return (
    contentType.startsWith(
      'image/'
    ) ||
    contentType ===
      'application/pdf'
  );
}

function formatDate(value) {
  if (!value) {
    return '-';
  }

  const date =
    new Date(value);

  if (
    Number.isNaN(
      date.getTime()
    )
  ) {
    return value;
  }

  return date.toLocaleString(
    'en-GB',
    {
      dateStyle: 'medium',
      timeStyle: 'short',
    }
  );
}

export default function TicketAttachments({
  attachments,
  isLoading,
  isUploading,
  onUpload,
  onDownload,
}) {
  const inputRef =
    useRef(null);

  const [
    uploadError,
    setUploadError,
  ] = useState('');

  const handleFileChange =
    async (event) => {
      const file =
        event.target.files?.[0];

      if (!file) {
        return;
      }

      setUploadError('');

      try {
        await onUpload(file);
      } catch (error) {
        setUploadError(
          error?.message ??
            'Unable to upload file.'
        );
      } finally {
        event.target.value = '';
      }
    };

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between gap-3">
        <div>
          <h2 className="text-sm font-semibold text-gray-900 dark:text-gray-100">
            Attachments
          </h2>

          <p className="mt-1 text-xs text-gray-400 dark:text-gray-500">
            Supporting files attached to this ticket.
          </p>
        </div>

        <button
          type="button"
          disabled={isUploading}
          onClick={() =>
            inputRef.current?.click()
          }
          className="inline-flex items-center gap-2 rounded-lg border border-gray-200 px-3 py-2 text-xs font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 dark:border-gray-700 dark:text-gray-200 dark:hover:bg-gray-800"
        >
          <Upload size={14} />

          {isUploading
            ? 'Uploading...'
            : 'Upload File'}
        </button>

        <input
          ref={inputRef}
          type="file"
          className="hidden"
          onChange={
            handleFileChange
          }
        />
      </div>

      {uploadError && (
        <p className="rounded-lg bg-red-50 px-3 py-2 text-xs text-red-600 dark:bg-red-500/10 dark:text-red-400">
          {uploadError}
        </p>
      )}

      {isLoading ? (
        <div className="space-y-2">
          {[1, 2].map((item) => (
            <div
              key={item}
              className="h-14 animate-pulse rounded-lg bg-gray-100 dark:bg-gray-800"
            />
          ))}
        </div>
      ) : attachments.length === 0 ? (
        <div className="rounded-lg border border-dashed border-gray-200 py-8 text-center dark:border-gray-700">
          <Paperclip
            size={20}
            className="mx-auto text-gray-300"
          />

          <p className="mt-2 text-sm text-gray-400 dark:text-gray-500">
            No attachments yet.
          </p>
        </div>
      ) : (
        <div className="space-y-2">
          {attachments.map(
            (attachment) => (
              <AttachmentItem
                key={
                  attachment.id
                }
                attachment={
                  attachment
                }
                onDownload={
                  onDownload
                }
              />
            )
          )}
        </div>
      )}
    </div>
  );
}

function AttachmentItem({
  attachment,
  onDownload,
}) {
  const contentType =
    attachment.content_type ??
    '';

  const previewable =
    isPreviewable(
      contentType
    );

  const icon =
    contentType.startsWith(
      'image/'
    )
      ? Image
      : File;

  const Icon = icon;

  const handleOpen =
    async () => {
      try {
        const result =
          await onDownload(
            attachment.id
          );

        /*
         * The backend download endpoint
         * is the source of truth.
         *
         * Depending on apiClient response
         * handling, result may be:
         * - Blob
         * - URL
         * - response object
         */

        if (result instanceof Blob) {
          const url =
            URL.createObjectURL(
              result
            );

          window.open(
            url,
            '_blank',
            'noopener,noreferrer'
          );

          setTimeout(
            () =>
              URL.revokeObjectURL(
                url
              ),
            60_000
          );

          return;
        }

        if (
          typeof result ===
          'string'
        ) {
          window.open(
            result,
            '_blank',
            'noopener,noreferrer'
          );
        }
      } catch (error) {
        console.error(
          'Attachment download failed:',
          error
        );
      }
    };

  return (
    <div className="flex items-center justify-between gap-3 rounded-lg border border-gray-100 p-3 dark:border-gray-800">
      <div className="flex min-w-0 items-center gap-3">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gray-100 text-gray-500 dark:bg-gray-800 dark:text-gray-300">
          <Icon size={17} />
        </div>

        <div className="min-w-0">
          <p className="truncate text-sm font-medium text-gray-700 dark:text-gray-200">
            {attachment.filename}
          </p>

          <p className="mt-0.5 text-[11px] text-gray-400">
            {attachment.content_type ||
              'Unknown type'}{' '}
            •{' '}
            {formatDate(
              attachment.timestamp
            )}
          </p>
        </div>
      </div>

      <button
        type="button"
        onClick={
          handleOpen
        }
        className="shrink-0 rounded-lg p-2 text-gray-400 hover:bg-gray-100 hover:text-blue-600 dark:hover:bg-gray-800"
        title={
          previewable
            ? 'Preview / download'
            : 'Download'
        }
      >
        <Download size={16} />
      </button>
    </div>
  );
}