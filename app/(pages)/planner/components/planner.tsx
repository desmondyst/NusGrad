"use client";

import { useCourses } from "@/components/hooks/useCourse";
import { Button } from "@/components/ui/button";
import CourseTable from "@/components/courseTable";
import useLocalStorage from "@/components/hooks/useLocalStorage";

const Planner = () => {
    // To be updated with actual data
    // const initialCourses = {
    //     "AY 2023/2024": {
    //         "Semester 1": ["Course 1", "Course 2"],
    //         "Semester 2": ["Course 3", "Course 4"],
    //     },
    //     "AY 2024/2025": {
    //         "Semester 1": ["Course 5", "Course 6"],
    //         "Semester 2": ["Course 7", "Course 8"],
    //     },
    // };

    const initialCourses = {
        AllOfCompleted: new Set(),
        Completed: {
            "AY 2023/2024": {
                "Semester 1": ["Course 1", "Course 2"],
                "Semester 2": ["Course 3", "Course 4"],
            },
            "AY 2024/2025": {
                "Semester 1": ["Course 5", "Course 6"],
                "Semester 2": ["Course 7", "Course 8"],
            },
        },
        Pending: {
            "AY 2023/2024": {
                "Semester 1": ["Pending Course 1", "Pending Course 2"],
                "Semester 2": ["Pending Course 3", "Pending Course 4"],
            },
            "AY 2024/2025": {
                "Semester 1": ["Pending Course 5", "Pending Course 6"],
                "Semester 2": ["Pending Course 7", "Pending Course 8"],
            },
        },
    };

    const { courses, addCourse, addNewYear, removeCourse, removeYear } =
        useCourses(initialCourses);

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
                    onClick={addNewYear}
                >
                    Add next AY
                </Button>
            </div>
        </div>
    );
};

export default Planner;
