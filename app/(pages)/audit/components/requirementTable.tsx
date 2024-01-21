"use client";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { Progress } from "../../../../components/ui/progress";
import SelectOptionalPopover from "../../../../components/selectOptionalPopover";
import { useEffect, useState } from "react";
import SelectDatePopover from "@/components/selectDatePopover";

const years = [
    {
        value: "AY 2022 / 2023",
        label: "AY 2022 / 2023",
    },
    {
        value: "AY 2023 / 2024",
        label: "AY 2023 / 2024",
    },
];

const semesters = [
    {
        value: "Semester 1",
        label: "Semester 1",
    },
    {
        value: "Semester 2",
        label: "Semester 2",
    },
    // Add more semesters as needed
];

export default function RequirementTable({ requirement, localStorage }) {
    const startingYear = localStorage["saved_data"]["userDetails"][
        "intake"
    ].substring(0, 4);

    const startingSem = `AY ${startingYear} ${parseInt(startingYear) + 1}`;

    const numberOfYears = 4;

    // Create an array with academic years repeated four times
    const years = Array.from({ length: numberOfYears }, (_, index) => {
        const startYear = parseInt(startingSem.split(" ")[1].trim());
        const endYear = parseInt(startingSem.split(" ")[2].trim());
        const newStartYear = startYear + index;
        const newEndYear = endYear + index;

        return `${newStartYear} / ${newEndYear}`;
    });

    const currentDate = new Date();
    const currentYear = currentDate.getFullYear() % 100;

    // filter those years that has not passed
    const findYearsPassed = () =>
        years.filter(
            (year) =>
                parseInt(year.substring(year.length - 2), 10) < currentYear
        );

    const yearsPassed = findYearsPassed().map((year) => ({
        value: `AY ${year}`,
        label: `AY ${year}`,
    }));
    const [courseData, setCourseData] = useState([]);
    const [units, setUnits] = useState(0);
    const URL = `${process.env.NEXT_PUBLIC_API_URL}/api/requirementCourse/${requirement.id}`;
    useEffect(() => {
        fetch(URL)
            .then((response) => response.json())
            .then((data) => {
                setCourseData(data);
            });
    }, [localStorage, requirement]);

    useEffect(() => {
        setUnits(
            courseData.reduce((accumulator, currentValue) => {
                if (localStorage.containCourseCompleted(currentValue.code)) {
                    return accumulator + currentValue.credit;
                } else {
                    return accumulator;
                }
            }, 0)
        );
    }, [courseData, localStorage]);

    return (
        <div className="my-3 rounded shadow-lg pt-4" key={requirement.id}>
            <div className="w-full flex flex-col lg:flex-row justify-between items-center text-base leading-4 font-bold bg-opacity-75 bg-orange text-[#4B5563] tracking-wider px-5 py-3 border-2 border-gray-200">
                {requirement.name}
                <div className="w-full py-3 lg:w-1/2 lg:my-0">
                    <Progress
                        indicatorColor="bg-green-500"
                        value={(units / requirement.unitsRequired) * 100}
                    />
                    <div className="mt-2 text-xs flex justify-center">
                        {units}/{requirement.unitsRequired} units taken
                    </div>
                </div>
            </div>
            <div>
                <Table>
                    <TableBody>
                        <>
                            {courseData
                                .filter(
                                    (course) =>
                                        course.compulsory ||
                                        localStorage.containCourseCompleted(
                                            course.code
                                        )
                                )
                                .map((course, courseIndex) => (
                                    <TableRow
                                        className="border-2 border-gray-200"
                                        key={courseIndex}
                                    >
                                        <TableCell className="flex flex-row justify-between py-5 text-left text-sm">
                                            {`${courseIndex + 1}. ${
                                                course.code
                                            } ${course.name}`}
                                            <SelectDatePopover
                                                localStorage={localStorage}
                                                setUnits={setUnits}
                                                units={units}
                                                course={course}
                                                years={yearsPassed}
                                                semesters={semesters}
                                            />
                                        </TableCell>
                                    </TableRow>
                                ))}
                            {courseData.filter((course) => !course.compulsory)
                                .length !== 0 ? (
                                <TableRow>
                                    <TableCell className="flex align-left item-left justify-left text-left py-1">
                                        <SelectOptionalPopover
                                            localStorage={localStorage}
                                            coursesCode={courseData
                                                .filter(
                                                    (course) =>
                                                        !course.compulsory
                                                )
                                                .map((c) => ({
                                                    value: c.code,
                                                    label: c.code,
                                                }))}
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
