'use client';

import React, { useMemo, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import RecordEditorContainer from '../../record-editor/RecordEditorContainer';
import RecordsLogContainer from '../../records-log/RecordsLogContainer';
import SettingsContainer from '../../settings/SettingsContainer';
import TimeTrackerContainer from '../../time-tracker/TimeTrackerContainer';
import VacationPickerEditor from '../../vacation-picker/VacationPickerEditor';
import PresentorContext, { ViewNames } from './PresentorContext';

function getViewFromName(viewName: ViewNames): React.FunctionComponent | undefined {
  switch (viewName) {
    case 'main': {
      return TimeTrackerContainer;
    }
    case 'logs-container': {
      return RecordsLogContainer;
    }
    case 'record-editor': {
      return RecordEditorContainer;
    }
    case 'settings': {
      return SettingsContainer;
    }
    case 'vacation-picker': {
      return VacationPickerEditor;
    }
    default: {
      return undefined;
    }
  }
}

export default function Presentor() {
  const [currentView, setCurrentView] = useState<ViewNames>('main');
  const [currentProps, setCurrentProps] = useState<Record<string, string>>({});
  const presentorContextValue = useMemo(() => ({
    setCurrentView: (viewName: ViewNames, props: Record<string, string> = {}) => {
      setCurrentView(viewName);
      setCurrentProps(props);
    },
    notify: toast,
  }
  ), [setCurrentView]);
  const viewToRender = getViewFromName(currentView);
  if (!viewToRender) {
    return null;
  }

  return (
    <PresentorContext.Provider value={presentorContextValue}>
      {React.createElement(viewToRender, currentProps) }
      <ToastContainer />
    </PresentorContext.Provider>
  );
}
