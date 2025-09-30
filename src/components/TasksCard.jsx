import { useMemo, useState } from "react";
import useLocalStorageState from "../hooks/useLocalStorageState";

export default function TasksCard() {
  const [tasks, setTasks] = useLocalStorageState("tasks", []);
  const [text, setText] = useState("");

  const { total, completed, remaining } = useMemo(() => {
    const total = tasks.length;
    const completed = tasks.filter((t) => t.done).length;
    const remaining = total - completed;
    return { total, completed, remaining };
  }, [tasks]);

  function addTask() {
    const t = text.trim();
    if (!t) return;
    setTasks((prev) => [...prev, { id: Date.now(), text: t, done: false }]);
    setText("");
  }
  function toggleTask(id) {
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t)));
  }
  function deleteTask(id) {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  }
  function clearCompleted() {
    setTasks((prev) => prev.filter((t) => !t.done));
  }

  return (
    <div className="card">
      <div className="tasks" aria-label="Tasks">
        <div className="tasks-header">
          <h2 className="tasks-title">Tasks</h2>
          <div className="tasks-meta">
            <span id="task-count" className="count-badge">
              {remaining === 1 ? "1 task left" : `${remaining} tasks left`}
            </span>
            <button
              id="clear-completed"
              className="clear-btn"
              type="button"
              style={{ display: completed > 0 ? "inline-flex" : "none" }}
              onClick={clearCompleted}
            >
              Clear completed
            </button>
          </div>
        </div>
        <div className="task-input">
          <input
            id="new-task"
            type="text"
            placeholder="Add a task and press Enter"
            aria-label="New task"
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") addTask();
            }}
          />
          <button id="add-task" type="button" onClick={addTask}>
            Add
          </button>
        </div>
        <ul id="tasks">
          {tasks.map((t) => (
            <li key={t.id} className={`task${t.done ? " done" : ""}`} data-id={t.id}>
              <input
                type="checkbox"
                checked={t.done}
                onChange={() => toggleTask(t.id)}
              />
              <label title={t.text}>{t.text}</label>
              <button className="delete" aria-label={`Delete ${t.text}`} onClick={() => deleteTask(t.id)}>
                ✕
              </button>
            </li>
          ))}
        </ul>
        <p id="empty" className="empty" style={{ display: tasks.length === 0 ? "block" : "none" }}>
          No tasks yet. Add your first task above.
        </p>
      </div>
    </div>
  );
}
