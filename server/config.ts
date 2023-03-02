import dotenv from 'dotenv'
dotenv.config();

const PORT: number = Number(process.env.PORT) || 8080
const BASE: string = process.env.BASE || '/'
const CLIENT_ID: string = process.env.CLIENT_ID || ''
const CLIENT_SECRET: string = process.env.CLIENT_SECRET || ''
const REDIRECT_URI: string = process.env.REDIRECT_URI || ''
const API_URL: string = process.env.API_URL || ''

export default {
    PORT,
    BASE,
    CLIENT_ID,
    CLIENT_SECRET,
    REDIRECT_URI,
    API_URL
}