'use server';

import prisma from '@/lib/db/prisma';

export async function getSiteSettingAction(key: string) {
  try {
    const setting = await prisma.siteSetting.findUnique({
      where: { key },
    });
    if (!setting) {
      return { success: false, error: 'Setting not found' };
    }
    return { success: true, data: setting.value };
  } catch (error) {
    console.error(`Error fetching site setting ${key}:`, error);
    return { success: false, error: 'Failed to fetch site setting' };
  }
}
