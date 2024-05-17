const mongoose = require('mongoose');
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
        // type 은 ID , User 컬렉션 참조
        author: {type: Schema.Types.ObjectId, required: true, ref: 'User'},
    },
    {timestamps: true} // data 들어온 시간 찍어주는 옵션
);

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;
