import Todo from "../models/todo.model";

const findById = (id: string) => Todo.findById(id);

const findAll = () => Todo.find();

const create = (name: string, description: string, deadline: Date, completed = false) =>
  Todo.create({ name, description, deadline, completed });

const updateById = (id: string, updates: Record<string, unknown>) =>
  Todo.findByIdAndUpdate(id, updates, { new: true, runValidators: true });

const deleteById = (id: string) => Todo.findByIdAndDelete(id);

export default { findById, findAll, create, updateById, deleteById };
