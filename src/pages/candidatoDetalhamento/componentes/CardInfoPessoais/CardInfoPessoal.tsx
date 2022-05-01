import * as C from "./CardInfoPessoais.styles";
import * as GC from "../GlobalStyles.styles";
import api from "../../../../api";
import Loading from "../../../../components/loading/Loading";
import { BiDownload } from "react-icons/bi";
import { FaUser } from "react-icons/fa";

import { useEffect, useState } from "react";
type Props = {
  nome: string;
  senioridade: string;
  cargo: string;
  idCandidato: number;
};

const CardInfoPessoal = (candidato: Props) => {
  const [isBoolean, setIsBoolean] = useState<boolean>(false);
  const [isLoading, setLoading] = useState<boolean>(true);

  async function GetCurriculo(open: boolean) {
    await api({
      url: `https://vemcv.herokuapp.com/curriculo/download-curriculo/${candidato.idCandidato}`,
      responseType: "blob",
    })
      .then(function (response) {
        const blob = new Blob([response.data], {
          type: "application/pdf",
        });
        setIsBoolean(true);
        const url = window.URL.createObjectURL(blob);
        if (open) {
          window.open(url);
        }
      })
      .catch(function (error) {
        console.log(error);
        setIsBoolean(false);
      });
    setLoading(false);
  }

  useEffect(() => {
    GetCurriculo(false);
  }, []);
  if (isLoading) {
    return <Loading altura="62vh" largura="33.53vw" />;
  }
  return (
    <C.Container>
      <FaUser />
      <GC.Info>
        <GC.Negrito>Nome: </GC.Negrito>
        {candidato.nome}
      </GC.Info>
      <GC.Info>
        <GC.Negrito>Senioridade: </GC.Negrito>
        {candidato.senioridade}
      </GC.Info>
      <GC.Info>
        <GC.Negrito>Cargo: </GC.Negrito>
        {candidato.cargo}
      </GC.Info>
      <GC.Info>
        {isBoolean ? (
          <C.DownloadCV onClick={() => GetCurriculo(true)} target="_blank">
            <BiDownload />
            <C.DownloadText>Baixar currículo</C.DownloadText>
          </C.DownloadCV>
        ) : (
          <GC.Negrito>Curriculo Não Anexado </GC.Negrito>
        )}
      </GC.Info>
    </C.Container>
  );
};

export default CardInfoPessoal;
