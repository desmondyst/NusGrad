import React from "react";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";
import { useState, useEffect } from "react";
import useLocalStorage from "@/components/hooks/useLocalStorage";

const calculateProgress = (taken: number, total: number): number => {
    return (taken / total) * 100;
};

const totalMC: number = 160;

const RequirementCell = ({ localStorage, requirement, border }) => {
    const [courseData, setCourseData] = useState([]);
    const [units, setUnits] = useState(0);
    const URL = `http://localhost:3000/api/requirementCourse/${requirement.id}`;
    useEffect(() => {
        fetch(URL)
            .then((response) => response.json())
            .then((data) => {
                setCourseData(data);
            });
    }, [requirement]);

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
        <TableCell
            className={`h-full flex flex-col items-center justify-center text-center ${
                border ? "border-r border-gray-400" : ""
            }`}
        >
            <div className="pb-4">{requirement.name}</div>
            <Progress
                value={calculateProgress(units, requirement.unitsRequired)}
                className="w-[60%]"
                indicatorColor="bg-green-500"
            />
            <div className="pt-4">
                {units}/{requirement.unitsRequired} units taken
            </div>
        </TableCell>
    );
};

const requirementsList = [
    "Computer Science Foundation",
    "Computer Science Breadth & Depth",
    "Mathematics & Sciences",
];

const SummaryTable = () => {
    const localStorage = useLocalStorage();
    const savedUserDetails = localStorage.saved_data["userDetails"];
    const degreeName = savedUserDetails["degree"];
    const batchName = savedUserDetails["intake"];

    const [requirementData, setRequirementData] = useState([]);
    const encodedBatchName = encodeURIComponent(batchName);

    const encodedDegreeName = encodeURIComponent(degreeName);
    const URL = `http://localhost:3000/api/degreeRequirement/${encodedDegreeName}/${encodedBatchName}`;
    const getDegreeRequirement = async () => {
        const res = await fetch(URL);
        return res.json();
    };

    useEffect(() => {
        getDegreeRequirement().then((requirementData) =>
            setRequirementData(requirementData)
        );
    }, []);
    const [course, setCourse] = useState([]);
    const [units, setUnits] = useState(0);
    useEffect(() => {
        Promise.all(
            localStorage.saved_data["AllOfCompleted"].map((code) =>
                fetch(`http://localhost:3000/api/course/${code}`).then(
                    (response) => response.json()
                )
            )
        ).then((data) => {
            setCourse(data);
        });
    }, [localStorage]);
    useEffect(() => {
        setUnits(
            course.reduce((accumulator, currentValue) => {
                return accumulator + currentValue.credit;
            }, 0)
        );
    }, [course]);
    return (
        <div className="rounded shadow-lg w-full">
            <div className="w-full flex flex-row justify-between items-center text-md leading-4 font-bold bg-orange bg-opacity-75 text-[#4B5563] tracking-wider p-5 shadow border border-gray-300">
                Graduation Requirement Summary
            </div>
            <Table className="border border-gray-300">
                <TableBody className="border border-gray-300">
                    <TableRow className="grid grid-row-3 lg:grid-cols-3 h-full items-center hover:bg-transparent">
                        {requirementData
                            .filter((requirement) =>
                                requirementsList.includes(requirement.name)
                            )
                            .map((item, index) => (
                                <RequirementCell
                                    localStorage={localStorage}
                                    requirement={item}
                                    border
                                />
                            ))}
                    </TableRow>
                </TableBody>
            </Table>
            <div className="w-full flex flex-col lg:flex-row justify-between items-center text-base leading-4 font-bold bg-opacity-75  text-[#4B5563] tracking-wider px-5 py-3 border-2 border-gray-200">
                Completed Requirement
                <div className="w-full py-3 lg:w-1/2 lg:my-0">
                    <Progress
                        value={calculateProgress(units, totalMC)}
                        indicatorColor="bg-green-500"
                    />
                    <div className="mt-2 text-xs flex justify-center">
                        {units}/{totalMC} units taken
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SummaryTable;
