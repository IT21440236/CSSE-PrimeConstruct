const router = require("express").Router();
const mongoose = require("mongoose");

const { validateReceipt, Receipt } = require("../models/Reciept");
const auth = require("../middlewares/auth");

// Create a receipt
router.post("/receipt", auth, async (req, res) => {
  const { orderno, productname, productQuantity, deliveryDate } = req.body;

  const { error } = validateReceipt(req.body);

  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  try {
    const newReceipt = new Receipt({
      orderno,
      productname,
      productQuantity,
      deliveryDate,
      // add more fields as required
    });
    // Save the receipt
    const result = await newReceipt.save();
    return res.status(201).json({ ...result._doc });
  } catch (err) {
    console.log(err);
  }
});

// Fetch receipts
router.get("/allreceipts", auth, async (req, res) => {
  try {
    const receipts = await Receipt.find();

    return res.status(200).json({ receipts: receipts });
  } catch (err) {
    console.log(err);
  }
});

// Update a receipt
router.put("/receipt", auth, async (req, res) => {
  const { id } = req.body;

  if (!id) {
    return res.status(400).json({ error: "Please provide an id" });
  }
  if (!mongoose.isValidObjectId(id)) {
    return res.status(400).json({ error: "Invalid id" });
  }
  try {
    const receipt = await Receipt.findOne({ _id: id });

    const updatedData = { ...req.body, id: undefined };
    const result = await Receipt.findByIdAndUpdate(id, updatedData, {
      new: true,
    });

    const updatedReceipt = await Receipt.findById(id);
    return res.status(200).json(updatedReceipt);
  } catch (err) {
    console.log(err);
  }
});

// Delete a receipt
router.delete("/deletereceipt/:id", auth, async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ error: "Please provide an id" });
  }
  if (!mongoose.isValidObjectId(id)) {
    return res.status(400).json({ error: "Invalid id" });
  }
  try {
    const receipt = await Receipt.findOne({ _id: id });
    if (!receipt) {
      return res.status(404).json({ error: "Receipt not found" });
    }
    const result = await Receipt.deleteOne({ _id: id });
    const receipts = await Receipt.find();
    return res.status(200).json({ receipts: receipts });
  } catch (error) {
    console.log(error);
  }
});

// Get a single receipt
router.get("/receipt/:id", auth, async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ error: "Please provide an id" });
  }
  if (!mongoose.isValidObjectId(id)) {
    return res.status(400).json({ error: "Invalid id" });
  }
  try {
    const receipt = await Receipt.findOne({ _id: id });

    return res.status(200).json({ ...receipt._doc });
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
