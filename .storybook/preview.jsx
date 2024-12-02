import '../src/index.css';
import { MemoryRouter } from 'react-router-dom';

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
