package view;

import java.awt.Color;
import java.awt.Font;
import java.awt.GridBagConstraints;
import java.awt.GridBagLayout;
import java.awt.Insets;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.util.ArrayList;
import java.util.List;

import javax.swing.JButton;
import javax.swing.JComboBox;
import javax.swing.JLabel;
import javax.swing.JOptionPane;
import javax.swing.JPanel;
import javax.swing.JSeparator;
import javax.swing.JTextField;
import javax.swing.SwingConstants;

import model.DisciplinaDAO;
import model.GabaritoOficial;
import model.GabaritoOficialDAO;
import net.sourceforge.jdatepicker.impl.JDatePanelImpl;
import net.sourceforge.jdatepicker.impl.UtilDateModel;
import view.components.BaseGabaritoOficial;
import view.components.BtnSair;
import view.components.BtnVoltar;
import view.components.MenuBarCoord;

public class PainelEditarGabarito extends JPanel {

	private static final long serialVersionUID = 1L;
	private JTextField tfCodAvaliacao;
	private List<String> disciplinas = new ArrayList<String>();
	private DisciplinaDAO disciplinaDao = new DisciplinaDAO();
	private GabaritoOficialDAO gabaritoOficialDao = new GabaritoOficialDAO();

	/**
	 * Create the panel.
	 */
	public PainelEditarGabarito(int codAvaliacao, GabaritoOficial go) {
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

		JLabel lblEditar = new JLabel("Editar");
		lblEditar.setFont(new Font("Tahoma", Font.BOLD, 40));
		GridBagConstraints gbc_lblEditar = new GridBagConstraints();
		gbc_lblEditar.anchor = GridBagConstraints.EAST;
		gbc_lblEditar.insets = new Insets(0, 0, 5, 0);
		gbc_lblEditar.gridx = 0;
		gbc_lblEditar.gridy = 0;
		containerLabels.add(lblEditar, gbc_lblEditar);

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

		JLabel lblCodAvaliacao = new JLabel("Código da avaliação:");
		lblCodAvaliacao.setFont(new Font("Tahoma", Font.BOLD, 20));
		GridBagConstraints gbc_lblCodAvaliacao = new GridBagConstraints();
		gbc_lblCodAvaliacao.anchor = GridBagConstraints.WEST;
		gbc_lblCodAvaliacao.gridwidth = 6;
		gbc_lblCodAvaliacao.insets = new Insets(0, 0, 5, 0);
		gbc_lblCodAvaliacao.gridx = 1;
		gbc_lblCodAvaliacao.gridy = 1;
		containerGabarito.add(lblCodAvaliacao, gbc_lblCodAvaliacao);

		tfCodAvaliacao = new JTextField();
		tfCodAvaliacao.setText(String.valueOf(codAvaliacao));
		tfCodAvaliacao.setFont(new Font("Tahoma", Font.PLAIN, 18));
		GridBagConstraints gbc_tfCodAvaliacao = new GridBagConstraints();
		gbc_tfCodAvaliacao.gridwidth = 5;
		gbc_tfCodAvaliacao.fill = GridBagConstraints.BOTH;
		gbc_tfCodAvaliacao.insets = new Insets(0, 0, 5, 5);
		gbc_tfCodAvaliacao.gridx = 1;
		gbc_tfCodAvaliacao.gridy = 2;
		containerGabarito.add(tfCodAvaliacao, gbc_tfCodAvaliacao);
		tfCodAvaliacao.setEditable(false);
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
		if (go.getCodigoDisciplina() != null) {
			cbDisciplina.setSelectedItem(disciplinaDao.obterNomeDisciplina(go.getCodigoDisciplina()));
		}
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

		switch (go.getQuestao1()) {
		case 'A':
			bgo.rdbtnQuestaoUmA.setSelected(true);
			bgo.go.setQuestao1('A');
			break;
		case 'B':
			bgo.rdbtnQuestaoUmB.setSelected(true);
			bgo.go.setQuestao1('B');
			break;
		case 'C':
			bgo.rdbtnQuestaoUmC.setSelected(true);
			bgo.go.setQuestao1('C');
			break;
		case 'D':
			bgo.rdbtnQuestaoUmD.setSelected(true);
			bgo.go.setQuestao1('D');
			break;
		case 'E':
			bgo.rdbtnQuestaoUmE.setSelected(true);
			bgo.go.setQuestao1('E');
			break;
		}

		switch (go.getQuestao2()) {
		case 'A':
			bgo.rdbtnQuestaoDoisA.setSelected(true);
			bgo.go.setQuestao2('A');
			break;
		case 'B':
			bgo.rdbtnQuestaoDoisB.setSelected(true);
			bgo.go.setQuestao2('B');
			break;
		case 'C':
			bgo.rdbtnQuestaoDoisC.setSelected(true);
			bgo.go.setQuestao2('C');
			break;
		case 'D':
			bgo.rdbtnQuestaoDoisD.setSelected(true);
			bgo.go.setQuestao2('D');
			break;
		case 'E':
			bgo.rdbtnQuestaoDoisE.setSelected(true);
			bgo.go.setQuestao2('E');
			break;
		}

		switch (go.getQuestao3()) {
		case 'A':
			bgo.rdbtnQuestaoTresA.setSelected(true);
			bgo.go.setQuestao3('A');
			break;
		case 'B':
			bgo.rdbtnQuestaoTresB.setSelected(true);
			bgo.go.setQuestao3('B');
			break;
		case 'C':
			bgo.rdbtnQuestaoTresC.setSelected(true);
			bgo.go.setQuestao3('C');
			break;
		case 'D':
			bgo.rdbtnQuestaoTresD.setSelected(true);
			bgo.go.setQuestao3('D');
			break;
		case 'E':
			bgo.rdbtnQuestaoTresE.setSelected(true);
			bgo.go.setQuestao3('E');
			break;
		}

		switch (go.getQuestao4()) {
		case 'A':
			bgo.rdbtnQuestaoQuatroA.setSelected(true);
			bgo.go.setQuestao4('A');
			break;
		case 'B':
			bgo.rdbtnQuestaoQuatroB.setSelected(true);
			bgo.go.setQuestao4('B');
			break;
		case 'C':
			bgo.rdbtnQuestaoQuatroC.setSelected(true);
			bgo.go.setQuestao4('C');
			break;
		case 'D':
			bgo.rdbtnQuestaoQuatroD.setSelected(true);
			bgo.go.setQuestao4('D');
			break;
		case 'E':
			bgo.rdbtnQuestaoQuatroE.setSelected(true);
			bgo.go.setQuestao4('E');
			break;
		}

		switch (go.getQuestao5()) {
		case 'A':
			bgo.rdbtnQuestaoCincoA.setSelected(true);
			bgo.go.setQuestao5('A');
			break;
		case 'B':
			bgo.rdbtnQuestaoCincoB.setSelected(true);
			bgo.go.setQuestao5('B');
			break;
		case 'C':
			bgo.rdbtnQuestaoCincoC.setSelected(true);
			bgo.go.setQuestao5('C');
			break;
		case 'D':
			bgo.rdbtnQuestaoCincoD.setSelected(true);
			bgo.go.setQuestao5('D');
			break;
		case 'E':
			bgo.rdbtnQuestaoCincoE.setSelected(true);
			bgo.go.setQuestao5('E');
			break;
		}

		JButton btnSelecionarAvaliacao = new JButton("...");
		btnSelecionarAvaliacao.addActionListener(new ActionListener() {
			public void actionPerformed(ActionEvent e) {
				PainelSelecionarAvaliacao p = new PainelSelecionarAvaliacao(go, true);
				FramePatec.frame.setContentPane(p);
				FramePatec.frame.revalidate();
				FramePatec.frame.repaint();
			}
		});
		GridBagConstraints gbc_btnSelecionarAvaliacao = new GridBagConstraints();
		gbc_btnSelecionarAvaliacao.fill = GridBagConstraints.BOTH;
		gbc_btnSelecionarAvaliacao.insets = new Insets(0, 0, 5, 0);
		gbc_btnSelecionarAvaliacao.gridx = 6;
		gbc_btnSelecionarAvaliacao.gridy = 2;
		containerGabarito.add(btnSelecionarAvaliacao, gbc_btnSelecionarAvaliacao);

		JButton btnSalvar = new JButton("Salvar");
		btnSalvar.addActionListener(new ActionListener() {
			public void actionPerformed(ActionEvent e) {
				if (!Character.isAlphabetic(bgo.go.getQuestao1()) || !Character.isAlphabetic(bgo.go.getQuestao2())
						|| !Character.isAlphabetic(bgo.go.getQuestao3())
						|| !Character.isAlphabetic(bgo.go.getQuestao4())
						|| !Character.isAlphabetic(bgo.go.getQuestao5())) {
					JOptionPane.showMessageDialog(null, "Há questões sem alternativas válidas.");
				} else if (tfCodAvaliacao.getText().trim().isEmpty() || cbDisciplina.getSelectedItem() == cbDisciplina.getItemAt(0)) {
					JOptionPane.showMessageDialog(null, "Todos os campos são obrigatórios.");
				} else {
					JOptionPane.showMessageDialog(null,
							gabaritoOficialDao.editar(new GabaritoOficial(go.getCodigoGabarito(), bgo.go.getQuestao1(),
									bgo.go.getQuestao2(), bgo.go.getQuestao3(), bgo.go.getQuestao4(),
									bgo.go.getQuestao5(),
									disciplinaDao.obterCodigoDisciplina(cbDisciplina.getSelectedItem().toString()),
									Integer.valueOf(tfCodAvaliacao.getText()))),
							"Edição concluída", JOptionPane.INFORMATION_MESSAGE);
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
