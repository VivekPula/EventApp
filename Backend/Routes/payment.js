import express from "express";
import RazorPay from "razorpay";
import crypto from "crypto";
const router = express.Router();

const razorpay = new RazorPay({
    key_id : process.env.RAZOR_PAY_KEY,
    key_secret : process.env.RAZOR_PAY_SECRET,
});
router.post('/createpayment',async (req, res)=>{
    const { amount } = req.body;
    try{
        const order = await razorpay.orders.create({
            amount : amount*100,
            currency : "INR",
            receipt : "receipt-"+Date.now(),
        });
        res.json(order);
    }catch(err){
        res.status(400).json({Error : "Payment Failure"});
        console.log("Error : "+err);
    }
});

router.post('/verify',async (req,res) =>{
    const {
        razorpay_order_id,
        razorpay_payment_id,
        razorpay_signature,
    } = req.body;
    const body = razorpay_order_id+"|"+razorpay_payment_id;
    const expected = crypto.createHmac("sha256",process.env.RAZOR_PAY_SECRET)
        .update(body)
        .digest("hex");
    if(expected === razorpay_signature){
        res.json({success : true});
    }
    else{
        res.status(400).json({error : "Invalid Signature"});
    }
});
export default router;