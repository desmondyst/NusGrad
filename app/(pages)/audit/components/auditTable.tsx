"use client";
import RequirementTable from "./requirementTable";
import useLocalStorage from "@/components/hooks/useLocalStorage";
import { useEffect, useState } from "react";

export default function AuditTable() {
    const localStorage = useLocalStorage();
    const savedUserDetails = localStorage.saved_data["userDetails"];
    const degreeName = savedUserDetails["degree"];
    const batchName = savedUserDetails["intake"];

    const [requirementData, setRequirementData] = useState([]);
    const encodedDegreeName = encodeURIComponent(degreeName);
    const encodedBatchName = encodeURIComponent(batchName);
    const URL = `${process.env.NEXT_PUBLIC_API_URL}/api/degreeRequirement/${encodedDegreeName}/${encodedBatchName}`;
    const getDegreeRequirement = async () => {
        const res = await fetch(URL);
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
                    localStorage={localStorage}
                />
            ))}
        </div>
    );
}
