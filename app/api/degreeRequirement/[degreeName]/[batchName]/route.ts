import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function GET(
    req: Request,
    {
        params,
    }: {
        params: { degreeName: string, batchName: string };
    }
) {
    try {
        const degree = await prismadb.degree.findUnique({
            where: {
                name: params.degreeName,
            },
        });

        const batch = await prismadb.batch.findUnique({
            where: {
                name: params.batchName,
            },
        });

        const degreeWithBatch = await prismadb.degreeWithBatch.findFirst({
            where: {
                AND: [{ degreeId: degree?.id, batchId: batch?.id }],
            },
        });

        const data = await prismadb.degreeRequirement.findMany({
            // add deg w batch id
            where: {
                degreeWithBatchId: degreeWithBatch.id,
            },
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

        return NextResponse.json(requirementData);
    } catch (error) {
        console.log("[DEGREE_REQUIREMENTS_GET]", error);
        return new NextResponse("Internal error", { status: 500 });
    }
}
