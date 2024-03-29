"use client";

import Planner from "@/app/(pages)/planner/components/planner";
import { userTrackerDetails } from "@/app/types";
import useLocalStorage from "@/components/hooks/useLocalStorage";
import { Button } from "@/components/ui/button";
import { courses } from "@/mock/data";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function PlannerPage() {
    const localStorage = useLocalStorage();
    const savedUserDetails = localStorage.saved_data["userDetails"];

    const isEmptyObject = (obj: userTrackerDetails) => {
        return Object.keys(obj).length === 0;
    };

    const [courses, setCourses] = useState([]);

    const URL = `${process.env.NEXT_PUBLIC_API_URL}/api/course`;
    useEffect(() => {
        const courses = fetch(URL)
            .then((response) => response.json())
            .then((data) => setCourses(data));
    }, []);

    return (
        <div className="h-screen">
            {isEmptyObject(savedUserDetails) ? (
                // please set up your tracker first, button display below
                <div className="h-full flex flex-col w-full items-center justify-center">
                    <div className="w-11/12 lg:w-10/12 xl:w-11/12 h-full flex flex-col justify-center items-center">
                        <div className="text-xl lg:text-5xl text-center">
                            Sorry! You need to set up your tracker before you
                            are able to use the Grad Planner
                            {/* #NOTE: Add a button here to redirect to set up */}
                        </div>
                        <Link href="/#tracker-form">
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
                        <Planner courses={courses} />
                    </div>
                </div>
            )}
        </div>
    );
}
