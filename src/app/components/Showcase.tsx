'use client';

import { useState } from 'react';
import Image from 'next/image';

type Project = {
  id: string;
  title: string;
  description: string;
  thumbnailUrl: string;
  pdfUrl: string | null;
  tags: string[];
};

const projects: Project[] = [
  {
    id: 'minna-no-himitsukichi',
    title: 'Webアプリケーション『皆の秘密基地』',
    description: '企画からインフラ構築まで、フルスタック開発の全工程を一人で完遂したライフログ・アプリケーション。',
    thumbnailUrl: '/projects/minna-no-himitsukichi/thumbnail.png',
    pdfUrl: '/projects/minna-no-himitsukichi/presentation.pdf',
    tags: ['React', 'Node.js', 'PostgreSQL']
  },
  {
    id: 'project-alice',
    title: '自作RAG搭載AIパートナー「ありす」',
    description: '「Vibe Coding」により、AIを単なるツールから「共に進化するパートナー」へと昇華させたプロジェクト。自作RAG「Compass」による長期記憶、Android/Web展開、完全自律インフラの構築を通じ、AIとの共生を目指す。',
    thumbnailUrl: '/projects/Project-Alice/thumbnail.png',
    pdfUrl: '/projects/Project-Alice/presentation.pdf',
    tags: ['Next.js', 'FastAPI', 'RAG (Embedding + LanceDB)', 'Docker']
  },
  {
    id: 'project-ask-mirai',
    title: 'Project ASK MIRAI',
    description: 'オープンキャンパス体験創出プロジェクト。学生主体の対話型AI Q&Aシステム。来校者が自然言語で質問、学校の公式情報に基づいた正確な回答を提供します。',
    thumbnailUrl: '/projects/Project-ASK-MIRAI/thumbnail.png',
    pdfUrl: '/projects/Project-ASK-MIRAI/presentation.pdf',
    tags: ['Next.js', 'PyTorch (Local LLM)', 'FastAPI', 'Docker']
  }
];

export default function Showcase() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <>
      <section id="showcase" className="py-20 px-8 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">実績</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project) => (
            <div
              key={project.id}
              className="bg-gray-800 rounded-lg shadow-md overflow-hidden cursor-pointer hover:shadow-lg transition-shadow"
              onClick={() => setSelectedProject(project)}
            >
              <Image
                src={project.thumbnailUrl}
                alt={project.title}
                width={400}
                height={192}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-2xl font-semibold mb-3">{project.title}</h3>
                <p className="text-gray-300 mb-4">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2 text-sm">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="bg-blue-900 text-blue-300 px-2 py-1 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {selectedProject && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-gray-800 rounded-lg max-w-4xl w-full max-h-full overflow-auto">
            <div className="flex justify-between items-center p-6 border-b">
              <h3 className="text-2xl font-semibold">{selectedProject.title}</h3>
              <button
                onClick={() => setSelectedProject(null)}
                className="text-gray-400 hover:text-gray-700 text-2xl"
              >
                ×
              </button>
            </div>
            <div className="p-6">
              <p className="text-gray-300 mb-4">
                {selectedProject.description}
              </p>
              <div className="flex flex-wrap gap-2 mb-6">
                {selectedProject.tags.map((tag) => (
                  <span
                    key={tag}
                    className="bg-blue-900 text-blue-300 px-2 py-1 rounded-full text-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              {selectedProject.pdfUrl ? (
                <div className="border rounded-lg">
                  <iframe
                    src={selectedProject.pdfUrl}
                    width="100%"
                    height="600"
                    className="rounded-lg"
                  />
                </div>
              ) : (
                <div className="text-center py-12 text-gray-400">
                  資料は現在準備中です
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}