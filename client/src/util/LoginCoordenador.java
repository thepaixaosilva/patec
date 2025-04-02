package util;

import java.util.Arrays;

public class LoginCoordenador {

	/**
	 * Verifica os dados inseridos nos campos "Usuário" e "Senha" do painel de
	 * log-in, a fim de verificar se a senha inserida corresponde à credencial de
	 * acesso como administrador.
	 * 
	 * @param input - a senha, representada como um vetor do tipo <code>char</code>.
	 * @return <code>true</code>, caso a senha seja válida; <code>false</code>, caso
	 *         a senha seja inválida.
	 */
	public static boolean realizarLoginCoordenador(char[] input) {
		boolean correto = true;
		char[] senhaCoord = { 'a', 'd', 'm', 'i', 'n' };

		if (input.length != senhaCoord.length) {
			correto = false;
		} else {
			correto = Arrays.equals(input, senhaCoord);
		}

		Arrays.fill(senhaCoord, '0');

		return correto;
	}
}
