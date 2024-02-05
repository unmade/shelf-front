import { useTranslation } from 'react-i18next';

export default function useUploadError(code: string | undefined) {
  const { t } = useTranslation(['uploads']);

  switch (code) {
    case 'badFile':
      return t('uploads:badFile');
    case 'unsupportedMediaType':
      return t('uploads:unsupportedMediaType');
    case 'uploadTooLarge':
      return t('uploads:uploadTooLarge');
    case 'uploadError':
      return t('uploads:uploadError');
    default:
      return null;
  }
}
