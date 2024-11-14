import { toast } from "@/hooks/use-toast";
import { deleteMedia, fetchUserMedia } from "@/utils/media/fetchUserMedia";
import { getUser } from "@/utils/users/getUser";
import { useEffect, useState } from "react";
import Skeleton from "antd/lib/skeleton";
// import "./MediaGallery.css";
import { Pagination } from "antd";
import { Image } from "antd";
import { Trash } from "lucide-react";

const MediaGallery = () => {
  const [userData, setUserData] = useState(null);
  const [media, setMedia] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    itemsPerPage: 9,
  });

  useEffect(() => {
    getUser()
      .then((data) => {
        setUserData(data);
      })
      .catch(() => toast("Failed to fetch user data"));
  }, []);

  const loadMedia = async () => {
    if (!userData?._id) return;

    setLoading(true);
    try {
      const response = await fetchUserMedia({ userId: userData._id }); 
      setMedia(response);
    } catch (error) {
      toast("Failed to load media");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteMedia = async (mediaId) => {
    try {
      await deleteMedia(mediaId);
      toast("Media deleted successfully");
      setMedia((prevMedia) => prevMedia.filter((item) => item._id !== mediaId));
    } catch (error) {
      toast("Failed to delete media");
    }
  };

  useEffect(() => {
    loadMedia();
  }, [userData]);

  const startIndex = (pagination.currentPage - 1) * pagination.itemsPerPage;
  const paginatedMedia = media.slice(
    startIndex,
    startIndex + pagination.itemsPerPage
  );

  return (
    <>
    <div className="media-gallery grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4">
      {loading && !media.length
        ? Array.from({ length: 5 }).map((_, index) => <Skeleton key={index} active />)
        : paginatedMedia.map((mediaItem, index) => (
            <MediaCard
              key={mediaItem._id}
              media={mediaItem}
              onDelete={() => handleDeleteMedia(mediaItem._id)}
              index={index}
            />
          ))}

    
    </div>
    
    <Pagination
        current={pagination.currentPage}
        pageSize={pagination.itemsPerPage}
        total={media.length}
        onChange={(page) => setPagination((prev) => ({ ...prev, currentPage: page }))}
        className="pagination-controls"
      />
    </>

  );
};

export default MediaGallery;


const MediaCard = ({ media, onDelete, index }) => {
  const isVideo = media.type === "video";
  
  return (
    <div
      className="px-3 relative snap-start"
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      {isVideo ? (
        <video
          src={media.url}
          controls
          autoPlay
          loop
          className="w-full h-full object-cover rounded-lg shadow-lg"
        />
      ) : (
        
      <Image.PreviewGroup
      className=" object-cover rounded-lg shadow-lg"
        preview={{
          onChange: (current, prev) => console.log(`current index: ${current}, prev index: ${prev}`),
        }}
      > 
        <Image
          className=" object-cover rounded-lg shadow-lg"
          width={200}
          src={media.url??'https://placehold.co/400'}
        />
      </Image.PreviewGroup>
      )}
      <div className="media-info absolute bottom-4 left-4 text-white"> 
        {/* <button
          onClick={onDelete}
          className="mt-2 px-4 py-2 text-red-500  rounded text:bg-red-700"
        >
          <Trash/>
        </button> */}
      </div>
    </div>
  );
};
