import AuditTable from "@/app/(root)/(routes)/components/audit-table";

export default function AuditPage() {
    return (
        <div className="h-full flex flex-col ">
            <div className="flex flex-col flex-grow overflow-auto">
                <AuditTable />
            </div>
        </div>
    );
}
