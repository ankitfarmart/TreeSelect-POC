import {
    Accordion,
    AccordionDetails,
    AccordionGroup,
    AccordionSummary,
    Box,
    Checkbox,
    Dropdown,
    Menu,
    MenuButton,
    Typography,
} from '@mui/joy';
import React, { useState, useEffect, useRef } from 'react';

interface District {
    districtId: number;
    districtName: string;
}

interface State {
    stateId: number;
    stateName: string;
    districts: District[];
}

interface TreeSelectProps {
    data: State[];
    setSelectedMap: any;
    selectedMap: [];
}

const TreeSelect: React.FC<TreeSelectProps> = ({ data,setSelectedMap,selectedMap}) => {
    const [selectedStates, setSelectedStates] = useState<Set<number>>(new Set());
    const [selectedDistricts, setSelectedDistricts] = useState<Set<number>>(new Set());
    const [index, setIndex] = React.useState<number | null>(-1);
    const stateRefs = useRef<Map<number, HTMLInputElement | null>>(new Map());

    const handleStateChange = (stateId: number, districts: District[]) => {
        const newSelectedStates = new Set(selectedStates);
        const newSelectedDistricts = new Set(selectedDistricts);

        if (newSelectedStates.has(stateId)) {
            newSelectedStates.delete(stateId);
            districts.forEach(district => newSelectedDistricts.delete(district.districtId));
        } else {
            newSelectedStates.add(stateId);
            districts.forEach(district => newSelectedDistricts.add(district.districtId));
        }

        setSelectedStates(newSelectedStates);
        setSelectedDistricts(newSelectedDistricts);
    };

    const handleDistrictChange = (stateId: number, districtId: number, districts: District[]) => {
        const newSelectedDistricts = new Set(selectedDistricts);

        if (newSelectedDistricts.has(districtId)) {
            newSelectedDistricts.delete(districtId);
        } else {
            newSelectedDistricts.add(districtId);
        }

        const allSelected = districts.every(district => newSelectedDistricts.has(district.districtId));
        const newSelectedStates = new Set(selectedStates);

        if (allSelected) {
            newSelectedStates.add(stateId);
        } else {
            newSelectedStates.delete(stateId);
        }

        setSelectedStates(newSelectedStates);
        setSelectedDistricts(newSelectedDistricts);
    };

    const handleSelectAllChange = () => {
        const allSelected = selectedStates.size === data.length && selectedDistricts.size === data.reduce((count, state) => count + state.districts.length, 0);

        if (allSelected) {
            setSelectedStates(new Set());
            setSelectedDistricts(new Set());
        } else {
            const newSelectedStates = new Set(data.map(state => state.stateId));
            const newSelectedDistricts = new Set(data.flatMap(state => state.districts.map(district => district.districtId)));
            setSelectedStates(newSelectedStates);
            setSelectedDistricts(newSelectedDistricts);
        }
    };

    useEffect(() => {
        data.forEach(state => {
            const selectedDistrictCount = state.districts.filter(district => selectedDistricts.has(district.districtId)).length;
            const isAllSelected = selectedDistrictCount === state.districts.length;

            const checkbox = stateRefs.current.get(state.stateId);
            if (checkbox) {
                checkbox.indeterminate = selectedDistrictCount > 0 && !isAllSelected;
            }
        });
    }, [selectedDistricts]);

    const allSelected = selectedStates.size === data.length && selectedDistricts.size === data.reduce((count, state) => count + state.districts.length, 0);

    const handleOpenChange = () => {
        const statesDistMap = data
            .filter(state => selectedStates.has(state.stateId) || state.districts.some(district => selectedDistricts.has(district.districtId)))
            .map(state => ({
                stateId: state.stateId,
                districts: state.districts
                    .filter(district => selectedDistricts.has(district.districtId))
                    .map(district => district.districtId)
            }));
        setSelectedMap(statesDistMap);
        return statesDistMap;
    };

    const handleOpenChangeCount = () => {
        const statesDistMap = data
            .filter(state => selectedStates.has(state.stateId) || state.districts.some(district => selectedDistricts.has(district.districtId)))
            .map(state => ({
                stateId: state.stateId,
                districts: state.districts
                    .filter(district => selectedDistricts.has(district.districtId))
                    .map(district => district.districtId)
            }));
        return statesDistMap;
    };

    return (
        <div>
            <Dropdown onOpenChange={handleOpenChange}>
                <MenuButton sx={{ width: '300px', display: 'flex', justifyContent: 'flex-start' }}>
                    <Typography level='body-sm'>
                    {handleOpenChangeCount().length === 0 
                        ? 'Please select states and districts'
                        : `Selected States (${handleOpenChangeCount().length})`}
                    </Typography>
                </MenuButton>
                <Menu sx={{ width: 300 }}>
                    <Box display={'flex'} alignItems={'center'} marginBottom={2} paddingX={1.5}>
                        <Checkbox
                            component={'a'}
                            type="checkbox"
                            checked={allSelected}
                            onChange={handleSelectAllChange}
                            sx={{ marginRight: 1.5 }}
                        />
                        <Typography>Select All</Typography>
                    </Box>
                    <AccordionGroup sx={{ maxWidth: 350 }}>
                        {data.map((state,accIndex) => {
                            const selectedDistrictCount = state.districts.filter(district => selectedDistricts.has(district.districtId)).length;
                            const isAllSelected = selectedDistrictCount === state.districts.length;

                            return (
                                <Accordion
                                    expanded={index === accIndex}
                                    onChange={(event, expanded) => {
                                    setIndex(expanded ? accIndex : null);
                                    }}
                                    key={state.stateId}
                                    sx={{
                                        border: 'none',
                                        display: 'flex',
                                        justifyContent: 'flex-start',
                                        alignContent: 'flex-start',
                                    }}
                                >
                                    <Box display={'flex'} alignItems={'center'}>
                                        <Checkbox
                                            component={'a'}
                                            type="checkbox"
                                            ref={(el: any) => stateRefs.current.set(state.stateId, el)}
                                            checked={isAllSelected}
                                            onChange={() => handleStateChange(state.stateId, state.districts)}
                                            sx={{ marginRight: 1.5, width: '8.5%' }}
                                        />
                                        <AccordionSummary sx={{ width: '91%' }}>
                                            <Typography>
                                                {state.stateName}{' '}
                                                {selectedDistrictCount > 0 && !isAllSelected && `(${selectedDistrictCount}/${state.districts.length})`}
                                            </Typography>
                                        </AccordionSummary>
                                    </Box>
                                    <AccordionDetails style={{ paddingLeft: '25px' }}>
                                        {state.districts.map((district) => (
                                            <Box onClick={() => handleDistrictChange(state.stateId, district.districtId, state.districts)}
                                                key={district.districtId} display={'flex'} flexDirection={'row'} marginBottom={1}
                                                sx={{ cursor: 'pointer' }}
                                            >
                                                <Checkbox
                                                    component={'a'}
                                                    type="checkbox"
                                                    checked={selectedDistricts.has(district.districtId)}
                                                    onChange={() => handleDistrictChange(state.stateId, district.districtId, state.districts)}
                                                    sx={{ marginRight: 5 }}
                                                />
                                                <Typography>{district.districtName}</Typography>
                                            </Box>
                                        ))}
                                    </AccordionDetails>
                                </Accordion>
                            );
                        })}
                    </AccordionGroup>
                </Menu>
            </Dropdown>
        </div>
    );
};

export default TreeSelect;
