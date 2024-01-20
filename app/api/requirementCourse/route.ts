import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function POST(
    req: Request
) {
    try {
      const { requirementId } = req.body;

      const data = await prismadb.requirementCourse.findMany({
        where: {
          requirementId: requirementId,
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
        console.log("[REQUIREMENTS_POST]", error);
        return new NextResponse("Internal error", { status: 500 });
    }
}
