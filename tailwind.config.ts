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
        },

        muted: {
          DEFAULT: "rgb(var(--muted) / <alpha-value>)",
          text: "rgb(var(--muted-text) / <alpha-value>)",
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

        danger: {
          DEFAULT: "rgb(var(--danger) / <alpha-value>)",
          text: "rgb(var(--danger-text) / <alpha-value>)",
        },

        warning: {
          DEFAULT: "rgb(var(--warning) / <alpha-value>)",
          text: "rgb(var(--warning-text) / <alpha-value>)",
        },

        success: {
          DEFAULT: "rgb(var(--success) / <alpha-value>)",
          text: "rgb(var(--success-text) / <alpha-value>)",
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
      },
    },
  },
  plugins: [],
};
