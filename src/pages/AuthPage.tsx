
import { useState } from 'react';
import { LoginForm } from '@/components/Auth/LoginForm';
import { SignupForm } from '@/components/Auth/SignupForm';

interface AuthPageProps {
  onLogin: () => void;
}

export const AuthPage = ({ onLogin }: AuthPageProps) => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {isLogin ? (
          <LoginForm 
            onLogin={onLogin}
            onSwitchToSignup={() => setIsLogin(false)}
          />
        ) : (
          <SignupForm 
            onSignup={onLogin}
            onSwitchToLogin={() => setIsLogin(true)}
          />
        )}
      </div>
      
      {/* Background decoration */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-40 -right-32 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-32 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
      </div>
    </div>
  );
};
