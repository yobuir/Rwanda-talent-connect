import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { BadgeCheck, Lock, LockIcon, User } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { toast } from '@/hooks/use-toast';
import { UpdateUSer } from '@/utils/talentConnect/users/updateUser';
import Link from 'next/link';


function GAccount({ user }) {
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [phone, setPhone] = React.useState('');
  const [currentPassword, setCurrentPassword] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [confirmPassword, setConfirmPassword] = React.useState('');
  const [loading, setLoading] = React.useState(false);

  // Initialize state when the `user` prop changes
  React.useEffect(() => {
    if (user) {
      setName(user.fullName || '');
      setEmail(user.email || '');
      setPhone(user.phoneNumber || '');
    }
  }, [user]);

  const submitAllChanges = async () => {
    setLoading(true);
    try {
      const updateData = {};
      if (name) updateData.fullName = name;
      if (email) updateData.email = email;
      if (phone) updateData.phoneNumber = phone;

      const response = await UpdateUSer(updateData);

      if (response.status === 'success') {
        toast({
          variant: 'default',
          title: 'Profile Updated',
          description: 'Your profile has been updated successfully.',
        });
      } else {
        toast({
          variant: 'destructive',
          title: 'Profile Update Failed',
          description: 'An error occurred while updating your profile. Please try again.',
        });
      }
    } catch (error) {
      console.error('Unexpected error:', error);
      toast({
        variant: 'destructive',
        title: 'Unexpected Error',
        description: error.message || 'An error occurred. Please try again later.',
      });
    } finally {
      setLoading(false);
    }
  };

  const changePassword = async () => {
    if (password !== confirmPassword) {
      toast({
        variant: 'destructive',
        title: 'Password Mismatch',
        description: 'New password and confirm password must match.',
      });
      return;
    }

    setLoading(true);
    try {
      const updateData = { 
        password,
      };

      const response = await UpdateUSer(updateData);

      if (response.status === 'success') {
        toast({
          variant: 'default',
          title: 'Password Updated',
          description: 'Your password has been updated successfully.',
        });
      } else {
        toast({
          variant: 'destructive',
          title: 'Password Update Failed',
          description: 'An error occurred while updating your password. Please try again.',
        });
      }
    } catch (error) {
      console.error('Unexpected error:', error);
      toast({
        variant: 'destructive',
        title: 'Unexpected Error',
        description: error.message || 'An error occurred. Please try again later.',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Profile Verification */}
      <Card className="shadow-none border border-dashed border-gray-200">
        <CardContent>
          <div className="flex justify-between items-center py-4">
            <h1 className="font-semibold text-lg flex items-center gap-2">
              <BadgeCheck /> Profile Verification Status
            </h1>
          </div>
          <div className="mb-4 text-gray-500">
            <h3>Verifying your profile information.</h3>
          </div>
          <div className="mb-5">
            {
              user?.isProfilePublished ?(
            <Badge variant={'secondary'} title="Profile not verified">Profile not verified</Badge>):(
            <Badge>Verified</Badge>)
            }
          </div>
            {
              user?.isProfilePublished ?( 
                <Alert>
                  <AlertTitle>Profile not verified</AlertTitle>
                  <AlertDescription>
                    Your profile is not verified. Please if it&apos;s taking longer than usual, contact support for assistance.
                    <Link className='underline text-orange-500' href={process.env.SUPPORT_EMAIL??'support@example.com'}>{process.env.SUPPORT_EMAIL ?? 'support@example.com'}</Link>
                  </AlertDescription>
                </Alert>
                ):(
              <Alert>
                <AlertTitle>Verified</AlertTitle>
                <AlertDescription>
                  Your profile has been verified. Your account is now visible to the public.
                </AlertDescription>
              </Alert>
            )
            }
        
          
        </CardContent>
      </Card>

      {/* Profile Settings */}
      <Card className="shadow-none border border-dashed border-gray-200">
        <CardContent>
          <div className="flex justify-between items-center py-4">
            <h1 className="font-semibold text-lg flex items-center gap-2">
              <User /> Profile Settings
            </h1>
          </div>
          <div className="mb-4 text-gray-500">
            <h3>Edit your profile information.</h3>
          </div>
          <div className="space-y-4">
            <div>
              <Label htmlFor="name">Name</Label>
              <Input id="name" value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div>
              <Label htmlFor="phone">Phone</Label>
              <Input id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} />
            </div>
            <Button onClick={submitAllChanges} disabled={loading} className="w-full">
              {loading ? 'Saving...' : 'Save Changes'}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Password Settings */}
      {/* <Card className="shadow-none border border-dashed border-gray-200">
        <CardContent>
          <div className="flex justify-between items-center py-4">
            <h1 className="font-semibold text-lg flex items-center gap-2">
              <Lock /> Password Settings
            </h1>
          </div>
          <div className="mb-4 text-gray-500">
            <h3>Change your password.</h3>
          </div>
          <div className="space-y-4">
            
            <div>
              <Label htmlFor="new_password">New Password</Label>
              <Input
                id="new_password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="confirm_password">Confirm Password</Label>
              <Input
                id="confirm_password"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
            <Button onClick={changePassword} disabled={loading} className="w-full">
              {loading ? 'Saving...' : 'Save Changes'}
            </Button>
          </div>
        </CardContent>
      </Card> */}
    </div>
  );
}

export default GAccount;
