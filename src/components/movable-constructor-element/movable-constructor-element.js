import React, { useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd'
import style from './movable-constructor-element.module.css';
import PropTypes from "prop-types";

export const MovableConstructorElement = ({ index, extraClass, moveIngredient, children, id }) => {
  const ref = useRef(null);
  const [{handlerId, isHover}, drop] = useDrop({
    accept: 'constrIngr',
    collect: monitor => ({
      handlerId: monitor.getHandlerId(),
      isHover: monitor.isOver()
    }),
    drop(item, monitor){
      if(!ref.current){
        return
      }
      const dragIndex = item.index
      const hoverIndex = index
      moveIngredient(dragIndex, hoverIndex)
      item.index = hoverIndex
    }
  })

  const [{isDragging}, drag] = useDrag({
    type: 'constrIngr',
    item: {id, index},
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    })
  })
  const opacity = isDragging ? 0 : 1;
  drag(drop(ref))
  return (
    <div className={isHover ? extraClass + ' ' + style.hovered : extraClass} ref={ref} data-handler-id={handlerId} >
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