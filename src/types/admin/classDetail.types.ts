/**
 * Class detail / assigned questions types for admin
 */

import { Question } from './question.types';
import { BatchSelection } from '../common/index.types';

export interface ClassAssignedQuestion {
  id: number;
  question_id: number;
  class_id: number;
  type: 'HOMEWORK' | 'CLASSWORK';
  assigned_at: string;
  question?: Question;
}

export interface ClassDetailHeaderProps {
  selectedBatch: BatchSelection | null;
  topicSlug: string;
  classSlug: string;
  onAssignClick: () => void;
}

export interface ClassDetailFilterProps {
  search: string;
  onSearchChange: (value: string) => void;
  assignedTotalCount: number;
}

export interface ClassDetailTableProps {
  assignedQuestions: ClassAssignedQuestion[];
  loading: boolean;
  onEditType: (question: ClassAssignedQuestion) => void;
  onRemoveQuestion: (questionId: number) => void;
}

export interface AssignQuestionsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  batchSlug: string;
  topicSlug: string;
  classSlug: string;
  assignedQuestions: ClassAssignedQuestion[];
}

export interface EditQuestionTypeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  batchSlug: string;
  topicSlug: string;
  classSlug: string;
  question: ClassAssignedQuestion | null;
}

export interface ClassDetailShimmerProps {
  // No props needed
}
