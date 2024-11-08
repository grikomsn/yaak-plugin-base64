const fs = require("fs/promises");
const path = require("path");

async function script() {
  const packageJson = require("../package.json");
  packageJson.name = "@grikomsn/yaak-plugin-base64";
  const dest = path.resolve(__dirname, "../package.json");
  await fs.writeFile(dest, `${JSON.stringify(packageJson, null, 2)}\n`);
}

void script();
