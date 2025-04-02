package model;

/**
 * Classe equivalente à tabela <code>ALUNO</code> no banco de dados. Esta Classe é referente aos 
 * alunos que cursam Gestão Empresarial EAD na Fatec-ID e realizam avaliações presenciais no semestre.
 */
public class Aluno {

	private String ra;
	private String cpf;
	private String nomeAluno;
	private String dataNascimento;

	/**
	 * Cria uma nova instância de <code>Aluno</code>, sem nenhum valor inicial
	 * atribuído aos atributos da instância.
	 */
	public Aluno() {
	}

	/**
	 * Cria uma nova instância de <code>Aluno</code>, com os valores iniciais
	 * atribuídos aos atributos da instância.
	 * 
	 * @param ra             - uma <code>String</code>, que corresponde ao Registro
	 *                       do Aluno.
	 * @param cpf            - uma <code>String</code>, que corresponde ao CPF.
	 * @param nomeAluno      - uma <code>String</code>, que corresponde ao nome do
	 *                       aluno.
	 * @param dataNascimento - uma <code>String</code>, que corresponde à data de
	 *                       nascimento do aluno.
	 */
	public Aluno(String ra, String cpf, String nomeAluno, String dataNascimento) {
		this.ra = ra;
		this.cpf = cpf;
		this.nomeAluno = nomeAluno;
		this.dataNascimento = dataNascimento;
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

	/**
	 * Recupera o valor atribuído ao atributo <code>cpf</code>.
	 * 
	 * @return O valor do atributo <code>cpf</code>.
	 */
	public String getCpf() {
		return cpf;
	}

	/**
	 * Define o valor do atributo <code>cpf</code>.
	 * 
	 * @param cpf - uma <code>String</code>, que corresponde ao CPF.
	 */
	public void setCpf(String cpf) {
		this.cpf = cpf;
	}

	/**
	 * Recupera o valor atribuído ao atributo <code>nomeAluno</code>.
	 * 
	 * @return O valor do atributo <code>nomeAluno</code>.
	 */
	public String getNomeAluno() {
		return nomeAluno;
	}

	/**
	 * Define o valor do atributo <code>nomeAluno</code>.
	 * 
	 * @param nomeAluno - uma <code>String</code>, que corresponde ao nome do aluno.
	 */
	public void setNomeAluno(String nomeAluno) {
		this.nomeAluno = nomeAluno;
	}

	/**
	 * Recupera o valor atribuído ao atributo <code>dataNascimento</code>.
	 * 
	 * @return O valor do atributo <code>dataNascimento</code>.
	 */
	public String getDataNascimento() {
		return dataNascimento;
	}

	/**
	 * Define o valor do atributo <code>dataNascimento</code>.
	 * 
	 * @param dataNascimento - uma <code>String</code>, que corresponde à data de
	 *                       nascimento do aluno.
	 */
	public void setDataNascimento(String dataNascimento) {
		this.dataNascimento = dataNascimento;
	}
}
