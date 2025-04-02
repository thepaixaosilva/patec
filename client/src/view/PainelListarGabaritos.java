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

import model.GabaritoOficial;
import model.GabaritoOficialDAO;
import view.components.BtnSair;
import view.components.BtnVoltar;
import view.components.MenuBarCoord;

public class PainelListarGabaritos extends JPanel {

	private static final long serialVersionUID = 1L;
	private JTable tabelaGabaritos;
	private GabaritoOficialDAO dao = new GabaritoOficialDAO();

	/**
	 * Create the panel.
	 */
	public PainelListarGabaritos() {
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

		JLabel lblGabaritos = new JLabel("Gabaritos");
		lblGabaritos.setFont(new Font("Tahoma", Font.BOLD, 40));
		GridBagConstraints gbc_lblGabaritos = new GridBagConstraints();
		gbc_lblGabaritos.anchor = GridBagConstraints.SOUTHWEST;
		gbc_lblGabaritos.gridx = 0;
		gbc_lblGabaritos.gridy = 0;
		containerLabels.add(lblGabaritos, gbc_lblGabaritos);

		JScrollPane containerListaGabaritos = new JScrollPane();
		GridBagConstraints gbc_containerListaGabaritos = new GridBagConstraints();
		gbc_containerListaGabaritos.fill = GridBagConstraints.BOTH;
		gbc_containerListaGabaritos.insets = new Insets(0, 0, 5, 5);
		gbc_containerListaGabaritos.gridx = 1;
		gbc_containerListaGabaritos.gridy = 3;
		add(containerListaGabaritos, gbc_containerListaGabaritos);

		tabelaGabaritos = new JTable();
		try {
			tabelaGabaritos.setModel(dao.carregarTabela());
		} catch (Exception e) {
			JOptionPane.showMessageDialog(null, "Falha na Conexão: " + e.getMessage());
			PainelMenuCoordenador p = new PainelMenuCoordenador();
			FramePatec.getFrame().setContentPane(p);
			FramePatec.getFrame().revalidate();
			FramePatec.getFrame().repaint();
		}
		tabelaGabaritos.setSelectionMode(ListSelectionModel.SINGLE_SELECTION);
		containerListaGabaritos.setViewportView(tabelaGabaritos);
		tabelaGabaritos.setFillsViewportHeight(true);

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
		
		JLabel lblCrudAvaliacao = new JLabel("<html>Gerenciamento de<br>Gabaritos (CRUD):</html>");
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
				PainelCadastroGabarito p = new PainelCadastroGabarito(-1);
				FramePatec.getFrame().setTitle("Patec - Cadastrar Gabarito");
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
				if (tabelaGabaritos.getSelectedRow() != -1) {
					PainelEditarGabarito p = new PainelEditarGabarito(
							Integer.parseInt(tabelaGabaritos.getModel().getValueAt(tabelaGabaritos.getSelectedRow(), 7)
									.toString()),
							new GabaritoOficial(
									Integer.parseInt(tabelaGabaritos.getModel()
											.getValueAt(tabelaGabaritos.getSelectedRow(), 0).toString()),
									tabelaGabaritos.getModel().getValueAt(tabelaGabaritos.getSelectedRow(), 1)
											.toString().charAt(0),
									tabelaGabaritos.getModel().getValueAt(tabelaGabaritos.getSelectedRow(), 2)
											.toString().charAt(0),
									tabelaGabaritos.getModel().getValueAt(tabelaGabaritos.getSelectedRow(), 3)
											.toString().charAt(0),
									tabelaGabaritos.getModel().getValueAt(tabelaGabaritos.getSelectedRow(), 4)
											.toString().charAt(0),
									tabelaGabaritos.getModel().getValueAt(tabelaGabaritos.getSelectedRow(), 5)
											.toString().charAt(0),
									tabelaGabaritos.getModel().getValueAt(tabelaGabaritos.getSelectedRow(), 6)
											.toString(),
									Integer.parseInt(tabelaGabaritos.getModel()
											.getValueAt(tabelaGabaritos.getSelectedRow(), 7).toString())));
					FramePatec.getFrame().setTitle("Patec - Editar Gabarito");
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
		panel.add(btnEditar, gbc_btnEditar);

		JButton btnExcluir = new JButton("Excluir");
		btnExcluir.addActionListener(new ActionListener() {
			public void actionPerformed(ActionEvent e) {
				if (tabelaGabaritos.getSelectedRow() != -1 && JOptionPane.showConfirmDialog(null,
						"Deseja excluir este registro?", "Confirmar exclusão", JOptionPane.YES_NO_OPTION) == 0) {
					dao.excluir(tabelaGabaritos.getValueAt(tabelaGabaritos.getSelectedRow(), 0));
					PainelListarGabaritos p = new PainelListarGabaritos();
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
		panel.add(btnExcluir, gbc_btnExcluir);
	}

}