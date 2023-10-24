const express = require("express");
const router = express.Router();
// const moment = require("moment");
const drafts = require("../models/draftorder");
const auth = require("../middlewares/auth");

//add draft order
router.post("/addDraftOrder",auth, async(req, res) => {
    //console.log(req.body);

    const {placedDate,requiredDate,supplier,draftStatus} = req.body;

    if(!placedDate || !requiredDate || !supplier || !draftStatus){
        return res.status(422).json("plz fill the data");
    }

    try {
        // const fueldate = moment(new Date()).format("YYYY-MM-DD hh:mm:ss");
        
            const addraft = new drafts({
               placedDate,requiredDate,supplier,draftStatus
            });

            await addraft.save();
            res.status(201).json(addraft);
            console.log(addraft);

    } catch (error) {
        res.status(422).json(error);
    }
})

//get drafts data
router.get("/getdraftdata",auth, async (req, res) => {
    try {
        const draftdata = await drafts.find();
        res.status(201).json(draftdata);
        //console.log(vehicledata);
    } catch (error) {
        res.status(422).json(error);
    }
})

//delete draft order
router.delete("/deletedraft/:id",auth, async (req, res) => {
    try {
        const { id } = req.params;

        const deletedraft = await drafts.findByIdAndDelete({ _id: id });

        console.log(deletedraft);
        res.status(201).json(deletedraft)
    } catch (error) {
        res.status(422).json(error);
    }
})

module.exports = router;