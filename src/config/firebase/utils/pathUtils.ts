import { FirestoreCollectionRef } from '../types/firebaseTypes'

export const createCollectionPath = ({
    collection,
    document,
    subcollection
}: FirestoreCollectionRef): string => {
    let path = collection

    if (document) path += `/${document}`
    if (subcollection) path += `/${subcollection}`

    return path
}