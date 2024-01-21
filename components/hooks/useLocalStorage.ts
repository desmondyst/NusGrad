"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface LocalStorage {
    saved_data: {};
    addUserDetails: (newDetails: any) => void;
    addYear: () => void;
    removeYear: (year: string) => void;
    removeCourseCompleted: (
        completedCourse: string,
        year: string,
        semester: string
    ) => void;
    addCoursePending: (
        completedCourse: string,
        year: string,
        semester: string
    ) => void;
    addCourseCompleted: (
        newCompletedCourse: string,
        AY: string,
        semester: string
    ) => void;
    removeCoursePending: (
        pendingCourse: string,
        year: string,
        semester: string
    ) => void;
}

// https://docs.pmnd.rs/zustand/integrations/persisting-store-data

const defaultData = {
    userDetails: {},
    AllOfCompleted: [],
    Completed: {},
    Pending: {},
};

const useLocalStorage = create(
    persist<LocalStorage>(
        (set, get) => ({
            saved_data: defaultData,
            addUserDetails: (newDetails) => {
                const currentSavedData = get().saved_data;
                const withAddedDetails = {
                    ...currentSavedData,
                    ["userDetails"]: newDetails,
                };
                set({
                    saved_data: withAddedDetails,
                });
            },
            containCourseCompleted: (completedCourse) => {
                const currentSavedData = get().saved_data;
                const con =
                    currentSavedData["AllOfCompleted"].indexOf(completedCourse);
                if (con > -1) {
                    return true;
                }
                return false;
            },
            // #NOTE: Completed functions not tested, waiting for audit page
            addCourseCompleted: (newCompletedCourse, AY, semester) => {
                const currentSavedData = get().saved_data;
                const currentSavedCompletedCourses =
                    currentSavedData["Completed"];
                if (currentSavedCompletedCourses[AY] == undefined) {
                    currentSavedCompletedCourses[AY] = {
                        "Semester 1": [],
                        "Semester 2": [],
                    };
                }
                const updatedSemester = [
                    ...currentSavedCompletedCourses[AY][semester],
                    newCompletedCourse,
                ];
                currentSavedData["AllOfCompleted"].push(newCompletedCourse);
                const withAddedDetails = {
                    ...currentSavedData,
                    ["Completed"]: {
                        ...currentSavedData["Completed"],
                        [AY]: {
                            ...currentSavedData["Completed"][AY],
                            [semester]: updatedSemester,
                        },
                    },
                };
                set({
                    saved_data: withAddedDetails,
                });
            },

            // #NOTE: Completed functions not tested, waiting for audit page
            removeCourseCompleted: (completedToRemove, AY, semester) => {
                const currentSavedData = get().saved_data;
                const currentSavedCompletedCourses =
                    currentSavedData["Completed"];
                const index =
                    currentSavedData["AllOfCompleted"].indexOf(
                        completedToRemove
                    );
                currentSavedData["AllOfCompleted"].splice(index, 1);

                const updatedSemester = currentSavedCompletedCourses[AY][
                    semester
                ].filter((c) => c != completedToRemove);

                const updatedDetails = {
                    ...currentSavedData,
                    ["Completed"]: {
                        ...currentSavedData["Completed"],
                        [AY]: {
                            ...currentSavedData["Completed"][AY],
                            [semester]: updatedSemester,
                        },
                    },
                };
                set({
                    saved_data: updatedDetails,
                });
            },

            addCoursePending: (newPendingCourse, AY, semester) => {
                const currentSavedData = get().saved_data;
                const currentSavedPendingCourses = currentSavedData["Pending"];
                const updatedSemester = [
                    ...currentSavedPendingCourses[AY][semester],
                    newPendingCourse,
                ];
                const withAddedDetails = {
                    ...currentSavedData,
                    ["Pending"]: {
                        ...currentSavedData["Pending"],
                        [AY]: {
                            ...currentSavedData["Pending"][AY],
                            [semester]: updatedSemester,
                        },
                    },
                };
                set({
                    saved_data: withAddedDetails,
                });
            },

            removeCoursePending: (pendingToRemove, AY, semester) => {
                const currentSavedData = get().saved_data;
                const currentSavedPendingCourses = currentSavedData["Pending"];

                const updatedSemester = currentSavedPendingCourses[AY][
                    semester
                ].filter((c) => c != pendingToRemove);

                const updatedDetails = {
                    ...currentSavedData,
                    ["Pending"]: {
                        ...currentSavedData["Pending"],
                        [AY]: {
                            ...currentSavedData["Pending"][AY],
                            [semester]: updatedSemester,
                        },
                    },
                };
                set({
                    saved_data: updatedDetails,
                });
            },

            addYear: () => {
                const currentSavedData = get().saved_data;
                // 2021/2022 Normal Intake

                const startingYear = currentSavedData["userDetails"][
                    "intake"
                ].substring(0, 4);

                // last stored year
                const lastYearKeyInString = Object.keys(
                    currentSavedData["Completed"]
                )
                    .sort()
                    .pop();

                let lastYear = parseInt(startingYear);

                // last stored year
                const lastStoredYear = parseInt(
                    lastYearKeyInString?.slice(3, 7)
                );

                if (lastStoredYear) {
                    lastYear = lastStoredYear + 1;
                }

                const nextYear = `AY ${lastYear} / ${lastYear + 1}`;

                const withAddedYear = {
                    ...currentSavedData,
                    ["Completed"]: {
                        ...currentSavedData["Completed"],
                        [nextYear]: {
                            "Semester 1": [],
                            "Semester 2": [],
                        },
                    },

                    ["Pending"]: {
                        ...currentSavedData["Pending"],
                        [nextYear]: {
                            "Semester 1": [],
                            "Semester 2": [],
                        },
                    },
                };
                set({
                    saved_data: withAddedYear,
                });
            },

            removeYear: (year) => {
                const currentSavedData = get().saved_data;
                const currentSavedCompletedCourses =
                    currentSavedData["Completed"];

                const completedWithYearRemoved = {
                    ...currentSavedCompletedCourses,
                };
                delete completedWithYearRemoved[year];

                const currentSavedPendingCourses = currentSavedData["Pending"];
                const pendingWithYearRemoved = {
                    ...currentSavedPendingCourses,
                };

                delete pendingWithYearRemoved[year];

                const withYearRemoved = {
                    ...currentSavedData,
                    ["Completed"]: completedWithYearRemoved,

                    ["Pending"]: pendingWithYearRemoved,
                };

                set({
                    saved_data: withYearRemoved,
                });
            },
        }),
        { name: "stored-data", storage: createJSONStorage(() => localStorage) }
    )
);

export default useLocalStorage;
