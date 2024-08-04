require("./data/db");

const express = require("express");
const routes = require("./routes")

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use("/api", (request, response, next) => {
    response.setHeader("Access-Control-Allow-Origin", "http://localhost:4200")   
    response.setHeader("Access-Control-Allow-Methods", "PATCH")   
    response.setHeader("Access-Control-Allow-Headers", "content-type")   
    next();
})

app.use("/api", routes);

app.listen(3000, console.log(`Listening at 3000`))