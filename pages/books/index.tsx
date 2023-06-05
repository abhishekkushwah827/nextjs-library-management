import newRequest from '@/utils/apiCall';
import { getSession, useSession } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function BookListPage({ bookList }) {
    const router = useRouter();
    const { data: session, status } = useSession();
    const role = session?.user?.role;

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

    const sendIssueRequest = async (book) => {
        let data = { ...book, studentId: session.user.userId };
        const response = await newRequest.post("requests", data);
        alert("Issue Request sent..");
    };

    return (
        <div className="max-w-6xl mx-auto px-4 py-8 mb-32">
            <div className="flex justify-between mb-4">
                <h1 className="text-2xl font-bold">Book List</h1>
            </div>
            <table className="min-w-full bg-white">
                <thead>
                    <tr>
                        <th className="py-3 px-6 text-left">S.No</th>
                        <th className="py-3 px-6 text-left">Name</th>
                        <th className="py-3 px-6 text-left">Author</th>
                        <th className="py-3 px-6 text-center">Available</th>
                        <th className="py-3 px-6 text-center">Actions</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                    {bookList.map((book, i) => (
                        <tr key={book.id}>
                            <td className="py-4 px-6">{i + 1}</td>
                            <td>{book?.title}</td>
                            <td>{book?.author}</td>
                            <td className='text-center'>{book?.available}</td>
                            <td className="py-4 px-6 text-center">
                                {role != "user" && (
                                    <Link href={`/books/${book.id}`}>
                                        <span className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-1 px-3 rounded mr-2">
                                            Edit
                                        </span>
                                    </Link>
                                )}
                                {role == "user" && (
                                    <button
                                        className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-1 px-3 rounded mr-2"
                                        onClick={() => sendIssueRequest(book)}
                                    >
                                        Issue
                                    </button>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}


export async function getStaticProps() {
    console.log('Generating / Regenerating bookList')
    const response = await newRequest.get("books");
    console.log(response.data);

    return {
        props: {
            bookList: response.data
        },
        revalidate: 1,
    }
}