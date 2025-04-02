package view;

import java.awt.*;
import java.awt.event.*;
import java.sql.*;
import java.util.*;
import java.time.*;
import java.util.List;

import javax.swing.*;

import org.apache.commons.collections4.bag.SynchronizedSortedBag;

import model.*;
import util.BD;
import view.components.BtnSair;

public class PainelMenuAluno extends JPanel {

	private static final long serialVersionUID = 1L;
	private List<String> semestres = new ArrayList<String>();
	private List<String> disciplinas = new ArrayList<String>();
	private DisciplinaDAO dDAO = new DisciplinaDAO();
	private FolhaDeRespostasDAO fDAO = new FolhaDeRespostasDAO();

	/**
	 * Create the panel.
	 */
	public PainelMenuAluno(Aluno a) {
		
		semestres = dDAO.listarSemestres(a.getRa());
		disciplinas.add("-- selecione uma disciplina --");

		GridBagLayout gridBagLayout = new GridBagLayout();
		gridBagLayout.columnWidths = new int[] { 60, 100, 150, 0 };
		gridBagLayout.rowHeights = new int[] { 30, 100, 30, 0 };
		gridBagLayout.columnWeights = new double[] { 1.0, 0.0, 1.0, 1.0 };
		gridBagLayout.rowWeights = new double[] { 0.0, 1.0, 0.0, Double.MIN_VALUE };
		setLayout(gridBagLayout);

		BtnSair btnSair = new BtnSair("Sair");
		GridBagConstraints gbc_btnSair = new GridBagConstraints();
		gbc_btnSair.ipady = 10;
		gbc_btnSair.ipadx = 10;
		gbc_btnSair.anchor = GridBagConstraints.NORTHEAST;
		gbc_btnSair.insets = new Insets(0, 0, 5, 0);
		gbc_btnSair.gridx = 3;
		gbc_btnSair.gridy = 0;
		add(btnSair, gbc_btnSair);

		JPanel panel = new JPanel();
		GridBagConstraints gbc_panel = new GridBagConstraints();
		gbc_panel.ipadx = 10;
		gbc_panel.insets = new Insets(0, 0, 5, 5);
		gbc_panel.fill = GridBagConstraints.BOTH;
		gbc_panel.gridx = 1;
		gbc_panel.gridy = 1;
		add(panel, gbc_panel);
		GridBagLayout gbl_panel = new GridBagLayout();
		panel.setLayout(gbl_panel);

		JLabel lblBemVindo = new JLabel("Bem-vindo(a)!");
		lblBemVindo.setFont(new Font("Tahoma", Font.BOLD, 40));
		GridBagConstraints gbc_lblBemVindo = new GridBagConstraints();
		gbc_lblBemVindo.anchor = GridBagConstraints.EAST;
		gbc_lblBemVindo.insets = new Insets(0, 0, 5, 5);
		gbc_lblBemVindo.gridx = 0;
		gbc_lblBemVindo.gridy = 0;
		panel.add(lblBemVindo, gbc_lblBemVindo);
		if (LocalTime.now().getHour() < 12) {
			lblBemVindo.setText("Bom Dia");
		} else if (LocalTime.now().getHour() < 18) {
			lblBemVindo.setText("Boa Tarde");
		} else {
			lblBemVindo.setText("Boa Noite");
		}
		lblBemVindo.setFont(new Font("Tahoma", Font.BOLD, 40));
		gbc_lblBemVindo.anchor = GridBagConstraints.EAST;
		gbc_lblBemVindo.insets = new Insets(0, 0, 5, 0);
		gbc_lblBemVindo.gridx = 1;
		gbc_lblBemVindo.gridy = 0;

		JLabel lblAluno = new JLabel("Aluno: " + a.getNomeAluno());
		lblAluno.setFont(new Font("Tahoma", Font.PLAIN, 16));
		GridBagConstraints gbc_lblAluno = new GridBagConstraints();
		gbc_lblAluno.anchor = GridBagConstraints.EAST;
		gbc_lblAluno.insets = new Insets(0, 0, 0, 5);
		gbc_lblAluno.gridx = 0;
		gbc_lblAluno.gridy = 1;
		panel.add(lblAluno, gbc_lblAluno);
		
		JLabel lblRa = new JLabel("RA: " + a.getRa());
		lblRa.setFont(new Font("Tahoma", Font.PLAIN, 16));
		GridBagConstraints gbc_lblRa = new GridBagConstraints();
		gbc_lblRa.anchor = GridBagConstraints.EAST;
		gbc_lblRa.insets = new Insets(0, 0, 0, 5);
		gbc_lblRa.gridx = 0;
		gbc_lblRa.gridy = 2;
		panel.add(lblRa, gbc_lblRa);

		JLabel lblCpf = new JLabel("CPF: " + a.getCpf());
		lblCpf.setFont(new Font("Tahoma", Font.PLAIN, 16));
		GridBagConstraints gbc_lblCpf = new GridBagConstraints();
		gbc_lblCpf.anchor = GridBagConstraints.EAST;
		gbc_lblCpf.insets = new Insets(0, 0, 0, 5);
		gbc_lblCpf.gridx = 0;
		gbc_lblCpf.gridy = 3;
		panel.add(lblCpf, gbc_lblCpf);
		
		JLabel lblDataNascimento = new JLabel("Data Nasc.: " + a.getDataNascimento());
		lblDataNascimento.setFont(new Font("Tahoma", Font.PLAIN, 16));
		GridBagConstraints gbc_lblDataNascimento = new GridBagConstraints();
		gbc_lblDataNascimento.anchor = GridBagConstraints.EAST;
		gbc_lblDataNascimento.insets = new Insets(0, 0, 0, 5);
		gbc_lblDataNascimento.gridx = 0;
		gbc_lblDataNascimento.gridy = 4;
		panel.add(lblDataNascimento, gbc_lblDataNascimento);

		JPanel containerSelecionarAvaliacao = new JPanel();
		containerSelecionarAvaliacao.setBackground(new Color(240, 240, 240));
		GridBagConstraints gbc_containerSelecionarAvaliacao = new GridBagConstraints();
		gbc_containerSelecionarAvaliacao.insets = new Insets(0, 0, 5, 5);
		gbc_containerSelecionarAvaliacao.fill = GridBagConstraints.BOTH;
		gbc_containerSelecionarAvaliacao.gridx = 2;
		gbc_containerSelecionarAvaliacao.gridy = 1;
		add(containerSelecionarAvaliacao, gbc_containerSelecionarAvaliacao);
		GridBagLayout gbl_containerSelecionarAvaliacao = new GridBagLayout();
		gbl_containerSelecionarAvaliacao.columnWeights = new double[] { 0.0, 1.0, 0.0, 0.0 };
		gbl_containerSelecionarAvaliacao.columnWidths = new int[] { 10, 0, 0, 0 };
		containerSelecionarAvaliacao.setLayout(gbl_containerSelecionarAvaliacao);

		JComboBox cbDisciplina = new JComboBox(disciplinas.toArray());
		cbDisciplina.setFont(new Font("Tahoma", Font.PLAIN, 18));
		cbDisciplina.addKeyListener(new KeyAdapter() {
			@Override
			public void keyPressed(KeyEvent e) {
				if (e.getKeyCode() == KeyEvent.VK_ENTER) {
					if (!cbDisciplina.getSelectedItem().toString().equals("-- selecione uma disciplina --")) {
						Map<String, Object> obj = new HashMap<>(dDAO.obterDadosParaAvaliacao(cbDisciplina.getSelectedItem().toString()));
						System.out.println(obj);
						if (fDAO.verificarStatus(obj, a)) {
							JOptionPane.showMessageDialog(null, "Você já realizou a prova desta matéria.");
						} else {
							PainelFolhaDeRespostas p = new PainelFolhaDeRespostas(a, obj);
							FramePatec.frame.setContentPane(p);
							FramePatec.frame.revalidate();
							FramePatec.frame.repaint();
						}
					} else {
						JOptionPane.showMessageDialog(null, "Por favor, selecione uma disciplina.");
					}
				}
			}
		});

		JSeparator separator = new JSeparator();
		separator.setForeground(new Color(0, 0, 0));
		separator.setBackground(new Color(0, 0, 0));
		separator.setOrientation(SwingConstants.VERTICAL);
		GridBagConstraints gbc_separator = new GridBagConstraints();
		gbc_separator.ipadx = 10;
		gbc_separator.fill = GridBagConstraints.BOTH;
		gbc_separator.gridheight = 6;
		gbc_separator.insets = new Insets(0, 0, 0, 5);
		gbc_separator.gridx = 0;
		gbc_separator.gridy = 0;
		containerSelecionarAvaliacao.add(separator, gbc_separator);

		JLabel lblSemestre = new JLabel("Semestre:");
		lblSemestre.setFont(new Font("Tahoma", Font.PLAIN, 20));
		GridBagConstraints gbc_lblSemestre = new GridBagConstraints();
		gbc_lblSemestre.gridwidth = 3;
		gbc_lblSemestre.insets = new Insets(0, 0, 5, 0);
		gbc_lblSemestre.anchor = GridBagConstraints.WEST;
		gbc_lblSemestre.gridx = 1;
		gbc_lblSemestre.gridy = 0;
		containerSelecionarAvaliacao.add(lblSemestre, gbc_lblSemestre);

		JLabel lblDisciplina = new JLabel("Disciplina:");
		lblDisciplina.setFont(new Font("Tahoma", Font.PLAIN, 20));
		GridBagConstraints gbc_lblDisciplina = new GridBagConstraints();
		gbc_lblDisciplina.gridwidth = 3;
		gbc_lblDisciplina.insets = new Insets(0, 0, 5, 0);
		gbc_lblDisciplina.anchor = GridBagConstraints.WEST;
		gbc_lblDisciplina.gridx = 1;
		gbc_lblDisciplina.gridy = 2;
		containerSelecionarAvaliacao.add(lblDisciplina, gbc_lblDisciplina);
		GridBagConstraints gbc_cbDisciplina = new GridBagConstraints();
		gbc_cbDisciplina.insets = new Insets(0, 0, 5, 0);
		gbc_cbDisciplina.gridwidth = 3;
		gbc_cbDisciplina.fill = GridBagConstraints.BOTH;
		gbc_cbDisciplina.gridx = 1;
		gbc_cbDisciplina.gridy = 3;
		containerSelecionarAvaliacao.add(cbDisciplina, gbc_cbDisciplina);

		JComboBox cbSemestre = new JComboBox(semestres.toArray());
		cbSemestre.setFont(new Font("Tahoma", Font.PLAIN, 18));
		cbSemestre.addActionListener(new ActionListener() {
			public void actionPerformed(ActionEvent e) {
				disciplinas.removeAll(disciplinas);
				disciplinas.add("-- selecione uma disciplina --");				
				if (cbSemestre.getSelectedItem().equals("1° SEM")) {
					cbDisciplina.removeAllItems();
					disciplinas = dDAO.listarDisciplinas(a.getRa(), 1);
					for (int i = 0; i < disciplinas.size(); i++) {
						cbDisciplina.addItem(disciplinas.toArray()[i]);
					}
				} else if (cbSemestre.getSelectedItem().equals("2° SEM")) {
					cbDisciplina.removeAllItems();
					disciplinas = dDAO.listarDisciplinas(a.getRa(), 2);
					for (int i = 0; i < disciplinas.size(); i++) {
						cbDisciplina.addItem(disciplinas.toArray()[i]);
					}
				} else if (cbSemestre.getSelectedItem().equals("3° SEM")) {
					cbDisciplina.removeAllItems();
					disciplinas = dDAO.listarDisciplinas(a.getRa(), 3);
					for (int i = 0; i < disciplinas.size(); i++) {
						cbDisciplina.addItem(disciplinas.toArray()[i]);
					}
				} else if (cbSemestre.getSelectedItem().equals("4° SEM")) {
					cbDisciplina.removeAllItems();
					disciplinas = dDAO.listarDisciplinas(a.getRa(), 4);
					for (int i = 0; i < disciplinas.size(); i++) {
						cbDisciplina.addItem(disciplinas.toArray()[i]);
					}
				} else if (cbSemestre.getSelectedItem().equals("5° SEM")) {
					cbDisciplina.removeAllItems();
					disciplinas = dDAO.listarDisciplinas(a.getRa(), 5);
					for (int i = 0; i < disciplinas.size(); i++) {
						cbDisciplina.addItem(disciplinas.toArray()[i]);
					}
				} else if (cbSemestre.getSelectedItem().equals("6° SEM")) {
					cbDisciplina.removeAllItems();
					disciplinas = dDAO.listarDisciplinas(a.getRa(), 6);
					for (int i = 0; i < disciplinas.size(); i++) {
						cbDisciplina.addItem(disciplinas.toArray()[i]);
					}
				} else {
					cbDisciplina.removeAllItems();
					cbDisciplina.addItem(disciplinas.toArray()[0]);
				}
			}
		});
		GridBagConstraints gbc_cbSemestre = new GridBagConstraints();
		gbc_cbSemestre.insets = new Insets(0, 0, 5, 0);
		gbc_cbSemestre.gridwidth = 3;
		gbc_cbSemestre.fill = GridBagConstraints.BOTH;
		gbc_cbSemestre.gridx = 1;
		gbc_cbSemestre.gridy = 1;
		containerSelecionarAvaliacao.add(cbSemestre, gbc_cbSemestre);

		JButton btnRealizarAvaliacao = new JButton("Realizar Avaliação");
		btnRealizarAvaliacao.addActionListener(new ActionListener() {
			public void actionPerformed(ActionEvent e) {
				try {
					if (!cbDisciplina.getSelectedItem().toString().equals("-- selecione uma disciplina --")) {
						System.out.println(cbDisciplina.getSelectedItem().toString());
						Map<String, Object> obj = dDAO.obterDadosParaAvaliacao(cbDisciplina.getSelectedItem().toString());
											
						if (fDAO.verificarStatus(obj, a)) {
							JOptionPane.showMessageDialog(null, "Você já realizou a prova desta matéria.");
						} else {
							PainelFolhaDeRespostas p = new PainelFolhaDeRespostas(a, obj);
							FramePatec.frame.setContentPane(p);
							FramePatec.frame.revalidate();
							FramePatec.frame.repaint();
						}
					} else {
						JOptionPane.showMessageDialog(null, "Por favor, selecione uma disciplina.");
					}
				} catch (Exception ex) {
					System.out.println(ex);
				}
			}
		});
		GridBagConstraints gbc_btnRealizarAvaliacao = new GridBagConstraints();
		gbc_btnRealizarAvaliacao.gridwidth = 3;
		gbc_btnRealizarAvaliacao.gridx = 1;
		gbc_btnRealizarAvaliacao.gridy = 5;
		containerSelecionarAvaliacao.add(btnRealizarAvaliacao, gbc_btnRealizarAvaliacao);
	}

}