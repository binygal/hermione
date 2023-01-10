import React from 'react';

export type ViewNames = 'main' | 'logs-container' | 'record-editor';

export default React.createContext(
  { setCurrentView: (_viewName: ViewNames) => {} },
);
