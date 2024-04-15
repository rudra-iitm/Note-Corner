"use client"
import {
  IconBrandGoogle,
} from "@tabler/icons-react";
import React from "react";
import { Label } from "./ACui/label";
import { Input } from "./ACui/input";
import { Toaster } from "./ui/toaster";
import { cn } from "@/utils/cn";
import { signup } from "@/actions/user";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { useToast } from "./ui/use-toast";

export function SignUp() {
  const router = useRouter();
  const [email, setEmail] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");
  const [confirmPassword, setConfirmPassword] = React.useState<string>("");
  const { toast } = useToast();
  const handleSubmit =async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    toast({
      title: "Creating Account,Please Wait...",
    })
    if(password!==confirmPassword){
      toast({
        title: "Password and Confirm Password doesn't match.",
        variant: "destructive",
      })
      return;}
      try {
        const res=await signup(email, password);
        console.log(res);
        // if(res && res.error){
        //   toast({
        //     title: "Sign in failed!",
        //     variant: "destructive",
        //   })
  
      } catch (err) {
        console.log(err);
        toast({
          title: "Sign Up failed! Probably account already exists. Please sign in.",
          variant: "destructive",
        })
        return ;
      }
      toast({
        title: "Sign Up successful!",
      })
      router.push('/sign-in');
      // toast({
      //   title: "Please verify captcha",
      //   variant: "destructive",
      // })
      // const toastId = toast.loading(
        //   "Verifying User, Please Wait...",
        // );
        // await signup(email, password);
        // const data={'email':email,'password':password};
        
    console.log("Form submitted");
  };
  return (
    <div className="h-screen min-h-[40rem] w-full overflow-x-hidden dark:bg-black flex flex-col justify-center items-center mx-auto my-auto">
    <div className="flex flex-col items-center">
      <div className="h-4"></div>
    <div className="max-w-md w-screen mx-auto rounded-none md:rounded-md p-4 md:p-8 shadow-input dark:bg-zinc-900 border">
      <h2 className="font-bold text-xl dark:text-neutral-200 text-center">
        Welcome to Note Corner
      </h2>
      <p className="max-w-sm mt-2 dark:text-neutral-300 text-center">
        Create Your Account
      </p>
      <form className="my-4" onSubmit={handleSubmit}>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="email" className="dark:text-white">Email</Label>
          <Input 
          id="email" 
          placeholder="email@gmail.com" 
          type="email" 
          className="rounded-md"
          required
          onChange={(e) => setEmail(e.target.value)}
          />
        </LabelInputContainer>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="password" className="dark:text-white">Password</Label>
          <Input 
          id="password" 
          placeholder="••••••••" 
          type="password" 
          className="rounded-md"
          required
          onChange={(e) => setPassword(e.target.value)}
          />
        </LabelInputContainer>
        <LabelInputContainer className="mb-8">
          <Label htmlFor="confirmpassword" className="dark:text-white">Confirm password</Label>
          <Input
            id="confirm-password"
            placeholder="••••••••"
            type="password"
            className="rounded-md"
            required
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </LabelInputContainer>

        <button
          className="bg-gradient-to-br relative group/btn from-blue-500 dark:from-zinc-900 dark:to-zinc-900 to-blue-600 block dark:bg-zinc-800 w-full text-white h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset] rounded-md disabled:opacity-50"
          type="submit"
        >
          Sign up &rarr;
          <BottomGradient />
        </button>
      </form>
      <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent mt-5 h-[1px] w-full" />
      <div className="w-full justify-center items-center flex flex-row">
        <div className="pr-4 items-center pt-4 font-mono dark:text-zinc-200 text-lg">New User </div>
        <button
          className="relative w-2/5 group/btn bg-blue-700 text-white h-8 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset] rounded-md mt-4"
          type="submit"
          onClick={()=>{router.push("/sign-in")}}
        >
          Login &rarr;
          <BottomGradient />
        </button>
      </div>
    <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-5 h-[1px] w-full" />
 <div className="flex flex-col space-y-4">
    <button
      className=" relative group/btn flex space-x-2 items-center justify-start px-4 w-full text-black rounded-md h-10 font-medium shadow-input bg-gray-50 dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_var(--neutral-800)]"
      onClick={() => {
        signIn('google', { callbackUrl: '/' });
      }}
    >
    <IconBrandGoogle className="h-4 w-4 text-neutral-800 dark:text-neutral-300" />
    <span className="text-neutral-700 dark:text-neutral-300 text-sm">
      Google
    </span>
    <BottomGradient />
    </button>
    </div>
    </div>
  <Toaster/>
  </div>
  </div>
  );
}

const BottomGradient = () => {
  return (
    <>
      <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
      <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
    </>
  );
};

const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("flex flex-col space-y-2 w-full", className)}>
      {children}
    </div>
  );
};
