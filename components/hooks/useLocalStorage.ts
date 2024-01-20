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
                console.log(AY);
                console.log(currentSavedPendingCourses[AY]);
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
        }),
        { name: "stored-data", storage: createJSONStorage(() => localStorage) }
    )
);

export default useLocalStorage;
