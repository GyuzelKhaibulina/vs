import React from 'react';
import { useSession } from 'next-auth/react';
import { options } from '../api/auth/[...nextauth]/options';
import { redirect } from 'next/navigation'
import Meta from '../components/meta/page';

const ClientMember = async() => {
    const {data: session} = useSession ({
        required: true,
        onUnauthenticated () {
            redirect ('api/auth/signin?callbackUrl=/client_member')
        }
    })
  return (
    <>
        <Meta robots="noindex"/> 
        <div>Client Member session</div>
        <p>{session?.user?.email}</p>
        <p>{session?.user?.role}</p>
    </>
  )
}

export default ClientMember
