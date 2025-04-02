package view.components;

import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;

import model.GabaritoOficial;

@SuppressWarnings("serial")
public class BaseGabaritoOficial extends BaseFolhaDeRespostas {

	public GabaritoOficial go = new GabaritoOficial();

	public BaseGabaritoOficial() {
		super();
		rdbtnQuestaoUmA.addActionListener(new ActionListener() {
			public void actionPerformed(ActionEvent e) {
				go.setQuestao1('A');
			}
		});

		rdbtnQuestaoUmB.addActionListener(new ActionListener() {
			public void actionPerformed(ActionEvent e) {
				go.setQuestao1('B');
			}
		});

		rdbtnQuestaoUmC.addActionListener(new ActionListener() {
			public void actionPerformed(ActionEvent e) {
				go.setQuestao1('C');
			}
		});

		rdbtnQuestaoUmD.addActionListener(new ActionListener() {
			public void actionPerformed(ActionEvent e) {
				go.setQuestao1('D');
			}
		});

		rdbtnQuestaoUmE.addActionListener(new ActionListener() {
			public void actionPerformed(ActionEvent e) {
				go.setQuestao1('E');
			}
		});

		rdbtnQuestaoDoisA.addActionListener(new ActionListener() {
			public void actionPerformed(ActionEvent e) {
				go.setQuestao2('A');
			}
		});

		rdbtnQuestaoDoisB.addActionListener(new ActionListener() {
			public void actionPerformed(ActionEvent e) {
				go.setQuestao2('B');
			}
		});

		rdbtnQuestaoDoisC.addActionListener(new ActionListener() {
			public void actionPerformed(ActionEvent e) {
				go.setQuestao2('C');
			}
		});

		rdbtnQuestaoDoisD.addActionListener(new ActionListener() {
			public void actionPerformed(ActionEvent e) {
				go.setQuestao2('D');
			}
		});

		rdbtnQuestaoDoisE.addActionListener(new ActionListener() {
			public void actionPerformed(ActionEvent e) {
				go.setQuestao2('E');
			}
		});

		rdbtnQuestaoTresA.addActionListener(new ActionListener() {
			public void actionPerformed(ActionEvent e) {
				go.setQuestao3('A');
			}
		});

		rdbtnQuestaoTresB.addActionListener(new ActionListener() {
			public void actionPerformed(ActionEvent e) {
				go.setQuestao3('B');
			}
		});

		rdbtnQuestaoTresC.addActionListener(new ActionListener() {
			public void actionPerformed(ActionEvent e) {
				go.setQuestao3('C');
			}
		});

		rdbtnQuestaoTresD.addActionListener(new ActionListener() {
			public void actionPerformed(ActionEvent e) {
				go.setQuestao3('D');
			}
		});

		rdbtnQuestaoTresE.addActionListener(new ActionListener() {
			public void actionPerformed(ActionEvent e) {
				go.setQuestao3('E');
			}
		});

		rdbtnQuestaoQuatroA.addActionListener(new ActionListener() {
			public void actionPerformed(ActionEvent e) {
				go.setQuestao4('A');
			}
		});

		rdbtnQuestaoQuatroB.addActionListener(new ActionListener() {
			public void actionPerformed(ActionEvent e) {
				go.setQuestao4('B');
			}
		});

		rdbtnQuestaoQuatroC.addActionListener(new ActionListener() {
			public void actionPerformed(ActionEvent e) {
				go.setQuestao4('C');
			}
		});

		rdbtnQuestaoQuatroD.addActionListener(new ActionListener() {
			public void actionPerformed(ActionEvent e) {
				go.setQuestao4('D');
			}
		});

		rdbtnQuestaoQuatroE.addActionListener(new ActionListener() {
			public void actionPerformed(ActionEvent e) {
				go.setQuestao4('E');
			}
		});

		rdbtnQuestaoCincoA.addActionListener(new ActionListener() {
			public void actionPerformed(ActionEvent e) {
				go.setQuestao5('A');
			}
		});

		rdbtnQuestaoCincoA.addActionListener(new ActionListener() {
			public void actionPerformed(ActionEvent e) {
				go.setQuestao5('A');
			}
		});

		rdbtnQuestaoCincoB.addActionListener(new ActionListener() {
			public void actionPerformed(ActionEvent e) {
				go.setQuestao5('B');
			}
		});

		rdbtnQuestaoCincoC.addActionListener(new ActionListener() {
			public void actionPerformed(ActionEvent e) {
				go.setQuestao5('C');
			}
		});

		rdbtnQuestaoCincoD.addActionListener(new ActionListener() {
			public void actionPerformed(ActionEvent e) {
				go.setQuestao5('D');
			}
		});

		rdbtnQuestaoCincoE.addActionListener(new ActionListener() {
			public void actionPerformed(ActionEvent e) {
				go.setQuestao5('E');
			}
		});

	}

}
