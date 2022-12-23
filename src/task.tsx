import React from "react";
import { Draggable } from "react-beautiful-dnd";
import styled from "styled-components";

const Container = styled.div<any>`
  border: 1px solid lightgrey;
  border-radius: 2px;
  padding: 8px;
  margin-bottom: 8px;
  background-color: ${(props) =>
    props.isDragDisabled
      ? "lightgrey"
      : props.isDragging
      ? "lightgreen"
      : "white"};
  display: flex;
`;

const Handle = styled.div`
  width: 20px;
  height: 20px;
  background-color: orange;
  border-radius: 4px;
  margin-right: 8px;
`;

export const Task = ({ task, index, isDragDisabled = false }: any) => (
  <Draggable
    draggableId={task.id}
    index={index}
    isDragDisabled={isDragDisabled}

  >
    {(provided, snapshot) => (
      <Container
        ref={provided.innerRef}
        {...provided.draggableProps}
        isDragging={snapshot.isDragging}
        isDragDisabled={isDragDisabled}
      >
        <Handle {...provided.dragHandleProps} />
        <p>{task.content}</p>
      </Container>
    )}
  </Draggable>
);
