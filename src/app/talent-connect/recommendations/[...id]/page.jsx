'use client';
import React, { useState, useEffect } from 'react';  
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import NavBar from '@/app/components/Header/NavBar';
import { getUserById } from '@/utils/talentConnect/users/getUserById';
import { toast } from '@/hooks/use-toast';
import { newRecommendation } from '@/utils/talentConnect/users/talents/recommendations/newRecommendation';

const RecommendationsPage = ({params}) => {  
  const [companyId, setCompanyId] = useState();
  const [userId, setUserId] = useState();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [rating, setRating] = useState(0);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await getUserById({ id: userId });
        if (response.status === 'error') {
          toast({
            variant: 'destructive',
            title: 'Error fetching user data',
            description: response.message || 'Unable to fetch user details. Please try again later.',
          });
        } else {
          setUser(response); 
        }
      } catch (error) { 
        toast({
          variant: 'destructive',
          title: 'Error fetching user data',
          description: error.message || 'Unable to fetch user details. Please try again later.',
        });
      }
    };
    fetchUser();
  }, [userId]);

  useEffect(() => { 
    async function fetchParams() {
      const resolvedParams = await params; 
      setCompanyId(resolvedParams?.id[1]);  
      setUserId(resolvedParams?.id[0]);
    }
    fetchParams();
  }, [params]);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {  
      const data = {}; 
      if (rating) data.rating = rating;
      if (message) data.message = message; 
      if (userId) data.talentId = userId;
      if (companyId) data.companyId = companyId;
      const response = await newRecommendation(data);

      if (response.status === 'success') { 
        toast({
          variant: "default",
          title: "Recommendation Submitted",
          description: "Your recommendation has been submitted successfully.",
        });   
      } else { 
        toast({
          variant: "destructive",
          title: "Submission Failed",
          description: "An error occurred while submitting your recommendation. Please try again.",
        });
      }
    } catch (error) {
      console.error('Unexpected error:', error); 
      toast({
        variant: "destructive",
        title: "An unexpected error occurred",
        description: error.message || "An unexpected error occurred. Please try again later.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative bg-white mb-6">
      <NavBar />
      <div className="flex flex-col lg:flex-row gap-3">
        <div className="min-h-screen px-12 mx-auto lg:w-[80%]">
          <h1 className="text-2xl font-bold mb-4">🌟 Recommendations</h1>
          <p>
            Adding a recommendation to a talent  profile boosts their chances of getting hired.
          </p>
          {
            user && (
              <div className="mt-4">
                <h2 className="text-xl font-bold mt-4">Talent Information</h2>
                <p>Name: {user?.fullName} ({user?.talentProfile?.headline})</p> 
                <p>Role: {user?.role}</p>
              </div>
            )
          } 
          <form onSubmit={handleFormSubmit} className="mt-4">
            <div className="mb-4 flex flex-col gap-4">
              <Label className="block text-gray-700">Recommendation Message</Label>
              <Textarea 
                className="w-full" 
                required 
                name="message" 
                id="message" 
                onChange={(e) => setMessage(e.target.value)} 
              />
            </div>
            <div className="mb-4 flex flex-col gap-4">
              <Label className="block text-gray-700">Rating</Label>
              <RadioGroup className="flex space-x-4">
                {[1, 2, 3, 4, 5].map((rating) => ( 
                  <div className="flex items-center space-x-2" key={rating}>
                    <Label 
                      htmlFor={rating} 
                      className="flex items-center gap-3 border py-3 px-4 cursor-pointer rounded-lg border-orange-400 text-orange-500 font-bold"
                    >
                      <RadioGroupItem 
                        value={rating} 
                        id={rating} 
                        onChange={(e) => setRating(e.target.value)} 
                      /> 
                      {rating}
                    </Label>
                  </div>
                ))}
              </RadioGroup> 
            </div>
            <Button type="submit" color="green">
              {loading ? 'Submitting...' : 'Submit'}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RecommendationsPage;
