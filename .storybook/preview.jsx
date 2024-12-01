import '../src/index.css';
import { RouterProvider } from 'react-router-dom';
import { router } from '@/router';

const preview = {
    parameters: {
        controls: {
            matchers: {
                color: /(background|color)$/i,
                date: /Date$/i
            }
        }
    },
    decorators: [(Story) => <Story />]
};

export default preview;
