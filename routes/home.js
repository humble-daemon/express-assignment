const express = require("express");
const router = express.Router();

router.get("/", (req, res)=>{
    res.send("explore books!");
});

router.get("/about", (req, res)=>{
    res.send("a simple express api project, with CRUD functionality.");
});

module.exports = router;