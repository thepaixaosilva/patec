package util;

import java.awt.Desktop;
import java.io.File;

public class ImprimirPlanilhaRelatorio {

	/**
	 * A partir de um caminho fornecido, o método imprimirá o arquivo .xls/.xlsx
	 * utilizando a impressora padrão do sistema.
	 * 
	 * @param excelFilePath - valor do tipo <code>String</code> que corresponde ao
	 *                      caminho do arquivo .xls/.xlsx que será utilizado para
	 *                      impressão.
	 */
	public static void imprimeRelatorio(String excelFilePath) {
		Desktop desktop = Desktop.getDesktop();
		try {
			desktop.print(new File(excelFilePath));
		} catch (Exception e) {
		}
	}
}
