import * as GC from "../GlobalStyles.styles";
import { PropsExperiencia } from "../../TypesDetalhamento";
import { formatDateToUser } from "../../../../utils";
type Props = {
  experiencias: {
    dataFim: string;
    dataInicio: string;
    descricao: string;
    idExperiencia: number;
    nomeEmpresa: string;
  }[];
};

const CardExperiencia = ({ experiencias }: Props) => {
  return (
    <GC.DivTopicosCandidato>
      <GC.TituloInfo>
        <GC.Negrito>Experiência Profissional</GC.Negrito>
      </GC.TituloInfo>
      {experiencias &&
        experiencias.map((exp: PropsExperiencia) => (
          <GC.ContainerInfo key={exp.idExperiencia}>
            <GC.DivColumn>
              <GC.Info>
                <GC.Negrito>Empresa:</GC.Negrito>
                {exp.nomeEmpresa}
              </GC.Info>
              <GC.Info>
                <GC.Negrito>Descrição: </GC.Negrito>
                {exp.descricao}
              </GC.Info>
            </GC.DivColumn>
            <GC.DivColumn>
              <GC.Info>
                <GC.Negrito>Início: </GC.Negrito>
                {formatDateToUser(exp.dataInicio)}
              </GC.Info>
              <GC.Info>
                <GC.Negrito>Saída: </GC.Negrito>
                {formatDateToUser(exp.dataFim)}
              </GC.Info>
            </GC.DivColumn>
          </GC.ContainerInfo>
        ))}
    </GC.DivTopicosCandidato>
  );
};

export default CardExperiencia;
