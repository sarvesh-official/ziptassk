import { Router } from "express";
import { createTodo, deleteTodoById, getAllTodos, getTodoById, updateTodoById } from "../controllers/todo.controller";

const TodoRouter = Router();


TodoRouter.get("/todos", getAllTodos);

TodoRouter.get("/todos/:id", getTodoById);

TodoRouter.post("/todos", createTodo);

TodoRouter.patch("/todos/:id", updateTodoById);

TodoRouter.delete("/todos/:id", deleteTodoById);

export default TodoRouter;
