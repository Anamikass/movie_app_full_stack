const TokenGenerator = require("uuid-token-generator");
const { fromString } = require("uuidv4");
// load the schema models
const db = require("../models");
// use the users schema
const User = db.users;
const { atob, btoa } = require("b2a");

exports.login = async (req, res) => {
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

    // Validate request
    if (!uname || !pwd) {
      return res
        .status(400)
        .send({ message: "Please provide username and password to continue." });
    }

    // Use findOne for better performance
    const user = await User.findOne({ username: uname });
    if (!user) {
      return res.status(404).send({ message: "User Not Found." });
    }

    // Check password
    if (pwd === user.password) {
      const tokgen = new TokenGenerator(); // Default is a 128-bit token encoded in base58
      const accessTokenGenerated = tokgen.generate();

      const uuidGenerated = fromString(uname);
      user.isLoggedIn = true;
      user.uuid = uuidGenerated;
      user.accesstoken = accessTokenGenerated;

      // Save updated user info
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
    console.error(err);
    res.status(500).send({ message: "Internal server error." });
  }
};

exports.signUp = (req, res) => {
  console.log(req.body);
  // Validate request
  if (!req.body.email_address && !req.body.password) {
    res
      .status(400)
      .send({ message: "Please provide email and password to continue." });
    return;
  }

  // Create a User
  // Since userName is not asked in react code
  // we are considering concating firstname & lastname as username
  const user = new User({
    email: req.body.email_address,
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    username: req.body.first_name + req.body.last_name,
    password: req.body.password,
    contact: req.body.mobile_number,
    role: req.body.role ? req.body.role : "user",
    isLoggedIn: false,
    uuid: "",
    accesstoken: "",
    coupens: [],
    bookingRequests: [],
  });

  // Save User in the database
  user
    .save(user)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred, please try again later.",
      });
    });
};

exports.logout = (req, res) => {
  // Validate request
  if (!req.body.uuid) {
    res.status(400).send({ message: "ID Not Found!" });
    return;
  }

  const update = { isLoggedIn: false, uuid: "", accesstoken: "" };

  User.findOneAndUpdate({ uuid: req.body.uuid }, update)
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: "Some error occurred, please try again later.",
        });
      } else res.send({ message: "Logged Out successfully." });
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating.",
      });
    });
};
