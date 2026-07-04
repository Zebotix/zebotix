'use server'

import fs from 'fs/promises'
import path from 'path'

import sharp from 'sharp'

export async function uploadImageAction(formData: FormData) {
  const file = formData.get('file') as File
  if (!file) return { success: false, error: 'No file provided' }

  try {
    const arrayBuffer = await file.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)
    
    // Create unique filename using timestamp and random string
    const uniqueId = Date.now() + '-' + Math.round(Math.random() * 1e9)
    const filename = `${uniqueId}.webp`
    const uploadDir = path.join(process.cwd(), 'public', 'uploads')
    
    // Ensure dir exists
    await fs.mkdir(uploadDir, { recursive: true })
    
    const filepath = path.join(uploadDir, filename)
    
    // Convert to webp and save
    await sharp(buffer)
      .webp({ quality: 80 })
      .toFile(filepath)
      
    return { success: true, url: `/uploads/${filename}` }
  } catch (error) {
    console.error('Upload error:', error)
    return { success: false, error: 'Failed to optimize and upload image' }
  }
}
