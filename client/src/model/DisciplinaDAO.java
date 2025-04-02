package model;

import java.sql.SQLException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.swing.table.DefaultTableModel;
import javax.swing.table.TableModel;

import util.BD;
import view.components.TableModelPatec;

/**
 * Classe DAO (Data Access Object) responsável por trocar informações com o SGBD
 * através de operações referentes a objetos da Classe Disciplina.
 */
public class DisciplinaDAO {

	private BD bd;
	private String sql, men;

	/**
	 * Cria uma nova instância de <code>DisciplinaDAO</code>, e inicializa o
	 * atributo <code>bd</code>, que será utilizado para estabelecer conexão com o
	 * banco de dados.
	 * 
	 * @see BD
	 */
	public DisciplinaDAO() {
		bd = new BD();
	}

	/**
	 * Registra os dados contidos na instância da classe <code>Disciplina</code> no
	 * banco de dados.
	 * <p>
	 * Caso os dados não existam no banco de dados, será criado um novo registro
	 * contendo eles; Caso existam, os dados serão atualizados tendo como base o
	 * registro cujo código está contido no atributo <code>codigoDisciplina</code>.
	 * 
	 * @param d - a instância da classe <code>Disciplina</code>.
	 * @return Uma <code>String</code> que informa se a operação de
	 *         inserção/alteração foi bem-sucedida ou não.
	 * @see Disciplina
	 */
	public String gravar(Disciplina d) {
		sql = "INSERT INTO DISCIPLINA VALUES (?, ?, ?)";
		men = "Disciplina inserida com sucesso!";
		bd.getConnection();
		try {
			bd.st = bd.con.prepareStatement(sql);
			bd.st.setString(1, d.getCodigoDisciplina());
			bd.st.setString(2, d.getNomeDisciplina());
			bd.st.setInt(3, d.getSemestreDisciplina());
			int n = bd.st.executeUpdate();
			System.out.println("Linhas inseridas: " + n);
		} catch (SQLException e) {
			sql = "UPDATE DISCIPLINA SET nome_disciplina = ?, semestre_disciplina = ? WHERE codigo_disciplina = ?";
			try {
				bd.st = bd.con.prepareStatement(sql);
				bd.st.setString(1, d.getNomeDisciplina());
				bd.st.setInt(2, d.getSemestreDisciplina());
				bd.st.setString(3, d.getCodigoDisciplina());
				int n = bd.st.executeUpdate();
				System.out.println("Linhas alteradas: " + n);
				if (n == 1) {
					men = "Disciplina alterada com sucesso!";
				} else {
					men = "Disciplina não encontrada!";
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
	 * Exclui o registro na tabela Disciplina do banco de dados identificado pelo
	 * <code>codigoDisciplina</code>.
	 * 
	 * @param codigoDisciplina - um <code>Object</code> que corresponde ao Registro
	 *                         da Disciplina.
	 * @return Uma <code>String</code> que informa se a operação de exclusão foi
	 *         bem-sucedida ou não.
	 */
	public String excluir(Object codigoDisciplina) {
		sql = "DELETE FROM DISCIPLINA WHERE codigo_disciplina = ?";
		bd.getConnection();
		try {
			bd.st = bd.con.prepareStatement(sql);
			bd.st.setObject(1, codigoDisciplina);
			int n = bd.st.executeUpdate();
			System.out.println("Linhas excluídas: " + n);
			if (n == 1) {
				men = "Disciplina excluída com sucesso!";
			} else {
				men = "Disciplina não encontrada!";
			}
		} catch (SQLException e) {
			men = "Falha" + e;
		} finally {
			bd.close();
		}
		return men;
	}

	/**
	 * Lista os semestres das disciplinas em que o Aluno identificado pelo
	 * <code>ra</code> está matriculado.
	 * <p>
	 * Este método é utilizado em um dos JComboBox do PainelMenuAluno.
	 * 
	 * @param ra - uma <code>String</code> que corresponde ao Registro do Aluno.
	 * @return Um <code>ArrayList</code> de <code>String</code> com os semestres das
	 *         disciplinas em que o <code>Aluno</code> está matriculado.
	 */
	public List<String> listarSemestres(String ra) {
		List<String> listaSemestres = new ArrayList<String>();
		listaSemestres.add("-- selecione uma semestre --");
		if (bd.getConnection()) {
			String sql = "SELECT DISTINCT D.semestre_disciplina " + "FROM DISCIPLINA D "
					+ "JOIN ALUNO_DISCIPLINA AD ON D.codigo_disciplina = AD.codigo_disciplina "
					+ "JOIN ALUNO A ON A.ra = AD.ra " + "WHERE A.ra = ?";
			try {
				bd.st = bd.con.prepareStatement(sql);
				bd.st.setString(1, ra);
				bd.rs = bd.st.executeQuery();

				while (bd.rs.next()) {
					listaSemestres.add(bd.rs.getString("semestre_disciplina") + "° SEM");
				}
			} catch (SQLException e) {
				System.out.println(e);
			} finally {
				bd.close();
			}
		} else {
			System.out.println("Falha na conexão.");
		}

		return listaSemestres;
	}

	/**
	 * Lista o nome das disciplinas do <code>semestre</code> informado em que o
	 * Aluno identificado pelo <code>ra</code> está matriculado.
	 * <p>
	 * Este método é utilizado em um dos JComboBox do PainelMenuAluno.
	 * 
	 * @param ra       - uma <code>String</code> que corresponde ao Registro do
	 *                 Aluno.
	 * @param semestre - um valor do tipo <code>int</code>, que corresponde ao
	 *                 semestre da disciplina.
	 * @return Um <code>ArrayList</code> de <code>String</code> com o nome das
	 *         disciplinas em que o <code>Aluno</code> está matriculado.
	 */
	public List<String> listarDisciplinas(String ra, int semestre) {
		List<String> listaDisciplinas = new ArrayList<String>();
		listaDisciplinas.add("-- selecione uma disciplina --");
		if (bd.getConnection()) {
			String sql = "SELECT DISCIPLINA.nome_disciplina FROM DISCIPLINA\r\n"
					+ "JOIN ALUNO_DISCIPLINA ON DISCIPLINA.codigo_disciplina = ALUNO_DISCIPLINA.codigo_disciplina\r\n"
					+ "JOIN ALUNO ON ALUNO_DISCIPLINA.ra = ALUNO.ra\r\n"
					+ "WHERE ALUNO.ra = ? AND DISCIPLINA.semestre_disciplina = ?";
			try {
				bd.st = bd.con.prepareStatement(sql);
				bd.st.setString(1, ra);
				bd.st.setInt(2, semestre);
				bd.rs = bd.st.executeQuery();

				while (bd.rs.next()) {
					listaDisciplinas.add(bd.rs.getString("nome_disciplina"));
				}
			} catch (SQLException e) {
				System.out.println(e);
			} finally {
				bd.close();
			}
		} else {
			System.out.println("Falha na conexão.");
		}

		return listaDisciplinas;
	}

	/**
	 * Cria um objeto do tipo <code>HashMap</code> e insere nele os dados da
	 * disciplina que foi informada e do gabarito dessa disciplina que possui a
	 * <code>dataAvaliação</code> mais próxima.
	 * <p>
	 * Este método é utilizado no PainelMenuAluno antes do Aluno iniciar uma
	 * avaliação e o objeto de retorno é enviado como parâmetro para o
	 * PainelFolhaDeRespostas. O objeto é utilizado na correção automática das
	 * avaliações, pois carrega em si o gabarito referente à avaliação que o Aluno
	 * irá realizar.
	 * 
	 * @param disciplina - uma <code>String</code> que corresponde ao Nome da
	 *                   Disciplina.
	 * @return Um {@code Map<String, Object>} com dados da disciplina que o
	 *         <code>Aluno</code> selecionou para realizar avaliação e o gabarito
	 *         referente a essa avaliação.
	 */
	public Map<String, Object> obterDadosParaAvaliacao(String disciplina) {
		Map<String, Object> obj = new HashMap<>();

		if (bd.getConnection()) {
			String sql = "SELECT TOP 1 D.*, G.codigo_gabarito, A.data_avaliacao " + "FROM DISCIPLINA D "
					+ "JOIN GABARITO_OFICIAL G ON D.codigo_disciplina = G.codigo_disciplina "
					+ "JOIN AVALIACAO A ON G.codigo_avaliacao = A.codigo_avaliacao "
					+ "WHERE D.nome_disciplina = ? AND DATEPART(DAYOFYEAR,A.data_avaliacao) >= DATEPART(DAYOFYEAR,GETDATE())"
					+ "ORDER BY A.data_avaliacao ASC";
			try {
				bd.st = bd.con.prepareStatement(sql);
				bd.st.setString(1, disciplina);
				bd.rs = bd.st.executeQuery();
				while (bd.rs.next()) {
					obj.put("nomeDisciplina", bd.rs.getString("nome_disciplina"));
					obj.put("codigoDisciplina", bd.rs.getString("codigo_disciplina"));
					obj.put("codigoGabarito", bd.rs.getInt("codigo_gabarito"));
				}
			} catch (SQLException e) {
				System.out.println(e);
			} finally {
				bd.close();
			}
		} else {
			System.out.println("Falha na conexão.");
		}

		return obj;
	}

	/**
	 * Lista o nome de todas as disciplinas cadastradas.
	 * <p>
	 * Este método é utilizado em um dos JComboBox do PainelConsultaRelatorio para
	 * listar as disciplinas das quais o relatório pode ser gerado.
	 * 
	 * @return Um <code>ArrayList</code> de <code>String</code> com o nome de todas
	 *         as disciplinas cadastradas.
	 */
	public List<String> obterTodasDisciplinas() {
		List<String> listaDisciplinas = new ArrayList<String>();
		String sql = "SELECT nome_disciplina FROM DISCIPLINA";

		listaDisciplinas.add("-- selecione uma disciplina --");
		if (bd.getConnection()) {

			try {
				bd.st = bd.con.prepareStatement(sql);
				bd.rs = bd.st.executeQuery();

				while (bd.rs.next()) {
					listaDisciplinas.add(bd.rs.getString("nome_disciplina"));
				}
			} catch (SQLException e) {
				System.out.println(e);
			} finally {
				bd.close();
			}
		} else {
			System.out.println("Falha na conexão.");
		}
		return listaDisciplinas;
	}

	/**
	 * Retorna os dados referentes às avaliações da Disciplina identificada pelo
	 * <code>nomeDisciplina</code> que foram realizadas na data de avaliação
	 * identificada pela <code>dataAvaliacao</code>.
	 * <p>
	 * Este método é utilizado para geração do relatório por Disciplina.
	 * 
	 * @param nomeDisciplina - uma <code>String</code> que corresponde ao Nome da
	 *                       Disciplina.
	 * @param dataAvaliacao  - uma <code>String</code> que corresponde à Data de
	 *                       Realização da Avaliação.
	 * @return Um {@code Map<String, Object>} com dados dos
	 *         <code>Alunos</code> que realizaram a avaliação da disciplina na data
	 *         informada. Dados: ra, nome e a nota obtida em cada avaliação que
	 *         realizou.
	 */
	public Map<Integer, Object> GerarRelatorioDisciplina(String nomeDisciplina, String dataAvaliacao) {
		Map<Integer, Object> matrizDados = new HashMap<>();

		String sql = "SELECT ALUNO.ra, ALUNO.nome_aluno, FOLHA_DE_RESPOSTAS.nota FROM AVALIACAO, FOLHA_DE_RESPOSTAS\r\n"
				+ "JOIN ALUNO ON FOLHA_DE_RESPOSTAS.ra = ALUNO.ra\r\n"
				+ "JOIN GABARITO_OFICIAL ON FOLHA_DE_RESPOSTAS.codigo_gabarito = GABARITO_OFICIAL.codigo_gabarito\r\n"
				+ "JOIN DISCIPLINA ON GABARITO_OFICIAL.codigo_disciplina = DISCIPLINA.codigo_disciplina\r\n"
				+ "WHERE AVALIACAO.codigo_avaliacao = GABARITO_OFICIAL.codigo_avaliacao\r\n"
				+ "AND DISCIPLINA.nome_disciplina = ?\r\n" + "AND AVALIACAO.data_avaliacao = ?;";
		bd.getConnection();
		try {
			bd.st = bd.con.prepareStatement(sql);
			bd.st.setString(1, nomeDisciplina);
			bd.st.setString(2, dataAvaliacao);
			bd.rs = bd.st.executeQuery();
			int i = 0;
			while (bd.rs.next()) {
				ArrayList<Object> vetorDados = new ArrayList<>();
				vetorDados.add(bd.rs.getString("ra"));
				vetorDados.add(bd.rs.getString("nome_aluno"));
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
	 * Retorna o código da disciplina identificada pelo <code>nomeDisciplina</code>.
	 * <p>
	 * Este método é utilizado antes da gravação de objetos de classes que possuem a
	 * chave estrangeira <code>codigoDisciplina</code>. Nas interfaces, apenas os
	 * nomes das Disciplina são exibidos, porém, para gravar um objeto é necessário
	 * utilizar o código da Disciplina. Assim, este método é utilizado.
	 * 
	 * @param nomeDisciplina - uma <code>String</code> que corresponde ao Nome da
	 *                       Disciplina.
	 * @return Uma <code>String</code> contendo o código da disciplina informada.
	 */
	public String obterCodigoDisciplina(String nomeDisciplina) {
		String codigoDisciplina = new String();
		String sql = "SELECT codigo_disciplina FROM DISCIPLINA " + "WHERE nome_disciplina = ?";
		bd.getConnection();
		try {
			bd.st = bd.con.prepareStatement(sql);
			bd.st.setString(1, nomeDisciplina);
			bd.rs = bd.st.executeQuery();
			while (bd.rs.next()) {
				codigoDisciplina = bd.rs.getString("codigo_disciplina");
			}

		} catch (Exception e) {
			System.out.println(e);
		} finally {
			bd.close();
		}

		return codigoDisciplina;

	}

	/**
	 * Retorna o nome da disciplina identificada pelo <code>codigoDisciplina</code>.
	 * <p>
	 * Este método é utilizado no PainelEditarGabarito para melhorar visualmente a
	 * experiência do usuário ao apresentar o nome da Disciplina ao invés de seu
	 * código.
	 * 
	 * @param codigoDisciplina - uma <code>String</code> que corresponde ao Registro
	 *                         da Disciplina.
	 * @return Uma <code>String</code> contendo o nome da Disciplina informada.
	 */
	public String obterNomeDisciplina(String codigoDisciplina) {
		String nomeDisciplina = new String();
		String sql = "SELECT nome_disciplina FROM DISCIPLINA " + "WHERE codigo_disciplina = ?";
		bd.getConnection();
		try {
			bd.st = bd.con.prepareStatement(sql);
			bd.st.setString(1, codigoDisciplina);
			bd.rs = bd.st.executeQuery();
			while (bd.rs.next()) {
				nomeDisciplina = bd.rs.getString("nome_disciplina");
			}

		} catch (Exception e) {
			System.out.println(e);
		} finally {
			bd.close();
		}

		return nomeDisciplina;
	}

	/**
	 * Carrega todos os dados da tabela <code>DISCIPLINA</code> do banco de dados.
	 * <p>
	 * Este método é utilizado para listar todas as Disciplinas em formato de tabela
	 * no <code>PainelListarDisciplinas</code>.
	 * 
	 * @return Um <code>TableModel</code> contendo os dados de todas as Disciplinas.
	 */
	public TableModel carregarTabelaListarDisciplinas() {
		DefaultTableModel model = null;

		String sql = "SELECT codigo_disciplina AS Código, nome_disciplina AS Nome, semestre_disciplina AS Semestre FROM DISCIPLINA";
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

	/**
	 * Carrega os dados referentes às avaliações da Disciplina identificada pelo
	 * <code>nomeDisciplina</code> que foram realizadas na data de avaliação
	 * identificada pela <code>dataAvaliacao</code>.
	 * <p>
	 * Este método é utilizado para listar os dados do relatório em formato de
	 * tabela no <code>PainelRelatorioDisciplina</code>. O query sql é igual ao do
	 * método <code>GerarRelatorioDisciplina</code>, porém a manipulação do dado é
	 * diferente.
	 * 
	 * @param nomeDisciplina - uma <code>String</code> que corresponde ao Nome da
	 *                       Disciplina.
	 * @param dataAvaliacao  - uma <code>String</code> que corresponde à Data de
	 *                       Realização da Avaliação.
	 * @return Um <code>TableModel</code> contendo os dados do relatório.
	 */
	public TableModel carregarTabelaRelatorioDisciplina(String nomeDisciplina, String dataAvaliacao) {
		DefaultTableModel model = null;

		String sql = "SELECT ALUNO.ra AS RA, ALUNO.nome_aluno AS Nome, FOLHA_DE_RESPOSTAS.nota AS Nota FROM AVALIACAO, FOLHA_DE_RESPOSTAS\r\n"
				+ "JOIN ALUNO ON FOLHA_DE_RESPOSTAS.ra = ALUNO.ra\r\n"
				+ "JOIN GABARITO_OFICIAL ON FOLHA_DE_RESPOSTAS.codigo_gabarito = GABARITO_OFICIAL.codigo_gabarito\r\n"
				+ "JOIN DISCIPLINA ON GABARITO_OFICIAL.codigo_disciplina = DISCIPLINA.codigo_disciplina\r\n"
				+ "WHERE AVALIACAO.codigo_avaliacao = GABARITO_OFICIAL.codigo_avaliacao\r\n"
				+ "AND DISCIPLINA.nome_disciplina = '" + nomeDisciplina + "'\r\n" + "AND AVALIACAO.data_avaliacao = '"
				+ dataAvaliacao + "';";
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
