// routes/user.routes.js

const express = require("express");
const {
  signUp,
  login,
  logout,
  getCouponCode,
  bookShow,
} = require("../controllers/userController");

const router = express.Router();

// 1. SignUp route for a new user
router.post("/auth/signup", async (req, res) => {
  try {
    await signUp(req, res);
  } catch (error) {
    res.status(500).send({ message: "An error occurred during signup." });
  }
});

// 2. Login route
router.post("/auth/login", async (req, res) => {
  try {
    await login(req, res);
  } catch (error) {
    res.status(500).send({ message: "An error occurred during login." });
  }
});

// 3. Logout route
router.post("/auth/logout", async (req, res) => {
  try {
    await logout(req, res);
  } catch (error) {
    res.status(500).send({ message: "An error occurred during logout." });
  }
});

// 4. Coupon route
router.get("/auth/coupons", async (req, res) => {
  try {
    await getCouponCode(req, res);
  } catch (error) {
    res
      .status(500)
      .send({ message: "An error occurred while fetching coupon codes." });
  }
});

// 5. Book show for user
router.post("/auth/bookings", async (req, res) => {
  try {
    await bookShow(req, res);
  } catch (error) {
    res
      .status(500)
      .send({ message: "An error occurred while booking the show." });
  }
});

// Export the router
module.exports = router;
