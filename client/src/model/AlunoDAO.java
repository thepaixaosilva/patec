package model;

import java.sql.SQLException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

import javax.swing.table.DefaultTableModel;
import javax.swing.table.TableModel;

import util.BD;
import view.components.TableModelPatec;

/**
 * Classe DAO (Data Access Object) responsável por trocar informações com o SGBD
 * através de operações referentes a objetos da Classe Aluno.
 */
public class AlunoDAO {

	private BD bd;
	private String sql, men;

	/**
	 * Cria uma nova instância de <code>AlunoDAO</code>, e inicializa o atributo
	 * <code>bd</code>, que será utilizado para estabelecer conexão com o banco de
	 * dados.
	 * 
	 * @see BD
	 */
	public AlunoDAO() {
		bd = new BD();
	}

	/**
	 * Registra os dados contidos na instância da classe <code>Aluno</code> no banco
	 * de dados.
	 * <p>
	 * Caso os dados não existam no banco de dados, será criado um novo registro
	 * contendo eles; Caso existam, os dados serão atualizados tendo como base o
	 * registro cujo identificador está contido no atributo <code>ra</code>.
	 * 
	 * @param a - a instância da classe <code>Aluno</code>.
	 * @return Uma <code>String</code> que informa se a operação de
	 *         inserção/alteração foi bem-sucedida ou não.
	 * @see Aluno
	 */
	public String gravar(Aluno a) {
		sql = "SET DATEFORMAT 'DMY'; INSERT INTO ALUNO VALUES (?, ?, ?, ?)";
		men = "Aluno inserido com sucesso!";
		bd.getConnection();
		try {
			bd.st = bd.con.prepareStatement(sql);
			bd.st.setString(1, a.getRa());
			bd.st.setString(2, a.getCpf());
			bd.st.setString(3, a.getNomeAluno());
			bd.st.setString(4, a.getDataNascimento());
			int n = bd.st.executeUpdate();
			System.out.println("Linhas inseridas: " + n);
		} catch (SQLException e) {
			sql = "SET DATEFORMAT 'DMY'; UPDATE ALUNO SET cpf = ?, nome_aluno = ?, data_nascimento = ? WHERE ra = ?";
			try {
				bd.st = bd.con.prepareStatement(sql);
				bd.st.setString(1, a.getCpf());
				bd.st.setString(2, a.getNomeAluno());
				bd.st.setString(3, a.getDataNascimento());
				bd.st.setString(4, a.getRa());
				int n = bd.st.executeUpdate();
				System.out.println("Linhas alteradas: " + n);
				if (n == 1) {
					men = "Aluno alterado com sucesso!";
				} else {
					men = "Aluno não encontrado!";
				}
			} catch (SQLException e2) {
				men = "Falha" + e;
				System.out.println(men);
			}
		} finally {
			bd.close();
		}
		return men;
	}

	/**
	 * Exclui o registro da tabela Aluno do banco de dados identificado pelo
	 * <code>ra</code>.
	 * 
	 * @param ra - uma <code>String</code> que corresponde ao Registro do Aluno.
	 * @return Uma <code>String</code> que informa se a operação de exclusão foi
	 *         bem-sucedida ou não.
	 */
	public String excluir(Object ra) {
		sql = "DELETE FROM ALUNO WHERE ra = ?";
		bd.getConnection();
		try {
			bd.st = bd.con.prepareStatement(sql);
			bd.st.setObject(1, ra);
			int n = bd.st.executeUpdate();
			System.out.println("Linhas excluídas: " + n);
			if (n == 1) {
				men = "Aluno excluído com sucesso!";
			} else {
				men = "Aluno não encontrado!";
			}
		} catch (SQLException e) {
			men = "Falha" + e;
		} finally {
			bd.close();
		}
		return men;
	}

	/**
	 * Obtém os dados do aluno com base nos valores inseridos na tela de log-in.
	 * Caso a consulta não retorne nenhum registro, o método retornará uma instância
	 * de <code>Aluno</code>, cujo valor é <code>null</code>, impedindo o acesso ao
	 * sistema.
	 * 
	 * @param cpf            - uma <code>String</code>, que corresponde ao cpf do
	 *                       aluno.
	 * @param dataNascimento - uma <code>String</code>, que corresponde à data de
	 *                       nascimento do aluno.
	 * @return Uma instância de <code>Aluno</code>, contendo os dados obtidos na
	 *         consulta, ou <code>null</code>, caso a consulta não retorne nenhum
	 *         registro.
	 */
	public Aluno realizarLogin(String cpf, String dataNascimento) {
		bd = new BD();
		String dia = new String();
		String mes = new String();
		String ano = new String();
		Aluno a = null;

		for (int i = 0; i < dataNascimento.length(); i++) {
			if (i < 2) {
				dia += dataNascimento.charAt(i);
			} else if (i < 4) {
				mes += dataNascimento.charAt(i);
			} else {
				ano += dataNascimento.charAt(i);
			}
		}

		String dataFormatada = new String();
		dataFormatada = dia + "-" + mes + "-" + ano;

		String sql = "SET DATEFORMAT 'DMY'; SELECT * FROM ALUNO WHERE cpf = ? AND data_nascimento = ?;";
		bd.getConnection();
		try {
			bd.st = bd.con.prepareStatement(sql);
			bd.st.setString(1, cpf);
			bd.st.setString(2, dataFormatada);
			bd.rs = bd.st.executeQuery();
			if (bd.rs.next()) {
				a = new Aluno(bd.rs.getString("ra"), bd.rs.getString("cpf"), bd.rs.getString("nome_aluno"),
						bd.rs.getString("data_nascimento"));
			}
		} catch (Exception e) {
		} finally {
			bd.close();
		}
		return a;
	}

	/**
	 * Retorna os dados de um aluno contidos em uma instância de <code>Aluno</code>.
	 * <p>
	 * Este método utiliza o parâmetro <code>ra</code> como referência para a
	 * obtenção dos dados referentes àquele aluno.
	 * 
	 * @param ra - uma <code>String</code> que corresponde ao Registro do Aluno.
	 * @return Uma instância de <code>Alunos</code>, e seus respectivos valores
	 *         contidos nos atributos.
	 */
	public Aluno obterAluno(String ra) {
		BD bd = new BD();
		Aluno a = null;

		String sql = "SELECT * FROM ALUNO WHERE ra = ?;";
		bd.getConnection();
		try {
			bd.st = bd.con.prepareStatement(sql);
			bd.st.setString(1, ra);
			bd.rs = bd.st.executeQuery();
			if (bd.rs.next()) {
				a = new Aluno(bd.rs.getString("ra"), bd.rs.getString("cpf"), bd.rs.getString("nome_aluno"),
						bd.rs.getString("data_nascimento"));

			}
		} catch (Exception e) {
			System.out.println(e);
		} finally {
			bd.close();
		}

		return a;
	}

	/**
	 * Retorna os dados referentes às avaliações realizadas pelo Aluno identificado
	 * pelo <code>ra</code> e na data de avaliação identificada pela
	 * <code>dataAvaliacao</code>.
	 * <p>
	 * Este método é utilizado para geração do relatório pelo Aluno.
	 * 
	 * @param ra            - uma <code>String</code> que corresponde ao Registro do
	 *                      Aluno.
	 * @param dataAvaliacao - uma <code>String</code> que corresponde à Data de
	 *                      Realização da Avaliação.
	 * @return Um {@code Map<Integer, Object>} com dados das
	 *         <code>Folhas de Respostas</code> que foram preenchidas pelo Aluno
	 *         informado na data informada. Dados: codigoDisciplina, nomeDisciplina,
	 *         respostas preenchidase a nota obtida em cada avaliação que o Aluno
	 *         realizou.
	 */
	public Map<Integer, Object> GerarRelatorioAluno(String ra, String dataAvaliacao) {
		BD bd = new BD();
		Map<Integer, Object> matrizDados = new HashMap<>();

		String sql = "SELECT GABARITO_OFICIAL.codigo_disciplina, DISCIPLINA.nome_disciplina, FOLHA_DE_RESPOSTAS.resposta_1, FOLHA_DE_RESPOSTAS.resposta_2, FOLHA_DE_RESPOSTAS.resposta_3, FOLHA_DE_RESPOSTAS.resposta_4, FOLHA_DE_RESPOSTAS.resposta_5, FOLHA_DE_RESPOSTAS.nota FROM DISCIPLINA, FOLHA_DE_RESPOSTAS\r\n"
				+ "JOIN GABARITO_OFICIAL ON FOLHA_DE_RESPOSTAS.codigo_gabarito = GABARITO_OFICIAL.codigo_gabarito\r\n"
				+ "JOIN AVALIACAO ON GABARITO_OFICIAL.codigo_avaliacao = AVALIACAO.codigo_avaliacao\r\n"
				+ "WHERE DISCIPLINA.codigo_disciplina = GABARITO_OFICIAL.codigo_disciplina\r\n"
				+ "AND FOLHA_DE_RESPOSTAS.ra = ? AND AVALIACAO.data_avaliacao = ?;";
		bd.getConnection();
		try {
			bd.st = bd.con.prepareStatement(sql);
			bd.st.setString(1, ra);
			bd.st.setString(2, dataAvaliacao);
			bd.rs = bd.st.executeQuery();
			int i = 0;
			while (bd.rs.next()) {
				ArrayList<Object> vetorDados = new ArrayList<>();
				vetorDados.add(bd.rs.getString("codigo_disciplina"));
				vetorDados.add(bd.rs.getString("nome_disciplina"));
				vetorDados.add(bd.rs.getString("resposta_1"));
				vetorDados.add(bd.rs.getString("resposta_2"));
				vetorDados.add(bd.rs.getString("resposta_3"));
				vetorDados.add(bd.rs.getString("resposta_4"));
				vetorDados.add(bd.rs.getString("resposta_5"));
				vetorDados.add(bd.rs.getInt("nota"));
				matrizDados.put(i, vetorDados);
				i++;
			}
		} catch (Exception e) {
			System.out.println(e);
		} finally {
			bd.close();
		}

		return matrizDados;
	}
	
	/**
	 * Carrega todos os dados da tabela <code>ALUNO</code> do banco de dados.
	 * <p>
	 * Este método é utilizado para listar todos os Alunos em formato de tabela
	 * no <code>PainelListarAlunos</code>.
	 * 
	 * @return Um <code>TableModel</code> contendo os dados de todos os Alunos.
	 */
	public TableModel carregarTabelaListarAlunos() {
		DefaultTableModel model = null;
		
		String sql = "SELECT ra AS RA, cpf AS CPF, nome_aluno AS Nome, data_nascimento AS 'Data Nasc.' FROM ALUNO";
		try {
			if(bd.getConnection()) {
				model = TableModelPatec.getModel(bd, sql);
			}			
		} catch (Exception e) {
			System.out.println(e);
		} finally {
			bd.close();
		}

		return model;
	}

	/**
	 * Carrega o ra e o nome_aluno da tabela <code>ALUNO</code> do banco de dados.
	 * <p>
	 * Este método é utilizado para listar os Alunos em formato de tabela no <code>PainelSelecionarAluno</code> 
	 * permitindo que o usuário selecione o aluno referente ao relatório que deseja gerar.
	 * 
	 * @return Um <code>TableModel</code> contendo o ra e o nome de todos os Alunos.
	 */
	public TableModel carregarTabelaSelecionarAluno() {
		DefaultTableModel model = null;
		
		String sql = "SELECT ra AS RA, nome_aluno AS Nome FROM ALUNO";
		try {
			if(bd.getConnection()) {
				model = TableModelPatec.getModel(bd, sql);
			}			
		} catch (Exception e) {
			System.out.println(e);
		} finally {
			bd.close();
		}

		return model;
	}
	
	/**
	 * Carrega os dados referentes às avaliações realizadas pelo Aluno identificado 
	 * pelo <code>ra</code> e na data de avaliação identificada pela <code>dataAvaliacao</code>.
	 * <p>
	 * Este método é utilizado para listar os dados do relatório em formato de tabela
	 * no <code>PainelRelatorioAluno</code>.  
	 * O query sql é igual ao do método <code>GerarRelatorioAluno</code>, porém a manipulação do dado 
	 * é diferente.
	 * 
	 * @param ra - uma <code>String</code> que corresponde ao Registro do Aluno.
	 * @param dataAvaliacao - uma <code>String</code> que corresponde à Data de Realização da Avaliação.
	 * @return Um <code>TableModel</code> contendo os dados do relatório.
	 */
	public TableModel carregarTabelaRelatorioAluno(String ra, String dataAvaliacao) {
		DefaultTableModel model = null;
		
		String sql = "SET DATEFORMAT 'DMY';\r\n"
				+ "SELECT GABARITO_OFICIAL.codigo_disciplina AS 'Cód. Disciplina', DISCIPLINA.nome_disciplina AS 'Nome da Disciplina', FOLHA_DE_RESPOSTAS.resposta_1 AS 'Resposta - 1', FOLHA_DE_RESPOSTAS.resposta_2 AS 'Resposta - 2', FOLHA_DE_RESPOSTAS.resposta_3 AS 'Resposta - 3', FOLHA_DE_RESPOSTAS.resposta_4 AS 'Resposta - 4', FOLHA_DE_RESPOSTAS.resposta_5 AS 'Resposta - 5', FOLHA_DE_RESPOSTAS.nota AS Nota FROM DISCIPLINA, FOLHA_DE_RESPOSTAS\r\n"
				+ "JOIN GABARITO_OFICIAL ON FOLHA_DE_RESPOSTAS.codigo_gabarito = GABARITO_OFICIAL.codigo_gabarito\r\n"
				+ "JOIN AVALIACAO ON GABARITO_OFICIAL.codigo_avaliacao = AVALIACAO.codigo_avaliacao\r\n"
				+ "WHERE DISCIPLINA.codigo_disciplina = GABARITO_OFICIAL.codigo_disciplina\r\n"
				+ "AND FOLHA_DE_RESPOSTAS.ra = " + ra + " AND AVALIACAO.data_avaliacao = '" + dataAvaliacao + "';";
		bd.getConnection();
		try {
			if (bd.getConnection()) {
				model = TableModelPatec.getModel(bd, sql);			
			}									
		} catch (Exception e) {
			System.out.println(e);
		} finally {
			bd.close();
		}

		return model;
	}

}
