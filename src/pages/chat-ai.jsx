import React, { useEffect, useRef, useState } from 'react';
import * as qna from '@tensorflow-models/qna'; // Importa el modelo de QnA
import '@tensorflow/tfjs-backend-cpu'; // Cargar backend CPU
import '@tensorflow/tfjs-backend-webgl'; // Para aprovechar WebGL si está disponible
import subjects from '../data/subjects'; // Importa el JSON

export function ChatAI() {
  const [messages, setMessages] = useState([]); // Almacena los mensajes de usuario y IA
  const [input, setInput] = useState(''); // Almacena el valor del input
  const [loading, setLoading] = useState(false); // Indicador de carga mientras busca respuestas
  const [model, setModel] = useState(null); // Almacena el modelo de QnA
  const [error, setError] = useState(null); // Almacena cualquier error durante la carga
  const [sidebarVisible, setSidebarVisible] = useState(false); // Para mostrar/ocultar el sidebar con el 'passage'
  const endOfMessagesRef = useRef(null); // Referencia al final del chat
  const [subjID, setSubjId] = useState(0);
  const subject = subjects[subjID].name;
  const passage = subjects[subjID].content; // El 'passage' es el contexto del cual el modelo extraerá respuestas
  const [activeSubjId, setActiveSubjId] = useState(0);

  useEffect(() => {
    let isComponentMounted = true;

    const loadModel = async () => {
      if (model) return; // Prevent reloading the model if it's already loaded
      setLoading(true); // Start loading indicator
      try {
        const loadedModel = await qna.load({
          modelUrl: '/models/mobilebert/model.json', // Load the local model
        });

        if (isComponentMounted) {
          setModel(loadedModel); // Store the loaded model
          console.log('Model loaded correctly:', loadedModel);
        }
      } catch (error) {
        console.error('Error loading the model:', error);
      } finally {
        if (isComponentMounted) {
          setLoading(false); // End loading indicator
        }
      }
    };

    loadModel();

    return () => {
      isComponentMounted = false; // Component unmounted
      if (model) {
        model.dispose(); // Dispose of the model to free up memory
        tf.engine().disposeVariables(); // Dispose of TensorFlow.js variables from memory
        console.log('Model disposed');
      }
    };
  }, []); // Only return the effect if the model is null

  // Función para encontrar respuestas basadas en la pregunta
  const handleFindAnswer = async (question) => {
    if (!model) {
      setError('The model is not loaded. Please, try again later.');
      return []; // Retorna un array vacío si el modelo no está cargado
    }

    try {
      const answers = await model.findAnswers(question, passage); // Busca respuestas
      return answers || []; // Si no hay respuestas, retorna un array vacío
    } catch (error) {
      console.error('Error finding answers:', error);
      setError('Something went wrong when finding answers.');
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
        text: answers.length > 0 ? answers[0].text : 'No answers was found.', // Evita el error si answers es undefined
        sender: 'ai', // Mensaje de la IA
      };

      setMessages((prevMessages) => [...prevMessages, aiResponse]); // Añadir la respuesta de la IA
      setLoading(false); // Terminar la carga
    }
  };

  // Scroll hacia el final del chat cuando los mensajes cambien
  if (endOfMessagesRef.current) {
    endOfMessagesRef.current.scrollIntoView({ behavior: 'smooth' });
  }

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
          <h2 className="font-bold text-lg">{subject}</h2>
          <button
            onClick={toggleSidebar}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
          >
            X
          </button>
        </div>
        <div className="overflow-y-scroll h-[80%]">
          <p className="text-gray-700">{passage}</p>
        </div>
      </div>

      <nav
        className={`z-20 flex shrink-0 grow-0 justify-around gap-4 border-t border-gray-200 bg-white/50 p-2.5 shadow-lg backdrop-blur-lg dark:border-slate-600/60 dark:bg-slate-800/50 fixed top-2/4 -translate-y-2/4 left-6 min-h-[auto] min-w-[64px] flex-col rounded-lg border ease-in-out transform transition-all duration-300 ${sidebarVisible ? 'ml-80' : 'ml-0'}`}
      >
        <a
          onClick={() => {
            toggleSidebar();
            setSubjId(0);
            setActiveSubjId(0); // Activa este enlace
          }}
          className={`flex aspect-square cursor-pointer min-h-[32px] w-16 flex-col items-center justify-center gap-1 rounded-md p-1.5 ${
            activeSubjId === 0
              ? 'bg-indigo-50 text-indigo-600 dark:bg-sky-900 dark:text-sky-50'
              : 'text-black dark:bg-gray-800 dark:text-white'
          }`}
        >
          {/* <!-- HeroIcon - User --> */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-6 h-6 shrink-0"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
            />
          </svg>
          <small className="text-center text-xs font-medium">ELA</small>
        </a>

        <a
          onClick={() => {
            toggleSidebar();
            setSubjId(1);
            setActiveSubjId(1); // Activa este enlace
          }}
          className={`flex aspect-square cursor-pointer min-h-[32px] w-16 flex-col items-center justify-center gap-1 rounded-md p-1.5 ${
            activeSubjId === 1
              ? 'bg-indigo-50 text-indigo-600 dark:bg-sky-900 dark:text-sky-50'
              : 'text-black dark:bg-gray-800 dark:text-white'
          }`}
        >
          {/* <!-- HeroIcon - Chart Bar --> */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-6 h-6 shrink-0"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z"
            />
          </svg>
          <small className="text-center text-xs font-medium">Maths</small>
        </a>

        <a
          onClick={() => {
            toggleSidebar();
            setSubjId(2);
            setActiveSubjId(2); // Activa este enlace
          }}
          className={`flex aspect-square cursor-pointer min-h-[32px] w-16 flex-col items-center justify-center gap-1 rounded-md p-1.5 ${
            activeSubjId === 2
              ? 'bg-indigo-50 text-indigo-600 dark:bg-sky-900 dark:text-sky-50'
              : 'text-black dark:bg-gray-800 dark:text-white'
          }`}
        >
          {/* <!-- HeroIcon - Cog-6-tooth --> */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-6 h-6 shrink-0"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
          <small className="text-center text-xs font-medium">History</small>
        </a>

        <hr className="dark:border-gray-700/60" />

        <a
          href=""
          className="flex h-16 w-16 flex-col items-center justify-center gap-1 text-fuchsia-900 dark:text-gray-400"
        >
          {/* <!-- HeroIcon - Home Modern --> */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8.25 21v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21m0 0h4.5V3.545M12.75 21h7.5V10.75M2.25 21h1.5m18 0h-18M2.25 9l4.5-1.636M18.75 3l-1.5.545m0 6.205l3 1m1.5.5l-1.5-.5M6.75 7.364V3h-3v18m3-13.636l10.5-3.819"
            />
          </svg>

          <small className="text-xs font-medium">Home</small>
        </a>
      </nav>

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
            <div ref={endOfMessagesRef} />{' '}
            {/* Punto de referencia para hacer scroll */}
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
