import { cookies } from 'next/headers';
import { Suspense } from 'react';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation'

const RedirectRecipes = () => {

  return (
    <>
    {redirect ('/recipes')}
    </>
  )
}

export default RedirectRecipes


