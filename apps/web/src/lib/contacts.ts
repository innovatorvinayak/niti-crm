import { apiRequest } from "@/lib/api";

export const CONTACT_STATUSES = ["Lead", "Prospect", "Customer", "Inactive"] as const;

export type Contact = {
    id: string;
    organization_id: string;
    first_name: string;
    last_name: string;
    email: string | null;
    phone: string | null;
    company: string | null;
    status: string;
    owner_id: string | null;
    created_at: string;
    updated_at: string | null;
};

export type CreateContactInput = {
    firstName: string;
    lastName: string;
    email?: string;
    phone?: string;
    company?: string;
    status?: string;
    ownerId?: string;
};

export function normalizeContactStatus(status: string): string {
    const normalized = status.trim();
    if (!normalized) {
        return "Lead";
    }

    const matched = CONTACT_STATUSES.find((candidate) => candidate.toLowerCase() === normalized.toLowerCase());
    return matched ?? normalized;
}

export function getContactDisplayName(contact: Pick<Contact, "first_name" | "last_name" | "email">): string {
    const fullName = `${contact.first_name} ${contact.last_name}`.trim();
    if (fullName) {
        return fullName;
    }

    return contact.email ?? "Unknown Contact";
}

export async function fetchContacts(token: string): Promise<Contact[]> {
    return apiRequest<Contact[]>("/crm/contacts/", {
        method: "GET",
        token,
    });
}

export async function createContact(token: string, payload: CreateContactInput): Promise<Contact> {
    return apiRequest<Contact>("/crm/contacts/", {
        method: "POST",
        token,
        body: JSON.stringify({
            first_name: payload.firstName.trim(),
            last_name: payload.lastName.trim(),
            email: payload.email?.trim() || undefined,
            phone: payload.phone?.trim() || undefined,
            company: payload.company?.trim() || undefined,
            status: payload.status?.trim() || "Lead",
            owner_id: payload.ownerId ?? undefined,
        }),
    });
}
