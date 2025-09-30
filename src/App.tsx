import WatchCard from "./components/WatchCard.tsx";
import TasksCard from "./components/TasksCard.tsx";

export default function App() {
  return (
    <div className="cards">
      <WatchCard />
      <TasksCard />
    </div>
  );
}
