import React, { useState, useRef, useEffect } from 'react';
import { useForm } from "react-hook-form";
import { Send } from 'lucide-react';
import axiosClient from '../utils/axiosClient';
  
const ChatAi = ({problem}) => {
  const { register, handleSubmit, reset } = useForm();
  
  const [messages, setMessages] = useState([
    {
      role: "user",
      parts: [{ text: "Hello" }],
    },
    {
      role: "model",
      parts: [{ text: "Great to meet you. What would you like to know?" }],
    }
  ]);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const onSubmit = async(data) => {
    // Add user message
  
    setMessages([...messages, { role: 'user', parts: [{ text: data.message }] }]);
    reset();
    
    try{
      const response=await axiosClient.post('/ai/chat',{
        message:messages,
        title:problem.title,
        description:problem.description,
        testCases:problem.visibleTestCases,
        startCode:problem.startCode
      });

      setMessages(prev=>[...prev,{
        role: 'model',
        parts: [{ text: response.data.message }] 
      }])
    }catch(err){
      console.log("API Error",err)
      setMessages(prev=>[...prev,{
        role: 'model',
        parts: [{ text: "Error from AI chatbot" }] 
      }])
    }

  };

  return (
    <div className="flex flex-col h-[500px] bg-base-200 rounded-lg p-4">
      {/* Scrollable Chat Area */}
      <div className="flex-1 overflow-y-auto mb-4 scrollbar-hide">
        {messages.map((msg, idx) => (
          <div key={idx} className={`chat ${msg.role === 'model' ? 'chat-start' : 'chat-end'}`}>
            <div className={`chat-bubble ${msg.role === 'model' ? 'chat-bubble-neutral' : 'chat-bubble-success'}`}>
              {msg.parts[0].text}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Form at Bottom */}
      <form onSubmit={handleSubmit(onSubmit)} className="flex items-center gap-2">
        <input 
          {...register("message", { required: true })} 
          placeholder="Type your message..."
          className="input input-bordered flex-1 bg-base-100 focus:outline-none" 
        />
        <button type="submit" className="btn btn-square btn-success">
          <Send size={20} />
        </button>
      </form>
    </div>
  );
};

export default ChatAi;