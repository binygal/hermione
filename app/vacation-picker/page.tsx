"use client";

import dynamic from "next/dynamic";

const VacationPickerEditor = dynamic(() => import("../../src/vacation-picker/VacationPickerEditor"), {
  ssr: false,
});

export default function VacationPickerPage() {
  return <VacationPickerEditor />;
}
