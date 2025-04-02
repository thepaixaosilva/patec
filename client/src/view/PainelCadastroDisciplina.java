package view;

import java.awt.Color;
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
import javax.swing.JSeparator;
import javax.swing.JTextField;
import javax.swing.SwingConstants;

import model.Disciplina;
import model.DisciplinaDAO;
import view.components.BtnSair;
import view.components.BtnVoltar;
import view.components.MenuBarCoord;

import javax.swing.JComboBox;

public class PainelCadastroDisciplina extends JPanel {

	private static final long serialVersionUID = 1L;
	private JTextField tfCodDisciplina;
	private JTextField tfNomeDisciplina;
	private JComboBox<String> cbSemestre;
	Disciplina d = new Disciplina();
	private String[] semestres = { "1", "2", "3", "4", "5", "6" };

	/**
	 * Create the panel.
	 */
	public PainelCadastroDisciplina() {
		GridBagLayout gridBagLayout = new GridBagLayout();
		gridBagLayout.columnWidths = new int[] { 66, 0, 100, 150, 0, 66, 0 };
		gridBagLayout.rowHeights = new int[] { 28, 0, 272, 0, 0 };
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

		JPanel panel_1 = new JPanel();
		panel_1.setBackground(new Color(240, 240, 240));
		GridBagConstraints gbc_panel_1 = new GridBagConstraints();
		gbc_panel_1.ipadx = 10;
		gbc_panel_1.insets = new Insets(0, 0, 5, 5);
		gbc_panel_1.fill = GridBagConstraints.BOTH;
		gbc_panel_1.gridx = 2;
		gbc_panel_1.gridy = 2;
		add(panel_1, gbc_panel_1);
		GridBagLayout gbl_panel_1 = new GridBagLayout();
		gbl_panel_1.columnWeights = new double[] { 0.0, 0.0 };
		panel_1.setLayout(gbl_panel_1);

		JLabel lblNewLabel_3 = new JLabel("Cadastrar");
		lblNewLabel_3.setFont(new Font("Tahoma", Font.BOLD, 40));
		GridBagConstraints gbc_lblNewLabel_3 = new GridBagConstraints();
		gbc_lblNewLabel_3.anchor = GridBagConstraints.EAST;
		gbc_lblNewLabel_3.insets = new Insets(0, 0, 5, 5);
		gbc_lblNewLabel_3.gridx = 1;
		gbc_lblNewLabel_3.gridy = 0;
		panel_1.add(lblNewLabel_3, gbc_lblNewLabel_3);

		JLabel lblNewLabel_4 = new JLabel("Disciplina");
		lblNewLabel_4.setFont(new Font("Tahoma", Font.BOLD, 40));
		GridBagConstraints gbc_lblNewLabel_4 = new GridBagConstraints();
		gbc_lblNewLabel_4.anchor = GridBagConstraints.EAST;
		gbc_lblNewLabel_4.insets = new Insets(0, 0, 0, 5);
		gbc_lblNewLabel_4.gridx = 1;
		gbc_lblNewLabel_4.gridy = 1;
		panel_1.add(lblNewLabel_4, gbc_lblNewLabel_4);

		JPanel panel = new JPanel();
		panel.setBackground(new Color(240, 240, 240));
		GridBagConstraints gbc_panel = new GridBagConstraints();
		gbc_panel.insets = new Insets(0, 0, 5, 5);
		gbc_panel.fill = GridBagConstraints.BOTH;
		gbc_panel.gridx = 3;
		gbc_panel.gridy = 2;
		add(panel, gbc_panel);
		GridBagLayout gbl_panel = new GridBagLayout();
		gbl_panel.columnWidths = new int[] { 10, 0, 0, 0, 10 };
		gbl_panel.columnWeights = new double[] { 0.0, 1.0, 0.0, 0.0, 0.0 };
		panel.setLayout(gbl_panel);

		JSeparator separator = new JSeparator();
		GridBagConstraints gbc_separator = new GridBagConstraints();
		gbc_separator.ipadx = 10;
		gbc_separator.fill = GridBagConstraints.BOTH;
		gbc_separator.gridheight = 8;
		gbc_separator.insets = new Insets(0, 0, 0, 5);
		gbc_separator.gridx = 0;
		gbc_separator.gridy = 0;
		panel.add(separator, gbc_separator);
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
		panel.add(lblCodDisciplina, gbc_lblCodDisciplina);

		tfCodDisciplina = new JTextField();
		tfCodDisciplina.setFont(new Font("Tahoma", Font.PLAIN, 18));
		GridBagConstraints gbc_tfCodDisciplina = new GridBagConstraints();
		gbc_tfCodDisciplina.fill = GridBagConstraints.HORIZONTAL;
		gbc_tfCodDisciplina.gridwidth = 4;
		gbc_tfCodDisciplina.insets = new Insets(0, 0, 5, 0);
		gbc_tfCodDisciplina.gridx = 1;
		gbc_tfCodDisciplina.gridy = 1;
		panel.add(tfCodDisciplina, gbc_tfCodDisciplina);
		tfCodDisciplina.setColumns(10);

		JLabel lblNomeDisciplina = new JLabel("Nome da disciplina:");
		lblNomeDisciplina.setFont(new Font("Tahoma", Font.PLAIN, 20));
		GridBagConstraints gbc_lblNomeDisciplina = new GridBagConstraints();
		gbc_lblNomeDisciplina.gridwidth = 4;
		gbc_lblNomeDisciplina.insets = new Insets(0, 0, 5, 5);
		gbc_lblNomeDisciplina.anchor = GridBagConstraints.WEST;
		gbc_lblNomeDisciplina.gridx = 1;
		gbc_lblNomeDisciplina.gridy = 2;
		panel.add(lblNomeDisciplina, gbc_lblNomeDisciplina);

		tfNomeDisciplina = new JTextField();
		tfNomeDisciplina.setFont(new Font("Tahoma", Font.PLAIN, 18));
		GridBagConstraints gbc_tfNomeDisciplina = new GridBagConstraints();
		gbc_tfNomeDisciplina.gridwidth = 4;
		gbc_tfNomeDisciplina.insets = new Insets(0, 0, 5, 0);
		gbc_tfNomeDisciplina.fill = GridBagConstraints.HORIZONTAL;
		gbc_tfNomeDisciplina.gridx = 1;
		gbc_tfNomeDisciplina.gridy = 3;
		panel.add(tfNomeDisciplina, gbc_tfNomeDisciplina);
		tfNomeDisciplina.setColumns(10);

		JLabel lblSemestre = new JLabel("Semestre:");
		lblSemestre.setFont(new Font("Tahoma", Font.PLAIN, 20));
		GridBagConstraints gbc_lblSemestre = new GridBagConstraints();
		gbc_lblSemestre.gridwidth = 4;
		gbc_lblSemestre.insets = new Insets(0, 0, 5, 5);
		gbc_lblSemestre.anchor = GridBagConstraints.WEST;
		gbc_lblSemestre.gridx = 1;
		gbc_lblSemestre.gridy = 4;
		panel.add(lblSemestre, gbc_lblSemestre);

		cbSemestre = new JComboBox<String>(semestres);
		cbSemestre.setFont(new Font("Tahoma", Font.PLAIN, 18));
		GridBagConstraints gbc_cbSemestre = new GridBagConstraints();
		gbc_cbSemestre.gridwidth = 4;
		gbc_cbSemestre.insets = new Insets(0, 0, 5, 0);
		gbc_cbSemestre.fill = GridBagConstraints.HORIZONTAL;
		gbc_cbSemestre.gridx = 1;
		gbc_cbSemestre.gridy = 5;
		panel.add(cbSemestre, gbc_cbSemestre);

		JButton btnCadastrar = new JButton("Cadastrar");
		btnCadastrar.addActionListener(new ActionListener() {
			public void actionPerformed(ActionEvent e) {
				if (tfCodDisciplina.getText().trim().isEmpty() || tfNomeDisciplina.getText().trim().isEmpty()) {
					JOptionPane.showMessageDialog(null, "Todos os campos são obrigatórios.", "Campos vazios",
							JOptionPane.WARNING_MESSAGE);
				} else if (tfCodDisciplina.getText().length() != 6
						|| !Character.isLetter(tfCodDisciplina.getText().charAt(0))
						|| !Character.isLetter(tfCodDisciplina.getText().charAt(1))
						|| !Character.isLetter(tfCodDisciplina.getText().charAt(2))
						|| !Character.isDigit(tfCodDisciplina.getText().charAt(3))
						|| !Character.isDigit(tfCodDisciplina.getText().charAt(4))
						|| !Character.isDigit(tfCodDisciplina.getText().charAt(5))) {
				  JOptionPane.showMessageDialog(null,
							"Código de disciplina inválido! (Formato necessário: XXX000; Exemplo: MET100)");
				} else {
					d.setCodigoDisciplina(tfCodDisciplina.getText().toUpperCase());
					d.setNomeDisciplina(tfNomeDisciplina.getText());
					d.setSemestreDisciplina(Integer.parseInt(cbSemestre.getSelectedItem().toString()));
					DisciplinaDAO dao = new DisciplinaDAO();
					dao.gravar(d);
					JOptionPane.showMessageDialog(null, "Disciplina cadastrada com sucesso!", "Cadastro concluído",
							JOptionPane.INFORMATION_MESSAGE);
					PainelListarDisciplinas p = new PainelListarDisciplinas();
					FramePatec.getFrame().setContentPane(p);
					FramePatec.getFrame().revalidate();
					FramePatec.getFrame().repaint();
				}				
			}
		});
		GridBagConstraints gbc_btnCadastrar = new GridBagConstraints();
		gbc_btnCadastrar.gridwidth = 4;
		gbc_btnCadastrar.gridx = 1;
		gbc_btnCadastrar.gridy = 7;
		panel.add(btnCadastrar, gbc_btnCadastrar);
	}

}