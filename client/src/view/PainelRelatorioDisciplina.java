package view;

import java.awt.Font;
import java.awt.GridBagConstraints;
import java.awt.GridBagLayout;
import java.awt.Insets;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.io.File;
import java.io.IOException;
import java.util.Map;

import javax.print.PrintServiceLookup;
import javax.swing.JButton;
import javax.swing.JLabel;
import javax.swing.JOptionPane;
import javax.swing.JPanel;
import javax.swing.JScrollPane;
import javax.swing.JTable;
import javax.swing.ListSelectionModel;

//import model.Aluno;
import model.DisciplinaDAO;
import util.GeraPlanilhaRelatorio;
import util.ImprimirPlanilhaRelatorio;
import view.components.BtnSair;
import view.components.BtnVoltar;
import view.components.MenuBarCoord;

public class PainelRelatorioDisciplina extends JPanel {

	private static final long serialVersionUID = 1L;
	private JTable tabelaRelatorioAluno;
	private DisciplinaDAO dao = new DisciplinaDAO();

	/**
	 * Create the panel.
	 */
	public PainelRelatorioDisciplina(String nomeDisciplina, String dataAvaliacao) {
		GridBagLayout gridBagLayout = new GridBagLayout();
		gridBagLayout.columnWidths = new int[] { 66, 100, 450, 100, 66, 0 };
		gridBagLayout.rowHeights = new int[] { 28, 0, 0, 272, 0, 0 };
		gridBagLayout.columnWeights = new double[] { 0.0, 0.0, 1.0, 0.0, 0.0, Double.MIN_VALUE };
		gridBagLayout.rowWeights = new double[] { 0.0, 0.0, 1.0, 1.0, 1.0, Double.MIN_VALUE };
		setLayout(gridBagLayout);

		MenuBarCoord mbc = new MenuBarCoord();
		GridBagConstraints gbc_mbc = new GridBagConstraints();
		gbc_mbc.gridwidth = 5;
		gbc_mbc.anchor = GridBagConstraints.NORTH;
		gbc_mbc.fill = GridBagConstraints.HORIZONTAL;
		gbc_mbc.insets = new Insets(0, 0, 5, 0);
		gbc_mbc.gridx = 0;
		gbc_mbc.gridy = 0;
		add(mbc, gbc_mbc);

		BtnVoltar btnVoltar = new BtnVoltar("Voltar");
		GridBagConstraints gbc_btnVoltar = new GridBagConstraints();
		gbc_btnVoltar.anchor = GridBagConstraints.NORTHWEST;
		gbc_btnVoltar.insets = new Insets(0, 0, 5, 5);
		gbc_btnVoltar.gridx = 0;
		gbc_btnVoltar.gridy = 1;
		add(btnVoltar, gbc_btnVoltar);

		BtnSair btnSair = new BtnSair("Sair");
		GridBagConstraints gbc_btnSair = new GridBagConstraints();
		gbc_btnSair.insets = new Insets(0, 0, 5, 0);
		gbc_btnSair.gridx = 4;
		gbc_btnSair.gridy = 1;
		add(btnSair, gbc_btnSair);

		JPanel containerLabel = new JPanel();
		GridBagConstraints gbc_containerLabel = new GridBagConstraints();
		gbc_containerLabel.insets = new Insets(0, 0, 5, 5);
		gbc_containerLabel.fill = GridBagConstraints.BOTH;
		gbc_containerLabel.gridx = 2;
		gbc_containerLabel.gridy = 2;
		add(containerLabel, gbc_containerLabel);
		GridBagLayout gbl_containerLabel = new GridBagLayout();
		gbl_containerLabel.rowWeights = new double[] { 1.0 };
		gbl_containerLabel.columnWeights = new double[] { 1.0 };
		containerLabel.setLayout(gbl_containerLabel);

		JLabel lblRelatorioDisciplina = new JLabel("Relatório - " + nomeDisciplina);
		lblRelatorioDisciplina.setFont(new Font("Tahoma", Font.BOLD, 40));
		GridBagConstraints gbc_lblRelatorioDisciplina = new GridBagConstraints();
		gbc_lblRelatorioDisciplina.anchor = GridBagConstraints.SOUTHWEST;
		gbc_lblRelatorioDisciplina.gridx = 0;
		gbc_lblRelatorioDisciplina.gridy = 0;
		containerLabel.add(lblRelatorioDisciplina, gbc_lblRelatorioDisciplina);

		JScrollPane containerListaAlunos = new JScrollPane();
		GridBagConstraints gbc_containerListaAlunos = new GridBagConstraints();
		gbc_containerListaAlunos.insets = new Insets(0, 0, 5, 5);
		gbc_containerListaAlunos.fill = GridBagConstraints.BOTH;
		gbc_containerListaAlunos.gridx = 2;
		gbc_containerListaAlunos.gridy = 3;
		add(containerListaAlunos, gbc_containerListaAlunos);

		tabelaRelatorioAluno = new JTable();
		try {
			tabelaRelatorioAluno.setModel(dao.carregarTabelaRelatorioDisciplina(nomeDisciplina, dataAvaliacao));
		} catch (Exception e) {
			JOptionPane.showMessageDialog(null, "Falha na Conexão: " + e.getMessage());
			PainelMenuCoordenador p = new PainelMenuCoordenador();
			FramePatec.getFrame().setContentPane(p);
			FramePatec.getFrame().revalidate();
			FramePatec.getFrame().repaint();
		}
		tabelaRelatorioAluno.setSelectionMode(ListSelectionModel.SINGLE_SELECTION);
		containerListaAlunos.setViewportView(tabelaRelatorioAluno);
		tabelaRelatorioAluno.setFillsViewportHeight(true);

		JButton btnImprimirRelatorioDisciplina = new JButton("Imprimir Relatório");
		btnImprimirRelatorioDisciplina.addActionListener(new ActionListener() {
			public void actionPerformed(ActionEvent e) {

				if (JOptionPane.showConfirmDialog(null, "O relatório será impresso utilizando a impressora padrão:\n"
						+ PrintServiceLookup.lookupDefaultPrintService().getName()
						+ "\n\nCaso deseje alterar a impressora a ser utilizada,\nvá em: Painel de Controle > Dispositivos e Impressoras"
						+ "\n\nEm seguida, clique com o botão direito na impressora\ndesejada e selecione \"Definir como impressora padrão\".",
						"Confirmar impressão", JOptionPane.OK_CANCEL_OPTION, JOptionPane.INFORMATION_MESSAGE) == 0) {
					Map<Integer, Object> matrizDados = dao.GerarRelatorioDisciplina(nomeDisciplina, dataAvaliacao);
					try {
						GeraPlanilhaRelatorio.planilhaRelatorioDisciplina(matrizDados, nomeDisciplina, dataAvaliacao,
								"spreadsheets/RelatorioDisciplina.xls");
						ImprimirPlanilhaRelatorio.imprimeRelatorio("spreadsheets/RelatorioDisciplina.xls");

					} catch (IOException e1) {
						new File("spreadsheets").mkdir();
						try {
							GeraPlanilhaRelatorio.planilhaRelatorioDisciplina(matrizDados, nomeDisciplina,
									dataAvaliacao, "spreadsheets/RelatorioDisciplina.xls");
							ImprimirPlanilhaRelatorio.imprimeRelatorio("spreadsheets/RelatorioDisciplina.xls");
						} catch (IOException e2) {
							e2.printStackTrace();
						}
					}
				}
			}
		});
		GridBagConstraints gbc_btnImprimirRelatorioDisciplina = new GridBagConstraints();
		gbc_btnImprimirRelatorioDisciplina.anchor = GridBagConstraints.NORTHEAST;
		gbc_btnImprimirRelatorioDisciplina.insets = new Insets(0, 0, 0, 5);
		gbc_btnImprimirRelatorioDisciplina.gridx = 2;
		gbc_btnImprimirRelatorioDisciplina.gridy = 4;
		add(btnImprimirRelatorioDisciplina, gbc_btnImprimirRelatorioDisciplina);
	}

}