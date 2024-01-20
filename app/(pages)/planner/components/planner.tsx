"use client";

import { Button } from "@/components/ui/button";
import CourseTable from "@/components/courseTable";
import useLocalStorage from "@/components/hooks/useLocalStorage";

const Planner = () => {

    const localStorage = useLocalStorage();
    const completedCourses = localStorage.saved_data["Completed"];
    const pendingCourses = localStorage.saved_data["Pending"];

    return (
        <div className="w-full">
            {Object.entries(completedCourses).map(([year]) => (
                <div key={year} className="mb-8 justify-center ">
                    <CourseTable
                        year={year}
                        completedForAY={completedCourses[year]}
                        pendingForAY={pendingCourses[year]}
                    />
                </div>
            ))}
            <div className="text-left">
                <Button
                    type="button"
                    className="bg-orange hover:bg-gray-100 hover:text-black"
                    onClick={localStorage.addYear}
                >
                    Add next AY
                </Button>
            </div>
        </div>
    );
};

export default Planner;
