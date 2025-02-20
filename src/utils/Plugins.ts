import { EditorProps } from "@grapesjs/react";

export const plugins: EditorProps["plugins"] = [
  {
    id: "gjs-blocks-basic",
    src: "https://unpkg.com/grapesjs-blocks-basic",
  },
  {
    id: "grapesjs-custom-code",
    src: "https://unpkg.com/grapesjs-custom-code",
  },
  {
    id: "grapesjs-project-manager",
    src: "https://unpkg.com/grapesjs-project-manager",
  },
  {
    id: "grapesjs-script-editor",
    src: "https://unpkg.com/grapesjs-script-editor",
  },
  {
    id: "grapesjs-parser-postcss",
    src: "https://unpkg.com/grapesjs-parser-postcss",
  },
  {
    id: "grapesjs-style-gradient",
    src: "https://unpkg.com/grapesjs-style-gradient",
  },
  {
    id: "@silexlabs/grapesjs-fonts",
    src: "https://unpkg.com/@silexlabs/grapesjs-fonts",

    options: {
      api_key: process.env.REACT_APP_API_KEY,
      fonts: {
        Montserrat: "https://fonts.googleapis.com/css?family=Montserrat",
        "Open Sans": "https://fonts.googleapis.com/css?family=Open+Sans",
      },
      // Add other plugin options here
    },
  },
  // Add more plugins as needed
];
