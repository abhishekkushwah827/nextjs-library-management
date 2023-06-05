import Link from 'next/link';
import { signIn, signOut, useSession } from 'next-auth/react'

export default function Navbar() {
    const { data: session, status } = useSession();
    const role = session?.user.role;


    return (
        <nav className="bg-gray-800">
            <div className="max-w-6xl mx-auto px-4">
                <div className="flex w-full justify-between">
                    {/* Logo */}
                    <div>
                        <Link href="/">
                            <span className="flex items-center py-5 px-2 text-gray-300 hover:text-white">
                                <h1 className="font-bold">Library Management</h1>
                            </span>
                        </Link>
                    </div>

                    {/* Navigation links */}
                    <div className="flex items-center space-x-1">
                        {status === "authenticated" && (
                            <>
                                <Link href="/books">
                                    <span className="py-5 px-3 text-gray-300 hover:text-white">Books</span>
                                </Link>
                                {role == "admin" && (
                                    <Link href="/users">
                                        <span className="py-5 px-3 text-gray-300 hover:text-white">Users</span>
                                    </Link>
                                )}
                                {role != "user" && (
                                    <Link href="/requests">
                                        <span className="py-5 px-3 text-gray-300 hover:text-white">Requests</span>
                                    </Link>
                                )}
                                {role == "user" && (
                                    <Link href="/my-books">
                                        <span className="py-5 px-3 text-gray-300 hover:text-white">My Books</span>
                                    </Link>
                                )}

                                <Link href="/signout">
                                    <span className="py-5 px-3 text-gray-300 hover:text-white" onClick={() => signOut()}>Log Out</span>
                                </Link>
                            </>)}
                        {status != "authenticated" && (
                            <Link href="/login">
                                <span className="py-5 px-3 text-gray-300 hover:text-white">LogIn</span>
                            </Link>
                        )}
                    </div>
                </div>

            </div>
        </nav>
    );
}