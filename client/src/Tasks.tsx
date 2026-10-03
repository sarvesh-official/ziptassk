import { useEffect, useMemo, useState } from "react";
import SideBar from "./components/SideBar";
import RightSideBar from "./components/RightSideBar";

type Todo = { _id: string; name: string; description: string; deadline: string; completed: boolean };
const API_URL = import.meta.env.VITE_API_URL ?? "http://localhost:4000/api";

const Tasks = () => {
  const [inputText, setInputText] = useState("");
  const [todoName, setTodoName] = useState("");
  const [descriptionMode, setDescriptionMode] = useState(false);
  const [todoArr, setTodoArr] = useState<Todo[]>([]);
  const [editId, setEditId] = useState<string | null>(null);
  const [editText, setEditText] = useState("");
  const [quote, setQuote] = useState("Small steps make big progress.");
  const [author, setAuthor] = useState("Unknown");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadTodos = async () => {
      try {
        const response = await fetch(`${API_URL}/todos`);
        if (!response.ok) throw new Error("Could not load tasks");
        setTodoArr(await response.json());
      } catch (requestError) {
        setError(requestError instanceof Error ? requestError.message : "Could not load tasks");
      } finally { setLoading(false); }
    };
    void loadTodos();
  }, []);

  useEffect(() => {
    const loadQuote = async () => {
      try {
        const response = await fetch("https://quotes-api-self.vercel.app/quote");
        if (!response.ok) return;
        const data = await response.json();
        setQuote(data.quote ?? "Small steps make big progress.");
        setAuthor(data.author ?? "Unknown");
      } catch { return; }
    };
    void loadQuote();
  }, []);

  const request = async (path: string, options?: RequestInit) => {
    const response = await fetch(`${API_URL}${path}`, { headers: { "Content-Type": "application/json" }, ...options });
    if (!response.ok) {
      const body = await response.json().catch(() => null);
      throw new Error(body?.message ?? "Request failed");
    }
    return response.status === 204 ? null : response.json();
  };

  const addItemToArray = async () => {
    const name = todoName.trim();
    if (!descriptionMode) return;
    if (!name) return;
    try {
      const todo = await request("/todos", { method: "POST", body: JSON.stringify({ name, description: inputText.trim(), deadline: new Date().toISOString() }) });
      setTodoArr((current) => [todo, ...current]); setInputText(""); setTodoName(""); setDescriptionMode(false); setError("");
    } catch (requestError) { setError(requestError instanceof Error ? requestError.message : "Could not add task"); }
  };

  const moveToDescription = () => {
    if (!inputText.trim()) return;
    setTodoName(inputText.trim());
    setInputText("");
    setDescriptionMode(true);
  };

  const toggleComplete = async (todo: Todo) => {
    try {
      const updated = await request(`/todos/${todo._id}`, { method: "PATCH", body: JSON.stringify({ completed: !todo.completed }) });
      setTodoArr((current) => current.map((item) => item._id === todo._id ? updated : item));
    } catch (requestError) { setError(requestError instanceof Error ? requestError.message : "Could not update task"); }
  };

  const deleteItem = async (id: string) => {
    try { await request(`/todos/${id}`, { method: "DELETE" }); setTodoArr((current) => current.filter((item) => item._id !== id)); }
    catch (requestError) { setError(requestError instanceof Error ? requestError.message : "Could not delete task"); }
  };

  const saveEditItem = async (todo: Todo) => {
    const name = editText.trim();
    if (!name) return;
    try {
      const updated = await request(`/todos/${todo._id}`, { method: "PATCH", body: JSON.stringify({ name }) });
      setTodoArr((current) => current.map((item) => item._id === todo._id ? updated : item)); setEditId(null); setEditText("");
    } catch (requestError) { setError(requestError instanceof Error ? requestError.message : "Could not edit task"); }
  };

  const resetList = async () => {
    try { await Promise.all(todoArr.map((todo) => request(`/todos/${todo._id}`, { method: "DELETE" }))); setTodoArr([]); }
    catch (requestError) { setError(requestError instanceof Error ? requestError.message : "Could not reset tasks"); }
  };

  const completedTasks = useMemo(() => todoArr.filter((item) => item.completed).length, [todoArr]);
  return <div className="GrandParentDiv">
    <aside className="fixed"><SideBar /></aside>
    <main className="RightSideDiv"><div className="parentMain">
      <div className="MainHeaderDiv"><h1>Hi There! 👋🏻</h1><h3>{quote}</h3><h3>- {author}</h3></div>
      <div className="completed-tasks-message"><h5>{completedTasks}/{todoArr.length} Completed Tasks</h5></div>
      <div className="inputTaskDiv"><input className="inputBox" value={inputText} onChange={(event) => setInputText(event.target.value)} placeholder={descriptionMode ? "Description (optional)" : "Add a new task"} onKeyDown={(event) => { if (event.key !== "Enter") return; event.preventDefault(); if (descriptionMode) void addItemToArray(); else moveToDescription(); }} /><button type="button" onClick={() => descriptionMode ? void addItemToArray() : moveToDescription()}>{descriptionMode ? "Add" : "Next"}</button></div>
      {error && <p className="errorMessage" role="alert">{error}</p>}
      <div className="todolistMain">{loading ? <div>Loading tasks…</div> : todoArr.length === 0 ? <div className="emptyState">No tasks yet. Add one to get started.</div> : <ul id="todolist">{todoArr.map((todo) => <li key={todo._id} className={todo.completed ? "completed" : ""}>{editId === todo._id ? <input className="editInput" value={editText} onChange={(event) => setEditText(event.target.value)} onBlur={() => void saveEditItem(todo)} onKeyDown={(event) => event.key === "Enter" && void saveEditItem(todo)} autoFocus /> : <div className="taskRow"><button type="button" className={`taskText${todo.completed ? " completedText" : ""}`} onClick={() => void toggleComplete(todo)}>{todo.completed ? "✅" : "⭕"} {todo.name}</button><div className="taskActions"><a className="viewTaskLink" href={`/todo?id=${encodeURIComponent(todo._id)}`}>View</a><button type="button" onClick={() => { setEditId(todo._id); setEditText(todo.name); }}>Edit</button><button type="button" onClick={() => void deleteItem(todo._id)} aria-label={`Delete ${todo.name}`}>×</button></div></div>}</li>)}</ul>}</div>
      <button className="btnReset" type="button" onClick={() => void resetList()} disabled={todoArr.length === 0}>Reset List</button>
    </div></main>
    <aside className="fixed"><RightSideBar /></aside>
  </div>;
};

export default Tasks;
