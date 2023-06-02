import React from 'react';
import { FormControl, Input, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

export default function SearchBar(props: any) {
  const { placeholder } = props;
  const { searchFunction } = props;
  return (
    <FormControl variant="standard">
      <Input
        id="search-bar"
        placeholder={placeholder}
        // ^ convert to props
        size="small"
        onInput={(e: any) => searchFunction(e.target.value)}
        endAdornment={
          // eslint-disable-next-line react/jsx-wrap-multilines
          <InputAdornment position="end">
            <SearchIcon style={{ fill: 'gray' }} />
          </InputAdornment>
        }
      />
    </FormControl>
  );
}
