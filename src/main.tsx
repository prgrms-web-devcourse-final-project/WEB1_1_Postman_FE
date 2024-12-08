import { createRoot } from 'react-dom/client';
import './index.css';
import { App } from '@/App';
import { registerServiceWorker } from './registerServiceWorker';

registerServiceWorker();

createRoot(document.getElementById('root')!).render(<App />);
