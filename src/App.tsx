import { WatchCard } from "./components/WatchCard.tsx";
import { TasksCard } from "./components/TasksCard.tsx";
import { HardwareInfo } from "./components/HardwareInfo";

export const App = () => {
  return (
    <div className="cards">
      <WatchCard />
      <HardwareInfo />
      <TasksCard />
    </div>
  );
};
