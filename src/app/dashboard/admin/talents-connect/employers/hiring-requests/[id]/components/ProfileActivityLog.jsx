// components/ui/ActivityLog.js

import React from 'react';

function ProfileActivityLog({ activities }) {
  return (
    <div className="py-4 ">
      <h2 className=" font-semibold">Recent Activity</h2>
      <ul className="mt-2 space-y-2">
        {activities.map((activity, index) => (
          <li key={index} className="flex justify-between text-sm">
            <span>{activity.description}</span>
            <span className="text-gray-500">{activity.timestamp}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ProfileActivityLog;
