"use client";
import RequirementTable from "./requirementTable";
import { useEffect, useState } from "react";
import useLocalStorage from "@/components/hooks/useLocalStorage";

export default function AuditTable() {
    const localStorage = useLocalStorage();
    const savedUserDetails = localStorage.saved_data["userDetails"];
    const degreeName = savedUserDetails["degree"];
    const batchName = savedUserDetails["intake"];

    const [requirementData, setRequirementData] = useState([]);
    const URL = "http://localhost:3000/api/degreeRequirement";

    const getDegreeRequirement = async () => {
        const res = await fetch(URL, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                degreeName: degreeName,
                batchName: batchName,
            }),
        });
        return res.json();
    };

    useEffect(() => {
        getDegreeRequirement().then((requirementData) =>
            setRequirementData(requirementData)
        );
    }, []);

    return (
        <div className="w-full pt-4">
            {requirementData.map((requirement, index) => (
                <RequirementTable
                    key={requirement.id}
                    requirement={requirement}
                />
            ))}
        </div>
    );
}
