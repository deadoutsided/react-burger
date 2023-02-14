import React from 'react';
import { useDrag, useDrop } from 'react-dnd'
import style from './movable-constructor-element.module.css';
import PropTypes from "prop-types";

export const MovableConstructorElement = ({ index, extraClass, moveIngredient, findIngredient, children }) => {
  const originalIndex = findIngredient(index).index;
  const [{ isDragging }, drag] = useDrag(
    () => ({
      type: 'constrIngr',
      item: { index, originalIndex },
      collect: monitor => ({
        isDragging: monitor.isDragging(),
      }),
      end: (item, monitor) => {
        const { index: droppedId, originalIndex} = item;
        const didDrop = monitor.didDrop();
        if(!didDrop) {
          moveIngredient(droppedId, originalIndex)
        }
      },
    }),
    [index, originalIndex, moveIngredient]
  )
  const [{ isHover }, drop] = useDrop(
    () => ({
      accept: 'constrIngr',
      collect: monitor => ({
        draggedItem: monitor.getItem(),
        isHover: monitor.isOver()
      }),
      drop(item) {
        moveIngredient(item.index, index)
      }
    }),
    [findIngredient, moveIngredient]
  )
  const opacity = isDragging ? 0 : 1;
  return (
    <div className={isHover ? extraClass + ' ' + style.hovered : extraClass} ref={(node) => drag(drop(node))} >
      {children}
    </div>
  )
}

MovableConstructorElement.propTypes = {
  index: PropTypes.number,
  extraClass: PropTypes.string,
  moveIngredient: PropTypes.func,
  findIngredient: PropTypes.func,
  children: PropTypes.array
}