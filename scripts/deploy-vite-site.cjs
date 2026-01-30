const fs = require("fs");
const path = require("path");

const root = process.cwd();
const dist = path.join(root, "dist");
const site = path.join(root, "site");

if (!fs.existsSync(dist)) {
   console.error("❌ dist folder not found.");
   process.exit(1);
}

fs.rmSync(site, { recursive: true, force: true });
fs.mkdirSync(site, { recursive: true });
fs.cpSync(dist, site, { recursive: true });

console.log("✅ Deployed dist → site");
