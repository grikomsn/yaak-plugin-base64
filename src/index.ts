import type { PluginDefinition } from "@yaakapp/api";
import { base64Plugins } from "./plugins/base64";

export const plugin: PluginDefinition = {
  templateFunctions: [
    ...base64Plugins,
    //
  ],
};
