package view;

import javax.swing.*;

import model.Aluno;
import model.AlunoDAO;

import java.awt.*;
import net.sourceforge.jdatepicker.impl.*;
import view.components.*;

import java.awt.event.ActionListener;
import java.awt.event.ActionEvent;

public class PainelCadastroAluno extends JPanel {

	private static final long serialVersionUID = 1L;
	private JTextField tfNomeAluno;
	private JTextField tfRegistroAluno;
	private Aluno a = new Aluno();

	/**
	 * Create the panel.
	 */
	public PainelCadastroAluno() {
		GridBagLayout gridBagLayout = new GridBagLayout();
		gridBagLayout.columnWidths = new int[] { 66, 0, 100, 150, 0, 66, 0 };
		gridBagLayout.rowHeights = new int[] { 28, 0, 0, 230, 0, 0 };
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

		JPanel panel = new JPanel();
		panel.setBackground(new Color(240, 240, 240));
		GridBagConstraints gbc_panel = new GridBagConstraints();
		gbc_panel.ipadx = 10;
		gbc_panel.insets = new Insets(0, 0, 5, 5);
		gbc_panel.fill = GridBagConstraints.BOTH;
		gbc_panel.gridx = 2;
		gbc_panel.gridy = 3;
		add(panel, gbc_panel);
		GridBagLayout gbl_panel = new GridBagLayout();
		panel.setLayout(gbl_panel);

		JLabel lblNewLabel = new JLabel("Cadastrar");
		lblNewLabel.setFont(new Font("Tahoma", Font.BOLD, 40));
		lblNewLabel.setBackground(new Color(128, 255, 255));
		GridBagConstraints gbc_lblNewLabel = new GridBagConstraints();
		gbc_lblNewLabel.anchor = GridBagConstraints.EAST;
		gbc_lblNewLabel.insets = new Insets(0, 0, 5, 0);
		gbc_lblNewLabel.gridx = 1;
		gbc_lblNewLabel.gridy = 0;
		panel.add(lblNewLabel, gbc_lblNewLabel);

		JLabel lblNewLabel_1 = new JLabel("Aluno");
		lblNewLabel_1.setFont(new Font("Tahoma", Font.BOLD, 40));
		GridBagConstraints gbc_lblNewLabel_1 = new GridBagConstraints();
		gbc_lblNewLabel_1.anchor = GridBagConstraints.EAST;
		gbc_lblNewLabel_1.gridx = 1;
		gbc_lblNewLabel_1.gridy = 1;
		panel.add(lblNewLabel_1, gbc_lblNewLabel_1);

		JPanel containerCadastroAluno = new JPanel();
		containerCadastroAluno.setBackground(new Color(240, 240, 240));
		GridBagConstraints gbc_containerCadastroAluno = new GridBagConstraints();
		gbc_containerCadastroAluno.insets = new Insets(0, 0, 5, 5);
		gbc_containerCadastroAluno.fill = GridBagConstraints.BOTH;
		gbc_containerCadastroAluno.gridx = 3;
		gbc_containerCadastroAluno.gridy = 3;
		add(containerCadastroAluno, gbc_containerCadastroAluno);
		GridBagLayout gbl_containerCadastroAluno = new GridBagLayout();
		gbl_containerCadastroAluno.columnWeights = new double[] { 0.0, 1.0, 0.0, 0.0, 0.0, 0.0 };
		gbl_containerCadastroAluno.columnWidths = new int[] { 0, 5, 0, 0, 0, 0 };
		containerCadastroAluno.setLayout(gbl_containerCadastroAluno);

		JSeparator separator = new JSeparator();
		separator.setBackground(new Color(0, 0, 0));
		separator.setOrientation(SwingConstants.VERTICAL);
		GridBagConstraints gbc_separator = new GridBagConstraints();
		gbc_separator.ipadx = 10;
		gbc_separator.fill = GridBagConstraints.BOTH;
		gbc_separator.gridheight = 10;
		gbc_separator.insets = new Insets(0, 0, 0, 5);
		gbc_separator.gridx = 0;
		gbc_separator.gridy = 0;
		containerCadastroAluno.add(separator, gbc_separator);

		JLabel lblNomeAluno = new JLabel("Nome:");
		lblNomeAluno.setFont(new Font("Tahoma", Font.PLAIN, 20));
		GridBagConstraints gbc_lblNomeAluno = new GridBagConstraints();
		gbc_lblNomeAluno.gridwidth = 2;
		gbc_lblNomeAluno.insets = new Insets(0, 0, 5, 5);
		gbc_lblNomeAluno.anchor = GridBagConstraints.WEST;
		gbc_lblNomeAluno.gridx = 1;
		gbc_lblNomeAluno.gridy = 0;
		containerCadastroAluno.add(lblNomeAluno, gbc_lblNomeAluno);

		tfNomeAluno = new JTextField();
		tfNomeAluno.setFont(new Font("Tahoma", Font.PLAIN, 18));
		GridBagConstraints gbc_tfNomeAluno = new GridBagConstraints();
		gbc_tfNomeAluno.fill = GridBagConstraints.BOTH;
		gbc_tfNomeAluno.gridwidth = 5;
		gbc_tfNomeAluno.insets = new Insets(0, 0, 5, 0);
		gbc_tfNomeAluno.gridx = 1;
		gbc_tfNomeAluno.gridy = 1;
		containerCadastroAluno.add(tfNomeAluno, gbc_tfNomeAluno);
		tfNomeAluno.setColumns(10);

		JLabel lblRegistroAluno = new JLabel("RA:");
		lblRegistroAluno.setFont(new Font("Tahoma", Font.PLAIN, 20));
		GridBagConstraints gbc_lblRegistroAluno = new GridBagConstraints();
		gbc_lblRegistroAluno.gridwidth = 2;
		gbc_lblRegistroAluno.insets = new Insets(0, 0, 5, 5);
		gbc_lblRegistroAluno.anchor = GridBagConstraints.WEST;
		gbc_lblRegistroAluno.gridx = 1;
		gbc_lblRegistroAluno.gridy = 2;
		containerCadastroAluno.add(lblRegistroAluno, gbc_lblRegistroAluno);

		tfRegistroAluno = new JTextField();
		tfRegistroAluno.setFont(new Font("Tahoma", Font.PLAIN, 18));
		GridBagConstraints gbc_tfRegistroAluno = new GridBagConstraints();
		gbc_tfRegistroAluno.gridwidth = 5;
		gbc_tfRegistroAluno.insets = new Insets(0, 0, 5, 0);
		gbc_tfRegistroAluno.fill = GridBagConstraints.BOTH;
		gbc_tfRegistroAluno.gridx = 1;
		gbc_tfRegistroAluno.gridy = 3;
		containerCadastroAluno.add(tfRegistroAluno, gbc_tfRegistroAluno);
		tfRegistroAluno.setColumns(10);

		JLabel lblCpfAluno = new JLabel("CPF:");
		lblCpfAluno.setFont(new Font("Tahoma", Font.PLAIN, 20));
		GridBagConstraints gbc_lblCpfAluno = new GridBagConstraints();
		gbc_lblCpfAluno.gridwidth = 2;
		gbc_lblCpfAluno.insets = new Insets(0, 0, 5, 5);
		gbc_lblCpfAluno.anchor = GridBagConstraints.WEST;
		gbc_lblCpfAluno.gridx = 1;
		gbc_lblCpfAluno.gridy = 4;
		containerCadastroAluno.add(lblCpfAluno, gbc_lblCpfAluno);

		JFormattedTextField ftfCpfAluno = new JFormattedTextField();
		ftfCpfAluno.setFont(new Font("Tahoma", Font.PLAIN, 18));
		GridBagConstraints gbc_ftfCpfAluno = new GridBagConstraints();
		gbc_ftfCpfAluno.gridwidth = 5;
		gbc_ftfCpfAluno.insets = new Insets(0, 0, 5, 0);
		gbc_ftfCpfAluno.fill = GridBagConstraints.BOTH;
		gbc_ftfCpfAluno.gridx = 1;
		gbc_ftfCpfAluno.gridy = 5;
		containerCadastroAluno.add(ftfCpfAluno, gbc_ftfCpfAluno);

		JLabel lblDataNascimentoAluno = new JLabel("Data de nasc.:");
		lblDataNascimentoAluno.setFont(new Font("Tahoma", Font.PLAIN, 20));
		GridBagConstraints gbc_lblDataNascimentoAluno = new GridBagConstraints();
		gbc_lblDataNascimentoAluno.gridwidth = 2;
		gbc_lblDataNascimentoAluno.anchor = GridBagConstraints.WEST;
		gbc_lblDataNascimentoAluno.insets = new Insets(0, 0, 5, 5);
		gbc_lblDataNascimentoAluno.gridx = 1;
		gbc_lblDataNascimentoAluno.gridy = 6;
		containerCadastroAluno.add(lblDataNascimentoAluno, gbc_lblDataNascimentoAluno);

		UtilDateModel model = new UtilDateModel();
		JDatePanelImpl datePanel = new JDatePanelImpl(model);
		JDatePickerImpl tftDataNascimentoAluno = new JDatePickerImpl(datePanel, new DateLabelFormatter());
		tftDataNascimentoAluno.getJFormattedTextField().setFont(new Font("Tahoma", Font.PLAIN, 18));
		GridBagConstraints gbc_tftDataNascimentoAluno = new GridBagConstraints();
		gbc_tftDataNascimentoAluno.gridwidth = 5;
		gbc_tftDataNascimentoAluno.insets = new Insets(0, 0, 5, 0);
		gbc_tftDataNascimentoAluno.fill = GridBagConstraints.BOTH;
		gbc_tftDataNascimentoAluno.gridx = 1;
		gbc_tftDataNascimentoAluno.gridy = 7;
		containerCadastroAluno.add(tftDataNascimentoAluno, gbc_tftDataNascimentoAluno);

		/*
		 * JFormattedTextField tftDataNascimentoAluno = new JFormattedTextField();
		 * tftDataNascimentoAluno.setFont(new Font("Tahoma", Font.PLAIN, 18));
		 * GridBagConstraints gbc_tftDataNascimentoAluno = new GridBagConstraints();
		 * gbc_tftDataNascimentoAluno.gridwidth = 5; gbc_tftDataNascimentoAluno.insets =
		 * new Insets(0, 0, 5, 0); gbc_tftDataNascimentoAluno.fill =
		 * GridBagConstraints.BOTH; gbc_tftDataNascimentoAluno.gridx = 1;
		 * gbc_tftDataNascimentoAluno.gridy = 7;
		 * containerCadastroAluno.add(tftDataNascimentoAluno,
		 * gbc_tftDataNascimentoAluno);
		 */

		JButton btnCadastrar = new JButton("Cadastrar");
		btnCadastrar.addActionListener(new ActionListener() {
			public void actionPerformed(ActionEvent e) {
				if (tfRegistroAluno.getText().isBlank() || ftfCpfAluno.getText().isBlank()
						|| tfNomeAluno.getText().isBlank()
						|| tftDataNascimentoAluno.getJFormattedTextField().getText().isBlank()) {
					JOptionPane.showMessageDialog(null, "Todos os campos são obrigatórios.", "Campos vazios",
							JOptionPane.WARNING_MESSAGE);
					return;
				} else if (tfRegistroAluno.getText().length() != 13) {
					JOptionPane.showMessageDialog(null, "O RA deve possuir 13 (treze) dígitos.", "Valor inválido",
							JOptionPane.WARNING_MESSAGE);
					return;
				} else if (ftfCpfAluno.getText().length() != 11) {
					JOptionPane.showMessageDialog(null, "O CPF deve possuir 11 (onze) dígitos.", "Valor inválido",
							JOptionPane.WARNING_MESSAGE);
					return;
				}

				for (int i = 0; i < tfRegistroAluno.getText().length(); i++) {
					if (!Character.isDigit(tfRegistroAluno.getText().charAt(i))) {
						JOptionPane.showMessageDialog(null, "O RA deve possuir 13 (treze) dígitos.", "Valor inválido",
								JOptionPane.WARNING_MESSAGE);
						return;
					}
				}

				for (int i = 0; i < ftfCpfAluno.getText().length(); i++) {
					if (!Character.isDigit(ftfCpfAluno.getText().charAt(i))) {
						JOptionPane.showMessageDialog(null, "O CPF deve possuir 11 (onze) dígitos.", "Valor inválido",
								JOptionPane.WARNING_MESSAGE);
						return;
					}
				}

				a.setRa(tfRegistroAluno.getText());
				a.setCpf(ftfCpfAluno.getText());
				a.setNomeAluno(tfNomeAluno.getText());
				a.setDataNascimento(tftDataNascimentoAluno.getJFormattedTextField().getText());
				AlunoDAO dao = new AlunoDAO();
				dao.gravar(a);
				JOptionPane.showMessageDialog(null, "Aluno cadastrado com sucesso!", "Cadastro concluído",
						JOptionPane.INFORMATION_MESSAGE);
				PainelListarAlunos p = new PainelListarAlunos();
				FramePatec.getFrame().setContentPane(p);
				FramePatec.getFrame().revalidate();
				FramePatec.getFrame().repaint();

			}
		});
		GridBagConstraints gbc_btnCadastrar = new GridBagConstraints();
		gbc_btnCadastrar.gridwidth = 5;
		gbc_btnCadastrar.gridx = 1;
		gbc_btnCadastrar.gridy = 9;
		containerCadastroAluno.add(btnCadastrar, gbc_btnCadastrar);
	}

}
