import React,{useContext} from "react";
import { SavedImagesContext } from "../context/savedImagesContext";
import axios from "axios"
import { useNavigate } from "react-router";

import {
  FiBookmark,
  FiHeart,
  FiDownload
} from "react-icons/fi";

const ImageCard = ({ img }) => {
  const navigate=useNavigate();

  const {savedImages,toggleSaved}=useContext(SavedImagesContext);
  const isSaved=savedImages.some((savedImg)=>savedImg.id===img.id);
  
  const handleDownload=async()=>{
    try{
      const response=await axios.get(img.largeImageURL || img.webformatURL,{
        responseType:"blob"
      })
      const url=URL.createObjectURL(response.data);
      const link=document.createElement("a");
      link.href=url;
      link.download=`pixabay-${img.id}.jpg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url)

    }catch(err){
          console.error("Download failed:",err);
    }
  }

  return (
    <div className="mb-4 break-inside-avoid">
      <div className="relative group overflow-hidden ">
        <img onClick={()=>navigate(`/image/${img.id}`,{
          state:{img:img}
        })}
         className="w-full block cursor-pointer" 
        src={img.webformatURL}
         alt={img.tags} />
   {/**overlay */}  


       <div className="
            absolute
            inset-0
            bg-black/25
            opacity-0
            group-hover:opacity-100
            transition-opacity
            duration-200
            pointer-events-none
          "
        />

        {/* Top-right buttons */}
        <div
          className="
            absolute
            top-3
            right-3
            z-10
            flex
            gap-2
            opacity-0
            group-hover:opacity-100
            transition-opacity
            duration-200
          "
        >
          {/* save */}
          <button onClick={()=>toggleSaved(img)}
            className="
              bg-black/60
              text-white
              w-8
              h-8
              rounded-lg
              flex
               cursor-pointer
              items-center
              justify-center
              hover:bg-black/80
              transition
            "
          >
            
            <FiBookmark size={16} fill={isSaved?"currentColor":"none"} />
          </button>

          <button 
            className="
              bg-black/60
              text-white
              h-8
              px-3
              rounded-lg
              flex
               cursor-pointer
              items-center
              gap-2
              hover:bg-black/80
              transition
            "
          >
            <FiHeart size={16} />
            <span>{img.likes}</span>
          </button>

          <button 
          onClick={handleDownload}
            className="
              bg-black/60
              text-white
              w-8
              h-8
              rounded-lg
              flex
              cursor-pointer
              items-center
              justify-center
              hover:bg-black/80
              transition
            "
          >
            <FiDownload size={16} />
          </button>
        </div>



        {/* Bottom user info */}
       <div
  className="
    absolute
    bottom-3
    left-3
    right-3
    z-10
    flex
    items-center
    justify-between
    opacity-0
    group-hover:opacity-100
    transition-opacity
    duration-200
  "
>
  {/* Left side - user info */}
  <div className="flex items-center gap-2">
    {img.userImageURL ? (
      <img
        src={img.userImageURL}
        alt={img.user}
        className="
          w-8
          h-8
          rounded-full
          object-cover
        "
      />
    ) : (
      <div
        className="
          w-8
          h-8
          rounded-full
          bg-gray-300
          flex
          items-center
          justify-center
          text-gray-700
          text-xs
          font-semibold
        "
      >
        {img.user?.charAt(0).toUpperCase()}
      </div>
    )}

    <span className="text-white text-xs font-medium">
      {img.user}
    </span>
  </div>

  {/* Right side Edit e */}
  <a
    href="https://www.canva.com/"
    target="_blank"
    rel="noreferrer"
    className="
      flex
      items-center
      gap-1.5

      border
      border-white/40

      rounded-full
      px-2
      py-0.5

      text-white
      text-xs
      font-medium

      hover:bg-white/10
      transition
    "
  >
    <svg
      viewBox="0 0 24 24"
      className="w-6 h-6"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12 21a9 9 0 100-18 9 9 0 000 18z"
        fill="#7D2AE7"
      />
      <path
        d="M15.886 13.846c-.075 0-.14.063-.208.2-.768 1.558-2.095 2.66-3.63 2.66-1.775 0-2.875-1.603-2.875-3.817 0-3.75 2.09-5.918 3.925-5.918.857 0 1.381.539 1.381 1.397 0 1.018-.578 1.556-.578 1.915 0 .162.1.26.299.26.798 0 1.736-.918 1.736-2.215 0-1.257-1.094-2.18-2.93-2.18-3.032 0-5.728 2.811-5.728 6.702 0 3.011 1.72 5.002 4.373 5.002 2.816 0 4.445-2.803 4.445-3.712 0-.202-.103-.294-.21-.294z"
        fill="#fff"
      />
    </svg>

    <span>Edit image</span>
  </a>
</div>



      </div>
    </div>
  );
};

export default ImageCard;
