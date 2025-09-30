import { WatchCard } from "./components/WatchCard.tsx";
import { TasksCard } from "./components/TasksCard.tsx";
import { HardwereInfo } from "./components/HardwereInfo.tsx";

export const App = () => {
  return (
    <div className="cards">
      <WatchCard />
      <HardwereInfo />
      <TasksCard />
    </div>
  );
};
