import React from 'react';

export type ViewNames = 'main' | 'logs-container';

export default React.createContext(
  { setCurrentView: (_viewName: ViewNames) => {} },
);
