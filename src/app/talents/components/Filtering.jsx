import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Check, ChevronsUpDown,  Search } from 'lucide-react';
import React, { useEffect, useState } from 'react';
 
import { LANGUAGES, SKILLS_OPTIONS,BODY_TYPES,HEIGHTS_AVAILABLE,WEIGHTS_AVAILABLE,SKIN_COLORS,HAIR_COLORS,GENDERS } from "@/lib/Constants"
import { Select } from 'antd'; 



function Filtering({ talents, setFilteredTalents }) {

    const [open, setOpen] = useState(false)
    const [value, setValue] =useState("")

    const [selectedGenderItems, setSelectedGenderItems] = useState([]);
    const [selectedSkills, setSelectedSkills] = useState([]);
    const [selectedLocation, setSelectedLocation] = useState('');
        
    const [selectedItems, setSelectedItems] = useState([]);
    const [selectedLanguageItems, setSelectedLanguageItems] = useState([]);
    const [selectedBodyItems, setSelectedBodyItems] = useState([]);
    const [selectedHeightItems, setSelectedHeightItems] = useState([]);
    const [selectedWeightItems, setSelectedWeightItems] = useState([]);
    const [selectedSkinColorItems, setSelectedSkinColorItems] = useState([]);
    const [selectedHairColorItems, setSelectedHairColorItems] = useState([]); 

    const filteredOptions = SKILLS_OPTIONS.filter((o) => !selectedItems.includes(o));
    const filteredLanguageOptions = LANGUAGES.filter((o) => !selectedLanguageItems.includes(o));
    const filteredBodyOptions = BODY_TYPES.filter((o) => !selectedBodyItems.includes(o));
    const filteredHeightOptions = HEIGHTS_AVAILABLE.filter((o) => !selectedHeightItems.includes(o));
    const filteredWeightOptions = WEIGHTS_AVAILABLE.filter((o) => !selectedWeightItems.includes(o));
    const filteredSkinColorOptions = SKIN_COLORS.filter((o) => !selectedSkinColorItems.includes(o));
    const filteredHairColorOptions = HAIR_COLORS.filter((o) => !selectedHairColorItems.includes(o));
    const filteredGenderOptions = GENDERS.filter((o) => !selectedGenderItems.includes(o));


    const applyFilters = () => {

        let filtered = talents;

        if (selectedGenderItems.length) {
        filtered = filtered.filter(talent => selectedGenderItems.includes(talent.gender));
        }

        if (selectedSkills.length) {
        filtered = filtered.filter(talent => selectedSkills.every(skill => talent.skills.includes(skill)));
        }

        if (selectedLocation) {
        filtered = filtered.filter(talent => talent.location.toLowerCase().includes(selectedLocation.toLowerCase()));
        }

        setFilteredTalents(filtered);
    };

  useEffect(() => {
    applyFilters(); // Apply the filters whenever the selection changes
  }, [selectedGenderItems, selectedSkills, selectedLocation, talents]);


  return (
    <div className='fixed bg-white lg:flex hidden flex-col gap-2  lg:w-[25%] border  w-full top-24 border-t-0  p-4 right-0     h-screen overflow-auto'>
        <div className='bg-white border flex relative items-center gap-2 p-3 rounded-lg   cursor-pointer'>
            <Search className='text-gray-500 absolute left-4'/>
            <Input className='border-none  cursor-pointer pl-8 shadow-none' placeholder='Type here to search and filter talents by name, location, skills, etc.'/>
        </div>
        <aside className="pb-20"> 
                <h2 className="font-bold mb-4">Add Filters</h2>
                <div className="grid grid-cols-1 items-center gap-2 mb-2">
                    <Label className="block ">Gender </Label>
                    <Select
                        mode="multiple"
                        className='w-full '
                        placeholder="Add height" 
                        value={selectedGenderItems}
                        onChange={setSelectedGenderItems}
                        style={{
                            width: '100%',
                        }}
                        options={filteredGenderOptions.map((item) => ({
                            value: item.value,
                            label: item.label,
                        }))}
                        />
                </div>
                <div className="grid grid-cols-1 items-center gap-4 mb-2">
                    <Label htmlFor="headline" className="text-left">
                    Hourly Amount
                    </Label>
                    <Input id="amount"  placeholder="Ex: 10000 - 15000 or 10000" type="number" className="col-span-1" />
                </div>  
                <div>
                    <Label className="block mb-2">Location</Label>
                    <Input type="text" placeholder="e.g., San Francisco" className="w-full p-2 border rounded-lg mb-4" />
                </div> 
                <div className="grid grid-cols-1 items-center gap-2 mb-2">
                    <Label className="block mb-2">Skills</Label>
                    <Select
                        mode="multiple"
                        placeholder="Add skills"
                        value={selectedItems}
                        onChange={setSelectedItems}
                        style={{
                            width: '100%',
                        }}
                        options={filteredOptions.map((item) => ({
                            value: item,
                            label: item,
                        }))}
                        /> 
                </div>
                <div className="grid grid-cols-1 items-center gap-2 mb-2">
                    <Label className="block ">Languages Spoken</Label>
                    <Select
                        mode="multiple"
                        placeholder="Add languages spoken" 
                        value={selectedLanguageItems}
                        onChange={setSelectedLanguageItems}
                        style={{
                            width: '100%',
                        }}
                        options={filteredLanguageOptions.map((item) => ({
                            value: item,
                            label: item,
                        }))}
                        />   
                </div>
                <div className="grid grid-cols-1 items-center gap-2 mb-2">
                    <Label className="block ">Body Type</Label>
                    <Select
                        mode="multiple"
                        className='w-full '
                        placeholder="Add body type" 
                        value={selectedBodyItems}
                        onChange={setSelectedBodyItems}
                        style={{
                            width: '100%',
                        }}
                        options={filteredBodyOptions.map((item) => ({
                            value: item.value,
                            label: item.label,
                        }))}
                        />   
                </div>
                <div className="grid grid-cols-1 items-center gap-2 mb-2">
                    <Label className="block ">Eye Color </Label>
                    <Select
                        mode="multiple"
                        className='w-full '
                        placeholder="Add height" 
                        value={selectedBodyItems}
                        onChange={setSelectedBodyItems}
                        style={{
                            width: '100%',
                        }}
                        options={filteredBodyOptions.map((item) => ({
                            value: item.value,
                            label: item.label,
                        }))}
                        />
                </div>
                <div className="grid grid-cols-1 items-center gap-2 mb-2">
                    <Label className="block ">Skin Color </Label>
                    <Select
                        mode="multiple"
                        className='w-full '
                        placeholder="Add height" 
                        value={selectedBodyItems}
                        onChange={setSelectedBodyItems}
                        style={{
                            width: '100%',
                        }}
                        options={filteredBodyOptions.map((item) => ({
                            value: item.value,
                            label: item.label,
                        }))}
                        />
                </div>
                <div  div className="grid grid-cols-1 items-center gap-2 mb-2">
                    <Label className="block ">Weight </Label>
                    <Select
                        mode="multiple"
                        className='w-full '
                        placeholder="Add height" 
                        value={selectedWeightItems}
                        onChange={setSelectedWeightItems}
                        style={{
                            width: '100%',
                        }}
                        options={filteredWeightOptions.map((item) => ({
                            value: item.value,
                            label: item.label,
                        }))}
                        />
                </div>
                <div className="grid grid-cols-1 items-center gap-2 mb-2">
                    <Label className="block ">Height </Label>
                    <Select
                        mode="multiple"
                        className='w-full '
                        placeholder="Add height" 
                        value={selectedHeightItems}
                        onChange={setSelectedHeightItems}
                        style={{
                            width: '100%',
                        }}
                        options={filteredHeightOptions.map((item) => ({
                            value: item.value,
                            label: item.label,
                        }))}
                        />
                </div>
                <div className="grid grid-cols-1 items-center gap-2 mb-2">
                    <Label className="block ">Hair Color </Label>
                    <Select
                        mode="multiple"
                        className='w-full '
                        placeholder="Add height" 
                        value={selectedHairColorItems}
                        onChange={setSelectedHairColorItems}
                        style={{
                            width: '100%',
                        }}
                        options={filteredHairColorOptions.map((item) => ({
                            value: item.value,
                            label: item.label,
                        }))}
                        /> 
                </div> 
            </aside>
    </div>
  );
}

export default Filtering;