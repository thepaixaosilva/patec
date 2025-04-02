package model;

import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import util.BD;

/**
 * Classe DAO (Data Access Object) responsável por trocar informações com o SGBD
 * através de operações referentes a objetos da Classe AlunoDisicplina.
 */
public class AlunoDisciplinaDAO {
	
	private BD bd;
	private String sql, men;

	/**
	 * Cria uma nova instância de <code>AlunoDisciplinaDAO</code>, e inicializa o
	 * atributo <code>bd</code>, que será utilizado para estabelecer conexão com o
	 * banco de dados.
	 * 
	 * @see BD
	 */
	public AlunoDisciplinaDAO() {
		bd = new BD();
	}

	/**
	 * Registra os dados contidos na instância da classe <code>AlunoDisciplina</code> 
	 * no banco de dados.
	 * 
	 * @param ad - a instância da classe <code>AlunoDisciplina</code>.
	 * @return Uma <code>String</code> que informa se a operação de inserção foi
	 *         bem-sucedida ou não.
	 * @see AlunoDisciplina
	 */
	public String gravar(AlunoDisciplina ad) {
		sql = "INSERT INTO ALUNO_DISCIPLINA VALUES (?, ?)";
		men = "Aluno matriculado na Disciplina com sucesso!";
		bd.getConnection();
		try {
			bd.st = bd.con.prepareStatement(sql);
			bd.st.setString(1, ad.getCodigoDisciplina());
			bd.st.setString(2, ad.getRa());
			int n = bd.st.executeUpdate();
			System.out.println("Linhas inseridas: " + n);
		} catch (SQLException e) {
			men = "Falha" + e;
			System.out.println(men);
		} finally {
			bd.close();
		}
		return men;
	}

	/**
	 * Exclui o registro na tabela Aluno_Disciplina do banco de dados identificado
	 * pelo <code>ra</code>.
	 * 
	 * @param ra - uma <code>String</code> que corresponde ao Registro do Aluno.
	 * @return Uma <code>String</code> que informa se a operação de exclusão foi
	 *         bem-sucedida ou não.
	 */
	public String excluir(String ra) {
		sql = "DELETE FROM ALUNO_DISCIPLINA WHERE ra = ?";
		bd.getConnection();
		try {
			bd.st = bd.con.prepareStatement(sql);
			bd.st.setObject(1, ra);
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
	 * Lista as disciplinas em que o Aluno identificado pelo <code>ra</code>
	 * está matriculado. A listagem é feita em ordem alfabética. 
	 * <p>
	 * Este método é utilizado em um dos JList do PainelCadastroAlunoDisiciplina.
	 * 
	 * @param ra - uma <code>String</code> que corresponde ao Registro do Aluno.
	 * @return Um <code>ArrayList</code> de <code>String</code> com o nome das 
	 * 			disciplinas em que o <code>Aluno</code> está matriculado.
	 */
	public List<String> listarDisciplinasMatriculadas(String ra) {
		List<String> listaDisciplinas = new ArrayList<String>();
		String sql = "SELECT D.nome_disciplina " 
				+ "FROM DISCIPLINA D "
				+ "JOIN ALUNO_DISCIPLINA AD ON D.codigo_disciplina = AD.codigo_disciplina "
				+ "WHERE AD.ra = ? "
				+ "ORDER BY D.nome_disciplina ASC";
		if (bd.getConnection()) {

			try {
				bd.st = bd.con.prepareStatement(sql);
				bd.st.setString(1, ra);
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
	 * Lista as disciplinas em que o Aluno identificado pelo <code>ra</code>
	 * NÃO está matriculado. A listagem é feita em ordem alfabética. 
	 * <p>
	 * Este método é utilizado em um dos JList do PainelCadastroAlunoDisiciplina.
	 * 
	 * @param ra - uma <code>String</code> que corresponde ao Registro do Aluno.
	 * @return Um <code>ArrayList</code> de <code>String</code> com o nome das 
	 * 			disciplinas em que o <code>Aluno</code> NÃO está matriculado.
	 */
	public List<String> listarDisciplinasNaoMatriculadas(String ra) {
		List<String> listaDisciplinas = new ArrayList<String>();
		String sql = "SELECT D.nome_disciplina " 
				+ "FROM DISCIPLINA D "
				+ "LEFT JOIN ALUNO_DISCIPLINA AD ON D.codigo_disciplina = AD.codigo_disciplina AND AD.ra = ? "
				+ "WHERE AD.codigo_disciplina IS NULL "
				+ "ORDER BY D.nome_disciplina ASC";
		if (bd.getConnection()) {

			try {
				bd.st = bd.con.prepareStatement(sql);
				bd.st.setString(1, ra);
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
		
}
