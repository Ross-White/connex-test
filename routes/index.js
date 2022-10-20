const express = require('express');
const router = express.Router();
const Validator = require('jsonschema').Validator;
const timeController = require("../service/timeController");

const validate = new Validator;
const timeSchema = {
    "properties": {
        "epoch": {
        "description": "The current server time, in epoch seconds, at time of processing the request.",
        "type": "number"
        }
        },
        "required": ["epoch"],
        "type": "object"
}

router.get("/time", async () => {
    const res = await timeController.getTime();
    console.log("RES", res)
    const isValid = validate.validate(res, timeSchema).valid;
    console.log("IS_VALID", isValid);
    if (!isValid) {
        res.status = 500;
        return;
    } 
    res.status = 200;
});

module.exports = router;