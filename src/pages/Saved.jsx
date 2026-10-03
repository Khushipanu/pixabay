import React, { useContext } from 'react'
import ImageCard from '../components/ImageCard'
import { SavedImagesContext } from "../context/savedImagesContext";

const Saved = () => {
    const {savedImages}=useContext(SavedImagesContext);
  return (
    <div>
        {savedImages.length==0?(<p>
            No saved images yet.
        </p>):(
            <div className="columns-3 w-[85%] m-auto ">
                {savedImages.map((img)=>{
                   return (
                   <ImageCard key={img.id}
                    img={img}
               
                    />
                   )
                })}
                </div>
    
        )}
      
    </div>
  )
}

export default Saved
