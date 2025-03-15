module.exports = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
        "slide-diagonal": {
          "0%": { backgroundPosition: "0px 0px" },
          "100%": { backgroundPosition: "60px 60px" },
        },
        "slide-vertical": {
          "0%": { backgroundPosition: "0px 0px" },
          "100%": { backgroundPosition: "0px 50px" },
        },
        "slide-horizontal": {
          "0%": { backgroundPosition: "0px 0px" },
          "100%": { backgroundPosition: "50px 0px" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-20px)" },
        },
        "rotate-slow": {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
        "float-rotate": {
          "0%": { transform: "translateY(0) rotate(0deg)" },
          "50%": { transform: "translateY(-10px) rotate(180deg)" },
          "100%": { transform: "translateY(0) rotate(360deg)" },
        },
        wave: {
          "0%": { backgroundPosition: "0px 0px" },
          "100%": { backgroundPosition: "200px 0px" },
        },
        "pulse-slow": {
          "0%, 100%": { opacity: 0.03 },
          "50%": { opacity: 0.06 },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "slide-diagonal": "slide-diagonal 20s linear infinite",
        "slide-vertical": "slide-vertical 15s linear infinite",
        "slide-horizontal": "slide-horizontal 15s linear infinite",
        float: "float 8s ease-in-out infinite",
        "rotate-slow": "rotate-slow 30s linear infinite",
        "float-rotate": "float-rotate 10s ease-in-out infinite",
        wave: "wave 20s linear infinite",
        "pulse-slow": "pulse-slow 5s ease-in-out infinite",
      },
      backgroundImage: {
        "grid-pattern-light":
          "linear-gradient(to right, rgba(0, 0, 0, 0.1) 1px, transparent 1px), linear-gradient(to bottom, rgba(0, 0, 0, 0.1) 1px, transparent 1px)",
        "grid-pattern-dark":
          "linear-gradient(to right, rgba(255, 255, 255, 0.1) 1px, transparent 1px), linear-gradient(to bottom, rgba(255, 255, 255, 0.1) 1px, transparent 1px)",
        "dot-pattern-light": "radial-gradient(rgba(0, 0, 0, 0.2) 2px, transparent 2px)",
        "dot-pattern-dark": "radial-gradient(rgba(255, 255, 255, 0.2) 2px, transparent 2px)",
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
      },
      backgroundSize: {
        "grid-pattern": "50px 50px",
        "dot-pattern": "30px 30px",
      },
    },
  },
  plugins: [require("tailwindcss-animate"), require("@tailwindcss/typography")],
}

