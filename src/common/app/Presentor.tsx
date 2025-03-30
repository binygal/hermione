"use client";

import dynamic from "next/dynamic";
import React, { useMemo, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import RecordsLogDataFetcher from "../../records-log/RecordsLogDataFetcher";
import TimeTrackerContainer from "../../time-tracker/TimeTrackerContainer";
import PresentorContext, { ViewNames } from "./PresentorContext";

const RecordEditorContainer = dynamic(() => import("../../record-editor/RecordEditorContainer"));

function getViewFromName(viewName: ViewNames): React.ElementType | undefined {
  switch (viewName) {
    case "main": {
      return TimeTrackerContainer;
    }
    case "logs-container": {
      return RecordsLogDataFetcher;
    }
    case "record-editor": {
      return RecordEditorContainer;
    }
    default: {
      return undefined;
    }
  }
}

export default function Presentor() {
  const [currentView, setCurrentView] = useState<ViewNames>("main");
  const [currentProps, setCurrentProps] = useState<Record<string, string>>({});
  const presentorContextValue = useMemo(
    () => ({
      setCurrentView: (viewName: ViewNames, props: Record<string, string> = {}) => {
        setCurrentView(viewName);
        setCurrentProps(props);
      },
      notify: toast,
    }),
    [setCurrentView]
  );
  const viewToRender = getViewFromName(currentView);
  if (!viewToRender) {
    return null;
  }

  return (
    <PresentorContext.Provider value={presentorContextValue}>
      {React.createElement(viewToRender, currentProps)}
      <ToastContainer />
    </PresentorContext.Provider>
  );
}
