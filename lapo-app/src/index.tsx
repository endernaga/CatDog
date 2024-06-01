import { createRoot } from 'react-dom/client';
import { Root } from './Root';
import { DropdownProvider } from './context/DropdownContext';

createRoot(document.getElementById('root') as HTMLElement).render(
  <DropdownProvider>
    <Root />
  </DropdownProvider>
)
