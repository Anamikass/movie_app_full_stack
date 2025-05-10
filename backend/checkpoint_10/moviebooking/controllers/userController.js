// controllers/user.controller.js
const TokenGenerator = require("uuid-token-generator");
const { fromString } = require("uuidv4");
const User = require("../models/userModel");
const { atob } = require("b2a");
const crypto = require("crypto");

// Utility function to handle errors
const handleError = (res, err, defaultMessage) => {
  console.error(err); // Log the error for debugging
  res.status(500).send({
    message: err.message || defaultMessage,
  });
};

// Login function
const login = async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Basic ")) {
      return res
        .status(401)
        .send({ message: "Authorization header is missing or invalid." });
    }

    const authToken = authHeader.split(" ")[1];
    const unamePwd = atob(authToken);
    const [uname, pwd] = unamePwd.split(":");

    if (!uname || !pwd) {
      return res
        .status(400)
        .send({ message: "Please provide username and password to continue." });
    }

    const user = await User.findOne({ username: uname });
    if (!user) {
      return res.status(404).send({ message: "User Not Found." });
    }

    if (pwd === user.password) {
      const tokgen = new TokenGenerator();
      const accessTokenGenerated = tokgen.generate();
      const uuidGenerated = crypto
        .createHash("sha256")
        .update(username + Date.now().toString())
        .digest("hex");

      user.isLoggedIn = true;
      user.uuid = uuidGenerated;
      user.accesstoken = accessTokenGenerated;

      const updatedUser = await User.findOneAndUpdate(
        { username: uname },
        user,
        { new: true, useFindAndModify: false }
      );

      res.header("access-token", updatedUser.accesstoken);
      res.send({
        id: updatedUser.uuid,
        "access-token": updatedUser.accesstoken,
      });
    } else {
      res.status(401).send({ message: "Invalid password." });
    }
  } catch (err) {
    handleError(res, err, "Internal server error.");
  }
};

// Signup function
const signUp = async (req, res) => {
  try {
    const {
      email_address,
      first_name,
      last_name,
      password,
      mobile_number,
      role = "user",
    } = req.body;

    // Check if all required fields are present
    if (
      !email_address ||
      !first_name ||
      !last_name ||
      !password ||
      !mobile_number
    ) {
      return res
        .status(400)
        .send({ message: "All required fields must be provided." });
    }

    // Concatenate first and last name for username
    const username = `${first_name}${last_name}`;
    // Generate a unique UUID based on userName
    const uuid = crypto
      .createHash("sha256")
      .update(username + Date.now().toString())
      .digest("hex");

    // Create the new user with a generated uuid
    const user = new User({
      email: email_address,
      first_name,
      last_name,
      username,
      password,
      contact: mobile_number,
      role,
      isLoggedIn: false,
      uuid: uuid, // Generate a unique UUID
      accesstoken: "",
      coupens: [],
      bookingRequests: [],
    });

    const savedUser = await user.save();
    res.send(savedUser);
  } catch (err) {
    handleError(res, err, "Some error occurred, please try again later.");
  }
};

// Logout function
const logout = async (req, res) => {
  try {
    if (!req.body.uuid) {
      return res.status(400).send({ message: "ID Not Found!" });
    }

    const update = { isLoggedIn: false, uuid: "", accesstoken: "" };
    const data = await User.findOneAndUpdate({ uuid: req.body.uuid }, update, {
      new: true,
    });

    if (!data) {
      return res.status(404).send({ message: "User not found." });
    }

    res.send({ message: "Logged Out successfully." });
  } catch (err) {
    handleError(res, err, "Error updating.");
  }
};

// Function to get coupon code
const getCouponCode = async (req, res) => {
  try {
    const tokenReceived = req.headers.authorization.split(" ")[1];

    const user = await User.findOne({ accesstoken: tokenReceived });
    if (!user) {
      return res
        .status(404)
        .send({ message: "Some error occurred, please try again later." });
    }
    const coupon = user.coupens.find((c) => c.id == req.query.code);
    res.send(coupon || { message: "Coupon not found." });
  } catch (err) {
    handleError(res, err, "Error validating token.");
  }
};

// Function to book a show
const bookShow = async (req, res) => {
  try {
    if (!req.body.customerUuid) {
      return res.status(400).send({ message: "ID Not Found!" });
    }
    const user = await User.findOne({ uuid: req.body.customerUuid });
    if (!user) {
      return res.status(404).send({ message: "User not found." });
    }

    console.log(
      "Currently Available Booking Requests Data of User",
      user.bookingRequests
    );

    const newRefNo =
      new Date().getMilliseconds().toString() +
      Math.floor(Math.random() * 100).toString();
    req.body.bookingRequest.reference_number = newRefNo;

    user.bookingRequests.push(req.body.bookingRequest);

    await user.save();
    res.send({ reference_number: newRefNo });
  } catch (err) {
    handleError(res, err, "Error validating token.");
  }
};

// Exporting all functions
module.exports = {
  login,
  signUp,
  logout,
  getCouponCode,
  bookShow,
};
