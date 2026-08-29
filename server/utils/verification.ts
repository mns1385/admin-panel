export interface VerificationSession {
    code: number
    timeOut: number
}

export const verificationStore = new Map<string, VerificationSession>()