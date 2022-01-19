import React, {Component} from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';
import {connect} from 'react-redux';
import actions from '../action';
class MyPage extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>我的页面</Text>
        <Button
          title="改变主题"
          onPress={() => {
            this.props.onThemeChange('yellow');
          }}
        />
      </View>
    );
  }
}

// 将dispatch映射给onThemeChange，然后注入到组件的props中
const mapDispatchToProps = dispatch => {
  return {
    onThemeChange: theme => dispatch(actions.onThemeChange(theme)),
  };
};

// 包装component ，注入dispatch到MyPage

export default connect(null, mapDispatchToProps)(MyPage);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
