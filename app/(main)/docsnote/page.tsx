"use client";
import DocsEditor from '@/components/DocsEditor'
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React from 'react'

const page = () => {
    const router = useRouter();

  const {status, data} = useSession();

    if (status != "authenticated" && status != "loading") {
        router.push("/sign-in");
    }
    return (
    <div>
      <DocsEditor/>
    </div>
  )
}

export default page
