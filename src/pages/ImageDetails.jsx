import React, { useContext } from "react";
import { useParams, useLocation } from "react-router";
import { SavedImagesContext } from "../context/savedImagesContext";
import axios from "axios";
import { FiBookmark, FiDownload } from "react-icons/fi";

const ImageDetails = () => {
  const { id } = useParams();
  const location = useLocation();

  const img = location.state?.img;

  const { savedImages, toggleSaved } = useContext(SavedImagesContext);

  const isSaved = img
    ? savedImages.some((savedImg) => savedImg.id === img.id)
    : false;

  const handleDownload = async () => {
    try {
      const response = await axios.get(
        img.largeImageURL || img.webformatURL,
        {
          responseType: "blob",
        }
      );

      const url = URL.createObjectURL(response.data);
      const link = document.createElement("a");
      link.href = url;
      link.download = `pixabay-${img.id}.jpg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      URL.revokeObjectURL(url);
    } catch (err) {
      console.error("Download failed:", err);
    }
  };

  

  if (!img) {
    return (
      <div className="text-center mt-10">
        Image not found.
      </div>
    );
  }

  return (
    <div className="w-[75%] mx-auto mt-6">

   

      <div className="flex justify-center  relative">

        <img
          src={img.largeImageURL}
          alt={img.tags}
          className="
          rounded-sm
            max-w-full
            max-h-[80vh]
            object-contain
          "
        />
           <div className=" absolute right-15  
           top-2 flex justify-end items-center gap-2 mb-4">

       

          <button
            onClick={() => toggleSaved(img)}
            className="
              flex
              items-center
           
              gap-2
              border
              border-gray-300
              rounded-full
              px-4
              py-2
              cursor-pointer
              hover:bg-gray-100
            "
          >
            <FiBookmark
              size={18}
              fill={isSaved ? "currentColor" : "none"}
            />

            {isSaved ? "Saved" : "Save"}
          </button>
          <button
            onClick={handleDownload}
            className="
              flex
              items-center
              gap-2
              bg-black
              text-white
              rounded-full
              px-4
              py-2
              cursor-pointer
              hover:bg-gray-800
            "
          >
            <FiDownload size={18} />

            Download
          </button>

    

      </div>

      </div>

    </div>
  );
};

export default ImageDetails;