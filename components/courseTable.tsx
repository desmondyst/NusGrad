import React from "react";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import SelectPopover from "@/components/selectPopover";

const CourseTable = ({
    year,
    semesters,
    addCourse,
    removeCourse,
    removeYear,
}) => {
    return (
        <div className="rounded shadow-lg ">
            <div className="w-full flex flex-row justify-between items-center text-md leading-4 font-bold bg-[#FF5138] bg-opacity-75 text-[#4B5563] uppercase tracking-wider px-5 py-3 shadow border-r-2 border-gray-200">
                {year}
                <Button
                    type="button"
                    className="text-white rounded-2xl p-2 bg-transparent hover:bg-gray-200 item-right"
                    onClick={() => removeYear(year)}
                >
                    X
                </Button>
            </div>
            <div className="flex flex-col lg:flex-row">
                {Object.entries(semesters).map(([semester, courses], index) => (
                    <div
                        key={semester}
                        className="w-full lg:w-1/2 shadow border-r-2 border-gray-200"
                    >
                        <div className="w-full text-left text-xs leading-4 font-bold text-gray-500 uppercase bg-gray-200 tracking-wider px-5 py-4">
                            {semester}
                        </div>
                        <Table>
                            <TableBody>
                                {courses.map((course, courseIndex) => (
                                    <TableRow key={courseIndex}>
                                        <TableCell className="text-left">{`${
                                            courseIndex + 1
                                        }. ${course}`}</TableCell>
                                        <TableCell className="text-right">
                                            <Button
                                                type="button"
                                                className=" text-orange p-3 rounded-full bg-transparent hover:bg-gray-200 item-right"
                                                onClick={() =>
                                                    removeCourse(
                                                        year,
                                                        semester,
                                                        course
                                                    )
                                                }
                                            >
                                                X
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                        <div className="text-left py-1 hover:pl-1">
                            <SelectPopover
                                onClick={() =>
                                    addCourse(year, semester, "New Course")
                                }
                            ></SelectPopover>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CourseTable;
