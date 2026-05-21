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

    core.info(`:blue_circle: requirements.txt is presumably at: ${PATH_TO.REQUIREMENTS}`)
    core.info(`:blue_circle: beet.json is presumably at: ${PATH_TO.BEET}`)

    core.info(`:yellow_circle: Checking for ${PATH_TO.REQUIREMENTS}`)
    if (!fs.existsSync(PATH_TO.REQUIREMENTS)) {
        const err = new Error(`${PATH_TO.REQUIREMENTS} does not exist`)
        core.setFailed(err)
        throw err
    }
    core.info(`:green_circle: ${PATH_TO.REQUIREMENTS} exists`)
    
    core.info(`:yellow_circle: Checking for ${PATH_TO.BEET}`)
    if (!fs.existsSync(PATH_TO.BEET)) {
        const err = new Error(`${PATH_TO.BEET} does not exist`)
        core.setFailed(err)
        throw err
    }
    core.info(`:green_circle: ${PATH_TO.BEET} exists`)

    const requirementstxt = fs.readFileSync(PATH_TO.REQUIREMENTS, { encoding: "utf-8" })
    if (!requirementstxt.includes("beet")) {
        const err = new Error(`beet is not in ${PATH_TO.REQUIREMENTS}`)
        core.setFailed(err)
        throw err
    }
    core.info(`:green_circle: requirements.txt has beet`)

    core.info(":white_check_mark: Successfully validated")
} catch (error) {
    core.setFailed(error.message)
    process.exit(1)
}