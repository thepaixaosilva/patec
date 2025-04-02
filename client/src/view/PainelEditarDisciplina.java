package view;

import java.awt.Color;
import java.awt.Font;
import java.awt.GridBagConstraints;
import java.awt.GridBagLayout;
import java.awt.Insets;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;

import javax.swing.JButton;
import javax.swing.JComboBox;
import javax.swing.JLabel;
import javax.swing.JOptionPane;
import javax.swing.JPanel;
import javax.swing.JSeparator;
import javax.swing.JTextField;
import javax.swing.SwingConstants;

import model.Disciplina;
import model.DisciplinaDAO;
import view.components.BtnSair;
import view.components.BtnVoltar;
import view.components.MenuBarCoord;

public class PainelEditarDisciplina extends JPanel {

	private static final long serialVersionUID = 1L;
	private JTextField tfCodDisciplina;
	private JTextField tfNomeDisciplina;
	private JComboBox<String> cbSemestre;
	private String[] semestres = { "1", "2", "3", "4", "5", "6" };

	/**
	 * Create the panel.
	 */
	public PainelEditarDisciplina(Disciplina d) {
		GridBagLayout gridBagLayout = new GridBagLayout();
		gridBagLayout.columnWidths = new int[] { 66, 0, 100, 150, 0, 66, 0 };
		gridBagLayout.rowHeights = new int[] { 28, 0, 0, 272, 0, 0 };
		gridBagLayout.columnWeights = new double[] { 0.0, 1.0, 0.0, 1.0, 1.0, 0.0, Double.MIN_VALUE };
		gridBagLayout.rowWeights = new double[] { 0.0, 0.0, 1.0, 1.0, 1.0, Double.MIN_VALUE };
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

		BtnSair btnSair = new BtnSair("Sair");
		GridBagConstraints gbc_btnSair = new GridBagConstraints();
		gbc_btnSair.insets = new Insets(0, 0, 5, 0);
		gbc_btnSair.gridx = 5;
		gbc_btnSair.gridy = 1;
		add(btnSair, gbc_btnSair);

		BtnVoltar btnVoltar = new BtnVoltar("Voltar");
		GridBagConstraints gbc_btnVoltar = new GridBagConstraints();
		gbc_btnVoltar.insets = new Insets(0, 0, 5, 5);
		gbc_btnVoltar.gridx = 0;
		gbc_btnVoltar.gridy = 1;
		add(btnVoltar, gbc_btnVoltar);

		JPanel containerLabels = new JPanel();
		containerLabels.setBackground(new Color(240, 240, 240));
		GridBagConstraints gbc_containerLabels = new GridBagConstraints();
		gbc_containerLabels.ipadx = 10;
		gbc_containerLabels.insets = new Insets(0, 0, 5, 5);
		gbc_containerLabels.fill = GridBagConstraints.BOTH;
		gbc_containerLabels.gridx = 2;
		gbc_containerLabels.gridy = 3;
		add(containerLabels, gbc_containerLabels);
		GridBagLayout gbl_containerLabels = new GridBagLayout();
		gbl_containerLabels.columnWeights = new double[] { 0.0, 0.0 };
		containerLabels.setLayout(gbl_containerLabels);

		JLabel lblEditar = new JLabel("Editar");
		lblEditar.setFont(new Font("Tahoma", Font.BOLD, 40));
		GridBagConstraints gbc_lblEditar = new GridBagConstraints();
		gbc_lblEditar.anchor = GridBagConstraints.EAST;
		gbc_lblEditar.insets = new Insets(0, 0, 5, 5);
		gbc_lblEditar.gridx = 1;
		gbc_lblEditar.gridy = 0;
		containerLabels.add(lblEditar, gbc_lblEditar);

		JLabel lblDisciplina = new JLabel("Disciplina");
		lblDisciplina.setFont(new Font("Tahoma", Font.BOLD, 40));
		GridBagConstraints gbc_lblDisciplina = new GridBagConstraints();
		gbc_lblDisciplina.anchor = GridBagConstraints.EAST;
		gbc_lblDisciplina.insets = new Insets(0, 0, 0, 5);
		gbc_lblDisciplina.gridx = 1;
		gbc_lblDisciplina.gridy = 1;
		containerLabels.add(lblDisciplina, gbc_lblDisciplina);

		JPanel containerEdicaoDisciplina = new JPanel();
		containerEdicaoDisciplina.setBackground(new Color(240, 240, 240));
		GridBagConstraints gbc_containerEdicaoDisciplina = new GridBagConstraints();
		gbc_containerEdicaoDisciplina.insets = new Insets(0, 0, 5, 5);
		gbc_containerEdicaoDisciplina.fill = GridBagConstraints.BOTH;
		gbc_containerEdicaoDisciplina.gridx = 3;
		gbc_containerEdicaoDisciplina.gridy = 3;
		add(containerEdicaoDisciplina, gbc_containerEdicaoDisciplina);
		GridBagLayout gbl_containerEdicaoDisciplina = new GridBagLayout();
		gbl_containerEdicaoDisciplina.columnWidths = new int[] { 10, 0, 0, 0, 10 };
		gbl_containerEdicaoDisciplina.columnWeights = new double[] { 0.0, 1.0, 0.0, 0.0, 0.0 };
		containerEdicaoDisciplina.setLayout(gbl_containerEdicaoDisciplina);

		JSeparator separator = new JSeparator();
		GridBagConstraints gbc_separator = new GridBagConstraints();
		gbc_separator.ipadx = 10;
		gbc_separator.fill = GridBagConstraints.BOTH;
		gbc_separator.gridheight = 8;
		gbc_separator.insets = new Insets(0, 0, 0, 5);
		gbc_separator.gridx = 0;
		gbc_separator.gridy = 0;
		containerEdicaoDisciplina.add(separator, gbc_separator);
		separator.setOrientation(SwingConstants.VERTICAL);
		separator.setForeground(new Color(0, 0, 0));
		separator.setBackground(new Color(0, 0, 0));

		JLabel lblCodDisciplina = new JLabel("Código da disciplina:");
		lblCodDisciplina.setFont(new Font("Tahoma", Font.PLAIN, 20));
		GridBagConstraints gbc_lblCodDisciplina = new GridBagConstraints();
		gbc_lblCodDisciplina.gridwidth = 4;
		gbc_lblCodDisciplina.insets = new Insets(0, 0, 5, 5);
		gbc_lblCodDisciplina.anchor = GridBagConstraints.WEST;
		gbc_lblCodDisciplina.gridx = 1;
		gbc_lblCodDisciplina.gridy = 0;
		containerEdicaoDisciplina.add(lblCodDisciplina, gbc_lblCodDisciplina);

		tfCodDisciplina = new JTextField();
		tfCodDisciplina.setEditable(false);
		tfCodDisciplina.setFont(new Font("Tahoma", Font.PLAIN, 18));
		tfCodDisciplina.setText(d.getCodigoDisciplina());
		GridBagConstraints gbc_tfCodDisciplina = new GridBagConstraints();
		gbc_tfCodDisciplina.fill = GridBagConstraints.HORIZONTAL;
		gbc_tfCodDisciplina.gridwidth = 4;
		gbc_tfCodDisciplina.insets = new Insets(0, 0, 5, 0);
		gbc_tfCodDisciplina.gridx = 1;
		gbc_tfCodDisciplina.gridy = 1;
		containerEdicaoDisciplina.add(tfCodDisciplina, gbc_tfCodDisciplina);
		tfCodDisciplina.setColumns(10);

		JLabel lblNomeDisciplina = new JLabel("Nome da disciplina:");
		lblNomeDisciplina.setFont(new Font("Tahoma", Font.PLAIN, 20));
		GridBagConstraints gbc_lblNomeDisciplina = new GridBagConstraints();
		gbc_lblNomeDisciplina.gridwidth = 4;
		gbc_lblNomeDisciplina.insets = new Insets(0, 0, 5, 5);
		gbc_lblNomeDisciplina.anchor = GridBagConstraints.WEST;
		gbc_lblNomeDisciplina.gridx = 1;
		gbc_lblNomeDisciplina.gridy = 2;
		containerEdicaoDisciplina.add(lblNomeDisciplina, gbc_lblNomeDisciplina);

		tfNomeDisciplina = new JTextField();
		tfNomeDisciplina.setFont(new Font("Tahoma", Font.PLAIN, 18));
		tfNomeDisciplina.setText(d.getNomeDisciplina());
		GridBagConstraints gbc_tfNomeDisciplina = new GridBagConstraints();
		gbc_tfNomeDisciplina.gridwidth = 4;
		gbc_tfNomeDisciplina.insets = new Insets(0, 0, 5, 0);
		gbc_tfNomeDisciplina.fill = GridBagConstraints.HORIZONTAL;
		gbc_tfNomeDisciplina.gridx = 1;
		gbc_tfNomeDisciplina.gridy = 3;
		containerEdicaoDisciplina.add(tfNomeDisciplina, gbc_tfNomeDisciplina);
		tfNomeDisciplina.setColumns(10);

		JLabel lblSemestre = new JLabel("Semestre:");
		lblSemestre.setFont(new Font("Tahoma", Font.PLAIN, 20));
		GridBagConstraints gbc_lblSemestre = new GridBagConstraints();
		gbc_lblSemestre.gridwidth = 4;
		gbc_lblSemestre.insets = new Insets(0, 0, 5, 5);
		gbc_lblSemestre.anchor = GridBagConstraints.WEST;
		gbc_lblSemestre.gridx = 1;
		gbc_lblSemestre.gridy = 4;
		containerEdicaoDisciplina.add(lblSemestre, gbc_lblSemestre);

		cbSemestre = new JComboBox<String>(semestres);
		cbSemestre.setFont(new Font("Tahoma", Font.PLAIN, 18));
		cbSemestre.setSelectedIndex(d.getSemestreDisciplina() - 1);
		GridBagConstraints gbc_cbSemestre = new GridBagConstraints();
		gbc_cbSemestre.gridwidth = 4;
		gbc_cbSemestre.insets = new Insets(0, 0, 5, 0);
		gbc_cbSemestre.fill = GridBagConstraints.HORIZONTAL;
		gbc_cbSemestre.gridx = 1;
		gbc_cbSemestre.gridy = 5;
		containerEdicaoDisciplina.add(cbSemestre, gbc_cbSemestre);

		JButton btnSalvar = new JButton("Salvar");
		btnSalvar.addActionListener(new ActionListener() {
			public void actionPerformed(ActionEvent e) {
				if (tfNomeDisciplina.getText().trim().isEmpty()) {
					JOptionPane.showMessageDialog(null, "Todos os campos são obrigatórios.");
				} else {
					d.setCodigoDisciplina(tfCodDisciplina.getText());
					d.setNomeDisciplina(tfNomeDisciplina.getText());
					d.setSemestreDisciplina(Integer.parseInt(cbSemestre.getSelectedItem().toString()));
					DisciplinaDAO dao = new DisciplinaDAO();
					JOptionPane.showMessageDialog(null, dao.gravar(d), "Edição concluída", JOptionPane.INFORMATION_MESSAGE);
					PainelListarDisciplinas p = new PainelListarDisciplinas();
					FramePatec.getFrame().setContentPane(p);
					FramePatec.getFrame().revalidate();
					FramePatec.getFrame().repaint();
				}
			}
		});
		GridBagConstraints gbc_btnSalvar = new GridBagConstraints();
		gbc_btnSalvar.gridwidth = 4;
		gbc_btnSalvar.gridx = 1;
		gbc_btnSalvar.gridy = 7;
		containerEdicaoDisciplina.add(btnSalvar, gbc_btnSalvar);
	}

}