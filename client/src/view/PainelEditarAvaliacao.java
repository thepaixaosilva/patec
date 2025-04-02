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
import javax.swing.JFormattedTextField;
import javax.swing.JLabel;
import javax.swing.JOptionPane;
import javax.swing.JPanel;
import javax.swing.JSeparator;
import javax.swing.JTextField;
import javax.swing.SwingConstants;

import model.Avaliacao;
import model.AvaliacaoDAO;
import net.sourceforge.jdatepicker.impl.JDatePanelImpl;
import net.sourceforge.jdatepicker.impl.JDatePickerImpl;
import net.sourceforge.jdatepicker.impl.UtilDateModel;
import view.components.BtnSair;
import view.components.BtnVoltar;
import view.components.DateLabelFormatter;
import view.components.MenuBarCoord;

public class PainelEditarAvaliacao extends JPanel {

	private static final long serialVersionUID = 1L;
	private JTextField tfCodigoAvaliacao;
	private JComboBox<String> cbTipoAvaliacao;
	private String[] tipoAvaliacao = { "1°BIM - SÁBADO", "2°BIM - SÁBADO", "1°BIM - SEGUNDA-FEIRA",
			"2°BIM - SEGUNDA-FEIRA", "FINAL" };

	/**
	 * Create the panel.
	 */
	public PainelEditarAvaliacao(Avaliacao a) {
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

		JLabel lblAvaliacao = new JLabel("Avaliacao");
		lblAvaliacao.setFont(new Font("Tahoma", Font.BOLD, 40));
		GridBagConstraints gbc_lblAvaliacao = new GridBagConstraints();
		gbc_lblAvaliacao.anchor = GridBagConstraints.EAST;
		gbc_lblAvaliacao.gridx = 1;
		gbc_lblAvaliacao.gridy = 1;
		containerLabels.add(lblAvaliacao, gbc_lblAvaliacao);

		JPanel containerEdicaoAvaliacao = new JPanel();
		containerEdicaoAvaliacao.setBackground(new Color(240, 240, 240));
		GridBagConstraints gbc_containerEdicaoAvaliacao = new GridBagConstraints();
		gbc_containerEdicaoAvaliacao.insets = new Insets(0, 0, 5, 5);
		gbc_containerEdicaoAvaliacao.fill = GridBagConstraints.BOTH;
		gbc_containerEdicaoAvaliacao.gridx = 3;
		gbc_containerEdicaoAvaliacao.gridy = 3;
		add(containerEdicaoAvaliacao, gbc_containerEdicaoAvaliacao);
		GridBagLayout gbl_containerEdicaoAvaliacao = new GridBagLayout();
		gbl_containerEdicaoAvaliacao.columnWeights = new double[] { 0.0, 1.0, 0.0, 0.0, 0.0, 0.0 };
		gbl_containerEdicaoAvaliacao.columnWidths = new int[] { 0, 5, 0, 0, 0, 0 };
		containerEdicaoAvaliacao.setLayout(gbl_containerEdicaoAvaliacao);

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
		containerEdicaoAvaliacao.add(separator, gbc_separator);

		JLabel lblCodigoAvaliacao = new JLabel("Código da Avaliação:");
		lblCodigoAvaliacao.setFont(new Font("Tahoma", Font.PLAIN, 20));
		GridBagConstraints gbc_lblCodigoAvaliacao = new GridBagConstraints();
		gbc_lblCodigoAvaliacao.gridwidth = 2;
		gbc_lblCodigoAvaliacao.insets = new Insets(0, 0, 5, 5);
		gbc_lblCodigoAvaliacao.anchor = GridBagConstraints.WEST;
		gbc_lblCodigoAvaliacao.gridx = 1;
		gbc_lblCodigoAvaliacao.gridy = 0;
		containerEdicaoAvaliacao.add(lblCodigoAvaliacao, gbc_lblCodigoAvaliacao);

		tfCodigoAvaliacao = new JTextField();
		tfCodigoAvaliacao.setEditable(false);
		tfCodigoAvaliacao.setFont(new Font("Tahoma", Font.PLAIN, 18));
		tfCodigoAvaliacao.setText(Integer.toString(a.getCodigoAvaliacao()));
		GridBagConstraints gbc_tfCodigoAvaliacao = new GridBagConstraints();
		gbc_tfCodigoAvaliacao.fill = GridBagConstraints.BOTH;
		gbc_tfCodigoAvaliacao.gridwidth = 5;
		gbc_tfCodigoAvaliacao.insets = new Insets(0, 0, 5, 0);
		gbc_tfCodigoAvaliacao.gridx = 1;
		gbc_tfCodigoAvaliacao.gridy = 1;
		containerEdicaoAvaliacao.add(tfCodigoAvaliacao, gbc_tfCodigoAvaliacao);
		tfCodigoAvaliacao.setColumns(10);

		JLabel lblDataAvaliacao = new JLabel("Data da Avaliação:");
		lblDataAvaliacao.setFont(new Font("Tahoma", Font.PLAIN, 20));
		GridBagConstraints gbc_lblDataAvaliacao = new GridBagConstraints();
		gbc_lblDataAvaliacao.gridwidth = 2;
		gbc_lblDataAvaliacao.insets = new Insets(0, 0, 5, 5);
		gbc_lblDataAvaliacao.anchor = GridBagConstraints.WEST;
		gbc_lblDataAvaliacao.gridx = 1;
		gbc_lblDataAvaliacao.gridy = 2;
		containerEdicaoAvaliacao.add(lblDataAvaliacao, gbc_lblDataAvaliacao);

		UtilDateModel model = new UtilDateModel();
		JDatePanelImpl datePanel = new JDatePanelImpl(model);
		JDatePickerImpl tftDataAvaliacao = new JDatePickerImpl(datePanel, new DateLabelFormatter());
		tftDataAvaliacao.getJFormattedTextField().setFont(new Font("Tahoma", Font.PLAIN, 18));
		tftDataAvaliacao.getJFormattedTextField().setText(a.getDataAvaliacao());
		GridBagConstraints gbc_tftDataAvaliacao = new GridBagConstraints();
		gbc_tftDataAvaliacao.gridwidth = 5;
		gbc_tftDataAvaliacao.insets = new Insets(0, 0, 5, 0);
		gbc_tftDataAvaliacao.fill = GridBagConstraints.BOTH;
		gbc_tftDataAvaliacao.gridx = 1;
		gbc_tftDataAvaliacao.gridy = 3;
		containerEdicaoAvaliacao.add(tftDataAvaliacao, gbc_tftDataAvaliacao);

		JLabel lblTipoAvaliacao = new JLabel("Tipo da Avaliação:");
		lblTipoAvaliacao.setFont(new Font("Tahoma", Font.PLAIN, 20));
		GridBagConstraints gbc_lblTipoAvaliacao = new GridBagConstraints();
		gbc_lblTipoAvaliacao.gridwidth = 2;
		gbc_lblTipoAvaliacao.anchor = GridBagConstraints.WEST;
		gbc_lblTipoAvaliacao.insets = new Insets(0, 0, 5, 5);
		gbc_lblTipoAvaliacao.gridx = 1;
		gbc_lblTipoAvaliacao.gridy = 4;
		containerEdicaoAvaliacao.add(lblTipoAvaliacao, gbc_lblTipoAvaliacao);

		cbTipoAvaliacao = new JComboBox<String>(tipoAvaliacao);
		cbTipoAvaliacao.setFont(new Font("Tahoma", Font.PLAIN, 18));
		cbTipoAvaliacao.setSelectedItem(a.getTipoAvaliacao());
		GridBagConstraints gbc_cbTipoAvaliacao = new GridBagConstraints();
		gbc_cbTipoAvaliacao.gridwidth = 5;
		gbc_cbTipoAvaliacao.insets = new Insets(0, 0, 5, 0);
		gbc_cbTipoAvaliacao.fill = GridBagConstraints.HORIZONTAL;
		gbc_cbTipoAvaliacao.gridx = 1;
		gbc_cbTipoAvaliacao.gridy = 5;
		containerEdicaoAvaliacao.add(cbTipoAvaliacao, gbc_cbTipoAvaliacao);

		JButton btnSalvar = new JButton("Salvar");
		btnSalvar.addActionListener(new ActionListener() {
			public void actionPerformed(ActionEvent e) {
				if (tftDataAvaliacao.getJFormattedTextField().getText().isBlank()) {
					JOptionPane.showMessageDialog(null, "Todos os campos são obrigatórios.", "Campos vazios",
							JOptionPane.WARNING_MESSAGE);
				} else {
					a.setCodigoAvaliacao(Integer.parseInt(tfCodigoAvaliacao.getText()));
					a.setDataAvaliacao(tftDataAvaliacao.getJFormattedTextField().getText());
					a.setTipoAvaliacao(cbTipoAvaliacao.getSelectedItem().toString());
					AvaliacaoDAO dao = new AvaliacaoDAO();

					JOptionPane.showMessageDialog(null, dao.gravar(a), "Edição concluída",
							JOptionPane.INFORMATION_MESSAGE);
					PainelListarAvaliacoes p = new PainelListarAvaliacoes();
					FramePatec.getFrame().setContentPane(p);
					FramePatec.getFrame().revalidate();
					FramePatec.getFrame().repaint();
				}
			}
		});
		GridBagConstraints gbc_btnSalvar = new GridBagConstraints();
		gbc_btnSalvar.gridwidth = 5;
		gbc_btnSalvar.gridx = 1;
		gbc_btnSalvar.gridy = 9;
		containerEdicaoAvaliacao.add(btnSalvar, gbc_btnSalvar);
	}

}