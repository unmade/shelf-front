export function FilesAppIcon({ className = '', ...props }: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      className={`text-blue-400 ${className}`}
      {...props}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M2 6C2 4.89543 2.89543 4 4 4H8C8.65461 4 9.23577 4.3145 9.60063 4.80064C9.9659 5.22694 10.5075 5.49772 11.1123 5.49999H11.1219H16C17.1046 5.49999 18 6.39542 18 7.49999V14C18 15.1046 17.1046 16 16 16H8.00765L8 16H4C2.89543 16 2 15.1046 2 14V14V7.49999V6Z"
        fill="currentColor"
        fillOpacity="0.7"
      />
      <rect x="2" y="6.5" width="16" height="9.5" rx="2" fill="currentColor" />
    </svg>
  );
}

export default FilesAppIcon;
