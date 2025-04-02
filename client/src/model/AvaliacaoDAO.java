package model;

import java.sql.SQLException;

import javax.swing.table.DefaultTableModel;
import javax.swing.table.TableModel;

import util.BD;
import view.components.TableModelPatec;

/**
 * Classe DAO (Data Access Object) responsável por trocar informações com o SGBD
 * através de operações referentes a objetos da Classe Avaliacao.
 */
public class AvaliacaoDAO {

	private BD bd;
	private String sql, men;

	/**
	 * Cria uma nova instância de <code>AvaliacaoDAO</code>, e inicializa o atributo
	 * <code>bd</code>, que será utilizado para estabelecer conexão com o banco de
	 * dados.
	 * 
	 * @see BD
	 */
	public AvaliacaoDAO() {
		bd = new BD();
	}

	/**
	 * Registra os dados contidos na instância da classe <code>Avaliacao</code> no
	 * banco de dados.
	 * <p>
	 * Caso os dados não existam no banco de dados, será criado um novo registro
	 * contendo eles; Caso existam, os dados serão atualizados tendo como base o
	 * registro cujo código está contido no atributo <code>codigoAvaliacao</code>.
	 * 
	 * @param a - a instância da classe <code>Avaliacao</code>.
	 * @return Uma <code>String</code> que informa se a operação de
	 *         inserção/alteração foi bem-sucedida ou não.
	 * @see Avaliacao
	 */
	public String gravar(Avaliacao a) {
		men = "Avaliação inserida com sucesso!";
		bd.getConnection();
		
		if (a.getCodigoAvaliacao() == 0) {
			sql = "SET DATEFORMAT 'DMY'; INSERT INTO AVALIACAO VALUES (?, ?);";
			try {
				bd.st = bd.con.prepareStatement(sql);
				bd.st.setString(1, a.getDataAvaliacao());
				bd.st.setString(2, a.getTipoAvaliacao());
				int n = bd.st.executeUpdate();
				System.out.println("Linhas inseridas: " + n);
			} catch (SQLException e) {
				men = "Falha" + e;
				System.out.println(men);
			} finally {
				bd.close();
			}	
		} else {
			sql = "UPDATE AVALIACAO SET data_avaliacao = ?, tipo_avaliacao = ? WHERE codigo_avaliacao = ?";
			try {
				bd.st = bd.con.prepareStatement(sql);
				bd.st.setString(1, a.getDataAvaliacao());
				bd.st.setString(2, a.getTipoAvaliacao());
				bd.st.setInt(3, a.getCodigoAvaliacao());
				int n = bd.st.executeUpdate();
				System.out.println("Linhas alteradas: " + n);
				if (n == 1) {
					men = "Avaliação alterada com sucesso!";
				} else {
					men = "Avaliação não encontrada!";
				}
			} catch (SQLException e1) {
				men = "Falha" + e1;
				System.out.println(men);
			} finally {
				bd.close();
			}
		}
		
		return men;
	}

	/**
	 * Exclui o registro na tabela Avaliacao do banco de dados identificado pelo 
	 * <code>codigoAvaliacao</code>.
	 * 
	 * @param codigoAvaliacao - um <code>Object</code> que corresponde ao 
	 * Registro da Avaliação.
	 * @return Uma <code>String</code> que informa se a operação de exclusão foi
	 *         bem-sucedida ou não.
	 */
	public String excluir(Object codigoAvaliacao) {
		sql = "DELETE FROM AVALIACAO WHERE codigo_avaliacao = ?";
		bd.getConnection();
		try {
			bd.st = bd.con.prepareStatement(sql);
			bd.st.setObject(1, codigoAvaliacao);
			int n = bd.st.executeUpdate();
			System.out.println("Linhas excluídas: " + n);
			if (n == 1) {
				men = "Avaliação excluída com sucesso!";
			} else {
				men = "Avaliação não encontrada!";
			}
		} catch (SQLException e) {
			men = "Falha" + e;
		} finally {
			bd.close();
		}
		return men;
	}
	
	/**
	 * Carrega todos os dados da tabela <code>AVALIACAO</code> do banco de dados.
	 * <p>
	 * Este método é utilizado para listar todas as Avaliações em formato de tabela
	 * no <code>PainelListarAvaliacoes</code>. O método também é utilizado no 
	 * <code>PainelSelecionarAvaliacao</code> no momento do cadastro de <code>GabaritoOficial</code>
	 * e permite que o usuário selecione a avaliacao referente ao gabarito.
	 * 
	 * @return Um <code>TableModel</code> contendo os dados de todas as Avaliações.
	 */
	public TableModel carregarTabela() {
		DefaultTableModel model = null;
		
		String sql = "SELECT codigo_avaliacao AS Código, data_avaliacao AS Data, tipo_avaliacao AS Tipo FROM AVALIACAO";
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
