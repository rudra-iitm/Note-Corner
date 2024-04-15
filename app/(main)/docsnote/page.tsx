"use client";
import { useRouter } from 'next/navigation';

import { motion, useScroll, useTransform } from "framer-motion";
import React, { useEffect } from 'react'
import { Toaster } from '@/components/ui/toaster';
import CodeEditor from '@/components/CodeEditor'; 
import RichTextEditor from '@/components/RichTextEditor';
import { Input } from '@/components/ui/input'; 
import { CodeSquare, GripVertical, NotepadTextDashedIcon, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import axios from "axios";
import { useSession } from "next-auth/react";
import client from '@/db'
import { useToast } from '@/components/ui/use-toast';
import DocsEditor from '@/components/DocsEditor';



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
