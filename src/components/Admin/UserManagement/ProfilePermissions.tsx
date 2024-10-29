const ProfilePermissions = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-[5px_5px_40px_rgba(107,151,255,0.3)] mt-6">
      <h3 className="text-lg font-semibold mb-4">Permissions</h3>
      <ul className="space-y-2">
        <li>
          <label className="inline-flex items-center">
            <input type="checkbox" className="form-checkbox" />
            <span className="ml-2">Take training</span>
          </label>
        </li>
        <li>
          <label className="inline-flex items-center">
            <input type="checkbox" className="form-checkbox" />
            <span className="ml-2">Assign training</span>
          </label>
        </li>
        <li>
          <label className="inline-flex items-center">
            <input type="checkbox" className="form-checkbox" />
            <span className="ml-2">Upload asset</span>
          </label>
        </li>
        <li>
          <label className="inline-flex items-center">
            <input type="checkbox" className="form-checkbox" />
            <span className="ml-2">Upload asset</span>
          </label>
        </li>{" "}
        <li>
          <label className="inline-flex items-center">
            <input type="checkbox" className="form-checkbox" />
            <span className="ml-2">Upload asset</span>
          </label>
        </li>{" "}
        <li>
          <label className="inline-flex items-center">
            <input type="checkbox" className="form-checkbox" />
            <span className="ml-2">Upload asset</span>
          </label>
        </li>
      </ul>
    </div>
  );
};

export default ProfilePermissions;
