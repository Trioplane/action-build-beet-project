import * as core from "@actions/core"
import * as github from "@actions/github"
import { spawn } from "child_process"
import { once } from "events"
import * as fs from "fs"


// read the beet.json to get name, version, output folder, dp folder, rp folder, etc...
// build the project using beet
// set the output to the name, version, output folder, dp folder, rp folder, etc...

try {
    const BEET_PROJECT_NAME = process.env["BEET_PROJECT_NAME"]
    const BEET_PROJECT_VERSION = process.env["BEET_PROJECT_VERSION"]
    const BEET_PROJECT_OUTPUT = process.env["BEET_PROJECT_OUTPUT"]
    core.info(`🔵 BEET_PROJECT_NAME: ${BEET_PROJECT_NAME}`)
    core.info(`🔵 BEET_PROJECT_VERSION: ${BEET_PROJECT_VERSION}`)
    core.info(`🔵 BEET_PROJECT_OUTPUT: ${BEET_PROJECT_OUTPUT}`)

    const beet = spawn('beet', ['build']);

    beet.stdout.on('data', (data) => {
      core.info(`🔵 BEET | ${data}`);
    });

    beet.stderr.on('data', (data) => {
      core.warning(`⚠ BEET | ${data}`);
    });

    const [code] = await once(beet, 'close');
    core.info(`🔵 child process exited with code ${code}`);

    const dir = fs.readdirSync(BEET_PROJECT_OUTPUT)
    core.info(dir)

    core.info("ran build.js")
} catch (error) {
    core.setFailed(error.message)
}