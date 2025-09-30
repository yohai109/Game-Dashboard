import { WatchCard } from "./components/WatchCard.tsx";
import { TasksCard } from "./components/TasksCard.tsx";

export const App = () => {
  return (
    <div className="cards">
      <WatchCard />
      <TasksCard />
    </div>
  );
}
