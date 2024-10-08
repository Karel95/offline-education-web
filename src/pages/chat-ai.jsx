import React, { useEffect, useState } from 'react';
import * as qna from '@tensorflow-models/qna'; // Importa el modelo de QnA
import '@tensorflow/tfjs-backend-cpu'; // Cargar backend CPU
import '@tensorflow/tfjs-backend-webgl'; // Para aprovechar WebGL si está disponible

export function ChatAI() {
  const [messages, setMessages] = useState([]); // Almacena los mensajes de usuario y IA
  const [input, setInput] = useState(''); // Almacena el valor del input
  const [loading, setLoading] = useState(false); // Indicador de carga mientras busca respuestas
  const [model, setModel] = useState(null); // Almacena el modelo de QnA
  const [sidebarVisible, setSidebarVisible] = useState(false); // Para mostrar/ocultar el sidebar con el 'passage'

  // El 'passage' es el contexto del cual el modelo extraerá respuestas
  const passage =
    "Google LLC is an American multinational technology company that specializes in Internet-related services and products, which include online advertising technologies, search engine, cloud computing, software, and hardware. It is considered one of the Big Four technology companies, alongside Amazon, Apple, and Facebook. Google was founded in September 1998 by Larry Page and Sergey Brin while they were Ph.D. students at Stanford University in California. Together they own about 14 percent of its shares and control 56 percent of the stockholder voting power through supervoting stock...";

  // Cargar el modelo de QnA cuando el componente se monte
  useEffect(() => {
    const loadModel = async () => {
      try {
        const loadedModel = await qna.load(); // Cargar el modelo
        setModel(loadedModel); // Guardar el modelo en el estado
      } catch (error) {
        console.error('Error al cargar el modelo QnA:', error);
      }
    };

    loadModel(); // Llama a la función para cargar el modelo
  }, []); // Solo se ejecuta una vez, al montar el componente

  // Función para encontrar respuestas basadas en la pregunta
  const handleFindAnswer = async (question) => {
    if (!model) return; // Asegurarse de que el modelo esté cargado antes de continuar

    try {
      const answers = await model.findAnswers(question, passage); // Busca respuestas
      return answers;
    } catch (error) {
      console.error('Error encontrando respuestas:', error);
      return [];
    }
  };

  // Enviar mensaje y obtener respuesta de la IA
  const handleSendMessage = async () => {
    if (input.trim()) {
      const newMessage = { text: input, sender: 'user' }; // Mensaje del usuario
      setMessages((prevMessages) => [...prevMessages, newMessage]); // Añadir mensaje del usuario
      setInput(''); // Limpiar el input

      // Simular estado de carga mientras se obtiene la respuesta
      setLoading(true);

      const answers = await handleFindAnswer(input); // Obtener la respuesta de la IA
      const aiResponse = {
        text: answers.length > 0 ? answers[0].text : 'No se encontró respuesta.',
        sender: 'ai', // Mensaje de la IA
      };

      setMessages((prevMessages) => [...prevMessages, aiResponse]); // Añadir la respuesta de la IA
      setLoading(false); // Terminar la carga
    }
  };

  // Manejar el envío al presionar la tecla "Enter"
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault(); // Prevenir el comportamiento por defecto de la tecla "Enter"
      handleSendMessage(); // Llamar a la función de enviar mensaje
    }
  };

  // Alternar la visibilidad del sidebar
  const toggleSidebar = () => {
    setSidebarVisible((prev) => !prev); // Alternar el estado de visibilidad del sidebar
  };

  return (
    <div className="flex">
      {/* Sidebar con el 'passage' */}
      <div
        className={`bg-white shadow-lg transition-transform duration-300 ease-in-out transform ${
          sidebarVisible ? 'translate-x-0' : '-translate-x-full'
        } w-80 h-full fixed top-0 left-0 z-20 p-6 rounded-r-lg border-l border-gray-300`}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="font-bold text-lg">Passage</h2>
          <button
            onClick={toggleSidebar}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
          >
            Close
          </button>
        </div>
        <div className="overflow-y-scroll h-[80%]">
          <p className="text-gray-700">{passage}</p>
        </div>
      </div>

      {/* Área principal del chat */}
      <div
        className={`flex-grow flex justify-center items-center h-screen bg-[url('/img/suriname-bg.png')] bg-cover bg-center transition-all duration-300 ${
          sidebarVisible ? 'ml-80' : 'ml-0'
        }`}
      >
        <div className="mt-10 w-[90%] md:w-[60%] bg-white bg-opacity-20 backdrop-blur-xs border border-gray-300 rounded-lg shadow-md">
          <div className="bg-gray-800 text-white p-3 text-lg rounded-t-lg flex justify-between items-center">
            <span>Chat AI</span>
            <button
              onClick={toggleSidebar}
              className="ml-2 text-sm bg-blue-500 text-white rounded px-2 hover:bg-blue-600 transition"
            >
              {sidebarVisible ? 'Hide' : 'Show'} Passage
            </button>
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
            {loading && (
              <div className="p-3 rounded-lg bg-gray-300 text-black self-start">
                Loading...
              </div>
            )}
          </div>
          <div className="flex items-center p-3 border-t border-gray-300">
            <input
              type="text"
              className="flex-1 border border-gray-300 rounded-lg p-2 text-sm outline-none focus:border-gray-500"
              placeholder="Escribe tu mensaje aquí..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <button
              onClick={handleSendMessage}
              className="ml-2 bg-gray-800 text-white text-sm px-4 py-2 rounded-lg hover:bg-white hover:text-black hover:shadow-md transition"
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChatAI;
