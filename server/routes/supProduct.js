const express = require("express");
const router = express.Router();
// const moment = require("moment");
const supproducts = require("../models/supProduct");
const auth = require("../middlewares/auth");

router.post("/addProductSup",auth, async(req, res) => {
    //console.log(req.body);

    const { productName ,productPrice,  productDescription } = req.body;

    if(!productName || !productPrice || !productDescription){
        return res.status(422).json("plz fill the data");
    }

    try {
        // const fueldate = moment(new Date()).format("YYYY-MM-DD hh:mm:ss");
        
            const addproduct = new supproducts({
                productName ,productPrice, productDescription
            });

            await addproduct.save();
            res.status(201).json(addproduct);
            console.log(addproduct);

    } catch (error) {
        res.status(422).json(error);
    }
})

//get vehicle data
router.get("/getProduct",auth, async (req, res) => {
    // const search = req.query.search || ""

    // const query = {
    //     supplier : {$regex:search, $options: "i"},
    // }

    try {
        const productdata = await supproducts.find();
        res.status(201).json(productdata);
        //console.log(vehicledata);
    } catch (error) {
        res.status(422).json(error);
    }
})

module.exports = router;