'use server';
import { revalidatePath, revalidateTag } from 'next/cache';

export default async function pathurl(url: string) {
  revalidatePath(url);
  // revalidateTag('scenarioList');
}
