import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
    try {
        const data = await prismadb.course.findMany({});

        return NextResponse.json(data);
    } catch (error) {
        console.log("[COURSES_GET]", error);
        return new NextResponse("Internal error", { status: 500 });
    }
}
