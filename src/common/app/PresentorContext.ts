import React from 'react';

export type ViewNames = 'main' | 'logs-container' | 'record-editor' | 'settings' | 'vacation-picker';

export default React.createContext(
  { setCurrentView: (_viewName: ViewNames, _props?: Record<string, string>) => {} },
);
