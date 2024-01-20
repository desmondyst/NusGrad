"use client";

import { Button } from "@/components/ui/button";
import CourseTable from "@/components/courseTable";
import useLocalStorage from "@/components/hooks/useLocalStorage";

const Planner = ({ courses }) => {
    const localStorage = useLocalStorage();
    const completedCourses = localStorage.saved_data["Completed"];
    const pendingCourses = localStorage.saved_data["Pending"];

    const isEmptyObject = (obj: any) => {
        return Object.keys(obj).length === 0;
    };

    return (
        <div className="w-full">
            {!isEmptyObject(completedCourses) ? (
                <>
                    {Object.entries(completedCourses).map(([year]) => (
                        <div key={year} className="mb-8 justify-center ">
                            <CourseTable
                                courses={courses}
                                year={year}
                                completedForAY={completedCourses[year]}
                                pendingForAY={pendingCourses[year]}
                            />
                        </div>
                    ))}
                </>
            ) : (
                <>Your planner is empty. </>
            )}

            <div className="text-left mt-7">
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
