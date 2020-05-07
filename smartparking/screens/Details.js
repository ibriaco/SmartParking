import React, { Component } from "react";
import { Button, View } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";

  
class Details extends Component {

  
render(){
  return (
    <View>
      <DateTimePickerModal
        isVisible={true}
        mode="time"
        value={new Date()}
        onCancel={console.log("cancel")}
        onConfirm={console.log("confirm")}

      />
    </View>
  );
};
}
export default Details;