import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

function CustomAvatar({styles}) {
  return (
    <Avatar className={styles}>
        <AvatarImage src="https://github.com/shadcn.png" />
        <AvatarFallback>CN</AvatarFallback>
    </Avatar>
  );
}

export default CustomAvatar;
