import moment from "moment";
import Loading from "../../components/loading/Loading";
import api from "../../api";
import ModalList from "../../components/modal/ModalList";
import * as C from "../../components/globalStyles/global.styles";
import { useEffect, useState } from "react";
import { IoMdArrowRoundForward, IoMdArrowRoundBack } from "react-icons/io";
import { AiOutlineSearch } from "react-icons/ai";
import { ChangeEvent } from "react";
import { VagasInicialDTO ,VagasDTO} from "../../model/VagasDTO";

import { zeroLeft } from "../../utils";
function Vagas() {
  const [visibleModal, setVisibleModal] = useState(false);

  const [totalVagas, setTotalVagas] = useState<VagasDTO[]>();

  const [idVagas, setIdVagas] = useState<number | undefined>();

  const [startVagas, setStartVagas] = useState<any>();

  const [dateLastUp, setDateLastUp] = useState<string>('');

  const [inputValue, setInputValue] = useState<string | undefined>();

  const [vagasInput, setVagasInput] = useState<any>();

  const [page, setPage] = useState<number>(0);

  async function getInVagas(id: number) {
    try {
      const { data } = await api.get(
        `/vaga/buscar-vagas-aberto?pagina=${id}&quantidade-por-pagina=7`
      );
      setVagasInput(data.vagas);
      setStartVagas(data);
    } catch (error) {
      console.log(error);
    }
  }

  const nextPage = (actionPage: string) => {
    if (actionPage === "+" && page < startVagas.paginas - 1) {
      setPage(page + 1);
    }
    if (actionPage === "-" && page > 0) {
      setPage(page - 1);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      api.defaults.headers.common["Authorization"] = token;
      getInVagas(7);
      Setup();
      BuscaDataUltimaAtualizacao()
    }
  }, []);

  useEffect(() => {
    getInVagas(page);
  }, [page]);

  useEffect(() => {
    Setup();
  }, [startVagas]);

  function ModalTratament(idVaga: number | undefined) {
    setVisibleModal(true);
    setIdVagas(idVaga);
  }

  function VerificaUndefined(value: any) {
    if (!value) {
      value = "-";
    }
    return value;
  }

  async function Setup() {
    if (startVagas) {
      try {
        const { data } = await api.get(
          `/vaga/buscar-vagas-aberto?pagina=0&quantidade-por-pagina=${startVagas.total}`
        );

        setTotalVagas(data.vagas);
      } catch (error) {
        console.log(error);
      }
    }
  }

  async function searchVagas(event: ChangeEvent<HTMLInputElement>) {
    setInputValue(event.target.value);
    if (totalVagas) {
      setVagasInput(
        totalVagas.filter((vaga: any) =>
          vaga.cliente.toLowerCase().includes(inputValue?.toLowerCase())
        )
      );
    }
  }
  async function BuscaDataUltimaAtualizacao(){
    try{
      const {data} = await api.get('/vaga/data-ultima-atualizacao')
      setDateLastUp( moment(data).format('DD/MM/YYYY  , h:mm:ss a'))
    }
    catch(error){
      console.log(error);
    }
  }
  if (!startVagas && !totalVagas) {
    return <Loading altura="350vh" largura="520vw" />;
  }
  return (
    <C.BackGroundTabela>
      <C.DivAlignTop>
        <C.DivFlex>
          <C.Title>Listagem de Vagas </C.Title>
          <C.Search
            placeholder="Pesquise por empresa"
            onChange={(event: ChangeEvent<HTMLInputElement>) =>
              searchVagas(event)
            }
          ></C.Search>
          <AiOutlineSearch />
        </C.DivFlex>

        <C.SubTitle>
          <C.SpanDefaultHour>
            Última Atualização : {dateLastUp}
          </C.SpanDefaultHour>
          <C.ButtonVisualizar onClick={() =>BuscaDataUltimaAtualizacao() }>Atualizar Vagas</C.ButtonVisualizar>
        </C.SubTitle>
      </C.DivAlignTop>
      {visibleModal && (
        <ModalList idVaga={idVagas} onClose={() => setVisibleModal(false)} />
      )}
      <C.ContainerGeralTabela flexD="column" border="0.5px solid #dfe0eb">
        <C.Tabela>
          <C.TheadTabela>
            <C.TrTabela>
              <C.ThTabela radius="10px 0 0 0">Titulo</C.ThTabela>
              <C.ThTabela>Cliente</C.ThTabela>
              <C.ThTabela>Status</C.ThTabela>
              <C.ThTabela>Responsavel</C.ThTabela>
              <C.ThTabela>Estado</C.ThTabela>
              <C.ThTabela>Abertura</C.ThTabela>
              <C.ThTabela>Cidade</C.ThTabela>
              <C.ThTabela>Analista</C.ThTabela>
              <C.ThTabela>PCD</C.ThTabela>
              <C.ThTabela radius=" 0 10px 0 0 " align={"center"}>
                Vincular
              </C.ThTabela>
            </C.TrTabela>
          </C.TheadTabela>
          <C.TBodyTable>
            {vagasInput.slice(0, 7).map((vaga: any) => (
              <C.TrTabela key={vaga.id}>
                <C.TdTabela>{VerificaUndefined(vaga.titulo)}</C.TdTabela>
                <C.TdTabela>{VerificaUndefined(vaga.cliente)}</C.TdTabela>
                <C.TdTabela>{VerificaUndefined(vaga.status)}</C.TdTabela>
                <C.TdTabela>{VerificaUndefined(vaga.responsavel)}</C.TdTabela>
                <C.TdTabela>{VerificaUndefined(vaga.estado)}</C.TdTabela>
                <C.TdTabela>
                  {moment(vaga.dataAbertura, "YYYY-MM-DD").format("DD/MM/YYYY")}
                </C.TdTabela>
                <C.TdTabela>{VerificaUndefined(vaga.cidade)}</C.TdTabela>
                <C.TdTabela>{VerificaUndefined(vaga.analista)}</C.TdTabela>
                <C.TdTabela>{vaga.pcd ? "Sim" : "Não"}</C.TdTabela>
                <C.TdTabela align={"center"}>
                  <C.ButtonVisualizar onClick={() => ModalTratament(vaga.id)}>
                    Vincular
                  </C.ButtonVisualizar>
                </C.TdTabela>
              </C.TrTabela>
            ))}
          </C.TBodyTable>
        </C.Tabela>
        <C.ContainerButtonsPage>
          <C.BtnSeta onClick={() => nextPage("-")}>
            <IoMdArrowRoundBack />
          </C.BtnSeta>
          <C.SpanDefault>página: {zeroLeft(page + 1)}</C.SpanDefault>
          <C.BtnSeta onClick={() => nextPage("+")}>
            <IoMdArrowRoundForward />
          </C.BtnSeta>
        </C.ContainerButtonsPage>
      </C.ContainerGeralTabela>
    </C.BackGroundTabela>
  );
}
export default Vagas;
