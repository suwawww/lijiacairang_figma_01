import { RouterProvider } from 'react-router';
import { router } from './routes';
import { ModeProvider } from './contexts/ModeContext';

export default function App() {
  return (
    <ModeProvider>
      <RouterProvider router={router} />
    </ModeProvider>
  );
}