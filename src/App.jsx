import { useRef, useEffect, useState, useCallback } from "react";
import ImageCard from "./components/ImageCard";
import { searchImages } from "./services/pixabayApi";
import Navbar from "./components/Navbar";
import { Routes, Route } from "react-router";
import Saved from "./pages/Saved.jsx";
import ImageDetails from "./pages/ImageDetails.jsx";

const App = () => {
  const [search, setSearch] = useState();

  const [images, setImages] = useState(() => {
    const storedImages = sessionStorage.getItem("loadedImages");
    return storedImages ? JSON.parse(storedImages) : [];
  });
  const [page, setPage] = useState(() => {
    const storedPage = sessionStorage.getItem("imagePage");
    return storedPage ? Number(storedPage) : 1;
  });
  const [loading, setLoading] = useState(false);
  const loaderRef = useRef(null); //current:null

  // const [savedImages, setSavedImages] = useState(() => {
  //   const saved = localStorage.getItem("savedImages");
  //   return saved ? JSON.parse(saved) : [];
  // });


  useEffect(() => {
    sessionStorage.setItem("loadedImages", JSON.stringify(images));
  }, [images]);



  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      // console.log(entries);
      // console.log("hi")
      const entry = entries[0];
      // console.log(entry)
      // console.log(entry.isIntersecting);
      if (entry.isIntersecting && !loading && images.length > 0) {
        loadMoreImages();
      }
    },);
    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }
    return () => {
      observer.disconnect();
    };
  }, [loading, images.length, page, search]);


  useEffect(() => {
    sessionStorage.setItem("imagePage", page.toString());
  }, [page]);

  // useEffect(() => {
  //   localStorage.setItem("savedImages", JSON.stringify(savedImages));
  // }, [savedImages]);

  // useEffect(() => {
  //   sessionStorage.setItem("imageSearch", search);
  // }, [search]);

  // const toggleSaved = (img) => {
  //   const alreadySaved = savedImages.some((savedImg) => {
  //     return savedImg.id === img.id;
  //   });
  //   if (alreadySaved) {
  //     setSavedImages(
  //       savedImages.filter((savedImg) => {
  //         return savedImg.id !== img.id;
  //       }),
  //     );
  //   } else {
  //     setSavedImages([...savedImages, img]);
  //   }
  // };
  const fetchImages =useCallback(async () => {
   try{
     setLoading(true);
    setImages([]);
    const data = await searchImages(search);
    setImages(data.hits);
    setPage(1);
   }catch(err){
    console.log(err);
   }finally{
    setLoading(false);
   }
  },[search]);
  useEffect(() => {
    if (images.length === 0) {
      fetchImages();
    }
  }, [fetchImages, images.length]);


  const loadMoreImages = useCallback(async () => {
    if (loading) return;
    try {
      setLoading(true);
      const nextPage = page + 1;
      console.log("loading page:", nextPage);

      const data = await searchImages(search, nextPage, 20);

      setImages((prevImages) => {
        const existingIds = new Set(prevImages.map((img) => img.id));
        const uniqueNewImages = data.hits.filter(
          (img) => !existingIds.has(img.id),
        );
        return [...prevImages, ...uniqueNewImages];
      });

      setPage(nextPage);
    } catch (err) {
    } finally {
      setLoading(false);
    }
  },[loading,page,search]);
  return (
    <div className="min-h-screen w-full">
      {/* <input type="text"
      placeholder="search" 
      value={search}
      onChange={(e)=>setSearch(e.target.value)}
      />
      <button onClick={fetchImages}>
        Search
      </button> */}
      <Navbar search={search} 
      setSearch={setSearch} 
      fetchImages={fetchImages} />
      <Routes>
        <Route
          path="/"
          element={
            <div className="columns-3 mx-auto w-[85%] mt-6">
              {images.map((img) => {
                return <ImageCard key={img.id} img={img} />;
              })}

              <div ref={loaderRef}></div>
            </div>
          }
        />
        <Route path="/saved" element={<Saved />} />
        <Route path="/image/:id" element={<ImageDetails />} />
      </Routes>
    </div>
  );
};

export default App;

