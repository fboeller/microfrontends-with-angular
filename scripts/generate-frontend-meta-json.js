/* eslint-env es6 */
/*
 * HOW TO USE:
 * First execute the build command for your frontend, e.g. nx run reports:build
 * Now call this script and provide it with the build output directory:
 * node generate-frontend-meta-json.js buildDir='projects/bookings/dist'
 *
 * It will write a "frontend-meta.json" into the provided directory.
 */

const path = require("path");
const fs = require("fs");

const projectRoot = path.resolve(__dirname, "../");
const buildDirectory = path.resolve(projectRoot, getBuildDirectoryInput());

fs.readdir(buildDirectory, (err, filesInBuildDirectory) => {
  if (err) {
    throw new Error(`Directory ${buildDirectory} could not be found`);
  }

  const frontendMetaData = generateFrontendMetaData(filesInBuildDirectory);
  const targetFile = path.resolve(buildDirectory, "frontend-meta.json");
  const frontendMetaDataString = JSON.stringify(frontendMetaData);
  fs.writeFileSync(targetFile, frontendMetaDataString);

  console.log(
    `Wrote the following data to ${targetFile}: ${frontendMetaDataString}`
  );
});

/**
 * @typedef FrontendMetaData
 * @type {object}
 * @property {string} entryPointBundleName - The name of the bundle used as entrypoint for the frontend application
 */

/**
 * @param {string[]} filesInBuildDirectory
 * @returns {FrontendMetaData}
 */
function generateFrontendMetaData(filesInBuildDirectory) {
  const mainBundleName = filesInBuildDirectory.find((fileName) => {
    return fileName.startsWith("main.") && fileName.endsWith(".js");
  });

  if (!mainBundleName) {
    throw new Error("Could not find the entrypoint main bundle");
  }

  return {
    entryPointBundleName: mainBundleName,
  };
}

/**
 * @returns {string}
 */
function getBuildDirectoryInput() {
  const firstInput = process.argv[2];
  const [paramName, paramValue] = firstInput.split("=");
  if (paramName !== "buildDir") {
    throw new Error(
      `You need to provide a value for the "buildDir" parameter. E.g. "node generate-frontend-meta-json.js buildDir='dist/apps/reports'`
    );
  }
  return paramValue;
}
