import { supabase } from '../supabase/client'

export async function uploadImage(
  bucket: 'avatars' | 'mod-images',
  path: string,
  file: File
) {
  const { error } = await supabase.storage
    .from(bucket)
    .upload(path, file, { upsert: true })

  if (error) throw error

  return supabase.storage.from(bucket).getPublicUrl(path).data.publicUrl
}

