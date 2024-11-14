import { limit, orderBy, QueryConstraint, where } from 'firebase/firestore'
import { FirebaseQueryOptions } from '../types/firebaseTypes'

export const buildQueryConstraints = (options: FirebaseQueryOptions): QueryConstraint[] => {
    const constraints: QueryConstraint[] = []

    if (options.where) {
        options.where.forEach(({ field, operator, value }) => {
            constraints.push(where(field, operator, value))
        })
    }

    if (options.orderBy) {
        constraints.push(orderBy(options.orderBy.field, options.orderBy.direction))
    }

    if (options.limit) {
        constraints.push(limit(options.limit))
    }

    return constraints
}