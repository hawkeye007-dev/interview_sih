"use client";

import { DASHBOARD_NAV_LINKS } from "@/constants/dashboard";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import Icons from "../global/icons";
import Wrapper from "../global/wrapper";
import { Button } from "../ui/button";
import { cn } from "@/lib";
import { User, LogOut } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "../ui/dropdown-menu";

const DashboardNavbar = () => {
    const pathname = usePathname();
    const router = useRouter();

    const handleLogout = () => {
        router.push("/");
    };

    return (
        <header className="sticky top-0 w-full h-16 bg-background/80 backdrop-blur-sm z-50 border-b border-border/50">
            <Wrapper className="h-full">
                <div className="flex items-center justify-between h-full">
                    <div className="flex items-center">
                        <Link href="/dashboard" className="flex items-center gap-2">
                            <Icons.icon className="w-6" />
                            <span className="text-xl font-semibold hidden lg:block">
                                InterviewAI
                            </span>
                        </Link>
                    </div>

                    <div className="hidden lg:flex items-center gap-2">
                        <ul className="flex items-center gap-4">
                            {DASHBOARD_NAV_LINKS.map((link, index) => (
                                <li key={index} className="text-sm font-medium">
                                    <Link 
                                        href={link.href}
                                        className={cn(
                                            "transition-colors hover:text-primary px-3 py-2 rounded-md",
                                            pathname === link.href 
                                                ? "bg-primary/10 text-primary" 
                                                : "text-muted-foreground"
                                        )}
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="flex items-center gap-4">
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon" className="rounded-full">
                                    <User className="h-5 w-5" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-48">
                                <DropdownMenuItem asChild>
                                    <Link href="/dashboard/profile" className="flex items-center cursor-pointer">
                                        <User className="mr-2 h-4 w-4" />
                                        Profile
                                    </Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={handleLogout} className="cursor-pointer">
                                    <LogOut className="mr-2 h-4 w-4" />
                                    Logout
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </div>
            </Wrapper>
        </header>
    );
};

export default DashboardNavbar; 