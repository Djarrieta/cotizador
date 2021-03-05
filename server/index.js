const express = require("express");
require("dotenv").config();
const app = express();
app.get("/", (req, res) => {
	res.send(process.env.TEST);
});

app.listen(3001, console.log("listening 3001"));
