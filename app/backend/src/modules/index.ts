import { Router } from "express";
import fs from "fs";
import path from "path";

const currentDir = __dirname;

export default class Routes {
  router = Router();

  path() {
    // Iterate over vX directories
    fs.readdirSync(currentDir, { withFileTypes: true }).forEach((vDir) => {
      if (vDir.isDirectory()) {
        const version = vDir.name;
        const vXPath = path.join(currentDir, version);

        // Iterate over modules directories
        fs.readdirSync(vXPath, { withFileTypes: true }).forEach((vModule) => {
          if (vModule.isDirectory()) {
            const dirPath = path.join(vXPath, vModule.name);

            // Iterate over module files
            fs.readdirSync(dirPath).forEach((file) => {
              if (file.endsWith("routes.ts")) {
                const route = require(path.join(dirPath, file));
                const module = new route.default();
                const baseRoutePath = `/${version}/${module.path}`;
                this.router.use(baseRoutePath, module.router);
              }
            });
          }
        });
      }
    });

    return this.router;
  }
}
