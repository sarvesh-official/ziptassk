import Todo from "../models/todo.model";


const getTodoById = async(id: string) => {

    try {
        const todo = await Todo.findById(id);
        return todo;

    } catch (error) {
        return null;
    }

    
}

const getAllTodos = async() => {

    try {
        
        const todos = await Todo.find();

        return todos;

    } catch (error) {
        return null;
    }

}

const createTodo = async(name: string, description: string, deadline: Date, completed = false) => {

    try {
        
        const newTodo = await Todo.insertOne({
            name,
            description,
            deadline,
            completed
        })
        
        return newTodo;

    } catch (error) {
        return null;   
    }

}

const updateTodoById = async(id: string, updates: Record<string, unknown>) => {

    try {
        
        const updatedTodo = await Todo.findByIdAndUpdate(
            id,
            updates,
            { new: true }
        )

        return updatedTodo;

    } catch (error) {
        return null;
    }

}

const deleteTodoById = async(id: string) => {

    try {
        
        const todo = await Todo.findByIdAndDelete(id);

        return todo;

    } catch (error) {
        
        return null;
    }

}

export default {getTodoById, getAllTodos, createTodo, updateTodoById, deleteTodoById};
