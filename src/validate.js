import * as core from "@actions/core"
import * as github from "@actions/github"

// check if theres a beet.json and requirements.txt
// check if the requirements.txt has "beet"
// if not, die

try {
    core.info("ran validate.js")
} catch (error) {
    core.setFailed(error.message)
}