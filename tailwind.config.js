module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {},
  },
  daisyui: {
    themes: [
      {
        gadgets_emporium_theme: {
          primary: "#5a4b47",
          secondary: "#111430",
          accent: "#FF4545",
          neutral: "#3d4451",
          success: "#00C853",
          warning: "#FFB300",
          error: "#009444",
          "base-100": "#ffffff",
          "base-200": "#FFF0F5",
          "base-300": "#f5f6fa",
        },
      },
      "night",
    ],
  },
  plugins: [require("daisyui")],
};
