'use client';
import { Button } from '@/components/ui/button';
import React, { useState } from 'react'
import { Textarea } from "@/components/ui/textarea"
import { Label } from '@/components/ui/label';


function Message() {
      const [messages, setMessages] = useState([
    { id: 1, text: "Hello, we are interested in your profile!" },
    { id: 2, text: "Can you share your latest portfolio? Can you share your latest portfolio?Can you share your latest portfolio?Can you share your latest portfolio?Can you share your latest portfolio?Can you share your latest portfolio?" },
    { id: 3, text: "Can you share your latest portfolio?" },
    { id: 4, text: "Can you share your latest portfolio?" },
    { id: 5, text: "Can you share your latest portfolio?" },
    { id: 6, text: "Can you share your latest portfolio?" },
    { id: 7, text: "Can you share your latest portfolio?" },
    { id: 8, text: "Can you share your latest portfolio?" },
  ]);
  const [newMessage, setNewMessage] = useState("");

    const handleSendMessage = () => {
        if (newMessage.trim() !== "") {
        setMessages([...messages, { id: messages.length + 1, text: newMessage }]);
        setNewMessage("");
        }
    };

  return ( 
        <div className="mt-6  pt-4 w-full h-[90%]">
          <h2 className="font-semibold">Latest Messages</h2>
          <div className="mt-4 space-y-2 max-h-[60%] overflow-y-auto p-4">
            {messages.map((message) => (
              <div key={message.id} className="text-gray-700 bg-gray-700/10 p-2 rounded px-3">
                {message.text}
              </div>
            ))}
          </div> 
          <Label className="text-xs text-orange-500">Notice: Messages will be sent through emails</Label>
          <Textarea 
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)} />
          <Button 
            size="sm"
            onClick={handleSendMessage}
            className="mt-3"
          >
            Send Message
          </Button>
        </div>
  )
}

export default Message