import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function GET(
    req: Request,
    {
        params,
    }: {
        params: { courseCode: string};
    }
)   {
    try {
        const data = await prismadb.course.findUnique({
            where: {
                code: params.courseCode
            }
        });
        return NextResponse.json(data);
    } catch (error) {
        console.log("[COURSES_GET]", error);
        return new NextResponse("Internal error", { status: 500 });
    }
}
