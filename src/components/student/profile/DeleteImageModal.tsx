"use client";

import React from 'react';
import { Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface DeleteImageModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  uploading: boolean;
}

export function DeleteImageModal({ isOpen, onClose, onConfirm, uploading }: DeleteImageModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-background rounded-2xl border border-border w-full max-w-sm shadow-2xl p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-full bg-red-100 dark:bg-red-900/20 flex items-center justify-center">
            <Trash2 className="w-5 h-5 text-red-500" />
          </div>
          <div>
            <h3 className="font-semibold">Remove Profile Photo</h3>
            <p className="text-sm text-muted-foreground">You can cancel this change before saving.</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button
            onClick={onConfirm}
            disabled={uploading}
            variant="destructive"
            className="flex-1"
          >
            {uploading ? 'Removing…' : 'Remove Photo'}
          </Button>
          <Button
            onClick={onClose}
            variant="outline"
            className="flex-1"
            disabled={uploading}
          >
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
}
