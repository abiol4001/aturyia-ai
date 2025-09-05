import SignupForm from '@/components/auth/SignUpForm'
import RedirectIfAuthenticated from '@/components/auth/RedirectIfAuthenticated'
import React from 'react'

const SignUp = () => {
  return (
    <RedirectIfAuthenticated>
      <div className='h-screen flex items-center justify-center'>
        <SignupForm />
      </div>
    </RedirectIfAuthenticated>
  )
}

export default SignUp