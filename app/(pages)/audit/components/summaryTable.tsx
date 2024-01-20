import React from "react";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";

const calculateProgress = (taken: number , total: number): number => {
    return taken / total * 100;
}

const totalMC: number = 160;

const RequirementCell = ({ requirement, border }) => (
    <TableCell className={`h-full flex flex-col items-center justify-center text-center ${border ? 'border-r border-gray-400' : ''}`}>
        <div className="pb-4">
            {requirement.name}
        </div>
        <Progress
            value={calculateProgress(requirement.taken, requirement.total)}
            className="w-[60%]"
            indicatorColor="bg-green-500"
        />
        <div className="pt-4">
            {requirement.taken} / {requirement.total} units taken
        </div>
    </TableCell>
);

const SummaryTable = ({ data, completedMC }) => {
  return (
    <div className="rounded shadow-lg w-full">
        <div className="w-full flex flex-row justify-between items-center text-md leading-4 font-bold bg-orange bg-opacity-75 text-[#4B5563] tracking-wider p-5 shadow border border-gray-300">
            Graduation Requirement Summary
        </div>
        <Table className="border border-gray-300">
            <TableBody className="border border-gray-300">
                {data.map((item, index) => (
                    <TableRow key={index} className="grid grid-cols-4 h-40 items-center hover:bg-transparent">
                        <RequirementCell requirement={item.req1} border />
                        <RequirementCell requirement={item.req2} border />
                        <RequirementCell requirement={item.req3} border />
                        <RequirementCell requirement={item.req4} border={false} />
                    </TableRow>
                ))}
            </TableBody>
        </Table>
        <div className="w-full flex flex-col lg:flex-row justify-between items-center text-base leading-4 font-bold bg-opacity-75  text-[#4B5563] tracking-wider px-5 py-3 border-2 border-gray-200">
            Completed Requirement
            <div className="w-full py-3 lg:w-1/2 lg:my-0">
                <Progress
                    value={calculateProgress(completedMC, totalMC)}
                    indicatorColor="bg-green-500"
                />
                <div className="mt-2 text-xs flex justify-center">
                    {completedMC} / {totalMC} units taken
                </div>
            </div>
        </div>
    </div>
  );
};

export default SummaryTable;
