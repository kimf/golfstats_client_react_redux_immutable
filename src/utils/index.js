import React from 'react';
import { DevTools, DebugPanel, LogMonitor } from 'redux-devtools/lib/react';


export function createDevToolsWindow (store) {
  const win = window.open(
    null,
    'redux-devtools', // give it a name so it reuses the same window
    'menubar=no,location=no,resizable=yes,scrollbars=no,status=no'
  );

  // reload in case it's reusing the same window with the old content
  win.location.reload();

  // wait a little bit for it to reload, then render
  setTimeout(() => {
    React.render(
      <DebugPanel top right bottom left >
        <DevTools store={store} monitor={LogMonitor} />
      </DebugPanel>
      , win.document.body);
  }, 10);
}
