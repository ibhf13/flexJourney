import { COLLECTIONS } from './collections'

export type CollectionName = typeof COLLECTIONS
export type SubCollectionName = typeof COLLECTIONS.USERS.SUB_COLLECTIONS

export interface BaseDocument {
    id: string
    createdAt: Date
    updatedAt: Date
}

export interface WithUserId {
    userId: string
}

export type FirestoreCollectionRef = {
    collection: string
    document?: string
    subcollection?: string
}

export type FirebaseTimestamp = {
    seconds: number
    nanoseconds: number
}

export type FirebaseDocument<T> = T & {
    id: string
    createdAt: FirebaseTimestamp
    updatedAt: FirebaseTimestamp
}

export type FirebaseQueryOptions = {
    limit?: number
    orderBy?: {
        field: string
        direction: 'asc' | 'desc'
    }
    where?: Array<{
        field: string
        operator: FirebaseOperator
        value: any
    }>
}

export type FirebaseOperator =
    | '<'
    | '<='
    | '=='
    | '!='
    | '>='
    | '>'
    | 'array-contains'
    | 'array-contains-any'
    | 'in'
    | 'not-in'