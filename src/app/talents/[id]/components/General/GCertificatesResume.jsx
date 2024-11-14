import { CustomDialog } from '@/app/components/CustomDialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { message, Upload } from 'antd';
import { CirclePlus, Pencil, UploadCloud } from 'lucide-react';
import React, { useState } from 'react';
import CertResumeList from '../CertResumeList';
import { Card, CardContent } from '@/components/ui/card';



function GCertificatesResume() {
    const [add, setAdd] = useState(true)

    const props = {
        name: 'file',
        action: 'https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload',
        headers: {
            authorization: 'authorization-text',
        },
        onChange(info) {
            if (info.file.status !== 'uploading') {
            console.log(info.file, info.fileList);
            }
            if (info.file.status === 'done') {
            message.success(`${info.file.name} file uploaded successfully`);
            } else if (info.file.status === 'error') {
            message.error(`${info.file.name} file upload failed.`);
            }
        },
        };

  const trigger = (<Button variant="outline" size="sm" className="flex gap-2 items-center flex-col" title="edit profile">
            <span className="flex gap-2 items-center">{add ? ( <CirclePlus  />) : <Pencil />}</span>
          </Button>)
    const content = (
      <div className="grid gap-4 py-4">
          <div className="grid grid-cols-1 items-center gap-4">
            <Label htmlFor="name" className="text-left">
              Name your file
            </Label>
            <Input id="name"  placeholder="Ex: certificate of completion in film production" className="col-span-1" />
          </div>
          <div className="grid grid-cols-1 items-center gap-4">
            <Label htmlFor="file" className="text-left">
                Upload your file            
            </Label>
            <Upload {...props}>
                <Button variant="outline"> <UploadCloud /> Click to Upload</Button>
            </Upload>
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
            <div className='flex gap-2 justify-between py-4 pb-0 items-center'>
                <h1 className='font-semibold text-lg'>📁 Upload certificates & Resume   </h1>
                {/* <CustomDialog trigger={trigger} content={content} title="📁 Upload certificates & Resume " description="  " /> */}
            </div>
            <div className='flex gap-2 justify-between mb-4  text-gray-500 items-center'>
                <h3 className=''> Add certificates and resume</h3>
            </div>
            <CertResumeList/>
        </CardContent>
    </Card> 
    <div >
    </div> 
        
    </>
  )
}

export default GCertificatesResume;
