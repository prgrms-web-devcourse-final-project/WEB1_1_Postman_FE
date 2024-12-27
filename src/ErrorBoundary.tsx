import { Component, ReactNode } from 'react';
import { useToastStore } from './hooks';

type ErrorBoundaryProps = {
    children: ReactNode;
    addToast: (message: string, type: 'success' | 'warning' | 'error') => void;
};

type WrapperProps = {
    children: ReactNode;
};

type ErrorBoundaryState = {
    hasError: boolean;
    errorMessage?: string;
};

class ErrorBoundaryClass extends Component<
    ErrorBoundaryProps,
    ErrorBoundaryState
> {
    constructor(props: ErrorBoundaryProps) {
        super(props);
        this.state = {
            hasError: false,
            errorMessage: ''
        };
    }

    static getDerivedStateFromError(error: Error) {
        return {
            hasError: true,
            errorMessage: error.message
        };
    }

    componentDidCatch(error: Error) {
        this.props.addToast(error.message, 'error');
    }

    render() {
        if (this.state.hasError) {
            return null;
        }

        return this.props.children;
    }
}

export const ErrorBoundary = ({ children }: WrapperProps) => {
    const { addToast } = useToastStore();

    return (
        <ErrorBoundaryClass addToast={addToast}>{children}</ErrorBoundaryClass>
    );
};
