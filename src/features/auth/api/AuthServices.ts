import { auth, db } from '@/config/firebase'
import { COLLECTIONS } from '@/config/firebase/collections'
import {
    createUserWithEmailAndPassword,
    User as FirebaseUser,
    GoogleAuthProvider,
    sendPasswordResetEmail,
    signInWithEmailAndPassword,
    signInWithPopup,
    signOut,
    updateProfile
} from 'firebase/auth'
import { doc, serverTimestamp, setDoc } from 'firebase/firestore'
import { User } from '../types/AuthTypes'

const mapFirebaseUser = (firebaseUser: FirebaseUser): User => ({
    uid: firebaseUser.uid,
    email: firebaseUser.email,
    displayName: firebaseUser.displayName,
    photoURL: firebaseUser.photoURL,
    provider: firebaseUser.providerData[0]?.providerId || 'email',
})

const createUserDocument = async (user: User) => {
    const userRef = doc(db, COLLECTIONS.USERS.COLLECTION, user.uid)

    await setDoc(userRef, {
        ...user,
        createdAt: serverTimestamp(),
        lastLoginAt: serverTimestamp(),
    }, { merge: true })
}

export const authApi = {
    async login(email: string, password: string): Promise<User> {
        const { user } = await signInWithEmailAndPassword(auth, email, password)
        const userRef = doc(db, COLLECTIONS.USERS.COLLECTION, user.uid)

        await setDoc(userRef, {
            lastLoginAt: serverTimestamp(),
        }, { merge: true })

        return mapFirebaseUser(user)
    },

    async register(email: string, password: string, displayName: string): Promise<User> {
        const { user } = await createUserWithEmailAndPassword(auth, email, password)

        await updateProfile(user, { displayName })

        const mappedUser = mapFirebaseUser(user)

        await createUserDocument(mappedUser)

        return mappedUser
    },

    async logout(): Promise<void> {
        await signOut(auth)
    },

    async resetPassword(email: string): Promise<void> {
        await sendPasswordResetEmail(auth, email)
    },

    async googleSignIn(): Promise<User> {
        const provider = new GoogleAuthProvider()

        provider.addScope('profile')
        provider.addScope('email')

        const { user } = await signInWithPopup(auth, provider)
        const mappedUser = mapFirebaseUser(user)

        await createUserDocument(mappedUser)

        return mappedUser
    },

    getCurrentUser(): User | null {
        const user = auth.currentUser

        return user ? mapFirebaseUser(user) : null
    }
}