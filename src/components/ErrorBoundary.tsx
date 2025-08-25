import React from 'react';
import { AlertTriangle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

interface ErrorBoundaryProps {
  children: React.ReactNode;
}

export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('SEO Audit Error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-background flex items-center justify-center p-6">
          <Card className="brutal-border brutal-shadow bg-destructive/10 max-w-md">
            <CardHeader className="bg-destructive text-destructive-foreground">
              <CardTitle className="text-xl font-mono font-black uppercase tracking-wider">
                <AlertTriangle className="inline-block mr-2" />
                SYSTEM ERROR
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 text-center">
              <p className="font-mono font-bold uppercase tracking-wider mb-4">
                SOMETHING WENT WRONG
              </p>
              <p className="text-sm text-muted-foreground mb-4">
                {this.state.error?.message || 'An unexpected error occurred'}
              </p>
              <button
                onClick={() => window.location.reload()}
                className="bg-primary text-primary-foreground px-4 py-2 brutal-border brutal-shadow font-mono font-bold uppercase tracking-wider hover:brutal-shadow-hover"
              >
                RELOAD PAGE
              </button>
            </CardContent>
          </Card>
        </div>
      );
    }

    return this.props.children;
  }
}