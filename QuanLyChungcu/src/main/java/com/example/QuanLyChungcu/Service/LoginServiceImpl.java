package com.example.QuanLyChungcu.Service;

import com.example.QuanLyChungcu.DTO.UserLoginDTO;
import org.springframework.stereotype.Service;

import java.util.List;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

@Service
public class LoginServiceImpl implements LoginService {
    boolean isValid = false;

    public boolean checkValid(UserLoginDTO loginRequest){
        try (Connection conn = Utils.getConnection()) {
            String query = "select exists (select * from users where username = ? and password = ? )";
            PreparedStatement pst = conn.prepareStatement(query);
            pst.setString(1, loginRequest.getUsername());
            pst.setString(2, loginRequest.getPassword());
            ResultSet rs = pst.executeQuery();
            if(rs.next()){
                if (rs.getInt(1) == 1) {
                    isValid = true;
                } else {
                    System.out.println("Wrong username or password");
                }
            }
            rs.close();
            pst.close();
            conn.close();
        } catch (SQLException e) {
            e.printStackTrace();
        }

        return isValid;
    }
}
