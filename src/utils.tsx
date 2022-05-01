import { CandidatoDTO } from "./model/CandidatoDTO";
import * as Yup from "yup";
import { ExperienciaDTO } from "./model/ExperienciaDTO";
import moment from "moment";
import { DadosEscolaresDTO } from "./model/DadosEscolaresDTO";

export const zeroLeft = (num: number) => {
  return num < 10 ? `0${num}` : num;
};
export const formatDateToApi = (value: string | undefined) => {
  return moment(value, "DD/MM/YYYY").format("YYYY-MM-DD");
};
export const formatDateToUser = (value: string | undefined) => {
  return moment(value, "YYYY-MM-DD").format("DD/MM/YYYY");
};
export const BottomPage = () => {
  return window.scrollTo(0, 1000);
};

export const SingupSchema = Yup.object().shape({
  nome: Yup.string().required("Preencha o campo corretamente!"),
  cpf: Yup.string().required("Preencha o campo corretamente!"),
  dataNascimento: Yup.string().required("Preencha o campo corretamente!"),
  logradouro: Yup.string().required("Preencha o campo corretamente!"),
  cidade: Yup.string().required("Preencha o campo corretamente!"),
  bairro: Yup.string().required("Preencha o campo corretamente!"),
  telefone: Yup.string().required("Preencha o campo corretamente!"),
  numero: Yup.string().required("Preencha o campo corretamente!"),
  cargo: Yup.string().required("Preencha o campo corretamente!"),
  senioridade: Yup.string().required("Preencha o campo corretamente!"),
});

export function prepareDataToInsert(values: CandidatoDTO) {
  values.dataNascimento = formatDateToApi(values.dataNascimento);
  if (values.experiencias) {
    values.experiencias.map((experiencia: ExperienciaDTO) => {
      experiencia.dataInicio = formatDateToApi(experiencia.dataInicio);
      experiencia.dataFim = formatDateToApi(experiencia.dataFim);
    });
  }
  if (values.dadosEscolares) {
    values.dadosEscolares.map((dadoEscolar: DadosEscolaresDTO) => {
      dadoEscolar.dataInicio = formatDateToApi(dadoEscolar.dataInicio);
      dadoEscolar.dataFim = formatDateToApi(dadoEscolar.dataFim);
    });
  }
}

export function prepareDateToUser(values: CandidatoDTO) {
  values.dataNascimento = formatDateToUser(values.dataNascimento);
  if (values.experiencias && values.experiencias.length > 0) {
    values.experiencias.map((experiencia: ExperienciaDTO) => {
      experiencia.dataInicio = formatDateToUser(experiencia.dataInicio);
      experiencia.dataFim = formatDateToUser(experiencia.dataFim);
    });
  }

  if (values.dadosEscolares && values.dadosEscolares.length > 0) {
    values.dadosEscolares.map((dadoEscolar: DadosEscolaresDTO) => {
      dadoEscolar.dataInicio = formatDateToUser(dadoEscolar.dataInicio);
      dadoEscolar.dataFim = formatDateToUser(dadoEscolar.dataFim);
    });
  }

  return values;
}
