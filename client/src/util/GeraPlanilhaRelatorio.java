package util;

import java.io.FileOutputStream;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Map;

import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.ss.usermodel.BorderStyle;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.CellStyle;
import org.apache.poi.ss.usermodel.Font;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.ss.util.CellRangeAddress;
import org.apache.poi.ss.util.RegionUtil;

public class GeraPlanilhaRelatorio {

	/**
	 * Gera uma planilha tendo como base a matriz de dados que corresponde ao
	 * relatório por aluno, o nome dele, o RA dele e a data em que a avaliação foi
	 * realizada.
	 * 
	 * @param matrizDados   - a matriz de dados que corresponde aos dados utilizados
	 *                      para a geração da tabela de relatório por aluno.
	 * @param nomeAluno     - valor do tipo <code>String</code> que corresponde ao
	 *                      nome do aluno para o qual está sendo gerado o relatório.
	 * @param ra            - valor do tipo <code>String</code> que corresponde ao
	 *                      RA do aluno para o qual está sendo gerado o relatório.
	 * @param dataAvaliacao - valor do tipo <code>String</code> que corresponde à
	 *                      data de realização da avaliação.
	 * @param excelFilePath - valor do tipo <code>String</code> que corresponde ao
	 *                      caminho da geração da planilha.
	 * @throws IOException
	 */
	public static void planilhaRelatorioAluno(Map<Integer, Object> matrizDados, String nomeAluno, String ra,
			String dataAvaliacao, String excelFilePath) throws IOException {
		Workbook workbook = new HSSFWorkbook();

		Sheet sheet = workbook.createSheet();
		sheet.setColumnWidth(1, 15 * 256);
		sheet.setColumnWidth(2, 30 * 256);
		sheet.setColumnWidth(3, 5 * 256);
		sheet.setColumnWidth(4, 5 * 256);
		sheet.setColumnWidth(5, 5 * 256);
		sheet.setColumnWidth(6, 5 * 256);
		sheet.setColumnWidth(7, 5 * 256);
		sheet.setColumnWidth(8, 6 * 256);

		sheet.addMergedRegion(new CellRangeAddress(0, 0, 1, 5));
		sheet.addMergedRegion(new CellRangeAddress(3, 3, 1, 2));
		sheet.addMergedRegion(new CellRangeAddress(4, 4, 1, 2));

		CellStyle cellStyle = sheet.getWorkbook().createCellStyle();
		Font font = sheet.getWorkbook().createFont();
		font.setBold(true);
		font.setFontHeightInPoints((short) 14);
		cellStyle.setFont(font);

		int rowCount = -1;

		for (int i = 0; i < matrizDados.size() + 7; i++) {
			Row linha = sheet.createRow(++rowCount);

			if (i == 0) {
				Cell celula = linha.createCell(i + 1);
				celula.setCellStyle(cellStyle);
				celula.setCellValue("Relatório: Gestão Empresarial EaD");
			} else if (i == 3) {
				Cell celula = linha.createCell(i - 2);
				celula.setCellValue("RA: " + ra);
				celula = linha.createCell(i);
				celula.setCellValue("Nome: " + nomeAluno);
			} else if (i == 4) {
				Cell celula = linha.createCell(i - 3);
				celula.setCellValue("Data da avaliação: " + dataAvaliacao);
				celula = linha.createCell(i - 1);
				celula.setCellValue("Data da emissão: "
						+ new SimpleDateFormat("dd-MM-yyyy").format(Calendar.getInstance().getTime()));
			} else if (i == 6) {
				Cell celula = linha.createCell(i - 5);
				celula.setCellValue("Cód. Disciplina");
				celula = linha.createCell(i - 4);
				celula.setCellValue("Nome da disciplina");
				celula = linha.createCell(i - 3);
				celula.setCellValue("R.1");
				celula = linha.createCell(i - 2);
				celula.setCellValue("R.2");
				celula = linha.createCell(i - 1);
				celula.setCellValue("R.3");
				celula = linha.createCell(i);
				celula.setCellValue("R.4");
				celula = linha.createCell(i + 1);
				celula.setCellValue("R.5");
				celula = linha.createCell(i + 2);
				celula.setCellValue("Nota");
			} else if (i > 6) {
				gravarDadosRelatorioAluno((ArrayList<Object>) matrizDados.get(i - 7), linha, sheet);
			}
		}

		try (FileOutputStream outputStream = new FileOutputStream(excelFilePath)) {
			workbook.write(outputStream);
		}

		workbook.close();
	}

	/**
	 * Insere os dados de um determinado vetor contido na matriz de dados na
	 * planilha.
	 * 
	 * @param dados - o vetor de dados a ser inserido na planilha.
	 * @param linha - a linha atual na inserção de dados na planilha.
	 * @param sheet - uma instância de Sheet (representação da planilha).
	 */
	private static void gravarDadosRelatorioAluno(ArrayList<Object> dados, Row linha, Sheet sheet) {
		for (int i = 0; i < 8; i++) {
			Cell celula = linha.createCell(i + 1);

			switch (i) {
			case 0:
				celula.setCellValue((String) dados.get(0));
				break;
			case 1:
				celula.setCellValue((String) dados.get(1));
				break;
			case 2:
				celula.setCellValue((String) dados.get(2));
				break;
			case 3:
				celula.setCellValue((String) dados.get(3));
				break;
			case 4:
				celula.setCellValue((String) dados.get(4));
				break;
			case 5:
				celula.setCellValue((String) dados.get(5));
				break;
			case 6:
				celula.setCellValue((String) dados.get(6));
				break;
			case 7:
				int nota = (int) dados.get(7);
				celula.setCellValue(nota);
				break;
			}

			CellRangeAddress region = new CellRangeAddress(celula.getRowIndex(), celula.getRowIndex(),
					celula.getColumnIndex(), celula.getColumnIndex());
			RegionUtil.setBorderTop(BorderStyle.THIN, region, sheet);
			RegionUtil.setBorderBottom(BorderStyle.THIN, region, sheet);
			RegionUtil.setBorderLeft(BorderStyle.THIN, region, sheet);
			RegionUtil.setBorderRight(BorderStyle.THIN, region, sheet);

		}

	}

	/**
	 * Gera uma planilha tendo como base a matriz de dados que corresponde ao
	 * relatório por disicplina, o nome dela e a data em que a avaliação foi
	 * realizada.
	 * 
	 * @param matrizDados    - a matriz de dados que corresponde aos dados
	 *                       utilizados para a geração da tabela de relatório por
	 *                       disciplina.
	 * @param nomeDisciplina - uma <code>String</code> que corresponde ao nome da
	 *                       disciplina para a qual está sendo gerada o relatório.
	 * @param dataAvaliacao  - valor do tipo <code>String</code> que corresponde à
	 *                       data de realização da avaliação.
	 * @param excelFilePath  - valor do tipo <code>String</code> que corresponde ao
	 *                       caminho da geração da planilha.
	 * @throws IOException
	 */
	public static void planilhaRelatorioDisciplina(Map<Integer, Object> matrizDados, String nomeDisciplina,
			String dataAvaliacao, String excelFilePath) throws IOException {
		Workbook workbook = new HSSFWorkbook();

		Sheet sheet = workbook.createSheet();
		sheet.setColumnWidth(1, 20 * 256);
		sheet.setColumnWidth(2, 25 * 256);
		sheet.setColumnWidth(3, 26 * 256);
		sheet.setColumnWidth(4, 6 * 256);

		sheet.addMergedRegion(new CellRangeAddress(0, 0, 1, 3));
		sheet.addMergedRegion(new CellRangeAddress(3, 3, 1, 2));

		CellStyle cellStyle = sheet.getWorkbook().createCellStyle();
		Font font = sheet.getWorkbook().createFont();
		font.setBold(true);
		font.setFontHeightInPoints((short) 14);
		cellStyle.setFont(font);

		int rowCount = -1;

		for (int i = 0; i < matrizDados.size() + 7; i++) {
			Row linha = sheet.createRow(++rowCount);

			if (i == 0) {
				Cell celula = linha.createCell(i + 1);
				celula.setCellStyle(cellStyle);
				celula.setCellValue("Relatório: Gestão Empresarial EaD");
			} else if (i == 3) {
				Cell celula = linha.createCell(i - 2);
				celula.setCellValue("Disciplina: " + nomeDisciplina);
				celula = linha.createCell(i);
				celula.setCellValue("Data da avaliação: " + dataAvaliacao);
			} else if (i == 4) {
				Cell celula = linha.createCell(i - 3);
				celula.setCellValue("");
				celula = linha.createCell(i - 1);
				celula.setCellValue("Data da emissão: "
						+ new SimpleDateFormat("dd-MM-yyyy").format(Calendar.getInstance().getTime()));
			} else if (i == 6) {
				Cell celula = linha.createCell(i - 5);
				celula.setCellValue("RA");
				celula = linha.createCell(i - 4);
				celula.setCellValue("Nome do aluno");
				celula = linha.createCell(i - 2);
				celula.setCellValue("Nota");
			} else if (i > 6) {
				gravarDadosRelatorioDisciplina((ArrayList<Object>) matrizDados.get(i - 7), linha, sheet);
			}

		}

		try (FileOutputStream outputStream = new FileOutputStream(excelFilePath)) {
			workbook.write(outputStream);
		}

		workbook.close();
	}

	/**
	 * Insere os dados de um determinado vetor contido na matriz de dados na
	 * planilha.
	 * 
	 * @param dados - o vetor de dados a ser inserido na planilha.
	 * @param linha - a linha atual na inserção de dados na planilha.
	 * @param sheet - uma instância de Sheet (representação da planilha).
	 */
	private static void gravarDadosRelatorioDisciplina(ArrayList<Object> dados, Row linha, Sheet sheet) {
		for (int i = 0; i < 4; i++) {
			Cell celula = linha.createCell(i + 1);

			if (i == 0) {
				celula.setCellValue((String) dados.get(0));
			} else if (i == 1) {
				sheet.addMergedRegion(new CellRangeAddress(linha.getRowNum(), linha.getRowNum(), 2, 3));
				celula.setCellValue((String) dados.get(1));
			} else if (i == 3) {
				int nota = (int) dados.get(2);
				celula.setCellValue(nota);
			}

			CellRangeAddress region = new CellRangeAddress(celula.getRowIndex(), celula.getRowIndex(),
					celula.getColumnIndex(), celula.getColumnIndex());
			RegionUtil.setBorderTop(BorderStyle.THIN, region, sheet);
			RegionUtil.setBorderBottom(BorderStyle.THIN, region, sheet);
			RegionUtil.setBorderLeft(BorderStyle.THIN, region, sheet);
			RegionUtil.setBorderRight(BorderStyle.THIN, region, sheet);

		}

	}

}
