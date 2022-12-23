import React from "react";
import styled from "styled-components";
import { StrictModeDroppable } from "./droppable";
import { Task } from "./task";

const Container = styled.div`
  margin: 8px;
  border: 1px solid lightgrey;
  border-radius: 2px;
  width: 220px;

  display: flex;
  flex-direction: column;
`;

const Title = styled.h3`
  padding 8px;
`;

const TaskList = styled.div<any>`
  padding: 8px;
  transition: background-color 0.2s ease;
  background-color: ${(props) => (props.isDraggingOver ? "lightgrey" : "white")};
  flex-grow: 1;
  min-height: 100px;
`;

const InnerList = React.memo(({ tasks }: any) => {
  return <>{tasks.map((task: any, index: number) => (
    <Task key={task.id} task={task} index={index} />
  ))}</>
});

export const Column = ({ column, tasks, isDropDisabled }: any) => {
  return (
    <Container>
      <Title>{column.title}</Title>
      <StrictModeDroppable
        droppableId={column.id}
        // type={column.id === "column-3" ? "done" : "active"}
        isDropDisabled={isDropDisabled}
      >
        {(provided, snapshot) => (
          <TaskList
            ref={provided.innerRef}
            {...provided.droppableProps}
            isDraggingOver={snapshot.isDraggingOver}
          >
            <InnerList tasks={tasks} />
            {provided.placeholder}
          </TaskList>
        )}
      </StrictModeDroppable>
    </Container>
  );
};
