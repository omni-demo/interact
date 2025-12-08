import React, { createContext, useContext, useState, ReactNode } from "react";
import { UserRole } from "@/components/RoleSelector";

interface UserContextType {
    currentRole: UserRole;
    setCurrentRole: (role: UserRole) => void;
    currentUser: {
        name: string;
        avatar: string;
        tenantId: string;
        tenantName: string;
    };
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
    const [currentRole, setCurrentRole] = useState<UserRole>("project-owner");

    const currentUser = {
        name: "John Miller",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=John",
        tenantId: "bbdo",
        tenantName: "BBDO (and its network including AMV BBDO, adam&eveDDB)",
    };

    return (
        <UserContext.Provider value={{ currentRole, setCurrentRole, currentUser }}>
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
