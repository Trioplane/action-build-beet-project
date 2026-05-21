import * as core from "@actions/core"
import * as github from "@actions/github"
import * as fs from "fs"

// read the beet.json to get name, version, output folder, dp folder, rp folder, etc...
// build the project using beet
// set the output to the name, version, output folder, dp folder, rp folder, etc...

try {
    const BEET_PROJECT_NAME = process.env["BEET_PROJECT_NAME"]
    const BEET_PROJECT_VERSION = process.env["BEET_PROJECT_VERSION"]
    const BEET_PROJECT_OUTPUT = process.env["BEET_PROJECT_OUTPUT"]

    core.info(`BEET_PROJECT_NAME: ${BEET_PROJECT_NAME}`)
    core.info(`BEET_PROJECT_VERSION: ${BEET_PROJECT_VERSION}`)
    core.info(`BEET_PROJECT_OUTPUT: ${BEET_PROJECT_OUTPUT}`)

    core.info("ran build.js")
} catch (error) {
    core.setFailed(error.message)
}