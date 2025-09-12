import Image from "next/image";
import styles from "./page.module.css";
import RootLayout from "@/app/layout";
import { TaskTracker} from "@/app/components/TaskTracker";

export default function Home() {
  return (
    <RootLayout>
      <TaskTracker />
    </RootLayout>
  );
}
