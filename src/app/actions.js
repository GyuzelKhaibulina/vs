'use server'
 
import { cookies } from 'next/headers'
 
async function create(data) {
  cookies().delete('name')
}