export type LANGUAGE_OPTIONS_TYPE = {
  name: string
  alt: string
  src: string
}

export const LANGUAGE_OPTIONS: LANGUAGE_OPTIONS_TYPE[] = [
  {
    name: "မြန်မာ",
    alt: "myanmar flag",
    src: "/assets/images/countries/myanmar.svg",
  },
  {
    name: "English",
    alt: "united-state flag",
    src: "/assets/images/countries/united-states.svg",
  },
  {
    name: "ภาษาไทย",
    alt: "thailand flag",
    src: "/assets/images/countries/thailand.svg",
  },
]

export const DEFAULT_SELECTED_LANGUAGE = LANGUAGE_OPTIONS[0].name

/* -------------------------------- USER INFO ------------------------------- */

export type CURRENT_USER_TYPE = {
  name: string
  avatar: string
  alt: string
  role: string
}

export const CURRENT_USER: CURRENT_USER_TYPE = {
  name: "PICO SBS",
  avatar: "",
  alt: "pico",
  role: "operator",
}
