package model;

/**
 * Classe equivalente à tabela <code>ALUNO_DISCIPLINA</code> no banco de dados. Esta Classe é referente 
 * à relação entre <code>Aluno</code> e <code>Disciplina</code>, possuindo informações como quais Disciplinas cada 
 * Aluno está cursando.
 */
public class AlunoDisciplina {

	private String codigoDisciplina;
	private String ra;
	
	/**
	 * Cria uma nova instância de <code>AlunoDisciplina</code>, sem nenhum valor inicial
	 * atribuído aos atributos da instância.
	 */
	public AlunoDisciplina() {
	}

	/**
	 * Cria uma nova instância de <code>AlunoDisciplina</code>, com os valores iniciais
	 * atribuídos aos atributos da instância.
	 * 
	 * @param codigoDisciplina	- uma <code>String</code> que corresponde ao código da disciplina.
	 * @param ra				- uma <code>String</code>, que corresponde ao Registro do Aluno.
	 */
	public AlunoDisciplina(String codigoDisciplina, String ra) {
		this.codigoDisciplina = codigoDisciplina;
		this.ra = ra;
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
	 * @param codigoDisciplina - uma <code>String</code> que corresponde ao código da disciplina.
	 */
	public void setCodigoDisciplina(String codigoDisciplina) {
		this.codigoDisciplina = codigoDisciplina;
	}

	/**
	 * Recupera o valor atribuído ao atributo <code>ra</code>.
	 * 
	 * @return O valor do atributo <code>ra</code>.
	 */
	public String getRa() {
		return ra;
	}

	/**
	 * Define o valor do atributo <code>ra</code>.
	 * 
	 * @param ra - uma <code>String</code> que corresponde ao Registro do Aluno.
	 */
	public void setRa(String ra) {
		this.ra = ra;
	}
		
}
