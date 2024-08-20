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