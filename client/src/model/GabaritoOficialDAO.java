package model;

import java.sql.SQLException;

import javax.swing.table.DefaultTableModel;
import javax.swing.table.TableModel;

import util.BD;
import view.components.TableModelPatec;

/**
 * Classe DAO (Data Access Object) responsável por trocar informações com o SGBD
 * através de operações referentes a objetos da Classe GabaritoOficial.
 */
public class GabaritoOficialDAO {

	private BD bd;
	private String sql, men;

	/**
	 * Cria uma nova instância de <code>GabaritoOficialDAO</code>, e inicializa o
	 * atributo <code>bd</code>, que será utilizado para estabelecer conexão com o
	 * banco de dados.
	 * 
	 * @see BD
	 */
	public GabaritoOficialDAO() {
		bd = new BD();
	}

	/**
	 * Registra os dados contidos na instância da classe <code>GabaritoOficial</code> 
	 * no banco de dados.
	 * 
	 * @param go - a instância da classe <code>GabaritoOficial</code>.
	 * @return Uma <code>String</code> que informa se a operação de inserção foi
	 *         bem-sucedida ou não.
	 * @see GabaritoOficial 
	 */
	public String gravar(GabaritoOficial go) {
		sql = "INSERT INTO GABARITO_OFICIAL VALUES (?, ?, ?, ?, ?, ?, ?)";
		men = "Gabarito gravado com sucesso!";
		bd.getConnection();
		try {
			bd.st = bd.con.prepareStatement(sql);
			bd.st.setString(1, Character.toString(go.getQuestao1()));
			bd.st.setString(2, Character.toString(go.getQuestao2()));
			bd.st.setString(3, Character.toString(go.getQuestao3()));
			bd.st.setString(4, Character.toString(go.getQuestao4()));
			bd.st.setString(5, Character.toString(go.getQuestao5()));
			bd.st.setString(6, go.getCodigoDisciplina());
			bd.st.setInt(7, go.getCodigoAvaliacao());
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
	 * Edita um registro da tabela Gabarito_Oficial do banco de dados, utilizando os
	 * dados inseridos na instância de <code>GabaritoOficial</code>.
	 * 
	 * @param go - a instância da classe <code>GabaritoOficial</code>.
	 * @return Uma <code>String</code> que informa se a operação de edição foi
	 *         bem-sucedida ou não.
	 */
	public String editar(GabaritoOficial go) {
		sql = "UPDATE GABARITO_OFICIAL SET questao_1 = ?, questao_2 = ?, questao_3 = ?, "
				+ "questao_4 = ?, questao_5 = ?, codigo_disciplina = ?, codigo_avaliacao = ?  "
				+ "WHERE codigo_gabarito = ?";
		bd.getConnection();
		try {
			bd.st = bd.con.prepareStatement(sql);
			bd.st.setString(1, Character.toString(go.getQuestao1()));
			bd.st.setString(2, Character.toString(go.getQuestao2()));
			bd.st.setString(3, Character.toString(go.getQuestao3()));
			bd.st.setString(4, Character.toString(go.getQuestao4()));
			bd.st.setString(5, Character.toString(go.getQuestao5()));
			bd.st.setString(6, go.getCodigoDisciplina());
			bd.st.setInt(7, go.getCodigoAvaliacao());
			bd.st.setInt(8, go.getCodigoGabarito());
			int n = bd.st.executeUpdate();
			System.out.println("Linhas alteradas: " + n);
			if (n == 1) {
				men = "Gabarito alterado com sucesso!";
			} else {
				men = "Gabarito não encontrada!";
			}
		} catch (SQLException e) {
			men = "Falha" + e;
		} finally {
			bd.close();
		}

		return men;

	}

	/**
	 * Exclui o registro na tabela GabaritoOficial do banco de dados identificado pelo 
	 * <code>codigoGabarito</code>.
	 * 
	 * @param codigoGabarito - um <code>Object</code> que corresponde ao 
	 * Registro de GabaritoOficial.
	 * @return Uma <code>String</code> que informa se a operação de exclusão foi
	 *         bem-sucedida ou não.
	 */
	public String excluir(Object codigoGabarito) {
		sql = "DELETE FROM GABARITO_OFICIAL WHERE codigo_gabarito = ?";
		bd.getConnection();
		try {
			bd.st = bd.con.prepareStatement(sql);
			bd.st.setObject(1, codigoGabarito);
			int n = bd.st.executeUpdate();
			System.out.println("Linhas excluídas: " + n);
			if (n == 1) {
				men = "Gabarito excluído com sucesso!";
			} else {
				men = "Gabarito não encontrado!";
			}
		} catch (SQLException e) {
			men = "Falha" + e;
		} finally {
			bd.close();
		}
		return men;
	}

	/**
	 * Obtém os dados da instância de GabaritoOficial identificada pelo <code>codigoGabarito</code> fornecido.
	 * <p>
	 * Este método é utilizado no momento da correção automática. Através do código, o método retorna 
	 * o gabarito correspondente à avaliação que o Aluno realizou e por meio disto é possível realizar
	 * sua correção.
	 * 
	 * @param codigoGabarito - um valor do tipo <code>int</code>, que corresponde ao código do gabarito que se 
	 * procura.
	 * @return Um objeto <code>GabaritoOficial</code> contendo os dados do gabarito correspondente à 
	 * folha de resposta do Aluno para a correção automática.
	 */
	public GabaritoOficial obterGabaritoParaCorrecao(int codigoGabarito) {
		sql = "SELECT * FROM GABARITO_OFICIAL WHERE codigo_gabarito = ?";
		GabaritoOficial go = null;
		bd.getConnection();
		try {
			bd.st = bd.con.prepareStatement(sql);
			bd.st.setInt(1, codigoGabarito);
			bd.rs = bd.st.executeQuery();
			while (bd.rs.next()) {
				go = new GabaritoOficial();
				go.setCodigoGabarito(bd.rs.getInt("codigo_gabarito"));
				go.setQuestao1(bd.rs.getString("questao_1").charAt(0));
				go.setQuestao2(bd.rs.getString("questao_2").charAt(0));
				go.setQuestao3(bd.rs.getString("questao_3").charAt(0));
				go.setQuestao4(bd.rs.getString("questao_4").charAt(0));
				go.setQuestao5(bd.rs.getString("questao_5").charAt(0));
				go.setCodigoDisciplina(bd.rs.getString("codigo_disciplina"));
				go.setCodigoAvaliacao(bd.rs.getInt("codigo_avaliacao"));
			}
		} catch (SQLException e) {
			System.out.println(e);
		} finally {
			bd.close();
		}
		return go;
	}
	
	/**
	 * Carrega todos os dados da tabela <code>GABARITO_OFICIAL</code> do banco de dados.
	 * <p>
	 * Este método é utilizado para listar todos os Gabaritos Oficiais em formato de tabela
	 * no <code>PainelListarGabaritos</code>.
	 * 
	 * @return Um <code>TableModel</code> contendo os dados de todos os Gabaritos Oficiais.
	 */
	public TableModel carregarTabela() {
		DefaultTableModel model = null;
		
		String sql = "SELECT codigo_gabarito AS Código, questao_1 AS 'Questão 1', questao_2 AS 'Questão 2', questao_3 AS 'Questão 3', questao_4 AS 'Questão 4', questao_5 AS 'Questão 5', codigo_disciplina AS 'Cód. Disciplina', codigo_avaliacao AS 'Cód. Avaliação' FROM GABARITO_OFICIAL";
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

}
