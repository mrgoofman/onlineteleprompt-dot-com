"use client";

import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";

export function Header() {
    const { data: session } = useSession();
    const pathname = usePathname();

    // Simple title mapping or breadcrumb logic
    const getTitle = () => {
        if (pathname === "/dashboard") return "Dashboard";
        if (pathname?.startsWith("/dashboard/scripts")) return "My Scripts";
        if (pathname?.startsWith("/prompter")) return "Teleprompter";
        if (pathname?.startsWith("/dashboard/settings")) return "Settings";
        return "Dashboard";
    };

    return (
        <header className="flex h-14 items-center gap-4 border-b bg-card px-4 lg:h-[60px] lg:px-6">
            <div className="flex-1">
                <h1 className="text-lg font-semibold md:text-2xl">{getTitle()}</h1>
            </div>
            <div className="flex items-center gap-4">
                {session?.user && (
                    <div className="flex items-center gap-2">
                        <span className="text-sm font-medium hidden md:inline-block">
                            {session.user.name}
                        </span>
                        {session.user.image && (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img
                                src={session.user.image}
                                alt="Avatar"
                                className="h-8 w-8 rounded-full border"
                            />
                        )}
                    </div>
                )}
            </div>
        </header>
    );
}
