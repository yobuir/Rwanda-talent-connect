import React, { useEffect, useState, useRef } from 'react';
import { toast } from "@/hooks/use-toast";
import { fetchUserMedia } from "@/utils/talentConnect/media/fetchUserMedia";
import { PlayIcon, PauseIcon, VolumeIcon, VolumeXIcon, ImageIcon } from 'lucide-react';
import Skeleton from "antd/lib/skeleton";
import { Image } from "antd";
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { X } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const Media = ({ talent, }) => {

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

    // useEffect(() => {
    //     loadMedia();
    // }, [talent?.id]);

     useEffect(() => {
        loadMedia();
    }, []);

    const handleMediaScroll = (event) => {
        const container = event.target;
        const scrollPosition = container.scrollTop;
        const itemHeight = container.querySelector('.media-item')?.clientHeight || 0;
        const newIndex = Math.round(scrollPosition / itemHeight);
        setActiveIndex(newIndex);
    };


    return ( 
        <>
           <Card className="shadow-none border border-dashed py-6 border-gray-200 relative ">
                    <CardContent className="flex flex-col gap-4"> 
            <div 
                className="lg:w-full overflow-y-scroll-auto snap-y snap-mandatory scrollbar-hide"
                onScroll={handleMediaScroll}
            >
                {
                    (!media || media.length === 0) &&
                    (
                        <div className='flex flex-col text-center justify-center'> 
                        <h3 className="text-xl font-semibold text-orange-500 mb-2">No Media Found</h3>
                        <p className="text-gray-400">This user has not uploaded any media yet.</p>
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
            </CardContent>
            </Card>
        
        </>
      
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