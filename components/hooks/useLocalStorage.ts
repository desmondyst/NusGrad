"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface LocalStorage {
    saved_data: {};
}

// https://docs.pmnd.rs/zustand/integrations/persisting-store-data

const defaultData = {
    userDetails: {},
    // AllOfCompleted: new Set(),
    // Completed: {},
    // Pending: {},

    AllOfCompleted: new Set(),
    Completed: {
        "AY 2023/2024": {
            "Semester 1": ["Course 1000", "Course 2"],
            "Semester 2": ["Course 3", "Course 4"],
        },
        "AY 2024/2025": {
            "Semester 1": ["Course 5", "Course 6"],
            "Semester 2": ["Course 7", "Course 8"],
        },
    },
    Pending: {
        "AY 2023/2024": {
            "Semester 1": ["Pending Course 3", "Pending Course 2"],
            "Semester 2": ["Pending Course 3", "Pending Course 4"],
        },
        "AY 2024/2025": {
            "Semester 1": ["Pending Course 5", "Pending Course 6"],
            "Semester 2": ["Pending Course 7", "Pending Course 8"],
        },
    },
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
            // #NOTE: Completed functions not tested, waiting for audit page
            addCourseCompleted: (newCompletedCourse, AY, semester) => {
                const currentSavedData = get().saved_data;
                const currentSavedCompletedCourses =
                    currentSavedData["Completed"];
                const updatedSemester = [
                    ...currentSavedCompletedCourses[AY][semester],
                    newCompletedCourse,
                ];
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
