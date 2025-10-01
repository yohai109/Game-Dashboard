import { useMemo, useState, useCallback } from "react";
import { useLocalStorageState } from "../../hooks/useLocalStorageState.ts";
import styles from "./TasksCard.module.css";

type Task = {
  id: number;
  text: string;
  done: boolean;
};

export const TasksCard = () => {
  const [tasks, setTasks] = useLocalStorageState<Task[]>("tasks", []);
  const [text, setText] = useState<string>("");

  const { completed, remaining } = useMemo(() => {
    const completed = tasks.filter((t) => t.done).length;
    const remaining = tasks.length - completed;
    return { completed, remaining };
  }, [tasks]);

  const addTask = useCallback(() => {
    const t = text.trim();
    if (!t) return;
    setTasks((prev) => [...prev, { id: Date.now(), text: t, done: false }]);
    setText("");
  }, [text, setTasks, setText]);

  const toggleTask = useCallback(
    (id: number) => {
      setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t)));
    },
    [setTasks]
  );

  const deleteTask = useCallback(
    (id: number) => {
      setTasks((prev) => prev.filter((t) => t.id !== id));
    },
    [setTasks]
  );

  const clearCompleted = useCallback(() => {
    setTasks((prev) => prev.filter((t) => !t.done));
  }, [setTasks]);

  return (
    <div className={styles.container}>
      <div className={styles.tasks} aria-label="Tasks">
        <div className={styles.header}>
          <h2 className={styles.title}>Tasks</h2>
          <div className={styles.meta}>
            <span className={styles.countBadge}>
              {remaining === 1 ? "1 task left" : `${remaining} tasks left`}
            </span>
            <button
              className={styles.clearButton}
              type="button"
              style={{ display: completed > 0 ? "inline-flex" : "none" }}
              onClick={clearCompleted}
            >
              Clear completed
            </button>
          </div>
        </div>
        <div className={styles.inputContainer}>
          <input
            className={styles.input}
            type="text"
            placeholder="Add a task and press Enter"
            aria-label="New task"
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") addTask();
            }}
          />
          <button className={styles.addButton} type="button" onClick={addTask}>
            Add
          </button>
        </div>
        <ul className={styles.taskList}>
          {tasks.map((t) => (
            <li key={t.id} className={`${styles.task} ${t.done ? styles.done : ""}`}>
              <input
                type="checkbox"
                className={styles.taskCheckbox}
                checked={t.done}
                onChange={() => toggleTask(t.id)}
              />
              <span className={styles.taskLabel} title={t.text}>
                {t.text}
              </span>
              <button
                className={styles.deleteButton}
                aria-label={`Delete ${t.text}`}
                onClick={() => deleteTask(t.id)}
              >
                ✕
              </button>
            </li>
          ))}
        </ul>
        <p className={styles.empty} style={{ display: tasks.length === 0 ? "block" : "none" }}>
          No tasks yet. Add your first task above.
        </p>
      </div>
    </div>
  );
};
