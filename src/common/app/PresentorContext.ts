import React from 'react';

export type ViewNames = 'main' | 'logs-container' | 'record-editor' | 'settings';

export default React.createContext(
  { setCurrentView: (_viewName: ViewNames, _props?: Record<string, string>) => {} },
);
