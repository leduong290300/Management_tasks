import React, { useContext, useEffect } from "react";
import { AuthContext } from "../../../context/authContext";
import { TaskContext } from "../../../context/taskContext";
import { Button, Card, Spinner } from "react-bootstrap";

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
  } else if (tasks.lenght === 0) {
    body = (
      <>
        <Card className="text-center mx-5 my-5">
          <Card.Header as="h1">
            Xin chào {firstName + " " + lastName}
          </Card.Header>
          <Card.Body>
            <Card.Title>Quản lý công việc</Card.Title>
            <Card.Text>Thêm những việc cần làm ngay</Card.Text>
            <Button variant="primary">Thêm mới</Button>
          </Card.Body>
        </Card>
      </>
    );
  } else {
  }
  return <div>{body}</div>;
}
