import { COLLECTIONS } from '../types/collections'
import { FirestoreCollectionRef } from '../types/firebaseTypes'

export const getUserCollection = (
  userId: string,
  subcollection: keyof typeof COLLECTIONS.USERS.SUB_COLLECTIONS
): FirestoreCollectionRef => ({
  collection: COLLECTIONS.USERS.COLLECTION,
  document: userId,
  subcollection
})

export const getGlobalCollection = (
  collection: keyof typeof COLLECTIONS.GLOBAL
): FirestoreCollectionRef => ({
  collection: COLLECTIONS.GLOBAL[collection]
}) 