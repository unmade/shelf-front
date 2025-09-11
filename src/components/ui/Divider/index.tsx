export default function Divider({ className = '', ...props }: React.HTMLAttributes<HTMLHRElement>) {
  return (
    <hr
      role="presentation"
      className={`w-full border-t border-gray-950/10 dark:border-white/10 ${className}`}
      {...props}
    />
  );
}
