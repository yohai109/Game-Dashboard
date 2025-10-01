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
  const [isInputFocused, setIsInputFocused] = useState(false);

  const { completed, remaining } = useMemo(() => {
    const completed = tasks.filter((t) => t.done).length;
    const remaining = tasks.length - completed;
    return { completed, remaining };
  }, [tasks]);

  const hasTasks = tasks.length > 0;

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
            {hasTasks && (
              <span className={styles.countBadge}>
                {remaining === 1 ? "1 task left" : `${remaining} tasks left`}
              </span>
            )}
            {completed > 0 && (
              <button className={styles.clearButton} type="button" onClick={clearCompleted}>
                Clear completed
              </button>
            )}
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
            onFocus={() => setIsInputFocused(true)}
            onBlur={() => setIsInputFocused(false)}
          />
          <button
            className={styles.addButton}
            type="button"
            onClick={addTask}
            disabled={!text.trim()}
          >
            Add
          </button>
        </div>

        {hasTasks ? (
          <ul className={styles.taskList}>
            {tasks.map((t) => (
              <li key={t.id} className={`${styles.task} ${t.done ? styles.done : ""}`}>
                <input
                  type="checkbox"
                  className={styles.taskCheckbox}
                  checked={t.done}
                  onChange={() => toggleTask(t.id)}
                  aria-label={t.done ? "Mark as incomplete" : "Mark as complete"}
                />
                <span className={styles.taskLabel} title={t.text}>
                  {t.text}
                </span>
                <button
                  className={styles.deleteButton}
                  aria-label={`Delete "${t.text}"`}
                  onClick={() => deleteTask(t.id)}
                >
                  ✕
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <div className={styles.emptyState}>
            <div className={styles.emptyStateIcon}>📝</div>
            <div className={styles.emptyStateText}>No tasks yet</div>
            <div className={styles.emptyStateHint}>
              {isInputFocused ? "Press Enter to add" : "Type above to get started"}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
