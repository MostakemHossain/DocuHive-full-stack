import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { useEditorStore } from "@/store/use-editor-store";
import { ListIcon, ListOrderedIcon } from "lucide-react";

const ListButton = () => {
  const { editor } = useEditorStore();
  const lists = [
    {
      label: "Bullet List",
      icon: ListIcon,
      onClick: () => editor?.chain().focus().toggleBulletList().run(),
      isActive: () => editor?.isActive("bulletList"),
    },
    {
      label: "Order List",
      icon: ListOrderedIcon,
      onClick: () => editor?.chain().focus().toggleOrderedList().run(),
      isActive: () => editor?.isActive("orderList"),
    },
  ];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <ListIcon className="size-4" />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="p-1 flex flex-col gap-y-1">
        {lists.map(({ label, icon: Icon, onClick, isActive }) => (
          <button
            key={label}
            onClick={onClick}
            className={cn(
              "flex items-center gap-x-2 px-2 py-1 rounded-sm hover:bg-blue-200/80",
              isActive() && "bg-blue-200/80"
            )}
          >
            <Icon className="size-4" />
            <span className="text-sm">{label}</span>
          </button>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
export default ListButton