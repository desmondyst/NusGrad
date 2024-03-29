"use client";

import useLocalStorage from "@/components/hooks/useLocalStorage";
import LandingPageContent from "./components/content";
import TrackerForm from "./components/trackerForm";

import { redirect, useRouter } from "next/navigation";

const LandingPage = () => {
    // const router = useRouter();
    const localStorage = useLocalStorage();
    // const userDetails = localStorage["saved_data"]["userDetails"];

    return (
        <div className="flex">
            <div className="flex flex-col flex-grow overflow-auto bg-bg_light_gray">
                <LandingPageContent />
                <TrackerForm />
            </div>
        </div>
    );
};

export default LandingPage;
