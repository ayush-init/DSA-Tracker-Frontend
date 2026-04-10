"use client";

import Link from 'next/link';
import { Plus, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ClassHeaderProps {
   selectedBatch: any;
   topicSlug: string;
   onAddClick: () => void;
}

export default function ClassHeader({ selectedBatch, topicSlug, onAddClick }: ClassHeaderProps) {
   return (
      <>
         <div className="flex items-center mb-4 gap-3 text-muted-foreground">
            <Link href="/admin/topics" className="hover:text-foreground transition-colors flex items-center gap-1.5 text-sm font-medium">
               <ArrowLeft className="w-4 h-4" /> Back to Topics
            </Link>
         </div>
         <div className="flex items-center justify-between glass backdrop-blur-2xl mb-5 rounded-2xl p-5">

            {/* LEFT */}
            <div className="flex flex-col gap-2">

               <h2 className="text-3xl font-bold tracking-tight text-foreground flex items-center gap-3">
                  Classes
               </h2>

               <p className="m-0 text-muted-foreground text-sm font-mono bg-muted inline-flex items-center px-3 py-1 rounded border border-border/60 w-fit">
                  {selectedBatch.name} / {topicSlug}
               </p>

            </div>

            {/* RIGHT */}
            <Button
               onClick={onAddClick}
               className="gap-2 shrink-0 h-11 px-5 rounded-xl"
            >
               <Plus className="w-4 h-4" />
               Add Class
            </Button>

         </div>
      </>
   );
}
