export interface EmailChangeSession {
    userId : string,
    newEmail: string,
    code: string,
    timeOut: number
}

export const emailChangeStore = new Map<string, EmailChangeSession>()