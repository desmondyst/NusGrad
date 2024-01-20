import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { Progress } from "./ui/progress";
import prismadb from "@/lib/prismadb";
import { Checkbox } from "./ui/checkbox";

export default async function RequirementTable({ requirement }) {
    const data = await prismadb.requirementCourse.findMany({
        where: {
            requirementId: requirement.id,
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

    return (
        <div className="my-3 rounded shadow-lg pt-4" key={requirement.id}>
            <div className="w-full flex flex-col lg:flex-row justify-between items-center text-base leading-4 font-bold bg-opacity-75 bg-orange text-[#4B5563] uppercase tracking-wider px-5 py-3 border-2 border-gray-200">
                {requirement.name}
                <div className="w-full py-3 lg:w-1/2 lg:my-0">
                    <Progress
                        indicatorColor="bg-green-500"
                        value={(4 / requirement.unitsRequired) * 100}
                    />
                    <div className="mt-2 text-xs flex justify-center">
                        4/{requirement.unitsRequired} units taken
                    </div>
                </div>
            </div>
            <div>
                <Table>
                    <TableBody>
                        {courseData
                            .filter((course) => course.compulsory)
                            .map((course, courseIndex) => (
                                <TableRow
                                    className="border-2 border-gray-200"
                                    key={course.id}
                                >
                                    <TableCell className="flex flex-row justify-between py-5 text-left text-sm">
                                        {`${courseIndex + 1}. ${course.code} ${
                                            course.name
                                        }`}
                                        <Checkbox className="mr-5" />
                                    </TableCell>
                                </TableRow>
                            ))}
                        {courseData.filter((course) => !course.compulsory)
                            .length !== 0 ? (
                            <TableRow>Hi</TableRow>
                        ) : (
                            <> </>
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}
