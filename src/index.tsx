import React, { useState } from "react";
import {
  DragDropContext,
  DragStart,
  DragUpdate,
  DropResult,
} from "react-beautiful-dnd";
import ReactDOM from "react-dom/client";
import styled from "styled-components";
import { Column } from "./column";
import { initialData } from "./data";
import * as R from "ramda";

const Container = styled.div`
  display: flex;
  width: 100%;
`;

const App = ({ propData }: { propData: typeof initialData }) => {
  const [data, setData] = useState(propData);
  const [homeIndex, setHomeIndex] = useState<number>(0);

  const onDragStart = ({ source }: DragStart) => {
    document.body.style.color = "orange";
    document.body.style.transition = "background-color 0.2s ease";
    setHomeIndex(data.columnOrder.indexOf(source.droppableId));
  };

  const onDragUpdate = ({ destination }: DragUpdate) => {
    const opacity = destination
      ? destination.index / Object.keys(data.tasks).length
      : 0;
    document.body.style.backgroundColor = `rgba(153, 141, 217, ${opacity})`;
  };

  const onDragEnd = ({ source, destination, draggableId }: DropResult) => {
    document.body.style.color = "inherit";
    document.body.style.backgroundColor = "inherit";
    setHomeIndex(0);

    if (!destination) {
      return;
    }

    const sameColumn = source.droppableId === destination.droppableId;
    if (
      sameColumn &&
      destination.index === source.index
    ) {
      return;
    }

    const _data = R.pipe(
      R.evolve({
        columns: {
          [source.droppableId]: {
            taskIds: (ids) =>
              sameColumn
                ? R.move(source.index, destination.index, ids)
                : R.dissoc(source.index, ids),
          },
        },
      }),
      R.evolve({
        columns: {
          [destination.droppableId]: {
            taskIds: (ids) =>
              sameColumn ? ids : R.insert(destination.index, draggableId, ids),
          },
        }
      })
    )(data);

    setData(_data as any);
    return;
  };

  return (
    <DragDropContext
      onDragEnd={onDragEnd}
      onDragStart={onDragStart}
      onDragUpdate={onDragUpdate}
    >
      <Container>
        {data.columnOrder.map((columnId, index) => {
          const column = data.columns[columnId as keyof typeof data["columns"]];
          const tasks = column.taskIds.map(
            (taskId) => data.tasks[taskId as keyof typeof data["tasks"]]
          );

          const isDropDisabled = false; //index < homeIndex;
          return (
            <Column
              key={column.id}
              column={column}
              tasks={tasks}
              isDropDisabled={isDropDisabled}
            />
          );
        })}
      </Container>
    </DragDropContext>
  );
};

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <App propData={initialData} />
  </React.StrictMode>
);
