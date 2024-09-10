import MultiSelect from './multiselect';  // Assume MultiSelect is in the same directory
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

const App = () => {
  const people = [
    { id: 1, name: "Ajay Saundeep" },
    { id: 2, name: "Brij Kishore" },
    { id: 3, name: "Chandan Kumar" },
    { id: 4, name: "Dhananjay" },
    { id: 5, name: "Ghanendra Singh" },
    { id: 6, name: "Jitendra Swami" },
    { id: 7, name: "Manoj Kumar" },
    { id: 8, name: "Pankaj Tiwari" },
    { id: 9, name: "Shantanu Kuma" },
    { id: 10, name: "Venkat Sai" }
  ];

  const handlePeopleChange = (selectedIds: number[]) => {
    console.log(selectedIds);
  };

  return (
    <div>
      <MultiSelect
        options={people}
        onChange={handlePeopleChange}
        searchPlaceholder="Search ..."
        globalPlaceholder="Select PA" 
        idKey={'id'} 
        nameKey={'name'}
        endDecoratorIcon={<ArrowDropDownIcon />}
        selectionMessage="Selected PA's"
      />
    </div>
  );
};

export default App;
