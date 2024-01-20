"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import book from "../public/book.png";
import calendar from "../public/calendar.png";

const SideBar = () => {
    const pathname = usePathname();
    const getTextColor = (path: string) =>
        pathname === path ? "text-orange" : "text-black";

    return (
        <div className="flex flex-col h-full p-4 bg-white lg:opacity-85 shadow border-r-2 border-gray-200">
            <nav className="flex flex-row lg:flex-col h-full lg:mt-3 space-y-0 space-x-12 justify-around lg:justify-start lg:space-x-0 lg:space-y-12">
                <Link href="/audit">
                    <div className="flex items-center ml-1">
                        <Image
                            className="mr-2"
                            src={book}
                            alt="Audit Report"
                            height="25"
                            width="25"
                        />
                        <p
                            className={`ml-1 text-sm cursor-pointer ${getTextColor(
                                "/audit"
                            )}`}
                        >
                            Audit Report
                        </p>
                    </div>
                </Link>
                <Link href="/planner">
                    <div className="flex items-center ml-1">
                        <Image
                            className="mr-2"
                            src={calendar}
                            alt="Grad Planner"
                            height="25"
                            width="25"
                        />
                        <p
                            className={`ml-1 text-sm cursor-pointer ${getTextColor(
                                "/planner"
                            )}`}
                        >
                            Grad Planner
                        </p>
                    </div>
                </Link>
            </nav>
        </div>
    );
};

export default SideBar;
