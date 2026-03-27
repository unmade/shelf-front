import { CheckCircleIcon, ExclamationCircleIcon, SpinnerIcon } from '@/icons';

interface ProgressProps {
  className?: string;
  progress: number;
  status: 'failed' | 'completed' | 'inProgress';
}

export default function Progress({ className, progress, status }: ProgressProps) {
  if (status === 'failed') {
    return <ExclamationCircleIcon className={`z-10 mr-2 h-5 w-5 ${className}`} />;
  }
  if (status === 'completed') {
    return <CheckCircleIcon className={`z-10 mr-2 h-5 w-5 ${className}`} />;
  }
  if (progress === 100 && status === 'inProgress') {
    return <SpinnerIcon className="z-10 mr-2 h-5 w-5 animate-spin text-blue-500" />;
  }
  return <div className={`mr-2 font-medium ${className}`}>{progress}%</div>;
}
