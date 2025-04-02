package view;

import java.awt.Font;
import java.awt.GridBagConstraints;
import java.awt.GridBagLayout;
import java.awt.Insets;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;

import javax.swing.Box;
import javax.swing.JButton;
import javax.swing.JLabel;
import javax.swing.JOptionPane;
import javax.swing.JPanel;
import javax.swing.JScrollPane;
import javax.swing.JTable;
import javax.swing.ListSelectionModel;

import model.Aluno;
import model.AlunoDAO;
import view.components.BtnSair;
import view.components.BtnVoltar;
import view.components.MenuBarCoord;

public class PainelListarAlunos extends JPanel {

	private static final long serialVersionUID = 1L;
	private JTable tabelaAlunos;
	private AlunoDAO dao = new AlunoDAO();

	/**
	 * Create the panel.
	 */
	public PainelListarAlunos() {
		GridBagLayout gridBagLayout = new GridBagLayout();
		gridBagLayout.columnWidths = new int[] { 66, 450, 100, 66, 0 };
		gridBagLayout.rowHeights = new int[] { 28, 0, 0, 272, 0, 0 };
		gridBagLayout.columnWeights = new double[] { 0.0, 1.0, 0.0, 0.0, Double.MIN_VALUE };
		gridBagLayout.rowWeights = new double[] { 0.0, 0.0, 1.0, 1.0, 1.0, Double.MIN_VALUE };
		setLayout(gridBagLayout);

		MenuBarCoord mbc = new MenuBarCoord();
		GridBagConstraints gbc_mbc = new GridBagConstraints();
		gbc_mbc.gridwidth = 4;
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
		gbc_btnSair.gridx = 3;
		gbc_btnSair.gridy = 1;
		add(btnSair, gbc_btnSair);

		JPanel containerLabel = new JPanel();
		GridBagConstraints gbc_containerLabel = new GridBagConstraints();
		gbc_containerLabel.insets = new Insets(0, 0, 5, 5);
		gbc_containerLabel.fill = GridBagConstraints.BOTH;
		gbc_containerLabel.gridx = 1;
		gbc_containerLabel.gridy = 2;
		add(containerLabel, gbc_containerLabel);
		GridBagLayout gbl_containerLabel = new GridBagLayout();
		gbl_containerLabel.rowWeights = new double[] { 1.0 };
		gbl_containerLabel.columnWeights = new double[] { 1.0 };
		containerLabel.setLayout(gbl_containerLabel);

		JLabel lblAluno = new JLabel("Alunos");
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
		gbc_containerListaAlunos.gridx = 1;
		gbc_containerListaAlunos.gridy = 3;
		add(containerListaAlunos, gbc_containerListaAlunos);

		tabelaAlunos = new JTable();
		try {
			tabelaAlunos.setModel(dao.carregarTabelaListarAlunos());
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

		JPanel containerButtons = new JPanel();
		GridBagConstraints gbc_containerButtons = new GridBagConstraints();
		gbc_containerButtons.insets = new Insets(0, 0, 5, 5);
		gbc_containerButtons.fill = GridBagConstraints.BOTH;
		gbc_containerButtons.gridx = 2;
		gbc_containerButtons.gridy = 3;
		add(containerButtons, gbc_containerButtons);
		GridBagLayout gbl_containerButtons = new GridBagLayout();
		gbl_containerButtons.columnWidths = new int[] { 0, 0 };
		gbl_containerButtons.rowHeights = new int[] { 0, 0, 0, 0, 0, 0, 0 };
		gbl_containerButtons.columnWeights = new double[] { 0.0, Double.MIN_VALUE };
		gbl_containerButtons.rowWeights = new double[] { 1.0, 0.0, 0.0, 0.0, 0.0, 0.0, Double.MIN_VALUE };
		containerButtons.setLayout(gbl_containerButtons);

		// Seção de Matrícula em Disciplinas
		JLabel lblMatricula = new JLabel("<html>Matrícula de Aluno<br>em Disciplinas:</html>");
		lblMatricula.setFont(new Font("Tahoma", Font.PLAIN, 11));
		GridBagConstraints gbc_lblMatricula = new GridBagConstraints();
		gbc_lblMatricula.anchor = GridBagConstraints.WEST;
		gbc_lblMatricula.insets = new Insets(0, 0, 5, 0);
		gbc_lblMatricula.gridx = 0;
		gbc_lblMatricula.gridy = 1;
		containerButtons.add(lblMatricula, gbc_lblMatricula);

		JButton btnMatricular = new JButton("Matricular");
		btnMatricular.addActionListener(new ActionListener() {
			public void actionPerformed(ActionEvent e) {
				if (tabelaAlunos.getSelectedRow() != -1) {
					PainelCadastroAlunoDisciplina p = new PainelCadastroAlunoDisciplina(
							new Aluno(tabelaAlunos.getModel().getValueAt(tabelaAlunos.getSelectedRow(), 0).toString(),
									tabelaAlunos.getModel().getValueAt(tabelaAlunos.getSelectedRow(), 1).toString(),
									tabelaAlunos.getModel().getValueAt(tabelaAlunos.getSelectedRow(), 2).toString(),
									tabelaAlunos.getModel().getValueAt(tabelaAlunos.getSelectedRow(), 3).toString()));
					FramePatec.getFrame().setTitle("Patec - Matricular Aluno");
					FramePatec.getFrame().setContentPane(p);
					FramePatec.getFrame().revalidate();
					FramePatec.getFrame().repaint();
				}
			}
		});
		GridBagConstraints gbc_btnMatricular = new GridBagConstraints();
		gbc_btnMatricular.fill = GridBagConstraints.BOTH;
		gbc_btnMatricular.insets = new Insets(0, 0, 5, 0);
		gbc_btnMatricular.gridx = 0;
		gbc_btnMatricular.gridy = 2;
		containerButtons.add(btnMatricular, gbc_btnMatricular);

		// Espaçamento entre as seções
		GridBagConstraints gbc_spacing = new GridBagConstraints();
		gbc_spacing.insets = new Insets(0, 0, 20, 0);
		gbc_spacing.gridx = 0;
		gbc_spacing.gridy = 3;
		containerButtons.add(Box.createVerticalStrut(20), gbc_spacing);

		// Seção de Gerenciamento de Alunos
		JLabel lblCrudAluno = new JLabel("<html>Gerenciamento de<br>Alunos (CRUD):</html>");
		lblCrudAluno.setFont(new Font("Tahoma", Font.PLAIN, 11));
		GridBagConstraints gbc_lblCrudAluno = new GridBagConstraints();
		gbc_lblCrudAluno.anchor = GridBagConstraints.WEST;
		gbc_lblCrudAluno.insets = new Insets(0, 0, 5, 0);
		gbc_lblCrudAluno.gridx = 0;
		gbc_lblCrudAluno.gridy = 4;
		containerButtons.add(lblCrudAluno, gbc_lblCrudAluno);

		JButton btnCadastrar = new JButton("Cadastrar");
		btnCadastrar.addActionListener(new ActionListener() {
			public void actionPerformed(ActionEvent e) {
				PainelCadastroAluno p = new PainelCadastroAluno();
				FramePatec.getFrame().setTitle("Patec - Cadastrar Aluno");
				FramePatec.getFrame().setContentPane(p);
				FramePatec.getFrame().revalidate();
				FramePatec.getFrame().repaint();
			}
		});
		GridBagConstraints gbc_btnCadastrar = new GridBagConstraints();
		gbc_btnCadastrar.fill = GridBagConstraints.BOTH;
		gbc_btnCadastrar.insets = new Insets(0, 0, 5, 0);
		gbc_btnCadastrar.gridx = 0;
		gbc_btnCadastrar.gridy = 5;
		containerButtons.add(btnCadastrar, gbc_btnCadastrar);

		JButton btnEditar = new JButton("Editar");
		btnEditar.addActionListener(new ActionListener() {
			public void actionPerformed(ActionEvent e) {
				if (tabelaAlunos.getSelectedRow() != -1) {
					PainelEditarAluno p = new PainelEditarAluno(
							new Aluno(tabelaAlunos.getModel().getValueAt(tabelaAlunos.getSelectedRow(), 0).toString(),
									tabelaAlunos.getModel().getValueAt(tabelaAlunos.getSelectedRow(), 1).toString(),
									tabelaAlunos.getModel().getValueAt(tabelaAlunos.getSelectedRow(), 2).toString(),
									tabelaAlunos.getModel().getValueAt(tabelaAlunos.getSelectedRow(), 3).toString()));
					FramePatec.getFrame().setTitle("Patec - Editar Aluno");
					FramePatec.getFrame().setContentPane(p);
					FramePatec.getFrame().revalidate();
					FramePatec.getFrame().repaint();
				}
			}
		});
		GridBagConstraints gbc_btnEditar = new GridBagConstraints();
		gbc_btnEditar.fill = GridBagConstraints.BOTH;
		gbc_btnEditar.insets = new Insets(0, 0, 5, 0);
		gbc_btnEditar.gridx = 0;
		gbc_btnEditar.gridy = 6;
		containerButtons.add(btnEditar, gbc_btnEditar);

		JButton btnExcluir = new JButton("Excluir");
		btnExcluir.addActionListener(new ActionListener() {
			public void actionPerformed(ActionEvent e) {
				if (tabelaAlunos.getSelectedRow() != -1 && JOptionPane.showConfirmDialog(null,
						"Deseja excluir este registro?", "Confirmar exclusão", JOptionPane.YES_NO_OPTION) == 0) {
					dao.excluir(tabelaAlunos.getValueAt(tabelaAlunos.getSelectedRow(), 0));
					PainelListarAlunos p = new PainelListarAlunos();
					FramePatec.getFrame().setContentPane(p);
					FramePatec.getFrame().revalidate();
					FramePatec.getFrame().repaint();
				}
			}
		});
		GridBagConstraints gbc_btnExcluir = new GridBagConstraints();
		gbc_btnExcluir.fill = GridBagConstraints.BOTH;
		gbc_btnExcluir.gridx = 0;
		gbc_btnExcluir.gridy = 7;
		containerButtons.add(btnExcluir, gbc_btnExcluir);
	}

}