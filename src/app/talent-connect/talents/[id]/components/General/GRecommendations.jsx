import React from 'react';

function GRecommendations({ talent }) {
  return (
    <div className="p-4 bg-white border rounded-lg shadow-md max-w-md mx-auto">
      {talent.ratings.map((recommendation, index) => (
        <div key={index} className="mb-4">
          <div className="flex items-center mb-2">
            <img src={recommendation.company.logo || "https://via.placeholder.com/50"} alt="User Avatar" className="w-12 h-12 rounded-full mr-3" />
            <div>
              <h3 className="text-lg font-semibold">{recommendation.company.companyName}</h3>
            </div>
          </div>
          <p className="text-gray-700 mb-3">
            {recommendation.recommendationText}
          </p>
          <div className="flex items-center">
            <div className="flex text-yellow-400">
              {[...Array(5)].map((_, i) => (
                <svg key={i} className={`w-5 h-5 fill-current ${i < recommendation.rating ? 'text-yellow-400' : 'text-gray-300'}`} viewBox="0 0 20 20">
                  <path d="M10 .7l2.4 6.9h7.2l-5.8 4.3 2.2 6.8-5.9-4.3-5.9 4.3 2.2-6.8-5.8-4.3h7.2z" />
                </svg>
              ))}
            </div>
            <span className="ml-2 text-gray-600 text-sm">{recommendation.rating}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

export default GRecommendations;