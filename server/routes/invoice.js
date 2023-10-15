const router = require("express").Router();
const mongoose = require("mongoose");

const { validateInvoice, Invoice } = require("../models/Invoice");
const auth = require("../middlewares/auth");

// Create an invoice
router.post("/invoice", auth, async (req, res) => {
  const { orderno, bank, branch, accountno, amount, depositdate } = req.body;

  const { error } = validateInvoice(req.body);

  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  try {
    const newInvoice = new Invoice({
      orderno,
      bank,
      branch,
      accountno,
      amount,
      depositdate,
      // add more fields as required
    });
    // Save the invoice
    const result = await newInvoice.save();
    return res.status(201).json({ ...result._doc });
  } catch (err) {
    console.log(err);
  }
});

// Fetch invoices
router.get("/allinvoices", auth, async (req, res) => {
  try {
    const invoices = await Invoice.find();

    return res.status(200).json({ invoices: invoices });
  } catch (err) {
    console.log(err);
  }
});

// Update an invoice
router.put("/invoice", auth, async (req, res) => {
  const { id } = req.body;

  if (!id) {
    return res.status(400).json({ error: "Please provide an id" });
  }
  if (!mongoose.isValidObjectId(id)) {
    return res.status(400).json({ error: "Invalid id" });
  }
  try {
    const invoice = await Invoice.findOne({ _id: id });

    const updatedData = { ...req.body, id: undefined };
    const result = await Invoice.findByIdAndUpdate(id, updatedData, {
      new: true,
    });

    const updatedInvoice = await Invoice.findById(id);
    return res.status(200).json(updatedInvoice);
  } catch (err) {
    console.log(err);
  }
});

// Delete an invoice
router.delete("/deleteinvoice/:id", auth, async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ error: "Please provide an id" });
  }
  if (!mongoose.isValidObjectId(id)) {
    return res.status(400).json({ error: "Invalid id" });
  }
  try {
    const invoice = await Invoice.findOne({ _id: id });
    if (!invoice) {
      return res.status(404).json({ error: "Invoice not found" });
    }
    const result = await Invoice.deleteOne({ _id: id });
    const invoices = await Invoice.find();
    return res.status(200).json({ invoices: invoices });
  } catch (error) {
    console.log(error);
  }
});

// Get a single invoice
router.get("/invoice/:id", auth, async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ error: "Please provide an id" });
  }
  if (!mongoose.isValidObjectId(id)) {
    return res.status(400).json({ error: "Invalid id" });
  }
  try {
    const invoice = await Invoice.findOne({ _id: id });

    return res.status(200).json({ ...invoice._doc });
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
