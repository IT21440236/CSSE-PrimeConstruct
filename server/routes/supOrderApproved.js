const express = require("express");
const router = express.Router();
// const moment = require("moment");
const supOrderApproved = require("../models/supOrderApproved");
const auth = require("../middlewares/auth");

router.post("/addSupApproveOrder", auth, async (req, res) => {
    //console.log(req.body);

    const { draftID,orderid, siteName, supplier, placedDate, requiredDate, productName, productQty, orderstatus, supstatus,deliveryDate, supcomment } = req.body;

    if (!draftID || !orderid || !siteName || !supplier || !placedDate || !requiredDate || !productName || !productQty || !orderstatus || !supstatus || !deliveryDate || !supcomment) {
        return res.status(422).json("plz fill the data");
    }

    try {
        // const fueldate = moment(new Date()).format("YYYY-MM-DD hh:mm:ss");

        const addorder = new supOrderApproved({
            draftID,orderid, siteName, supplier, placedDate, requiredDate, productName, productQty, orderstatus, supstatus,deliveryDate, supcomment
        });

        await addorder.save();
        res.status(201).json(addorder);
        console.log(addorder);

    } catch (error) {
        res.status(422).json(error);
    }
})

//get vehicle data
router.get("/getSupOrderdata", auth, async (req, res) => {
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
        const orderdata = await supOrderApproved.find(query);
        res.status(201).json(orderdata);
        //console.log(vehicledata);
    } catch (error) {
        res.status(422).json(error);
    }
})

router.delete("/deleteordersup/:id", auth, async (req, res) => {
    try {
        const { id } = req.params;

        const deleteorder = await supOrderApproved.findByIdAndDelete({ _id: id });

        console.log(deleteorder);
        res.status(201).json(deleteorder)
    } catch (error) {
        res.status(422).json(error);
    }
})



module.exports = router;