package view;

import java.awt.Color;
import java.awt.Cursor;
import java.awt.Font;
import java.awt.GridBagConstraints;
import java.awt.GridBagLayout;
import java.awt.Insets;
import java.awt.event.MouseAdapter;
import java.awt.event.MouseEvent;
import java.awt.font.TextAttribute;
import java.util.Map;

import javax.swing.JLabel;
import javax.swing.JPanel;
import javax.swing.JSeparator;

import model.GabaritoOficial;
import view.components.BtnSair;
import view.components.MenuBarCoord;

public class PainelMenuCoordenador extends JPanel {

	private static final long serialVersionUID = 1L;

	/**
	 * Create the panel.
	 */
	public PainelMenuCoordenador() {
		GridBagLayout gridBagLayout = new GridBagLayout();
		gridBagLayout.columnWidths = new int[] { 66, 450, 66 };
		gridBagLayout.rowHeights = new int[] { 28, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 };
		gridBagLayout.columnWeights = new double[] { 0.0, 1.0, 0.0 };
		gridBagLayout.rowWeights = new double[] { 0.0, 0.0, 1.0, 0.0, 1.0, 0.0, 1.0, 0.0, 1.0, 0.0, 1.0,
				Double.MIN_VALUE };
		setLayout(gridBagLayout);

		MenuBarCoord bdf = new MenuBarCoord();
		GridBagConstraints gbc_bdf = new GridBagConstraints();
		gbc_bdf.gridwidth = 3;
		gbc_bdf.anchor = GridBagConstraints.NORTH;
		gbc_bdf.fill = GridBagConstraints.HORIZONTAL;
		gbc_bdf.insets = new Insets(0, 0, 5, 0);
		gbc_bdf.gridx = 0;
		gbc_bdf.gridy = 0;
		add(bdf, gbc_bdf);

		BtnSair btnSair = new BtnSair("Sair");
		GridBagConstraints gbc_btnSair = new GridBagConstraints();
		gbc_btnSair.insets = new Insets(0, 0, 5, 0);
		gbc_btnSair.anchor = GridBagConstraints.NORTHEAST;
		gbc_btnSair.gridx = 2;
		gbc_btnSair.gridy = 1;
		add(btnSair, gbc_btnSair);

		JPanel containerGabarito = new JPanel();
		GridBagConstraints gbc_containerGabarito = new GridBagConstraints();
		gbc_containerGabarito.fill = GridBagConstraints.BOTH;
		gbc_containerGabarito.insets = new Insets(0, 0, 5, 0);
		gbc_containerGabarito.gridx = 1;
		gbc_containerGabarito.gridy = 2;
		add(containerGabarito, gbc_containerGabarito);
		GridBagLayout gbl_containerGabarito = new GridBagLayout();
		gbl_containerGabarito.rowWeights = new double[] { 1.0 };
		gbl_containerGabarito.columnWeights = new double[] { 0.0, 1.0 };
		containerGabarito.setLayout(gbl_containerGabarito);

		JLabel lblGabarito = new JLabel("Gabarito");
		lblGabarito.setFont(new Font("Tahoma", Font.BOLD, 50));
		GridBagConstraints gbc_lblGabarito = new GridBagConstraints();
		gbc_lblGabarito.insets = new Insets(0, 0, 0, 5);
		gbc_lblGabarito.anchor = GridBagConstraints.WEST;
		gbc_lblGabarito.gridx = 0;
		gbc_lblGabarito.gridy = 0;
		containerGabarito.add(lblGabarito, gbc_lblGabarito);

		JPanel containerOpcoesGabarito = new JPanel();
		GridBagConstraints gbc_containerOpcoesGabarito = new GridBagConstraints();
		gbc_containerOpcoesGabarito.anchor = GridBagConstraints.EAST;
		gbc_containerOpcoesGabarito.fill = GridBagConstraints.VERTICAL;
		gbc_containerOpcoesGabarito.gridx = 1;
		gbc_containerOpcoesGabarito.gridy = 0;
		containerGabarito.add(containerOpcoesGabarito, gbc_containerOpcoesGabarito);
		GridBagLayout gbl_containerOpcoesGabarito = new GridBagLayout();
		containerOpcoesGabarito.setLayout(gbl_containerOpcoesGabarito);

		JLabel lblListarGabarito = new JLabel("Ver Lista ->");
		lblListarGabarito.setCursor(Cursor.getPredefinedCursor(Cursor.HAND_CURSOR));
		lblListarGabarito.addMouseListener(new MouseAdapter() {
			@Override
			public void mouseClicked(MouseEvent e) {
				try {
					PainelListarGabaritos p = new PainelListarGabaritos();
					FramePatec.getFrame().setTitle("Patec - Listar Gabaritos");
					FramePatec.getFrame().setContentPane(p);
					FramePatec.getFrame().revalidate();
					FramePatec.getFrame().repaint();
				} catch (Exception e1) {
					
				}

			}

			@Override
			public void mouseEntered(MouseEvent e) {
				Font font = lblListarGabarito.getFont();
				Map<TextAttribute, Integer> attributes = (Map<TextAttribute, Integer>) font.getAttributes();
				attributes.put(TextAttribute.UNDERLINE, 0);
				lblListarGabarito.setFont(font.deriveFont(attributes));
			}

			@Override
			public void mouseExited(MouseEvent e) {
				Font font = lblListarGabarito.getFont();
				Map<TextAttribute, Integer> attributes = (Map<TextAttribute, Integer>) font.getAttributes();
				attributes.put(TextAttribute.UNDERLINE, -1);
				lblListarGabarito.setFont(font.deriveFont(attributes));
			}
		});
		lblListarGabarito.setFont(new Font("Tahoma", Font.PLAIN, 20));
		GridBagConstraints gbc_lblListarGabarito = new GridBagConstraints();
		gbc_lblListarGabarito.anchor = GridBagConstraints.EAST;
		gbc_lblListarGabarito.insets = new Insets(0, 0, 5, 0);
		gbc_lblListarGabarito.gridx = 0;
		gbc_lblListarGabarito.gridy = 0;
		containerOpcoesGabarito.add(lblListarGabarito, gbc_lblListarGabarito);

		JLabel lblCadastrarGabarito = new JLabel("Cadastrar Gabarito ->");
		lblCadastrarGabarito.setCursor(Cursor.getPredefinedCursor(Cursor.HAND_CURSOR));
		lblCadastrarGabarito.addMouseListener(new MouseAdapter() {
			@Override
			public void mouseClicked(MouseEvent e) {
				PainelCadastroGabarito p = new PainelCadastroGabarito(-1);
				FramePatec.getFrame().setTitle("Patec - Cadastrar Gabarito");
				FramePatec.getFrame().setContentPane(p);
				FramePatec.getFrame().revalidate();
				FramePatec.getFrame().repaint();
			}

			@Override
			public void mouseEntered(MouseEvent e) {
				Font font = lblCadastrarGabarito.getFont();
				Map<TextAttribute, Integer> attributes = (Map<TextAttribute, Integer>) font.getAttributes();
				attributes.put(TextAttribute.UNDERLINE, 0);
				lblCadastrarGabarito.setFont(font.deriveFont(attributes));
			}

			@Override
			public void mouseExited(MouseEvent e) {
				Font font = lblCadastrarGabarito.getFont();
				Map<TextAttribute, Integer> attributes = (Map<TextAttribute, Integer>) font.getAttributes();
				attributes.put(TextAttribute.UNDERLINE, -1);
				lblCadastrarGabarito.setFont(font.deriveFont(attributes));
			}
		});
		lblCadastrarGabarito.setFont(new Font("Tahoma", Font.PLAIN, 20));
		GridBagConstraints gbc_lblCadastrarGabarito = new GridBagConstraints();
		gbc_lblCadastrarGabarito.anchor = GridBagConstraints.EAST;
		gbc_lblCadastrarGabarito.gridx = 0;
		gbc_lblCadastrarGabarito.gridy = 1;
		containerOpcoesGabarito.add(lblCadastrarGabarito, gbc_lblCadastrarGabarito);

		JSeparator separator = new JSeparator();
		separator.setForeground(new Color(128, 128, 128));
		separator.setBackground(new Color(128, 128, 128));
		GridBagConstraints gbc_separator = new GridBagConstraints();
		gbc_separator.fill = GridBagConstraints.BOTH;
		gbc_separator.insets = new Insets(0, 0, 5, 5);
		gbc_separator.gridx = 1;
		gbc_separator.gridy = 3;
		add(separator, gbc_separator);

		JPanel containerAluno = new JPanel();
		GridBagConstraints gbc_containerAluno = new GridBagConstraints();
		gbc_containerAluno.fill = GridBagConstraints.BOTH;
		gbc_containerAluno.insets = new Insets(0, 0, 5, 0);
		gbc_containerAluno.gridx = 1;
		gbc_containerAluno.gridy = 4;
		add(containerAluno, gbc_containerAluno);
		GridBagLayout gbl_containerAluno = new GridBagLayout();
		gbl_containerAluno.rowWeights = new double[] { 1.0 };
		gbl_containerAluno.columnWeights = new double[] { 0.0, 1.0 };
		containerAluno.setLayout(gbl_containerAluno);

		JLabel lblAluno = new JLabel("Aluno");
		lblAluno.setFont(new Font("Tahoma", Font.BOLD, 50));
		GridBagConstraints gbc_lblAluno = new GridBagConstraints();
		gbc_lblAluno.insets = new Insets(0, 0, 0, 5);
		gbc_lblAluno.anchor = GridBagConstraints.WEST;
		gbc_lblAluno.gridx = 0;
		gbc_lblAluno.gridy = 0;
		containerAluno.add(lblAluno, gbc_lblAluno);

		JPanel containerOpcoesAluno = new JPanel();
		GridBagConstraints gbc_containerOpcoesAluno = new GridBagConstraints();
		gbc_containerOpcoesAluno.anchor = GridBagConstraints.EAST;
		gbc_containerOpcoesAluno.fill = GridBagConstraints.VERTICAL;
		gbc_containerOpcoesAluno.gridx = 1;
		gbc_containerOpcoesAluno.gridy = 0;
		containerAluno.add(containerOpcoesAluno, gbc_containerOpcoesAluno);
		GridBagLayout gbl_containerOpcoesAluno = new GridBagLayout();
		containerOpcoesAluno.setLayout(gbl_containerOpcoesAluno);

		JLabel lblListarAluno = new JLabel("Ver Lista ->");
		lblListarAluno.setCursor(Cursor.getPredefinedCursor(Cursor.HAND_CURSOR));
		lblListarAluno.addMouseListener(new MouseAdapter() {
			@Override
			public void mouseClicked(MouseEvent e) {
				PainelListarAlunos p = new PainelListarAlunos();
				FramePatec.getFrame().setTitle("Patec - Listar Alunos");
				FramePatec.getFrame().setContentPane(p);
				FramePatec.getFrame().revalidate();
				FramePatec.getFrame().repaint();
			}

			@Override
			public void mouseEntered(MouseEvent e) {
				Font font = lblListarAluno.getFont();
				Map<TextAttribute, Integer> attributes = (Map<TextAttribute, Integer>) font.getAttributes();
				attributes.put(TextAttribute.UNDERLINE, 0);
				lblListarAluno.setFont(font.deriveFont(attributes));
			}

			@Override
			public void mouseExited(MouseEvent e) {
				Font font = lblListarAluno.getFont();
				Map<TextAttribute, Integer> attributes = (Map<TextAttribute, Integer>) font.getAttributes();
				attributes.put(TextAttribute.UNDERLINE, -1);
				lblListarAluno.setFont(font.deriveFont(attributes));
			}
		});
		lblListarAluno.setFont(new Font("Tahoma", Font.PLAIN, 20));
		GridBagConstraints gbc_lblListarAluno = new GridBagConstraints();
		gbc_lblListarAluno.anchor = GridBagConstraints.EAST;
		gbc_lblListarAluno.insets = new Insets(0, 0, 5, 0);
		gbc_lblListarAluno.gridx = 0;
		gbc_lblListarAluno.gridy = 0;
		containerOpcoesAluno.add(lblListarAluno, gbc_lblListarAluno);

		JLabel lblCadastrarAluno = new JLabel("Cadastrar Aluno ->");
		lblCadastrarAluno.setCursor(Cursor.getPredefinedCursor(Cursor.HAND_CURSOR));
		lblCadastrarAluno.addMouseListener(new MouseAdapter() {
			@Override
			public void mouseClicked(MouseEvent e) {
				PainelCadastroAluno p = new PainelCadastroAluno();
				FramePatec.getFrame().setTitle("Patec - Cadastrar Aluno");
				FramePatec.getFrame().setContentPane(p);
				FramePatec.getFrame().revalidate();
				FramePatec.getFrame().repaint();
			}

			@Override
			public void mouseEntered(MouseEvent e) {
				Font font = lblCadastrarAluno.getFont();
				Map<TextAttribute, Integer> attributes = (Map<TextAttribute, Integer>) font.getAttributes();
				attributes.put(TextAttribute.UNDERLINE, 0);
				lblCadastrarAluno.setFont(font.deriveFont(attributes));
			}

			@Override
			public void mouseExited(MouseEvent e) {
				Font font = lblCadastrarAluno.getFont();
				Map<TextAttribute, Integer> attributes = (Map<TextAttribute, Integer>) font.getAttributes();
				attributes.put(TextAttribute.UNDERLINE, -1);
				lblCadastrarAluno.setFont(font.deriveFont(attributes));
			}
		});
		lblCadastrarAluno.setFont(new Font("Tahoma", Font.PLAIN, 20));
		GridBagConstraints gbc_lblCadastrarAluno = new GridBagConstraints();
		gbc_lblCadastrarAluno.anchor = GridBagConstraints.EAST;
		gbc_lblCadastrarAluno.gridx = 0;
		gbc_lblCadastrarAluno.gridy = 1;
		containerOpcoesAluno.add(lblCadastrarAluno, gbc_lblCadastrarAluno);

		JSeparator separator_1 = new JSeparator();
		separator_1.setBackground(new Color(128, 128, 128));
		separator_1.setForeground(new Color(128, 128, 128));
		GridBagConstraints gbc_separator_1 = new GridBagConstraints();
		gbc_separator_1.fill = GridBagConstraints.BOTH;
		gbc_separator_1.insets = new Insets(0, 0, 5, 5);
		gbc_separator_1.gridx = 1;
		gbc_separator_1.gridy = 5;
		add(separator_1, gbc_separator_1);

		JPanel containerDisciplina = new JPanel();
		GridBagConstraints gbc_containerDisciplina = new GridBagConstraints();
		gbc_containerDisciplina.fill = GridBagConstraints.BOTH;
		gbc_containerDisciplina.insets = new Insets(0, 0, 5, 0);
		gbc_containerDisciplina.gridx = 1;
		gbc_containerDisciplina.gridy = 6;
		add(containerDisciplina, gbc_containerDisciplina);
		GridBagLayout gbl_containerDisciplina = new GridBagLayout();
		gbl_containerDisciplina.rowWeights = new double[] { 1.0 };
		gbl_containerDisciplina.columnWeights = new double[] { 0.0, 1.0 };
		containerDisciplina.setLayout(gbl_containerDisciplina);

		JLabel lblDisciplina = new JLabel("Disciplina");
		lblDisciplina.setFont(new Font("Tahoma", Font.BOLD, 50));
		GridBagConstraints gbc_lblDisciplina = new GridBagConstraints();
		gbc_lblDisciplina.insets = new Insets(0, 0, 0, 5);
		gbc_lblDisciplina.anchor = GridBagConstraints.WEST;
		gbc_lblDisciplina.gridx = 0;
		gbc_lblDisciplina.gridy = 0;
		containerDisciplina.add(lblDisciplina, gbc_lblDisciplina);

		JPanel containerOpcoesDisciplina = new JPanel();
		GridBagConstraints gbc_containerOpcoesDisciplina = new GridBagConstraints();
		gbc_containerOpcoesDisciplina.anchor = GridBagConstraints.EAST;
		gbc_containerOpcoesDisciplina.fill = GridBagConstraints.VERTICAL;
		gbc_containerOpcoesDisciplina.gridx = 1;
		gbc_containerOpcoesDisciplina.gridy = 0;
		containerDisciplina.add(containerOpcoesDisciplina, gbc_containerOpcoesDisciplina);
		GridBagLayout gbl_containerOpcoesDisciplina = new GridBagLayout();
		containerOpcoesDisciplina.setLayout(gbl_containerOpcoesDisciplina);

		JLabel lblListarDisciplina = new JLabel("Ver Lista ->");
		lblListarDisciplina.setCursor(Cursor.getPredefinedCursor(Cursor.HAND_CURSOR));
		lblListarDisciplina.addMouseListener(new MouseAdapter() {
			@Override
			public void mouseClicked(MouseEvent e) {
				PainelListarDisciplinas p = new PainelListarDisciplinas();
				FramePatec.getFrame().setTitle("Patec - Listar Disciplinas");
				FramePatec.getFrame().setContentPane(p);
				FramePatec.getFrame().revalidate();
				FramePatec.getFrame().repaint();
			}

			@Override
			public void mouseEntered(MouseEvent e) {
				Font font = lblListarDisciplina.getFont();
				Map<TextAttribute, Integer> attributes = (Map<TextAttribute, Integer>) font.getAttributes();
				attributes.put(TextAttribute.UNDERLINE, 0);
				lblListarDisciplina.setFont(font.deriveFont(attributes));
			}

			@Override
			public void mouseExited(MouseEvent e) {
				Font font = lblListarDisciplina.getFont();
				Map<TextAttribute, Integer> attributes = (Map<TextAttribute, Integer>) font.getAttributes();
				attributes.put(TextAttribute.UNDERLINE, -1);
				lblListarDisciplina.setFont(font.deriveFont(attributes));
			}
		});
		lblListarDisciplina.setFont(new Font("Tahoma", Font.PLAIN, 20));
		GridBagConstraints gbc_lblListarDisciplina = new GridBagConstraints();
		gbc_lblListarDisciplina.anchor = GridBagConstraints.EAST;
		gbc_lblListarDisciplina.insets = new Insets(0, 0, 5, 0);
		gbc_lblListarDisciplina.gridx = 0;
		gbc_lblListarDisciplina.gridy = 0;
		containerOpcoesDisciplina.add(lblListarDisciplina, gbc_lblListarDisciplina);

		JLabel lblCadastrarDisciplina = new JLabel("Cadastrar Disciplina ->");
		lblCadastrarDisciplina.setCursor(Cursor.getPredefinedCursor(Cursor.HAND_CURSOR));
		lblCadastrarDisciplina.addMouseListener(new MouseAdapter() {
			@Override
			public void mouseClicked(MouseEvent e) {
				PainelCadastroDisciplina p = new PainelCadastroDisciplina();
				FramePatec.getFrame().setTitle("Patec - Cadastrar Disciplina");
				FramePatec.getFrame().setContentPane(p);
				FramePatec.getFrame().revalidate();
				FramePatec.getFrame().repaint();
			}

			@Override
			public void mouseEntered(MouseEvent e) {
				Font font = lblCadastrarDisciplina.getFont();
				Map<TextAttribute, Integer> attributes = (Map<TextAttribute, Integer>) font.getAttributes();
				attributes.put(TextAttribute.UNDERLINE, 0);
				lblCadastrarDisciplina.setFont(font.deriveFont(attributes));
			}

			@Override
			public void mouseExited(MouseEvent e) {
				Font font = lblCadastrarDisciplina.getFont();
				Map<TextAttribute, Integer> attributes = (Map<TextAttribute, Integer>) font.getAttributes();
				attributes.put(TextAttribute.UNDERLINE, -1);
				lblCadastrarDisciplina.setFont(font.deriveFont(attributes));
			}
		});
		lblCadastrarDisciplina.setFont(new Font("Tahoma", Font.PLAIN, 20));
		GridBagConstraints gbc_lblCadastrarDisciplina = new GridBagConstraints();
		gbc_lblCadastrarDisciplina.anchor = GridBagConstraints.EAST;
		gbc_lblCadastrarDisciplina.gridx = 0;
		gbc_lblCadastrarDisciplina.gridy = 1;
		containerOpcoesDisciplina.add(lblCadastrarDisciplina, gbc_lblCadastrarDisciplina);

		JSeparator separator_2 = new JSeparator();
		separator_2.setForeground(new Color(128, 128, 128));
		separator_2.setBackground(new Color(128, 128, 128));
		GridBagConstraints gbc_separator_2 = new GridBagConstraints();
		gbc_separator_2.fill = GridBagConstraints.BOTH;
		gbc_separator_2.insets = new Insets(0, 0, 5, 5);
		gbc_separator_2.gridx = 1;
		gbc_separator_2.gridy = 7;
		add(separator_2, gbc_separator_2);

		JPanel containerAvaliacao = new JPanel();
		GridBagConstraints gbc_containerAvaliacao = new GridBagConstraints();
		gbc_containerAvaliacao.fill = GridBagConstraints.BOTH;
		gbc_containerAvaliacao.insets = new Insets(0, 0, 5, 0);
		gbc_containerAvaliacao.gridx = 1;
		gbc_containerAvaliacao.gridy = 8;
		add(containerAvaliacao, gbc_containerAvaliacao);
		GridBagLayout gbl_containerAvaliacao = new GridBagLayout();
		gbl_containerAvaliacao.rowWeights = new double[] { 1.0 };
		gbl_containerAvaliacao.columnWeights = new double[] { 0.0, 1.0 };
		containerAvaliacao.setLayout(gbl_containerAvaliacao);

		JLabel lblAvaliacao = new JLabel("Avaliação");
		lblAvaliacao.setFont(new Font("Tahoma", Font.BOLD, 50));
		GridBagConstraints gbc_lblAvaliacao = new GridBagConstraints();
		gbc_lblAvaliacao.insets = new Insets(0, 0, 0, 5);
		gbc_lblAvaliacao.anchor = GridBagConstraints.WEST;
		gbc_lblAvaliacao.gridx = 0;
		gbc_lblAvaliacao.gridy = 0;
		containerAvaliacao.add(lblAvaliacao, gbc_lblAvaliacao);

		JPanel containerOpcoesAvaliacao = new JPanel();
		GridBagConstraints gbc_containerOpcoesAvaliacao = new GridBagConstraints();
		gbc_containerOpcoesAvaliacao.anchor = GridBagConstraints.EAST;
		gbc_containerOpcoesAvaliacao.fill = GridBagConstraints.VERTICAL;
		gbc_containerOpcoesAvaliacao.gridx = 1;
		gbc_containerOpcoesAvaliacao.gridy = 0;
		containerAvaliacao.add(containerOpcoesAvaliacao, gbc_containerOpcoesAvaliacao);
		GridBagLayout gbl_containerOpcoesAvaliacao = new GridBagLayout();
		containerOpcoesAvaliacao.setLayout(gbl_containerOpcoesAvaliacao);

		JLabel lblListarAvaliacao = new JLabel("Ver Lista ->");
		lblListarAvaliacao.setCursor(Cursor.getPredefinedCursor(Cursor.HAND_CURSOR));
		lblListarAvaliacao.addMouseListener(new MouseAdapter() {
			@Override
			public void mouseClicked(MouseEvent e) {
				PainelListarAvaliacoes p = new PainelListarAvaliacoes();
				FramePatec.getFrame().setTitle("Patec - Listar Avaliações");
				FramePatec.getFrame().setContentPane(p);
				FramePatec.getFrame().revalidate();
				FramePatec.getFrame().repaint();
			}

			@Override
			public void mouseEntered(MouseEvent e) {
				Font font = lblListarAvaliacao.getFont();
				Map<TextAttribute, Integer> attributes = (Map<TextAttribute, Integer>) font.getAttributes();
				attributes.put(TextAttribute.UNDERLINE, 0);
				lblListarAvaliacao.setFont(font.deriveFont(attributes));
			}

			@Override
			public void mouseExited(MouseEvent e) {
				Font font = lblListarAvaliacao.getFont();
				Map<TextAttribute, Integer> attributes = (Map<TextAttribute, Integer>) font.getAttributes();
				attributes.put(TextAttribute.UNDERLINE, -1);
				lblListarAvaliacao.setFont(font.deriveFont(attributes));
			}
		});
		lblListarAvaliacao.setFont(new Font("Tahoma", Font.PLAIN, 20));
		GridBagConstraints gbc_lblListarAvaliacao = new GridBagConstraints();
		gbc_lblListarAvaliacao.anchor = GridBagConstraints.EAST;
		gbc_lblListarAvaliacao.insets = new Insets(0, 0, 5, 0);
		gbc_lblListarAvaliacao.gridx = 0;
		gbc_lblListarAvaliacao.gridy = 0;
		containerOpcoesAvaliacao.add(lblListarAvaliacao, gbc_lblListarAvaliacao);

		JLabel lblCadastrarAvaliacao = new JLabel("Cadastrar Avaliação ->");
		lblCadastrarAvaliacao.setCursor(Cursor.getPredefinedCursor(Cursor.HAND_CURSOR));
		lblCadastrarAvaliacao.addMouseListener(new MouseAdapter() {
			@Override
			public void mouseClicked(MouseEvent e) {
				PainelCadastroAvaliacao p = new PainelCadastroAvaliacao();
				FramePatec.getFrame().setTitle("Patec - Cadastrar Avaliação");
				FramePatec.getFrame().setContentPane(p);
				FramePatec.getFrame().revalidate();
				FramePatec.getFrame().repaint();
			}

			@Override
			public void mouseEntered(MouseEvent e) {
				Font font = lblCadastrarAvaliacao.getFont();
				Map<TextAttribute, Integer> attributes = (Map<TextAttribute, Integer>) font.getAttributes();
				attributes.put(TextAttribute.UNDERLINE, 0);
				lblCadastrarAvaliacao.setFont(font.deriveFont(attributes));
			}

			@Override
			public void mouseExited(MouseEvent e) {
				Font font = lblCadastrarAvaliacao.getFont();
				Map<TextAttribute, Integer> attributes = (Map<TextAttribute, Integer>) font.getAttributes();
				attributes.put(TextAttribute.UNDERLINE, -1);
				lblCadastrarAvaliacao.setFont(font.deriveFont(attributes));
			}
		});
		lblCadastrarAvaliacao.setFont(new Font("Tahoma", Font.PLAIN, 20));
		GridBagConstraints gbc_lblCadastrarAvaliacao = new GridBagConstraints();
		gbc_lblCadastrarAvaliacao.anchor = GridBagConstraints.EAST;
		gbc_lblCadastrarAvaliacao.gridx = 0;
		gbc_lblCadastrarAvaliacao.gridy = 1;
		containerOpcoesAvaliacao.add(lblCadastrarAvaliacao, gbc_lblCadastrarAvaliacao);

		JSeparator separator_3 = new JSeparator();
		separator_3.setForeground(new Color(128, 128, 128));
		separator_3.setBackground(new Color(128, 128, 128));
		GridBagConstraints gbc_separator_3 = new GridBagConstraints();
		gbc_separator_3.fill = GridBagConstraints.BOTH;
		gbc_separator_3.insets = new Insets(0, 0, 5, 5);
		gbc_separator_3.gridx = 1;
		gbc_separator_3.gridy = 9;
		add(separator_3, gbc_separator_3);

		JPanel containerRelatorio = new JPanel();
		GridBagConstraints gbc_containerRelatorio = new GridBagConstraints();
		gbc_containerRelatorio.fill = GridBagConstraints.BOTH;
		gbc_containerRelatorio.gridx = 1;
		gbc_containerRelatorio.gridy = 10;
		add(containerRelatorio, gbc_containerRelatorio);
		GridBagLayout gbl_containerRelatorio = new GridBagLayout();
		gbl_containerRelatorio.rowWeights = new double[] { 1.0 };
		gbl_containerRelatorio.columnWeights = new double[] { 0.0, 1.0 };
		containerRelatorio.setLayout(gbl_containerRelatorio);

		JLabel lblRelatorio = new JLabel("Relatório");
		GridBagConstraints gbc_lblRelatorio = new GridBagConstraints();
		gbc_lblRelatorio.insets = new Insets(0, 0, 0, 5);
		gbc_lblRelatorio.anchor = GridBagConstraints.WEST;
		gbc_lblRelatorio.gridx = 0;
		gbc_lblRelatorio.gridy = 0;
		containerRelatorio.add(lblRelatorio, gbc_lblRelatorio);
		lblRelatorio.setFont(new Font("Tahoma", Font.BOLD, 50));

		JPanel containerOpcaoRelatorio = new JPanel();
		GridBagConstraints gbc_containerOpcaoRelatorio = new GridBagConstraints();
		gbc_containerOpcaoRelatorio.anchor = GridBagConstraints.EAST;
		gbc_containerOpcaoRelatorio.fill = GridBagConstraints.VERTICAL;
		gbc_containerOpcaoRelatorio.gridx = 1;
		gbc_containerOpcaoRelatorio.gridy = 0;
		containerRelatorio.add(containerOpcaoRelatorio, gbc_containerOpcaoRelatorio);
		GridBagLayout gbl_containerOpcaoRelatorio = new GridBagLayout();
		containerOpcaoRelatorio.setLayout(gbl_containerOpcaoRelatorio);

		JLabel lblObterRelatorio = new JLabel("Obter Relatório ->");
		lblObterRelatorio.setCursor(Cursor.getPredefinedCursor(Cursor.HAND_CURSOR));
		lblObterRelatorio.addMouseListener(new MouseAdapter() {
			@Override
			public void mouseClicked(MouseEvent e) {
				PainelConsultaRelatorio p = new PainelConsultaRelatorio(null);
				FramePatec.getFrame().setTitle("Patec - Obter Relatório");
				FramePatec.getFrame().setContentPane(p);
				FramePatec.getFrame().revalidate();
				FramePatec.getFrame().repaint();
			}

			@Override
			public void mouseEntered(MouseEvent e) {
				Font font = lblObterRelatorio.getFont();
				Map<TextAttribute, Integer> attributes = (Map<TextAttribute, Integer>) font.getAttributes();
				attributes.put(TextAttribute.UNDERLINE, 0);
				lblObterRelatorio.setFont(font.deriveFont(attributes));
			}

			@Override
			public void mouseExited(MouseEvent e) {
				Font font = lblObterRelatorio.getFont();
				Map<TextAttribute, Integer> attributes = (Map<TextAttribute, Integer>) font.getAttributes();
				attributes.put(TextAttribute.UNDERLINE, -1);
				lblObterRelatorio.setFont(font.deriveFont(attributes));
			}
		});
		lblObterRelatorio.setFont(new Font("Tahoma", Font.PLAIN, 20));
		GridBagConstraints gbc_lblObterRelatorio = new GridBagConstraints();
		gbc_lblObterRelatorio.anchor = GridBagConstraints.EAST;
		gbc_lblObterRelatorio.insets = new Insets(0, 0, 5, 0);
		gbc_lblObterRelatorio.gridx = 0;
		gbc_lblObterRelatorio.gridy = 0;
		containerOpcaoRelatorio.add(lblObterRelatorio, gbc_lblObterRelatorio);
	}

}