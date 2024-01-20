import LandingPageContent from "./components/content";
import TrackerForm from "./components/tracker-form";

export default function LandingPage() {
    return (
        <div className="flex">
            <div className="flex flex-col flex-grow overflow-auto bg-bg_light_gray">
                <LandingPageContent />
                <TrackerForm />
            </div>
        </div>
    );
}
