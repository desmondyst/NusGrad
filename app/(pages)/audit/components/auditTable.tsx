"use client"
import RequirementTable from "./requirementTable";
import { useEffect, useState } from "react";

export default function AuditTable() {
  const [requirementData, setRequirementData] = useState([]);
  const URL = "http://localhost:3000/api/degreeRequirement";

  const getDegreeRequirement = async () => {
      const res = await fetch(URL);
      return res.json();
  };

  useEffect(() => {
    getDegreeRequirement().then(requirementData => setRequirementData(requirementData));
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
