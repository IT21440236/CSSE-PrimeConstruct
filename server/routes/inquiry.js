const express = require("express");
const router = express.Router();
const inquiry = require("../models/inquiry");
const nodemailer = require("nodemailer");
const auth = require("../middlewares/auth");

//assign driver to vehicle to system
router.post("/inquirymng", auth, async(req, res) => {
    //console.log(req.body);

    const {supplierName,supplierEmail,Description} = req.body;

    if(!supplierName || !supplierEmail || !Description){
        return res.status(422).json("plz fill the data");
    }

    try {
        
            const inquirymng = new inquiry({
                supplierName,supplierEmail,Description
            });

            await inquirymng.save();

            const transporter = nodemailer.createTransport({
                service: "gmail",
                auth: {
                    user: "bhanukadayanana@gmail.com",
                    pass: "cpmskaqbawieinqt"
                }
            });

            const mailOptions = {
                from: "bhanukadayanana@gmail.com",
                to: supplierEmail,
                subject: "Sending Email for Inquiry for Order",
                html: '<h1>Prime Construction Pvt Limited</h1> <h2>Mr '+supplierName+',</h2> <h2> Description: '+Description+' .'
                       
            };

            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    console.log("Error" + error)
                } else {
                    console.log("Email sent:" + info.response);
                    // res.status(201).json({status:201,info})
                    return res.status(201).json(inquirymng);
                }
            })


    } catch (error) {
        res.status(422).json(error);
    }
})

module.exports = router