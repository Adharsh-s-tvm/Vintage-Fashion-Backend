import mongoose from "mongoose";

const adminSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    // username: {
    //     type: String,
    //     required: true,
    //     unique: true,
    //     trim: true
    // },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: false,
        default: null
    },
    image: {
        type: String,
        required: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    isDeleted: {
        type: Boolean,
        default: false
    },
},
    { timestamps: true }
);

const Admin = mongoose.model("Admin", adminSchema);

export default Admin;