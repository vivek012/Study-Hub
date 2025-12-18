import mongoose from "mongoose";
import mailSender from "../utils/mailSender";

const OTPSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    otp: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now(),
        expires: 5*60
    }
});

// A function -> to send Emails 

async function sendVerificationEmail(email, otp){
    try {
        const mailResponse = mailSender(email, "Verification Email  from StudyHub", otp)
        console.log("Email Sent Successfully", mailResponse)
    } catch (error) {
        console.log(`error occured while ending mail     ${error.message}`);
        throw error;
        
    }
}

OTPSchema.pre("save", async (next)=> {
    await sendVerificationEmail(this.email, this.otp);
    next()
})

const OTP = mongoose.model('OTP', OTPSchema)

export default OTP;