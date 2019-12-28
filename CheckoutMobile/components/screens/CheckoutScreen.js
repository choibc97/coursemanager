import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import {
  Container,
  Content,
  Form,
  Item,
  Input,
  Label,
  Button,
  Text,
} from 'native-base';

import {editStudentAssignment} from '../../actions/assignments';

export class CheckoutScreen extends Component {
  static propTypes = {
    user: PropTypes.object.isRequired,
    assignment: PropTypes.object.isRequired,
    studentAssignment: PropTypes.object.isRequired,
    editStudentAssignment: PropTypes.func.isRequired,
  };

  static navigationOptions = {
    title: 'Checkout',
  };

  state = {
    pointsEarned: '',
    comment: '',
  };

  onPointsChange = points => {
    this.setState({pointsEarned: points});
  };

  onCommentChange = comment => {
    this.setState({comment});
  };

  onCheckout = () => {
    const {student, assignment} = this.props.studentAssignment;
    const completed = true;
    const points_earned =
      this.state.pointsEarned === ''
        ? this.props.assignment.points
        : this.state.pointsEarned;
    const {comment} = this.state;
    const grader = this.props.user.email;

    const studentAssignment = {completed, points_earned, grader, comment};
    this.props
      .editStudentAssignment(student, assignment, studentAssignment)
      .then(res => {
        if (res) {
          this.props.navigation.navigate('Scanner');
        }
      });
  };

  render() {
    return (
      <Container>
        <Content padder>
          <Form>
            <Item stackedLabel>
              <Label>Points Earned</Label>
              <Input
                keyboardType="numeric"
                onChangeText={this.onPointsChange}
                placeholder="Blank means full credit"
                value={this.state.pointsEarned}
              />
            </Item>
            <Item stackedLabel last>
              <Label>Comments</Label>
              <Input
                multiline
                onChangeText={this.onCommentChange}
                placeholder="Great work!! :)"
                value={this.state.comment}
              />
            </Item>
            <Button onPress={this.onCheckout}>
              <Text>Checkout</Text>
            </Button>
          </Form>
        </Content>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  user: state.auth.user,
  assignment: state.assignments.assignment,
  studentAssignment: state.assignments.studentAssignment,
});

const mapDispatchToProps = {editStudentAssignment};

export default connect(mapStateToProps, mapDispatchToProps)(CheckoutScreen);
