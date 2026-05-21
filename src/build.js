import * as core from "@actions/core"
import * as github from "@actions/github"
import { spawn } from "child_process"
import { once } from "events"
import * as fs from "fs"
import path from "path"


// read the beet.json to get name, version, output folder, dp folder, rp folder, etc...
// build the project using beet
// set the output to the name, version, output folder, dp folder, rp folder, etc...

try {
    const BEET_PROJECT_OUTPUT = process.env["BEET_PROJECT_OUTPUT"]
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

    const OUTPUT_DIR_CONTENTS = fs.readdirSync(BEET_PROJECT_OUTPUT)
    const DATA_PACKS = []
    const RESOURCE_PACKS = []
    const UNKNOWN_FILES = []

    for (const entry of OUTPUT_DIR_CONTENTS) {
        const fullPath = path.join(BEET_PROJECT_OUTPUT, entry)
        const stat = fs.statSync(fullPath)
        const name = stat.isFile() ? path.parse(entry).name : entry

        if (name.endsWith('data_pack')) DATA_PACKS.push(fullPath)
        else if (name.endsWith('resource_pack')) RESOURCE_PACKS.push(fullPath)
        else UNKNOWN_FILES.push(fullPath)
    }

    core.info(`🔵 Data Packs: ${DATA_PACKS}`)
    core.info(`🔵 Resource Packs: ${RESOURCE_PACKS}`)
    core.info(`🔵 Unknown Files: ${UNKNOWN_FILES}`)

    core.setOutput("data-packs", JSON.stringify(DATA_PACKS))
    core.setOutput("resource-packs", JSON.stringify(RESOURCE_PACKS))
    core.setOutput("unknown-files", JSON.stringify(UNKNOWN_FILES))
} catch (error) {
    core.setFailed(error.message)
}