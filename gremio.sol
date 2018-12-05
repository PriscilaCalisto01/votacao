pragma  solidity 0.4.25;
contract Votacaogremio {
    struct Proposta {
        string texto; //Votacao de escolha do gremio estudantil
        address proponente;
        uint quotaDeVotos;
        uint quotaMinimaDeVotos;
        bool existe;
    }
    struct Votante {
        address conta;
        uint quotaDeVotos;
        bool votou;
        bool existe;
    }
    modifier somenteChairman() {
        require(chairman == msg.sender, "Só o Chairmain pode realizar essa operação");
        _;
    }
    //Informações gerais da votacao
    Proposta[] propostas;
    mapping (address => Votante) condominos;
    address chairman;
    uint dataInicioVotacao;
    uint dataFimVotacao;
    string anoExercicio;
    constructor (string qualAnoExercicio, uint qualDataFimVotacao) public {
        chairman = msg.sender;
        dataFimVotacao = qualDataFimVotacao;
        anoExercicio = qualAnoExercicio;
    }
    function incluiVotante(address enderecoVotante, uint quotaDeVotos) public somenteChairman {
        require(quotaDeVotos < 50, "Quota nao pode ser superior a 50%");
        require(enderecoVotante != address(0), "O votante deve ter um endereco valido");
        Votante memory novoVotante = Votante(enderecoVotante, quotaDeVotos, false, true);
        condominos[enderecoVotante] = novoVotante;
    }
    function criarProposta(string texto, address proponente, uint qualQuotaMinimaParaAprovacao) public somenteChairman {
        Proposta memory proposta = Proposta(
          texto, proponente, 0, qualQuotaMinimaParaAprovacao, true
        );
        propostas.push(proposta);
    }
    function pesquisarProposta(uint salaProposta) public view returns (string, address, uint, uint)  {
        Proposta memory propostaTemporario = propostas[salaProposta];
        if (propostaTemporario.existe) {
            return (
              propostaTemporario.texto, propostaTemporario.proponente,
              propostaTemporario.quotaDeVotos, propostaTemporario.quotaMinimaDeVotos
            );
        } else {
            return ("", 0, 0, 0);
        }
    }
    function totalDePropostas() public view returns (uint) {
        return propostas.length;
    }
    function qualAnoExercicio() public view returns (string) {
        return anoExercicio;
    }
    function PropostaEleita(uint salaProposta) public view returns (bool)  {
        Proposta memory propostaTemporario = propostas[salaProposta];
        if (propostaTemporario.existe) {
            return propostaTemporario.quotaDeVotos>=propostaTemporario.quotaMinimaDeVotos;
        } else {
            return false;
        }
    }
    function quandoEncerraVotacao() public view returns (uint) {
        return dataFimVotacao;
    }
    function votar(uint salaProposta, bool VotoGremio) public returns (bool) {
        require(dataFimVotacao>=now, "Votacao encerrada");
        Proposta storage propostaTemporario = propostas[salaProposta];
        if (propostaTemporario.existe) {
            Votante storage votanteTemporario = condominos[msg.sender];
            if (votanteTemporario.existe == true) {
                if (votanteTemporario.votou == false) {
                    if (VotoGremio == true) {
                        propostaTemporario.quotaDeVotos = propostaTemporario.quotaDeVotos + votanteTemporario.quotaDeVotos;
                    }
                    votanteTemporario.votou = true;
                    return true;
                }
            }
        }
    }
}
