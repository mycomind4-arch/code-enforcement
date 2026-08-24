import React from 'react';
import { FLAGSHIP_WORKFLOW, GOLD_PIPELINE } from './domain/workflow';
import { SEO_CONFIG } from './domain/seo';

export default function App() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <h1 className="text-2xl font-bold">{SEO_CONFIG.title}</h1>
        <p className="text-sm text-gray-600 mt-1">{SEO_CONFIG.description}</p>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-8">
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-2">Workflow</h2>
          <p className="text-gray-700">{FLAGSHIP_WORKFLOW.description}</p>
          <p className="text-sm text-amber-700 mt-2 italic">{FLAGSHIP_WORKFLOW.disclaimer}</p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Gold Pipeline Stages</h2>
          <div className="space-y-2">
            {GOLD_PIPELINE.map((stage, i) => (
              <div key={stage.id} className="flex items-start gap-3 p-3 bg-white rounded-lg border border-gray-200">
                <span className="flex-shrink-0 w-6 h-6 flex items-center justify-center rounded-full bg-blue-100 text-blue-700 text-xs font-medium">
                  {i + 1}
                </span>
                <div>
                  <p className="font-medium text-sm">{stage.title}</p>
                  <p className="text-xs text-gray-500 mt-0.5">{stage.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-2">How It Works</h2>
          <ol className="list-decimal list-inside space-y-2 text-gray-700">
            <li>Upload your code enforcement notice (PDF, image, or text)</li>
            <li>The system securely ingests and classifies the document</li>
            <li>Extracts all fields with source provenance</li>
            <li>Identifies the governing jurisdiction and researches official sources</li>
            <li>Analyzes consent, authority, and warrant references</li>
            <li>Builds a timeline and evidence graph</li>
            <li>Detects discrepancies and missing information</li>
            <li>Generates response strategies (with human review required)</li>
            <li>Drafts a professional response (with independent critique)</li>
            <li>You review and authorize before anything is sent</li>
          </ol>
        </section>
      </main>

      <footer className="border-t border-gray-200 px-6 py-4 text-center text-sm text-gray-500">
        <p>{FLAGSHIP_WORKFLOW.disclaimer}</p>
        <p className="mt-2">Canonical: {SEO_CONFIG.canonicalRoute}</p>
      </footer>
    </div>
  );
}
