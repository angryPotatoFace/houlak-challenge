import dotenv from 'dotenv'
dotenv.config();

const PORT: number = Number(process.env.PORT) || 8080
const BASE: string = process.env.BASE || '/'
const CLIENT_ID: string = process.env.CLIENT_ID || ''
const CLIENT_SECRET: string = process.env.CLIENT_SECRET || ''
const REDIRECT_URI: string = process.env.REDIRECT_URI || ''
const API_URL: string = process.env.API_URL || ''
const DATA_BASE: string = process.env.DATA_BASE || ''
const DB_HOST: string =  process.env.DB_URL || ''
const DB_NAME: string = process.env.DB_NAME || ''
const DB_USER: string = process.env.DB_USER || ''
const DB_PASS: string = process.env.DB_PASS || '' 

export default {
    PORT,
    BASE,
    CLIENT_ID,
    CLIENT_SECRET,
    REDIRECT_URI,
    API_URL,
    DATA_BASE,
    DB_HOST,
    DB_NAME,
    DB_USER,
    DB_PASS
}