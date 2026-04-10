"use client";

import Link from 'next/link';
import { Plus, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ClassDetailHeaderProps {
   selectedBatch: any;
   topicSlug: string;
   classSlug: string;
   onAssignClick: () => void;
}

export default function ClassDetailHeader({ selectedBatch, topicSlug, classSlug, onAssignClick }: ClassDetailHeaderProps) {
   return (
      <>
         <div className="flex items-center gap-3 mb-5 text-muted-foreground">
            <Link href={`/admin/topics/${topicSlug}`} className="hover:text-foreground transition-colors flex items-center gap-1.5 text-sm font-medium">
               <ArrowLeft className="w-4 h-4" /> Back to Classes
            </Link>
         </div>
         <div className="glass px-7 py-4 mb-5 rounded-2xl backdrop-blur-2xl flex items-center justify-between">

            {/* LEFT */}
            <div className="flex flex-col gap-2">

               <h2 className="text-3xl font-bold tracking-tight text-foreground flex items-center gap-3">
                  Class <span className='text-primary '>Questions</span>
               </h2>

               <p className="text-muted-foreground text-sm font-mono bg-muted inline-flex items-center px-3 py-1 rounded border border-border/60 w-fit">
                  {selectedBatch.name} / {topicSlug} / {classSlug}
               </p>

            </div>

            {/* RIGHT */}
            <Button
               onClick={onAssignClick}
               className="gap-2 h-10 px-4 rounded-xl shrink-0"
            >
               <Plus className="w-4 h-4" />
               Assign Questions
            </Button>

         </div>
      </>
   );
}
