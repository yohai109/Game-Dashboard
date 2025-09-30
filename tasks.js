// Tasks logic
function getTasks() {
  try {
    return JSON.parse(localStorage.getItem("tasks") || "[]");
  } catch {
    return [];
  }
}
function saveTasks(tasks) {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}
function counts(tasks) {
  const total = tasks.length;
  const completed = tasks.filter((t) => t.done).length;
  const remaining = total - completed;
  return { total, completed, remaining };
}
function renderTasks() {
  const list = document.getElementById("tasks");
  const emptyEl = document.getElementById("empty");
  const countEl = document.getElementById("task-count");
  const clearBtn = document.getElementById("clear-completed");
  if (!list) return;
  const ts = getTasks();
  const { total, completed, remaining } = counts(ts);
  list.innerHTML = "";
  for (const t of ts) {
    const li = document.createElement("li");
    li.className = "task" + (t.done ? " done" : "");
    li.dataset.id = t.id;
    const cb = document.createElement("input");
    cb.type = "checkbox";
    cb.checked = t.done;
    cb.addEventListener("change", () => toggleTask(t.id));
    const label = document.createElement("label");
    label.textContent = t.text;
    label.title = t.text;
    const del = document.createElement("button");
    del.className = "delete";
    del.textContent = "✕";
    del.setAttribute("aria-label", `Delete ${t.text}`);
    del.addEventListener("click", () => deleteTask(t.id));
    li.append(cb, label, del);
    list.appendChild(li);
  }
  if (countEl)
    countEl.textContent =
      remaining === 1 ? "1 task left" : `${remaining} tasks left`;
  if (emptyEl) emptyEl.style.display = total === 0 ? "block" : "none";
  if (clearBtn) clearBtn.style.display = completed > 0 ? "inline-flex" : "none";
}
function addTaskFromInput() {
  const input = document.getElementById("new-task");
  const text = (input.value || "").trim();
  if (!text) return;
  const ts = getTasks();
  ts.push({ id: Date.now(), text, done: false });
  saveTasks(ts);
  input.value = "";
  renderTasks();
}
function toggleTask(id) {
  const ts = getTasks().map((t) => (t.id === id ? { ...t, done: !t.done } : t));
  saveTasks(ts);
  renderTasks();
}
function deleteTask(id) {
  const ts = getTasks().filter((t) => t.id !== id);
  saveTasks(ts);
  renderTasks();
}
function clearCompleted() {
  const ts = getTasks().filter((t) => !t.done);
  saveTasks(ts);
  renderTasks();
}
function initTasks() {
  const addBtn = document.getElementById("add-task");
  const input = document.getElementById("new-task");
  const clearBtn = document.getElementById("clear-completed");
  if (addBtn) addBtn.addEventListener("click", addTaskFromInput);
  if (input)
    input.addEventListener("keydown", (e) => {
      if (e.key === "Enter") addTaskFromInput();
    });
  if (clearBtn) clearBtn.addEventListener("click", clearCompleted);
  renderTasks();
}
window.addEventListener("DOMContentLoaded", initTasks);
