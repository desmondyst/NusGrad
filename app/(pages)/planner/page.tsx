"use client";

import Planner from "@/app/(pages)/planner/components/planner";
import { userTrackerDetails } from "@/app/types";
import useLocalStorage from "@/components/hooks/useLocalStorage";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

export default function PlannerPage() {
    // const [userTrackerDetails, setUserTrackerDetails] = useState(
    //     {} as userTrackerDetails
    // );
    // useEffect(() => {
    //     const jsonUserDetails = localStorage.getItem("userDetails");
    //     if (jsonUserDetails) {
    //         const savedUserDetails = JSON.parse(jsonUserDetails);
    //         setUserTrackerDetails(savedUserDetails);
    //     }
    // }, []);

    // console.log(userTrackerDetails);

    const localStorage = useLocalStorage();
    const savedUserDetails = localStorage.saved_data["userDetails"];

    const isEmptyObject = (obj: userTrackerDetails) => {
        return Object.keys(obj).length === 0;
    };

    return (
        <div className="h-screen">
            (
                <div className="h-full flex flex-col w-full items-center">
                    <div className="w-11/12 lg:w-10/12 xl:w-11/12 h-full mt-32 lg:mt-28 tablet:mt-40 xl:mt-20 flex flex-col justify-center items-center">
                        <div className="mr-auto font-extrabold mb-5 tablet:text-xl xl:text-2xl">
                            {`${savedUserDetails.degree} (${savedUserDetails.intake})`}
                        </div>
                        <Planner />
                    </div>
                </div>
            )
        </div>
    );
}
