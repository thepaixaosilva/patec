package view.components;

import java.awt.*;
import java.awt.event.*;
import java.awt.font.*;
import java.util.*;

import javax.swing.*;

import view.*;

@SuppressWarnings("serial")
public class BtnVoltar extends JLabel {
	public BtnVoltar(String texto) {
		super(texto);
		setFont(new Font("Tahoma", Font.PLAIN, 13));
		setIcon(new ImageIcon(BtnSair.class.getResource("/return.png")));
		setCursor(Cursor.getPredefinedCursor(Cursor.HAND_CURSOR));
		this.addMouseListener(new MouseAdapter() {
			@Override
			public void mouseClicked(MouseEvent e) {
				PainelMenuCoordenador p = new PainelMenuCoordenador();
				FramePatec.getFrame().setTitle("Patec - Administrador");
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