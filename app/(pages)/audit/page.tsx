import Header from "@/components/header";
import SideBar from "@/components/sidebar";
import LandingPageContent from "../../(root)/(routes)/components/content";

export default function AuditPage() {
    return (
        <div className="h-full flex flex-col ">
            <div className="flex flex-col flex-grow overflow-auto">
                <LandingPageContent />
            </div>
        </div>
    );
}
