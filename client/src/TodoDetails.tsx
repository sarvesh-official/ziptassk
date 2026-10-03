import { useEffect, useState } from "react";
import SideBar from "./components/SideBar";
import RightSideBar from "./components/RightSideBar";

type Todo = { _id: string; name: string; description: string; deadline: string; completed: boolean };
const API_URL = import.meta.env.VITE_API_URL ?? "http://localhost:4000/api";

const toDateTimeLocal = (value: string) => {
  const date = new Date(value);
  const offset = date.getTimezoneOffset() * 60000;
  return new Date(date.getTime() - offset).toISOString().slice(0, 16);
};

const TodoDetails = () => {
  const id = new URLSearchParams(window.location.search).get("id");
  const [todo, setTodo] = useState<Todo | null>(null);
  const [loading, setLoading] = useState(Boolean(id));
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(id ? "" : "No todo id was provided.");
  const [draftName, setDraftName] = useState("");
  const [draftDescription, setDraftDescription] = useState("");
  const [draftDeadline, setDraftDeadline] = useState("");

  useEffect(() => {
    if (!id) return;
    const loadTodo = async () => {
      try {
        const response = await fetch(`${API_URL}/todos/${encodeURIComponent(id)}`);
        const data = await response.json().catch(() => null);
        if (!response.ok) throw new Error(data?.message ?? "Could not load todo");
        setTodo(data); setDraftName(data.name); setDraftDescription(data.description ?? ""); setDraftDeadline(toDateTimeLocal(data.deadline));
      } catch (requestError) { setError(requestError instanceof Error ? requestError.message : "Could not load todo"); }
      finally { setLoading(false); }
    };
    void loadTodo();
  }, [id]);

  const toggleComplete = async () => {
    if (!todo) return;
    try {
      const response = await fetch(`${API_URL}/todos/${todo._id}`, { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ completed: !todo.completed }) });
      if (!response.ok) throw new Error("Could not update todo status");
      setTodo(await response.json());
    } catch (requestError) { setError(requestError instanceof Error ? requestError.message : "Could not update todo status"); }
  };

  const saveChanges = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!todo || !draftName.trim() || !draftDeadline) return;
    setSaving(true);
    try {
      const response = await fetch(`${API_URL}/todos/${todo._id}`, { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ name: draftName.trim(), description: draftDescription.trim(), deadline: new Date(draftDeadline).toISOString() }) });
      const data = await response.json().catch(() => null);
      if (!response.ok) throw new Error(data?.message ?? "Could not save todo");
      setTodo(data); setEditing(false); setError("");
    } catch (requestError) { setError(requestError instanceof Error ? requestError.message : "Could not save todo"); }
    finally { setSaving(false); }
  };

  const deleteTodo = async () => {
    if (!todo || !window.confirm("Delete this todo permanently?")) return;
    try {
      const response = await fetch(`${API_URL}/todos/${todo._id}`, { method: "DELETE" });
      if (!response.ok) throw new Error("Could not delete todo");
      window.location.href = "/";
    } catch (requestError) { setError(requestError instanceof Error ? requestError.message : "Could not delete todo"); }
  };

  return <div className="GrandParentDiv">
    <aside className="fixed"><SideBar /></aside>
    <main className="RightSideDiv"><div className="parentMain detailMain">
      <a className="backLink" href="/">← Back to all todos</a>
      {loading && <p>Loading todo…</p>}
      {error && <p className="errorMessage" role="alert">{error}</p>}
      {todo && <article className="todoDetailCard">
        <div className="detailHeader"><span className="detailEyebrow">Todo details</span><span className={`statusBadge ${todo.completed ? "done" : "pending"}`}>{todo.completed ? "Completed" : "Pending"}</span></div>
        {editing ? <form className="detailForm" onSubmit={(event) => void saveChanges(event)}>
          <label>Name<input value={draftName} onChange={(event) => setDraftName(event.target.value)} required /></label>
          <label>Description<textarea value={draftDescription} onChange={(event) => setDraftDescription(event.target.value)} rows={4} /></label>
          <label>Deadline<input type="datetime-local" value={draftDeadline} onChange={(event) => setDraftDeadline(event.target.value)} required /></label>
          <div className="detailActions"><button className="detailAction" type="submit" disabled={saving}>{saving ? "Saving…" : "Save changes"}</button><button className="secondaryAction" type="button" onClick={() => setEditing(false)}>Cancel</button></div>
        </form> : <>
          <h1 className={todo.completed ? "completedText" : ""}>{todo.name}</h1>
          <p className="detailDescription">{todo.description || "No description was added for this todo."}</p>
          <dl className="detailMeta"><div><dt>Deadline</dt><dd>{new Date(todo.deadline).toLocaleString()}</dd></div></dl>
          <div className="detailActions"><button className="detailAction" type="button" onClick={() => void toggleComplete()}>{todo.completed ? "Mark as pending" : "Mark as done"}</button><button className="secondaryAction" type="button" onClick={() => setEditing(true)}>Edit todo</button><button className="deleteAction" type="button" onClick={() => void deleteTodo()}>Delete todo</button></div>
        </>}
      </article>}
    </div></main>
    <aside className="fixed"><RightSideBar /></aside>
  </div>;
};

export default TodoDetails;
