"use client";

import { useCourses } from "@/components/hooks/useCourse";
import { Button } from "@/components/ui/button";
import CourseTable from "@/components/courseTable";

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

    return null;
    // const { courses, addCourse, addNewYear, removeCourse, removeYear } =
    //     useCourses(initialCourses);

    return (
        <div className="w-full">
            {Object.entries(courses).map(([year, semesters]) => (
                <div key={year} className="mb-8 justify-center ">
                    <CourseTable
                        year={year}
                        semesters={semesters}
                        addCourse={addCourse}
                        removeCourse={removeCourse}
                        removeYear={removeYear}
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
