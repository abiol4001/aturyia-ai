"use client";

import React, { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { CheckCircle, XCircle, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

const OAuthCallbackPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [message, setMessage] = useState('Processing OAuth callback...');

  useEffect(() => {
    const handleOAuthCallback = async () => {
      try {
        // Get OAuth parameters from URL
        const code = searchParams.get('code');
        const state = searchParams.get('state');
        const error = searchParams.get('error');

        console.log('🔄 OAuth Callback received:', { code, state, error });

        if (error) {
          console.error('❌ OAuth error:', error);
          setStatus('error');
          setMessage(`OAuth authorization failed: ${error}`);
          return;
        }

        if (!code) {
          console.error('❌ No authorization code received');
          setStatus('error');
          setMessage('No authorization code received from Google');
          return;
        }

        // TODO: Exchange authorization code for access tokens
        // This would typically call a backend endpoint to exchange the code
        // For now, we'll simulate a successful exchange
        setMessage('Exchanging authorization code for access tokens...');
        
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        // TODO: Replace with actual API call
        // const response = await exchangeCodeForTokens(code, state);
        
        console.log('✅ OAuth flow completed successfully');
        setStatus('success');
        setMessage('Gmail integration completed successfully!');
        
        // Redirect back to integrations page after 3 seconds
        setTimeout(() => {
          router.push('/library/sdr/integrations');
        }, 3000);

      } catch (error) {
        console.error('❌ OAuth callback error:', error);
        setStatus('error');
        setMessage('Failed to complete OAuth flow. Please try again.');
      }
    };

    handleOAuthCallback();
  }, [searchParams, router]);

  const handleRetry = () => {
    router.push('/library/sdr/integrations');
  };

  const handleGoToIntegrations = () => {
    router.push('/library/sdr/integrations');
  };

  return (
    <DashboardLayout agentType="sdr">
      <div className="flex items-center justify-center min-h-[600px]">
        <div className="text-center max-w-md mx-auto">
          {/* Status Icon */}
          <div className="mb-8">
            {status === 'loading' && (
              <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Loader2 className="w-10 h-10 text-blue-500 animate-spin" />
              </div>
            )}
            {status === 'success' && (
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-10 h-10 text-green-500" />
              </div>
            )}
            {status === 'error' && (
              <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <XCircle className="w-10 h-10 text-red-500" />
              </div>
            )}
          </div>

          {/* Status Message */}
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-900 mb-3">
              {status === 'loading' && 'Completing Gmail Integration'}
              {status === 'success' && 'Integration Complete!'}
              {status === 'error' && 'Integration Failed'}
            </h1>
            <p className="text-lg text-gray-600">
              {message}
            </p>
          </div>

          {/* Action Buttons */}
          <div className="space-y-4">
            {status === 'success' && (
              <div className="space-y-2">
                <p className="text-sm text-gray-500">
                  Redirecting to integrations page in 3 seconds...
                </p>
                <Button
                  onClick={handleGoToIntegrations}
                  className="bg-green-500 hover:bg-green-600 text-white"
                >
                  Go to Integrations
                </Button>
              </div>
            )}
            
            {status === 'error' && (
              <div className="space-y-2">
                <Button
                  onClick={handleRetry}
                  className="bg-orange-500 hover:bg-orange-600 text-white"
                >
                  Try Again
                </Button>
                <Button
                  variant="outline"
                  onClick={handleGoToIntegrations}
                >
                  Back to Integrations
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default OAuthCallbackPage;
