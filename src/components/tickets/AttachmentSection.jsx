import {
  Download,
  File,
  Paperclip,
} from 'lucide-react';

import {
  downloadAttachment,
} from '../../services/attachmentService';

export default function AttachmentSection({
  attachments = [],
  isLoading = false,
  error = null,
}) {
  const handleDownload = async (
    attachment
  ) => {
    try {
      await downloadAttachment(
        attachment.id,
        attachment.filename
      );
    } catch (downloadError) {
      console.error(
        'Failed to download attachment:',
        downloadError
      );
    }
  };

  return (
    <section className="rounded-xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-gray-900">
      <div className="mb-4 flex items-center gap-2">
        <Paperclip
          size={18}
          className="text-gray-500"
        />

        <h2 className="text-base font-semibold text-gray-900 dark:text-white">
          Attachments
        </h2>
      </div>

      {isLoading && (
        <div className="py-6 text-center text-sm text-gray-500">
          Loading attachments...
        </div>
      )}

      {!isLoading && error && (
        <div className="rounded-lg bg-red-50 p-4 text-sm text-red-600 dark:bg-red-950/30 dark:text-red-400">
          {error}
        </div>
      )}

      {!isLoading &&
        !error &&
        attachments.length === 0 && (
          <div className="rounded-lg border border-dashed border-gray-300 py-8 text-center dark:border-gray-700">
            <File
              size={28}
              className="mx-auto mb-2 text-gray-400"
            />

            <p className="text-sm text-gray-500">
              No attachments
            </p>
          </div>
        )}

      {!isLoading &&
        !error &&
        attachments.length > 0 && (
          <div className="space-y-2">
            {attachments.map(
              (attachment) => (
                <div
                  key={attachment.id}
                  className="flex items-center justify-between gap-4 rounded-lg border border-gray-200 p-3 dark:border-gray-800"
                >
                  <div className="flex min-w-0 items-center gap-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gray-100 dark:bg-gray-800">
                      <File
                        size={18}
                        className="text-gray-500"
                      />
                    </div>

                    <div className="min-w-0">
                      <p className="truncate text-sm font-medium text-gray-900 dark:text-white">
                        {attachment.filename}
                      </p>

                      <p className="text-xs text-gray-500">
                        {attachment.content_type ||
                          'Unknown file type'}
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() =>
                      handleDownload(
                        attachment
                      )
                    }
                    className="inline-flex shrink-0 items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-500/10"
                  >
                    <Download size={16} />

                    <span className="hidden sm:inline">
                      Download
                    </span>
                  </button>
                </div>
              )
            )}
          </div>
        )}
    </section>
  );
}