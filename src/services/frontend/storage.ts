import { ID, storage } from '@/lib/appwrite'
import { type Models, type UploadProgress } from 'appwrite'

export const BUCKET_ID = process.env.NEXT_PUBLIC_APPWRITE_BUCKET_ID ?? 'evidence_storage'

export const upload = async (file: File, onProgress?: (progress: UploadProgress) => void): Promise<Models.File> => {
  return await storage.createFile(BUCKET_ID, ID.unique(), file, undefined, onProgress)
}

export const getFileViewURL = (file: Models.File): string => {
  return storage.getFileView(BUCKET_ID, file.$id).toString()
}
