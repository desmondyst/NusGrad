import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function GET(
    req: Request
    // { params }: { params: { storeId: string } }
) {
    try {
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

        return NextResponse.json(requirementData);
    } catch (error) {
        console.log("[DEGREE_REQUIREMENTS_GET]", error);
        return new NextResponse("Internal error", { status: 500 });
    }
}