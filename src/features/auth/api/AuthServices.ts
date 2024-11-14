import { auth } from '@/config/firebase'
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
import { User } from '../types/AuthTypes'

const mapFirebaseUser = (firebaseUser: FirebaseUser): User => ({
    uid: firebaseUser.uid,
    email: firebaseUser.email,
    displayName: firebaseUser.displayName,
    photoURL: firebaseUser.photoURL,
})

export const authApi = {
    async login(email: string, password: string): Promise<User> {
        const { user } = await signInWithEmailAndPassword(auth, email, password)

        return mapFirebaseUser(user)
    },

    async register(email: string, password: string, displayName: string): Promise<User> {
        const { user } = await createUserWithEmailAndPassword(auth, email, password)

        await updateProfile(user, { displayName })

        return mapFirebaseUser(user)
    },

    async logout(): Promise<void> {
        await signOut(auth)
    },

    async resetPassword(email: string): Promise<void> {
        await sendPasswordResetEmail(auth, email)
    },

    async googleSignIn(): Promise<User> {
        const provider = new GoogleAuthProvider()
        const { user } = await signInWithPopup(auth, provider)

        return mapFirebaseUser(user)
    },

    getCurrentUser(): User | null {
        const user = auth.currentUser

        return user ? mapFirebaseUser(user) : null
    }
}