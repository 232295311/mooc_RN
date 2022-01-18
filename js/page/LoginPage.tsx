import React, {useState} from 'react';
import {SafeAreaView, StyleSheet, View} from 'react-native';
import {Input, ConfirmButton, Tips, NavBar} from '../common/LoginComponent';
export default (props: any) => {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState('登陆报错错误信息默认值');
  const [helpUrl, setHelpUrl] = useState('https://www.baidu.com');
  const onClick = () => {};
  return (
    <SafeAreaView style={styles.root}>
      <NavBar title="登陆" rightTitle="注册" />
      <View style={styles.line} />
      <View style={styles.content}>
        <Input
          label="用户名"
          placeholder="请输入用户名"
          shortLine={true}
          onChangeText={(text: string) => setUserName(text)}
        />
        <Input
          label="密码"
          placeholder="请输入密码"
          secure={true}
          onChangeText={(text: string) => setPassword(text)}
        />
        <ConfirmButton title="登陆"></ConfirmButton>
        <Tips msg={msg} helpUrl={helpUrl}></Tips>
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  content: {
    paddingTop: 20,
    backgroundColor: '#F1F5F6',
    flexGrow: 1,
  },
  line: {
    height: 0.5,
    backgroundColor: '#D0D4D4',
  },
});
