import { useState } from "react";
import styles from "./TaskManager.module.scss";
import Button from "../components/Button/Button";
import InputField from "../components/InputField/InputField";

const TaskManager = () => {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState<
    { id: number; text: string; done: boolean }[]
  >([]);

  const addTask = () => {
    if (!task.trim()) return;
    setTasks([...tasks, { id: Date.now(), text: task, done: false }]);
    setTask("");
  };

  const toggleTask = (id: number) => {
    setTasks(tasks.map((t) => (t.id === id ? { ...t, done: !t.done } : t)));
  };

  const deleteTask = (id: number) => {
    setTasks(tasks.filter((t) => t.id !== id));
  };

  return (
    <div className={styles["container"]}>
      <h2>Task Management</h2>
      <div className={styles["input-field"]}>
        <InputField
          value={task}
          onChange={(e) => setTask(e.target.value)}
          placeholder="Enter a task"
          onKeyDown={(e) => e.key === "Enter" && addTask()}
        />
        <Button onClick={addTask}>Add Task</Button>
      </div>
      <div className={styles["section"]}>
        <h3>Incomplete Tasks</h3>
        {tasks
          .filter((t) => !t.done)
          .map((t) => (
            <div key={t.id} className={styles["task"]}>
              <span>{t.text}</span>
              <div className={styles["button-group"]}>
                <Button onClick={() => toggleTask(t.id)} color="success">Done</Button>
                <Button onClick={() => deleteTask(t.id)} color="danger">Delete</Button>
              </div>
            </div>
          ))}
      </div>
      <div className={styles["section"]}>
        <h3>Completed Tasks</h3>
        {tasks
          .filter((t) => t.done)
          .map((t) => (
            <div key={t.id} className={`${styles["task"]}`}>
              <span className={styles["done"]}>{t.text}</span>
              <div className={styles["button-group"]}>
                <Button onClick={() => toggleTask(t.id)} color="primary">Undo</Button>
                <Button onClick={() => deleteTask(t.id)} color="danger">Delete</Button>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default TaskManager;
