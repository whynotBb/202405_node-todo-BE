const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const taskSchema = Schema(
    {
        task: {
            type: String,
            required: true,
        },
        isComplete: {
            type: Boolean,
            required: true,
        },
    },
    { timestamps: true } // data 들어온 시간 찍어주는 옵션
);

const Task = mongoose.model("Task", taskSchema);

module.exports = Task;
