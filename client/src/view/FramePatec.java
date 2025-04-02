package view;

import java.awt.*;
import javax.swing.*;
import javax.swing.border.*;

public class FramePatec extends JFrame {

	private static final long serialVersionUID = 1L;
	private JPanel contentPane;
	protected static FramePatec frame;

	public static FramePatec getFrame() {
		return frame;
	}

	/**
	 * Launch the application.
	 */
	public static void main(String[] args) {
		EventQueue.invokeLater(new Runnable() {
			public void run() {
				try {
					frame = new FramePatec();
					frame.setTitle("Patec - Log-in");
					frame.setVisible(true);
					PainelLogin p = new PainelLogin();
					frame.setContentPane(p);
					frame.revalidate();
					frame.repaint();
				} catch (Exception e) {
					e.printStackTrace();
				}
			}
		});
	}

	/**
	 * Create the frame.
	 */
	public FramePatec() {
		setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
		setExtendedState(JFrame.MAXIMIZED_BOTH);
		setMinimumSize(new Dimension(720, 480));
		contentPane = new JPanel();
		contentPane.setBorder(new EmptyBorder(5, 5, 5, 5));

		setContentPane(contentPane);
	}

}
