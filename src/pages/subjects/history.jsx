// src/pages/subjects/mathematics.jsx

import React from 'react';
import { Footer } from '@/widgets/layout';

const HistoryPage = () => {
  return (
    <>
      <section className="relative block h-[100vh]">
        <div className="bg-profile-background absolute top-0 h-full w-full bg-[url('/img/subjects/history_1472x832.jpg')] bg-cover bg-center scale-105" />
      </section>

      <div className="max-w-4xl mx-auto m-10">
        <h1 className="text-4xl font-bold mb-6">History</h1>
        <p className="text-xl mb-4">
          History is the study of past events, particularly in human affairs. It
          helps us understand where we came from, how societies evolved, and
          provides context for understanding the present and shaping the future.
        </p>
        <p className="mb-4">
          From ancient civilizations like Mesopotamia and Egypt to modern-day
          global events, the study of history is essential for understanding the
          development of cultures, economies, political systems, and more.
        </p>
        <p className="mb-4">Key branches of history include:</p>
        <ul className="list-disc pl-5 mt-2">
          <li>
            <strong>Ancient History:</strong> The study of civilizations from
            the beginning of recorded history until the early Middle Ages. It
            covers great civilizations like Egypt, Greece, Rome, and
            Mesopotamia, offering insights into the birth of writing, politics,
            and the arts. Ancient history helps us understand how early
            societies were organized, their belief systems, and their
            contributions to science, philosophy, and governance. Notable
            periods include the Bronze Age, the rise of empires, and early
            innovations like the invention of the wheel and the development of
            the first cities.
          </li>
          <li>
            <strong>Medieval History:</strong> Focuses on the period from the
            fall of the Roman Empire to the beginning of the Renaissance, often
            referred to as the Middle Ages. This era saw the rise of feudalism,
            the spread of Christianity and Islam, the Crusades, and the growth
            of monarchies across Europe. Medieval history explores the societal
            structures, economies, and cultural movements of the time, including
            the spread of knowledge through monasteries and the eventual shift
            towards Renaissance humanism.
          </li>
          <li>
            <strong>Modern History:</strong> Covers events from the late 15th
            century onward, including the Renaissance, the Enlightenment, the
            Industrial Revolution, and up to contemporary events. This period
            explores the dramatic transformations brought about by scientific
            discoveries, political revolutions (such as the French and American
            revolutions), and the development of modern nation-states. Major
            events like World Wars, the Cold War, and the digital revolution are
            studied to understand how the modern world has been shaped.
          </li>
          <li>
            <strong>Social and Cultural History:</strong> Investigates the
            social fabric of past societies, including class structures, gender
            roles, and cultural developments like art, music, and literature.
            This branch emphasizes the experiences of everyday people rather
            than just the elite or ruling classes. Social history highlights how
            events like the Industrial Revolution affected ordinary lives, or
            how cultural movements, such as the Renaissance, influenced art and
            philosophy.
          </li>
        </ul>
      </div>

      <div className="bg-white">
        <Footer />
      </div>
    </>
  );
};

export default HistoryPage;
