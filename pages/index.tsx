import { getSession, useSession } from 'next-auth/react';
import { Inter } from 'next/font/google'
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const router = useRouter();
  const { data: session } = useSession();
  const user = session?.user;

  useEffect(() => {
    const securePage = async () => {
      const session = await getSession()
      console.log({ session })
      if (!session) {
        router.push("/login");
      } 
    }

    securePage()
  }, [router])

  return (
    <main  className="min-h-screen">
      <h1>Home Page</h1>
      <h2>You are logged in as {user?.email} </h2>
      <h2>{JSON.stringify(user)} </h2>
    </main>
  )
}
