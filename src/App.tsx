import GjsEditor from "@grapesjs/react";
import type { Editor } from "grapesjs";
import { plugins } from "./utils/Plugins";
import { gjsOptions } from "./utils/common";
import FullSpinner from "./components/Loader";

import { videoBackgroundPlugin } from "./components/videoBackgroundPlugin";

export default function App() {
  const onEditor = async (editor: Editor) => {};
  const enhancedPlugins = [...(plugins || []), videoBackgroundPlugin];
  return (
    <GjsEditor
      className="gjs-default-editor"
      grapesjs="https://unpkg.com/grapesjs"
      grapesjsCss="https://unpkg.com/grapesjs/dist/css/grapes.min.css"
      options={gjsOptions}
      plugins={enhancedPlugins}
      onEditor={onEditor}
      waitReady={<FullSpinner />}
    />
  );
}
