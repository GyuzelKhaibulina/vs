import React from 'react'
import { options } from '../api/auth/[...nextauth]/options';
import { redirect } from 'next/navigation'
import { getServerSession } from 'next-auth';
import Meta from '../components/meta/page';

const Member = async() => {
    const session = await getServerSession(options);

    if (!session) {
        redirect ('/api/auth/signin?callbackUrl=/member')
    }
  return (
    <>
        <Meta robots="noindex"/> 
        <div>Member server session</div>
        <p>{session?.user?.email}</p>
        <p>{session?.user?.role}</p>
    </>
  )
}

export default Member
