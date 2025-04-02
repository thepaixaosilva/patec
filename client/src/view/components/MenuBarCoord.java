package view.components;

import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.awt.event.MouseAdapter;
import java.awt.event.MouseEvent;

import javax.swing.JMenu;
import javax.swing.JMenuBar;
import javax.swing.JMenuItem;

import model.GabaritoOficial;
import view.FramePatec;
import view.PainelCadastroAluno;
import view.PainelCadastroAvaliacao;
import view.PainelCadastroDisciplina;
import view.PainelCadastroGabarito;
import view.PainelConsultaRelatorio;
import view.PainelListarAlunos;
import view.PainelListarAvaliacoes;
import view.PainelListarDisciplinas;
import view.PainelListarGabaritos;

@SuppressWarnings("serial")
public class MenuBarCoord extends JMenuBar {

	public MenuBarCoord() {
		JMenuBar menuBar = new JMenuBar();
		add(menuBar);

		JMenu mnGabarito = new JMenu("Gabarito");
		menuBar.add(mnGabarito);

		JMenuItem miListarGabaritos = new JMenuItem("Listar");
		miListarGabaritos.addActionListener(new ActionListener() {
			public void actionPerformed(ActionEvent e) {
				PainelListarGabaritos p = new PainelListarGabaritos();
				FramePatec.getFrame().setTitle("Patec - Listar Gabaritos");
				FramePatec.getFrame().setContentPane(p);
				FramePatec.getFrame().revalidate();
				FramePatec.getFrame().repaint();
			}
		});
		mnGabarito.add(miListarGabaritos);

		JMenuItem miCadastrarGabarito = new JMenuItem("Cadastrar");
		miCadastrarGabarito.addActionListener(new ActionListener() {
			public void actionPerformed(ActionEvent e) {
				PainelCadastroGabarito p = new PainelCadastroGabarito(-1);
				FramePatec.getFrame().setTitle("Patec - Cadastrar Gabarito");
				FramePatec.getFrame().setContentPane(p);
				FramePatec.getFrame().revalidate();
				FramePatec.getFrame().repaint();
			}
		});
		mnGabarito.add(miCadastrarGabarito);

		JMenu mnAluno = new JMenu("Aluno");
		menuBar.add(mnAluno);

		JMenuItem miListarAlunos = new JMenuItem("Listar");
		miListarAlunos.addActionListener(new ActionListener() {
			public void actionPerformed(ActionEvent e) {
				PainelListarAlunos p = new PainelListarAlunos();
				FramePatec.getFrame().setTitle("Patec - Listar Alunos");
				FramePatec.getFrame().setContentPane(p);
				FramePatec.getFrame().revalidate();
				FramePatec.getFrame().repaint();
			}
		});
		mnAluno.add(miListarAlunos);

		JMenuItem miCadastrarAluno = new JMenuItem("Cadastrar");
		miCadastrarAluno.addActionListener(new ActionListener() {
			public void actionPerformed(ActionEvent e) {
				PainelCadastroAluno p = new PainelCadastroAluno();
				FramePatec.getFrame().setTitle("Patec - Cadastrar Aluno");
				FramePatec.getFrame().setContentPane(p);
				FramePatec.getFrame().revalidate();
				FramePatec.getFrame().repaint();
			}
		});
		mnAluno.add(miCadastrarAluno);

		JMenu mnDisciplina = new JMenu("Disciplina");
		menuBar.add(mnDisciplina);

		JMenuItem miListarDisciplinas = new JMenuItem("Listar");
		miListarDisciplinas.addActionListener(new ActionListener() {
			public void actionPerformed(ActionEvent e) {
				PainelListarDisciplinas p = new PainelListarDisciplinas();
				FramePatec.getFrame().setTitle("Patec - Listar Disciplinas");
				FramePatec.getFrame().setContentPane(p);
				FramePatec.getFrame().revalidate();
				FramePatec.getFrame().repaint();
			}
		});
		mnDisciplina.add(miListarDisciplinas);

		JMenuItem miCadastrarDisciplina = new JMenuItem("Cadastrar");
		miCadastrarDisciplina.addActionListener(new ActionListener() {
			public void actionPerformed(ActionEvent e) {
				PainelCadastroDisciplina p = new PainelCadastroDisciplina();
				FramePatec.getFrame().setTitle("Patec - Cadastrar Disciplina");
				FramePatec.getFrame().setContentPane(p);
				FramePatec.getFrame().revalidate();
				FramePatec.getFrame().repaint();
			}
		});
		mnDisciplina.add(miCadastrarDisciplina);

		JMenu mnNewMenu_3 = new JMenu("Avaliação");
		menuBar.add(mnNewMenu_3);
		
		JMenuItem mntmNewMenuItem_8 = new JMenuItem("Listar");
		mntmNewMenuItem_8.addActionListener(new ActionListener() { 
			public void actionPerformed(ActionEvent e) { 
				PainelListarAvaliacoes p = new PainelListarAvaliacoes();
				FramePatec.getFrame().setTitle("Patec - Listar Avaliações");
				FramePatec.getFrame().setContentPane(p);
				FramePatec.getFrame().revalidate();
				FramePatec.getFrame().repaint();
				}
			});
		  mnNewMenu_3.add(mntmNewMenuItem_8);
		 
		  JMenuItem mntmNewMenuItem_9 = new JMenuItem("Cadastrar");
		  mntmNewMenuItem_9.addActionListener(new ActionListener() {
			  public void actionPerformed(ActionEvent e) {
				 PainelCadastroAvaliacao p = new PainelCadastroAvaliacao(); 
				 FramePatec.getFrame().setTitle("Patec - Cadastrar Avaliação");
				 FramePatec.getFrame().setContentPane(p);
				 FramePatec.getFrame().revalidate();
				 FramePatec.getFrame().repaint();
			  	 } 
			  });
		  mnNewMenu_3.add(mntmNewMenuItem_9);

		JMenu mnMenuRelatorio = new JMenu("Relatório");
		mnMenuRelatorio.addMouseListener(new MouseAdapter() {
			@Override
			public void mouseClicked(MouseEvent e) {
				PainelConsultaRelatorio p = new PainelConsultaRelatorio(null);
				FramePatec.getFrame().setTitle("Patec - Obter Relatório");
				FramePatec.getFrame().setContentPane(p);
				FramePatec.getFrame().revalidate();
				FramePatec.getFrame().repaint();
			}
		});
		menuBar.add(mnMenuRelatorio);

	}

}
