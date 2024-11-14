import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { getInitialsLetters } from '@/lib/getInitialsNames';
function CustomAvatar({styles, ...props}) {
  return (
    <Avatar className={styles}>
        <AvatarImage className="object-fill" src={props?.image} alt={props?.name} />
        <AvatarFallback>{getInitialsLetters(props?.name) || ''}</AvatarFallback>
    </Avatar>
  );
}

export default CustomAvatar;
