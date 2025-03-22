import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user', required: true
    },
    // items: { type: Array, required: true },
    orderDetails: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'orderDetail',
        required: true
    }], // Khoa chỉnh lại liên kết orderDetail
    amount: { type: String, required: true },
    address: { type: Object, required: true },
    status: { type: String, required: true },
    date: { type: Date, default: Date.now },
    payment: { type: String, required: true },
});

const orderModel = mongoose.models.order || mongoose.model("order", orderSchema);

export default orderModel;