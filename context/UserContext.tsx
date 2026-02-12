'use client'

import { CookieHelper } from '@/helper/cookie.helper';
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface UserContextType {
    user: string;
    setUser: (userType: string) => void;
    loading: boolean;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUserState] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const userTypeFromStorage = JSON.parse(CookieHelper.get({key: "user"}) || '{}').user_type;
        if (userTypeFromStorage) {
            setUserState(userTypeFromStorage);
        }
        setLoading(false);
    }, []);

    const setUser = (userType: string) => {
        setUserState(userType);
    };

    return (
        <UserContext.Provider value={{ user, setUser, loading }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => {
    const context = useContext(UserContext);
    if (context === undefined) {
        throw new Error('useUser must be used within a UserProvider');
    }
    return context;
};
