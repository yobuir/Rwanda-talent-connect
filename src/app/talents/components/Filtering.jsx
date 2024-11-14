 import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Search, X, Filter, RefreshCw } from 'lucide-react';
import React, { useEffect, useState, useRef, useMemo, useCallback } from 'react';
 
import { LANGUAGES, SKILLS_OPTIONS, BODY_TYPES, HEIGHTS_AVAILABLE, WEIGHTS_AVAILABLE, SKIN_COLORS, HAIR_COLORS, GENDERS } from "@/lib/Constants"
import { Select, Tooltip } from 'antd'; 
import { Button } from '@/components/ui/button';

function Filtering({ talents, setFilteredTalents,filters, setFilters  }) {
    // State for filter panel and search
    const [isFilterPanelOpen, setIsFilterPanelOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const filterPanelRef = useRef(null);
    const searchInputRef = useRef(null);


    // Performance optimization for filtering
    const filteredTalents = useMemo(() => {
        return talents.filter(talent => {
            // Search and filter logic remains the same
            const matchesSearch = !searchTerm || 
                talent?.fullName?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
                talent?.address?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
                talent?.skills?.some(skill => skill?.toLowerCase()?.includes(searchTerm?.toLowerCase()));

            const matchesGender = filters?.genders?.length === 0 || filters?.genders?.includes(talent?.gender);
            const matchesSkills = filters?.skills?.length === 0 || filters?.skills?.every(skill => talent?.skills?.includes(skill));
            const matchesLocation = !filters?.location || talent?.location?.toLowerCase()?.includes(filters?.location?.toLowerCase());
            const matchesLanguages = filters?.languages?.length === 0 || filters?.languages?.some(lang => talent?.languages?.includes(lang));
            
            return matchesSearch && 
                   matchesGender && 
                   matchesSkills && 
                   matchesLocation && 
                   matchesLanguages;
        });
    }, [talents, searchTerm, filters]);

    useEffect(() => {
        setFilteredTalents(filteredTalents);
    }, [filteredTalents, setFilteredTalents, talents]);


    // Reset all filters
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
            hourlyRateMin: null,
            hourlyRateMax: null
        });
        setSearchTerm('');
    }, [setFilters]);

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
                            placeholder='Search talents...'
                            className='w-full'
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
                        <div className='grid grid-cols-2 gap-2'>
                            <Input 
                                type='number' 
                                placeholder='Min Rate' 
                                value={filters.hourlyRateMin || ''}
                                onChange={(e) => setFilters(prev => ({
                                    ...prev, 
                                    hourlyRateMin: e.target.value ? Number(e.target.value) : null
                                }))}
                            />
                            <Input 
                                type='number' 
                                placeholder='Max Rate' 
                                value={filters.hourlyRateMax || ''}
                                onChange={(e) => setFilters(prev => ({
                                    ...prev, 
                                    hourlyRateMax: e.target.value ? Number(e.target.value) : null
                                }))}
                            />
                        </div>

                        {/* Location */}
                        <Input 
                            placeholder='Location' 
                            value={filters.location}
                            onChange={(e) => setFilters(prev => ({...prev, location: e.target.value}))}
                        />

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