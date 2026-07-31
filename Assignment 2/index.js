/**
 * Assignment 2 - Abdelrahman Ayman
 */

const fs = require("fs");
const path = require("path");
const os = require("os");
const EventEmitter = require("events");

// Log the current file path and directory

function logCurrentPathAndDir() {
  const result = {
    File: __filename,
    Dir: __dirname,
  };
  console.log(result);
  return result;
}

// Return the file name from a given path

function getFileName(filePath) {
  const result = path.basename(filePath);
  console.log(result);
  return result;
}

// Build a path from an object

function buildPath({ dir, name, ext }) {
  const result = path.format({ dir, name, ext });
  console.log(result);
  return result;
}

// Return the file extension from a given path

function getFileExtension(filePath) {
  const result = path.extname(filePath);
  console.log(result);
  return result;
}

// Parse a path and return its name and ext

function parsePath(filePath) {
  const parsed = path.parse(filePath);
  const result = { Name: parsed.name, Ext: parsed.ext };
  console.log(result);
  return result;
}

// Check whether a given path is absolute

function isAbsolutePath(filePath) {
  const result = path.isAbsolute(filePath);
  console.log(result);
  return result;
}

// Join multiple segments

function joinSegments(...segments) {
  const result = path.join(...segments);
  console.log(result);
  return result;
}

// Resolve a relative path to an absolute one

function resolvePath(relativePath) {
  const result = path.resolve(relativePath);
  console.log(result);
  return result;
}

// Join two paths

function joinTwoPaths(p1, p2) {
  const result = path.join(p1, p2);
  console.log(result);
  return result;
}

// Delete a file asynchronously

function deleteFileAsync(filePath) {
  fs.unlink(filePath, (err) => {
    if (err) {
      console.error(`Error deleting file: ${err.message}`);
      return;
    }
    console.log(`The ${path.basename(filePath)} is deleted.`);
  });
}

// Create a folder synchronously

function createFolderSync(folderPath) {
  try {
    fs.mkdirSync(folderPath, { recursive: true });
    console.log("Success");
    return "Success";
  } catch (err) {
    console.error(`Error creating folder: ${err.message}`);
  }
}

// Event emitter that listens for "start" event

const emitter = new EventEmitter();

emitter.on("start", () => {
  console.log("Welcome event triggered!");
});

// emitter.emit("start")

// Emit a custom "login" event with a username

emitter.on("login", (username) => {
  console.log(`User logged in: ${username}`);
});

function emitLogin(username) {
  emitter.emit("login", username);
}

// Read a file synchronously and log its contents

function readFileSyncAndLog(filePath) {
  try {
    const content = fs.readFileSync(filePath, "utf-8");
    console.log(content);
    return content;
  } catch (err) {
    console.error(`Error reading file: ${err.message}`);
  }
}

// Write asynchronously to a file

function writeFileAsync(filePath, content) {
  fs.writeFile(filePath, content, (err) => {
    if (err) {
      console.error(`Error writing file: ${err.message}`);
      return;
    }
    console.log(`Content saved to ${filePath}`);
  });
}

// Check if a directory (or path) exists

function checkExists(targetPath) {
  const result = fs.existsSync(targetPath);
  console.log(result);
  return result;
}

// Return the OS platform and CPU architecture

function getPlatformAndArch() {
  const result = { Platform: os.platform(), Arch: os.arch() };
  console.log(result);
  return result;
}

// logCurrentPathAndDir();
// getFileName("/user/files/report.pdf");
// buildPath({ dir: "/folder", name: "app", ext: ".js" });
// getFileExtension("/docs/readme.md");
// parsePath("/home/app/main.js");
// isAbsolutePath("/home/user/file.txt");
// joinSegments("src", "components", "App.js");
// resolvePath("./index.js");
// joinTwoPaths("/folder1", "folder2/file.txt");
// deleteFileAsync("./file.txt");
// createFolderSync("./newFolder");
// emitter.emit("start");
// emitLogin("Ahmed");
// readFileSyncAndLog("./notes.txt");
// writeFileAsync("./async.txt", "Async save");
// checkExists("./notes.txt");
// getPlatformAndArch();
