package view;

import java.awt.Font;
import java.awt.GridBagConstraints;
import java.awt.GridBagLayout;
import java.awt.Insets;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.util.ArrayList;
import java.util.List;

import javax.swing.JButton;
import javax.swing.JLabel;
import javax.swing.JList;
import javax.swing.JOptionPane;
import javax.swing.JPanel;
import javax.swing.ListModel;

import model.Aluno;
import model.AlunoDisciplina;
import model.AlunoDisciplinaDAO;
import model.DisciplinaDAO;
import view.components.BtnSair;
import view.components.BtnVoltar;
import view.components.MenuBarCoord;

public class PainelCadastroAlunoDisciplina extends JPanel {
	
	private static final long serialVersionUID = 1L;
	private AlunoDisciplina ad = new AlunoDisciplina();
    private AlunoDisciplinaDAO adDAO = new AlunoDisciplinaDAO();
    private DisciplinaDAO dDAO = new DisciplinaDAO();
    private List<String> disciplinasNaoMatriculadas = new ArrayList<String>();
    private List<String> disciplinasMatriculadas = new ArrayList<String>();
    private JList<String> lstDisciplinasNaoMatriculadas;
    private JList<String> lstDisciplinasMatriculadas;

    public PainelCadastroAlunoDisciplina(Aluno a) {
    	
    	disciplinasNaoMatriculadas = adDAO.listarDisciplinasNaoMatriculadas(a.getRa());
    	disciplinasMatriculadas = adDAO.listarDisciplinasMatriculadas(a.getRa());
        
    	GridBagLayout gridBagLayout = new GridBagLayout();
	    gridBagLayout.columnWidths = new int[] { 66, 262, 100, 225, 66, 0};
	    gridBagLayout.rowHeights = new int[] { 28, 0, 100, 50, 0, 272, 0, 0 };
	    gridBagLayout.columnWeights = new double[] { 0.0, 1.0, 0.0, 1.0, 0.0, Double.MIN_VALUE };
	    gridBagLayout.rowWeights = new double[] { 0.0, 0.0, 0.0, 0.0, 1.0, 1.0, 1.0 };
	    setLayout(gridBagLayout);

	    MenuBarCoord mbc = new MenuBarCoord();
	    GridBagConstraints gbc_mbc = new GridBagConstraints();
	    gbc_mbc.gridwidth = 5;
	    gbc_mbc.anchor = GridBagConstraints.NORTH;
	    gbc_mbc.fill = GridBagConstraints.HORIZONTAL;
	    gbc_mbc.insets = new Insets(0, 0, 5, 0);
	    gbc_mbc.gridx = 0;
	    gbc_mbc.gridy = 0;
	    add(mbc, gbc_mbc);

	    BtnVoltar btnVoltar = new BtnVoltar("Voltar");
	    GridBagConstraints gbc_btnVoltar = new GridBagConstraints();
	    gbc_btnVoltar.anchor = GridBagConstraints.NORTHWEST;
	    gbc_btnVoltar.insets = new Insets(0, 0, 5, 5);
	    gbc_btnVoltar.gridx = 0;
	    gbc_btnVoltar.gridy = 1;
	    add(btnVoltar, gbc_btnVoltar);
	    
	    BtnSair btnSair = new BtnSair("Sair");
	    GridBagConstraints gbc_btnSair = new GridBagConstraints();
	    gbc_btnSair.insets = new Insets(0, 0, 5, 0);
	    gbc_btnSair.gridx = 4;
	    gbc_btnSair.gridy = 1;
	    add(btnSair, gbc_btnSair);
	    
	    JLabel lblTitulo = new JLabel("Matrícula em Disciplinas");
	    GridBagConstraints gbc_lblTitulo = new GridBagConstraints();
	    gbc_lblTitulo.anchor = GridBagConstraints.WEST;
	    gbc_lblTitulo.gridwidth = 3;
	    gbc_lblTitulo.insets = new Insets(0, 0, 5, 5);
	    gbc_lblTitulo.gridx = 1;
	    gbc_lblTitulo.gridy = 2;
	    add(lblTitulo, gbc_lblTitulo);
	    lblTitulo.setFont(new Font("Tahoma", Font.BOLD, 40));
	    
	    JPanel containerAluno = new JPanel();
	    GridBagConstraints gbc_containerAluno = new GridBagConstraints();
	    gbc_containerAluno.anchor = GridBagConstraints.SOUTH;
	    gbc_containerAluno.fill = GridBagConstraints.HORIZONTAL;
	    gbc_containerAluno.gridwidth = 3;
	    gbc_containerAluno.insets = new Insets(0, 0, 5, 5);
	    gbc_containerAluno.gridx = 1;
	    gbc_containerAluno.gridy = 3;
	    add(containerAluno, gbc_containerAluno);
	    GridBagLayout gbl_containerAluno = new GridBagLayout();
	    gbl_containerAluno.columnWidths = new int[]{0, 0};
	    gbl_containerAluno.rowHeights = new int[]{0, 0, 0};
	    gbl_containerAluno.columnWeights = new double[]{0.0, Double.MIN_VALUE};
	    gbl_containerAluno.rowWeights = new double[]{0.0, 0.0, Double.MIN_VALUE};
	    containerAluno.setLayout(gbl_containerAluno);
	    
	    JLabel lblAluno = new JLabel("Aluno: " + a.getNomeAluno());
	    lblAluno.setFont(new Font("Tahoma", Font.PLAIN, 14));
	    GridBagConstraints gbc_lblAluno = new GridBagConstraints();
	    gbc_lblAluno.insets = new Insets(0, 0, 5, 0);
	    gbc_lblAluno.anchor = GridBagConstraints.WEST;
	    gbc_lblAluno.gridx = 0;
	    gbc_lblAluno.gridy = 0;
	    containerAluno.add(lblAluno, gbc_lblAluno);
	    
	    JLabel lblRa = new JLabel("RA: " + a.getRa());
	    lblRa.setFont(new Font("Tahoma", Font.PLAIN, 14));
	    GridBagConstraints gbc_lblRa = new GridBagConstraints();
	    gbc_lblRa.anchor = GridBagConstraints.WEST;
	    gbc_lblRa.gridx = 0;
	    gbc_lblRa.gridy = 1;
	    containerAluno.add(lblRa, gbc_lblRa);
	    
	    JLabel lblTituloLista1 = new JLabel("Todas as Disciplinas");
	    lblTituloLista1.setFont(new Font("Tahoma", Font.BOLD, 14));
	    GridBagConstraints gbc_lblTituloLista1 = new GridBagConstraints();
	    gbc_lblTituloLista1.anchor = GridBagConstraints.SOUTH;
	    gbc_lblTituloLista1.insets = new Insets(0, 0, 5, 5);
	    gbc_lblTituloLista1.gridx = 1;
	    gbc_lblTituloLista1.gridy = 4;
	    add(lblTituloLista1, gbc_lblTituloLista1);
	    
	    JPanel panel = new JPanel();
	    GridBagConstraints gbc_panel = new GridBagConstraints();
	    gbc_panel.insets = new Insets(0, 0, 5, 5);
	    gbc_panel.fill = GridBagConstraints.VERTICAL;
	    gbc_panel.gridx = 3;
	    gbc_panel.gridy = 4;
	    add(panel, gbc_panel);
	    GridBagLayout gbl_panel = new GridBagLayout();
	    gbl_panel.columnWidths = new int[]{0, 0};
	    gbl_panel.rowHeights = new int[]{0, 0};
	    gbl_panel.columnWeights = new double[]{1.0, Double.MIN_VALUE};
	    gbl_panel.rowWeights = new double[]{1.0, Double.MIN_VALUE};
	    panel.setLayout(gbl_panel);
	    
	    JLabel lblTituloLista2 = new JLabel("<html>Disciplinas matriculadas para a<br>realização da próxima avaliação</html>");
	    GridBagConstraints gbc_lblTituloLista2 = new GridBagConstraints();
	    gbc_lblTituloLista2.anchor = GridBagConstraints.SOUTH;
	    gbc_lblTituloLista2.fill = GridBagConstraints.HORIZONTAL;
	    gbc_lblTituloLista2.gridx = 0;
	    gbc_lblTituloLista2.gridy = 0;
	    panel.add(lblTituloLista2, gbc_lblTituloLista2);
	    lblTituloLista2.setFont(new Font("Tahoma", Font.BOLD, 14));
	    
	    // JList das Disciplinas Matriculadas
	    lstDisciplinasNaoMatriculadas = new JList<>(disciplinasNaoMatriculadas.toArray(new String[0]));
	    GridBagConstraints gbc_lstDisciplinasNaoMatriculadas = new GridBagConstraints();
	    gbc_lstDisciplinasNaoMatriculadas.insets = new Insets(0, 0, 5, 5);
	    gbc_lstDisciplinasNaoMatriculadas.fill = GridBagConstraints.BOTH;
	    gbc_lstDisciplinasNaoMatriculadas.gridx = 1;
	    gbc_lstDisciplinasNaoMatriculadas.gridy = 5;
	    add(lstDisciplinasNaoMatriculadas, gbc_lstDisciplinasNaoMatriculadas);
	    
	    JPanel containerButtons = new JPanel();
	    GridBagConstraints gbc_containerButtons = new GridBagConstraints();
	    gbc_containerButtons.insets = new Insets(0, 0, 5, 5);
	    gbc_containerButtons.fill = GridBagConstraints.VERTICAL;
	    gbc_containerButtons.gridx = 2;
	    gbc_containerButtons.gridy = 5;
	    add(containerButtons, gbc_containerButtons);
	    GridBagLayout gbl_containerButtons = new GridBagLayout();
	    gbl_containerButtons.rowWeights = new double[] { 0.0, 0.0, 1.0, 1.0, 0.0, 0.0, 1.0};
	    gbl_containerButtons.columnWeights = new double[] { 0.0};
	    containerButtons.setLayout(gbl_containerButtons);
	    
	    JButton btnRemoverTudo = new JButton("<< Remover Tudo");
	    btnRemoverTudo.addActionListener(new ActionListener() {
	    	public void actionPerformed(ActionEvent e) {
			    List<String> todasDisciplinas = new ArrayList<>();
		        ListModel<String> model = lstDisciplinasNaoMatriculadas.getModel();
		        for (int i = 0; i < model.getSize(); i++) {
		            todasDisciplinas.add(model.getElementAt(i));
		        }
		
		        List<String> disciplinasMatriculadas = new ArrayList<>();
		        model = lstDisciplinasMatriculadas.getModel();
		        for (int i = 0; i < model.getSize(); i++) {
		            disciplinasMatriculadas.add(model.getElementAt(i));
		        }
		
		        todasDisciplinas.addAll(disciplinasMatriculadas);
		        disciplinasMatriculadas.clear();
		        bubbleSort(todasDisciplinas);
		        bubbleSort(disciplinasMatriculadas);
		        lstDisciplinasNaoMatriculadas.setListData(todasDisciplinas.toArray(new String[0]));
		        lstDisciplinasMatriculadas.setListData(disciplinasMatriculadas.toArray(new String[0]));
	    	}
	    });
	    
	    JButton btnRemover = new JButton("< Remover");
	    btnRemover.addActionListener(new ActionListener() {
	    	public void actionPerformed(ActionEvent e) {
			    List<String> todasDisciplinas = new ArrayList<>();
		        ListModel<String> model = lstDisciplinasNaoMatriculadas.getModel();
		        for (int i = 0; i < model.getSize(); i++) {
		            todasDisciplinas.add(model.getElementAt(i));
		        }
		
		        List<String> disciplinasMatriculadas = new ArrayList<>();
		        model = lstDisciplinasMatriculadas.getModel();
		        for (int i = 0; i < model.getSize(); i++) {
		            disciplinasMatriculadas.add(model.getElementAt(i));
		        }
		
		        List<String> selectedValues = lstDisciplinasMatriculadas.getSelectedValuesList();
		        for (String disciplina : selectedValues) {
		        	disciplinasMatriculadas.remove(disciplina);
		            todasDisciplinas.add(disciplina);
		        }
		        bubbleSort(todasDisciplinas);
		        bubbleSort(disciplinasMatriculadas);
		        lstDisciplinasNaoMatriculadas.setListData(todasDisciplinas.toArray(new String[0]));
		        lstDisciplinasMatriculadas.setListData(disciplinasMatriculadas.toArray(new String[0]));
	    	}
	    });
	    
	    JButton btnAdicionar = new JButton("Adicionar >");
	    btnAdicionar.addActionListener(new ActionListener() {
	    	public void actionPerformed(ActionEvent e) {
			    List<String> todasDisciplinas = new ArrayList<>();
		        ListModel<String> model = lstDisciplinasNaoMatriculadas.getModel();
		        for (int i = 0; i < model.getSize(); i++) {
		            todasDisciplinas.add(model.getElementAt(i));
		        }
		
		        List<String> disciplinasMatriculadas = new ArrayList<>();
		        model = lstDisciplinasMatriculadas.getModel();
		        for (int i = 0; i < model.getSize(); i++) {
		            disciplinasMatriculadas.add(model.getElementAt(i));
		        }
		
		        List<String> selectedValues = lstDisciplinasNaoMatriculadas.getSelectedValuesList();
		        for (String disciplina : selectedValues) {
		            todasDisciplinas.remove(disciplina);
		            disciplinasMatriculadas.add(disciplina);
		        }
		        bubbleSort(todasDisciplinas);
		        bubbleSort(disciplinasMatriculadas);
		        lstDisciplinasNaoMatriculadas.setListData(todasDisciplinas.toArray(new String[0]));
		        lstDisciplinasMatriculadas.setListData(disciplinasMatriculadas.toArray(new String[0]));
	    	}
	    });
	    GridBagConstraints gbc_btnAdicionar = new GridBagConstraints();
	    gbc_btnAdicionar.fill = GridBagConstraints.HORIZONTAL;
	    gbc_btnAdicionar.anchor = GridBagConstraints.SOUTH;
	    gbc_btnAdicionar.insets = new Insets(0, 0, 5, 0);
	    gbc_btnAdicionar.gridx = 0;
	    gbc_btnAdicionar.gridy = 2;
	    containerButtons.add(btnAdicionar, gbc_btnAdicionar);
	    GridBagConstraints gbc_btnRemover = new GridBagConstraints();
	    gbc_btnRemover.fill = GridBagConstraints.HORIZONTAL;
	    gbc_btnRemover.anchor = GridBagConstraints.NORTH;
	    gbc_btnRemover.insets = new Insets(0, 0, 5, 0);
	    gbc_btnRemover.gridx = 0;
	    gbc_btnRemover.gridy = 3;
	    containerButtons.add(btnRemover, gbc_btnRemover);
	    GridBagConstraints gbc_btnRemoverTudo = new GridBagConstraints();
	    gbc_btnRemoverTudo.fill = GridBagConstraints.HORIZONTAL;
	    gbc_btnRemoverTudo.anchor = GridBagConstraints.NORTH;
	    gbc_btnRemoverTudo.gridx = 0;
	    gbc_btnRemoverTudo.gridy = 6;
	    containerButtons.add(btnRemoverTudo, gbc_btnRemoverTudo);
	    
	    // JList das Disciplinas Não Matriculadas
	    lstDisciplinasMatriculadas = new JList<>(disciplinasMatriculadas.toArray(new String[0]));
	    GridBagConstraints gbc_lstDisciplinasMatriculadas = new GridBagConstraints();
	    gbc_lstDisciplinasMatriculadas.insets = new Insets(0, 0, 5, 5);
	    gbc_lstDisciplinasMatriculadas.fill = GridBagConstraints.BOTH;
	    gbc_lstDisciplinasMatriculadas.gridx = 3;
	    gbc_lstDisciplinasMatriculadas.gridy = 5;
	    add(lstDisciplinasMatriculadas, gbc_lstDisciplinasMatriculadas);
	    
	    JButton btnSalvar = new JButton("Salvar Alterações");
	    btnSalvar.addActionListener(new ActionListener() {
			public void actionPerformed(ActionEvent e) {
				List<String> disciplinasMatriculadas = new ArrayList<>();
				ListModel<String> model = lstDisciplinasMatriculadas.getModel();
		        for (int i = 0; i < model.getSize(); i++) {
		            disciplinasMatriculadas.add(model.getElementAt(i));
		        }
		        
		        ad.setRa(a.getRa());
		        adDAO.excluir(ad.getRa());
		        for (int i = 0; i < disciplinasMatriculadas.size(); i++) {
		        	ad.setCodigoDisciplina(dDAO.obterCodigoDisciplina(disciplinasMatriculadas.get(i)));
		        	
		        	adDAO.gravar(ad);
		        }
				JOptionPane.showMessageDialog(null, "Matrículas feitas com sucesso!", "Matrícula concluída", JOptionPane.INFORMATION_MESSAGE);
				PainelListarAlunos p = new PainelListarAlunos();
				FramePatec.getFrame().setContentPane(p);
				FramePatec.getFrame().revalidate();
				FramePatec.getFrame().repaint();
			}
		});
	    GridBagConstraints gbc_btnSalvar = new GridBagConstraints();
	    gbc_btnSalvar.insets = new Insets(0, 0, 5, 5);
	    gbc_btnSalvar.gridx = 2;
	    gbc_btnSalvar.gridy = 6;
	    add(btnSalvar, gbc_btnSalvar);

    }

    /**
     * Método com algoritmo bubble sort para ordenar a lista das disciplinas em ordem alfabética
     * @param lista lista que precisa ser ordenada
     */
    public static void bubbleSort(List<String> lista) {
        int n = lista.size();
        boolean trocado;
        do {
            trocado = false;
            for (int i = 1; i < n; i++) {
                if (lista.get(i - 1).compareTo(lista.get(i)) > 0) {                 
                    String temp = lista.get(i - 1);
                    lista.set(i - 1, lista.get(i));
                    lista.set(i, temp);
                    trocado = true;
                }
            }
            n--;
        } while (trocado);
    }
    
}
