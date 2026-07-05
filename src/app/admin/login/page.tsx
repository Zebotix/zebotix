'use client';

import { AlertCircle } from 'lucide-react';
import { useActionState } from 'react';

import { loginAction } from '@/app/actions/auth';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/Alert';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Label } from '@/components/ui/Label';

export default function LoginPage() {
  const [state, formAction, isPending] = useActionState(loginAction, { message: '', errors: {} });

  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-50 dark:bg-zinc-950 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <div className="flex justify-center mb-6">
            <div className="text-2xl font-bold tracking-tighter">Zebotix</div>
          </div>
          <CardTitle className="text-2xl text-center">Admin Login</CardTitle>
          <CardDescription className="text-center">
            Enter your credentials to access the CMS
          </CardDescription>
        </CardHeader>
        
        <form action={formAction}>
          <CardContent className="space-y-4">
            {state?.message && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{state.message}</AlertDescription>
              </Alert>
            )}
            
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input 
                id="email" 
                name="email" 
                type="email" 
                placeholder="admin@zebotix.com" 
                required 
                defaultValue=""
              />
              {state?.errors?.email && (
                <p className="text-sm text-destructive">{state.errors.email[0]}</p>
              )}
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
              </div>
              <Input 
                id="password" 
                name="password" 
                type="password" 
                required 
              />
              {state?.errors?.password && (
                <p className="text-sm text-destructive">{state.errors.password[0]}</p>
              )}
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full" type="submit" disabled={isPending}>
              {isPending ? 'Signing in...' : 'Sign In'}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
