export const PORT: Number = parseInt(<string>process.env.PORT, 10) || 3000
export const APP_SECRET: string = process.env.APP_SECRET || ''
export const MONGO_DATABASE_URL: string = process.env.MONGO_DATABASE_URL || ''
