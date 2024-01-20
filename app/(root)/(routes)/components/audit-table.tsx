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
        <div className="text-center justify-center p-2 m-4 mt-10 phone:mt-16 pt-16 tablet:pt-24 lg:pt-16 xl:pt-24 xl:mt-16 tracking-wider flex flex-col">
            {requirementData.map((requirement) => (
                <RequirementTable
                    key={requirement.id}
                    requirement={requirement}
                />
            ))}
        </div>
    );
}
