package view;

import java.awt.*;
import java.awt.event.*;
import java.util.ArrayList;
import java.util.List;

import javax.swing.*;
import model.*;
import net.sourceforge.jdatepicker.impl.*;
import view.components.*;

public class PainelCadastroGabarito extends JPanel {

	private static final long serialVersionUID = 1L;
	private JTextField tfCodAvaliacao;
	private List<String> disciplinas = new ArrayList<String>();
	private DisciplinaDAO disciplinaDao = new DisciplinaDAO();
	// private GabaritoOficial go = new GabaritoOficial();
	private GabaritoOficialDAO gabaritoOficialDao = new GabaritoOficialDAO();

	/**
	 * Create the panel.
	 */
	public PainelCadastroGabarito(int codAvaliacao) {

		disciplinas = (disciplinaDao.obterTodasDisciplinas());

		GridBagLayout gridBagLayout = new GridBagLayout();
		gridBagLayout.columnWidths = new int[] { 66, 0, 100, 150, 0, 66, 0 };
		gridBagLayout.rowHeights = new int[] { 28, 0, 230, 0, 0 };
		gridBagLayout.columnWeights = new double[] { 0.0, 1.0, 0.0, 1.0, 1.0, 0.0, Double.MIN_VALUE };
		gridBagLayout.rowWeights = new double[] { 0.0, 0.0, 1.0, 0.0, Double.MIN_VALUE };
		setLayout(gridBagLayout);

		MenuBarCoord bdf = new MenuBarCoord();
		GridBagConstraints gbc_bdf = new GridBagConstraints();
		gbc_bdf.gridwidth = 6;
		gbc_bdf.anchor = GridBagConstraints.NORTH;
		gbc_bdf.fill = GridBagConstraints.HORIZONTAL;
		gbc_bdf.insets = new Insets(0, 0, 5, 0);
		gbc_bdf.gridx = 0;
		gbc_bdf.gridy = 0;
		add(bdf, gbc_bdf);

		BtnVoltar btnVoltar = new BtnVoltar("Voltar");
		GridBagConstraints gbc_btnVoltar = new GridBagConstraints();
		gbc_btnVoltar.insets = new Insets(0, 0, 5, 5);
		gbc_btnVoltar.gridx = 0;
		gbc_btnVoltar.gridy = 1;
		add(btnVoltar, gbc_btnVoltar);

		BtnSair btnSair = new BtnSair("Sair");
		GridBagConstraints gbc_btnSair = new GridBagConstraints();
		gbc_btnSair.insets = new Insets(0, 0, 5, 0);
		gbc_btnSair.gridx = 5;
		gbc_btnSair.gridy = 1;
		add(btnSair, gbc_btnSair);

		JPanel containerLabels = new JPanel();
		GridBagConstraints gbc_containerLabels = new GridBagConstraints();
		gbc_containerLabels.ipadx = 10;
		gbc_containerLabels.insets = new Insets(0, 0, 0, 5);
		gbc_containerLabels.fill = GridBagConstraints.BOTH;
		gbc_containerLabels.gridx = 2;
		gbc_containerLabels.gridy = 2;
		add(containerLabels, gbc_containerLabels);
		GridBagLayout gbl_containerLabels = new GridBagLayout();
		containerLabels.setLayout(gbl_containerLabels);

		JLabel lblCadastrar = new JLabel("Cadastrar");
		lblCadastrar.setFont(new Font("Tahoma", Font.BOLD, 40));
		GridBagConstraints gbc_lblCadastrar = new GridBagConstraints();
		gbc_lblCadastrar.anchor = GridBagConstraints.EAST;
		gbc_lblCadastrar.insets = new Insets(0, 0, 5, 0);
		gbc_lblCadastrar.gridx = 0;
		gbc_lblCadastrar.gridy = 0;
		containerLabels.add(lblCadastrar, gbc_lblCadastrar);

		JLabel lblGabarito = new JLabel("Gabarito");
		lblGabarito.setFont(new Font("Tahoma", Font.BOLD, 40));
		GridBagConstraints gbc_lblGabarito = new GridBagConstraints();
		gbc_lblGabarito.anchor = GridBagConstraints.EAST;
		gbc_lblGabarito.gridx = 0;
		gbc_lblGabarito.gridy = 1;
		containerLabels.add(lblGabarito, gbc_lblGabarito);

		JPanel containerGabarito = new JPanel();
		containerGabarito.setBackground(new Color(240, 240, 240));
		GridBagConstraints gbc_containerGabarito = new GridBagConstraints();
		gbc_containerGabarito.insets = new Insets(0, 0, 0, 5);
		gbc_containerGabarito.fill = GridBagConstraints.BOTH;
		gbc_containerGabarito.gridx = 3;
		gbc_containerGabarito.gridy = 2;
		add(containerGabarito, gbc_containerGabarito);
		GridBagLayout gbl_containerGabarito = new GridBagLayout();
		gbl_containerGabarito.columnWeights = new double[] { 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0 };
		gbl_containerGabarito.columnWidths = new int[] { 0, 0, 0, 0, 0, 0, 0 };
		gbl_containerGabarito.rowHeights = new int[] { 0, 0, 0, 0, 0, 0, 0, 0, 0 };
		gbl_containerGabarito.rowWeights = new double[] { 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0 };
		containerGabarito.setLayout(gbl_containerGabarito);

		JSeparator separator = new JSeparator();
		separator.setForeground(new Color(0, 0, 0));
		separator.setBackground(new Color(0, 0, 0));
		separator.setOrientation(SwingConstants.VERTICAL);
		GridBagConstraints gbc_separator = new GridBagConstraints();
		gbc_separator.ipadx = 10;
		gbc_separator.fill = GridBagConstraints.BOTH;
		gbc_separator.gridheight = 9;
		gbc_separator.insets = new Insets(0, 0, 0, 5);
		gbc_separator.gridx = 0;
		gbc_separator.gridy = 0;
		containerGabarito.add(separator, gbc_separator);

		UtilDateModel model = new UtilDateModel();
		JDatePanelImpl datePanel = new JDatePanelImpl(model);

		JLabel lblCodAvaliacao = new JLabel("Selecione uma avaliação:");
		lblCodAvaliacao.setFont(new Font("Tahoma", Font.BOLD, 20));
		GridBagConstraints gbc_lblCodAvaliacao = new GridBagConstraints();
		gbc_lblCodAvaliacao.anchor = GridBagConstraints.WEST;
		gbc_lblCodAvaliacao.gridwidth = 6;
		gbc_lblCodAvaliacao.insets = new Insets(0, 0, 5, 0);
		gbc_lblCodAvaliacao.gridx = 1;
		gbc_lblCodAvaliacao.gridy = 1;
		containerGabarito.add(lblCodAvaliacao, gbc_lblCodAvaliacao);

		JPanel panel_1 = new JPanel();
		GridBagConstraints gbc_panel_1 = new GridBagConstraints();
		gbc_panel_1.gridwidth = 6;
		gbc_panel_1.insets = new Insets(0, 0, 5, 0);
		gbc_panel_1.fill = GridBagConstraints.BOTH;
		gbc_panel_1.gridx = 1;
		gbc_panel_1.gridy = 2;
		containerGabarito.add(panel_1, gbc_panel_1);
		GridBagLayout gbl_panel_1 = new GridBagLayout();
		gbl_panel_1.columnWidths = new int[] { 0, 0, 0 };
		gbl_panel_1.rowHeights = new int[] { 0, 0 };
		gbl_panel_1.columnWeights = new double[] { 1.0, 0.0, Double.MIN_VALUE };
		gbl_panel_1.rowWeights = new double[] { 0.0, Double.MIN_VALUE };
		panel_1.setLayout(gbl_panel_1);

		tfCodAvaliacao = new JTextField();
		tfCodAvaliacao.setFont(new Font("Tahoma", Font.PLAIN, 18));
		tfCodAvaliacao.setEditable(false);
		if (codAvaliacao != -1) {
			tfCodAvaliacao.setText(String.valueOf(codAvaliacao));
		}
		GridBagConstraints gbc_tfCodAvaliacao = new GridBagConstraints();
		gbc_tfCodAvaliacao.insets = new Insets(0, 0, 0, 5);
		gbc_tfCodAvaliacao.fill = GridBagConstraints.BOTH;
		gbc_tfCodAvaliacao.gridx = 0;
		gbc_tfCodAvaliacao.gridy = 0;
		panel_1.add(tfCodAvaliacao, gbc_tfCodAvaliacao);
		tfCodAvaliacao.setColumns(10);

		JLabel lblDisciplina = new JLabel("Disciplina:");
		lblDisciplina.setFont(new Font("Tahoma", Font.BOLD, 20));
		GridBagConstraints gbc_lblDisciplina = new GridBagConstraints();
		gbc_lblDisciplina.anchor = GridBagConstraints.WEST;
		gbc_lblDisciplina.gridwidth = 6;
		gbc_lblDisciplina.insets = new Insets(0, 0, 5, 0);
		gbc_lblDisciplina.gridx = 1;
		gbc_lblDisciplina.gridy = 3;
		containerGabarito.add(lblDisciplina, gbc_lblDisciplina);

		JComboBox cbDisciplina = new JComboBox(disciplinas.toArray());
		cbDisciplina.setFont(new Font("Tahoma", Font.PLAIN, 18));
		GridBagConstraints gbc_cbDisciplina = new GridBagConstraints();
		gbc_cbDisciplina.fill = GridBagConstraints.BOTH;
		gbc_cbDisciplina.gridwidth = 6;
		gbc_cbDisciplina.insets = new Insets(0, 0, 5, 0);
		gbc_cbDisciplina.gridx = 1;
		gbc_cbDisciplina.gridy = 4;
		containerGabarito.add(cbDisciplina, gbc_cbDisciplina);

		BaseGabaritoOficial bgo = new BaseGabaritoOficial();
		GridBagConstraints gbc_bgo = new GridBagConstraints();
		gbc_bgo.fill = GridBagConstraints.BOTH;
		gbc_bgo.insets = new Insets(0, 0, 5, 0);
		gbc_bgo.gridwidth = 6;
		gbc_bgo.gridx = 1;
		gbc_bgo.gridy = 6;
		containerGabarito.add(bgo, gbc_bgo);

		JButton btnSelecionarAvaliacao = new JButton("...");
		btnSelecionarAvaliacao.addActionListener(new ActionListener() {
			public void actionPerformed(ActionEvent e) {
				PainelSelecionarAvaliacao p = new PainelSelecionarAvaliacao(new GabaritoOficial(), false);
				FramePatec.frame.setContentPane(p);
				FramePatec.frame.revalidate();
				FramePatec.frame.repaint();
			}
		});
		GridBagConstraints gbc_btnSelecionarAvaliacao = new GridBagConstraints();
		gbc_btnSelecionarAvaliacao.fill = GridBagConstraints.BOTH;
		gbc_btnSelecionarAvaliacao.gridx = 1;
		gbc_btnSelecionarAvaliacao.gridy = 0;
		panel_1.add(btnSelecionarAvaliacao, gbc_btnSelecionarAvaliacao);

		JButton btnSalvar = new JButton("Salvar");
		btnSalvar.addActionListener(new ActionListener() {
			public void actionPerformed(ActionEvent e) {
				if (!Character.isAlphabetic(bgo.go.getQuestao1()) || !Character.isAlphabetic(bgo.go.getQuestao2())
						|| !Character.isAlphabetic(bgo.go.getQuestao3())
						|| !Character.isAlphabetic(bgo.go.getQuestao4())
						|| !Character.isAlphabetic(bgo.go.getQuestao5())) {
					JOptionPane.showMessageDialog(null, "Há questões sem alternativas válidas.");
				} else if (tfCodAvaliacao.getText().trim().isEmpty() || cbDisciplina.getSelectedItem() == cbDisciplina.getItemAt(0)) {
					JOptionPane.showMessageDialog(null, "Todos os campos são obrigatórios.", "Campos vazios",
							JOptionPane.WARNING_MESSAGE);
				} else {
					gabaritoOficialDao.gravar(new GabaritoOficial(-1, bgo.go.getQuestao1(), bgo.go.getQuestao2(),
							bgo.go.getQuestao3(), bgo.go.getQuestao4(), bgo.go.getQuestao5(),
							disciplinaDao.obterCodigoDisciplina(cbDisciplina.getSelectedItem().toString()),
							Integer.valueOf(tfCodAvaliacao.getText())));
					PainelListarGabaritos p = new PainelListarGabaritos();
					FramePatec.frame.setContentPane(p);
					FramePatec.frame.revalidate();
					FramePatec.frame.repaint();
				}
			}
		});
		GridBagConstraints gbc_btnSalvar = new GridBagConstraints();
		gbc_btnSalvar.fill = GridBagConstraints.VERTICAL;
		gbc_btnSalvar.gridwidth = 6;
		gbc_btnSalvar.gridx = 1;
		gbc_btnSalvar.gridy = 8;
		containerGabarito.add(btnSalvar, gbc_btnSalvar);

	}

}