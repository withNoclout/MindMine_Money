import { Navbar } from "@/components/layout/Navbar";
import { Sidebar } from "@/components/layout/Sidebar";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex bg-background min-h-screen">
            <Sidebar />

            <div className="flex-1 ml-64 flex flex-col">
                <Navbar />

                {/* Main Content Area */}
                <main className="flex-1 mt-16 p-8 grid-background overflow-y-auto relative">
                    {/* Decorative Grid Overlay */}
                    <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-900/10 via-background to-background" />

                    <div className="relative z-10 max-w-7xl mx-auto">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
}
