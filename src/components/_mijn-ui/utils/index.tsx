import clsx, { ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export const cn = (...classes: ClassValue[]) => twMerge(clsx(classes));

export const generateId = () => {
  return Math.floor(Math.random() * Date.now()).toString();
};
