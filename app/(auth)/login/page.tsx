
import SigninForm from '@/components/auth/SignInForm'
import RedirectIfAuthenticated from '@/components/auth/RedirectIfAuthenticated'
import React from 'react'

const Login = () => {
  return (
    <RedirectIfAuthenticated>
      <div className='h-screen flex items-center justify-center max-w-[450px] mx-auto bg-gradient-to-b from-blue-50 to-blue-100 '>
        <SigninForm />
      </div>
    </RedirectIfAuthenticated>
  )
}

export default Login