import React, { useContext, useState, useEffect } from 'react';
import { auth, firestore } from '../firebase';

const AuthContext = React.createContext();

export function useAuth() {
    return useContext(AuthContext);
}

export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState();
    const [currentUserInfo, setCurrentUserInfo] = useState();
    const [loading, setLoading] = useState(true);

    function signup(username, email, password) {
        const collectionRef = firestore.collection('users');
        const createdAt = new Date().getTime();
            collectionRef.add({ username, email, createdAt });
            
        return auth.createUserWithEmailAndPassword(email, password);
    }

    function login(email, password) {
        return auth.signInWithEmailAndPassword(email, password);
    }

    function logout() {
        return auth.signOut();
    }

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            setCurrentUser(user);
            getUsername(user);
            setLoading(false);
        });

        return unsubscribe;
    }, []);

    function getUsername(user) {
        const email = user.email ;

        firestore.collection("users").where("email", '==', email).limit(1)
            .onSnapshot((snap) => {
                let document = {};
                snap.forEach(doc => {
                    document = { ...doc.data(), id: doc.id };
                });                    
                setCurrentUserInfo(document);
            });
    }
    
    const value = {
        currentUser,
        currentUserInfo,
        signup,
        login,
        logout
    }

    return (
        <AuthContext.Provider value={value}>
            { !loading && children }
        </AuthContext.Provider>
    )
}
