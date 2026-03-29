export type StoredOrganization = {
    id: string;
    name: string;
    slug: string;
};

const TOKEN_KEY = "token";
const ORGANIZATION_KEY = "organization";

function hasStorage(): boolean {
    return typeof window !== "undefined" && typeof window.localStorage !== "undefined";
}

export function getStoredToken(): string | null {
    if (!hasStorage()) {
        return null;
    }

    return window.localStorage.getItem(TOKEN_KEY);
}

export function getStoredOrganization(): StoredOrganization | null {
    if (!hasStorage()) {
        return null;
    }

    const rawOrganization = window.localStorage.getItem(ORGANIZATION_KEY);
    if (!rawOrganization) {
        return null;
    }

    try {
        const organization = JSON.parse(rawOrganization) as StoredOrganization;
        if (!organization?.id || !organization?.name || !organization?.slug) {
            return null;
        }

        return organization;
    } catch {
        return null;
    }
}

export function saveAuthSession(token: string, organization: StoredOrganization | null): void {
    if (!hasStorage()) {
        return;
    }

    window.localStorage.setItem(TOKEN_KEY, token);
    if (organization) {
        window.localStorage.setItem(ORGANIZATION_KEY, JSON.stringify(organization));
    } else {
        window.localStorage.removeItem(ORGANIZATION_KEY);
    }
}

export function clearAuthSession(): void {
    if (!hasStorage()) {
        return;
    }

    window.localStorage.removeItem(TOKEN_KEY);
    window.localStorage.removeItem(ORGANIZATION_KEY);
}

