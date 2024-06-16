import { createRoot } from 'react-dom/client';
import { Root } from './Root';
import { GlobalProvider } from './context/GlobalContext';

createRoot(document.getElementById('root') as HTMLElement).render(
  <GlobalProvider>
    <Root />
  </GlobalProvider>
)
