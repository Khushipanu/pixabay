import { createContext,useState,useEffect } from "react";

export const SavedImagesContext=createContext();

export const SavedImagesProvider=({children})=>{

    const [savedImages, setSavedImages] = useState(() => {
    const saved = localStorage.getItem("savedImages");
    return saved ? JSON.parse(saved) : [];
  });

    useEffect(() => {
    localStorage.setItem("savedImages", JSON.stringify(savedImages));
  }, [savedImages]);



   //toggle
   const toggleSaved = (img) => {
    const alreadySaved = savedImages.some((savedImg) => {
      return savedImg.id === img.id;
    });
    
    if (alreadySaved) {
      setSavedImages(
        savedImages.filter((savedImg) => {
          return savedImg.id !== img.id;
        }),
      );
    } else {
      setSavedImages([...savedImages, img]);
    }
  };
  return(
    <SavedImagesContext.Provider
    value={{
      savedImages,
      toggleSaved
    }}
  >
    {children}
  </SavedImagesContext.Provider>

  )


}
