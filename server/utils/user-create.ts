export interface UserCreateSession {
    email: string,
    name: string,
    password: string,
    role: string,
    code: string,
    timeOut: number
}

export const userCreateStore = new Map<string, UserCreateSession>()