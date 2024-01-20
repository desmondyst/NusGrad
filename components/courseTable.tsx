import React from "react";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import SelectPopover from "@/components/selectPopover";
import useLocalStorage from "./hooks/useLocalStorage";

const CourseTable = ({ courses, year, completedForAY, pendingForAY }) => {
    const localStorage = useLocalStorage();

    const coursesCode = courses.map((c) => ({ value: c.code, label: c.code }));

    const currentDate = new Date();
    const currentYear = currentDate.getFullYear() % 100;
    const currentMonth = currentDate.getMonth();

    const findCurrentSemesterFromMonth = (month) => {
        if (month >= 7 && month <= 11) {
            // sem 1 August to December
            return 0;
        } else if (month >= 0 && month < 4) {
            // sem 2
            return 1;
        } else if (month >= 5 && month < 6) {
            // special term 1
            return 2;
        } else {
            // special term 2
            return 3;
        }
    };

    const parseSemester = (semester) => {
        switch (semester) {
            case "Semester 1":
                return 0;
            case "Semester 2":
                return 1;
            case "Special Term 1":
                return 2;
            case "Special Term 2":
                return 3;
            default:
                return -1;
        }
    };

    const hasPassed = (year, semester) => {
        const sliced_year = parseInt(year.substring(year.length - 2), 10);

        if (sliced_year < currentYear) {
            return true;
        } else if (
            sliced_year === currentYear &&
            parseSemester(semester) < findCurrentSemesterFromMonth(currentMonth)
        ) {
            return true;
        } else {
            return false;
        }
    };

    return (
        <div className="rounded shadow-lg ">
            <div className="w-full flex flex-row justify-between items-center text-md leading-4 font-bold bg-orange bg-opacity-75 text-[#4B5563] uppercase tracking-wider px-5 py-3 shadow border-r-2 border-gray-200">
                {year}
                <Button
                    type="button"
                    className="text-white rounded-2xl p-2 bg-transparent hover:bg-gray-200 item-right"
                    onClick={() => localStorage.removeYear(year)}
                >
                    X
                </Button>
            </div>
            <div className="flex flex-col lg:flex-row">
                {Object.entries(completedForAY).map(([semester], index) => (
                    <div
                        key={semester}
                        className="w-full lg:w-1/2 shadow border-r-2 border-gray-200"
                    >
                        <div className="w-full text-left text-xs leading-4 font-bold text-gray-500 uppercase bg-gray-200 tracking-wider px-5 py-4">
                            {semester}
                        </div>
                        <Table>
                            <TableBody>
                                {hasPassed(year, semester) ? (
                                    <>
                                        {completedForAY[semester].map(
                                            (
                                                completedCourse,
                                                completedCourseIndex
                                            ) => (
                                                <TableRow
                                                    key={completedCourseIndex}
                                                    className="w-full h-16"
                                                >
                                                    <TableCell className="text-left w-full">
                                                        <div className="">{`${
                                                            completedCourseIndex +
                                                            1
                                                        }. ${completedCourse}`}</div>
                                                    </TableCell>
                                                    <TableCell className="text-right">
                                                        <Button
                                                            type="button"
                                                            className=" text-orange p-3 rounded-full bg-transparent hover:bg-gray-200 item-right"
                                                            onClick={() =>
                                                                localStorage.removeCourseCompleted(
                                                                    completedCourse,
                                                                    year,
                                                                    semester
                                                                )
                                                            }
                                                        >
                                                            X
                                                        </Button>
                                                    </TableCell>
                                                </TableRow>
                                            )
                                        )}
                                        <div className="text-left py-1">
                                            <SelectPopover
                                                onClick={(course) => {
                                                    localStorage.addCourseCompleted(
                                                        course.toUpperCase(),
                                                        year,
                                                        semester
                                                    );
                                                }}
                                                coursesCode={coursesCode}
                                            ></SelectPopover>
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        {pendingForAY[semester].map(
                                            (
                                                pendingCourse,
                                                pendingCourseIndex
                                            ) => (
                                                <TableRow
                                                    key={pendingCourseIndex}
                                                    className="h-16"
                                                >
                                                    <TableCell className="text-left w-full">
                                                        <div>{`${
                                                            pendingCourseIndex +
                                                            1
                                                        }. ${pendingCourse}`}</div>
                                                    </TableCell>
                                                    <TableCell className="text-right">
                                                        <Button
                                                            type="button"
                                                            className=" text-orange p-3 rounded-full bg-transparent hover:bg-gray-200 item-right"
                                                            onClick={() =>
                                                                localStorage.removeCoursePending(
                                                                    pendingCourse,
                                                                    year,
                                                                    semester
                                                                )
                                                            }
                                                        >
                                                            X
                                                        </Button>
                                                    </TableCell>
                                                </TableRow>
                                            )
                                        )}
                                        <div className="text-left py-1">
                                            <SelectPopover
                                                onClick={(course) =>
                                                    localStorage.addCoursePending(
                                                        course.toUpperCase(),
                                                        year,
                                                        semester
                                                    )
                                                }
                                                coursesCode={coursesCode}
                                            ></SelectPopover>
                                        </div>
                                    </>
                                )}
                            </TableBody>
                        </Table>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CourseTable;
