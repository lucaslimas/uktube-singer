import styled from "styled-components";

export const Container = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;

  video {
    background-color: #222;
    flex: 1;
  }
`;

export const Sources = styled.div`
  height: 120px;
  display: flex;
  flex-direction: row;
  > div {
    padding: 10px;
    margin: 5px;
    background-color: #f5f5f5;
    border: 1px solid #f0f0f0;
  }
`;
