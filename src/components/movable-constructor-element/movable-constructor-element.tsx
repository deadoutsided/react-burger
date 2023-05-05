import React, { useRef, FC, ReactNode } from 'react';
import { useDrag, useDrop } from 'react-dnd'
import style from './movable-constructor-element.module.css';

type TMoveConstrProps = {
  index: number;
  extraClass: string;
  moveIngredient: (dragIndex: number, hoverIndex: number) => void;
  children: ReactNode;
  id: string;
}

export const MovableConstructorElement: FC<TMoveConstrProps> = ({ index, extraClass, moveIngredient, children, id }) => {
  const ref = useRef(null);
  const [{handlerId, isHover}, drop] = useDrop({
    accept: 'constrIngr',
    collect: monitor => ({
      handlerId: monitor.getHandlerId(),
      isHover: monitor.isOver()
    }),
    drop(item: any){
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