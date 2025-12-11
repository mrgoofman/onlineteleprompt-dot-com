import { Header } from "@/components/layout/header";
import { Sidebar } from "@/components/layout/sidebar";

export default function AuthenticatedLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex min-h-screen bg-muted/40 w-full">
            <div className="hidden border-r bg-card lg:block">
                <Sidebar />
            </div>
            <div className="flex flex-col w-full min-h-screen">
                <Header />
                <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
                    {children}
                </main>
            </div>
        </div>
    );
}
