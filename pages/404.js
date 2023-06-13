// import { useSession } from "next-auth/react";
import { useSession } from "next-auth/react";
import Link from "next/link";

export default function NotFound() {
  const { data: session } = useSession();
  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center bg-gray-800 text-gray-100">
      <h1 className="flex flex-col text-center text-4xl ">
        <span className="text-9xl">404</span>Page is not found
      </h1>
      <p className="mt-4">
        Go to{" "}
        {session ? (
          <Link className="text-blue-300 underline" href="/">
            Home Page
          </Link>
        ) : (
          <Link className="text-blue-300 underline" href="/login">
            Login Page
          </Link>
        )}
      </p>
    </div>
  );
}
