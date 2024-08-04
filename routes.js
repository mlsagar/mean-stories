const express = require("express");
const { allStories, oneStory, partialUpdateStory } = require("./controller");

const router = express.Router();

router.route("/stories")
    .get(allStories)

router.route("/stories/:storyId")
    .get(oneStory)
    .patch(partialUpdateStory)

module.exports = router;