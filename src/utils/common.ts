import { EditorConfig } from "grapesjs";

export const gjsOptions: EditorConfig = {
  height: "100vh",
  showOffsets: true,
  noticeOnUnload: false,
  fromElement: true,

  //@ts-ignore
  pageManager: true, // This should be set to true
  allowScripts: 1,
  storeStyles: true,
  storeHtml: true,
  storeCss: true,
  storageManager: {
    type: "indexeddb",
    autoload: true,
    autosave: false,
  },
  undoManager: true,
  // selectorManager: { componentFirst: true },
  pluginsOpts: {
    "@silexlabs/grapesjs-fonts": {
      api_key: "AIzaSyDHaDKRHkduGxbsyWsj0czDvYK-G4uUL60", // Replace with your actual API key
    },
  },
  canvas: {
    styles: [
      "https://fonts.googleapis.com/css?family=Archivo+Narrow:400,400i,700,700i|Roboto:300,300i,400,400i,500,500i,700,700i&subset=latin,latin-ext",
      "https://unpkg.com/grapesjs-project-manager/dist/grapesjs-project-manager.min.css",
      "https://cdn.jsdelivr.net/npm/bootstrap@5.2.0-beta1/dist/css/bootstrap.min.css",
      "https://cdn.jsdelivr.net/npm/select2@4.1.0-rc.0/dist/css/select2.min.css",
      "https://unpkg.com/grapesjs/dist/css/grapes.min.css",
      "https://cdn.mypanel.link/global/c3gyq3shygmabbke.css",
      "https://cdnjs.cloudflare.com/ajax/libs/select2-bootstrap-theme/0.1.0-beta.10/select2-bootstrap.min.css",
      "https://unpkg.com/grapesjs/dist/css/grapes.min.css",
    ],
    scripts: [
      "https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js",
      "https://unpkg.com/sweetalert/dist/sweetalert.min.js",
      "https://demo.flashypanels.com/public/blue_eternity/js1.js",
      "https://demo.flashypanels.com/public/blue_eternity/js2.js",
      "https://demo.flashypanels.com/public/blue_eternity/js3.js",
      "//cdn.jsdelivr.net/npm/sweetalert2@11",
      "https://cdnjs.cloudflare.com/ajax/libs/js-cookie/2.1.3/js.cookie.min.js",
      "https://cdn.jsdelivr.net/npm/select2@4.1.0-rc.0/dist/js/select2.min.js",
      "https://unpkg.com/grapesjs-project-manager",
    ],
  },
  projectData: {
    assets: [
      "https://via.placeholder.com/350x250/78c5d6/fff",
      "https://via.placeholder.com/350x250/459ba8/fff",
      "https://via.placeholder.com/350x250/79c267/fff",
      "https://via.placeholder.com/350x250/c5d647/fff",
      "https://via.placeholder.com/350x250/f28c33/fff",
    ],

    pages: [
      {
        name: "Home page",
        component: `
         
          `,
      },
    ],
  },
};
