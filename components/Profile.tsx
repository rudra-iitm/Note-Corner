"use client";
import React from 'react';
import Image from 'next/image';
import { Edit, Facebook, Instagram, Twitter } from 'lucide-react';
import { Button } from './ui/button';
import { signOut } from 'next-auth/react';

export default function Profile() {
    
    const handleLogout=()=>{   
        
        console.log("logging out");
        signOut({
          redirect: true,
          callbackUrl:`${window.location.origin}/sign-in`
        })
    }
  return (
    <div className="h-lvh w-lvw flex flex-col items-center justify-center bg-zinc-600 -z-10 ">
        <Button className="bg-zinc-800 dark:bg-slate-200 text-white fixed top-5 right-5 z-20" onClick={()=>{handleLogout();}}>Sign Out</Button>
      <div className="py-5 h-100">
        <div className="justify-content-center align-items-center h-100 flex flex-row">
          <div  className="mb-4 flex flex-col">
            <div className="mb-3" style={{ borderRadius: '.5rem' }}>
              <div className="flex flex-row">
                <div className="gradient-custom text-center text-white flex flex-col"
                  style={{ borderTopLeftRadius: '.5rem', borderBottomLeftRadius: '.5rem' }}>
                  {/* <Image src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava1-bg.webp"
                    alt="Avatar" className="my-5" style={{ width: '80px' }} /> */}
                  <h5>Marie Horwitz</h5>
                  <h2>Web Designer</h2>
                  <Edit/>
                </div>
                <div className='flex flex-col'>
                  <div className="p-4">
                    <h6>Information</h6>
                    <hr className="mt-0 mb-4" />
                    <div className="pt-1 flex flex-row">
                      <div className="mb-3 flex flex-col">
                        <h6>Email</h6>
                        <div className="text-muted">info@example.com</div>
                      </div>
                      <div className="mb-3 flex flex-col">
                        <h6>Phone</h6>
                        <div className="text-muted">123 456 789</div>
                      </div>
                    </div>

                    <h6>Information</h6>
                    <hr className="mt-0 mb-4" />
                    <div className="pt-1 flex flex-row">
                      <div className="mb-3 flex flex-col">
                        <div >Email</div>
                        <div className="text-muted">info@example.com</div>
                      </div>
                      <div className="mb-3 flex flex-col">
                        <h6 >Phone</h6>
                        <div className="text-muted">123 456 789</div>
                      </div>
                    </div>

                    <div className="d-flex justify-content-start flex flex-row">
                      <a href="#!"><Facebook size="20" /></a>
                      <a href="#!"><Twitter size="20" /></a>
                      <a href="#!"><Instagram size="20" /></a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}