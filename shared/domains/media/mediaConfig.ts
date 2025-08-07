export const mediaConfig = {
  AUDIO_FORM_ACCEPT: 'audio/*',
  AUDIO_MAX_SIZE: 50 * 1000 * 1000, // 50MB
  DOCUMENT_FORM_ACCEPT:
    '.pdf, .doc, .docx, .xls, .xlsx, .ppt, .pptx, application/msword, application/vnd.openxmlformats-officedocument.wordprocessingml.document, application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-powerpoint, application/vnd.openxmlformats-officedocument.presentationml.presentation, application/pdf',
  DOCUMENT_MAX_SIZE: 20 * 1000 * 1000, // 20MB

  IMAGE_FORM_ACCEPT: 'image/*',
  // It uses base-10
  // @see https://web.archive.org/web/20150324153922/https://pacoup.com/2009/05/26/kb-kb-kib-whats-up-with-that/
  IMAGE_MAX_SIZE: 5 * 1000 * 1000, // 5MB
  OTHER_MAX_SIZE: 20 * 1000 * 1000, // 20MB
  VIDEO_FORM_ACCEPT: 'video/*',
  VIDEO_MAX_SIZE: 100 * 1000 * 1000, // 100MB
};
