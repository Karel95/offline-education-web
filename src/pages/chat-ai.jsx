import React, { useState } from 'react';

export function ChatAI() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const handleSendMessage = () => {
    if (input.trim()) {
      const newMessage = { text: input, sender: 'user' };
      setMessages([...messages, newMessage]);
      setInput('');

      // Simula una respuesta de IA después de un breve retraso
      setTimeout(() => {
        const aiResponse = {
          text: 'Este es un mensaje automático de la IA.',
          sender: 'ai',
        };
        setMessages((prevMessages) => [...prevMessages, aiResponse]);
      }, 1000);
    }
  };

  return (
    
    <div className="flex justify-center items-center h-screen absolute top-0 w-full bg-[url('/img/suriname-bg.png')] bg-cover bg-center">
      <div className="w-96 bg-white bg-opacity-20 backdrop-blur-xs border border-gray-300 rounded-lg shadow-md">
        <div className="bg-gray-800 text-white p-3 text-lg rounded-t-lg text-center">
          Chat IA
        </div>
        <div className="h-80 overflow-y-scroll p-4 space-y-4">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`p-3 rounded-lg ${
                message.sender === 'user'
                  ? 'bg-blue-500 text-white self-end'
                  : 'bg-gray-200 text-black self-start'
              }`}
            >
              {message.text}
            </div>
          ))}
        </div>
        <div className="flex items-center p-3 border-t border-gray-300">
          <input
            type="text"
            className="flex-1 border border-gray-300 rounded-lg p-2 text-sm outline-none focus:border-gray-500"
            placeholder="Escribe tu mensaje aquí..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button
            onClick={handleSendMessage}
            className="ml-2 bg-gray-800 text-white text-sm px-4 py-2 rounded-lg hover:bg-white hover:text-black hover:shadow-md transition"
          >
            Enviar
          </button>
        </div>
      </div>
    </div>
  );
}

export default ChatAI;
