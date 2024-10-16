// src/pages/subjects/mathematics.jsx

import React from 'react';
import { Footer } from '@/widgets/layout';

const EnglishPage = () => {
  return (
    <>
      <section className="relative block h-[100vh]">
        <div className="bg-profile-background absolute top-0 h-full w-full bg-[url('/img/subjects/english_1472x832.jpg')] bg-cover bg-center scale-105" />
      </section>

      <div className="max-w-4xl mx-auto m-10">
        <h1 className="text-4xl font-bold mb-6">English Language Arts (ELA)</h1>
        <p className="text-xl mb-4">
          English Language Arts (ELA) encompasses the essential skills of
          reading, writing, speaking, and listening. It promotes literacy and
          effective communication, enabling individuals to express ideas,
          understand complex texts, and engage in thoughtful discussions.
        </p>
        <p className="mb-4">
          The study of ELA is crucial in developing the ability to comprehend
          written materials, craft coherent writing, and articulate thoughts in
          both written and spoken forms. It fosters a deeper understanding of
          literature and the ways in which language influences thought and
          culture.
        </p>
        <p className="mb-4">Key areas of ELA include:</p>
        <ul className="list-disc pl-5 mt-2">
          <li>
            <strong>Reading:</strong> This component involves developing
            comprehension, interpretation, and critical analysis of various
            texts. Reading includes understanding genres such as fiction,
            nonfiction, poetry, and drama. The focus is not just on reading
            fluency, but on interpreting and analyzing themes, character
            development, plot structure, and the use of language.
            <br />
            <em>Real-world Applications:</em> Reading is essential in
            understanding informational texts, navigating media, and forming
            connections between literature and life experiences. It builds
            empathy, broadens perspectives, and enhances critical thinking.
          </li>
          <li>
            <strong>Writing:</strong> Writing teaches individuals to express
            ideas clearly and effectively, organizing thoughts into coherent
            texts. It covers narrative, persuasive, and expository writing,
            emphasizing structure, grammar, style, and tone.
            <br />
            <em>Real-world Applications:</em> Writing skills are fundamental in
            communicating ideas, whether for academic essays, business
            proposals, or creative storytelling. Mastery of writing empowers
            individuals to influence and inform through written communication.
          </li>
          <li>
            <strong>Speaking and Listening:</strong> ELA focuses on developing
            strong oral communication skills and active listening. Speaking
            includes making presentations, engaging in discussions, and
            debating, while listening involves interpreting information,
            responding thoughtfully, and evaluating different perspectives.
            <br />
            <em>Real-world Applications:</em> These skills are vital in public
            speaking, professional communication, and interpersonal
            relationships. Speaking and listening are essential for
            collaboration, persuasion, and effective participation in group
            settings.
          </li>
          <li>
            <strong>Vocabulary:</strong> Building a strong vocabulary is
            essential for reading comprehension and effective writing. It helps
            in understanding and expressing complex ideas with precision and
            clarity. Vocabulary instruction focuses on word meanings, usage, and
            connotation.
            <br />
            <em>Real-world Applications:</em> A rich vocabulary enhances
            communication in everyday life, from academic discourse to
            professional writing, and helps individuals express themselves more
            accurately and persuasively.
          </li>
        </ul>
      </div>

      <div className="bg-white">
        <Footer />
      </div>
    </>
  );
};

export default EnglishPage;
