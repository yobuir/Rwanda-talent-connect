import { CustomDialog } from '@/app/components/CustomDialog';
import { Button } from '@/components/ui/button';
import React from 'react';

import { Steps } from 'antd';
import { HIRING_STEPS } from '@/lib/Constants';

function HireNotice({talent}) {

     const trigger = (<Button size="sm" className="flex gap-2 items-center flex-col" title="edit profile">
                        <span className="flex gap-2 items-center">Hire {talent.fullName}</span>
                    </Button>)
    const content = (
        <div className="grid gap-4 py-4">
            <Steps
                size="small"
                current={0}
                items={HIRING_STEPS}
            />
            <div className='mt-4'>
                <Button>
                    Confirm & send
                </Button>
            </div>
        </div>
    )
  return ( 
        <CustomDialog trigger={trigger} content={content} title="Hire [profile name] to work with you." description="Hiring process will start here once you click confirm" />

  )

}

export default HireNotice;
