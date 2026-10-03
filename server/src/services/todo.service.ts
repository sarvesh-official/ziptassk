import todoRepository from "../repositories/todo.repository";

const getTodoById = (id: string) => todoRepository.findById(id);

const getAllTodos = () => todoRepository.findAll();

const createTodo = (name: string, description: string, deadline: Date, completed = false) =>
  todoRepository.create(name, description, deadline, completed);

const updateTodoById = (id: string, updates: Record<string, unknown>) =>
  todoRepository.updateById(id, updates);

const deleteTodoById = (id: string) => todoRepository.deleteById(id);

export default { getTodoById, getAllTodos, createTodo, updateTodoById, deleteTodoById };
