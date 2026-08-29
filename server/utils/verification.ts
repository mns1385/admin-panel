export interface VerificationSession {
    email: string
    codeHash: string
    expiresAt: number
}

export const verificationStore = new Map<string, VerificationSession>()