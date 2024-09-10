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
    Chip,
    ChipDelete,
    Tooltip,
} from '@mui/joy';
import React, { useState, useEffect, useRef } from 'react';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

interface TreeSelectProps<T> {
    data: T[];
    setSelectedMap: any;
    selectedMap: any[];
    parentIdKey: keyof T;
    parentNameKey: keyof T;
    childrenKey: keyof T;
    childrenIdKey: keyof T;
    childrenNameKey: keyof T;
    selectedChildrens?: any[];
    disabled?: boolean;
}

const TreeSelect = <T,>({
    data,
    setSelectedMap,
    parentIdKey,
    parentNameKey,
    childrenKey,
    childrenIdKey,
    childrenNameKey,
    selectedMap,
    selectedChildrens = [],
    disabled = false
}: TreeSelectProps<T>) => {
    const [selectedParents, setSelectedParents] = useState<Set<number | string>>(new Set());
    const [selectedChildren, setSelectedChildren] = useState<Set<number | string>>(new Set());
    const [isDelete, setIsDelete] = useState<boolean>(false);
    const [index, setIndex] = React.useState<number | null>(-1);
    const parentRefs = useRef<Map<number | string, HTMLInputElement | null>>(new Map());

    function toggelDelete() {
        setIsDelete(!isDelete);
    }

    const handleParentChange = (parentId: number | string, children: T[]) => {
        const newSelectedParents = new Set(selectedParents);
        const newSelectedChildren = new Set(selectedChildren);

        if (newSelectedParents.has(parentId)) {
            newSelectedParents.delete(parentId);
            children.forEach((child) => newSelectedChildren.delete(child[childrenIdKey] as number | string));
        } else {
            newSelectedParents.add(parentId);
            children.forEach((child) => newSelectedChildren.add(child[childrenIdKey] as number | string));
        }

        setSelectedParents(newSelectedParents);
        setSelectedChildren(newSelectedChildren);
    };

    const handleChildChange = (parentId: number | string, childId: number | string, children: T[]) => {
        const newSelectedChildren = new Set(selectedChildren);

        if (newSelectedChildren.has(childId)) {
            newSelectedChildren.delete(childId);
        } else {
            newSelectedChildren.add(childId);
        }

        const allSelected = children.every((child) => newSelectedChildren.has(child[childrenIdKey] as number | string));
        const newSelectedParents = new Set(selectedParents);

        if (allSelected) {
            newSelectedParents.add(parentId);
        } else {
            newSelectedParents.delete(parentId);
        }

        setSelectedParents(newSelectedParents);
        setSelectedChildren(newSelectedChildren);
    };

    const handleSelectAllChange = () => {
        const allSelected =
            selectedParents.size === data.length &&
            selectedChildren.size === data.reduce((count, parent) => count + (parent[childrenKey] as T[]).length, 0);

        if (allSelected) {
            setSelectedParents(new Set());
            setSelectedChildren(new Set());
        } else {
            const newSelectedParents = new Set(data.map((parent) => parent[parentIdKey] as number | string));
            const newSelectedChildren = new Set(
                data.flatMap((parent) => (parent[childrenKey] as T[]).map((child) => child[childrenIdKey] as number | string))
            );
            setSelectedParents(newSelectedParents);
            setSelectedChildren(newSelectedChildren);
        }
    };

    useEffect(() => {
        data.forEach((parent) => {
            const selectedChildCount = (parent[childrenKey] as T[]).filter((child) =>
                selectedChildren.has(child[childrenIdKey] as number | string)
            ).length;
            const isAllSelected = selectedChildCount === (parent[childrenKey] as T[]).length;

            const checkbox = parentRefs.current.get(parent[parentIdKey] as number | string);
            if (checkbox) {
                checkbox.indeterminate = selectedChildCount > 0 && !isAllSelected;
            }
        });
    }, [selectedChildren]);

    useEffect(() => {
        const newSelectedChildren = new Set(selectedChildren);
        selectedChildrens.map((child) => {
            newSelectedChildren.add(child)
        })
        setSelectedChildren(newSelectedChildren);
    }, [])

    const allSelected =
        selectedParents.size === data.length &&
        selectedChildren.size === data.reduce((count, parent) => count + (parent[childrenKey] as T[]).length, 0);

    const handleOpenChange = () => {
        const parentChildMap = data
            .filter(
                (parent) =>
                    selectedParents.has(parent[parentIdKey] as number | string) ||
                    (parent[childrenKey] as T[]).some((child) => selectedChildren.has(child[childrenIdKey] as number | string))
            )
            .map((parent) => ({
                parentId: parent[parentIdKey],
                children: (parent[childrenKey] as T[])
                    .filter((child) => selectedChildren.has(child[childrenIdKey] as number | string))
                    .map((child) => child[childrenIdKey]),
            }));
        setIndex(-1)
        setSelectedMap(() => {
            return parentChildMap;
        });
    };

    const handleOpenChangeCount = () => {
        const parentChildMap = data
            .filter(
                (parent) =>
                    selectedParents.has(parent[parentIdKey] as number | string) ||
                    (parent[childrenKey] as T[]).some((child) => selectedChildren.has(child[childrenIdKey] as number | string))
            )
            .map((parent) => ({
                parentId: parent[parentIdKey],
                children: (parent[childrenKey] as T[])
                    .filter((child) => selectedChildren.has(child[childrenIdKey] as number | string))
                    .map((child) => child[childrenIdKey]),
            }));
        return parentChildMap;
    };

    const handleRemoveParentAndChildren = (parentId: number | string) => {
        return new Promise((resolve) => {
            const newSelectedParents = new Set(selectedParents);
            const newSelectedChildren = new Set(selectedChildren);

            // Remove parent and its children from the selection
            const parent = data.find((p) => p[parentIdKey] === parentId);
            if (parent) {
                newSelectedParents.delete(parentId);
                (parent[childrenKey] as T[]).forEach((child) => newSelectedChildren.delete(child[childrenIdKey] as number | string));
            }
            setSelectedParents(newSelectedParents);
            setSelectedChildren(newSelectedChildren);
            resolve('done');
        })
    };

    function updateMappingState(parentId: number | string) {
        handleRemoveParentAndChildren(parentId)
            .then(() => {
                toggelDelete()
            })
    }

    function ChildrenChips({ parentId }: { parentId: number | string }) {
        // Find the parent object
        const parent = data.find((parent) => parent[parentIdKey] === parentId);

        if (!parent) {
            return null;
        }

        // Get the names of the selected children for this parent
        const selectedChilrenNames = (parent[childrenKey] as T[])
            .filter((child) => selectedChildren.has(child[childrenIdKey] as number | string))
            .map((child) => child[childrenNameKey]);

        return (
            <Box padding={1}>
                <Typography sx={{ color: '#fff' }} fontWeight={500}  >Selected Districts{`(${selectedChilrenNames.length})`}:</Typography>
                <Box display={'flex'}>
                    {
                        selectedChilrenNames.map((name, idx) => (
                            //ts-ignore
                            <Typography sx={{ color: '#fff' }} key={idx}>{name + ','}</Typography>
                        ))
                    }
                </Box>
            </Box>
        );
    }

    useEffect(() => {
        const parentChildMap = data
            .filter(
                (parent) =>
                    selectedParents.has(parent[parentIdKey] as number | string) ||
                    (parent[childrenKey] as T[]).some((child) => selectedChildren.has(child[childrenIdKey] as number | string))
            )
            .map((parent) => ({
                parentId: parent[parentIdKey],
                children: (parent[childrenKey] as T[])
                    .filter((child) => selectedChildren.has(child[childrenIdKey] as number | string))
                    .map((child) => child[childrenIdKey]),
            }));
        setSelectedMap(() => {
            return parentChildMap;
        });

    }, [isDelete]);


    return (
        <Box width={300}>
            <Dropdown onOpenChange={handleOpenChange}>
                <MenuButton endDecorator={<ArrowDropDownIcon />} sx={disabled ? { width: '300px', backgroundColor: '#EBEBE4' } : { width: '300px' }} disabled={disabled}>
                    <Typography width={'100%'} fontSize={16} fontWeight={400} textAlign={'start'}>
                        {handleOpenChangeCount().length === 0
                            ? 'Please select options'
                            : `Selected (${handleOpenChangeCount().length === data.length ? 'All' : handleOpenChangeCount().length})`}
                    </Typography>
                </MenuButton>
                <Menu sx={{ width: 300, paddingY: 0 }}>
                    <Box borderBottom={'1px solid #E9E9E9'} display={'flex'} alignItems={'center'} marginBottom={1} padding={1.5}>
                        <Checkbox
                            variant='outlined'
                            color='neutral'
                            component={'a'}
                            type="checkbox"
                            checked={allSelected}
                            onChange={handleSelectAllChange}
                            sx={{ marginRight: 2 }}
                        />
                        <Typography marginBottom={0.5}>Select All</Typography>
                    </Box>
                    <AccordionGroup sx={{ maxWidth: 350 }}>
                        {data.map((parent, accIndex) => {
                            const selectedChildCount = (parent[childrenKey] as T[]).filter((child) =>
                                selectedChildren.has(child[childrenIdKey] as number | string)
                            ).length;
                            const isAllSelected = selectedChildCount === (parent[childrenKey] as T[]).length;

                            return (
                                <Accordion
                                    expanded={index === accIndex}
                                    onChange={(event, expanded) => {
                                        setIndex(expanded ? accIndex : null);
                                    }}
                                    key={parent[parentIdKey] as number | string}
                                    sx={{
                                        border: 'none',
                                        display: 'flex',
                                        justifyContent: 'flex-start',
                                        alignContent: 'flex-start',
                                        paddingRight: 0
                                    }}
                                >
                                    <Box display={'flex'} alignItems={'center'} marginBottom={0.5} marginTop={0.5}>
                                        <Checkbox
                                            variant='outlined'
                                            color='neutral'
                                            component={'a'}
                                            type="checkbox"
                                            ref={(el: any) => parentRefs.current.set(parent[parentIdKey] as number | string, el)}
                                            checked={isAllSelected}
                                            onChange={() => handleParentChange(parent[parentIdKey] as number | string, parent[childrenKey] as T[])}
                                            sx={{ marginRight: 1.5, width: '8.5%' }}
                                        />
                                        <AccordionSummary sx={{ width: '91%' }}>
                                            <Typography fontWeight={400} fontSize={16}>
                                                {parent[parentNameKey] as string}{' '}
                                                {selectedChildCount > 0 && !isAllSelected && `(${selectedChildCount})`}
                                            </Typography>
                                        </AccordionSummary>
                                    </Box>
                                    <AccordionDetails sx={{ paddingX: '3%' }}>
                                        {(parent[childrenKey] as T[]).map((child) => (
                                            <Box marginBottom={1} marginTop={0.5} display={'flex'} flexDirection={'row'} sx={{ cursor: 'pointer' }} key={child[childrenIdKey] as number | string}>
                                                <Checkbox
                                                    variant='outlined'
                                                    color='neutral'
                                                    checked={selectedChildren.has(child[childrenIdKey] as number | string)}
                                                    onChange={() =>
                                                        handleChildChange(
                                                            parent[parentIdKey] as number | string,
                                                            child[childrenIdKey] as number | string,
                                                            parent[childrenKey] as T[]
                                                        )
                                                    }
                                                    sx={{ marginLeft: 3.5, marginRight: 1.5 }}
                                                />
                                                <Typography
                                                    onClick={() => {
                                                        handleChildChange(
                                                            parent[parentIdKey] as number | string,
                                                            child[childrenIdKey] as number | string,
                                                            parent[childrenKey] as T[]
                                                        )
                                                    }}
                                                    sx={{ cursor: 'pointer' }}
                                                    fontWeight={400} fontSize={16}>{child[childrenNameKey] as string}</Typography>
                                            </Box>
                                        ))}
                                    </AccordionDetails>
                                </Accordion>
                            );
                        })}
                    </AccordionGroup>
                </Menu>
            </Dropdown>
            {/* Render selected parent cards */}
            <Box mt={2} display="flex" flexDirection="row" gap={1} flexWrap="wrap">
                {data.map((parent) => {
                    const selectedChildCount = (parent[childrenKey] as T[]).filter((child) =>
                        selectedChildren.has(child[childrenIdKey] as number | string)
                    ).length;

                    if (selectedChildCount === 0) return null; // Only display if some children are selected

                    return (
                        <Chip
                            key={parent[parentIdKey] as number | string}
                            endDecorator={
                                disabled ? '' : <ChipDelete
                                    onClick={() => updateMappingState(parent[parentIdKey] as number | string)}
                                    sx={{ ml: 'auto', }}
                                    variant='plain'
                                />
                            }
                        >
                            <Tooltip title=
                                {<ChildrenChips parentId={parent[parentIdKey] as number}
                                />} arrow placement='top-end' color='primary'>
                                <Typography variant="plain"> {parent[parentNameKey] as string} ({selectedChildCount})</Typography>
                            </Tooltip>
                        </Chip>
                    );
                })}
            </Box>
        </Box>
    );
};

export default TreeSelect;


