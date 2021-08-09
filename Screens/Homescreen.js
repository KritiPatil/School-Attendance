import * as React from 'react';
import { TouchableOpacity, View, Text, StyleSheet, Image } from 'react-native';
import db from '../config';

export default class HomeScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      all_students: [],
      present_list: [],
      absent_list: [],
    };
  }

  componentDidMount = () => {
    this.listOfStudents();
  };

  listOfStudents = async () => {
    var class_ref = await db.ref('/').on('value', (data) => {
      var all_students = [];
      var class_a = data.val();
      for (var i in class_a) {
        all_students.push(class_a[i]);
      }
      all_students.sort(function (a, b) {
        return a.Roll_no - b.Roll_no;
      });
      console.log(all_students);
      this.setState({ all_students: all_students });
    });
  };

  updateAttendance(roll_no, status) {
    var id = '';
    if (roll_no <= 9) {
      id = '0' + roll_no;
    } else {
      id = roll_no;
    }

    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1;
    var yyyy = today.getFullYear();

    if (dd < 10) {
      dd = '0' + dd;
    }
    if (mm < 10) {
      mm = '0' + mm;
    }

    today = dd + '-' + mm + '-' + yyyy;
    var ref_path = id;
    var class_ref = db.ref(ref_path);
    class_ref.update({
      [today]: status,
    });
  }

  render() {
    return (
      <View>
        {this.state.all_students.map((student) => {
          return (
            <View style={{ flexDirection: 'row' }}>
              <Text style={styles.roll_on}>{student.Roll_no}</Text>
              <Text style={styles.name}>{student.Name}</Text>
              <TouchableOpacity
                style={
                  this.state.present_list.includes(student.Roll_no)
                    ? [styles.present, { backgroundColor: 'green' }]
                    : styles.present
                }
                onPress={() => {
                  this.updateAttendance(student.Roll_no, 'Present');
                  this.state.present_list.push(student.Roll_no);
                }}>
                <Text>Present</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={
                  this.state.absent_list.includes(student.Roll_no)
                    ? [styles.absent, { backgroundColor: 'red' }]
                    : styles.absent
                }
                onPress={() => {
                  this.updateAttendance(student.Roll_no, 'Absent');
                  this.state.absent_list.push(student.Roll_no);
                }}>
                <Text>Absent</Text>
              </TouchableOpacity>
            </View>
          );
        })}
        <TouchableOpacity
          style={styles.submit}
          onPress={() => {
            this.props.navigation.navigate('SummaryScreen', {
              present: this.state.present_list.length,
              absent: this.state.absent_list.length,
            });
          }}>
          <Text>Submit</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  present: {
    marginLeft: 70,
    marginTop: 10,
    borderColor: 'black',
    borderWidth: 3,
    textAlign: 'center',
    width: 60,
    height: 25,
  },
  absent: {
    marginLeft: 20,
    marginTop: 10,
    borderColor: 'black',
    borderWidth: 3,
    textAlign: 'center',
    width: 60,
    height: 25,
  },
  submit: {
    marginTop: 50,
    padding: 20,
    backgroundColor: 'yellow',
    width: 330,
    justifyContent: 'center',
    alignItems: 'center',
  },
  roll_on:{
    marginTop: 10,
  },
  name:{
  marginTop: 10,  
  marginLeft: 10 
  }
});
