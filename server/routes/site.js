const router = require("express").Router();
const mongoose = require("mongoose");

const { validateSite, Site } = require("../models/Site");
const auth = require("../middlewares/auth");

// Create a site
router.post("/site", auth, async (req, res) => {
  const { sitename, siteAddress, contactno, budget, siteManager } = req.body;

  const { error } = validateSite(req.body);

  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  try {
    const newSite = new Site({
      sitename,
      siteAddress,
      contactno,
      budget,
      siteManager,
      // add more fields as required
    });
    // Save the site
    const result = await newSite.save();
    return res.status(201).json({ ...result._doc });
  } catch (err) {
    console.log(err);
  }
});

// Fetch sites
router.get("/allsites", auth, async (req, res) => {
  try {
    const sites = await Site.find();

    return res.status(200).json({ sites: sites });
  } catch (err) {
    console.log(err);
  }
});

// Update a site
router.put("/site", auth, async (req, res) => {
  const { id } = req.body;

  if (!id) {
    return res.status(400).json({ error: "Please provide an id" });
  }
  if (!mongoose.isValidObjectId(id)) {
    return res.status(400).json({ error: "Invalid id" });
  }
  try {
    const site = await Site.findOne({ _id: id });

    const updatedData = { ...req.body, id: undefined };
    const result = await Site.findByIdAndUpdate(id, updatedData, {
      new: true,
    });

    const updatedSite = await Site.findById(id);
    return res.status(200).json(updatedSite);
  } catch (err) {
    console.log(err);
  }
});

// Delete a site
router.delete("/deletesite/:id", auth, async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ error: "Please provide an id" });
  }
  if (!mongoose.isValidObjectId(id)) {
    return res.status(400).json({ error: "Invalid id" });
  }
  try {
    const site = await Site.findOne({ _id: id });
    if (!site) {
      return res.status(404).json({ error: "Site not found" });
    }
    const result = await Site.deleteOne({ _id: id });
    const sites = await Site.find();
    return res.status(200).json({ sites: sites });
  } catch (error) {
    console.log(error);
  }
});

// Get a single site
router.get("/site/:id", auth, async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ error: "Please provide an id" });
  }
  if (!mongoose.isValidObjectId(id)) {
    return res.status(400).json({ error: "Invalid id" });
  }
  try {
    const site = await Site.findOne({ _id: id });

    return res.status(200).json({ ...site._doc });
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
