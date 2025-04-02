package model;

import java.sql.SQLException;
import java.util.Map;

import util.BD;

/**
 * Classe DAO (Data Access Object) responsável por trocar informações com o SGBD
 * através de operações referentes a objetos da Classe FolhaDeRespostas.
 */
public class FolhaDeRespostasDAO {

	private BD bd;
	private String sql, men;

	/**
	 * Cria uma nova instância de <code>FolhaDeRespostasDAO</code>, e inicializa o
	 * atributo <code>bd</code>, que será utilizado para estabelecer conexão com o
	 * banco de dados.
	 * 
	 * @see BD
	 */
	public FolhaDeRespostasDAO() {
		bd = new BD();
	}

	/**
	 * Registra os dados contidos na instância da classe <code>FolhaDeRespostas</code> 
	 * no banco de dados.
	 * 
	 * @param f - a instância da classe <code>FolhaDeRespostas</code>.
	 * @return Uma <code>String</code> que informa se a operação de inserção foi
	 *         bem-sucedida ou não.
	 * @see FolhaDeRespostas
	 */
	public String gravar(FolhaDeRespostas f) {
		sql = "INSERT INTO FOLHA_DE_RESPOSTAS VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
		men = "Folha de respostas gravada com sucesso!";
		bd.getConnection();
		try {
			bd.st = bd.con.prepareStatement(sql);
			bd.st.setString(1, Character.toString(f.getResposta1()));
			bd.st.setString(2, Character.toString(f.getResposta2()));
			bd.st.setString(3, Character.toString(f.getResposta3()));
			bd.st.setString(4, Character.toString(f.getResposta4()));
			bd.st.setString(5, Character.toString(f.getResposta5()));
			bd.st.setInt(6, f.getNota());
			bd.st.setInt(7, f.getCodigoGabarito());
			bd.st.setString(8, f.getRa());
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
	 * Verifica se determinado aluno já realizou a avaliação de uma de determinada
	 * disciplina. Esse método é utilizado para não permitir que um Aluno realize 
	 * uma mesma avaliação mais que uma vez.
	 * 
	 * @param obj - a disciplina selecionada no <code>PainelMenuAluno</code>.
	 * @param a   - a instância de <code>Aluno</code> contendo os dados do aluno.
	 * @return
	 *         <ul>
	 *         <li><code>true</code>, caso o aluno já tenha realizado a avaliação
	 *         anteriormente;</li>
	 *         <li><code>false</code>, caso o aluno ainda não tenha realizado aquela
	 *         avaliação.</li>
	 *         </ul>
	 */
	public boolean verificarStatus(Map<String, Object> obj, Aluno a) {
		BD bd = new BD();
		boolean provaRealizada = true;
		if (bd.getConnection()) {
			String sql = "SELECT * FROM FOLHA_DE_RESPOSTAS " 
					+ "WHERE codigo_gabarito = ? AND ra = ?";
			try {
				bd.st = bd.con.prepareStatement(sql);
				bd.st.setInt(1, (int) obj.get("codigoGabarito"));
				bd.st.setString(2, a.getRa());
				bd.rs = bd.st.executeQuery();

				if (!bd.rs.next()) {
					provaRealizada = false;
				}
			} catch (SQLException e) {
				System.out.println(e);
			} finally {
				bd.close();
			}
		} else {
			System.out.println("Falha na conexão.");
		}

		return provaRealizada;
	}
}
