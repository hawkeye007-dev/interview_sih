import DashboardNavbar from "@/components/dashboard/navbar";
import React from 'react';

interface Props {
    children: React.ReactNode
}

const DashboardLayout = ({ children }: Props) => {
    return (
        <>
            <DashboardNavbar />
            <main className="mx-auto w-full z-40 relative min-h-screen bg-background">
                {children}
            </main>
        </>
    );
};

export default DashboardLayout; 