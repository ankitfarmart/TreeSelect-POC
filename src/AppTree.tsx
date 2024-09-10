import { useState } from 'react';
import TreeSelect from './dumpTree';
import { Button } from '@mui/joy';


 const state_data =  
    {"states": [
    {
      "stateId": 1,
      "stateName": "Maharashtra",
      "districts": [
        {"districtId": 101, "districtName": "Mumbai"},
        {"districtId": 102, "districtName": "Pune"},
        {"districtId": 103, "districtName": "Nagpur"}
      ]
    },
    {
      "stateId": 2,
      "stateName": "Karnataka",
      "districts": [
        {"districtId": 201, "districtName": "Bengaluru"},
        {"districtId": 202, "districtName": "Mysuru"},
        {"districtId": 203, "districtName": "Mangaluru"}
      ]
    },
    {
      "stateId": 3,
      "stateName": "Tamil Nadu",
      "districts": [
        {"districtId": 301, "districtName": "Chennai"},
        {"districtId": 302, "districtName": "Coimbatore"},
        {"districtId": 303, "districtName": "Madurai"}
      ]
    },
    {
      "stateId": 4,
      "stateName": "Uttar Pradesh",
      "districts": [
        {"districtId": 401, "districtName": "Lucknow"},
        {"districtId": 402, "districtName": "Kanpur"},
        {"districtId": 403, "districtName": "Varanasi"}
      ]
    },
    {
      "stateId": 5,
      "stateName": "Gujarat",
      "districts": [
        {"districtId": 3395, "districtName": "Ahmedabad"},
        {"districtId": 502, "districtName": "Surat"},
        {"districtId": 503, "districtName": "Vadodara"}
      ]
    },
    {
      "stateId": 6,
      "stateName": "Rajasthan",
      "districts": [
        {"districtId": 601, "districtName": "Jaipur"},
        {"districtId": 602, "districtName": "Udaipur"},
        {"districtId": 603, "districtName": "Jodhpur"}
      ]
    },
    {
      "stateId": 7,
      "stateName": "West Bengal",
      "districts": [
        {"districtId": 701, "districtName": "Kolkata"},
        {"districtId": 702, "districtName": "Darjeeling"},
        {"districtId": 703, "districtName": "Howrah"}
      ]
    },
    {
      "stateId": 8,
      "stateName": "Punjab",
      "districts": [
        {"districtId": 801, "districtName": "Amritsar"},
        {"districtId": 802, "districtName": "Ludhiana"},
        {"districtId": 803, "districtName": "Patiala"}
      ]
    },
    {
      "stateId": 9,
      "stateName": "Madhya Pradesh",
      "districts": [
        {"districtId": 901, "districtName": "Bhopal"},
        {"districtId": 902, "districtName": "Indore"},
        {"districtId": 903, "districtName": "Gwalior"}
      ]
    },
    {
      "stateId": 10,
      "stateName": "Bihar",
      "districts": [
        {"districtId": 1001, "districtName": "Patna"},
        {"districtId": 1002, "districtName": "Gaya"},
        {"districtId": 1003, "districtName": "Bhagalpur"}
      ]
    }
  ]
}

interface State {
  stateId: number;
  stateName: string;
  districts: District[];
}

interface District {
  districtId: number;
  districtName: string;
}



// const App = () => {
//   const [selectedMap, setSelectedMap] = useState<[]>([]);
//   return (
//     <div style={{display:'flex',flexDirection:'row'}}>
//       <TreeSelect data={data} setSelectedMap={setSelectedMap} selectedMap={selectedMap} />
//       <Button 
//       sx={{marginLeft:'10px'}}
//       onClick={()=>{
//         console.log(selectedMap);
//       }}>Press
//       </Button>
//     </div>
//   );
// };


const App = () => {
  const data: State[] = state_data.states;
  const [selectedMap, setSelectedMap] = useState<[]>([]);
  return (
    <div style={{display:'flex',flexDirection:'column'}}>
      <TreeSelect 
        data={data}
        setSelectedMap={setSelectedMap}
        selectedMap={selectedMap} 
        parentIdKey={'stateId'} 
        parentNameKey={'stateName'} 
        childrenKey={'districts'}
        childrenIdKey={'districtId'} 
        childrenNameKey={'districtName'} 
        disabled
        selectedChildrens={[101,3395]}
        />
      <Button 
      type='submit'
      sx={{marginLeft:'10px',marginTop:'10px',width:'100px'}}
      onClick={()=>{
        console.log(selectedMap);
      }}>Presss
      </Button>
    </div>
  );
};

export default App;





























// import React, { useState } from 'react';
// import { ToastProvider, useToastActions } from './SnackbarContext';
// import CheckboxMultiSelection from './multiselectTree';
// import { Dropdown, Menu, MenuButton } from '@mui/joy';

// export const ExampleComponent: React.FC = () => {
//   const toast = useToastActions();

//   const handleClick = () => {
//     toast.success('Success Message');
//   };

//   return (
//     <div>
//       <button onClick={handleClick}>Show Multiple Toasts</button>
//     </div>
//   );
// };














// type StateDistrictsType = {
//   stateId: string;
//   districtIds: string[];
// };


// const stateDistrictsData = [
//   { stateId: 'up', stateLabel: 'Uttar Pradesh', districts: ['lucknow', 'kanpur', 'varanasi'] },
//   { stateId: 'mh', stateLabel: 'Maharashtra', districts: ['mumbai', 'pune', 'nagpur'] },
//   { stateId: 'dl', stateLabel: 'Delhi', districts: ['central', 'south', 'north'] },
//   { stateId: 'ka', stateLabel: 'Karnataka', districts: ['bangalore', 'mysore', 'hubli'] },
//   { stateId: 'tn', stateLabel: 'Tamil Nadu', districts: ['chennai', 'coimbatore', 'madurai'] },
//   { stateId: 'wb', stateLabel: 'West Bengal', districts: ['kolkata', 'darjeeling', 'howrah'] },
//   { stateId: 'gj', stateLabel: 'Gujarat', districts: ['ahmedabad', 'surat', 'vadodara'] },
//   { stateId: 'rj', stateLabel: 'Rajasthan', districts: ['jaipur', 'udaipur', 'jodhpur'] },
//   { stateId: 'pb', stateLabel: 'Punjab', districts: ['chandigarh', 'ludhiana', 'amritsar'] },
//   { stateId: 'ap', stateLabel: 'Andhra Pradesh', districts: ['vijayawada', 'visakhapatnam', 'guntur'] },
// ];


// const App: React.FC = () => {
  
//   return (
//     <ToastProvider defaultDuration={200000000} >
//       <BasicMenu/>
//     </ToastProvider>
//   );
// };

// export default App;


// function BasicMenu() {
//   const [mapping, setMapping] = useState<Map<string, string[]>>(new Map());
//   const [selected,setSelected]=useState<string[]>([])

  

//   const updateMapping = (stateID: string, districtID?: string) => {
//       setMapping(prevMapping => {
//         const newMapping = new Map(prevMapping);
//         if (newMapping.has(stateID)) {
//           const value = newMapping.get(stateID) || [];
//           if (districtID) {
//               if(value.includes(districtID)){
//                   console.log("value is",value)
//                   newMapping.set(stateID, value.filter(item => item !== districtID))
//               }else{
//                   newMapping.set(stateID, [...value, districtID]);
//               }
//           }
//         } else {
//           newMapping.set(stateID, districtID ? [districtID] : []);
//         }
//         return newMapping;
//       });
//     };

//   function onSelect(stateID:string,districtID?:string){
     
//       if(stateID && !districtID){
//           const id=`${stateID}`
//           const isExist=selected.find(item=>item===id)
//           if(isExist){
//               setSelected(state=>state.filter(item=>item!==id))
//               return
//           }
//           setSelected(state=>([...state,id]))
//       }else if(districtID){
//           const id=`${stateID}-${districtID}`
//           const isExist=selected.find(item=>item===id)
//           if(isExist){
//               setSelected(state=>state.filter(item=>item!==id))
//               return
//           }
//           setSelected(state=>([...state,id]))
//       }
//       updateMapping(stateID,districtID)
//       //
//   }
//   return (
//     <Dropdown>
//       <MenuButton>Select the State And its District</MenuButton>
//       <Menu sx={{width:'250px'}}>
//       <CheckboxMultiSelection selected={selected} stateDistrictsData={stateDistrictsData} mapping={mapping} onSelect={onSelect} />
//       </Menu>
//     </Dropdown>
//   );
// }
