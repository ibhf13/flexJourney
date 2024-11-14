import {
    deleteObject,
    getDownloadURL,
    ref,
    uploadBytes
} from 'firebase/storage'
import { storage } from '../firebaseConfig'
import { handleFirebaseError } from '../utils/errors'

export const uploadFile = async (
    path: string,
    file: File
): Promise<string> => {
    try {
        const storageRef = ref(storage, path)

        await uploadBytes(storageRef, file)

        return await getDownloadURL(storageRef)
    } catch (error) {
        throw handleFirebaseError(error)
    }
}

export const deleteFile = async (path: string): Promise<void> => {
    try {
        const storageRef = ref(storage, path)

        await deleteObject(storageRef)
    } catch (error) {
        throw handleFirebaseError(error)
    }
}

export const getFileUrl = async (path: string): Promise<string> => {
    try {
        const storageRef = ref(storage, path)

        return await getDownloadURL(storageRef)
    } catch (error) {
        throw handleFirebaseError(error)
    }
}