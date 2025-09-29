import Footer from "@/components/marketing/footer";
import Navbar from "@/components/marketing/navbar";
import React from 'react';

interface Props {
    children: React.ReactNode
}

const MarketingLayout = ({ children }: Props) => {
    return (
        <>
            {/* Development Notice */}
            <div className="fixed top-20 right-4 z-50 max-w-sm bg-yellow-500/90 text-yellow-900 text-xs p-3 rounded-lg shadow-lg backdrop-blur-sm border border-yellow-400/50">
                <div className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-yellow-900 rounded-full mt-1 flex-shrink-0"></div>
                    <div>
                        <p className="font-semibold mb-1">🚧 Site Under Development</p>
                        <p className="leading-relaxed">
                            User section is completely functional with all features working. 
                            Recruiter and admin sections are ready but not yet integrated.
                        </p>
                    </div>
                </div>
            </div>
            
            <Navbar />
            <main className="mx-auto w-full z-40 relative">
                {children}
            </main>
            {/* <Footer /> */}
        </>
    );
};

export default MarketingLayout
