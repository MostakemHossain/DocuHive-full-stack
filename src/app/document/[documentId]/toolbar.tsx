"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { useEditorStore } from "@/store/use-editor-store";
import { type Level } from "@tiptap/extension-heading";

import {
  BoldIcon,
  ChevronDownIcon,
  ItalicIcon,
  ListTodoIcon,
  LucideIcon,
  MessageSquarePlusIcon,
  PrinterIcon,
  Redo2Icon,
  RemoveFormattingIcon,
  SpellCheckIcon,
  Underline,
  Undo2Icon,
} from "lucide-react";
const HeadingLevelButton = () => {
  const { editor } = useEditorStore();
  const heading = [
    {
      level: "Normal text",
      value: 0,
      fontSize: "16px",
    },
    {
      level: "Heading 1",
      value: 1,
      fontSize: "32px",
    },
    {
      level: "Heading 2",
      value: 2,
      fontSize: "24px",
    },
    {
      level: "Heading 3",
      value: 3,
      fontSize: "20px",
    },
    {
      level: "Heading 4",
      value: 4,
      fontSize: "18px",
    },
    {
      level: "Heading 5",
      value: 5,
      fontSize: "16px",
    },
  ];

  const getCurrentHeading = () => {
    for (let level = 1; level <= 5; level++) {
      if (editor?.isActive("heading", { level })) {
        return `Heading ${level}`;
      }
    }
    return "Normal text";
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          className={cn(
            "h-7 min-w-7 shrink-0 flex items-center justify-center rounded-sm hover:bg-blue-200/80 px-1.5 overflow-hidden text-sm"
          )}
        >
          <span className="truncate">{getCurrentHeading()}</span>
          <ChevronDownIcon className="ml-2 size-4 shrink-0" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="p-1 flex flex-col gap-y-1">
        {heading.map(({ level, value, fontSize }) => (
          <button
            onClick={() => {
              if (value === 0) {
                editor?.chain().focus().setParagraph().run();
              } else {
                editor
                  ?.chain()
                  .focus()
                  .toggleHeading({ level: value as Level })
                  .run();
              }
            }}
            key={value}
            className={cn(
              "flex items-center gap-x-2 px-2 py-1 rounded-sm hover:bg-neutral-200/80",
              (value === 0 && !editor?.isActive("heading")) ||
                (editor?.isActive("heading", { level: value }) &&
                  "bg-neutral-200/80")
            )}
            style={{ fontSize }}
          >
            {level}
          </button>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

const FontFamilyButton = () => {
  const { editor } = useEditorStore();
  const fonts = [
    {
      label: "Arial",
      value: "Arial",
    },
    {
      label: "Calibri",
      value: "Calibri",
    },
    {
      label: "Cambria",
      value: "Cambria",
    },
    {
      label: "Comic Sans MS",
      value: "Comic Sans MS",
    },
    {
      label: "Courier New",
      value: "Courier New",
    },
    {
      label: "Georgia",
      value: "Georgia",
    },
    {
      label: "Impact",
      value: "Impact",
    },
    {
      label: "Lucida Console",
      value: "Lucida Console",
    },
    {
      label: "Lucida Sans Typewriter",
      value: "Lucida Sans Typewriter",
    },
    {
      label: "Microsoft Sans Serif",
      value: "Microsoft Sans Serif",
    },
    {
      label: "Palatino Linotype",
      value: "Palatino Linotype",
    },
    {
      label: "Tahoma",
      value: "Tahoma",
    },
    {
      label: "Times New Roman",
      value: "Times New Roman",
    },
    {
      label: "Trebuchet MS",
      value: "Trebuchet MS",
    },
  ];
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          className={cn(
            "h-7 w-[120px] shrink-0 flex items-center justify-between rounded-sm hover:bg-blue-200/80 px-1.5 overflow-hidden text-sm"
          )}
        >
          <span className="truncate">
            {editor?.getAttributes("textStyle").fontFamily || "Arial"}
          </span>
          <ChevronDownIcon className="ml-2 size-4 shrink-0" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="p-1 flex flex-col gap-y-1">
        {fonts.map(({ label, value }) => (
          <button
            onClick={() => editor?.chain().focus().setFontFamily(value).run()}
            key={value}
            className={cn(
              "flex items-center gap-x-2 px-2 py-1 rounded-sm hover:bg-neutral-200/80",
              editor?.getAttributes("textStyle").fontFamily === value &&
                "bg-neutral-200/80"
            )}
            style={{ fontFamily: value }}
          >
            <span className="text-sm">{label}</span>
          </button>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

interface ToolbarButtonProps {
  icon: LucideIcon;
  isActive?: boolean;
  onClick?: () => void;
}
const ToolBarButton = ({
  onClick,
  isActive,
  icon: Icon,
}: ToolbarButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        "text-sm h-7 min-w-7 flex items-center justify-center rounded-sm hover:bg-neutral-200/80",

        isActive && "bg-blue-200/80 text-black"
      )}
    >
      <Icon className="size-4" />
    </button>
  );
};

export const Toolbar = () => {
  const { editor } = useEditorStore();
  console.log("toolber", editor);
  const sections: {
    label: string;
    icon: LucideIcon;
    onClick: () => void;
    isActive?: boolean;
  }[][] = [
    [
      {
        label: "Undo",
        icon: Undo2Icon,
        onClick: () => editor?.chain().undo().run(),
      },
      {
        label: "Redo",
        icon: Redo2Icon,
        onClick: () => editor?.chain().redo().run(),
      },
      {
        label: "Print",
        icon: PrinterIcon,
        onClick: () => window.print(),
      },
      {
        label: "Spell Check",
        icon: SpellCheckIcon,
        onClick: () => {
          const current = editor?.view.dom.getAttribute("spellcheck");
          editor?.view.dom.setAttribute(
            "spellcheck",
            current === "false" ? "true" : "false"
          );
        },
      },
    ],
    [
      {
        label: "Bold",
        icon: BoldIcon,
        isActive: editor?.isActive("bold"),
        onClick: () => editor?.chain().focus().toggleBold().run(),
      },
      {
        label: "Italic",
        icon: ItalicIcon,
        isActive: editor?.isActive("italic"),
        onClick: () => editor?.chain().focus().toggleItalic().run(),
      },
      {
        label: "Underline",
        icon: Underline,
        isActive: editor?.isActive("underline"),
        onClick: () => editor?.chain().focus().toggleUnderline().run(),
      },
    ],
    [
      {
        label: "Comment",
        icon: MessageSquarePlusIcon,
        isActive: false,
        onClick: () => console.log("Todo comment"),
      },
      {
        label: "List todo",
        icon: ListTodoIcon,
        isActive: editor?.isActive("taskList"),
        onClick: () => editor?.chain().focus().toggleTaskList().run(),
      },
      {
        label: "Remove Formatting",
        icon: RemoveFormattingIcon,
        onClick: () => editor?.chain().focus().unsetAllMarks().run(),
      },
    ],
  ];

  return (
    <div className="bg-[#F1F4F9] px-2.5 py-0.5 rounded-[24px] min-h-[40px] flex items-center gap-x-0.5 overflow-x-auto">
      {sections[0].map((item) => (
        <ToolBarButton key={item.label} {...item} />
      ))}
      <Separator orientation="vertical" className="h-6 bg-neutral-300" />
      <FontFamilyButton />
      <Separator orientation="vertical" className="h-6 bg-neutral-300" />
      <HeadingLevelButton />
      <Separator orientation="vertical" className="h-6 bg-neutral-300" />
      {/* Todo font size  */}
      <Separator orientation="vertical" className="h-6 bg-neutral-300" />

      {sections[1].map((item) => (
        <ToolBarButton key={item.label} {...item} />
      ))}
      {/* Todo Text color  */}
      {/* Todo Highlight color  */}
      <Separator orientation="vertical" className="h-6 bg-neutral-300" />
      {/* Todo Link  */}
      {/* Todo Image */}
      {/* Todo Align */}
      {/* Todo Line height */}
      {/* Todo Line List */}
      <Separator orientation="vertical" className="h-6 bg-neutral-300" />
      {sections[2].map((item) => (
        <ToolBarButton key={item.label} {...item} />
      ))}
    </div>
  );
};
