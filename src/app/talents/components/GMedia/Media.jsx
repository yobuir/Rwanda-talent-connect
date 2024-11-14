import React, { useEffect, useState, useRef } from 'react';
import { toast } from "@/hooks/use-toast";
import { fetchUserMedia } from "@/utils/media/fetchUserMedia";
import { PlayIcon, PauseIcon, VolumeIcon, VolumeXIcon, ImageIcon } from 'lucide-react';
import Skeleton from "antd/lib/skeleton";
import { Image } from "antd";
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { X } from 'lucide-react';

const Media = ({ talent,setShowMedia,setIsDrawerOpen }) => {

    const  closeMedia =()=>{
            setShowMedia(false)
            setIsDrawerOpen(true)
        }
    const [media, setMedia] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeIndex, setActiveIndex] = useState(0);

    const loadMedia = async () => {
        if (!talent) return;

        setLoading(true);
        try {
            const response = await fetchUserMedia({ userId:talent?._id });
            setMedia(response);
        } catch (error) {
            toast({
                title: "Media Load Error",
                description: "Failed to load media gallery",
                variant: "destructive"
            });
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadMedia();
    }, [talent?.id]);

    const handleMediaScroll = (event) => {
        const container = event.target;
        const scrollPosition = container.scrollTop;
        const itemHeight = container.querySelector('.media-item')?.clientHeight || 0;
        const newIndex = Math.round(scrollPosition / itemHeight);
        setActiveIndex(newIndex);
    };


    return (
        <div className="bg-white backdrop-blur-md rounded-xl overflow-hidden w-full h-[100vh] flex flex-col items-center justify-center  fixed top-0 left-0 z-50 ">
            <div className='w-full shadow-sm border-b p-2 bg-white gap-2'>
                <div className="flex items-center gap-2 justify-between">
                    <div className="flex items-center gap-2 justify-between">
                    <Avatar className="w-10 h-10 ">
                        <AvatarImage 
                            src={talent.profileImage || "https://github.com/shadcn.png"} 
                            alt={talent.fullName}
                            className="object-cover"
                        />
                    </Avatar>
                    <h2 className="text-2xl font-bold">{talent?.fullName}</h2>(
                    <span className="text-gray-600 italic">{talent?.talentProfile?.headline?? 'Talent'}</span>)
                </div>
                <div className=''>
                    <button className='flex gap-1 hover:text-red-600 cursor-pointer' onClick={closeMedia}>
                        <X/> exit
                    </button>
                </div>
                </div>
            </div>
            <div 
                className="h-[95vh] lg:w-1/2 overflow-y-scroll snap-y snap-mandatory scrollbar-hide"
                onScroll={handleMediaScroll}
            >
                {
                    (!media || media.length === 0) &&
                    (
                        <div className='flex flex-col text-center justify-center'> 
                        <h3 className="text-xl font-semibold text-orange-500 mb-2">No Media Found</h3>
                        <p className="text-gray-400">This user hasn't uploaded any media yet.</p>
                        </div>
                    )
                }
            {
                media.map((mediaItem, index) => (
                    <MediaCard
                        key={mediaItem._id}
                        media={mediaItem}
                        index={index}
                        isActive={activeIndex === index}
                    />
                ))}
            </div>
        </div>
    );
};

const MediaCard = ({ media, index, isActive }) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [isMuted, setIsMuted] = useState(true);
    const videoRef = useRef(null);

    useEffect(() => {
        if (media.mediaType === 'video') {
            if (isActive && isPlaying) {
                videoRef.current?.play();
            } else {
                videoRef.current?.pause();
            }
        }
    }, [isActive, isPlaying]);

    const togglePlayPause = () => {
        setIsPlaying(!isPlaying);
    };

    const toggleMute = () => {
        setIsMuted(!isMuted);
    };

    const renderMediaContent = () => {
        switch (media.mediaType) {
            case 'image':
                return (
                    <Image
                        src={media.url}
                        alt={media.description || `Media item ${index + 1}`}
                        className="w-full h-full object-cover"
                        preview={false}
                    />
                );
            case 'video':
                return (
                    <video
                        ref={videoRef}
                        src={media.url}
                        muted={isMuted}
                        loop
                        playsInline
                        className="w-full h-full object-cover"
                    />
                );
            default:
                return <div className="bg-gray-200 h-full w-full"></div>;
        }
    };

    return (
        <div 
            className="media-item h-[600px] w-full relative snap-center group"
            style={{ animationDelay: `${index * 0.1}s` }}
        >
            {renderMediaContent()}
            
            {media.mediaType === 'video' && (
                <>
                    <div 
                        className="absolute inset-0 bg-gradient-to-b from-black/40 to-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" 
                        onClick={togglePlayPause}
                    />
                    
                    <div className="absolute bottom-4 right-4 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <button 
                            onClick={toggleMute}
                            className="bg-white/20 backdrop-blur-sm rounded-full p-2"
                        >
                            {isMuted ? <VolumeXIcon size={24} color="white" /> : <VolumeIcon size={24} color="white" />}
                        </button>
                        
                        <button 
                            onClick={togglePlayPause}
                            className="bg-white/20 backdrop-blur-sm rounded-full p-2"
                        >
                            {isPlaying ? <PauseIcon size={24} color="white" /> : <PlayIcon size={24} color="white" />}
                        </button>
                    </div>
                </>
            )} 
        </div>
    );
};

export default Media;