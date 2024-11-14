import {
    collection,
    deleteDoc,
    doc,
    getDoc,
    getDocs,
    query,
    QueryConstraint,
    setDoc,
    updateDoc
} from 'firebase/firestore'
import { db } from '../firebaseConfig'
import { FirebaseQueryOptions, FirestoreCollectionRef } from '../types/firebaseTypes'
import { handleFirebaseError } from '../utils/errors'
import { createCollectionPath } from '../utils/pathUtils'
import { buildQueryConstraints } from '../utils/queryBuilder'
import { querySnapshotToData, snapshotToData } from '../utils/transforms'

export const createDocument = async <T>(
    collectionRef: FirestoreCollectionRef,
    data: Omit<T, 'id'>,
    customId?: string
): Promise<T> => {
    try {
        const path = createCollectionPath(collectionRef)
        const docRef = customId
            ? doc(db, path, customId)
            : doc(collection(db, path))

        const timestamp = new Date()
        const documentData = {
            ...data,
            createdAt: timestamp,
            updatedAt: timestamp,
        }

        await setDoc(docRef, documentData)

        return { ...documentData, id: docRef.id } as T
    } catch (error) {
        throw handleFirebaseError(error)
    }
}

export const getDocument = async <T>(
    collectionName: string,
    documentId: string
): Promise<T | null> => {
    try {
        const docRef = doc(db, collectionName, documentId)
        const docSnap = await getDoc(docRef)

        return snapshotToData<T>(docSnap)
    } catch (error) {
        throw handleFirebaseError(error)
    }
}

export const updateDocument = async <T>(
    collectionName: string,
    documentId: string,
    data: Partial<T>
): Promise<void> => {
    try {
        const docRef = doc(db, collectionName, documentId)

        await updateDoc(docRef, data as any)
    } catch (error) {
        throw handleFirebaseError(error)
    }
}

export const deleteDocument = async (
    collectionName: string,
    documentId: string
): Promise<void> => {
    try {
        const docRef = doc(db, collectionName, documentId)

        await deleteDoc(docRef)
    } catch (error) {
        throw handleFirebaseError(error)
    }
}

export const queryDocuments = async <T>(
    collectionName: string,
    constraints: QueryConstraint[]
): Promise<T[]> => {
    try {
        const collectionRef = collection(db, collectionName)
        const q = query(collectionRef, ...constraints)
        const querySnapshot = await getDocs(q)

        return querySnapshotToData<T>(querySnapshot)
    } catch (error) {
        throw handleFirebaseError(error)
    }
}

export const queryCollection = async <T>(
    collectionRef: FirestoreCollectionRef,
    options: FirebaseQueryOptions
): Promise<T[]> => {
    try {
        const path = createCollectionPath(collectionRef)
        const firestoreCollection = collection(db, path)
        const constraints = buildQueryConstraints(options)
        const q = query(firestoreCollection, ...constraints)
        const querySnapshot = await getDocs(q)

        return querySnapshotToData<T>(querySnapshot)
    } catch (error) {
        throw handleFirebaseError(error)
    }
}