'use client';
import { ReactNode } from 'react';

interface EnhancedLayoutProps { children: ReactNode; }
const EnhancedLayout = ({ children }: EnhancedLayoutProps) => {
    return <div className="min-h-screen bg-slate-900">{children}</div>;
};
export default EnhancedLayout;
