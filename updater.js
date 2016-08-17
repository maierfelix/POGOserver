import fs from "fs";
import rimraf from "rimraf";
import git from "nodegit";
import dirTree from "directory-tree";
import exists from "fs-exists-sync";

let tmpDir = "./tmp";
let cloneDir = JSON.parse(fs.readFileSync("./package.json")).repository.url;

let ignore = [".git", "cfg.js"];

function deleteFolder(path) {
  return new Promise((resolve) => {
    try {
      rimraf(path, (error) => {
        resolve();
      });
    } catch (e) { console.log(e); }
  });
}

function deleteFile(path) {
  if (exists(path)) {
    fs.unlinkSync(path);
  }
}

function skip() {
  return new Promise((resolve) => {
    deleteFolder(tmpDir).then(() => {
      console.log(`Skipped update to version ${newVersion}`);
      resolve();
    });
  });
}

function updateProject() {
  return new Promise((resolve) => {
    let newFiles = dirTree("./tmp");
    // only walk root tree
    for (let node of newFiles.children) {
      let name = node.name;
      if (ignore.indexOf(name) > -1) continue;
      let isDir = node.hasOwnProperty("children");
      if (isDir) console.log("Path: ", name);
      else console.log("File: ", name);
      if (isDir) deleteFolder(name);
      else deleteFile(name);
    };
    resolve();
  });
}

export function update() {
  return new Promise((resolve) => {
    console.log("Preparing to update..");
    setTimeout(() => {
      deleteFolder(tmpDir).then(() => {
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
            console.log(`Updating to version ${newVersion}`);
            updateProject().then(() => {
              deleteFolder(tmpDir).then(() => {
                console.log("Update successfully completed, please restart!");
                resolve();
              });
            });
          });
        }, 2e3);
      });
    }, 1e3);
  });
}