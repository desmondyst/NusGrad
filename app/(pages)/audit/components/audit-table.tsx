import prismadb from "@/lib/prismadb";
import RequirementTable from "@/components/requirementTable";

export default async function AuditTable() {
    const data = await prismadb.degreeRequirement.findMany({
        // add deg w batch id
        // where: {
        //     degreeWithBatchId:
        // }
    });

    const requirementData = await Promise.all(
        data.map(async (req) => {
            return await prismadb.requirement.findUnique({
                where: {
                    id: req.requirementId,
                },
            });
        })
    );

    return (
        <div className="w-full">
            {requirementData.map((requirement) => (
                <RequirementTable
                    key={requirement.id}
                    requirement={requirement}
                />
            ))}
        </div>
    );
}
