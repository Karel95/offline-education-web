import {
  BriefcaseIcon,
  ChartBarIcon,
  PlayIcon,
} from "@heroicons/react/24/solid";

export const contactData = [
  {
    title: "Offline Learning Platform",
    icon: BriefcaseIcon,
    description:
      "Developed a PWA that allows students to access educational content without an internet connection. This solution supports schools with limited connectivity, ensuring equal learning opportunities.",
  },
  {
    title: "Enhancing Education Access",
    icon: ChartBarIcon,
    description:
      "The PWA leverages service workers and IndexedDB to store content locally. When online, the app syncs data and updates educational resources, enabling seamless access for students and teachers.",
  },
  {
    title: "AI Integration for Personalization",
    icon: PlayIcon,
    description:
      "Integrating lightweight AI models through TensorFlow.js allows the app to run personalized learning experiences offline, adapting to each student's progress even without constant internet access.",
  },  
];

export default contactData;
