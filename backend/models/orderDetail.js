import mongoose from 'mongoose';

const orderDetailSchema = new mongoose.Schema({
    orderId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'order'
    },
    productId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'product', 
        required: true 
    },
    quantity: { 
        type: Number, 
        required: true, 
        min: 1 // Đảm bảo số lượng tối thiểu là 1
    },
    price: { 
        type: String, 
        required: true 
    },
    subTotal: { 
        type: String, 
        required: true 
    }
}, {
    timestamps: true // Tự động thêm createdAt và updatedAt
});

const orderDetailModel = mongoose.models.orderDetail || mongoose.model("orderDetail", orderDetailSchema);

export default orderDetailModel;