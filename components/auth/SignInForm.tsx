"use client"
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Eye, EyeOff, Mail, Lock } from 'lucide-react';
import Link from 'next/link';
import { createClient } from '@/utils/supabase/client';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

// Zod validation schema
const signinSchema = z.object({
  email: z
    .string()
    .email('Please enter a valid email address')
    .min(1, 'Email is required'),
  password: z
    .string()
    .min(1, 'Password is required'),
});

type SigninFormValues = z.infer<typeof signinSchema>;

interface SigninFormProps {
  onSubmit?: (data: SigninFormValues) => void;
  onGoogleSignIn?: () => void;
  onGithubSignIn?: () => void;
  onForgotPassword?: () => void;
  isLoading?: boolean;
}

const SigninForm: React.FC<SigninFormProps> = ({
  onSubmit = (data) => console.log('Signin data:', data),
  onGoogleSignIn = () => console.log('Google sign in'),
  onGithubSignIn = () => console.log('Github sign in'),
  onForgotPassword = () => console.log('Forgot password'),
  isLoading = false
}) => {
  const [showPassword, setShowPassword] = React.useState(false);
  const [isSigningIn, setIsSigningIn] = React.useState(false);
  const router = useRouter();
  const supabase = createClient();

  const form = useForm<SigninFormValues>({
    resolver: zodResolver(signinSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const handleSubmit = async (data: SigninFormValues) => {
    setIsSigningIn(true);
    onSubmit(data);

    try {
      // Sign in with Supabase Auth
      const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
        email: data.email,
        password: data.password,
      });

      if (authError) {
        console.error('Sign in error:', authError.message);
        toast.error(authError.message || 'Sign in failed');
        return;
      }

      if (!authData.user) {
        toast.error('Sign in failed - no user returned');
        return;
      }

      // Success - show toast and navigate to dashboard
      toast.success('Welcome back!');
      router.push('/dashboard');
    } catch (error) {
      console.error('Unexpected error:', error);
      toast.error('An unexpected error occurred');
    } finally {
      setIsSigningIn(false);
    }
  };

  return (
    <div className="w-full">
      <Card className="shadow-lg border-0">
        <CardHeader className="space-y-1 px-6 pt-6 pb-4">
          <CardTitle className="text-2xl font-bold text-center">
            Welcome to Agent Flow
          </CardTitle>
          <CardDescription className="text-center text-sm">
            AI-Powered Sales Automation Platform
          </CardDescription>
        </CardHeader>
        <CardContent className="px-6 pb-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium">Email</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          placeholder="john.doe@example.com"
                          type="email"
                          className="pl-10 h-11"
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <FormMessage className="text-xs text-red-500" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium">Password</FormLabel>
                    <FormControl>
                      <div className="relative flex items-center">
                        <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          placeholder="Enter your password"
                          type={showPassword ? 'text' : 'password'}
                          className="pl-10 pr-10 h-11"
                          {...field}
                        />
                        <button
                          type="button"
                          className="absolute right-3 top-1.5 h-4 w-4 text-muted-foreground hover:text-foreground transition-colors"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? <EyeOff /> : <Eye />}
                        </button>
                      </div>
                    </FormControl>
                    <FormMessage className="text-xs text-red-500" />
                  </FormItem>
                )}
              />

              <div className="flex items-center justify-end">
                <button
                  type="button"
                  onClick={onForgotPassword}
                  className="text-sm text-primary hover:underline transition-colors"
                >
                  Forgot your password?
                </button>
              </div>

              <Button
                type="submit"
                className="w-full h-11 font-medium"
                disabled={isLoading || isSigningIn}
              >
                {isLoading || isSigningIn ? 'Signing in...' : 'Sign in'}
              </Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4 px-6 pb-6">
          <div className="flex items-center w-full">
            <Separator className="flex-1" />
            <span className="px-3 text-sm text-muted-foreground bg-background">or</span>
            <Separator className="flex-1" />
          </div>

          <div className="flex flex-col w-full space-y-3">
            <Button
              type="button"
              variant="outline"
              onClick={onGoogleSignIn}
              className="w-full h-11 mx-auto rounded-lg"
              disabled={isLoading || isSigningIn}
            >
              <svg
                className="mr-2 h-4 w-4"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              Continue with Google
            </Button>

            <Button
              type="button"
              variant="outline"
              onClick={onGithubSignIn}
              className="w-full h-11 mx-auto rounded-lg"
              disabled={isLoading || isSigningIn}
            >
              <svg
                className="mr-2 h-4 w-4"
                fill="#24292e"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
              Continue with GitHub
            </Button>
          </div>

          <div className="text-center text-sm text-muted-foreground space-y-4 mt-4">
            <div className="px-2">
              By signing in, you agree to our <Link href="#" className="text-amber-600 hover:underline transition-colors">Terms of Service</Link> and <Link href="#" className="text-amber-600 hover:underline transition-colors">Privacy Policy</Link>
            </div>
            <p className="">
              Don&apos;t have an account?{' '}
              <Link href="/register" className="hover:underline text-amber-600 transition-colors">
                Create account
              </Link>
            </p>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default SigninForm;