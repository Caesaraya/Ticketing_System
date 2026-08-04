import {
  downloadAttachment,
} from '../services/attachmentService';

export async function downloadAttachmentFile(
  attachment
) {
  const blob =
    await downloadAttachment(
      attachment.id
    );

  const url =
    window.URL.createObjectURL(blob);

  const link =
    document.createElement('a');

  link.href = url;
  link.download =
    attachment.filename ||
    attachment.name ||
    'attachment';

  document.body.appendChild(link);

  link.click();

  link.remove();

  window.URL.revokeObjectURL(url);
}

export async function previewAttachment(
  attachment
) {
  const blob =
    await downloadAttachment(
      attachment.id
    );

  const url =
    window.URL.createObjectURL(blob);

  const previewWindow =
    window.open(
      url,
      '_blank',
      'noopener,noreferrer'
    );

  if (!previewWindow) {
    window.URL.revokeObjectURL(url);

    throw new Error(
      'Unable to open preview. Please allow pop-ups for this site.'
    );
  }

  setTimeout(() => {
    window.URL.revokeObjectURL(url);
  }, 60_000);
}