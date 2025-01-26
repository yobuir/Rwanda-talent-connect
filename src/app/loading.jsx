import React from 'react'

function Page() {
    return ( 
        <div className='flex justify-center items-center min-h-screen'>
            <div className="flex items-center space-x-2">
                <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-gray-900"></div>
                <p>Loading...</p>
            </div>
        </div>
        
)
}

export default Page