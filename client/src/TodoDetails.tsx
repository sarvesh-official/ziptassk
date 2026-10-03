import { useEffect, useState } from "react";
type Todo = { _id: string; name: string; description: string; deadline: string; completed: boolean };
const API_URL = import.meta.env.VITE_API_URL ?? "http://localhost:4000/api";

const TodoDetails = () => {
  const id = new URLSearchParams(window.location.search).get("id");
  const [todo, setTodo] = useState<Todo | null>(null);
  const [loading, setLoading] = useState(Boolean(id));
  const [error, setError] = useState(id ? "" : "No todo id was provided.");

  useEffect(() => {
    if (!id) return;
    const loadTodo = async () => {
      try {
        const response = await fetch(`${API_URL}/todos/${encodeURIComponent(id)}`);
        const data = await response.json().catch(() => null);
        if (!response.ok) throw new Error(data?.message ?? "Could not load todo");
        setTodo(data);
      } catch (requestError) {
        setError(requestError instanceof Error ? requestError.message : "Could not load todo");
      } finally { setLoading(false); }
    };
    void loadTodo();
  }, [id]);

  const toggleComplete = async () => {
    if (!todo) return;
    try {
      const response = await fetch(`${API_URL}/todos/${todo._id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ completed: !todo.completed }),
      });
      if (!response.ok) throw new Error("Could not update todo");
      setTodo(await response.json());
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : "Could not update todo");
    }
  };

  return <>
    <main className="detailPage">
      <a className="backLink" href="/">← Back to all todos</a>
      {loading && <p>Loading todo…</p>}
      {error && <p className="errorMessage" role="alert">{error}</p>}
      {todo && <article className="todoDetailCard">
        <div className="detailHeader"><span className="detailEyebrow">Todo details</span><span className={`statusBadge ${todo.completed ? "done" : "pending"}`}>{todo.completed ? "Completed" : "Pending"}</span></div>
        <h1 className={todo.completed ? "completedText" : ""}>{todo.name}</h1>
        <p className="detailDescription">{todo.description || "No description was added for this todo."}</p>
        <dl className="detailMeta"><div><dt>Deadline</dt><dd>{new Date(todo.deadline).toLocaleString()}</dd></div><div><dt>Todo ID</dt><dd>{todo._id}</dd></div></dl>
        <button className="detailAction" type="button" onClick={() => void toggleComplete()}>{todo.completed ? "Mark as pending" : "Mark as done"}</button>
      </article>}
    </main>
  </>;
};

export default TodoDetails;
