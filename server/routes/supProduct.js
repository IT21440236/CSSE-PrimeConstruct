const express = require("express");
const router = express.Router();
// const moment = require("moment");
const supproducts = require("../models/supProduct");
const auth = require("../middlewares/auth");

router.post("/addProductSup",auth, async(req, res) => {
    //console.log(req.body);

    const { supplierName, productName ,productPrice,  productDescription } = req.body;

    if(!supplierName || !productName || !productPrice || !productDescription){
        return res.status(422).json("plz fill the data");
    }

    try {
        // const fueldate = moment(new Date()).format("YYYY-MM-DD hh:mm:ss");
        
            const addproduct = new supproducts({
                supplierName,productName ,productPrice, productDescription
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
    const search = req.query.search || ""

    const query = {
        productName : {$regex:search, $options: "i"},
    }

    try {
        const productdata = await supproducts.find(query);
        res.status(201).json(productdata);
        //console.log(vehicledata);
    } catch (error) {
        res.status(422).json(error);
    }
})

router.get("/getOneSupProduct/:id", auth, async (req, res) => {
    try {
        console.log(req.params);
        const { id } = req.params;

        const productindividual = await supproducts.findById({ _id: id });
        console.log(productindividual);
        res.status(201).json(productindividual)
    } catch (error) {
        res.status(422).json(error);
    }
})

router.delete("/deleteproductsup/:id", auth, async (req, res) => {
    try {
        const { id } = req.params;

        const deleteproduct = await supproducts.findByIdAndDelete({ _id: id });

        console.log(deleteproduct);
        res.status(201).json(deleteproduct)
    } catch (error) {
        res.status(422).json(error);
    }
})

router.patch("/updateproductsup/:id", auth, async (req, res) => {
    try {
        const { id } = req.params;
        const { supplierName,productName ,productPrice, productDescription } = req.body;
        //const file = req.file ? req.file.filename : vehicleImg1

        // const dateUpdated = moment(new Date()).format("YYYY-MM-DD hh:mm:ss");

        // const updatedvehicle = await vehicles.findByIdAndUpdate(id, req.body, {
        //     new:true
        // });

        const updatedproduct = await supproducts.findByIdAndUpdate({ _id: id }, {
            supplierName,productName ,productPrice, productDescription
        }, {
            new: true
        });

        console.log(updatedproduct);
        res.status(201).json(updatedproduct)
    } catch (error) {
        res.status(422).json(error);
    }
})

module.exports = router;