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

import model.AvaliacaoDAO;
import model.GabaritoOficial;
import view.components.BtnSair;
import view.components.BtnVoltar;
import view.components.MenuBarCoord;

public class PainelSelecionarAvaliacao extends JPanel {

	private static final long serialVersionUID = 1L;
	private JTable tabelaAvaliacoes;
	private AvaliacaoDAO dao = new AvaliacaoDAO();

	/**
	 * Create the panel.
	 */
	public PainelSelecionarAvaliacao(GabaritoOficial go, boolean isEditar) {
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

		JLabel lblAvaliacao = new JLabel("Selecionar avaliação");
		lblAvaliacao.setFont(new Font("Tahoma", Font.BOLD, 40));
		GridBagConstraints gbc_lblAvaliacao = new GridBagConstraints();
		gbc_lblAvaliacao.anchor = GridBagConstraints.SOUTHWEST;
		gbc_lblAvaliacao.gridx = 0;
		gbc_lblAvaliacao.gridy = 0;
		containerLabel.add(lblAvaliacao, gbc_lblAvaliacao);

		JScrollPane containerListaAvaliacoes = new JScrollPane();
		GridBagConstraints gbc_containerListaAvaliacoes = new GridBagConstraints();
		gbc_containerListaAvaliacoes.insets = new Insets(0, 0, 5, 5);
		gbc_containerListaAvaliacoes.fill = GridBagConstraints.BOTH;
		gbc_containerListaAvaliacoes.gridx = 2;
		gbc_containerListaAvaliacoes.gridy = 3;
		add(containerListaAvaliacoes, gbc_containerListaAvaliacoes);

		tabelaAvaliacoes = new JTable();
		try {
			tabelaAvaliacoes.setModel(dao.carregarTabela());
		} catch (Exception e) {
			JOptionPane.showMessageDialog(null, "Falha na Conexão: " + e.getMessage());
			PainelMenuCoordenador p = new PainelMenuCoordenador();
			FramePatec.getFrame().setContentPane(p);
			FramePatec.getFrame().revalidate();
			FramePatec.getFrame().repaint();
		}
		tabelaAvaliacoes.setSelectionMode(ListSelectionModel.SINGLE_SELECTION);
		containerListaAvaliacoes.setViewportView(tabelaAvaliacoes);
		tabelaAvaliacoes.setFillsViewportHeight(true);

		JButton btnConfirmar = new JButton("Confirmar");
		btnConfirmar.addActionListener(new ActionListener() {
			public void actionPerformed(ActionEvent e) {
				if(tabelaAvaliacoes.getSelectedRow() != -1) {
					if (isEditar == true) {
						PainelEditarGabarito p = new PainelEditarGabarito(Integer.parseInt(
								tabelaAvaliacoes.getModel().getValueAt(tabelaAvaliacoes.getSelectedRow(), 0).toString()), go);
						FramePatec.frame.setContentPane(p);
						FramePatec.frame.revalidate();
						FramePatec.frame.repaint();
					} else {
						PainelCadastroGabarito p = new PainelCadastroGabarito(Integer.parseInt(
								tabelaAvaliacoes.getModel().getValueAt(tabelaAvaliacoes.getSelectedRow(), 0).toString()));
						FramePatec.frame.setContentPane(p);
						FramePatec.frame.revalidate();
						FramePatec.frame.repaint();
					}
				}
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
