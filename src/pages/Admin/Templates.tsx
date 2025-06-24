import { useEffect, useState } from "react";
import TemplateLists from "../../components/Admin/PhishingStimulation/Templates/TemplateLists";
import FilterModal from "../../components/Admin/UserManagement/FilterModal";
import HeaderTitle from "../../shared/HeaderTitle";
import PagesHomeLayout from "../../shared/PagesHomeLayout";
import AddTemplateModal from "../../components/Admin/PhishingStimulation/Templates/AddtemplateModal";
import { usePhishingStore } from "../../store/usePhishingStore";

// Define FilterConfig interface
interface FilterConfig {
  key: string;
  label: string;
  type: "select" | "date" | "text";
  options?: { label: string; value: string }[]; // Only for "select" type
}

interface SelectedFilters {
  department: string;
  status: string;
}

const Templates = () => {
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [selectedFilters, setSelectedFilters] = useState({
    department: "",
    status: "",
  });

  const { fetchPhishingTemplates, phishingTemplates } = usePhishingStore();

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedSearch(searchTerm);
    }, 500);
    return () => clearTimeout(timeout);
  }, [searchTerm]);

  useEffect(() => {
    fetchPhishingTemplates(1, debouncedSearch);
  }, [debouncedSearch]);

  const handleAdd = () => {
    setIsAddModalOpen(true);
  };

  const handleFilterClick = () => {
    setIsFilterModalOpen((prev) => !prev);
    console.log("Filter button clicked");
  };

  const handleFilterChange = (key: string, value: string) => {
    // Update selected filter value based on key (filter)
    setSelectedFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleExportClick = () => {
    // Export logic based on id
  };

  // Define your filters array
  const filters: FilterConfig[] = [
    {
      key: "department",
      label: "Department",
      type: "select", // Correct type here
      options: [
        { label: "HR", value: "hr" },
        { label: "Management", value: "management" },
        // { label: "Marketing", value: "marketing" },
      ],
    },
    {
      key: "status",
      label: "Status",
      type: "select",
      options: [
        { label: "Phished", value: "phished" },
        { label: "Passed", value: "passed" },
        // { label: "Not Started", value: "not_started" },
      ],
    },
  ];

  return (
    <div>
      <div className="flex justify-between items-center mb-">
        <HeaderTitle
          title="Phishing Simulation"
          subTitle="  Create phishing simulations to test your employees."
        ></HeaderTitle>
        <button
          className="h-fit py-2 px-12 bg-primary500 rounded-md text-white"
          onClick={handleAdd}
        >
          Add New
        </button>
      </div>
      <PagesHomeLayout
        onFilterClick={handleFilterClick}
        onExportClick={handleExportClick}
        showFilter={true}
        showExport={false}
        searchTerm={searchTerm} // Add this missing prop
        onSearch={(value) => setSearchTerm(value)}
      >
        <TemplateLists />
      </PagesHomeLayout>
      {isFilterModalOpen && (
        <FilterModal
          filters={filters}
          handleFilterClick={() => setIsFilterModalOpen(false)} // Close filter modal
          onApplyFilters={(filters) => console.log(filters)} // Log selected filters
          selectedFilters={selectedFilters} // Pass selected filters
          handleFilterChange={handleFilterChange} // Handle filter value changes
        />
      )}
      {isAddModalOpen && (
        <AddTemplateModal onClose={() => setIsAddModalOpen(false)} />
      )}
    </div>
  );
};

export default Templates;
