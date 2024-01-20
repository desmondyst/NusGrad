import AuditTable from "@/app/(pages)/audit/components/audit-table";
import LandingPageContent from "./components/content";
import TrackerForm from "./components/trackerForm";

const LandingPage = async () => {
    return (
        <div className="flex">
            <div className="flex flex-col flex-grow overflow-auto bg-bg_light_gray">
                {/* <LandingPageContent />
                <TrackerForm /> */}
                {/* update when local storage
                <AuditTable />
                */}
                <AuditTable />
            </div>
        </div>
    );
};

export default LandingPage;
