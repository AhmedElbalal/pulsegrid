// shared/ui/src/Page.tsx
import React from 'react';

export interface PageProps {
    title: string;
    subtitle?: string;
    children: React.ReactNode;
}

export const Page: React.FC<PageProps> = ({ title, subtitle, children }) => {
    return (
        <div style={{
            minHeight: '100vh',
            background: '#0f172a',
            color: 'white',
            padding: '2rem'
        }}>
            <header style={{ marginBottom: '2rem' }}>
                <h1 style={{
                    fontSize: '2.5rem',
                    margin: 0,
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent'
                }}>
                    {title}
                </h1>
                {subtitle && (
                    <p style={{
                        fontSize: '1.1rem',
                        color: '#94a3b8',
                        margin: '0.5rem 0 0 0'
                    }}>
                        {subtitle}
                    </p>
                )}
            </header>
            <main>
                {children}
            </main>
        </div>
    );
};