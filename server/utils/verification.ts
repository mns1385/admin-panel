export interface VerificationSession {
    username: string
    password: string
    code: number
    timeOut: number
}

export const verificationStore = new Map<string, VerificationSession>()