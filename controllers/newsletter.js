const Newsletter = require("../models/Newsletter");
const HttpError = require("../models/HttpError");
const { validationResult } = require("express-validator");

exports.signupForNewsletter = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError("Invalid inputs passed, please check your data.", 422)
    );
  }
  const { email } = req.body;

  let existing;
  try {
    existing = await Newsletter.findOne({ email: email });
  } catch (err) {
    const error = new HttpError("Could not save newsletter");
    return next(error);
  }

  if (existing) {
    const error = new HttpError("You are already signup");
    return next(error);
  }

  const createdNewsletter = new Newsletter({
    email,
  });

  try {
    await createdNewsletter.save();
  } catch (err) {
    const error = new HttpError("Could not save newsletter");
    return next(error);
  }

  res.status(200).json({ message: "Newsletter saved" });
};
