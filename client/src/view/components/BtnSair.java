package view.components;

import java.awt.Color;
import java.awt.Cursor;
import java.awt.Font;
import java.awt.GridBagConstraints;
import java.awt.Insets;
import java.awt.event.MouseAdapter;
import java.awt.event.MouseEvent;
import java.awt.font.TextAttribute;
import java.util.Map;

import javax.swing.ImageIcon;
import javax.swing.JLabel;

import view.FramePatec;
import view.PainelLogin;


@SuppressWarnings("serial")
public class BtnSair extends JLabel {
	
	public GridBagConstraints gbc_btnSair;

	public BtnSair(String texto) {
		super(texto);
		setForeground(new Color(255, 0, 0));
		setFont(new Font("Tahoma", Font.PLAIN, 13));
		setIcon(new ImageIcon(BtnSair.class.getResource("/sign-out.png")));
		setCursor(Cursor.getPredefinedCursor(Cursor.HAND_CURSOR));
		this.addMouseListener(new MouseAdapter() {
			@Override
			public void mouseClicked(MouseEvent e) {
				PainelLogin p = new PainelLogin();
				FramePatec.getFrame().setTitle("Patec - Log-in");
				FramePatec.getFrame().setContentPane(p);
				FramePatec.getFrame().revalidate();
				FramePatec.getFrame().repaint();
			}
		});
		this.addMouseListener(new MouseAdapter() {
			@Override
			public void mouseEntered(MouseEvent e) {
				Font font = getFont();
				Map<TextAttribute, Integer> attributes = (Map<TextAttribute, Integer>) font.getAttributes();
				attributes.put(TextAttribute.UNDERLINE, 0);
				setFont(font.deriveFont(attributes));
			}
		});
		this.addMouseListener(new MouseAdapter() {
			@Override
			public void mouseExited(MouseEvent e) {
				Font font = getFont();
				Map<TextAttribute, Integer> attributes = (Map<TextAttribute, Integer>) font.getAttributes();
				attributes.put(TextAttribute.UNDERLINE, -1);
				setFont(font.deriveFont(attributes));
			}
		});
	}

}
