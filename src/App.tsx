import { WatchCard } from "./components/WatchCard";
import { TasksCard } from "./components/TasksCard";
import { HardwareInfo } from "./components/HardwareInfo";
import styles from "./App.module.css";

export const App = () => {
  return (
    <div className={styles.cards}>
      <WatchCard />
      <HardwareInfo />
      <TasksCard />
    </div>
  );
};
