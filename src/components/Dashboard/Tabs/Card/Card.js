import React, { Component } from 'react';
import { DragSource } from 'react-dnd';

const cardSource = {
    beginDrag(props) {
      return {
        text: props.text
      };
    }
  };

  const Types = {
    CARD: 'card'
  };
  
function collect(connect, monitor) {
    return {
      connectDragSource: connect.dragSource(),
      isDragging: monitor.isDragging()
    };
  }

  function Card({ isDragging, connectDragSource, text }) {
    return connectDragSource(
      <div style={{ opacity: isDragging ? 0.5 : 1 }}>
        {text}
      </div>
    );
  }

  export default DragSource(Types.CARD, cardSource, collect)(Card)