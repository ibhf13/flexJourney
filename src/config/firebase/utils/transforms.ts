import { DocumentSnapshot, QuerySnapshot, Timestamp } from 'firebase/firestore'

export const snapshotToData = <T>(
    snapshot: DocumentSnapshot
): T | null => {
    const data = snapshot.data()

    return data ? { ...data, id: snapshot.id } as T : null
}

export const querySnapshotToData = <T>(
    querySnapshot: QuerySnapshot
): T[] => {
    return querySnapshot.docs.map(
        (doc) => ({ ...doc.data(), id: doc.id } as T)
    )
}

export const timestampToDate = (
    timestamp: Timestamp
): Date => {
    return timestamp.toDate()
}

export const dateToTimestamp = (
    date: Date
): Timestamp => {
    return Timestamp.fromDate(date)
}
