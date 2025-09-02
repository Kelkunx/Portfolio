// app/page.tsx
import React from "react";

export default function HomePage() {
  return (
    <section>
      <div className="py-12">
        <h1 className="text-3xl md:text-5xl font-extrabold">Bonjour — je suis Prénom NOM.</h1>
        <p className="mt-4 text-lg text-slate-700 max-w-2xl">
          Développeur web fullstack (React, Next.js, NestJS). J'aime construire des interfaces rapides, accessibles et maintenables.
        </p>

        <div className="mt-6 flex gap-4">
          <a href="/projets" className="inline-block px-4 py-2 bg-slate-900 text-white rounded-lg">Voir mes projets</a>
          <a href="/contact" className="inline-block px-4 py-2 border border-slate-300 rounded-lg">Me contacter</a>
        </div>
      </div>

      <section className="mt-12">
        <h2 className="text-2xl font-semibold">Compétences</h2>
        <ul className="mt-4 flex flex-wrap gap-2">
          <li className="px-3 py-1 bg-slate-100 rounded">React</li>
          <li className="px-3 py-1 bg-slate-100 rounded">Next.js</li>
          <li className="px-3 py-1 bg-slate-100 rounded">TypeScript</li>
          <li className="px-3 py-1 bg-slate-100 rounded">NestJS</li>
        </ul>
      </section>
    </section>
  );
}
