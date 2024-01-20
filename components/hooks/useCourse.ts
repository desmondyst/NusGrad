import { useState } from "react";

export const useCourses = (initialCourses) => {
    // console.log(initialCourses);
    const [courses, setCourses] = useState(initialCourses);

    const addCourse = (year, semester, course) => {
        setCourses((prevCourses) => ({
            ...prevCourses,
            [year]: {
                ...prevCourses[year],
                [semester]: [...prevCourses[year][semester], course],
            },
        }));
    };

    const removeCourse = (year, semester, course) => {
        setCourses((prevCourses) => {
            const updatedSemester = prevCourses[year][semester].filter(
                (c) => c !== course
            );
            return {
                ...prevCourses,
                [year]: {
                    ...prevCourses[year],
                    [semester]: updatedSemester,
                },
            };
        });
    };

    const addNewYear = () => {
        const lastYearKey = Object.keys(courses).sort().pop();
        const lastYear = parseInt(lastYearKey?.slice(3, 7) ?? "2022");
        const nextYear = `AY ${lastYear + 1}/${lastYear + 2}`;
        setCourses((prevCourses) => ({
            ...prevCourses,
            [nextYear]: {
                "Semester 1": [],
                "Semester 2": [],
            },
        }));
    };

    const removeYear = (year) => {
        setCourses((prevCourses) => {
            const updatedCourses = { ...prevCourses };
            delete updatedCourses[year];
            return updatedCourses;
        });
    };

    return { courses, addCourse, addNewYear, removeCourse, removeYear };
};
