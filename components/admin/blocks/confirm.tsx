'use client';
import * as React from 'react';
import {
  AlertDialog, AlertDialogCancel, AlertDialogContent, AlertDialogDescription,
  AlertDialogFooter, AlertDialogHeader, AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';

export interface ConfirmState {
  open: boolean;
  title: string;
  description: string;
  confirmLabel?: string;
  danger?: boolean;
  onConfirm?: () => void;
}
export const closedConfirm: ConfirmState = { open: false, title: '', description: '' };

export function ConfirmDialog({ state, onClose }: { state: ConfirmState; onClose: () => void }) {
  return (
    <AlertDialog open={state.open} onOpenChange={o => !o && onClose()}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{state.title}</AlertDialogTitle>
          <AlertDialogDescription>{state.description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={onClose}>Cancel</AlertDialogCancel>
          <Button
            variant={state.danger ? 'danger' : 'default'}
            onClick={() => { state.onConfirm?.(); onClose(); }}
          >
            {state.confirmLabel ?? 'Confirm'}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
