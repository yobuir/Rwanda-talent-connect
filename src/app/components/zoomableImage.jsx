import { Dialog, DialogContent, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import Image from 'next/image' 

export default function ZoomableImage({
  src,
  alt,
  className,
}) {
  if (!src) return null
  return (
    <Dialog className="bg-transparent p-0 shadow-none">
      <DialogTrigger  >
        <Image
          src={src}
          alt={alt || ''} 
          className={className}
          width={500}
          height={100}
        />
      </DialogTrigger>
      <DialogContent className="max-w-7xl border-0 bg-transparent p-0 shadow-none">
        <DialogTitle className="p-0 m-0">   
        </DialogTitle>
        <div className="relative h-[calc(100vh-220px)] w-full overflow-clip rounded-md bg-transparent shadow-md">
          <Image src={src} fill alt={alt || ''} className="h-full w-full object-contain" />
        </div>
      </DialogContent>
    </Dialog>
  )
}
