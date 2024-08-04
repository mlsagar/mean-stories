const mongoose = require("mongoose");
require("./story-model.js");
mongoose.connect("mongodb://localhost:27017/meanStories")

mongoose.connection.on("connected", () => console.log("Mongoose Connected"));
mongoose.connection.on("disconnected", () => console.log("Mongoose disConnected"));
mongoose.connection.on("error", (error) => console.log("Mongoose error", error));

process.on("SIGINT", function(){
    mongoose.connection.close().then(() => {
        console.log("Process interruption")
        process.exit(0)
    })
})