import { useEffect, useState } from 'react'
import { supabase } from '../supabase/client'
import { useAuth } from '../supabase/auth'

export default function Comments({ modId }: any) {
  const { user } = useAuth()
  const [comments, setComments] = useState<any[]>([])
  const [text, setText] = useState('')

  useEffect(() => {
    supabase.from('comments')
      .select('*, profiles(username)')
      .eq('mod_id', modId)
      .then(({ data }) => setComments(data || []))
  }, [modId])

  async function post() {
    await supabase.from('comments').insert({
      mod_id: modId,
      user_id: user.id,
      content: text
    })
    setText('')
  }

  return (
    <>
      {comments.map(c => (
        <div key={c.id}>
          <b>{c.profiles.username}</b>: {c.content}
        </div>
      ))}
      {user && (
        <>
          <textarea value={text} onChange={e => setText(e.target.value)} />
          <button onClick={post}>Comment</button>
        </>
      )}
    </>
  )
}

