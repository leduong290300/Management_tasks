import React, { useContext, useEffect } from "react";
import { AuthContext } from "../../../context/authContext";
import { TaskContext } from "../../../context/taskContext";
import {
  Button,
  Card,
  Col,
  OverlayTrigger,
  Row,
  Spinner,
  Toast,
  Tooltip,
} from "react-bootstrap";
import CreateTask from "../../../components/modal/createTask";
import UpdateTask from "../../../components/modal/updateTask";
import SingleTask from "../../../components/task/singleTask";
import addIcon from "../../../assets/icons/plus-circle-fill.svg";

export default function Dashboard() {
  //* Context
  const {
    authState: {
      user: { firstName, lastName },
    },
  } = useContext(AuthContext);

  const {
    taskState: { task, tasks, tasksLoading },
    handleGetAllTasks,
    setShowFormCreateTask,
    showToast: { show, message, type },
    setShowToast,
  } = useContext(TaskContext);

  //* Effect
  useEffect(() => {
    handleGetAllTasks();
  }, []);

  let body;
  if (tasksLoading) {
    body = (
      <div className="spinner-container">
        <Spinner animation="border" variant="info" />
      </div>
    );
  } else if (tasks.length === 0) {
    body = (
      <>
        <Card className="text-center mx-5 my-5">
          <Card.Header as="h3">
            Xin chào {firstName + " " + lastName}
          </Card.Header>
          <Card.Body>
            <Card.Title>Quản lý công việc</Card.Title>
            <Card.Text>Thêm những việc cần làm ngay</Card.Text>
            <Button
              variant="primary"
              onClick={setShowFormCreateTask.bind(this, true)}
            >
              Thêm mới
            </Button>
          </Card.Body>
        </Card>
      </>
    );
  } else {
    body = (
      <>
        <Row className="row-cols-1 row-cols-md-3 g-4 mx-auto mt-3">
          {tasks.map((task) => (
            <Col key={task.id} className="my-2">
              <SingleTask task={task} />
            </Col>
          ))}
        </Row>
        <OverlayTrigger placement="left" overlay={<Tooltip>Thêm mới</Tooltip>}>
          <Button
            className="btn-floating"
            onClick={setShowFormCreateTask.bind(this, true)}
          >
            <img src={addIcon} alt="add-post" width="60" height="60" />
          </Button>
        </OverlayTrigger>
      </>
    );
  }
  return (
    <>
      {body}
      <CreateTask />
      {task !== null && <UpdateTask />}
      <Toast
        show={show}
        style={{ position: "fixed", top: "20%", right: "10px" }}
        className={`bg-${type} text-white`}
        onClose={setShowToast.bind(this, {
          show: false,
          message: "",
          type: null,
        })}
        delay={3000}
        autohide
      >
        <Toast.Body>
          <strong>{message}</strong>
        </Toast.Body>
      </Toast>
    </>
  );
}
