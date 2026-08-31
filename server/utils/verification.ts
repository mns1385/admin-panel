export interface VerificationSession {
    username: string
    password: string
    code: string
    timeOut: number
}

export const verificationStore = new Map<string, VerificationSession>()