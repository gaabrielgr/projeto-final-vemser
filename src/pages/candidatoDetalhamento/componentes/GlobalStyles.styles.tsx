import styled from "styled-components";
import Theme from "../../../theme/Theme";

export const TituloInfo = styled.h3`
  font-size: 20px;
  margin-bottom: 3px;
  color: ${Theme.color.primary};
`;
export const Info = styled.p`
  font-size: 16px;
  padding-left: 5px;
  color: ${Theme.fontColor.primary};
`;
export const Negrito = styled.span`
  color: ${Theme.color.primary};
  padding-left: 5px;
  font-weight: bold;
`;
export const ContainerInfo = styled.div`
  width: 100%;
  display: flex;
  column-gap: 20px;
  padding: 5px 5px 2px 0px;
  border-bottom: 0.5px solid #ccc;
  :last-child {
    border-bottom: none;
  }
`;

export const DivTopicosCandidato = styled.div`
  padding: 10px 0px 10px 0px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  row-gap: 5px;
  width: 100%;
  border-bottom: 2px solid #ccc;
  :last-child {
    border-bottom: none;
  }
`;

export const DivColumn = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  column-gap: 20px;
  row-gap: 10px;
  align-items: start;
`;
