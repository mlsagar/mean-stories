const { response } = require("express");
const mongoose = require("mongoose");
const Story = mongoose.model("Story");

const allStories = function(request, response) {
    let count = 5;
    let offset = 0;
    const maxCount = 10;

    if (request.query && request.query.offset) {
        offset = request.query.offset;
    }
    if (request.query && request.query.count) {
        count = request.query.count;
    }
    if(isNaN(count) || isNaN(offset)) {
        response.status(401).json({message: "Invalid offset or count"})
        return;
    }
    if(count > maxCount) {
        response.status(401).json({message: "Count should be less or equal to 10"})
        return;
    }
    const responseCollection = _createResponseCollection();

    Story.find().limit(count).skip(offset).exec()
        .then(stories => {
            if(!stories) {
                responseCollection.status = 404;
                responseCollection.message = {message: "Stories not foune"}
                return;
            }

            responseCollection.status = 200;
            responseCollection.message = stories;
        })
        .catch((error) => {
            responseCollection.status = 500;
            responseCollection.message = error
        })
        .finally(() => _sendResponse(response, responseCollection))

}

const oneStory = function(request, response) {
    const storyId = request.params.storyId;

    if (!mongoose.isValidObjectId(storyId)) {
        response.status(401).json({message: "Invalid story ID"})
        return;
    }

    const responseCollection = _createResponseCollection();

    Story.findById(storyId).exec()
        .then(story => {
            if(!story) {
                responseCollection.status = 404;
                responseCollection.message = {message: "Story ID not foung"}
                return;
            }

            responseCollection.status = 200;
            responseCollection.message = story;
        })
        .catch((error) => {
            responseCollection.status = 500;
            responseCollection.message = error
        })
        .finally(() => _sendResponse(response, responseCollection))

}

const partialUpdateStory = function(request, response) {
    const storyId = request.params.storyId;

    if (!mongoose.isValidObjectId(storyId)) {
        response.status(401).json({message: "Invalid story ID"})
        return;
    }

    const responseCollection = _createResponseCollection();

    Story.findById(storyId).exec()
        .then(story => {
            if(!story) {
                responseCollection.status = 404;
                responseCollection.message = {message: "Story ID not foung"}
                return;
            }

            console.log(request.body);

            if(request.body && request.body.title) {story.title = request.body.title}
            if(request.body && request.body.container) {story.container = request.body.container}
            if(request.body && request.body.topic) {story.topic = request.body.topic}
            if(request.body && request.body.media) {story.media = request.body.media}
            if(request.body && request.body.comments) {story.comments = request.body.comments}
            if(request.body && request.body.description) {story.description = request.body.description}
            if(request.body && request.body.status) {story.status = request.body.status}

            return story.save();
        })
        .then(saveStory => {
            if(saveStory) {
                responseCollection.status = 200;
                responseCollection.message = {message: "Successfully partial update story"}
            }
            
        })
        .catch((error) => {
            responseCollection.status = 500;
            responseCollection.message = error
        })
        .finally(() => _sendResponse(response, responseCollection))

}

const _createResponseCollection = function() {
    return {
        status: 201,
        message: ""
    }
}

const _sendResponse = function(response, responseCollection) {
    response.status(responseCollection.status).json(responseCollection.message);
}

module.exports = {
    allStories,
    oneStory,
    partialUpdateStory
}