import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import ReactModal from 'react-modal';
import TaskCreate from './taskCreate';
import TaskEdit from './taskEdit';
import Pagination from './pagination';
import { push } from 'react-router-redux';

class TaskList extends PureComponent {

  constructor () {
    super();
    this.state = {
      showModal: false,
      task: {}
    };

    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
  }

  handleOpenModal (task) {
    task = task ? task : {};
    this.setState({ showModal: true, task });
  }

  handleCloseModal () {
    this.setState({ showModal: false, task: {} });
  }

  changePage (page) {
    const {fetchTaskList, dispatch} = this.props;
    fetchTaskList(page);
    dispatch(push({
      search: `page=${page}`
    }));
  }

  componentWillMount() {
    this.props.fetchTaskList();
  }

  sortTable(sort, direction) {
    console.log('sortTable')
    //this.props.fetchTaskList(1, sort, direction);
  }

  renderTaskList() {
    const {authenticated, taskList} = this.props;
    if (taskList.tasks.length === 0) {
      return <tr><td colSpan={6}>No data</td></tr>
    }

    return taskList.tasks.map((item, index) => {
      return   <tr key={index + 'task'}>
                  <td>
                    {item.id}
                  </td>
                  <td>
                    {item.username}
                  </td>
                  <td>
                    {item.email}
                  </td>
                  <td>
                    {item.text}
                  </td>
                  <td>
                    {this.renderStatus(item.status)}
                  </td>
                  <td>
                    {authenticated ? <button onClick={() => this.handleOpenModal(item)} type="button" className="btn btn-success">Edit</button> : null}
                  </td>
               </tr>;
    })
  }

  renderStatus(status) {
    switch (status) {
      case 0 :
        return 'not completed';
      case 1 :
        return 'not completed, edited by admin';
      case 10 :
        return 'completed';
      case 11 :
        return 'edited by admin and done';
      default :
        return '';
    }
  }

  render() {
    const { taskList, fetchTaskList } = this.props;
    const { task, showModal } = this.state;

    if (!taskList) {
      return <div>Loading...</div>;
    }

    return (
      <div>
        <button onClick={this.handleOpenModal} type="button" className="btn btn-primary mb20">Add task</button>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">
                <button type="button" onClick={() => this.sortTable('id', )}>
                  #
                </button>
              </th>
              <th scope="col">
                <button type="button" onClick={() => this.sortTable('id', )}>
                  Username
                </button>
              </th>
              <th scope="col">
                <button type="button" onClick={() => this.sortTable('id', )}>
                  Email
                </button>
              </th>
              <th scope="col">
                <button type="button" onClick={this.sortTable('id', )}>
                  Description
                </button>
              </th>
              <th scope="col">
                <button type="button" onClick={this.sortTable('id', )}>
                  Status
                </button>
              </th>
              <th scope="col">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {this.renderTaskList()}
          </tbody>
        </table>
        <Pagination changePage={this.changePage.bind(this)}  count={taskList.total_task_count} />
        <ReactModal
          isOpen={showModal}
          contentLabel="Minimal Modal Example"
          className="modal"
          overlayClassName="overlay"
          ariaHideApp={false}
          onRequestClose={this.handleCloseModal}
        >
          {task.id ? <TaskEdit task={task} closeModal={this.handleCloseModal} /> : <TaskCreate closeModal={this.handleCloseModal}/>}
        </ReactModal>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    taskList: state.taskList,
    authenticated: state.auth.authenticated
  }
}

export default connect(mapStateToProps, actions)(TaskList);
