import { type Models } from 'appwrite'

export interface Task {
  id: string
  name: string
  description: string
  points: number
  isExtra?: boolean
}

export interface TaskData {
  task: string
  evidenceImage: string
  evidenceOpGG: string
  status?: 'pending' | 'reviewing' | 'approved' | 'rejected'
  notes?: string
  reviewer?: string
  reviewerNotes?: string
}

export interface TaskDocument extends TaskData, Models.Document {}

export interface TaskDocumentList extends Models.DocumentList<TaskDocument> {}
