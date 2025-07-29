const selectedClassNames =
  'ring-2 ring-inset text-orange-800 bg-orange-50 ring-orange-200 dark:bg-amber-900/50 dark:ring-amber-800 dark:text-amber-100';

interface Props {
  displayName: string;
  name: string;
  selected: boolean;
  onClick: (name: string) => void;
}

export default function CategoryItem({ displayName, name, selected, onClick }: Props) {
  return (
    <button
      className={`mt-1 rounded-lg p-2 text-center capitalize md:px-3 ${selected ? selectedClassNames : 'bg-gray-100 text-gray-800 dark:bg-zinc-700 dark:text-zinc-200'}`}
      type="button"
      key={name}
      onClick={() => {
        onClick(name);
      }}
    >
      {displayName}
    </button>
  );
}
