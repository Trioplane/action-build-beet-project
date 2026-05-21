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

    core.info(`Checking for ${PATH_TO.REQUIREMENTS}`)
    if (!fs.existsSync(PATH_TO.REQUIREMENTS)) {
        const err = new Error(`${PATH_TO.REQUIREMENTS} does not exist.`)
        core.setFailed(err)
        throw err
    }
    
    core.info(`Checking for ${PATH_TO.BEET}`)
    if (!fs.existsSync(PATH_TO.BEET)) {
        const err = new Error(`${PATH_TO.BEET} does not exist.`)
        core.setFailed(err)
        throw err
    }

    const requirementstxt = fs.readFileSync(PATH_TO.REQUIREMENTS, { encoding: "utf-8" })
    core.info(requirementstxt)

    core.info(`includes beet: ${requirementstxt.includes("beet")}`)
    core.info(`char codes: ${[...requirementstxt.slice(0, 5)].map(c => c.charCodeAt(0))}`)

    if (!requirementstxt.includes("beet")) {
        const err = new Error(`beet is not in ${PATH_TO.REQUIREMENTS}`)
        core.setFailed(err)
        throw err
    }


    core.info("ran validate.js")
} catch (error) {
    core.setFailed(error.message)
    process.exit(1)
}