import React, { useMemo, useState } from 'react';
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
  return undefined;
}

export default function Presentor() {
  const [currentView, setCurrentView] = useState<ViewNames>('main');
  const presentorContextValue = useMemo(() => ({
    setCurrentView: (viewName: ViewNames) => { setCurrentView(viewName); },
  }
  ), [setCurrentView]);
  const viewToRender = getViewFromName(currentView);
  if (!viewToRender) {
    return null;
  }

  return (
    <PresentorContext.Provider value={presentorContextValue}>
      {React.createElement(viewToRender) }
    </PresentorContext.Provider>
  );
}
