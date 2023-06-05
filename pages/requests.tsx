import newRequest from '@/utils/apiCall';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { approveBookService } from "../services/Services";
import { useEffect } from 'react';
import { getSession } from 'next-auth/react';

export default function RequestsListPage({ requestsList }) {
    const router = useRouter();
    
    useEffect(() => {
        const securePage = async () => {
          const session = await getSession()
          console.log({ session })
          if (!session) {
            router.push("/login");
          } else if(session?.user.role == "user") {
            router.push("/login");
          }
        }
    
        securePage()
      }, [])

    const refreshData = () => {
        router.replace(router.asPath);
    }

    const approveHandler = async (data) => {
        let res = await approveBookService(data);
           refreshData();
    };
    const rejectHandler = async (data) => {
        const response = await newRequest.delete(`requests/${data.id}`);
        alert("success");
        refreshData();
    };

    return (
        <div className="max-w-6xl mx-auto px-4 py-8 mb-32">
            <div className="flex justify-between mb-4">
                <h1 className="text-2xl font-bold">Requests </h1>
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
                    {requestsList.map((book, i) => (
                        <tr key={book.id}>
                            <td className="py-4 px-6">{i + 1}</td>
                            <td>{book?.title}</td>
                            <td>{book?.author}</td>
                            <td className='text-center'>{book?.available}</td>
                            <td className="py-4 px-6 text-center">
                                <button
                                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-3 rounded mr-2"
                                    onClick={() => approveHandler(book)}
                                >
                                    Approve
                                </button>
                                <button
                                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 rounded mr-2"
                                    onClick={() => rejectHandler(book)}
                                >
                                    Reject
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
    console.log('Generating / Regenerating requests List')
    const response = await newRequest.get("requests");

    return {
        props: {
            requestsList: response.data
        },
        revalidate: 1,
    }
}