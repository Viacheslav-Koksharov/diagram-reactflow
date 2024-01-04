import styled, { keyframes } from 'styled-components';

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 241px;
  border-radius: 4px;
  padding: 19px 3px 6px 3px;
  background-color: #d1e7dd;
`;

export const Display = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 72px;
  padding: 18px 12px;
  border-radius: 4px;
  background-color: #ffffff;
`;

export const DropdownWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 40px;
  margin-top: 4px;
  &:focus-visible {
    outline: none;
  }
`;

export const DropdownBtn = styled.button`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 100%;
  padding: 8px 12px;
  background-color: #ffffff;
  border-radius: 4px;
  border: 1px solid #479f76;
  border-bottom: 1px solid #479f76;
  cursor: pointer;
`;

const drop = keyframes`
  from {
    max-height: 0px;
  }
  to {
    max-height: 300px;
  }
`;

export const DropdownList = styled.ul`
  width: 100%;
  padding: 0px;
  margin: 0px;
  overflow-y: hidden;
  background-color: #ffffff;
  border: 1px solid #eaf2ff;
  border-bottom: none;
  border-radius: 0px 0px 4px 4px;
  animation: ${drop} 500ms alternate;
`;

export const DropdownItem = styled.li`
  list-style: none;
  width: 100%;
`;

export const Option = styled.button`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 40px;
  line-height: 1.7;
  padding: 8px 12px;
  background-color: #ffffff;
  border: none;
  border-bottom: 1px solid #eaf2ff;
  cursor: pointer;
  &:hover,
  &:focus {
    background-color: #d1e7dd;
    outline: none;
  }
`;