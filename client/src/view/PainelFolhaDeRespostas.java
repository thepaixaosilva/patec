package view;

import javax.swing.*;

import model.*;
import view.components.BaseFolhaDeRespostas;

import java.awt.*;
import java.awt.event.*;
import java.util.Map;

public class PainelFolhaDeRespostas extends JPanel {

	private static final long serialVersionUID = 1L;

	private FolhaDeRespostas fdr = new FolhaDeRespostas();

	/**
	 * Create the panel.
	 */
	public PainelFolhaDeRespostas(Aluno a, Map<String, Object> obj) {
		GridBagLayout gridBagLayout = new GridBagLayout();
		gridBagLayout.rowHeights = new int[] { 0, 265, 0 };
		gridBagLayout.rowWeights = new double[] { 1.0, 1.0, 1.0 };
		gridBagLayout.columnWeights = new double[] { 1.0, 0.0, 1.0, 1.0 };
		gridBagLayout.columnWidths = new int[] { 0, 0, 160, 0 };
		setLayout(gridBagLayout);

		JPanel containerLabel = new JPanel();
		GridBagConstraints gbc_containerLabel = new GridBagConstraints();
		gbc_containerLabel.ipadx = 5;
		gbc_containerLabel.insets = new Insets(0, 0, 5, 5);
		gbc_containerLabel.fill = GridBagConstraints.BOTH;
		gbc_containerLabel.gridx = 1;
		gbc_containerLabel.gridy = 1;
		add(containerLabel, gbc_containerLabel);
		GridBagLayout gbl_containerLabel = new GridBagLayout();
		containerLabel.setLayout(gbl_containerLabel);

		JLabel lblFolhaDe = new JLabel("Folha de");
		lblFolhaDe.setFont(new Font("Tahoma", Font.BOLD, 40));
		GridBagConstraints gbc_lblNewLabel = new GridBagConstraints();
		gbc_lblNewLabel.anchor = GridBagConstraints.EAST;
		gbc_lblNewLabel.insets = new Insets(0, 0, 5, 0);
		gbc_lblNewLabel.gridx = 0;
		gbc_lblNewLabel.gridy = 0;
		containerLabel.add(lblFolhaDe, gbc_lblNewLabel);

		JLabel lblRespostas = new JLabel("Respostas");
		lblRespostas.setFont(new Font("Tahoma", Font.BOLD, 40));
		GridBagConstraints gbc_lblNewLabel_1 = new GridBagConstraints();
		gbc_lblNewLabel_1.insets = new Insets(0, 0, 5, 0);
		gbc_lblNewLabel_1.anchor = GridBagConstraints.EAST;
		gbc_lblNewLabel_1.gridx = 0;
		gbc_lblNewLabel_1.gridy = 1;
		containerLabel.add(lblRespostas, gbc_lblNewLabel_1);
		
		JLabel lblNewLabel = new JLabel("New label");
		lblNewLabel.setFont(new Font("Tahoma", Font.PLAIN, 20));
		lblNewLabel.setText((String)obj.get("nomeDisciplina"));
		GridBagConstraints gbc_lblNewLabel_2 = new GridBagConstraints();
		gbc_lblNewLabel_2.anchor = GridBagConstraints.EAST;
		gbc_lblNewLabel_2.gridx = 0;
		gbc_lblNewLabel_2.gridy = 4;
		containerLabel.add(lblNewLabel, gbc_lblNewLabel_2);

		// Configurações da folha de respostas:
		JPanel containerFolhaRespostas = new JPanel();
		containerFolhaRespostas.setBackground(new Color(240, 240, 240));
		GridBagConstraints gbc_containerFolhaRespostas = new GridBagConstraints();
		gbc_containerFolhaRespostas.insets = new Insets(0, 0, 5, 5);
		gbc_containerFolhaRespostas.fill = GridBagConstraints.BOTH;
		gbc_containerFolhaRespostas.gridx = 2;
		gbc_containerFolhaRespostas.gridy = 1;
		add(containerFolhaRespostas, gbc_containerFolhaRespostas);

		GridBagLayout gbl_containerFolhaRespostas = new GridBagLayout();
		gbl_containerFolhaRespostas.columnWidths = new int[] { 10, 30 };
		gbl_containerFolhaRespostas.rowHeights = new int[] { 30, 30, 30 };
		gbl_containerFolhaRespostas.columnWeights = new double[] { 0.0, 1.0 };
		gbl_containerFolhaRespostas.rowWeights = new double[] { 1.0, 0.0, Double.MIN_VALUE };
		containerFolhaRespostas.setLayout(gbl_containerFolhaRespostas);

		JSeparator separator = new JSeparator();
		separator.setForeground(new Color(0, 0, 0));
		separator.setBackground(new Color(0, 0, 0));
		separator.setOrientation(SwingConstants.VERTICAL);
		GridBagConstraints gbc_separator = new GridBagConstraints();
		gbc_separator.ipadx = 10;
		gbc_separator.fill = GridBagConstraints.BOTH;
		gbc_separator.gridheight = 2;
		gbc_separator.insets = new Insets(0, 0, 0, 5);
		gbc_separator.gridx = 0;
		gbc_separator.gridy = 0;
		containerFolhaRespostas.add(separator, gbc_separator);

		BaseFolhaDeRespostas bfdr = new BaseFolhaDeRespostas();
		GridBagConstraints gbc_bfdr = new GridBagConstraints();
		gbc_bfdr.fill = GridBagConstraints.BOTH;
		gbc_bfdr.insets = new Insets(0, 0, 5, 0);
		gbc_bfdr.gridx = 1;
		gbc_bfdr.gridy = 0;
		containerFolhaRespostas.add(bfdr, gbc_bfdr);

		bfdr.rdbtnQuestaoUmA.addActionListener(new ActionListener() {
			public void actionPerformed(ActionEvent e) {
				fdr.setResposta1('A');
			}
		});

		bfdr.rdbtnQuestaoUmB.addActionListener(new ActionListener() {
			public void actionPerformed(ActionEvent e) {
				fdr.setResposta1('B');
			}
		});

		bfdr.rdbtnQuestaoUmC.addActionListener(new ActionListener() {
			public void actionPerformed(ActionEvent e) {
				fdr.setResposta1('C');
			}
		});

		bfdr.rdbtnQuestaoUmD.addActionListener(new ActionListener() {
			public void actionPerformed(ActionEvent e) {
				fdr.setResposta1('D');
			}
		});

		bfdr.rdbtnQuestaoUmE.addActionListener(new ActionListener() {
			public void actionPerformed(ActionEvent e) {
				fdr.setResposta1('E');
			}
		});

		bfdr.rdbtnQuestaoDoisA.addActionListener(new ActionListener() {
			public void actionPerformed(ActionEvent e) {
				fdr.setResposta2('A');
			}
		});

		bfdr.rdbtnQuestaoDoisB.addActionListener(new ActionListener() {
			public void actionPerformed(ActionEvent e) {
				fdr.setResposta2('B');
			}
		});
		
		bfdr.rdbtnQuestaoDoisC.addActionListener(new ActionListener() {
			public void actionPerformed(ActionEvent e) {
				fdr.setResposta2('C');
			}
		});
		
		bfdr.rdbtnQuestaoDoisD.addActionListener(new ActionListener() {
			public void actionPerformed(ActionEvent e) {
				fdr.setResposta2('D');
			}
		});
		
		bfdr.rdbtnQuestaoDoisE.addActionListener(new ActionListener() {
			public void actionPerformed(ActionEvent e) {
				fdr.setResposta2('E');
			}
		});
		
		bfdr.rdbtnQuestaoTresA.addActionListener(new ActionListener() {
			public void actionPerformed(ActionEvent e) {
				fdr.setResposta3('A');
			}
		});

		bfdr.rdbtnQuestaoTresB.addActionListener(new ActionListener() {
			public void actionPerformed(ActionEvent e) {
				fdr.setResposta3('B');
			}
		});
		
		bfdr.rdbtnQuestaoTresC.addActionListener(new ActionListener() {
			public void actionPerformed(ActionEvent e) {
				fdr.setResposta3('C');
			}
		});
		
		bfdr.rdbtnQuestaoTresD.addActionListener(new ActionListener() {
			public void actionPerformed(ActionEvent e) {
				fdr.setResposta3('D');
			}
		});
		
		bfdr.rdbtnQuestaoTresE.addActionListener(new ActionListener() {
			public void actionPerformed(ActionEvent e) {
				fdr.setResposta3('E');
			}
		});
		
		bfdr.rdbtnQuestaoQuatroA.addActionListener(new ActionListener() {
			public void actionPerformed(ActionEvent e) {
				fdr.setResposta4('A');
			}
		});

		bfdr.rdbtnQuestaoQuatroB.addActionListener(new ActionListener() {
			public void actionPerformed(ActionEvent e) {
				fdr.setResposta4('B');
			}
		});
		
		bfdr.rdbtnQuestaoQuatroC.addActionListener(new ActionListener() {
			public void actionPerformed(ActionEvent e) {
				fdr.setResposta4('C');
			}
		});
		
		bfdr.rdbtnQuestaoQuatroD.addActionListener(new ActionListener() {
			public void actionPerformed(ActionEvent e) {
				fdr.setResposta4('D');
			}
		});

		bfdr.rdbtnQuestaoQuatroE.addActionListener(new ActionListener() {
			public void actionPerformed(ActionEvent e) {
				fdr.setResposta4('E');
			}
		});
		
		bfdr.rdbtnQuestaoCincoA.addActionListener(new ActionListener() {
			public void actionPerformed(ActionEvent e) {
				fdr.setResposta5('A');
			}
		});
		
		bfdr.rdbtnQuestaoCincoA.addActionListener(new ActionListener() {
			public void actionPerformed(ActionEvent e) {
				fdr.setResposta5('A');
			}
		});
		
		bfdr.rdbtnQuestaoCincoB.addActionListener(new ActionListener() {
			public void actionPerformed(ActionEvent e) {
				fdr.setResposta5('B');
			}
		});
		
		bfdr.rdbtnQuestaoCincoC.addActionListener(new ActionListener() {
			public void actionPerformed(ActionEvent e) {
				fdr.setResposta5('C');
			}
		});
		
		bfdr.rdbtnQuestaoCincoD.addActionListener(new ActionListener() {
			public void actionPerformed(ActionEvent e) {
				fdr.setResposta5('D');
			}
		});
		
		bfdr.rdbtnQuestaoCincoE.addActionListener(new ActionListener() {
			public void actionPerformed(ActionEvent e) {
				fdr.setResposta5('E');
			}
		});
		
		// Configuração do botão entregar:
		JButton btnEntregar = new JButton("Entregar");
		btnEntregar.addActionListener(new ActionListener() {
			public void actionPerformed(ActionEvent e) {
				if (!Character.isAlphabetic(fdr.getResposta1()) || !Character.isAlphabetic(fdr.getResposta2())
						|| !Character.isAlphabetic(fdr.getResposta3()) || !Character.isAlphabetic(fdr.getResposta4())
						|| !Character.isAlphabetic(fdr.getResposta5())) {
					JOptionPane.showMessageDialog(null, "Há questões não respondidas.", "Aviso",
							JOptionPane.WARNING_MESSAGE);
				} else {
					fdr.setRa(a.getRa());
					fdr.setCodigoGabarito((int) obj.get("codigoGabarito"));
					
					GabaritoOficialDAO goDAO = new GabaritoOficialDAO();
					GabaritoOficial go = new GabaritoOficial();
					
					go = goDAO.obterGabaritoParaCorrecao(fdr.getCodigoGabarito());
					
					int nota = 0;
					if (go.getQuestao1() == fdr.getResposta1()) {
						nota = nota + 2;
					}
					if (go.getQuestao2() == fdr.getResposta2()) {
						nota = nota + 2;
					}
					if (go.getQuestao3() == fdr.getResposta3()) {
						nota = nota + 2;
					}
					if (go.getQuestao4() == fdr.getResposta4()) {
						nota = nota + 2;
					}
					if (go.getQuestao5() == fdr.getResposta5()) {
						nota = nota + 2;
					}
					fdr.setNota(nota);
					
					FolhaDeRespostasDAO fdrDAO = new FolhaDeRespostasDAO();
					
					fdrDAO.gravar(fdr);
					
					JOptionPane.showMessageDialog(null, "Folha de Resposta enviada com sucesso!", "Folha de Resposta Concluída", JOptionPane.INFORMATION_MESSAGE);

					PainelMenuAluno p = new PainelMenuAluno(a);
					FramePatec.frame.setContentPane(p);
					FramePatec.frame.revalidate();
					FramePatec.frame.repaint();
				}
			}
		});
		GridBagConstraints gbc_btnEntregar = new GridBagConstraints();
		gbc_btnEntregar.gridx = 1;
		gbc_btnEntregar.gridy = 1;
		containerFolhaRespostas.add(btnEntregar, gbc_btnEntregar);

	}

}