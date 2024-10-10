"use client";

import { trpc } from "@/trpc/client";

function Users() {

  const { data: users, isPending } = trpc.user.userList.useQuery();
  console.log("🚀 ~ file: Users.tsx:8 ~ Users ~ users:", users)


  if (isPending) return <div>Loading...</div>;

  return (
    <div>
      {users && (
        <div>
          <h2>Users</h2>
          <ul>
            {users.json.map((user, i) => (
              <li key={i}>{user.name}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Users;
