package model;

/**
 * Classe equivalente à tabela <code>FOLHA_DE_RESPOSTAS</code> no banco de dados. Esta Classe é referente às 
 * folhas de respostas que o Aluno preenche em cada prova que realiza.
 */
public class FolhaDeRespostas {
	private int codigoRespostas;
	private char resposta1;
	private char resposta2;
	private char resposta3;
	private char resposta4;
	private char resposta5;
	private int nota;
	private int codigoGabarito;
	private String ra;

	/**
	 * Cria uma nova instância de <code>FolhaDeRespostas</code>, sem nenhum valor
	 * inicial atribuído aos atributos da instância.
	 */
	public FolhaDeRespostas() {
	};

	/**
	 * Cria uma nova instância de <code>FolhaDeRespostas</code>, com os valores
	 * iniciais atribuídos aos atributos da instância.
	 * 
	 * @param codigoRespostas - um valor do tipo <code>int</code>, que corresponde
	 *                        ao código da folha de respostas.
	 * @param resposta1       - um valor do tipo <code>char</code>, que corresponde
	 *                        à alternativa assinalada pelo aluno na primeira
	 *                        questão.
	 * @param resposta2       - um valor do tipo <code>char</code>, que corresponde
	 *                        à alternativa assinalada pelo aluno na segunda
	 *                        questão.
	 * @param resposta3       - um valor do tipo <code>char</code>, que corresponde
	 *                        à alternativa assinalada pelo aluno na terceira
	 *                        questão.
	 * @param resposta4       - um valor do tipo <code>char</code>, que corresponde
	 *                        à alternativa assinalada pelo aluno na quarta questão.
	 * @param resposta5       - um valor do tipo <code>char</code>, que corresponde
	 *                        à alternativa assinalada pelo aluno na quinta questão.
	 * @param nota            - um valor do tipo <code>int</code>, que corresponde à
	 *                        nota obtida pelo aluno na prova.
	 * @param codigoGabarito  - um valor do tipo <code>int</code>, que corresponde
	 *                        ao código do gabarito ao qual a folha de respostas se
	 *                        refere.
	 * @param ra         	  - uma <code>String</code>, que corresponde ao RA do
	 *                        aluno que realizou a prova.
	 */
	public FolhaDeRespostas(int codigoRespostas, char resposta1, char resposta2, char resposta3, char resposta4,
			char resposta5, int nota, int codigoGabarito, String ra) {
		this.codigoRespostas = codigoRespostas;
		this.resposta1 = resposta1;
		this.resposta2 = resposta2;
		this.resposta3 = resposta3;
		this.resposta4 = resposta4;
		this.resposta5 = resposta5;
		this.nota = nota;
		this.codigoGabarito = codigoGabarito;
		this.ra = ra;
	}

	/**
	 * Recupera o valor atribuído ao atributo <code>codigoRespostas</code>.
	 * 
	 * @return O valor do atributo <code>codigoRespostas</code>.
	 */
	public int getCodigoRespostas() {
		return codigoRespostas;
	}

	/**
	 * Define o valor do atributo <code>codigoRespostas</code>.
	 * 
	 * @param codigoRespostas - um valor do tipo <code>int</code>, que corresponde
	 *                        ao código da folha de respostas.
	 */
	public void setCodigoRespostas(int codigoRespostas) {
		this.codigoRespostas = codigoRespostas;
	}

	/**
	 * Recupera o valor atribuído ao atributo <code>resposta1</code>.
	 * 
	 * @return O valor do atributo <code>resposta1</code>.
	 */
	public char getResposta1() {
		return resposta1;
	}

	/**
	 * Define o valor do atributo <code>resposta1</code>.
	 * 
	 * @param resposta1 - um valor do tipo <code>char</code>, que corresponde à
	 *                  alternativa assinalada pelo aluno na primeira questão.
	 */
	public void setResposta1(char resposta1) {
		this.resposta1 = resposta1;
	}

	/**
	 * Recupera o valor atribuído ao atributo <code>resposta2</code>.
	 * 
	 * @return O valor do atributo <code>resposta2</code>.
	 */
	public char getResposta2() {
		return resposta2;
	}

	/**
	 * Define o valor do atributo <code>resposta2</code>.
	 * 
	 * @param resposta2 - um valor do tipo <code>char</code>, que corresponde à
	 *                  alternativa assinalada pelo aluno na segunda questão.
	 */
	public void setResposta2(char resposta2) {
		this.resposta2 = resposta2;
	}

	/**
	 * Recupera o valor atribuído ao atributo <code>resposta3</code>.
	 * 
	 * @return O valor do atributo <code>resposta3</code>.
	 */
	public char getResposta3() {
		return resposta3;
	}

	/**
	 * Define o valor do atributo <code>resposta3</code>.
	 * 
	 * @param resposta3 - um valor do tipo <code>char</code>, que corresponde à
	 *                  alternativa assinalada pelo aluno na terceira questão.
	 */
	public void setResposta3(char resposta3) {
		this.resposta3 = resposta3;
	}

	/**
	 * Recupera o valor atribuído ao atributo <code>resposta4</code>.
	 * 
	 * @return O valor do atributo <code>resposta4</code>.
	 */
	public char getResposta4() {
		return resposta4;
	}

	/**
	 * Define o valor do atributo <code>resposta4</code>.
	 * 
	 * @param resposta4 - um valor do tipo <code>char</code>, que corresponde à
	 *                  alternativa assinalada pelo aluno na quarta questão.
	 */
	public void setResposta4(char resposta4) {
		this.resposta4 = resposta4;
	}

	/**
	 * Recupera o valor atribuído ao atributo <code>resposta5</code>.
	 * 
	 * @return O valor do atributo <code>resposta5</code>.
	 */
	public char getResposta5() {
		return resposta5;
	}

	/**
	 * Define o valor do atributo <code>resposta5</code>.
	 * 
	 * @param resposta5 - um valor do tipo <code>char</code>, que corresponde à
	 *                  alternativa assinalada pelo aluno na quinta questão.
	 */
	public void setResposta5(char resposta5) {
		this.resposta5 = resposta5;
	}

	/**
	 * Recupera o valor atribuído ao atributo <code>nota</code>.
	 * 
	 * @return O valor do atributo <code>nota</code>.
	 */
	public int getNota() {
		return nota;
	}

	/**
	 * Define o valor do atributo <code>nota</code>.
	 * 
	 * @param nota - um valor do tipo <code>int</code>, que corresponde à nota
	 *             obtida pelo aluno na prova.
	 */
	public void setNota(int nota) {
		this.nota = nota;
	}

	/**
	 * Recupera o valor atribuído ao atributo <code>codigoGabarito</code>.
	 * 
	 * @return O valor do atributo <code>codigoGabarito</code>.
	 */
	public int getCodigoGabarito() {
		return codigoGabarito;
	}

	/**
	 * Define o valor do atributo <code>codigoGabarito</code>.
	 * 
	 * @param codigoGabarito - um valor do tipo <code>int</code>, que corresponde ao
	 *                       código do gabarito ao qual a folha de respostas se
	 *                       refere.
	 */
	public void setCodigoGabarito(int codigoGabarito) {
		this.codigoGabarito = codigoGabarito;
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
	 * @param ra - uma <code>String</code>, que corresponde ao RA do aluno que
	 *                realizou a prova.
	 */
	public void setRa(String ra) {
		this.ra = ra;
	}
}
