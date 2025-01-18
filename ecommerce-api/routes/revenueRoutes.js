const express = require("express");
const {
  getRevenueByPeriod,
  getLifetimeRevenue,
} = require("../controllers/revenueController");

const router = express.Router();

router.get("/total-revenue", getRevenueByPeriod);

router.get("/lifetime-revenue", getLifetimeRevenue);

module.exports = router;
