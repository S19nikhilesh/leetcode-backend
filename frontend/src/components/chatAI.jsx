import React, { useState, useRef, useEffect } from 'react';
import { useForm } from "react-hook-form";
import { Send } from 'lucide-react';

const ChatAi = () => {
  const { register, handleSubmit, reset } = useForm();
  const [messages, setMessages] = useState([
    { role: 'ai', text: "It's over Anakin, I have the high ground." }
  ]);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const onSubmit = (data) => {
    // Add user message
    setMessages([...messages, { role: 'user', text: data.message }]);
    reset();
    
    // Simple AI echo for testing
    // setTimeout(() => {
    //   setMessages(prev => [...prev, { role: 'ai', text: "You underestimate my power!" }]);
    // }, 600);
  };

  return (
    <div className="flex flex-col h-[500px] bg-base-200 rounded-lg p-4">
      {/* Scrollable Chat Area */}
      <div className="flex-1 overflow-y-auto mb-4 scrollbar-hide">
        {messages.map((msg, idx) => (
          <div key={idx} className={`chat ${msg.role === 'ai' ? 'chat-start' : 'chat-end'}`}>
            <div className={`chat-bubble ${msg.role === 'ai' ? 'chat-bubble-neutral' : 'chat-bubble-success'}`}>
              {msg.text}
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