import React, { useEffect, useRef, useState } from 'react';
import * as qna from '@tensorflow-models/qna'; // Importa el modelo de QnA
import '@tensorflow/tfjs-backend-cpu'; // Cargar backend CPU
import '@tensorflow/tfjs-backend-webgl'; // Para aprovechar WebGL si está disponible
import subjects from '../data/subjects'; // Importa el JSON
import { driver } from 'driver.js';
import 'driver.js/dist/driver.css';

const driverObj = driver({
  showProgress: true,
  steps: [
    {
      element: '#chat-ai',
      popover: {
        title: 'Chat-AI',
        description:
          'Interact with the AI-powered chat to ask questions or get help with your content.',
        side: 'right',
        align: 'start',
      },
    },
    {
      element: '#show-passage',
      popover: {
        title: 'Show passage',
        description:
          'Click here to display the relevant passage or content for reference.',
        side: 'bottom',
        align: 'start',
      },
    },
    {
      element: '#question',
      popover: {
        title: 'Make a question',
        description:
          'Type your question here to interact with the AI and receive an answer.',
        side: 'right',
        align: 'start',
      },
    },
    {
      element: '#send',
      popover: {
        title: 'Send the question',
        description: 'Submit your question to receive a response from the AI.',
        side: 'left',
        align: 'start',
      },
    },
    {
      element: '#ELA',
      popover: {
        title: 'English Language Arts (ELA)',
        description:
          'Explore resources and ask questions related to English Language Arts.',
        side: 'left',
        align: 'start',
      },
    },
    {
      element: '#maths',
      popover: {
        title: 'Mathematics',
        description:
          'Access and engage with educational materials for Mathematics.',
        side: 'left',
        align: 'start',
      },
    },
    {
      element: '#history',
      popover: {
        title: 'History',
        description:
          'Learn more about historical events and ask questions about history topics.',
        side: 'left',
        align: 'start',
      },
    },
    {
      element: '#help',
      popover: {
        title: 'Help',
        description:
          'Need assistance? Click here to access help or support resources.',
        side: 'left',
        align: 'start',
      },
    },
  ],
});

export function AiOffline() {
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
  const [snackbarVisible, setSnackbarVisible] = useState(false);

  useEffect(() => {
    let isComponentMounted = true;

    const loadModel = async () => {
      if (model) return; // Prevent reloading the model if it's already loaded
      setLoading(true); // Start loading indicator
      try {
        const loadedModel = await qna.load({
          modelUrl: '/models/mobilebert/model.json',
          vocabUrl: '/models/mobilebert/processed_vocab.json',
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
          showSnackbar();
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

  const showSnackbar = () => {
    setSnackbarVisible(true);
    setTimeout(() => {
      setSnackbarVisible(false);
    }, 5000); // Close the Snackbar after 5 seconds
  };

  const closeSnackbar = () => {
    setSnackbarVisible(false);
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
        id="sidebar"
        className={`md:z-20 md:w-auto flex md:shrink-0 md:grow-0 md:top-2/4 md:-translate-y-2/4 md:left-6 md:min-h-[auto] md:flex-col md:gap-4 border-t border-gray-200 bg-white/50 md:p-2.5 shadow-lg dark:border-slate-600/60 dark:bg-slate-800/50 fixed md:rounded-lg border ease-in-out transform transition-all duration-300 ${sidebarVisible ? 'ml-80' : 'ml-0'} 
          mx-auto top-auto p-1 justify-around w-[100%] rounded-lg fixed bottom-0 flex-row translate-y-0`}
      >
        {' '}
        <a
          id="ELA"
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
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6 shrink-0"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
            />
          </svg>
          <small className="text-center text-xs font-medium">ELA</small>
        </a>
        <a
          id="maths"
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
          id="history"
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
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6 shrink-0"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25"
            />
          </svg>
          <small className="text-center text-xs font-medium">History</small>
        </a>
        <hr className="dark:border-gray-700/60" />
        <a
          id="help"
          onClick={() => driverObj.drive()}
          className="flex h-16 w-16 flex-col cursor-pointer items-center justify-center gap-1 text-fuchsia-900 dark:text-gray-400"
        >
          {/* <!-- HeroIcon - Home Modern --> */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 5.25h.008v.008H12v-.008Z"
            />
          </svg>

          <small className="text-xs font-medium">Help</small>
        </a>
      </nav>

      {/* Área principal del chat */}
      <div
        className={`flex-grow flex justify-center items-center h-screen bg-[url('/img/suriname-bg.png')] bg-cover bg-center transition-all duration-300 ${
          sidebarVisible ? 'ml-80' : 'ml-0'
        }`}
      >
        <div
          id="chat-ai"
          className="mt-10 mb-1 w-[90%] md:w-[60%] bg-white bg-opacity-20 backdrop-blur-xs border border-gray-300 rounded-lg shadow-md"
        >
          <div className="bg-gray-800 text-white p-3 text-lg rounded-t-lg flex justify-between items-center">
            <span>AI Offline</span>
            <button
              id="show-passage"
              onClick={toggleSidebar}
              className="ml-2 text-sm bg-blue-500 text-white rounded px-2 hover:bg-blue-600 transition"
            >
              {sidebarVisible ? 'Hide' : 'Show'} Content
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
              <div
                id="loading"
                className="p-3 rounded-lg bg-gray-300 text-black self-start"
              >
                Loading... Please wait...
              </div>
            )}
            <div ref={endOfMessagesRef} />{' '}
            {/* Punto de referencia para hacer scroll */}
          </div>
          <div className="flex items-center p-3 border-t border-gray-300">
            <input
              id="question"
              type="text"
              className="flex-1 border border-gray-300 rounded-lg p-2 text-sm outline-none focus:border-gray-500"
              placeholder="Type your message here..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <button
              id="send"
              onClick={handleSendMessage}
              className="ml-2 bg-gray-800 text-white text-sm px-4 py-2 rounded-lg hover:bg-white hover:text-black hover:shadow-md transition"
            >
              Send
            </button>
          </div>
        </div>
      </div>
      <div
        id="snackbar"
        className="bg-green-500 text-white p-4 rounded-md fixed bottom-4 right-4 flex justify-between items-center"
        style={{ display: snackbarVisible ? 'flex' : 'none' }}
      >
        Model loaded correctly, you can chat with the AI now. Thanks for
        waiting.
        <button className="text-white" onClick={closeSnackbar}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="w-4 h-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}

export default AiOffline;
