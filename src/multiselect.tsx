import { Box, Checkbox, Dropdown, Input, Menu, MenuButton, Typography } from '@mui/joy';
import React, { useState, useEffect } from 'react';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

interface Option {
    [key: string]: any;
}

interface MultiSelectProps {
    options: Option[];
    onChange: (selectedIds: any[]) => void;
    searchPlaceholder: string;
    idKey: string;
    nameKey: string;
    selectedIds?: any[];
    globalPlaceholder?: string;
    emptyMessage?: string;
    endDecoratorIcon?: React.ReactNode;
    selectionMessage?: string;
}

const MultiSelect: React.FC<MultiSelectProps> = ({
    options,
    onChange,
    searchPlaceholder,
    selectedIds = [],
    globalPlaceholder,
    idKey,
    nameKey,
    emptyMessage='No Match found!',
    endDecoratorIcon=<ArrowDropDownIcon/>,
    selectionMessage='selected',
}) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [localSelectedIds, setLocalSelectedIds] = useState<any[]>(selectedIds);

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
    };

    const handleCheckboxChange = (id: any) => {
        setLocalSelectedIds((prev) => {
            const updated = prev.includes(id)
                ? prev.filter((itemId) => itemId !== id)
                : [...prev, id];
            if (updated !== prev) {
                onChange(updated); // Call only if there's an actual change
            }
            return updated;
        });
    };

    useEffect(() => {
        if (selectedIds.length !== localSelectedIds.length) {
            setLocalSelectedIds(selectedIds);
        }
    }, []); // Only update if selectedIds actually change

    const filteredOptions = options.filter((option) =>
        option[nameKey].toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <Box width={358}>
            <Dropdown onOpenChange={()=>{setSearchTerm('');}}>
                <MenuButton endDecorator={endDecoratorIcon} sx={{ width: 358 }}>
                    <Typography fontSize={16} width={'100%'} textAlign={'start'}>
                        {localSelectedIds.length === 0
                            ? globalPlaceholder
                            : `(${localSelectedIds.length}) ${selectionMessage}`}
                    </Typography>
                </MenuButton>
                <Menu sx={{ width: 358, background: 'var(--background-surface, #FBFCFE)', maxHeight: 460 }}>
                    <Box padding={2} paddingTop={0.5}>
                        <Box className="dropdown">
                            <Input
                                type="text"
                                placeholder={searchPlaceholder}
                                value={searchTerm}
                                onChange={handleSearch}
                                startDecorator={<SearchRoundedIcon />}
                            />
                            <Box marginTop={2}>
                                {filteredOptions.length === 0 ?
                                    <Typography width={'100%'} textAlign={'center'}>{emptyMessage}</Typography> : null}
                                {
                                filteredOptions.map((option) => (
                                    <Box key={option[idKey]} sx={{cursor:'pointer'}} onClick={() => handleCheckboxChange(option[idKey])}>
                                        <Box marginTop={2} marginBottom={2} display={'flex'} alignItems={'center'}>
                                            <Checkbox
                                                variant='outlined'
                                                color='neutral'
                                                checked={localSelectedIds.includes(option[idKey])}
                                                sx={{ width: 20, height: 20 }} />
                                            <Typography marginLeft={2}>{option[nameKey]}</Typography>
                                        </Box>
                                    </Box>
                                ))}
                            </Box>
                        </Box>
                    </Box>
                </Menu>
            </Dropdown>
        </Box>
    );
};

export default MultiSelect;
