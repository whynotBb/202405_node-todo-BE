const Task = require("../model/Task");

const taskController = {};

taskController.createTask = async (req, res) => {
    try {
        const { task, isComplete } = req.body;
        const newTask = new Task({ task, isComplete });
        await newTask.save();
        res.status(200).json({ status: "ok", data: newTask });
    } catch (err) {
        res.status(400).json({ status: "fail", error: err });
    }
};
taskController.getTask = async (req, res) => {
    try {
        const taskList = await Task.find({}).select("-__v"); //__v 는 빼고
        res.status(200).json({ status: "ok", data: taskList });
    } catch (err) {
        res.status(400).json({ status: "fail", error: err });
    }
};

taskController.updateTask = async (req, res) => {
    try {
        // params 에서 id 를 가져와 일치하는 task 를 찾는다
        const task = await Task.findById(req.params.id);
        // 일치하는 task가 없는 경우 에러메시지를 보내준다.
        if (!task) {
            throw new Error("app can not find the task");
        }
        // req.body 에서 key 값을 가져온다. task, isComplete
        const fields = Object.keys(req.body);
        // key 값을 반복하며 task[key]에 req.body[key] 값을 대입해 넣는다.
        fields.map((item) => {
            task[item] = req.body[item];
        });
        // 수정한 task 를 저장한다.
        await task.save();

        // 업데이트할 데이터 받기
        // const { task: updatedTask, isComplete: updatedIsComplete } = req.body;

        // // 받은 데이터로 Task 업데이트
        // if (updatedTask !== undefined) {
        //     task.task = updatedTask;
        // }
        // if (updatedIsComplete !== undefined) {
        //     task.isComplete = updatedIsComplete;
        // }

        // Task 저장
        // await task.save();
        res.status(200).json({ status: "update success", data: task });
    } catch (err) {
        res.status(400).json({ status: "fail", error: err });
    }
};

taskController.deleteTask = async (req, res) => {
    try {
        const deleteItem = await Task.findByIdAndDelete(req.params.id);
        res.status(200).json({ status: "delete success", data: deleteItem });
    } catch (err) {
        res.status(400).json({ status: "fail", error: err });
    }
};

module.exports = taskController;
