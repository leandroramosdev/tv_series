import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import { Typography } from '@mui/material';
import Box from "@mui/material/Box";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

export default function MultiSect({name, data, val, setValue, multiple}) {
  //const [value, setPersonName] = useState([]);
  const handleChange = (event) => {
    console.log(event)

    const {
      target: { value },
    } = event;
    setValue(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );

    if(multiple === false){
      console.log(val)
      if(val.indexOf(event.target.value) > -1){
        setValue([])
      }
    }
  };

  return (
    <div>
      <Box sx={{ m: 1 }}>
        <Typography>{name}</Typography>  
        <Select
          sx={{backgroundColor: '#1e1e1e', color: '#FFF', width: '100%'}}  
          labelId="demo-multiple-checkbox-label"
          id="demo-multiple-checkbox"
          multiple={multiple}
          value={val}
          onChange={handleChange}
          renderValue={(selected) => selected.join(', ')}
          MenuProps={MenuProps}
        >
          {data.map((item, key) => (
            <MenuItem key={key} value={item}>
              <Checkbox checked={val.indexOf(item) > -1} />
              <ListItemText primary={item} />
            </MenuItem>
          ))}
        </Select>
      </Box>
    </div>
  );
}
