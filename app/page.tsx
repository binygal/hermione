"use client";

import Presentor from "../src/common/app/Presentor";
import styles from "../styles/Home.module.css";

import dynamic from "next/dynamic";
import "../src/vacation-picker/VacationPickerEditor.css";
import "../styles/globals.css";

const SettingsDrawer = dynamic(() => import("../src/settings/SettingsDrawer"), { ssr: false });

export default function Home() {
  return (
    <div className={styles.container}>
      <Presentor />
      <SettingsDrawer />
    </div>
  );
}
