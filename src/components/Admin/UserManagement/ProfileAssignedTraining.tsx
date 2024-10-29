import Table from "../../../shared/Table";

interface AssignedTraining {
  id: string;
  name: string;
  status: string;
}

const assignedData: AssignedTraining[] = [
  {
    id: "TR 229",
    name: "Cybersecurity for Beginners",
    status: "completed",
  },
  {
    id: "TR 230",
    name: "Risk Assessment in Cybersecurity",
    status: "in progress",
  },
  {
    id: "TR 244",
    name: "Ethical Hacking & Penetration Testing",
    status: "completed",
  },
];

// const assignedColumns = [{ key: "" }];
const assignedColumns = [
  { key: "id", header: "TRAINING ID" },
  { key: "name", header: "TRAINING NAME" },
  // { key: "status", header: "STATUS" },
  {
    key: "status",
    header: "STATUS",
    render: (status: string) => (
      <span className={`text-${status === "completed" ? "green" : "red"}-500`}>
        {status}
      </span>
    ),
  },

  // {
  //   key: "status",
  //   header: "Status",
  //   render: (value: string) => <span className="text-green-500">{value}</span>,
  // },
  // {
  //   key: "antivirusStatus",
  //   header: "Antivirus Status",
  //   render: (value: string) => <span className="text-red-500">{value}</span>,
  // },
];

const ProfileAssignedTraining = () => {
  return (
    <div className="">
      {/* <h3 className="text-lg font-semibold mb-4">Assigned Training</h3> */}

      <Table
        sectionName="Assigned Trainings"
        data={assignedData}
        columns={assignedColumns}
        // headerBgColor="bg-blue-500"
      />
    </div>
  );
};

export default ProfileAssignedTraining;
