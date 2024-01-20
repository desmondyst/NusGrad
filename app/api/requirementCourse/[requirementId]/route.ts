import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function GET(
    req: Request,
    {
        params,
    }: {
        params: { requirementId: string };
    }
) {
    try {
        const data = await prismadb.requirementCourse.findMany({
            where: {
              requirementId: Number(params.requirementId),
            },
          });
        const courseData = await Promise.all(
            data.map(async (cou) => {
            return await prismadb.course.findUnique({
                where: {
                id: cou.courseId,
                },
            });
            })
        );
        return NextResponse.json(courseData);
    } catch (error) {
        console.log("[REQUIREMENTS_GET]", error);
        return new NextResponse("Internal error", { status: 500 });
    }
}