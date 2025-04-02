package view;

import java.awt.Font;
import java.awt.GridBagConstraints;
import java.awt.GridBagLayout;
import java.awt.Insets;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;

import javax.swing.JButton;
import javax.swing.JLabel;
import javax.swing.JOptionPane;
import javax.swing.JPanel;
import javax.swing.JScrollPane;
import javax.swing.JTable;
import javax.swing.ListSelectionModel;

import model.AlunoDAO;
import view.components.BtnSair;
import view.components.BtnVoltar;
import view.components.MenuBarCoord;

public class PainelSelecionarAluno extends JPanel {

	private static final long serialVersionUID = 1L;
	private JTable tabelaAlunos;
	private AlunoDAO dao = new AlunoDAO();


	/**
	 * Create the panel.
	 */
	public PainelSelecionarAluno() {
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

		JLabel lblAluno = new JLabel("Selecionar aluno");
		lblAluno.setFont(new Font("Tahoma", Font.BOLD, 40));
		GridBagConstraints gbc_lblAluno = new GridBagConstraints();
		gbc_lblAluno.anchor = GridBagConstraints.SOUTHWEST;
		gbc_lblAluno.gridx = 0;
		gbc_lblAluno.gridy = 0;
		containerLabel.add(lblAluno, gbc_lblAluno);

		JScrollPane containerListaAlunos = new JScrollPane();
		GridBagConstraints gbc_containerListaAlunos = new GridBagConstraints();
		gbc_containerListaAlunos.insets = new Insets(0, 0, 5, 5);
		gbc_containerListaAlunos.fill = GridBagConstraints.BOTH;
		gbc_containerListaAlunos.gridx = 2;
		gbc_containerListaAlunos.gridy = 3;
		add(containerListaAlunos, gbc_containerListaAlunos);

		tabelaAlunos = new JTable();
		try {
			tabelaAlunos.setModel(dao.carregarTabelaSelecionarAluno());
		} catch (Exception e) {
			JOptionPane.showMessageDialog(null, "Falha na Conexão: " + e.getMessage());
			PainelMenuCoordenador p = new PainelMenuCoordenador();
			FramePatec.getFrame().setContentPane(p);
			FramePatec.getFrame().revalidate();
			FramePatec.getFrame().repaint();
		}
		tabelaAlunos.setSelectionMode(ListSelectionModel.SINGLE_SELECTION);
		containerListaAlunos.setViewportView(tabelaAlunos);
		tabelaAlunos.setFillsViewportHeight(true);

		JButton btnConfirmar = new JButton("Confirmar");
		btnConfirmar.addActionListener(new ActionListener() {
			public void actionPerformed(ActionEvent e) {
				PainelConsultaRelatorio p = new PainelConsultaRelatorio(
						tabelaAlunos.getModel().getValueAt(tabelaAlunos.getSelectedRow(), 0).toString());
				FramePatec.frame.setContentPane(p);
				FramePatec.frame.revalidate();
				FramePatec.frame.repaint();
			}
		});
		GridBagConstraints gbc_btnConfirmar = new GridBagConstraints();
		gbc_btnConfirmar.anchor = GridBagConstraints.NORTHEAST;
		gbc_btnConfirmar.insets = new Insets(0, 0, 0, 5);
		gbc_btnConfirmar.gridx = 2;
		gbc_btnConfirmar.gridy = 4;
		add(btnConfirmar, gbc_btnConfirmar);
	}

}