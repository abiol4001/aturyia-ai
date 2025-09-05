import SignupForm from '@/components/auth/SignUpForm'
import RedirectIfAuthenticated from '@/components/auth/RedirectIfAuthenticated'
import React from 'react'

const SignUp = () => {
  return (
    <RedirectIfAuthenticated>
      <div className='min-h-screen flex items-center justify-center p-4 bg-gradient-to-b from-slate-50 to-slate-100'>
        <div className='w-full max-w-md mx-auto'>
          <SignupForm />
        </div>
      </div>
    </RedirectIfAuthenticated>
  )
}

export default SignUp