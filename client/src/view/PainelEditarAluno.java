package view;

import java.awt.Color;
import java.awt.Font;
import java.awt.GridBagConstraints;
import java.awt.GridBagLayout;
import java.awt.Insets;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;

import javax.swing.JButton;
import javax.swing.JFormattedTextField;
import javax.swing.JLabel;
import javax.swing.JOptionPane;
import javax.swing.JPanel;
import javax.swing.JSeparator;
import javax.swing.JTextField;
import javax.swing.SwingConstants;

import model.Aluno;
import model.AlunoDAO;
import net.sourceforge.jdatepicker.impl.JDatePanelImpl;
import net.sourceforge.jdatepicker.impl.JDatePickerImpl;
import net.sourceforge.jdatepicker.impl.UtilDateModel;
import view.components.BtnSair;
import view.components.BtnVoltar;
import view.components.DateLabelFormatter;
import view.components.MenuBarCoord;

public class PainelEditarAluno extends JPanel {

	private static final long serialVersionUID = 1L;
	private JTextField tfNomeAluno;
	private JTextField tfRegistroAluno;

	/**
	 * Create the panel.
	 */
	public PainelEditarAluno(Aluno a) {
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
		containerLabels.setLayout(gbl_containerLabels);

		JLabel lblEditar = new JLabel("Editar");
		lblEditar.setFont(new Font("Tahoma", Font.BOLD, 40));
		lblEditar.setBackground(new Color(128, 255, 255));
		GridBagConstraints gbc_lblEditar = new GridBagConstraints();
		gbc_lblEditar.anchor = GridBagConstraints.EAST;
		gbc_lblEditar.insets = new Insets(0, 0, 5, 0);
		gbc_lblEditar.gridx = 1;
		gbc_lblEditar.gridy = 0;
		containerLabels.add(lblEditar, gbc_lblEditar);

		JLabel lblAluno = new JLabel("Aluno");
		lblAluno.setFont(new Font("Tahoma", Font.BOLD, 40));
		GridBagConstraints gbc_lblAluno = new GridBagConstraints();
		gbc_lblAluno.anchor = GridBagConstraints.EAST;
		gbc_lblAluno.gridx = 1;
		gbc_lblAluno.gridy = 1;
		containerLabels.add(lblAluno, gbc_lblAluno);

		JPanel containerEdicaoAluno = new JPanel();
		containerEdicaoAluno.setBackground(new Color(240, 240, 240));
		GridBagConstraints gbc_containerEdicaoAluno = new GridBagConstraints();
		gbc_containerEdicaoAluno.insets = new Insets(0, 0, 5, 5);
		gbc_containerEdicaoAluno.fill = GridBagConstraints.BOTH;
		gbc_containerEdicaoAluno.gridx = 3;
		gbc_containerEdicaoAluno.gridy = 3;
		add(containerEdicaoAluno, gbc_containerEdicaoAluno);
		GridBagLayout gbl_containerEdicaoAluno = new GridBagLayout();
		gbl_containerEdicaoAluno.columnWeights = new double[] { 0.0, 1.0, 0.0, 0.0, 0.0, 0.0 };
		gbl_containerEdicaoAluno.columnWidths = new int[] { 0, 5, 0, 0, 0, 0 };
		containerEdicaoAluno.setLayout(gbl_containerEdicaoAluno);

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
		containerEdicaoAluno.add(separator, gbc_separator);

		JLabel lblNomeAluno = new JLabel("Nome:");
		lblNomeAluno.setFont(new Font("Tahoma", Font.PLAIN, 20));
		GridBagConstraints gbc_lblNomeAluno = new GridBagConstraints();
		gbc_lblNomeAluno.gridwidth = 2;
		gbc_lblNomeAluno.insets = new Insets(0, 0, 5, 5);
		gbc_lblNomeAluno.anchor = GridBagConstraints.WEST;
		gbc_lblNomeAluno.gridx = 1;
		gbc_lblNomeAluno.gridy = 0;
		containerEdicaoAluno.add(lblNomeAluno, gbc_lblNomeAluno);

		tfNomeAluno = new JTextField();
		tfNomeAluno.setFont(new Font("Tahoma", Font.PLAIN, 18));
		tfNomeAluno.setText(a.getNomeAluno());
		GridBagConstraints gbc_tfNomeAluno = new GridBagConstraints();
		gbc_tfNomeAluno.fill = GridBagConstraints.BOTH;
		gbc_tfNomeAluno.gridwidth = 5;
		gbc_tfNomeAluno.insets = new Insets(0, 0, 5, 0);
		gbc_tfNomeAluno.gridx = 1;
		gbc_tfNomeAluno.gridy = 1;
		containerEdicaoAluno.add(tfNomeAluno, gbc_tfNomeAluno);
		tfNomeAluno.setColumns(10);

		JLabel lblRegistroAluno = new JLabel("RA:");
		lblRegistroAluno.setFont(new Font("Tahoma", Font.PLAIN, 20));
		GridBagConstraints gbc_lblRegistroAluno = new GridBagConstraints();
		gbc_lblRegistroAluno.gridwidth = 2;
		gbc_lblRegistroAluno.insets = new Insets(0, 0, 5, 5);
		gbc_lblRegistroAluno.anchor = GridBagConstraints.WEST;
		gbc_lblRegistroAluno.gridx = 1;
		gbc_lblRegistroAluno.gridy = 2;
		containerEdicaoAluno.add(lblRegistroAluno, gbc_lblRegistroAluno);

		tfRegistroAluno = new JTextField();
		tfRegistroAluno.setEditable(false);
		tfRegistroAluno.setFont(new Font("Tahoma", Font.PLAIN, 18));
		tfRegistroAluno.setText(a.getRa());
		GridBagConstraints gbc_tfRegistroAluno = new GridBagConstraints();
		gbc_tfRegistroAluno.gridwidth = 5;
		gbc_tfRegistroAluno.insets = new Insets(0, 0, 5, 0);
		gbc_tfRegistroAluno.fill = GridBagConstraints.BOTH;
		gbc_tfRegistroAluno.gridx = 1;
		gbc_tfRegistroAluno.gridy = 3;
		containerEdicaoAluno.add(tfRegistroAluno, gbc_tfRegistroAluno);
		tfRegistroAluno.setColumns(10);

		JLabel lblCpfAluno = new JLabel("CPF:");
		lblCpfAluno.setFont(new Font("Tahoma", Font.PLAIN, 20));
		GridBagConstraints gbc_lblCpfAluno = new GridBagConstraints();
		gbc_lblCpfAluno.gridwidth = 2;
		gbc_lblCpfAluno.insets = new Insets(0, 0, 5, 5);
		gbc_lblCpfAluno.anchor = GridBagConstraints.WEST;
		gbc_lblCpfAluno.gridx = 1;
		gbc_lblCpfAluno.gridy = 4;
		containerEdicaoAluno.add(lblCpfAluno, gbc_lblCpfAluno);

		JFormattedTextField ftfCpfAluno = new JFormattedTextField();
		ftfCpfAluno.setFont(new Font("Tahoma", Font.PLAIN, 18));
		ftfCpfAluno.setText(a.getCpf());
		GridBagConstraints gbc_ftfCpfAluno = new GridBagConstraints();
		gbc_ftfCpfAluno.gridwidth = 5;
		gbc_ftfCpfAluno.insets = new Insets(0, 0, 5, 0);
		gbc_ftfCpfAluno.fill = GridBagConstraints.BOTH;
		gbc_ftfCpfAluno.gridx = 1;
		gbc_ftfCpfAluno.gridy = 5;
		containerEdicaoAluno.add(ftfCpfAluno, gbc_ftfCpfAluno);

		JLabel lblDataNascimentoAluno = new JLabel("Data de nasc.:");
		lblDataNascimentoAluno.setFont(new Font("Tahoma", Font.PLAIN, 20));
		GridBagConstraints gbc_lblDataNascimentoAluno = new GridBagConstraints();
		gbc_lblDataNascimentoAluno.gridwidth = 2;
		gbc_lblDataNascimentoAluno.anchor = GridBagConstraints.WEST;
		gbc_lblDataNascimentoAluno.insets = new Insets(0, 0, 5, 5);
		gbc_lblDataNascimentoAluno.gridx = 1;
		gbc_lblDataNascimentoAluno.gridy = 6;
		containerEdicaoAluno.add(lblDataNascimentoAluno, gbc_lblDataNascimentoAluno);

		UtilDateModel model = new UtilDateModel();
		JDatePanelImpl datePanel = new JDatePanelImpl(model);
		JDatePickerImpl tftDataNascimentoAluno = new JDatePickerImpl(datePanel, new DateLabelFormatter());
		tftDataNascimentoAluno.getJFormattedTextField().setFont(new Font("Tahoma", Font.PLAIN, 18));
		tftDataNascimentoAluno.getJFormattedTextField().setText(a.getDataNascimento());
		GridBagConstraints gbc_tftDataNascimentoAluno = new GridBagConstraints();
		gbc_tftDataNascimentoAluno.gridwidth = 5;
		gbc_tftDataNascimentoAluno.insets = new Insets(0, 0, 5, 0);
		gbc_tftDataNascimentoAluno.fill = GridBagConstraints.BOTH;
		gbc_tftDataNascimentoAluno.gridx = 1;
		gbc_tftDataNascimentoAluno.gridy = 7;
		containerEdicaoAluno.add(tftDataNascimentoAluno, gbc_tftDataNascimentoAluno);

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

		JButton btnSalvar = new JButton("Salvar");
		btnSalvar.addActionListener(new ActionListener() {
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
		GridBagConstraints gbc_btnSalvar = new GridBagConstraints();
		gbc_btnSalvar.gridwidth = 5;
		gbc_btnSalvar.gridx = 1;
		gbc_btnSalvar.gridy = 9;
		containerEdicaoAluno.add(btnSalvar, gbc_btnSalvar);
	}

}