const express = require("express");
const router = express.Router();
// const moment = require("moment");
const orders = require("../models/managerorder");
const auth = require("../middlewares/auth");

// Create a product order
router.post("/addManagerOrder", auth, async (req, res) => {
    //console.log(req.body);

    const { draftID, siteName, supplier, placedDate, requiredDate, productName, productQty, orderstatus } = req.body;

    if (!draftID || !siteName || !supplier || !placedDate || !requiredDate || !productName || !productQty || !orderstatus) {
        return res.status(422).json("plz fill the data");
    }

    try {
        // const fueldate = moment(new Date()).format("YYYY-MM-DD hh:mm:ss");

        const addorder = new orders({
            draftID, siteName, supplier, placedDate, requiredDate, productName, productQty, orderstatus
        });

        await addorder.save();
        res.status(201).json(addorder);
        console.log(addorder);

    } catch (error) {
        res.status(422).json(error);
    }
})

//get product orders
router.get("/getManagerOrderdata", auth, async (req, res) => {
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
        const orderdata = await orders.find(query);
        res.status(201).json(orderdata);
        //console.log(vehicledata);
    } catch (error) {
        res.status(422).json(error);
    }
})

//one order
router.get("/getOneOrder/:id", auth, async (req, res) => {
    try {
        console.log(req.params);
        const { id } = req.params;

        const orderindividual = await orders.findById({ _id: id });
        console.log(orderindividual);
        res.status(201).json(orderindividual)
    } catch (error) {
        res.status(422).json(error);
    }
})

//delete order
router.delete("/deleteordermng/:id", auth, async (req, res) => {
    try {
        const { id } = req.params;

        const deleteorder = await orders.findByIdAndDelete({ _id: id });

        console.log(deleteorder);
        res.status(201).json(deleteorder)
    } catch (error) {
        res.status(422).json(error);
    }
})

//update order
router.patch("/updateordermng/:id", auth, async (req, res) => {
    try {
        const { id } = req.params;
        const { siteName, supplier, placedDate, requiredDate, productName, productQty, orderstatus } = req.body;
        //const file = req.file ? req.file.filename : vehicleImg1

        // const dateUpdated = moment(new Date()).format("YYYY-MM-DD hh:mm:ss");

        // const updatedvehicle = await vehicles.findByIdAndUpdate(id, req.body, {
        //     new:true
        // });

        const updatedorder = await orders.findByIdAndUpdate({ _id: id }, {
            siteName, supplier, placedDate, requiredDate, productName, productQty, orderstatus
        }, {
            new: true
        });

        console.log(updatedorder);
        res.status(201).json(updatedorder)
    } catch (error) {
        res.status(422).json(error);
    }
})

module.exports = router;