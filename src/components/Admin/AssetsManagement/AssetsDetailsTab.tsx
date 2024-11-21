import { useState } from "react";

const AssetsDetailsTab = () => {
  // State to track the active tab
  const [activeTab, setActiveTab] = useState("1");
  const [showTabs, setShowTabs] = useState(false);

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
  };

  return (
    <div className="bg-white py-10 font-poppins">
      <div>
        <div className="flex items-center w-full bg-white">
          {/* tab1 */}
          <div className="w-full bg-white">
            <button
              className={`w-full rounded-lg py-[8px] text-sm font-medium flex items-center justify-center ${
                activeTab === "1"
                  ? "text-[#282EFF] bg-[#DEEFFC]"
                  : "hover:text-[#282EFF] hover:bg-[#DEEFFC]"
              }`}
              onClick={() => handleTabClick("1")}
            >
              General
            </button>
          </div>
          <div className="w-full">
            <button
              className={`w-full rounded-lg py-[8px] text-sm font-medium flex items-center justify-center ${
                activeTab === "2"
                  ? "text-[#282EFF] bg-[#DEEFFC]"
                  : "hover:text-[#282EFF] hover:bg-[#DEEFFC]"
              }`}
              onClick={() => handleTabClick("2")}
            >
              Warranty
            </button>
          </div>
          <div className="w-full">
            <button
              className={`w-full rounded-lg py-[8px] text-sm font-medium flex items-center justify-center ${
                activeTab === "3"
                  ? "text-[#282EFF] bg-[#DEEFFC]"
                  : "hover:text-[#282EFF] hover:bg-[#DEEFFC]"
              }`}
              onClick={() => handleTabClick("3")}
            >
              Parts/Boms
            </button>
          </div>
          <div className="w-full">
            <button
              className={`w-full rounded-lg py-[8px] text-sm font-medium flex items-center justify-center ${
                activeTab === "4"
                  ? "text-[#282EFF] bg-[#DEEFFC]"
                  : "hover:text-[#282EFF] hover:bg-[#DEEFFC]"
              }`}
              onClick={() => handleTabClick("4")}
            >
              Log
            </button>
          </div>
        </div>

        <div className="">
          {activeTab === "1" && (
            <div id="general">
              {/* general info */}
              <div className="bg-[#DEEFFC33] p-[10px]">
                <h1 className="text-sm font-medium text-[#333333]">
                  General information and location of an Asset:
                </h1>
              </div>

              <div className="w-full py-5 flex flex-col gap-6">
                <div className="w-full grid grid-cols-2">
                  <p className="text-sm font-medium text-[#333333]">
                    This asset is part of:
                  </p>
                  <p className="bg-[#DEEFFC33] text-sm font-medium text-[#333333] p-[10px] w-full">
                    Finance department{" "}
                  </p>
                </div>

                <div className="w-full grid grid-cols-2">
                  <p className="text-sm font-medium text-[#333333]">
                    This asset is located at:
                  </p>
                  <p className="bg-[#DEEFFC33] text-sm font-medium text-[#333333] p-[10px] w-full">
                    Finance Unit (Accounting) Py-Mf-2031
                  </p>
                </div>

                <div className="w-full grid grid-cols-2">
                  <p className="text-sm font-medium text-[#333333]">
                    Current location:
                  </p>
                  <p className="bg-[#DEEFFC33] text-sm font-medium text-[#333333] p-[10px] w-full">
                    CWV4+5V, 30 Oyo Rd, Ibadan 200231
                  </p>
                </div>
              </div>

              {/* tech spec */}
              <div id="specification">
                <div className="bg-[#DEEFFC33] p-[10px]">
                  <h1 className="text-sm font-medium text-[#333333]">
                    Tech Specifications
                  </h1>
                </div>
                <div className="border">
                  {/* processor */}
                  <div className="flex">
                    <div className="w-[235px] py-[16px] px-[10px]">
                      <p className="text-[#333333] font-medium">Processor</p>
                    </div>
                    <div className="w-full border-l py-[16px] px-[10px]">
                      <p className="text-[#5a5555] text-sm">
                        Intel® Core™ Ultra 7 155H (24 MB cache, 16 cores, up to
                        4.80 GHz Turbo)
                      </p>
                    </div>
                  </div>

                  {/* graphics */}
                  <div className="flex">
                    <div className="w-[235px] py-[16px] px-[10px]">
                      <p className="text-[#333333] font-medium">Graphics</p>
                    </div>
                    <div className="w-full border-l py-[16px] px-[10px]">
                      <p className="text-[#5a5555] text-sm">
                        Intel® Arc™ Graphics
                      </p>
                    </div>
                  </div>
                  {/* display */}
                  <div className="flex">
                    <div className="w-[235px] py-[16px] px-[10px]">
                      <p className="text-[#333333] font-medium">Display</p>
                    </div>
                    <div className="w-full border-l py-[16px] px-[10px]">
                      <p className="text-[#5a5555] text-sm">
                        13.4", Non-Touch, FHD+ 1920x1200, 30-120Hz, Anti-Glare,
                        500 nit, InfinityEdge, Eyesafe®
                      </p>
                    </div>
                  </div>
                  {/* memory */}
                  <div className="flex">
                    <div className="w-[235px] py-[16px] px-[10px]">
                      <p className="text-[#333333] font-medium">Memory</p>
                    </div>
                    <div className="w-full border-l py-[16px] px-[10px]">
                      <p className="text-[#5a5555] text-sm">
                        8GB, LPDDR5, 6400MT/s, integrated, dual channel
                      </p>
                    </div>
                  </div>

                  {/* storage */}
                  <div className="flex">
                    <div className="w-[235px] py-[16px] px-[10px]">
                      <p className="text-[#333333] font-medium">Storage</p>
                    </div>
                    <div className="w-full border-l py-[16px] px-[10px]">
                      <p className="text-[#5a5555] text-sm">
                        8GB, LPDDR5, 6400MT/s, integrated, dual channel
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          {activeTab === "2" && (
            <div id="warranty">
              <div className="bg-[#DEEFFC33] p-[10px]">
                <h1 className="text-sm font-medium text-[#333333]">
                   This shows the repairs to an asset the warranty provider is
                  responsible for:
                </h1>
              </div>

              <div className="text-sm">
                <p>
                  The Dell XPS 13 Plus comes with a one-year limited hardware
                  warranty by default. This can be extended up to four years
                  with optional service plans, including Premium Support and
                  Premium Support Plus. These plans offer additional benefits
                  like 24/7 expert assistance, proactive issue resolution, and
                  accidental damage protection​.
                </p>

                <p className="py-4">
                  The One-Year Limited Hardware Warranty for the Dell XPS 13
                  Plus generally includes the following provisions:
                </p>

                <div className="flex gap-2">
                  <p className="font-medium">1.</p>
                  <div>
                    <p className="font-medium">Hardware Coverage:</p>
                    <p>
                      Covers defects in materials and workmanship during normal
                      use. This includes issues with components such as the
                      processor, memory, storage, and display.
                    </p>
                  </div>
                </div>

                <div className="flex gap-2">
                  <p className="font-medium">2.</p>
                  <div>
                    <p className="font-medium">Repair or Replacement:</p>
                    <p>
                      If a defect is identified and deemed covered under
                      warranty, Dell will repair or replace the defective part
                      or system at no cost.
                    </p>
                  </div>
                </div>

                <div className="flex gap-2">
                  <p className="font-medium">3.</p>
                  <div>
                    <p className="font-medium">Exclusions:</p>
                    <p>The warranty does not cover:</p>
                    <ul className="px-4">
                      <li className="list-disc">
                        Accidental damage (e.g., spills, drops, or cracked
                        screens unless you have additional accidental damage
                        protection).
                      </li>
                      <li className="list-disc">
                        Damage caused by misuse, unauthorized modifications, or
                        improper maintenance.
                      </li>
                      <li className="list-disc">
                        Wear and tear or cosmetic damage like scratches or
                        dents.
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="flex gap-2">
                  <p className="font-medium">4.</p>
                  <div>
                    <p className="font-medium">On-Site Service:</p>
                    <p>
                      Depending on your region and product, Dell may provide
                      on-site service where a technician visits to address the
                      issue.
                    </p>
                  </div>
                </div>

                <div className="flex gap-2">
                  <p className="font-medium">5.</p>
                  <div>
                    <p className="font-medium">Technical Support:</p>
                    <p>
                      Includes basic troubleshooting assistance and guidance on
                      warranty-covered hardware issues.
                    </p>
                  </div>
                </div>

                <div className="flex gap-2">
                  <p className="font-medium">6.</p>
                  <div>
                    <p className="font-medium">Transferability:</p>
                    <p>
                      The warranty is tied to the product and can be transferred
                      if ownership changes during the warranty period. To
                      utilize this warranty, the issue must be reported to
                      Dell’s customer service or support team, and they may
                      request diagnostics or troubleshooting before proceeding
                      with repair or replacement. Details can vary based on the
                      region of purchase.
                    </p>
                  </div>
                </div>
              </div>

              {/* tech spec */}
              <div id="specification" className="mt-10">
                <div className="bg-[#DEEFFC33] p-[10px]">
                  <h1 className="text-sm font-medium text-[#333333]">
                    Tech Specifications
                  </h1>
                </div>
                <div className="border">
                  {/* processor */}
                  <div className="flex">
                    <div className="w-[235px] py-[16px] px-[10px]">
                      <p className="text-[#333333] font-medium">Processor</p>
                    </div>
                    <div className="w-full border-l py-[16px] px-[10px]">
                      <p className="text-[#5a5555] text-sm">
                        Intel® Core™ Ultra 7 155H (24 MB cache, 16 cores, up to
                        4.80 GHz Turbo)
                      </p>
                    </div>
                  </div>

                  {/* graphics */}
                  <div className="flex">
                    <div className="w-[235px] py-[16px] px-[10px]">
                      <p className="text-[#333333] font-medium">Graphics</p>
                    </div>
                    <div className="w-full border-l py-[16px] px-[10px]">
                      <p className="text-[#5a5555] text-sm">
                        Intel® Arc™ Graphics
                      </p>
                    </div>
                  </div>
                  {/* display */}
                  <div className="flex">
                    <div className="w-[235px] py-[16px] px-[10px]">
                      <p className="text-[#333333] font-medium">Display</p>
                    </div>
                    <div className="w-full border-l py-[16px] px-[10px]">
                      <p className="text-[#5a5555] text-sm">
                        13.4", Non-Touch, FHD+ 1920x1200, 30-120Hz, Anti-Glare,
                        500 nit, InfinityEdge, Eyesafe®
                      </p>
                    </div>
                  </div>
                  {/* memory */}
                  <div className="flex">
                    <div className="w-[235px] py-[16px] px-[10px]">
                      <p className="text-[#333333] font-medium">Memory</p>
                    </div>
                    <div className="w-full border-l py-[16px] px-[10px]">
                      <p className="text-[#5a5555] text-sm">
                        8GB, LPDDR5, 6400MT/s, integrated, dual channel
                      </p>
                    </div>
                  </div>

                  {/* storage */}
                  <div className="flex">
                    <div className="w-[235px] py-[16px] px-[10px]">
                      <p className="text-[#333333] font-medium">Storage</p>
                    </div>
                    <div className="w-full border-l py-[16px] px-[10px]">
                      <p className="text-[#5a5555] text-sm">
                        8GB, LPDDR5, 6400MT/s, integrated, dual channel
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AssetsDetailsTab;
