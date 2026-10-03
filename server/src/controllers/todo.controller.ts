import type { Request,Response } from "express";
import todoService from "../services/todo.service";

export const getTodoById = async(req: Request, res: Response) => {
    try {
        const todo = await todoService.getTodoById(req.params.id as string);
        if (!todo) return res.status(404).json({ message: "Todo not found" });
        return res.status(200).json(todo);

    }catch(error){
        
        return res.status(500).json({
            message : "Failed to get todo with the id"
        })
    }

} 

export const getAllTodos = async(req: Request, res: Response) => {
    
    try{

        const todos = await todoService.getAllTodos();

        return res.status(200).json(todos);
    }catch(error){

        return res.status(500).json({
            message: "Failed to fetch todos"
        })
    }
}

export const createTodo = async(req: Request, res: Response) => {

    try {
        
        const {name, description = "", deadline, completed = false} = req.body;

        if(typeof name !== "string" || !name.trim() || !deadline || Number.isNaN(Date.parse(deadline))){
            return res.status(400).json({ message: "name and a valid deadline are required" });
        }
        const newTodo = await todoService.createTodo(name.trim(), description, new Date(deadline), Boolean(completed));

        return res.status(201).json(newTodo);

        
    } catch (error) {
        
        return res.status(500).json({
            message: "Failed to create todo"
        })
    }
}

export const updateTodoById = async(req: Request, res: Response) => {
    try {
        const updates = req.body as Record<string, unknown>;
        if (updates.name !== undefined && (typeof updates.name !== "string" || !updates.name.trim())) {
            return res.status(400).json({ message: "name must not be empty" });
        }
        if (updates.deadline !== undefined && (typeof updates.deadline !== "string" || Number.isNaN(Date.parse(updates.deadline)))) {
            return res.status(400).json({ message: "deadline must be a valid date" });
        }
        const updatedTodo = await todoService.updateTodoById(req.params.id as string, {
            ...(updates.name !== undefined && { name: (updates.name as string).trim() }),
            ...(updates.description !== undefined && { description: updates.description }),
            ...(updates.deadline !== undefined && { deadline: new Date(updates.deadline as string) }),
            ...(updates.completed !== undefined && { completed: Boolean(updates.completed) })
        });
        if (!updatedTodo) return res.status(404).json({ message: "Todo not found" });
        return res.status(200).json(updatedTodo);

    } catch (error) {
        
        return res.status(500).json({
            message: "Failed to update todo"
        })
    }


}

export const deleteTodoById = async(req: Request, res: Response) => {
    try {
        const deletedTodo = await todoService.deleteTodoById(req.params.id as string);
        if (!deletedTodo) return res.status(404).json({ message: "Todo not found" });
        return res.status(204).send();

    } catch (error) {
        
        return res.status(500).json({
            message: "Failed to delete todo"
        })
    }



}
