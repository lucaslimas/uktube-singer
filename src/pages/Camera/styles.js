import styled from "styled-components";

export const Container = styled.div`
  /* height: 100%;
  width: 100%; */
  flex: 1;
  position: relative;

  video {
    background-color: #222;
    height: 100%;
    width: 100%;
    object-fit: cover;
  }
`;

export const Sources = styled.div`
  height: 60px;
  display: flex;
  flex-direction: row;
  padding: 10px;
  background-color: #222;
  justify-content: space-between;
`;

export const Canvas = styled.canvas`
  display: none;
`;

export const Snapshot = styled.div`
  position: absolute;
  bottom: 20px;
  left: 20px;
`;
