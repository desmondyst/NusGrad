import prismadb from "@/lib/prismadb";
import {
    courses,
    requirements,
    CSF,
    CSBF,
    IER,
    IP,
    MS,
    AT,
    AI,
    CGG,
    CSEC,
    DS,
    MIR,
    NDS,
    PC,
    PL,
    SWE,
    GEC,
    GESS,
    GEI,
    GEX,
    GEN,
} from "./data";
import { object } from "zod";

async function main() {
    const newCourse = await prismadb.course.createMany({
        data: courses,
    });
    const newDegree = await prismadb.degree.create({
        data: {
            name: "Bachelor of Computing in Computer Science",
        },
    });
    const newBatch = await prismadb.batch.create({
        data: {
            name: "2021/22 Normal Intake",
        },
    });
    const newDegreeWithBatch = await prismadb.degreeWithBatch.create({
        data: {
            degreeId: newDegree.id,
            batchId: newBatch.id,
        },
    });
    requirements.map(async (req, reqIndex) => {
        const reqData = await prismadb.requirement.create({
            data: {
                id: reqIndex + 1,
                name: req.name,
                unitsRequired: req.unitsRequired,
            },
        });
        switch (req.name) {
            case "Computer Science Foundation":
                CSF.map(async (key) => {
                    const courseData = await prismadb.course.findUnique({
                        where: {
                            code: key,
                        },
                    });
                    const newReqCourse =
                        await prismadb.requirementCourse.create({
                            data: {
                                requirementId: reqData.id,
                                courseId: courseData?.id,
                            },
                        });
                });
                break;
            case "Computer Science Breadth & Depth":
                CSBF.map(async (key) => {
                    const courseData = await prismadb.course.findUnique({
                        where: {
                            code: key,
                        },
                    });
                    const newReqCourse =
                        await prismadb.requirementCourse.create({
                            data: {
                                requirementId: reqData.id,
                                courseId: courseData?.id,
                            },
                        });
                });
                break;
            case "Industrial Experience Requirement":
                IER.map(async (key) => {
                    const courseData = await prismadb.course.findUnique({
                        where: {
                            code: key,
                        },
                    });
                    const newReqCourse =
                        await prismadb.requirementCourse.create({
                            data: {
                                requirementId: reqData.id,
                                courseId: courseData?.id,
                            },
                        });
                });
                break;
            case "IT Professionalism":
                IP.map(async (key) => {
                    const courseData = await prismadb.course.findUnique({
                        where: {
                            code: key,
                        },
                    });
                    const newReqCourse =
                        await prismadb.requirementCourse.create({
                            data: {
                                requirementId: reqData.id,
                                courseId: courseData?.id,
                            },
                        });
                });
                break;
            case "Mathematics & Sciences":
                MS.map(async (key) => {
                    const courseData = await prismadb.course.findUnique({
                        where: {
                            code: key,
                        },
                    });
                    const newReqCourse =
                        await prismadb.requirementCourse.create({
                            data: {
                                requirementId: reqData.id,
                                courseId: courseData?.id,
                            },
                        });
                });
                break;
            case "FA - Algorithms & Theory":
                AT.map(async (key) => {
                    const courseData = await prismadb.course.findUnique({
                        where: {
                            code: key,
                        },
                    });
                    const newReqCourse =
                        await prismadb.requirementCourse.create({
                            data: {
                                requirementId: reqData.id,
                                courseId: courseData?.id,
                            },
                        });
                });
                break;
            case "FA - Artificial Intelligence":
                AI.map(async (key) => {
                    const courseData = await prismadb.course.findUnique({
                        where: {
                            code: key,
                        },
                    });
                    const newReqCourse =
                        await prismadb.requirementCourse.create({
                            data: {
                                requirementId: reqData.id,
                                courseId: courseData?.id,
                            },
                        });
                });
                break;
            case "FA - Computer Graphics and Games":
                CGG.map(async (key) => {
                    const courseData = await prismadb.course.findUnique({
                        where: {
                            code: key,
                        },
                    });
                    const newReqCourse =
                        await prismadb.requirementCourse.create({
                            data: {
                                requirementId: reqData.id,
                                courseId: courseData?.id,
                            },
                        });
                });
                break;
            case "FA - Computer Security":
                CSEC.map(async (key) => {
                    const courseData = await prismadb.course.findUnique({
                        where: {
                            code: key,
                        },
                    });
                    const newReqCourse =
                        await prismadb.requirementCourse.create({
                            data: {
                                requirementId: reqData.id,
                                courseId: courseData?.id,
                            },
                        });
                });
                break;
            case "FA - Database Systems":
                DS.map(async (key) => {
                    const courseData = await prismadb.course.findUnique({
                        where: {
                            code: key,
                        },
                    });
                    const newReqCourse =
                        await prismadb.requirementCourse.create({
                            data: {
                                requirementId: reqData.id,
                                courseId: courseData?.id,
                            },
                        });
                });
                break;
            case "FA - Multimedia Information Retrieval":
                MIR.map(async (key) => {
                    const courseData = await prismadb.course.findUnique({
                        where: {
                            code: key,
                        },
                    });
                    const newReqCourse =
                        await prismadb.requirementCourse.create({
                            data: {
                                requirementId: reqData.id,
                                courseId: courseData?.id,
                            },
                        });
                });
                break;
            case "FA - Networking and Distributed Systems":
                NDS.map(async (key) => {
                    const courseData = await prismadb.course.findUnique({
                        where: {
                            code: key,
                        },
                    });
                    const newReqCourse =
                        await prismadb.requirementCourse.create({
                            data: {
                                requirementId: reqData.id,
                                courseId: courseData?.id,
                            },
                        });
                });
                break;
            case "FA - Parallel Computing":
                PC.map(async (key) => {
                    const courseData = await prismadb.course.findUnique({
                        where: {
                            code: key,
                        },
                    });
                    const newReqCourse =
                        await prismadb.requirementCourse.create({
                            data: {
                                requirementId: reqData.id,
                                courseId: courseData?.id,
                            },
                        });
                });
                break;
            case "FA - Programming Languages":
                PL.map(async (key) => {
                    const courseData = await prismadb.course.findUnique({
                        where: {
                            code: key,
                        },
                    });
                    const newReqCourse =
                        await prismadb.requirementCourse.create({
                            data: {
                                requirementId: reqData.id,
                                courseId: courseData?.id,
                            },
                        });
                });
                break;
            case "FA - Software Engineering":
                SWE.map(async (key) => {
                    const courseData = await prismadb.course.findUnique({
                        where: {
                            code: key,
                        },
                    });
                    const newReqCourse =
                        await prismadb.requirementCourse.create({
                            data: {
                                requirementId: reqData.id,
                                courseId: courseData?.id,
                            },
                        });
                });
                break;
            case "GEA":
                const courseData = await prismadb.course.findUnique({
                    where: {
                        code: "GEA1000",
                    },
                });
                const newReqCourse = await prismadb.requirementCourse.create({
                    data: {
                        requirementId: reqData.id,
                        courseId: courseData?.id,
                    },
                });
                break;
            case "GEC":
                GEC.map(async (key) => {
                    const courseData = await prismadb.course.findUnique({
                        where: {
                            code: key,
                        },
                    });
                    const newReqCourse =
                        await prismadb.requirementCourse.create({
                            data: {
                                requirementId: reqData.id,
                                courseId: courseData?.id,
                            },
                        });
                });
                break;
            case "GEI":
                GEI.map(async (key) => {
                    const courseData = await prismadb.course.findUnique({
                        where: {
                            code: key,
                        },
                    });
                    const newReqCourse =
                        await prismadb.requirementCourse.create({
                            data: {
                                requirementId: reqData.id,
                                courseId: courseData?.id,
                            },
                        });
                });
                break;
            case "GESS":
                GESS.map(async (key) => {
                    const courseData = await prismadb.course.findUnique({
                        where: {
                            code: key,
                        },
                    });
                    const newReqCourse =
                        await prismadb.requirementCourse.create({
                            data: {
                                requirementId: reqData.id,
                                courseId: courseData?.id,
                            },
                        });
                });
                break;
            case "GEN":
                GEN.map(async (key) => {
                    const courseData = await prismadb.course.findUnique({
                        where: {
                            code: key,
                        },
                    });
                    const newReqCourse =
                        await prismadb.requirementCourse.create({
                            data: {
                                requirementId: reqData.id,
                                courseId: courseData?.id,
                            },
                        });
                });
                break;
            case "GEX":
                GEX.map(async (key) => {
                    const courseData = await prismadb.course.findUnique({
                        where: {
                            code: key,
                        },
                    });
                    const newReqCourse =
                        await prismadb.requirementCourse.create({
                            data: {
                                requirementId: reqData.id,
                                courseId: courseData?.id,
                            },
                        });
                });
                break;
        }
        await prismadb.degreeRequirement.create({
            data: {
                degreeWithBatchId: newDegreeWithBatch.id,
                requirementId: reqData.id,
            },
        });
    });
}

main()
    .then(async () => {
        await prismadb.$disconnect();
    })

    .catch(async (e) => {
        console.error(e);

        await prismadb.$disconnect();

        process.exit(1);
    });
