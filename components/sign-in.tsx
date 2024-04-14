"use client"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/signinButton"
import Link from "next/link"
import { signup } from "@/actions/user";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { signIn } from "next-auth/react";

export function SignIn() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const loginWithGoogle = async () => await signIn("google", { callbackUrl: 'http://localhost:3000/' });

  return (
    <div className="flex items-center min-h-[600px] py-12 flex-col space-y-4">
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-bold">Sign in to your account</h1>
        <p className="text-gray-500 dark:text-gray-400">Enter your email below to login to your account</p>
      </div>
      <div className="w-full max-w-sm space-y-4 border border-gray-200  rounded-lg p-6 dark:border-gray-800">
        <div className="space-y-2">
          <Label htmlFor="username">Username</Label>
          <Input id="username" placeholder="Username" required onChange={(e) => setUsername(e.target.value)}/>
        </div>
        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input id="password" placeholder="Password" required type="password" onChange={(e) => setPassword(e.target.value)}/>
        </div>
        <Button className="w-full transition-transform transform hover:scale-105" type="submit" onClick={async () => {
          const res = await signup(username, password);
          localStorage.setItem("user", JSON.stringify(res));
          console.log(res);
          router.push("/");
        }}>
          Sign in
        </Button>
        <div className="relative">
          <Button className="w-full transition-transform transform hover:scale-105" variant="outline" onClick={loginWithGoogle}>
            Sign in with Google
          </Button>
        </div>
      </div>
      <Link className="text-sm underline hover:text-blue-500 dark:hover:text-blue-400" href="#">
        Forgot your password?
      </Link>
    </div>
  )
}
