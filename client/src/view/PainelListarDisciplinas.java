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

import model.Disciplina;
import model.DisciplinaDAO;
import view.components.BtnSair;
import view.components.BtnVoltar;
import view.components.MenuBarCoord;

public class PainelListarDisciplinas extends JPanel {

	private static final long serialVersionUID = 1L;
	private JTable tabelaDisciplinas;
	private DisciplinaDAO dao = new DisciplinaDAO();

	/**
	 * Create the panel.
	 */
	public PainelListarDisciplinas() {
		GridBagLayout gridBagLayout = new GridBagLayout();
		gridBagLayout.columnWidths = new int[] { 66, 450, 0, 66, 0 };
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

		JPanel containerLabels = new JPanel();
		GridBagConstraints gbc_containerLabels = new GridBagConstraints();
		gbc_containerLabels.insets = new Insets(0, 0, 5, 5);
		gbc_containerLabels.fill = GridBagConstraints.BOTH;
		gbc_containerLabels.gridx = 1;
		gbc_containerLabels.gridy = 2;
		add(containerLabels, gbc_containerLabels);
		GridBagLayout gbl_containerLabels = new GridBagLayout();
		gbl_containerLabels.columnWidths = new int[] { 0, 0 };
		gbl_containerLabels.rowHeights = new int[] { 0, 0 };
		gbl_containerLabels.columnWeights = new double[] { 1.0, Double.MIN_VALUE };
		gbl_containerLabels.rowWeights = new double[] { 1.0, Double.MIN_VALUE };
		containerLabels.setLayout(gbl_containerLabels);

		JLabel lblDisciplinas = new JLabel("Disciplinas");
		lblDisciplinas.setFont(new Font("Tahoma", Font.BOLD, 40));
		GridBagConstraints gbc_lblDisciplinas = new GridBagConstraints();
		gbc_lblDisciplinas.anchor = GridBagConstraints.SOUTHWEST;
		gbc_lblDisciplinas.gridx = 0;
		gbc_lblDisciplinas.gridy = 0;
		containerLabels.add(lblDisciplinas, gbc_lblDisciplinas);

		JScrollPane containerListaDisciplinas = new JScrollPane();
		GridBagConstraints gbc_containerListaDisciplinas = new GridBagConstraints();
		gbc_containerListaDisciplinas.insets = new Insets(0, 0, 5, 5);
		gbc_containerListaDisciplinas.fill = GridBagConstraints.BOTH;
		gbc_containerListaDisciplinas.gridx = 1;
		gbc_containerListaDisciplinas.gridy = 3;
		add(containerListaDisciplinas, gbc_containerListaDisciplinas);

		tabelaDisciplinas = new JTable();
		try {
			tabelaDisciplinas.setModel(dao.carregarTabelaListarDisciplinas());
		} catch (Exception e) {
            JOptionPane.showMessageDialog(null, "Falha na Conexão: " + e.getMessage());
			PainelMenuCoordenador p = new PainelMenuCoordenador();
			FramePatec.getFrame().setContentPane(p);
			FramePatec.getFrame().revalidate();
			FramePatec.getFrame().repaint();
		}
		tabelaDisciplinas.setSelectionMode(ListSelectionModel.SINGLE_SELECTION);
		containerListaDisciplinas.setViewportView(tabelaDisciplinas);
		tabelaDisciplinas.setFillsViewportHeight(true);

		JPanel containerButtons = new JPanel();
		GridBagConstraints gbc_containerButtons = new GridBagConstraints();
		gbc_containerButtons.insets = new Insets(0, 0, 5, 5);
		gbc_containerButtons.fill = GridBagConstraints.BOTH;
		gbc_containerButtons.gridx = 2;
		gbc_containerButtons.gridy = 3;
		add(containerButtons, gbc_containerButtons);
		GridBagLayout gbl_containerButtons = new GridBagLayout();
		gbl_containerButtons.columnWidths = new int[] { 0, 0 };
		gbl_containerButtons.rowHeights = new int[] { 0, 0, 0, 0, 0 };
		gbl_containerButtons.columnWeights = new double[] { 0.0, Double.MIN_VALUE };
		gbl_containerButtons.rowWeights = new double[] { 1.0, 0.0, 0.0, 0.0, Double.MIN_VALUE };
		containerButtons.setLayout(gbl_containerButtons);
		
		JLabel lblCrudDisciplinas = new JLabel("<html>Gerenciamento de<br>Disciplinas (CRUD):</html>");
		lblCrudDisciplinas.setFont(new Font("Tahoma", Font.PLAIN, 11));
		GridBagConstraints gbc_lblCrudDisciplinas = new GridBagConstraints();
		gbc_lblCrudDisciplinas.anchor = GridBagConstraints.SOUTHWEST;
		gbc_lblCrudDisciplinas.insets = new Insets(0, 0, 5, 0);
		gbc_lblCrudDisciplinas.gridx = 0;
		gbc_lblCrudDisciplinas.gridy = 0;
		containerButtons.add(lblCrudDisciplinas, gbc_lblCrudDisciplinas);

		JButton btnCadastrar = new JButton("Cadastrar");
		btnCadastrar.addActionListener(new ActionListener() {
			public void actionPerformed(ActionEvent e) {
				PainelCadastroDisciplina p = new PainelCadastroDisciplina();
				FramePatec.getFrame().setTitle("Patec - Cadastrar Disciplina");
				FramePatec.getFrame().setContentPane(p);
				FramePatec.getFrame().revalidate();
				FramePatec.getFrame().repaint();
			}
		});
		GridBagConstraints gbc_btnCadastrar = new GridBagConstraints();
		gbc_btnCadastrar.fill = GridBagConstraints.BOTH;
		gbc_btnCadastrar.insets = new Insets(0, 0, 5, 0);
		gbc_btnCadastrar.gridx = 0;
		gbc_btnCadastrar.gridy = 1;
		containerButtons.add(btnCadastrar, gbc_btnCadastrar);

		JButton btnEditar = new JButton("Editar");
		btnEditar.addActionListener(new ActionListener() {
			public void actionPerformed(ActionEvent e) {
				if (tabelaDisciplinas.getSelectedRow() != -1) {
					PainelEditarDisciplina p = new PainelEditarDisciplina(new Disciplina(
							tabelaDisciplinas.getModel().getValueAt(tabelaDisciplinas.getSelectedRow(), 0).toString(),
							tabelaDisciplinas.getModel().getValueAt(tabelaDisciplinas.getSelectedRow(), 1).toString(),
							Integer.parseInt(tabelaDisciplinas.getModel()
									.getValueAt(tabelaDisciplinas.getSelectedRow(), 2).toString())));
					FramePatec.getFrame().setTitle("Patec - Editar Disciplina");
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
		gbc_btnEditar.gridy = 2;
		containerButtons.add(btnEditar, gbc_btnEditar);

		JButton btnExcluir = new JButton("Excluir");
		btnExcluir.addActionListener(new ActionListener() {
			public void actionPerformed(ActionEvent e) {
				if (tabelaDisciplinas.getSelectedRow() != -1 && JOptionPane.showConfirmDialog(null,
						"Deseja excluir este registro?", "Confirmar exclusão", JOptionPane.YES_NO_OPTION) == 0) {
					dao.excluir(tabelaDisciplinas.getValueAt(tabelaDisciplinas.getSelectedRow(), 0));
					PainelListarDisciplinas p = new PainelListarDisciplinas();
					FramePatec.getFrame().setContentPane(p);
					FramePatec.getFrame().revalidate();
					FramePatec.getFrame().repaint();
				}
			}
		});
		GridBagConstraints gbc_btnExcluir = new GridBagConstraints();
		gbc_btnExcluir.fill = GridBagConstraints.BOTH;
		gbc_btnExcluir.gridx = 0;
		gbc_btnExcluir.gridy = 3;
		containerButtons.add(btnExcluir, gbc_btnExcluir);
	}

}