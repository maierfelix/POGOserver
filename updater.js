import fs from "fs";
import fse from "fs-extra";
import git from "nodegit";
import dirTree from "directory-tree";

let tmpDir = "./tmp";
let cloneDir = JSON.parse(fs.readFileSync("./package.json")).repository.url;

let ignore = [".git", "cfg.js", "updater.js"];

function skip() {
  return new Promise((resolve) => {
    fse.removeSync(tmpDir);
    console.log(`Skipped update to version ${newVersion}`);
    resolve();
  });
}

function updateProject() {
  return new Promise((resolve) => {
    let newFiles = dirTree("./tmp");
    recurse(newFiles.children);
    resolve();
  });
}

function recurse(parent) {
  for (let key in parent) {
    let name = parent[key].name;
    if (ignore.includes(name)) continue;
    let isDir = parent[key].hasOwnProperty("children");
    try {
      if (!isDir) {
        fse.outputFileSync(parent[key].path.substring(4), fs.readFileSync(parent[key].path));
      }
      else {
        recurse(parent[key].children);
      }
    } catch (e) { console.log(e); }
  };
}

((() => new Promise((resolve) => {
  console.log("Be aware about the updater is experimental!");
  console.log("Preparing to update..");
  setTimeout(() => {
    fse.removeSync(tmpDir);
    let currentVersion = JSON.parse(fs.readFileSync("./package.json")).version;
    console.log(`Your current version is ${currentVersion}!`);
    setTimeout(() => {
      console.log("Fetching latest version..");
      git.Clone(cloneDir, tmpDir).then((res, rofl) => {
        let newVersion = null;
        try {
          newVersion = JSON.parse(fs.readFileSync(`${tmpDir}/package.json`)).version;
        } catch (e) {
          console.log("Version check failed!");
          return resolve();
        }
        if (currentVersion === newVersion) {
          console.log(`You are already running the latest version ${currentVersion}!`);
          skip().then(resolve);
          return void 0;
        }
        else if (currentVersion > newVersion) {
          console.log(`Your version ${currentVersion} is newer than ${newVersion}!`);
          skip().then(resolve);
          return void 0;
        }
        console.log(`Latest version is ${newVersion}`);
        console.log(`Updating to version ${newVersion}`);
        updateProject().then(() => {
          fse.removeSync(tmpDir);
          console.log("Update successfully completed, please restart!");
          resolve();
        });
      });
    }, 2e3);

  }, 1e3);
})))();