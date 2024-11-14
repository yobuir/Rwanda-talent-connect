import { CustomDialog } from '@/app/components/CustomDialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { message, Upload } from 'antd';
import { CirclePlus, CloudUpload, Pencil, Trash2, UploadCloud } from 'lucide-react';
import React, { useState } from 'react'; 
import { Card, CardContent } from '@/components/ui/card'; 
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
const { Dragger } = Upload;
import { Image } from 'antd';



const props = {
  name: 'file',
  multiple: true,
  action: 'https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload',
  onChange(info) {
    const { status } = info.file;
    if (status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (status === 'done') {
      message.success(`${info.file.name} file uploaded successfully.`);
    } else if (status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
  onDrop(e) {
    console.log('Dropped files', e.dataTransfer.files);
  },
};


function GMedia() {
    const [add, setAdd] = useState(true)

  const trigger = (<Button variant="outline" size="sm" className="flex gap-2 items-center flex-col" title="edit profile">
            <span className="flex gap-2 items-center">{add ? ( <CirclePlus  />) : <Pencil />}</span>
          </Button>)
    const content = (
      <div className="grid gap-4 py-4">
        <Label>Type of media</Label>
        <div className='flex gap-4 '>
         <RadioGroup defaultValue="images">
            <div className="flex items-center space-x-2">
                <RadioGroupItem value="images" id="images" />
                <Label htmlFor="images">Images</Label>
            </div>
            <div className="flex items-center space-x-2">
                <RadioGroupItem value="videos" id="videos" />
                <Label htmlFor="videos">videos</Label>
            </div>
        </RadioGroup>

        </div>

          <div className="grid grid-cols-1 items-center gap-4">
            <Label htmlFor="name" className="text-left">
              Name your file
            </Label>
            <Input id="name"  placeholder="Ex: certificate of completion in film production" className="col-span-1" />
          </div>
          <div className="grid grid-cols-1 items-center gap-4">
            <Label htmlFor="media" className="text-left">
                Upload your media here .            
            </Label>
        
            <Dragger {...props}>
            <p className="ant-upload-drag-icon">
            {/* <InboxOutlined /> */}
            </p>
            <p className="ant-upload-text">Click or drag file to this area to upload</p>
            <p className="ant-upload-hint">
                Supported formats: .jpg, .jpeg, .png, .gif, .mp4, .webm,
            </p>
        </Dragger>
        </div>
        <Button>
            Save changes
        </Button>
        </div>
    )
  return ( 
    <> 
   <Card className="shadow-none border border-dashed   border-gray-200 relative ">
        <CardContent>  
            <div className='flex gap-2 justify-between py-4  pb-0 items-center'>
                <h1 className='font-semibold text-lg flex items-center gap-2'><CloudUpload/> Upload media    </h1>
                <CustomDialog trigger={trigger} content={content} title="🖼️ Upload media images & videos " description="  " />
            </div>
            <div className='flex gap-2 justify-between mb-4 items-center text-gray-500'>
                <h3 className=''> Upload media images & videos to showcase your work and skills. </h3>
            </div> 
            <div className='flex gap-2 justify-between flex-wrap items-center'>
                <Image.PreviewGroup
                preview={{
                onChange: (current, prev) => console.log(`current index: ${current}, prev index: ${prev}`),
                }}
            >
                <div className='relative'>
                    <div className='absolute flex justify-center items-center bottom-0 z-50 right-0'>
                    <Button variant="outline" className="text-red-500 bottom-0 z-50 right-[50%] left-[50%]"><Trash2 /></Button>
                    </div>
                    <Image width={200} src="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg" />
                </div> 
            </Image.PreviewGroup>
            </div>
        </CardContent>
    </Card> 
    </>
)
}

export default GMedia;
