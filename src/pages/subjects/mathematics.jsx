// src/pages/subjects/mathematics.jsx

import React from 'react';
import { Footer } from '@/widgets/layout';

const MathematicsPage = () => {
  return (
    <>
      <section className="relative block h-[100vh]">
        <div className="bg-profile-background absolute top-0 h-full w-full bg-[url('/img/subjects/maths_1472x832.jpg')] bg-cover bg-center scale-105" />
      </section>
      
      <div className="max-w-4xl mx-auto m-10">
        <h1 className="text-4xl font-bold mb-6">Mathematics</h1>
        <p className="text-xl mb-4">
          Mathematics is the foundation of logic and reasoning, helping us
          understand patterns, solve complex problems, and create models to
          represent real-world scenarios. It is a language of its own, enabling
          precise expression and fostering critical thinking.
        </p>
        <p className="mb-4">
          From ancient civilizations like the Greeks and Egyptians who laid the
          groundwork for geometry and algebra, to modern-day advancements in
          fields such as statistics, calculus, and cryptography, mathematics has
          been a driving force in scientific discovery and technological
          innovation.
        </p>
        <p className="mb-4">Key branches of mathematics include:</p>
        <ul className="list-disc pl-5 mt-2">
          <li>
            <strong>Algebra:</strong> Focuses on operations and the
            relationships between them. It deals with equations, functions, and
            variables. It is a field of mathematics that studies symbols and the
            rules for manipulating these symbols. It provides a way to represent
            problems or situations where one or more unknown quantities are
            present. Algebra focuses on the relationships between variables and
            constants through equations, expressions, and functions. Basic
            Algebra: In elementary algebra, you work with equations involving
            numbers and letters representing variables. A key idea is solving
            equations, like finding the value of a variable that makes an
            equation true. Advanced Algebra: In higher levels, you deal with
            structures like polynomials, matrices, and abstract algebra. This
            branch extends into topics like group theory, ring theory, and
            fields. Algebra is essential for understanding linear algebra, used
            widely in engineering, physics, computer science, and economics.
            Real-world Applications: Algebra is widely used in fields like
            finance, cryptography (protecting information using mathematical
            codes), and computer science (algorithms and data structures). It
            allows for the construction of formulas that can predict outcomes,
            model real-world situations, and more.
          </li>
          <li>
            <strong>Geometry:</strong> The study of shapes, sizes, and the
            properties of space. It is the branch of mathematics that focuses on
            the properties and relations of points, lines, surfaces, and solids.
            It explores the nature of space and the relationships between
            objects in space, making it one of the oldest branches of
            mathematics. Euclidean Geometry: The most familiar type of geometry,
            which studies flat surfaces (plane geometry) and solid objects
            (solid geometry). Euclidean geometry deals with concepts like
            angles, circles, triangles, and polygons, using axioms and theorems.
            Non-Euclidean Geometry: In contrast, non-Euclidean geometry explores
            curved spaces, like the geometry of spheres (spherical geometry) or
            hyperbolic spaces. This branch is crucial in understanding modern
            physics and cosmology, where the universe itself is modeled as a
            non-Euclidean space. Applications: Geometry has applications in
            various fields, such as architecture (designing structures), art
            (perspective drawing), robotics (motion planning), and even in
            computer graphics (3D rendering and simulations).
          </li>
          <li>
            <strong>Calculus:</strong> A field concerned with change and motion,
            developed by Isaac Newton and Gottfried Wilhelm Leibniz. It is a
            branch of mathematics developed to deal with change. It is divided
            into two main parts: differential calculus and integral calculus.
            Differential Calculus: Focuses on the concept of the derivative,
            which represents how a function changes as its input changes. It
            allows us to measure rates of change, which is essential in fields
            like physics, where it is used to describe motion, and in economics,
            where it describes how variables like profit change with respect to
            time or production levels. Integral Calculus: Involves the concept
            of the integral, which is used to calculate areas under curves,
            volumes of solids, and accumulation of quantities. Integrals are
            widely used in engineering, biology (modeling population growth),
            and physics (calculating areas under velocity-time graphs to find
            displacement). Real-world Applications: Calculus is foundational to
            many scientific fields. For instance, in engineering, it is used to
            design and analyze systems and structures, and in medicine, calculus
            helps to model biological systems, such as the rate of drug
            absorption.
          </li>
          <li>
            <strong>Statistics and Probability:</strong> Deals with data
            collection, analysis, and interpretation, as well as the likelihood
            of events occurring. Statistics: This field involves designing
            experiments, collecting data, and analyzing it to draw conclusions.
            It's essential in fields like medicine (analyzing clinical trial
            data), social sciences (survey data), and business (market
            analysis). Key concepts in statistics include mean, median, standard
            deviation, and hypothesis testing. Probability: Focuses on the
            likelihood of events occurring and is used to model situations of
            uncertainty. Probability theory underpins much of statistics and has
            critical applications in fields such as finance (risk assessment),
            insurance (premium calculation), and machine learning (building
            predictive models). Applications: In addition to research,
            statistics and probability are used in everyday life, such as
            understanding trends in data (e.g., weather predictions, sports
            analytics) and making informed decisions based on likelihood and
            risk.
          </li>
        </ul>
      </div>

      <div className="bg-white">
        <Footer />
      </div>
    </>
  );
};

export default MathematicsPage;
