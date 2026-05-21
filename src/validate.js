import * as core from "@actions/core"
import * as github from "@actions/github"
import * as fs from "fs"
import * as path from "path"

// check if theres a beet.json and requirements.txt
// check if the requirements.txt has "beet"
// if not, die

try {
    const BEET_DIR = core.getInput('beet-dir')
    const PATH_TO = {
        REQUIREMENTS: path.join("requirements.txt"),
        BEET: path.join(BEET_DIR, "beet.json"),
    }

    core.info(PATH_TO.REQUIREMENTS)
    core.info(PATH_TO.BEET)

    core.info("Checking for requirements.txt")
    // if (!fs.readFileSync())

    core.info("ran validate.js")
} catch (error) {
    core.setFailed(error.message)
}