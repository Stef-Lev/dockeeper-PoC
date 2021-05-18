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

function SearchBox({ onChange, query }) {
  return (
    <Container>
      <StyledSearch
        placeholder="Search..."
        fullWidth
        onChange={onChange}
        value={query}
      />
    </Container>
  );
}

export default SearchBox;
