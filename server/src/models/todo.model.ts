import mongoose from "mongoose";


const todoSchema = new mongoose.Schema({
    name: {type: String, required: true, trim: true},
    description: {type: String, default: ""},
    deadline: {type: Date, required: true},
    completed: {type: Boolean, default: false}
}, { timestamps: true })

const Todo = mongoose.model("Todo", todoSchema);

export default Todo;
