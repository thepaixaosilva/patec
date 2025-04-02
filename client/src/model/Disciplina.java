package model;

/**
 * Classe equivalente à tabela <code>DISCIPLINA</code> no banco de dados. Esta Classe é referente às
 * disciplinas da grade curricular do curso Gestão Empresarial EAD.
 */
public class Disciplina {

	private String codigoDisciplina;
	private String nomeDisciplina;
	private int semestreDisciplina;

	/**
	 * Cria uma nova instância de <code>Disciplina</code>, sem nenhum valor inicial
	 * atribuído aos atributos da instância.
	 */
	public Disciplina() {
	}

	/**
	 * Cria uma nova instância de <code>Disciplina</code>, com os valores iniciais
	 * atribuídos aos atributos da instância.
	 * 
	 * @param codigoDisciplina   - uma <code>String</code> que corresponde ao código
	 *                           da disciplina.
	 * @param nomeDisciplina     - uma <code>String</code> que corresponde ao nome
	 *                           da disciplina.
	 * @param semestreDisciplina - um valor do tipo <code>int</code>, que
	 *                           corresponde ao semestre da disciplina.
	 */
	public Disciplina(String codigoDisciplina, String nomeDisciplina, int semestreDisciplina) {
		this.codigoDisciplina = codigoDisciplina;
		this.nomeDisciplina = nomeDisciplina;
		this.semestreDisciplina = semestreDisciplina;
	}

	/**
	 * Recupera o valor atribuído ao atributo <code>codigoDisciplina</code>.
	 * 
	 * @return O valor do atributo <code>codigoDisciplina</code>.
	 */
	public String getCodigoDisciplina() {
		return codigoDisciplina;
	}

	/**
	 * Define o valor do atributo <code>codigoDisciplina</code>.
	 * 
	 * @param codigoDisciplina - uma <code>String</code> que corresponde ao código
	 *                         da disciplina.
	 */
	public void setCodigoDisciplina(String codigoDisciplina) {
		this.codigoDisciplina = codigoDisciplina;
	}

	/**
	 * Recupera o valor atribuído ao atributo <code>nomeDisciplina</code>.
	 * 
	 * @return O valor do atributo <code>nomeDisciplina</code>.
	 */
	public String getNomeDisciplina() {
		return nomeDisciplina;
	}

	/**
	 * Define o valor do atributo <code>nomeDisciplina</code>.
	 * 
	 * @param nomeDisciplina - uma <code>String</code> que corresponde ao nome da
	 *                       disciplina.
	 */
	public void setNomeDisciplina(String nomeDisciplina) {
		this.nomeDisciplina = nomeDisciplina;
	}

	/**
	 * Recupera o valor atribuído ao atributo <code>semestreDisciplina</code>.
	 * 
	 * @return O valor do atributo <code>semestreDisciplina</code>.
	 */
	public int getSemestreDisciplina() {
		return semestreDisciplina;
	}

	/**
	 * Define o valor do atributo <code>semestreDisciplina</code>.
	 * 
	 * @param semestreDisciplina - um valor do tipo <code>int</code>, que
	 *                           corresponde ao semestre da disciplina.
	 */
	public void setSemestreDisciplina(int semestreDisciplina) {
		this.semestreDisciplina = semestreDisciplina;
	}
}
