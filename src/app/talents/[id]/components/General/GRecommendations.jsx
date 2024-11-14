import React from 'react'

function GRecommendations() {
  return (
    <div className="p-4 bg-white border rounded-lg shadow-md max-w-md mx-auto">
    <div className="flex items-center mb-2">
        <img src="https://via.placeholder.com/50" alt="User Avatar" className="w-12 h-12 rounded-full mr-3"/>
      
        <div>
            <h3 className="text-lg font-semibold">John Doe</h3>
            <p className="text-sm text-gray-500">Project Manager</p>
        </div>
    </div> 
    <p className="text-gray-700 mb-3">
        "Ir.Yobudd is a fantastic talent who delivers excellent video content. Highly professional and creative!"
    </p> 
    <div className="flex items-center">

        <div className="flex text-yellow-400">
            <svg className="w-5 h-5 fill-current" viewBox="0 0 20 20"><path d="M10 .7l2.4 6.9h7.2l-5.8 4.3 2.2 6.8-5.9-4.3-5.9 4.3 2.2-6.8-5.8-4.3h7.2z"/></svg>
            <svg className="w-5 h-5 fill-current" viewBox="0 0 20 20"><path d="M10 .7l2.4 6.9h7.2l-5.8 4.3 2.2 6.8-5.9-4.3-5.9 4.3 2.2-6.8-5.8-4.3h7.2z"/></svg>
            <svg className="w-5 h-5 fill-current" viewBox="0 0 20 20"><path d="M10 .7l2.4 6.9h7.2l-5.8 4.3 2.2 6.8-5.9-4.3-5.9 4.3 2.2-6.8-5.8-4.3h7.2z"/></svg>
            <svg className="w-5 h-5 fill-current" viewBox="0 0 20 20"><path d="M10 .7l2.4 6.9h7.2l-5.8 4.3 2.2 6.8-5.9-4.3-5.9 4.3 2.2-6.8-5.8-4.3h7.2z"/></svg>
            <svg className="w-5 h-5 text-gray-300 fill-current" viewBox="0 0 20 20"><path d="M10 .7l2.4 6.9h7.2l-5.8 4.3 2.2 6.8-5.9-4.3-5.9 4.3 2.2-6.8-5.8-4.3h7.2z"/></svg>
        </div>
        <span className="ml-2 text-gray-600 text-sm">4.5</span>
    </div>
</div>

  )
}

export default GRecommendations