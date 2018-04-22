export interface Account {
    id?: string
    username?: string
    email?: string
    firstName?: string
    lastName?: string
    enabled?: boolean
    emailVerified?: boolean
    totp?: boolean
    createdTimestamp?: number
    picture?: string
    website?: string
    gender?: string
    locale?: string
    phoneNumber?: string
    phoneNumberVerified?: boolean
    updatedAt?: number
    profile?: string
    authorities?: string[]
}
