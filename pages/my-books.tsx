import newRequest from '@/utils/apiCall';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { approveBookService } from "../services/Services";
import { useEffect } from 'react';
import { getSession } from 'next-auth/react';

export default function MyBooksPage({ myBooks }) {
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
          } else if(session?.user.role != "user") {
            router.push("/login");
          }
        }
    
        securePage()
      }, [])

    return (
        <div className="max-w-6xl mx-auto px-4 py-8 mb-32">
            <div className="flex justify-between mb-4">
                <h1 className="text-2xl font-bold">My Books</h1>
            </div>
            <table className="min-w-full bg-white">
                <thead>
                    <tr>
                        <th className="py-3 px-6 text-left">S.No</th>
                        <th className="py-3 px-6 text-left">Name</th>
                        <th className="py-3 px-6 text-left">Author</th>
                     </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                    {myBooks.map((book, i) => (
                        <tr key={book.id}>
                            <td className="py-4 px-6">{i + 1}</td>
                            <td>{book?.title}</td>
                            <td>{book?.author}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}


export async function getStaticProps() {
    console.log('Generating / Regenerating requests List')
    // const response = await newRequest.get(" `users/${currentUser.id}`");
    const response = await newRequest.get("users/3");

    return {
        props: {
            myBooks: response.data.issuedBooks
        },
        revalidate: 1,
    }
}