import Image from "next/image";

import { Select, SelectContent, SelectOption, SelectTrigger } from "../_mijn-ui/Select";

type LanguageSelectorProps = {
  LanguageOptions: {
    name: string;
    alt: string;
    src: string;
  }[];
  selectedIndex: number;
  onSelect: (index: number) => void;
};

const LanguageSelector = ({ LanguageOptions, selectedIndex, onSelect }: LanguageSelectorProps) => {
  // TODO: add actual language change logic

  return (
    <Select placement="bottom-end" defaultSelectedIndex={1} onSelect={onSelect}>
      <SelectTrigger className="bg-surface shadow-sm text-xs hover:bg-surface hover:text-secondary-text border-none w-24 gap-2 p-0">
        <span className="capitalize">{LanguageOptions[selectedIndex].name}</span>

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
      <SelectContent className="w-36 border-none gap-1 p-3">
        {LanguageOptions.map((option) => (
          <SelectOption
            key={option.name}
            value={option.name}
            className="flex items-center gap-3 data-[active]:text-secondary-text data-[active]:bg-transparent data-[selected]:bg-accent data-[active]:data-[selected]:bg-accent data-[selected]:text-secondary-text truncate text-xs"
          >
            <Image src={option.src} width={80} height={80} alt={option.alt} className="size-4 rounded-md" />

            {option.name}
          </SelectOption>
        ))}
      </SelectContent>
    </Select>
  );
};

export default LanguageSelector;
