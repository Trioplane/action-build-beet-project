import * as core from "@actions/core"
import * as github from "@actions/github"
import * as fs from "fs"
import * as path from "path"

try {
    const BEET_DIR = core.getInput('beet-dir')
    const PATH_TO = {
        REQUIREMENTS: path.join(BEET_DIR, "requirements.txt"),
        BEETJSON: path.join(BEET_DIR, "beet.json"),
        BEETYAML: path.join(BEET_DIR, "beet.yaml"),
        BEETYML: path.join(BEET_DIR, "beet.yml"),
        BEETPYPROJECT: path.join(BEET_DIR, "pyproject.toml"),
    }

    core.info(`🟡 Checking for ${PATH_TO.REQUIREMENTS}`)
    if (!fs.existsSync(PATH_TO.REQUIREMENTS)) {
        const err = new Error(`${PATH_TO.REQUIREMENTS} does not exist`)
        core.setFailed(err)
        throw err
    }
    core.info(`🟢 ${PATH_TO.REQUIREMENTS} exists`)
    
    const BEET_CONFIGS = [
        PATH_TO.BEETJSON,
        PATH_TO.BEETYAML,
        PATH_TO.BEETYML,
        PATH_TO.BEETPYPROJECT,
    ]

    const beetConfig = BEET_CONFIGS.find(configFile => fs.existsSync(configFile))
    if (!beetConfig) {
        const err = new Error(`No beet config file found in ${BEET_DIR}`)
        core.setFailed(err)
        throw err
    }
    core.info(`🟢 Found beet config at: ${beetConfig}`)

    const requirementstxt = fs.readFileSync(PATH_TO.REQUIREMENTS, { encoding: "utf-8" })
    if (!requirementstxt.includes("beet")) {
        const err = new Error(`beet is not in ${PATH_TO.REQUIREMENTS}`)
        core.setFailed(err)
        throw err
    }
    core.info(`🟢 requirements.txt has beet`)

    core.info("✅ Successfully validated")

    core.setOutput("requirements-txt-path", PATH_TO.REQUIREMENTS)
    core.setOutput("beet-config-path", beetConfig)
} catch (error) {
    core.setFailed(error)
    process.exit(1)
}