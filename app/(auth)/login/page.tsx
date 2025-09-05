
import SigninForm from '@/components/auth/SignInForm'
import RedirectIfAuthenticated from '@/components/auth/RedirectIfAuthenticated'
import React from 'react'

const Login = () => {
  return (
    <RedirectIfAuthenticated>
      <div className='min-h-screen flex items-center justify-center p-4 bg-gradient-to-b from-blue-50 to-blue-100'>
        <div className='w-full max-w-md mx-auto'>
          <SigninForm />
        </div>
      </div>
    </RedirectIfAuthenticated>
  )
}

export default Login