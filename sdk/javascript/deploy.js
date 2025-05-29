import { spawn } from "node:child_process";
import { readFile, writeFile } from "node:fs/promises";
import inquirer from "inquirer";
import semver from "semver";

// Prompt user to select version increment
const packageJsonPath = "./package.json";

const runCommand = command =>
  new Promise((resolve, reject) => {
    const [process, ...args] = command.split(" ");

    spawn(process, args, { stdio: "inherit" }).once("close", exitCode =>
      exitCode === 0 ? resolve() : reject(exitCode)
    );
  });

const [answers, packageJson] = await Promise.all([
  inquirer.prompt([
    {
      type: "list",
      name: "versionType",
      message: "Select version increment:",
      choices: ["patch", "minor", "major"]
    }
  ]),
  readFile(packageJsonPath).then(JSON.parse)
]);

await runCommand("npm run build");

// Increment the version
const newVersion = semver.inc(packageJson.version, answers.versionType);

packageJson.version = newVersion;

console.log(`Updated version to ${newVersion}`);

await Promise.all([
  // Write the updated package.json back to file
  writeFile(packageJsonPath, JSON.stringify(packageJson, null, 2), "utf8"),
  // Run npm publish
  runCommand("npm publish")
    .then(() => console.log("npm publish succeeded"))
    .catch(() => console.log("npm publish failed"))
]);
