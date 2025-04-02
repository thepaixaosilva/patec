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

import model.Avaliacao;
import model.AvaliacaoDAO;
import view.components.BtnSair;
import view.components.BtnVoltar;
import view.components.MenuBarCoord;

public class PainelListarAvaliacoes extends JPanel {

	private static final long serialVersionUID = 1L;
	private JTable tabelaAvaliacoes;
	private AvaliacaoDAO dao = new AvaliacaoDAO();

	/**
	 * Create the panel.
	 */
	public PainelListarAvaliacoes() {
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

		JScrollPane containerListaAvaliacoes = new JScrollPane();
		GridBagConstraints gbc_containerListaAvaliacoes = new GridBagConstraints();
		gbc_containerListaAvaliacoes.insets = new Insets(0, 0, 5, 5);
		gbc_containerListaAvaliacoes.fill = GridBagConstraints.BOTH;
		gbc_containerListaAvaliacoes.gridx = 1;
		gbc_containerListaAvaliacoes.gridy = 3;
		add(containerListaAvaliacoes, gbc_containerListaAvaliacoes);
		
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

		JLabel lblAvaliacoes = new JLabel("Avaliações");
		lblAvaliacoes.setFont(new Font("Tahoma", Font.BOLD, 40));
		GridBagConstraints gbc_lblAvaliacoes = new GridBagConstraints();
		gbc_lblAvaliacoes.anchor = GridBagConstraints.SOUTHWEST;
		gbc_lblAvaliacoes.gridx = 0;
		gbc_lblAvaliacoes.gridy = 0;
		containerLabels.add(lblAvaliacoes, gbc_lblAvaliacoes);

		tabelaAvaliacoes = new JTable();
		try {
			tabelaAvaliacoes.setModel(dao.carregarTabela());
		} catch (Exception e)  {
			JOptionPane.showMessageDialog(null, "Falha na Conexão: " + e.getMessage());
			PainelMenuCoordenador p = new PainelMenuCoordenador();
			FramePatec.getFrame().setContentPane(p);
			FramePatec.getFrame().revalidate();
			FramePatec.getFrame().repaint();
		}
		tabelaAvaliacoes.setSelectionMode(ListSelectionModel.SINGLE_SELECTION);
		containerListaAvaliacoes.setViewportView(tabelaAvaliacoes);
		tabelaAvaliacoes.setFillsViewportHeight(true);

		JPanel panel = new JPanel();
		GridBagConstraints gbc_panel = new GridBagConstraints();
		gbc_panel.insets = new Insets(0, 0, 5, 5);
		gbc_panel.fill = GridBagConstraints.BOTH;
		gbc_panel.gridx = 2;
		gbc_panel.gridy = 3;
		add(panel, gbc_panel);
		GridBagLayout gbl_panel = new GridBagLayout();
		gbl_panel.columnWidths = new int[] { 0, 0 };
		gbl_panel.rowHeights = new int[] { 0, 0, 0, 0, 0 };
		gbl_panel.columnWeights = new double[] { 0.0, Double.MIN_VALUE };
		gbl_panel.rowWeights = new double[] { 1.0, 0.0, 0.0, 0.0, Double.MIN_VALUE };
		panel.setLayout(gbl_panel);
		
		JLabel lblCrudAvaliacao = new JLabel("<html>Gerenciamento de<br>Avaliações (CRUD):</html>");
		lblCrudAvaliacao.setFont(new Font("Tahoma", Font.PLAIN, 11));
		GridBagConstraints gbc_lblCrudAvaliacao = new GridBagConstraints();
		gbc_lblCrudAvaliacao.anchor = GridBagConstraints.SOUTHWEST;
		gbc_lblCrudAvaliacao.insets = new Insets(0, 0, 5, 0);
		gbc_lblCrudAvaliacao.gridx = 0;
		gbc_lblCrudAvaliacao.gridy = 0;
		panel.add(lblCrudAvaliacao, gbc_lblCrudAvaliacao);

		JButton btnCadastrar = new JButton("Cadastrar");
		btnCadastrar.addActionListener(new ActionListener() {
			public void actionPerformed(ActionEvent e) {
				PainelCadastroAvaliacao p = new PainelCadastroAvaliacao();
				FramePatec.getFrame().setTitle("Patec - Cadastrar Avaliação");
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
		panel.add(btnCadastrar, gbc_btnCadastrar);

		JButton btnEditar = new JButton("Editar");
		btnEditar.addActionListener(new ActionListener() {
			public void actionPerformed(ActionEvent e) {
				if (tabelaAvaliacoes.getSelectedRow() != -1) {
					PainelEditarAvaliacao p = new PainelEditarAvaliacao(new Avaliacao(
							Integer.parseInt(tabelaAvaliacoes.getModel()
									.getValueAt(tabelaAvaliacoes.getSelectedRow(), 0).toString()),
							tabelaAvaliacoes.getModel().getValueAt(tabelaAvaliacoes.getSelectedRow(), 1).toString(),
							tabelaAvaliacoes.getModel().getValueAt(tabelaAvaliacoes.getSelectedRow(), 2).toString()));
					FramePatec.getFrame().setTitle("Patec - Editar Avaliação");
					FramePatec.getFrame().setContentPane(p);
					FramePatec.getFrame().revalidate();
					FramePatec.getFrame().repaint();
				}
			}
		});
		GridBagConstraints gbc_btnNewButton_1 = new GridBagConstraints();
		gbc_btnNewButton_1.fill = GridBagConstraints.BOTH;
		gbc_btnNewButton_1.insets = new Insets(0, 0, 5, 0);
		gbc_btnNewButton_1.gridx = 0;
		gbc_btnNewButton_1.gridy = 2;
		panel.add(btnEditar, gbc_btnNewButton_1);

		JButton btnNewButton_2 = new JButton("Excluir");
		btnNewButton_2.addActionListener(new ActionListener() {
			public void actionPerformed(ActionEvent e) {
				if (tabelaAvaliacoes.getSelectedRow() != -1 && JOptionPane.showConfirmDialog(null,
						"Deseja excluir este registro?", "Confirmar exclusão", JOptionPane.YES_NO_OPTION) == 0) {
					dao.excluir(tabelaAvaliacoes.getValueAt(tabelaAvaliacoes.getSelectedRow(), 0));
					PainelListarAvaliacoes p = new PainelListarAvaliacoes();
					FramePatec.getFrame().setContentPane(p);
					FramePatec.getFrame().revalidate();
					FramePatec.getFrame().repaint();
				}
			}
		});
		GridBagConstraints gbc_btnNewButton_2 = new GridBagConstraints();
		gbc_btnNewButton_2.fill = GridBagConstraints.BOTH;
		gbc_btnNewButton_2.gridx = 0;
		gbc_btnNewButton_2.gridy = 3;
		panel.add(btnNewButton_2, gbc_btnNewButton_2);
	}

}