import newRequest from '@/utils/apiCall';
import { getSession, signIn } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function UserListPage({ userList }) {
  const router = useRouter();
  const refreshData = () => {
    router.replace(router.asPath);
  }

  useEffect(() => {
    const securePage = async () => {
      const session = await getSession()
      console.log({ session })
      if (!session) {
        router.push("/login");
      } else if (session?.user.role != "admin") {
        router.push("/login");
      }
    }

    securePage()
  }, [router])

  const handleDelete = async (userId) => {
    const response = await newRequest.delete(`users/${userId}`);
    refreshData();
  };
  const toggleBlock = async (userId, user) => {
    const response = await newRequest.put(`users/${userId}`, {
      ...user,
      isBlocked: !user.isBlocked,
    });
    refreshData();
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex justify-between mb-4">
        <h1 className="text-2xl font-bold">User List</h1>
        <Link href="/users/add-user">
          <span className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Add New User
          </span>
        </Link>
      </div>
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-3 px-6 text-left">S.No</th>
            <th className="py-3 px-6 text-left">Name</th>
            <th className="py-3 px-6 text-left">Email</th>
            <th className="py-3 px-6 text-center">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {userList.map((user, i) => (
            <tr key={user.id}>
              <td className="py-4 px-6">{i + 1}</td>
              <td className="py-4 px-6">{user.name}</td>
              <td className="py-4 px-6">{user.email}</td>
              <td className="py-4 px-6 text-center">
                <Link href={`/users/${user.id}`}>
                  <span className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-1 px-3 rounded mr-2">
                    Edit
                  </span>
                </Link>
                <button
                  className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-1 px-3 rounded mr-2"
                  onClick={() => toggleBlock(user.id, user)}
                >
                  {user.isBlocked ? "Unblock" : "Block"}
                </button>
                <button
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 rounded"
                  onClick={() => handleDelete(user.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}


export async function getStaticProps() {
  console.log('Generating / Regenerating userList')
  const response = await newRequest.get("users?role=user");
  console.log(response.data);

  return {
    props: {
      userList: response.data
    },
    revalidate: 1,
  }
}