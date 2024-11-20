package com.example.ecommerce.mapper;

import com.example.ecommerce.model.User;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import java.util.List;

@Mapper
public interface UserMapper {
    void insertUser(User user);
    User selectUserById(@Param("userId") Long userId);
    User selectUserByUsername(@Param("username") String username);
    List<User> selectAllUsers();
    void updateUser(User user);
    void deleteUser(@Param("userId") Long userId);
}
