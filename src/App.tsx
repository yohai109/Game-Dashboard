import { WatchCard } from "./components/WatchCard";
import { TasksCard } from "./components/TasksCard";
import { HardwareInfo } from "./components/HardwareInfo";
import styles from "./App.module.css";

export const App = () => {
  return (
    <div className={styles.app}>
      <header className={styles.header}>
        <h1 className={styles.title}>System Dashboard</h1>
      </header>
      <main className={styles.main}>
        <div className={styles.grid}>
          <div className={styles.column}>
            <WatchCard />
          </div>
          <div className={styles.column}>
            <HardwareInfo />
          </div>
          <div className={styles.column}>
            <TasksCard />
          </div>
        </div>
      </main>
      <footer className={styles.footer}>
        <p>© {new Date().getFullYear()} System Dashboard</p>
      </footer>
    </div>
  );
};
