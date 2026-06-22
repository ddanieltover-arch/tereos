'use client';

import Image from 'next/image';
import { FileText, Download, Lock } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import type { DownloadDocument } from '@/types';

interface DocumentCardProps {
  document: DownloadDocument;
  categoryLabel: string;
  labels: {
    download: string;
    gated: string;
  };
  onDownload: (doc: DownloadDocument) => void;
}

export function DocumentCard({ document, categoryLabel, labels, onDownload }: DocumentCardProps) {
  return (
    <article className="group flex flex-col h-full bg-white rounded-2xl border border-neutral-100 overflow-hidden hover:shadow-card transition-all">
      <div className="relative h-40 bg-neutral-50 flex items-center justify-center overflow-hidden">
        {document.coverImage ? (
          <Image
            src={document.coverImage}
            alt={document.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <FileText className="w-12 h-12 text-neutral-300" />
        )}
        <div className="absolute top-3 left-3">
          <Badge variant="secondary">{categoryLabel}</Badge>
        </div>
        {document.gated && (
          <div className="absolute top-3 right-3">
            <Badge variant="outline" className="bg-white/90">
              <Lock className="w-3 h-3 mr-1" /> {labels.gated}
            </Badge>
          </div>
        )}
      </div>
      <div className="flex flex-col flex-1 p-5">
        <h3 className="font-bold text-neutral-900 mb-2 line-clamp-2 group-hover:text-primary transition-colors">
          {document.title}
        </h3>
        <div className="flex items-center gap-3 text-xs text-neutral-600 mb-4">
          <span>{document.year}</span>
          <span>·</span>
          <span className="uppercase">{document.language}</span>
          {document.fileSize && (
            <>
              <span>·</span>
              <span>{document.fileSize}</span>
            </>
          )}
        </div>
        <Button
          variant="outline"
          size="sm"
          className="mt-auto w-full"
          onClick={() => onDownload(document)}
        >
          <Download className="w-4 h-4" />
          {labels.download}
        </Button>
      </div>
    </article>
  );
}
