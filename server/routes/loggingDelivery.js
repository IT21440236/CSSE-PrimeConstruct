const express = require("express");
const router = express.Router();
// const moment = require("moment");
const lgdelivery = require("../models/loggingDelivery");
const auth = require("../middlewares/auth");

//add logging deliveries
router.post("/addManagerdelivery", auth, async (req, res) => {
    //console.log(req.body);

    const { draftID,orderid, siteName, supplier, deliveryDate, productName, productQty, comment } = req.body;

    if (!draftID || !orderid || !siteName || !supplier || !deliveryDate || !productName || !productQty || !comment) {
        return res.status(422).json("plz fill the data");
    }

    try {
        // const fueldate = moment(new Date()).format("YYYY-MM-DD hh:mm:ss");

        const adddelivery = new lgdelivery({
            draftID,orderid, siteName, supplier, deliveryDate, productName, productQty, comment
        });

        await adddelivery.save();
        res.status(201).json(adddelivery);
        console.log(adddelivery);

    } catch (error) {
        res.status(422).json(error);
    }
})

//get logging deliveries
router.get("/getManagerdeliverydata", auth, async (req, res) => {
    const search = req.query.search || ""

    // const query = {
    //     supplier: { $regex: search, $options: "i" },
    //     draftID: { $regex: search, $options: "i" },
    //     orderid: { $regex: search, $options: "i" },
    // }

    const query = {
        $or: [
            { supplier: { $regex: search, $options: "i" } },
            { draftID: { $regex: search, $options: "i" } },
            { orderid: { $regex: search, $options: "i" } }
        ]
    };

    try {
        const deliverydata = await lgdelivery.find(query);
        res.status(201).json(deliverydata);
        //console.log(vehicledata);
    } catch (error) {
        res.status(422).json(error);
    }
})

// get single delivery data
router.get("/getOnedelivery/:id", auth, async (req, res) => {
    try {
        console.log(req.params);
        const { id } = req.params;

        const deliveryindividual = await lgdelivery.findById({ _id: id });
        console.log(deliveryindividual);
        res.status(201).json(deliveryindividual)
    } catch (error) {
        res.status(422).json(error);
    }
})

// delete delivery data
router.delete("/deletedeliverymng/:id", auth, async (req, res) => {
    try {
        const { id } = req.params;

        const deletedelivery = await lgdelivery.findByIdAndDelete({ _id: id });

        console.log(deletedelivery);
        res.status(201).json(deletedelivery)
    } catch (error) {
        res.status(422).json(error);
    }
})

// update delivery data
router.patch("/updatedeliverymng/:id", auth, async (req, res) => {
    try {
        const { id } = req.params;
        const { draftID,orderid, siteName, supplier, deliveryDate, productName, productQty, comment } = req.body;
        //const file = req.file ? req.file.filename : vehicleImg1

        // const dateUpdated = moment(new Date()).format("YYYY-MM-DD hh:mm:ss");

        // const updatedvehicle = await vehicles.findByIdAndUpdate(id, req.body, {
        //     new:true
        // });

        const updateddelivery = await lgdelivery.findByIdAndUpdate({ _id: id }, {
            draftID,orderid, siteName, supplier, deliveryDate, productName, productQty, comment
        }, {
            new: true
        });

        console.log(updateddelivery);
        res.status(201).json(updateddelivery)
    } catch (error) {
        res.status(422).json(error);
    }
})

module.exports = router;