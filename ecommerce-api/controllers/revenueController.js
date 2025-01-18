const Order = require("../models/orderSchema");

exports.getRevenueByPeriod = async (req, res) => {
  try {
    const { period = "monthly" } = req.query;

    const groupBy = {
      daily: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
      monthly: { $dateToString: { format: "%Y-%m", date: "$createdAt" } },
      yearly: { $dateToString: { format: "%Y", date: "$createdAt" } },
    }[period] || { $dateToString: { format: "%Y-%m", date: "$createdAt" } };

    const revenue = await Order.aggregate([
      {
        $group: {
          _id: groupBy,
          totalRevenue: { $sum: "$totalAmount" },
        },
      },
      { $sort: { _id: 1 } }, // Sort by date
    ]);

    res.status(200).json(revenue);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch revenue data." });
  }
};

exports.getLifetimeRevenue = async (req, res) => {
  try {
    const result = await Order.aggregate([
      { $group: { _id: null, lifetimeRevenue: { $sum: "$totalAmount" } } },
    ]);

    res.status(200).json({
      status: "success",
      message: "Lifetime revenue calculated successfully",
      data: result[0] || { lifetimeRevenue: 0 },
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "An error occurred while calculating lifetime revenue",
      error: error.message,
    });
  }
};
