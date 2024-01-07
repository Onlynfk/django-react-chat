/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#101011",
        secondary: "#ADAAAA",
        "button":"#439bd7"
      },
      fontFamily: {
        'display': ['Poppins'],
      },
      backgroundImage: {
        'main': "url('images/main.jpeg')",
      },
    },
    letterSpacing: {
      tightest: '-.075em',
      tighter: '-.05em',
      tight: '-.025em',
      normal: '0',
      wide: '.025em',
      wider: '.05em',
      widest: '.1em',
      "wider-widest": '.25em',
    }
  },
  plugins: [],
}

