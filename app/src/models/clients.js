import mongoose from "mongoose";

const clientSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            lowercase: true,
        },
        document: {
            type: String,
            required: true,
            trim: true,
        },
        username: {
            type: String,
            required: true,
            trim: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
            trim: true,
            select: false,
        },
        status: {
            type: String,
            required: true,
            trim: true,
            enum: ["active", "inactive"],
            default: "active",
        },
    },
    {
        timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
    },
);

const Client = mongoose.model("Client", clientSchema);

export default Client;
