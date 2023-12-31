const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const { Schema } = mongoose;

const userSchema = new Schema({
    userName: {
        type: String,
        lowercase: true,
        required: true,
    },
    email: {
        type: String,
        lowercase: true,
        required: true,
        unique: true,
        index: {unique: true}
    },
    password: {
        type: String,
        required: true
    },
    tokenConfirm: {
        type: String,
        default: null
    },
    confirmAccount: {
        type: Boolean,
        default: false
    },
    Image: {
        type: String,
        default: null,
    }
});

userSchema.pre("save", async function(next){
    const user = this
    if(!user.isModified("password")) return next();

    try{
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(user.password, salt);

        user.password = hash;
        next();
    } catch(err){
        next();
    }
})

userSchema.methods.comparePassword = async function (canditePassword){
    return await bcrypt.compare(canditePassword, this.password);
};

const User = mongoose.model("User", userSchema);
module.exports = User;