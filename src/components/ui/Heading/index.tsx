type HeadingProps = React.ComponentPropsWithoutRef<'h1'>;

export default function Heading({ className = '', ...props }: HeadingProps) {
  return (
    /* eslint-disable-next-line jsx-a11y/heading-has-content */
    <h1
      className={`text-2xl/8 font-semibold text-gray-900 sm:text-xl/8 dark:text-white ${className}`}
      {...props}
    />
  );
}
