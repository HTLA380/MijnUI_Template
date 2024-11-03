/* eslint-disable */

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./mijn-ui/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        main: {
          DEFAULT: "rgb(var(--main) / <alpha-value>)",
          text: "rgb(var(--main-text) / <alpha-value>)",
          border: "hsl(var(--main-border) / <alpha-value>)",
        },

        muted: {
          DEFAULT: "rgb(var(--muted) / <alpha-value>)",
          text: "rgb(var(--muted-text) / <alpha-value>)",
        },

        neutral: {
          DEFAULT: "hsl(var(--neutral) / <alpha-value>)",
          text: "hsl(var(--neutral-text) / <alpha-value>)",
        },

        surface: {
          DEFAULT: "rgb(var(--surface) / <alpha-value>)",
          text: "rgb(var(--surface-text) / <alpha-value>)",
        },

        primary: {
          DEFAULT: "rgb(var(--primary) / <alpha-value>)",
          text: "rgb(var(--primary-text) / <alpha-value>)",
        },

        secondary: {
          DEFAULT: "rgb(var(--secondary) / <alpha-value>)",
          text: "rgb(var(--secondary-text) / <alpha-value>)",
        },

        accent: {
          DEFAULT: "rgb(var(--accent) / <alpha-value>)",
          text: "rgb(var(--accent-text) / <alpha-value>)",
        },

        info: {
          DEFAULT: "hsl(var(--info) / <alpha-value>)",
          text: "hsl(var(--info-text) / <alpha-value>)",
          "filled-text": "hsl(var(--info-filled-text) / <alpha-value>)",
        },

        warning: {
          DEFAULT: "hsl(var(--warning) / <alpha-value>)",
          text: "hsl(var(--warning-text) / <alpha-value>)",
          "filled-text": "hsl(var(--warning-filled-text) / <alpha-value>)",
        },

        danger: {
          DEFAULT: "hsl(var(--danger) / <alpha-value>)",
          text: "hsl(var(--danger-text) / <alpha-value>)",
          "filled-text": "hsl(var(--danger-filled-text) / <alpha-value>)",
        },

        success: {
          DEFAULT: "hsl(var(--success) / <alpha-value>)",
          text: "hsl(var(--success-text) / <alpha-value>)",
          "filled-text": "hsl(var(--success-filled-text) / <alpha-value>)",
        },

        disabled: {
          DEFAULT: "rgb(var(--disabled) / <alpha-value>)",
          text: "rgb(var(--disabled-text) / <alpha-value>)",
        },

        "main-border": "rgb(var(--main-border) / <alpha-value>)",
        "input-border": "rgb(var(--input-border) / <alpha-value>)",

        kanban: "rgb(var(--kanban) / <alpha-value>)",
        ring: "rgb(var(--ring) / <alpha-value>)",
      },

      width: {
        default: "2.15rem",
      },
      height: {
        default: "2.15rem",
      },
      size: {
        default: "2.15rem",
      },
      fontSize: {
        default: "0.8rem",
      },

      borderRadius: {
        default: "0.25rem",
      },
      keyframes: {
        "accordion-expand": {
          from: { height: "0", opacity: "0" },
          to: { height: "var(--radix-accordion-content-height)", opacity: "1" },
        },
        "accordion-collapse": {
          from: {
            height: "var(--radix-accordion-content-height)",
            opacity: "1",
          },
          to: { height: "0" },
          opacity: "0",
        },
        "fade-in": {
          "0%": {
            opacity: 0,
          },
          "100%": {
            opacity: 1,
          },
        },
        "fade-out": {
          "0%": {
            opacity: 1,
          },
          "100%": {
            opacity: 0,
          },
        },
        "scale-in": {
          "0%": {
            opacity: "0",
            scale: "0.8",
          },
          "100%": {
            opacity: "1",
            scale: "1",
          },
        },

        "scale-out": {
          "0%": {
            opacity: "1",
            scale: "1",
          },
          "100%": {
            opacity: "0",
            scale: "0.8",
          },
        },
      },

      animation: {
        "fade-in": "fade-in 0.2s ease-out",
        "fade-out": "fade-out 0.2s ease-out",

        "scale-in": "fade-in 0.2s ease-out, scale-in 0.2s ease-out",
        "scale-out": "fade-out 0.2s ease-out, scale-out 0.2s ease-out",

        "accordion-expand":
          "accordion-expand 0.2s ease-in-out, fade-in 0.4s ease-in-out",
        "accordion-collapse":
          "accordion-collapse 0.2s ease-in-out, fade-out 0.4s ease-in-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
