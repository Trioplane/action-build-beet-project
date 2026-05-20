import * as core from "@actions/core"
import * as github from "@actions/github"

// read the beet.json to get name, version, output folder, dp folder, rp folder, etc...
// build the project using beet
// set the output to the name, version, output folder, dp folder, rp folder, etc...

try {
    core.info("ran build.js")
} catch (error) {
    core.setFailed(error.message)
}