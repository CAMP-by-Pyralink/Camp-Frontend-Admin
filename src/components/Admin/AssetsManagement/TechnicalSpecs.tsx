import { useEffect, useState } from "react";

const TechnicalSpecs = ({ singleAsset }: any) => {
  const [decodedHtml, setDecodedHtml] = useState<string>("");

  useEffect(() => {
    if (singleAsset?.techSpecifications) {
      // Decode HTML entities (convert &lt; to <, &gt; to >, etc.)
      const decodeHtmlEntities = (html: string) => {
        const textarea = document.createElement("textarea");
        textarea.innerHTML = html;
        return textarea.value;
      };

      const decoded = decodeHtmlEntities(singleAsset.techSpecifications);
      setDecodedHtml(decoded);
    }
  }, [singleAsset]);

  return (
    <div className="technical-specs-container p-4">
      <h1 className="text-xl font-bold mb-4">Technical Specifications</h1>
      {decodedHtml ? (
        <div
          className="specs-content"
          dangerouslySetInnerHTML={{ __html: decodedHtml }}
        />
      ) : (
        <p>No technical specifications available</p>
      )}
    </div>
  );
};

export default TechnicalSpecs;
