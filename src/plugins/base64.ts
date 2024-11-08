import type { TemplateFunctionPlugin } from "@yaakapp/api/lib/plugins/TemplateFunctionPlugin";

export const prefix = "base64";

export const encodeText: TemplateFunctionPlugin = {
  name: `${prefix}.encodeText`,
  args: [
    { name: "text", type: "text", label: "Text" },
    //
  ],
  async onRender(_ctx, args) {
    if (!args.values.text) return null;
    try {
      return Buffer.from(args.values.text).toString("base64");
    } catch (err) {
      return `base64 encode failed: ${
        err instanceof Error ? err.message : String(err)
      }`;
    }
  },
};

export const decodeText: TemplateFunctionPlugin = {
  name: `${prefix}.decodeText`,
  args: [
    { name: "text", type: "text", label: "Base64 Text" },
    //
  ],
  async onRender(_ctx, args) {
    if (!args.values.text) return null;
    try {
      return Buffer.from(args.values.text, "base64").toString("utf-8");
    } catch (err) {
      return `base64 decode failed: ${
        err instanceof Error ? err.message : String(err)
      }`;
    }
  },
};

export const encodeFile: TemplateFunctionPlugin = {
  name: `${prefix}.encodeFile`,
  args: [
    { name: "file", type: "file", title: "File", multiple: false },
    //
  ],
  async onRender(_ctx, args) {
    if (!args.values.file) return null;
    try {
      const fs = await import("fs/promises");
      let encoded = await fs.readFile(args.values.file, { encoding: "base64" });
      if (args.purpose === "preview") {
        encoded = `${encoded.slice(0, 20)}...${encoded.slice(-20)}`;
      }
      return encoded;
    } catch (err) {
      return `base64 encode failed: ${
        err instanceof Error ? err.message : String(err)
      }`;
    }
  },
};

export const base64Plugins: TemplateFunctionPlugin[] = [
  encodeText,
  decodeText,
  encodeFile,
];
