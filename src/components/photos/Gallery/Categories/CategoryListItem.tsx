interface Props {
  name: string;
}

export default function CategoryListItem({ name }: Props) {
  return (
    <div className="mt-2 mr-2 flex items-center rounded-lg bg-gray-100 px-3 py-1 text-gray-800 dark:bg-zinc-700 dark:text-zinc-200">
      {name}
    </div>
  );
}
