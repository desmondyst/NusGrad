import Header from "@/components/header";
import LandingPageContent from "./components/content";
import TrackerForm from "./components/tracker-form";
import prismadb from "@/lib/prismadb";

const LandingPage = async () => {
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
