import styles from './page.module.css';
import RootLayout from '@/app/layout';
import { TaskTracker } from '@/app/components/tasks/TaskTracker';
import { TasksContextProvider } from '@/app/context/TasksContext';
import { UserContextProvider } from '@/app/context/UserContext';

export default function Home() {
  return (
    <RootLayout>
      <UserContextProvider>
        <TasksContextProvider>
          <TaskTracker />
        </TasksContextProvider>
      </UserContextProvider>
    </RootLayout>
  );
}
