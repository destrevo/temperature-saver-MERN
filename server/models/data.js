const mongoose = require("mongoose");

const Data = new mongoose.Schema(
    {
        createdby: {
            type: String,
            required: true,
        },
        data: {
            type: Array,
            required: false
        },
    },
    {timestamps: true}
);

module.exports = mongoose.model("Data", Data);