"use client";

import useLocalStorage from "@/components/hooks/useLocalStorage";
import AuditTable from "./components/auditTable";
import SummaryTable from "./components/summaryTable";
import { Button } from "@/components/ui/button";
import Link from "next/link";

import { Link as ScrollLink, animateScroll } from "react-scroll";
import { useEffect, useState } from "react";

export default function AuditPage() {
    const localStorage = useLocalStorage();
    const savedUserDetails = localStorage.saved_data["userDetails"];

    const isEmptyObject = (obj: any) => {
        return Object.keys(obj).length === 0;
    };

    return (
        <div className="h-screen">
            {isEmptyObject(savedUserDetails) ? (
                // please set up your tracker first, button display below
                <div className="h-full flex flex-col w-full items-center justify-center">
                    <div className="w-11/12 lg:w-10/12 xl:w-11/12 h-full flex flex-col justify-center items-center">
                        <div className="text-xl lg:text-5xl text-center">
                            Sorry! You need to set up your tracker before you
                            are able to use the Audit Report
                            {/* #NOTE: Add a button here to redirect to set up */}
                        </div>

                        <Link href="/#tracker-form ">
                            <Button className="mt-10">Set up now.</Button>
                        </Link>
                    </div>
                </div>
            ) : (
                <div className="h-full flex flex-col w-full items-center">
                    <div className="w-11/12 lg:w-10/12 xl:w-11/12 h-full mt-32 lg:mt-28 tablet:mt-40 xl:mt-20 flex flex-col items-center">
                        <div className="mr-auto font-extrabold mb-5 tablet:text-xl xl:text-2xl">
                            {`${savedUserDetails.degree} (${savedUserDetails.intake})`}
                        </div>
                        {/* <Planner /> */}
                        <SummaryTable />
                        <AuditTable />
                    </div>
                </div>
            )}
        </div>
    );
}
