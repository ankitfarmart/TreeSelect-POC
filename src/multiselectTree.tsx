
import { SimpleTreeView } from '@mui/x-tree-view/SimpleTreeView';
import { TreeItem } from '@mui/x-tree-view/TreeItem';

const SelectableTreeView: React.FC = ({
    selected,
    stateDistrictsData,
    mapping,
    onSelect
}: any) => {

    console.log("selected is", mapping)

    return (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
            <SimpleTreeView multiSelect checkboxSelection selectedItems={selected}>
                {stateDistrictsData.map(({ stateId, stateLabel, districts }: any) => (
                    <TreeItem
                        key={stateId}
                        itemId={stateId}
                        label={stateLabel}
                        // onClick={()=>{
                        //     onSelect(stateId)
                        // }}
                        onChange={() => {
                            onSelect(stateId)
                        }}
                    >
                        {districts.map((districtId: any) => (
                            <TreeItem
                                key={districtId}
                                itemId={`${stateId}-${districtId}`}
                                label={districtId.charAt(0).toUpperCase() + districtId.slice(1)}
                                onClick={() => {
                                    onSelect(stateId, districtId)
                                }}
                                onChange={(e) => {
                                    e.preventDefault()
                                }}
                            />
                        ))}
                    </TreeItem>
                ))}
            </SimpleTreeView>
        </div>
    );
};

export default SelectableTreeView;