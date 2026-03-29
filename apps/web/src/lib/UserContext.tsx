"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { apiRequest, isApiError } from "@/lib/api";
import { getStoredToken, clearAuthSession, getStoredOrganization } from "@/lib/auth-storage";
import { useRouter } from "next/navigation";

export type UserProfile = {
    id: string;
    name: string;
    email: string;
    role: string;
    team_id?: string;
};

type UserContextType = {
    user: UserProfile | null;
    organizationName: string;
    isLoading: boolean;
    isAuthenticated: boolean;
    refreshUser: () => Promise<void>;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const [user, setUser] = useState<UserProfile | null>(null);
    const [organizationName, setOrganizationName] = useState("My Organization");
    const [isLoading, setIsLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const refreshUser = async () => {
        const token = getStoredToken();
        const storedOrganization = getStoredOrganization();

        if (!token) {
            setUser(null);
            setIsAuthenticated(false);
            setIsLoading(false);
            return;
        }

        try {
            const currentUser = await apiRequest<UserProfile>("/auth/me", {
                method: "GET",
                token,
            });

            setUser(currentUser);
            setIsAuthenticated(true);
            setOrganizationName(storedOrganization?.name ?? "My Organization");
        } catch (error) {
            if (isApiError(error) && [401, 403].includes(error.status)) {
                clearAuthSession();
                setUser(null);
                setIsAuthenticated(false);
            }
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        void refreshUser();
    }, []);

    return (
        <UserContext.Provider value={{ user, organizationName, isLoading, isAuthenticated, refreshUser }}>
            {children}
        </UserContext.Provider>
    );
}

export function useUser() {
    const context = useContext(UserContext);
    if (context === undefined) {
        throw new Error("useUser must be used within a UserProvider");
    }
    return context;
}
