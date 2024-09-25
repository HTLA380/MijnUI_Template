import Image from "next/image";

import {
  Select,
  SelectContent,
  SelectOption,
  SelectTrigger,
} from "@/mijn-ui/components/Select";

type LanguageSelectorProps = {
  LanguageOptions: {
    name: string;
    alt: string;
    src: string;
  }[];
  selectedIndex: number;
  onSelect: (index: number) => void;
};

const LanguageSelector = ({
  LanguageOptions,
  selectedIndex,
  onSelect,
}: LanguageSelectorProps) => {
  // TODO: add actual language change logic

  return (
    <Select placement="bottom-end" defaultSelectedIndex={1} onSelect={onSelect}>
      <SelectTrigger
        title="select language"
        className="w-24 gap-2 border-none bg-surface p-0 text-xs shadow-sm hover:bg-surface hover:text-secondary-text"
      >
        <span className="capitalize">
          {LanguageOptions[selectedIndex].name}
        </span>

        {selectedIndex !== null && (
          <Image
            src={LanguageOptions[selectedIndex].src}
            width={80}
            height={80}
            alt={LanguageOptions[selectedIndex].alt}
            className="size-4 rounded-md"
          />
        )}
      </SelectTrigger>
      <SelectContent className="w-36 gap-1 border-none p-3">
        {LanguageOptions.map((option) => (
          <SelectOption
            key={option.name}
            value={option.name}
            className="flex items-center gap-3 truncate text-xs data-[active]:bg-transparent data-[active]:data-[selected]:bg-accent data-[selected]:bg-accent data-[active]:text-secondary-text data-[selected]:text-secondary-text"
          >
            <Image
              src={option.src}
              width={80}
              height={80}
              alt={option.alt}
              className="size-4 rounded-md"
            />

            {option.name}
          </SelectOption>
        ))}
      </SelectContent>
    </Select>
  );
};

export default LanguageSelector;
