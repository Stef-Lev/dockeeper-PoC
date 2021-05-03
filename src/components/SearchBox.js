import React from "react";
import InputBase from "@material-ui/core/InputBase";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  gap: 16px;
  width: 90%;
`;

const StyledSearch = styled(InputBase)`
  padding: 8px 16px;
  border-radius: 4px;
  border: 1px solid rgba(0, 0, 0, 0.25);
`;

// const StyledSelect = styled(FormControl)`
//   :focus {
//     border: 3px solid red;
//   }
// `;

function SearchBox({ onChange }) {
  return (
    <Container>
      <StyledSearch placeholder="Search..." fullWidth onChange={onChange} />
      {/* <StyledSelect
        variant="outlined"
        style={{ width: "30%", textAlign: "left" }}
      >
        <InputLabel id="demo-simple-select-outlined-label">
          Search by
        </InputLabel>
        <Select
          labelId="demo-simple-select-outlined-label"
          id="demo-simple-select-outlined"
          label="Search by"
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>
      </StyledSelect> */}
    </Container>
  );
}

export default SearchBox;
