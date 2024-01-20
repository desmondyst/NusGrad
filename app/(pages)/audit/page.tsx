import AuditTable from "./components/audit-table";

export default function AuditPage() {
    return (
        <div className="h-full flex flex-col w-full items-center">
            <div className="w-11/12 lg:w-10/12 xl:w-11/12 h-full mt-32 lg:mt-28 tablet:mt-40 xl:mt-20 flex flex-col items-center">
                <AuditTable />
            </div>
        </div>
    );
}
