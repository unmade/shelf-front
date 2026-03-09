import { useTranslation } from 'react-i18next';

interface PDFPreviewProps {
  content?: string;
}

export function PDFPreview({ content }: PDFPreviewProps) {
  const { t } = useTranslation('files');

  return (
    <object
      data={content}
      type="application/pdf"
      width="100%"
      height="100%"
      aria-label={t('preview.pdf.ariaLabel', { defaultValue: 'PDF Preview' })}
    />
  );
}
