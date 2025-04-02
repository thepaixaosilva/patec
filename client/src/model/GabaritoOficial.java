package model;

/**
 * Classe equivalente à tabela <code>GABARITO_OFICIAL</code> no banco de dados.
 * Esta Classe é referente aos gabaritos oficiais fornecidos pelo CPS para a
 * realização das avaliações das turmas EaD do curso de Gestão Empresarial (é
 * com base neles que é realizada a conferência das respostas assinaladas pelos
 * alunos nas folhas de respostas virtuais).
 */
public class GabaritoOficial {
	private int codigoGabarito;
	private char questao1;
	private char questao2;
	private char questao3;
	private char questao4;
	private char questao5;

	private String codigoDisciplina;
	private int codigoAvaliacao;

	/**
	 * Cria uma nova instância de <code>GabaritoOficial</code>, sem nenhum valor inicial
	 * atribuído aos atributos da instância.
	 */
	public GabaritoOficial() {
	};

	/**
	 * Cria uma nova instância de <code>GabaritoOficial</code>, com os valores
	 * iniciais atribuídos aos atributos da instância.
	 * 
	 * @param codigoGabarito   - um valor do tipo <code>int</code>, que corresponde
	 *                         ao código do gabarito oficial.
	 * @param questao1         - um valor do tipo <code>char</code>, que corresponde
	 *                         à alternativa correta da primeira questão.
	 * @param questao2         - um valor do tipo <code>char</code>, que corresponde
	 *                         à alternativa correta da segunda questão.
	 * @param questao3         - um valor do tipo <code>char</code>, que corresponde
	 *                         à alternativa correta da terceira questão.
	 * @param questao4         - um valor do tipo <code>char</code>, que corresponde
	 *                         à alternativa correta da quarta questão.
	 * @param questao5         - um valor do tipo <code>char</code>, que corresponde
	 *                         à alternativa correta da quinta questão.
	 * @param codigoDisciplina - um valor do tipo <code>String</code>, que
	 *                         corresponde ao código da disciplina à qual o gabarito
	 *                         oficial se refere.
	 * @param codigoAvaliacao  - um valor do tipo <code>int</code>, que corresponde
	 *                         ao código da avaliação à qual o gabarito oficial se
	 *                         refere.
	 */
	public GabaritoOficial(int codigoGabarito, char questao1, char questao2, char questao3, char questao4,
			char questao5, String codigoDisciplina, int codigoAvaliacao) {
		this.codigoGabarito = codigoGabarito;
		this.questao1 = questao1;
		this.questao2 = questao2;
		this.questao3 = questao3;
		this.questao4 = questao4;
		this.questao5 = questao5;
		this.codigoDisciplina = codigoDisciplina;
		this.codigoAvaliacao = codigoAvaliacao;
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
	 *                       código do gabarito oficial.
	 */
	public void setCodigoGabarito(int codigoGabarito) {
		this.codigoGabarito = codigoGabarito;
	}

	/**
	 * Recupera o valor atribuído ao atributo <code>questao1</code>.
	 * 
	 * @return O valor do atributo <code>questao1</code>.
	 */
	public char getQuestao1() {
		return questao1;
	}

	/**
	 * Define o valor do atributo <code>questao1</code>.
	 * 
	 * @param questao1 - um valor do tipo <code>char</code>, que corresponde à alternativa correta da
	 * primeira questão.
	 */
	public void setQuestao1(char questao1) {
		this.questao1 = questao1;
	}

	/**
	 * Recupera o valor atribuído ao atributo <code>questao2</code>.
	 * 
	 * @return O valor do atributo <code>questao2</code>.
	 */
	public char getQuestao2() {
		return questao2;
	}

	/**
	 * Define o valor do atributo <code>questao2</code>.
	 * 
	 * @param questao2 - um valor do tipo <code>char</code>, que corresponde à alternativa correta da
	 * segunda questão.
	 */
	public void setQuestao2(char questao2) {
		this.questao2 = questao2;
	}

	/**
	 * Recupera o valor atribuído ao atributo <code>questao3</code>.
	 * 
	 * @return O valor do atributo <code>questao3</code>.
	 */
	public char getQuestao3() {
		return questao3;
	}

	/**
	 * Define o valor do atributo <code>questao3</code>.
	 * 
	 * @param questao3 - um valor do tipo <code>char</code>, que corresponde à alternativa correta da
	 * terceira questão.
	 */
	public void setQuestao3(char questao3) {
		this.questao3 = questao3;
	}

	/**
	 * Recupera o valor atribuído ao atributo <code>questao4</code>.
	 * 
	 * @return O valor do atributo <code>questao4</code>.
	 */
	public char getQuestao4() {
		return questao4;
	}

	/**
	 * Define o valor do atributo <code>questao4</code>.
	 * 
	 * @param questao4 - um valor do tipo <code>char</code>, que corresponde à alternativa correta da
	 * quarta questão.
	 */
	public void setQuestao4(char questao4) {
		this.questao4 = questao4;
	}

	/**
	 * Recupera o valor atribuído ao atributo <code>questao5</code>.
	 * 
	 * @return O valor do atributo <code>questao5</code>.
	 */
	public char getQuestao5() {
		return questao5;
	}

	/**
	 * Define o valor do atributo <code>questao5</code>.
	 * 
	 * @param questao5 - um valor do tipo <code>char</code>, que corresponde à alternativa correta da
	 * quinta questão.
	 */
	public void setQuestao5(char questao5) {
		this.questao5 = questao5;
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
	 * @param codigoDisciplina - um valor do tipo <code>String</code>, que
	 *                         corresponde ao código da disciplina à qual o gabarito
	 *                         oficial se refere.
	 */
	public void setCodigoDisciplina(String codigoDisciplina) {
		this.codigoDisciplina = codigoDisciplina;
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
	 * @param codigoAvaliacao - um valor do tipo <code>int</code>, que corresponde
	 *                        ao código da avaliação à qual o gabarito oficial se
	 *                        refere.
	 */
	public void setCodigoAvaliacao(int codigoAvaliacao) {
		this.codigoAvaliacao = codigoAvaliacao;
	}
}
