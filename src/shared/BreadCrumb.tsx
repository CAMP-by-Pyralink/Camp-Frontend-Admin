import { Link, useLocation } from "react-router-dom";

const Breadcrumb = () => {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x); // Split the path into segments

  return (
    <nav className="py-4">
      <h1>
        {pathnames.length > 0 ? (
          <>
            {/* Generate Breadcrumb Links */}
            {pathnames.map((value, index) => {
              const path = `/${pathnames.slice(0, index + 1).join("/")}`;
              return (
                <span key={path}>
                  {index > 0 && <span> {">"} </span>}{" "}
                  {/* Add separator except for the first item */}
                  <Link to={path} className="underline">
                    {value.charAt(0).toUpperCase() +
                      value.slice(1).replace(/-/g, " ")}
                  </Link>
                </span>
              );
            })}
          </>
        ) : (
          <span>Campaigns</span> // Default text if no path exists
        )}
      </h1>
    </nav>
  );
};

export default Breadcrumb;
