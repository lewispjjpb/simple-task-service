import styles from "./page.module.css";
import RootLayout from "@/app/layout";
import { TaskTracker} from "@/app/components/tasks/TaskTracker";
import { TasksContextProvider } from "@/app/context/TasksContext";

export default function Home() {
  return (
    <RootLayout>
      <TasksContextProvider>
        <TaskTracker />
      </TasksContextProvider>
    </RootLayout>
  );
}
