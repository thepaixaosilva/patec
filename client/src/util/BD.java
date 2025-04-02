package util;

import java.sql.*;

/**
 * Classe responsável por gerenciar as conexões com o banco de dados. Ela oferece métodos
 * para abrir e fechar conexões, além de executar consultas SQL e atualizações.
 */
public class BD {

	public Connection con = null;
	public PreparedStatement st = null;
	public ResultSet rs = null;

	private final String DRIVER = "com.microsoft.sqlserver.jdbc.SQLServerDriver";
	private final String DATABASENAME = "PATEC";
	private final String URL = "jdbc:sqlserver://localhost:1433;databasename=" + DATABASENAME
			+ ";encrypt=true;trustServerCertificate=true;";
	private final String LOGIN = "sa";
	private final String SENHA = "PatecAdmin1";

	/**
	 * Realiza a conexão com o banco de dados.
	 * 
	 * @return <code>true</code> em caso de sucesso, ou <code>false</code> caso contrário.
	 */
	public boolean getConnection() {
		try {
			Class.forName(DRIVER);
			con = DriverManager.getConnection(URL, LOGIN, SENHA);
			System.out.println("Conectou!");
			return true;
		} catch (SQLException erro) {
			System.out.println("Falha na conexão! " + erro);
			return false;
		} catch (ClassNotFoundException erro) {
			System.out.println("Driver não encontrado!");
			return false;
		}

	}

	/**
	 * Encerra a conexão e libera os objetos utilizados.
	 */
	public void close() {
		try {
			if (rs != null)
				rs.close();
		} catch (SQLException e) {
		}

		try {
			if (st != null)
				st.close();
		} catch (SQLException e) {
		}
		try {
			if (con != null) {
				con.close();
				System.out.println("Desconectou!");
			}
		} catch (SQLException e) {
		}

	}

}
