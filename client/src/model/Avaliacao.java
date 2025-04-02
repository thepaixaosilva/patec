package model;

/**
 * Classe equivalente à tabela <code>AVALIACAO</code> no banco de dados. Esta Classe é referente ao dia
 * de avaliação presencial que ocorre no semestre. Assim, há várias instâncias de <code>GabaritoOficial</code>
 * que fazem referência a uma mesma <code>Avaliação</code>. (Avaliação possui dados do dia e não das provas literais)
 */
public class Avaliacao {

	private int codigoAvaliacao;
	private String dataAvaliacao;
	private String tipoAvaliacao;

	/**
	 * Cria uma nova instância de <code>Avaliacao</code>, sem nenhum valor inicial
	 * atribuído aos atributos da instância.
	 */
	public Avaliacao() {
	}
	
	/**
	 * Cria uma nova instância de <code>Avaliacao</code>, com os valores iniciais
	 * atribuídos aos atributos da instância.
	 *  
	 * @param codigoAvaliacao - um valor do tipo <code>int</code>, que corresponde ao código da avaliação.
	 * @param dataAvaliacao - uma <code>String</code> que corresponde à data da avaliação.
	 * @param tipoAvaliacao - uma <code>String</code> que corresponde ao tipo de avaliação (ex: se é primeira
	 * 						chamada ou se é segunda chamada, etc.).
	 */
	public Avaliacao(int codigoAvaliacao, String dataAvaliacao, String tipoAvaliacao) {
		super();
		this.codigoAvaliacao = codigoAvaliacao;
		this.dataAvaliacao = dataAvaliacao;
		this.tipoAvaliacao = tipoAvaliacao;
	}

	/**
	 * Recupera o valor atribuído ao atributo <code>codigoAvaliacao</code>.
	 * 
	 * @return O valor do atributo <code>codigoAvaliacao</code>.
	 */
	public int getCodigoAvaliacao() {
		return codigoAvaliacao;
	}

	/**
	 * Define o valor do atributo <code>codigoAvaliacao</code>.
	 * 
	 * @param codigoAvaliacao - um valor do tipo <code>int</code>, que corresponde ao código da avaliação.
	 */
	public void setCodigoAvaliacao(int codigoAvaliacao) {
		this.codigoAvaliacao = codigoAvaliacao;
	}

	/**
	 * Recupera o valor atribuído ao atributo <code>dataAvaliacao</code>.
	 * 
	 * @return O valor do atributo <code>dataAvaliacao</code>.
	 */
	public String getDataAvaliacao() {
		return dataAvaliacao;
	}

	/**
	 * Define o valor do atributo <code>dataAvaliacao</code>.
	 * 
	 * @param dataAvaliacao - uma <code>String</code> que corresponde à data da avaliação.
	 */
	public void setDataAvaliacao(String dataAvaliacao) {
		this.dataAvaliacao = dataAvaliacao;
	}

	/**
	 * Recupera o valor atribuído ao atributo <code>tipoAvaliacao</code>.
	 * 
	 * @return O valor do atributo <code>tipoAvaliacao</code>.
	 */ 
	public String getTipoAvaliacao() {
		return tipoAvaliacao;
	}

	/**
	 * Define o valor do atributo <code>tipoAvaliacao</code>.
	 * 
	 * @param tipoAvaliacao - uma <code>String</code> que corresponde ao tipo de avaliação (ex: se é primeira
	 * 						chamada ou se é segunda chamada, etc.).
	 */
	public void setTipoAvaliacao(String tipoAvaliacao) {
		this.tipoAvaliacao = tipoAvaliacao;
	}
}
