import React, { useState } from "react";

const CreateTrainingStep1 = ({
  onChange,
}: {
  onChange: (data: any) => void;
}) => {
  const [bannerImage, setBannerImage] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    onChange({ [name]: value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setBannerImage(base64String);
        onChange({ bannerImageFile: base64String });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="px-12 space-y-6">
      <div>
        <label htmlFor="bannerImageFile" className="block text-sm font-medium">
          Upload image
        </label>
        <input
          type="file"
          name="bannerImageFile"
          className="border border-primary100 py-4 px-3 w-[634px] rounded-md"
          onChange={handleFileChange}
        />
      </div>
      <div>
        <label htmlFor="title" className="block text-sm font-medium">
          Training title
        </label>
        <input
          type="text"
          name="title"
          className="border border-primary100 py-4 px-3 w-[634px] rounded-md"
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label htmlFor="description" className="block text-sm font-medium">
          Training description
        </label>
        <input
          type="text"
          name="description"
          className="border border-primary100 py-2 px-3 w-[634px] h-[102px] rounded-md"
          onChange={handleInputChange}
        />
      </div>
      <div className="flex gap-4 w-[634px]">
        <div className="w-full">
          <label htmlFor="startDate" className="block text-sm font-medium">
            Start date
          </label>
          <input
            type="date"
            name="startDate"
            className="border border-primary100 py-2 px-3 w-full basis-[50%] rounded-md"
            onChange={handleInputChange}
          />
        </div>
        <div className="w-full">
          <label htmlFor="endDate" className="block text-sm font-medium">
            End date
          </label>
          <input
            type="date"
            name="endDate"
            className="border border-primary100 py-2 px-3 w-full rounded-md"
            onChange={handleInputChange}
          />
        </div>
      </div>
    </div>
  );
};

export default CreateTrainingStep1;
