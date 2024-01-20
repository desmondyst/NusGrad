"use client";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { Progress } from "../../../../components/ui/progress";
import SelectPopover from "../../../../components/selectPopover";
import { useEffect, useState } from "react";
import SelectDatePopover from "@/components/selectDatePopover";

export default function RequirementTable({ requirement }) {
    const [courseData, setCourseData] = useState([]);

    const URL = `http://localhost:3000/api/requirementCourse/${requirement.id}`;
    useEffect(() => {
        fetch(URL)
            .then((response) => response.json())
            .then((data) => setCourseData(data));
    }, [requirement]);

    return (
        <div className="my-3 rounded shadow-lg pt-4" key={requirement.id}>
            <div className="w-full flex flex-col lg:flex-row justify-between items-center text-base leading-4 font-bold bg-opacity-75 bg-orange text-[#4B5563] uppercase tracking-wider px-5 py-3 border-2 border-gray-200">
                {requirement.name}
                <div className="w-full py-3 lg:w-1/2 lg:my-0">
                    <Progress
                        indicatorColor="bg-green-500"
                        value={(4 / requirement.unitsRequired) * 100}
                    />
                    <div className="mt-2 text-xs flex justify-center">
                        4/{requirement.unitsRequired} units taken
                    </div>
                </div>
            </div>
            <div>
                <Table>
                    <TableBody>
                        <>
                            {courseData
                                .filter((course) => course.compulsory)
                                .map((course, courseIndex) => (
                                    <TableRow
                                        className="border-2 border-gray-200"
                                        key={courseIndex}
                                    >
                                        <TableCell className="flex flex-row justify-between py-5 text-left text-sm">
                                            {`${courseIndex + 1}. ${
                                                course.code
                                            } ${course.name}`}
                                            <SelectDatePopover onSubmit={(year, semester) => console.log(year, semester)}/>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            {courseData.filter((course) => !course.compulsory)
                                .length !== 0 ? (
                                <TableRow>
                                    <TableCell className="flex align-left item-left justify-left text-left py-1">
                                        {/* <div>"HI"</div> */}
                                        <SelectPopover
                                            onClick={() =>
                                                localStorage.addCourseCompleted(
                                                    "Test",
                                                    "AY 2023/2024",
                                                    "Semester 1"
                                                )
                                            }
                                        />
                                    </TableCell>
                                </TableRow>
                            ) : (
                                <> </>
                            )}
                        </>
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}
