export const PORT: number = parseInt(process.env.PORT || '', 10) || 3000
export const APP_SECRET: string = process.env.APP_SECRET || ''
export const MONGO_DATABASE_URL: string = process.env.MONGO_DATABASE_URL || ''
export const GRAPHQL_APIS = [
  {
    uri: 'https://backend.moneytrack.xyz'
  }
]
