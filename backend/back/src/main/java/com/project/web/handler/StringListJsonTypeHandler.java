// com.project.web.mybatis.StringListJsonTypeHandler
package com.project.web.handler;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.apache.ibatis.type.*;
import java.sql.*;
import java.util.*;

@MappedTypes(List.class)
@MappedJdbcTypes({JdbcType.VARCHAR, JdbcType.CLOB})
public class StringListJsonTypeHandler extends BaseTypeHandler<List<String>> {
  private static final ObjectMapper om = new ObjectMapper();

  @Override
  public void setNonNullParameter(PreparedStatement ps, int i, List<String> parameter, JdbcType jdbcType) throws SQLException {
    try { ps.setString(i, om.writeValueAsString(parameter == null ? Collections.emptyList() : parameter)); }
    catch (Exception e) { ps.setString(i, "[]"); }
  }
  @Override public List<String> getNullableResult(ResultSet rs, String columnName) throws SQLException { return read(rs.getString(columnName)); }
  @Override public List<String> getNullableResult(ResultSet rs, int columnIndex) throws SQLException { return read(rs.getString(columnIndex)); }
  @Override public List<String> getNullableResult(CallableStatement cs, int columnIndex) throws SQLException { return read(cs.getString(columnIndex)); }

  private List<String> read(String json) {
    if (json == null || json.isBlank()) return Collections.emptyList();
    try { return om.readValue(json, new TypeReference<List<String>>() {}); }
    catch (Exception e) { return Collections.emptyList(); }
  }
}
