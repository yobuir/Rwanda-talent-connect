import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Search, X, Filter, RefreshCw } from 'lucide-react';
import React, { useEffect, useState, useRef, useMemo, useCallback } from 'react';
 
import { LANGUAGES, SKILLS_OPTIONS, BODY_TYPES, HEIGHTS_AVAILABLE, WEIGHTS_AVAILABLE, SKIN_COLORS, HAIR_COLORS, GENDERS } from "@/lib/Constants"
import { Select, Tooltip } from 'antd'; 
import { Button } from '@/components/ui/button';

function Filtering({ talents, setFilteredTalents, filters, setFilters }) {
    const [isFilterPanelOpen, setIsFilterPanelOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const filterPanelRef = useRef(null);
    const searchInputRef = useRef(null);
    const [ageSearch, setAgeSearch] = useState();

    const calculateMatchPercentage = (talent) => {
        let totalFilters = 0;
        let matchedFilters = 0;

        const addFilterCheck = (condition, isMatch) => {
            if (condition) totalFilters++;
            if (isMatch) matchedFilters++;
        };

        // Matching logic
        addFilterCheck(true, !searchTerm || talent?.fullName?.toLowerCase()?.includes(searchTerm.toLowerCase()));
        addFilterCheck(filters.genders.length > 0, filters.genders.includes(talent?.talentProfile?.gender));
        addFilterCheck(filters.skills.length > 0, filters.skills.some(skill => talent?.talentProfile?.skills?.includes(skill)));
        addFilterCheck(filters.location, talent?.talentProfile?.location?.toLowerCase() === filters.location?.toLowerCase());
        addFilterCheck(filters.languages.length > 0, filters.languages.some(lang => talent?.talentProfile?.languagesSpoken?.includes(lang)));
        addFilterCheck(filters.bodyTypes.length > 0, filters.bodyTypes.includes(talent?.talentProfile?.bodyType));
        addFilterCheck(filters.skinColors.length > 0, filters.skinColors.includes(talent?.talentProfile?.skinColor));
        addFilterCheck(filters.heights.length > 0, filters.heights.includes(talent?.talentProfile?.height));
        addFilterCheck(filters.weights.length > 0, filters.weights.includes(talent?.talentProfile?.weight));
        addFilterCheck(filters.hairColors.length > 0, filters.hairColors.includes(talent?.talentProfile?.hairColor));
        addFilterCheck(filters.age, talent?.talentProfile?.age?.startsWith(filters.age));
        addFilterCheck(filters.hourlyRateMin, talent?.talentProfile?.rate?.amount <= filters.hourlyRateMin);

        // Calculate percentage
        return totalFilters > 0 ? Math.round((matchedFilters / totalFilters) * 100) : 0;
    };

    const filteredTalents = useMemo(() => {
        return talents.map(talent => ({
            ...talent,
            matchPercentage: calculateMatchPercentage(talent),
        })).filter(talent => talent.matchPercentage > 0)
         .sort((a, b) => b.matchPercentage - a.matchPercentage); 
    }, [talents, searchTerm, filters]);

    useEffect(() => {
        setFilteredTalents(filteredTalents);
    }, [filteredTalents, setFilteredTalents]);

    const resetFilters = useCallback(() => {
        setFilters({
            genders: [],
            skills: [],
            location: '',
            languages: [],
            bodyTypes: [],
            eyeColors: [],
            skinColors: [],
            weights: [],
            heights: [],
            hairColors: [],
            age: null,
            hourlyRateMin: null,
        });
        setSearchTerm('');
    }, [setFilters]);


    const handleAnswerSelect = (key, value) => {
        setFilters((prev) => ({
            ...prev,
            [key]: value,
        }));
        applyFilters({ ...filters, [key]: value });
    };

    const applyFilters = (newFilters) => {
        let filtered = talents;

        if (newFilters.gender) {
            filtered = filtered.filter(talent => talent.gender === newFilters.gender);
        }

        if (newFilters.age) {
            filtered = filtered.filter(talent => {
                if (newFilters.age === 'Under 18') return talent.age < 18;
                if (newFilters.age === '18-30') return talent.age >= 18 && talent.age <= 30;
                if (newFilters.age === '31-40') return talent.age >= 31 && talent.age <= 40;
                if (newFilters.age === '40+') return talent.age > 40;
                return true;
            });
        }

        setFilteredTalents(filtered);
    };

    // Render filter options with memoization
    const renderFilterSelect = useCallback((
        label, 
        value, 
        onChange, 
        options, 
        placeholder = `Select ${label}`
    ) => (
        <div className="grid grid-cols-1 items-center gap-2 mb-2">
            <Label className="block">{label}</Label>
            <Select
                mode="multiple"
                className='w-full'
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                style={{ width: '100%' }}
                options={options.map((item) => ({
                    value: item.value || item,
                    label: item.label || item,
                }))}
            />
        </div>
    ), []);

    return (
        <> 

           <div className=''>
             <div 
                ref={searchInputRef}
                className='bg-white border flex relative items-center gap-2 p-3 rounded-lg cursor-pointer'
                onClick={() => setIsFilterPanelOpen(true)}
            >
                <Search className='text-gray-500 absolute left-4'/>
                <Input 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className='border-none cursor-pointer pl-8 shadow-none' 
                    placeholder='Search talents by name, location, skills...'
                />
                <Tooltip title="Advanced Filters">
                    <Button 
                        variant="outline" 
                        size="icon" 
                        onClick={() => setIsFilterPanelOpen(true)}
                    >
                        <Filter className='h-4 w-4' />
                    </Button>
                </Tooltip>
            </div>
            <div className=" flex-wrap items-center justify-start gap-4 w-full lg:flex hidden mt-2">
                <div className="mb-4">
                    <p className=" font-semibold">What talent are you looking for?</p>
                    <div className="flex gap-4 mt-2">
                        {['Male', 'Female'].map((option, index) => (
                            <button
                                key={index}
                                onClick={() => handleAnswerSelect('gender', option)}
                                className={`px-4 py-2 capitalize ${filters.gender === option ? 'bg-orange-500 text-white' : 'bg-orange-500/20 text-orange-500'} rounded-full text-sm`}
                            >
                                {option}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="mb-4">
                    <p className=" font-semibold">What age range?</p>
                    <div className="flex gap-4 mt-2">
                        {['Under 18', '18-30', '31-40', '40+'].map((option, index) => (
                            <button
                                key={index}
                                onClick={() => handleAnswerSelect('age', option)}
                                className={`px-4 py-2 capitalize ${filters.age === option ? 'bg-orange-500 text-white' : 'bg-orange-500/20 text-orange-500'} rounded-full text-sm`}
                            >
                                {option}
                            </button>
                        ))}
                    </div>
                </div>
                <div className='flex'>
                    <button
                    onClick={() => setIsFilterPanelOpen(true)}
                    className="mt-3 text-orange-500 underline"
                    >
                        More Filters
                    </button>
                </div> 
            </div>
            </div>


            {/* Filter Panel - Only renders when isFilterPanelOpen is true */}
            {isFilterPanelOpen && (
                <div className='fixed z-50 bg-[rgba(0,0,0,0.5)] inset-0 flex items-end justify-end'>
                    <div 
                        ref={filterPanelRef}
                        className='
                            flex flex-col 
                            bg-white 
                            h-[100vh] 
                            w-full 
                            lg:w-[400px] 
                            p-6 
                            overflow-y-auto 
                            relative 
                            shadow-xl
                            rounded-t-xl
                            lg:rounded-none
                        '
                    >
                        {/* Rest of the filter panel content remains the same */}
                        <div className='flex justify-between items-center mb-4'>
                            <h2 className="text-xl font-bold">Advanced Filters</h2>
                            <div className='flex items-center space-x-2'>
                                <Tooltip title="Reset Filters">
                                    <Button 
                                        variant="outline" 
                                        size="icon" 
                                        onClick={resetFilters}
                                    >
                                        <RefreshCw className='h-4 w-4' />
                                    </Button>
                                </Tooltip>
                                <Tooltip title="Close">
                                    <Button 
                                        variant="outline" 
                                        size="icon" 
                                        onClick={() => setIsFilterPanelOpen(false)}
                                    >
                                        <X className='h-4 w-4' />
                                    </Button>
                                </Tooltip>
                            </div>
                        </div>


                    {/* Search within filter panel */}
                    <div className='mb-4'>
                        <Input 
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            prefix={<Search className='text-gray-500' />}
                            placeholder='Search talents by, location, skills, languages etc...'
                            className='w-full'
                        />
                    </div> 
                                <div className='mb-4'>
                        <Label>Filter by Age (Year)</Label>
                        <Input
                            type="number"
                            id="age"
                            name="age"
                            onChange={(e) => setFilters(prev => ({ ...prev, age: e.target.value }))}
                            value={filters.age || ''}
                            placeholder="Enter Year (e.g., 1990)"
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-600 sm:text-sm sm:leading-6"
                        />
                    </div>
 
                    {/* Filter Sections */}
                    <div className='space-y-4'>
                        {renderFilterSelect(
                            'Gender', 
                            filters.genders, 
                            (value) => setFilters(prev => ({...prev, genders: value})), 
                            GENDERS
                        )}

                        {renderFilterSelect(
                            'Skills', 
                            filters.skills, 
                            (value) => setFilters(prev => ({...prev, skills: value})), 
                            SKILLS_OPTIONS
                        )}

                        {renderFilterSelect(
                            'Languages', 
                            filters.languages, 
                            (value) => setFilters(prev => ({...prev, languages: value})), 
                            LANGUAGES
                        )}

                        {/* Hourly Rate Range */}
                        <div className='grid grid-cols-1 gap-2'>
                            <Label>Hourly Rate </Label>
                            <Input 
                                type='number' 
                                placeholder='hourly Rate' 
                                value={filters.hourlyRateMin || ''}
                                onChange={(e) => setFilters(prev => ({
                                    ...prev, 
                                    hourlyRateMin: e.target.value ? Number(e.target.value) : null
                                }))}
                            /> 
                        </div>

                        <div className='grid grid-cols-1 gap-2'>
                            <Label>Location </Label>
                        {/* Location */}
                        <Input 
                            placeholder='Location' 
                            value={filters.location}
                            onChange={(e) => setFilters(prev => ({...prev, location: e.target.value}))}
                        />
                        </div>

                        {/* Additional Filters */}
                        {renderFilterSelect(
                            'Body Type', 
                            filters.bodyTypes, 
                            (value) => setFilters(prev => ({...prev, bodyTypes: value})), 
                            BODY_TYPES
                        )}

                        {renderFilterSelect(
                            'Height', 
                            filters.heights, 
                            (value) => setFilters(prev => ({...prev, heights: value})), 
                            HEIGHTS_AVAILABLE
                        )}

                        {renderFilterSelect(
                            'Weight', 
                            filters.weights, 
                            (value) => setFilters(prev => ({...prev, weights: value})), 
                            WEIGHTS_AVAILABLE
                        )}

                        {renderFilterSelect(
                            'Skin Color', 
                            filters.skinColors, 
                            (value) => setFilters(prev => ({...prev, skinColors: value})), 
                            SKIN_COLORS
                        )}

                        {renderFilterSelect(
                            'Hair Color', 
                            filters.hairColors, 
                            (value) => setFilters(prev => ({...prev, hairColors: value})), 
                            HAIR_COLORS
                        )}
                    </div>
                </div>
            </div>
        )}
        </>
    );
}

export default Filtering;