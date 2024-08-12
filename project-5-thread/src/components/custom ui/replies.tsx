import { IThread } from '@/db/models/thread.model'
import React from 'react'

function ShowReplies({
  replies
}: {
  replies: IThread | undefined
}) {
  console.log(replies);
  
  return (
    <div>ShowReplies</div>
  )
}

export default ShowReplies