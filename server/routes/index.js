const express = require("express");
const router = express.Router();
const Validator = require("jsonschema").Validator;
const timeController = require("../service/timeController");

const validate = new Validator();
const timeSchema = {
  properties: {
    epoch: {
      description:
        "The current server time, in epoch seconds, at time of processing the request.",
      type: "number",
    },
  },
  required: ["epoch"],
  type: "object",
};

router.get("/time", async (req, res) => {
  try {
    const time = await timeController.getTime();
    const isValid = validate.validate(time, timeSchema).valid;
    if (!isValid) {
      res.status = 500;
      return;
    }
    res.status = 200;
    res.send(time)
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
