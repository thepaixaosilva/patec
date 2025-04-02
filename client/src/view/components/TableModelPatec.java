package view.components;

import java.sql.ResultSetMetaData;
import java.sql.SQLException;
import java.sql.Types;
import java.text.DecimalFormat;
import java.util.Vector;

import javax.swing.table.DefaultTableModel;

import util.BD;

public class TableModelPatec {

	private static DefaultTableModel tableModel;

	public static DefaultTableModel getModel(BD bd, String sql) {
		try {
			Vector<String> cabecalho = new Vector<String>();
			Vector<Vector<String>> linhas = new Vector<Vector<String>>();
			bd.st = bd.con.prepareStatement(sql);
			bd.rs = bd.st.executeQuery();
			bd.rs.next();
			// busca os cabecalhos
			ResultSetMetaData rsmd = bd.rs.getMetaData();
			for (int i = 1; i <= rsmd.getColumnCount(); i++)
				cabecalho.addElement(rsmd.getColumnName(i));

			// busca dados das linhas
			do {
				Vector<String> linhaAtual = new Vector<String>();
				DecimalFormat df = new DecimalFormat("R$ 00.00");
				for (int i = 1; i <= rsmd.getColumnCount(); i++) {
					switch (rsmd.getColumnType(i)) {
					case Types.VARCHAR:
						linhaAtual.addElement(bd.rs.getString(i));
						break;
					case Types.CHAR:
						linhaAtual.addElement(bd.rs.getString(i));
						break;
					case Types.TIMESTAMP:
						linhaAtual.addElement("" + bd.rs.getDate(i));
						break;
					case Types.DATE:
						linhaAtual.addElement("" + bd.rs.getDate(i));
						break;
					case Types.DOUBLE:
						linhaAtual.addElement("" + bd.rs.getDouble(i));
						break;
					case Types.DECIMAL:
						linhaAtual.addElement("" + bd.rs.getDouble(i));
						break;
					case Types.INTEGER:
						linhaAtual.addElement("" + bd.rs.getInt(i));
						break;
					case Types.NUMERIC:
						linhaAtual.addElement("" + df.format(bd.rs.getDouble(i)));
						break;
					case Types.SMALLINT:
						linhaAtual.addElement("" + bd.rs.getInt(i));
						break;
					// default:System.out.println(rsmd.getColumnType(i));
					}
				}
				linhas.addElement(linhaAtual);
			} while (bd.rs.next());

			tableModel = new DefaultTableModel(linhas, cabecalho);
		} catch (SQLException erro) {
			System.out.println(erro.toString());
			return null;
		}
		return tableModel;
	}
}
