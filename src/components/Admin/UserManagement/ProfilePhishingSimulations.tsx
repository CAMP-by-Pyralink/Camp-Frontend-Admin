import Table from "../../../shared/Table";

interface PhishingSimulations {
  id: string;
  name: string;
  status: string;
  date: string;
}

const PhishingSimulationData: PhishingSimulations[] = [
  {
    id: "TR 229",
    name: "Fake Invoice",
    date: "23/04/2023  11:59PM",
    status: "Passed",
  },
  {
    id: "TR 230",
    name: "Risk Assessment in Cybersecurity",
    date: "23/04/2023  11:59PM",

    status: "Phished",
  },
  {
    id: "TR 244",
    name: "Ethical Hacking & Penetration Testing",
    date: "23/04/2023  11:59PM",
    status: "Passed",
  },
];
const phishingSimulationsColumns = [
  { key: "name", header: "CAMPAIGN NAME" },
  { key: "date", header: "DATE" },
  // { key: "status", header: "STATUS" },
  {
    key: "status",
    header: "STATUS",
    render: (status: string) => (
      <span
        className={` py-[2px] px-3 rounded-xl text-[10px]${
          status === "Passed"
            ? " bg-[#E7F6EC] text-[#036B26]"
            : " bg-[#FFECE5] text-[#AD3307]"
        }`}
      >
        {status}
      </span>
    ),
  },
];

const ProfilePhishingSimulations = () => {
  return (
    <div>
      <Table
        sectionName="Phishing simulations"
        data={PhishingSimulationData}
        columns={phishingSimulationsColumns}
        // headerBgColor="bg-blue-500"
      />
    </div>
  );
};

export default ProfilePhishingSimulations;
