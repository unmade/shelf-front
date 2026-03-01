interface PDFPreviewProps {
  content?: string;
}

export function PDFPreview({ content }: PDFPreviewProps) {
  return (
    <object
      data={content}
      type="application/pdf"
      width="100%"
      height="100%"
      aria-label="PDF Preview"
    />
  );
}
