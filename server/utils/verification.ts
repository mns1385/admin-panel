export interface VerificationSession {
    name: string
    password: string
    code: string
    timeOut: number
}

export const verificationStore = new Map<string, VerificationSession>()