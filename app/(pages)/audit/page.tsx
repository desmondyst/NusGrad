import AuditTable from "./components/auditTable";
import SummaryTable from "./components/summaryTable";

const data = [
    {
        req1: { name: "Computer Science Foundation", taken: 36, total:40 },
        req2: { name: "Computer Science Breadth & Depth", taken: 16, total: 32 },
        req3: { name: "GE Requirements", taken: 8, total: 24},
        req4: { name: "Mathematics & Sciences", taken: 16, total: 16},
    },
  ];

const completedMC: number = 120;

export default function AuditPage() {
    return (
        <div className="h-full flex flex-col w-full items-center">
            <div className="w-11/12 lg:w-10/12 xl:w-11/12 h-full mt-32 lg:mt-28 tablet:mt-40 xl:mt-20 flex flex-col items-center">
                <SummaryTable data={data} completedMC={completedMC}></SummaryTable>
                <AuditTable />
            </div>
        </div>
    );
}
