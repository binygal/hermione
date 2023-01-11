import React, { useMemo, useState } from 'react';
import RecordEditorContainer from '../../record-editor/RecordEditorContainer';
import RecordsLogContainer from '../../records-log/RecordsLogContainer';
import TimeTrackerContainer from '../../time-tracker/TimeTrackerContainer';
import PresentorContext, { ViewNames } from './PresentorContext';

function getViewFromName(viewName: ViewNames): React.FunctionComponent | undefined {
  if (viewName === 'main') {
    return TimeTrackerContainer;
  }
  if (viewName === 'logs-container') {
    return RecordsLogContainer;
  }
  if (viewName === 'record-editor') {
    return RecordEditorContainer;
  }
  return undefined;
}

export default function Presentor() {
  const [currentView, setCurrentView] = useState<ViewNames>('main');
  const [currentProps, setCurrentProps] = useState<Record<string, string>>({});
  const presentorContextValue = useMemo(() => ({
    setCurrentView: (viewName: ViewNames, props: Record<string, string> = {}) => {
      setCurrentView(viewName);
      setCurrentProps(props);
    },
  }
  ), [setCurrentView]);
  const viewToRender = getViewFromName(currentView);
  if (!viewToRender) {
    return null;
  }

  return (
    <PresentorContext.Provider value={presentorContextValue}>
      {React.createElement(viewToRender, currentProps) }
    </PresentorContext.Provider>
  );
}
