import Image from "next/image";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectValue,
  SelectTrigger,
} from "@mijn-ui/components/select";

type LanguageSelectorProps = {
  LanguageOptions: {
    name: string;
    alt: string;
    src: string;
  }[];
  selectedLanguage: string;
  onValueChange: (value: string) => void;
};

const LanguageSelector = ({
  LanguageOptions,
  selectedLanguage,
  onValueChange,
}: LanguageSelectorProps) => {
  // TODO: add actual language change logic

  return (
    <Select
      defaultValue={selectedLanguage}
      value={selectedLanguage}
      onValueChange={onValueChange}
    >
      <SelectTrigger className="h-9 w-32" icon={null}>
        <SelectValue />
      </SelectTrigger>
      <SelectContent side="bottom" align="end" className="w-40">
        {LanguageOptions.map((option) => (
          <SelectItem key={option.name} value={option.name}>
            <div className="flex items-center gap-2 text-xs/6">
              <Image
                src={option.src}
                width={80}
                height={80}
                alt={option.alt}
                className="size-4 rounded-md"
              />

              {option.name}
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default LanguageSelector;
