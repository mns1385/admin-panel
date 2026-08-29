export interface VerificationSession {
    email: string
    codeHash: string
    expiresAt: number
    attempts: number
}

export const verificationStore = new Map<string, VerificationSession>()