import React from "react";
import {
  ConstructorElement,
  CurrencyIcon,
  DragIcon,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import style from "../burger-constructor/burger-constructor.module.css";

class BurgerConstructor extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <section className="mt-25 ml-5 pl-4 pr-4">
        <ConstructorElement
          extraClass="ml-8"
          type="top"
          isLocked={true}
          text="Краторная булка N-200i (верх)"
          price={1255}
          thumbnail="https://code.s3.yandex.net/react/code/bun-02.png"
        />
        <div className={"mt-4 mb-4 " + style.scrollable}>
          <DragIcon type="primary" />
          <ConstructorElement
            isLocked={false}
            text="Соус традиционный галактический"
            price={15}
            thumbnail="https://code.s3.yandex.net/react/code/sauce-03.png"
          />
          <DragIcon type="primary" />
          <ConstructorElement
            isLocked={false}
            text="Мясо бессмертных моллюсков Protostomia"
            price={1337}
            thumbnail="https://code.s3.yandex.net/react/code/meat-02.png"
          />
          <DragIcon type="primary" />
          <ConstructorElement
            isLocked={false}
            text="Плоды Фалленианского дерева"
            price={874}
            thumbnail="https://code.s3.yandex.net/react/code/sp_1.png"
          />
          <DragIcon type="primary" />
          <ConstructorElement
            isLocked={false}
            text="Хрустящие минеральные кольца"
            price={300}
            thumbnail="https://code.s3.yandex.net/react/code/mineral_rings.png"
          />
          <DragIcon type="primary" />
          <ConstructorElement
            isLocked={false}
            text="Хрустящие минеральные кольца"
            price={300}
            thumbnail="https://code.s3.yandex.net/react/code/mineral_rings.png"
          />
          <DragIcon type="primary" />
          <ConstructorElement
            isLocked={false}
            text="Хрустящие минеральные кольца"
            price={300}
            thumbnail="https://code.s3.yandex.net/react/code/mineral_rings.png"
          />
          <DragIcon type="primary" />
          <ConstructorElement
            isLocked={false}
            text="Хрустящие минеральные кольца"
            price={300}
            thumbnail="https://code.s3.yandex.net/react/code/mineral_rings.png"
          />
          <DragIcon type="primary" />
          <ConstructorElement
            isLocked={false}
            text="Хрустящие минеральные кольца"
            price={300}
            thumbnail="https://code.s3.yandex.net/react/code/mineral_rings.png"
          />
          <DragIcon type="primary" />
          <ConstructorElement
            isLocked={false}
            text="Соус с шипами Антарианского плоскоходца"
            price={88}
            thumbnail="https://code.s3.yandex.net/react/code/sauce-01.png"
          />
          <DragIcon type="primary" />
          <ConstructorElement
            isLocked={false}
            text="Кристаллы марсианских альфа-сахаридов"
            price={762}
            thumbnail="https://code.s3.yandex.net/react/code/core.png"
          />
          <DragIcon type="primary" />
          <ConstructorElement
            isLocked={false}
            text="Мини-салат Экзо-Плантаго"
            price={4400}
            thumbnail="https://code.s3.yandex.net/react/code/salad.png"
          />
        </div>
        <ConstructorElement
          extraClass="ml-8 mb-10"
          type="bottom"
          isLocked={true}
          text="Краторная булка N-200i (верх)"
          price={1255}
          thumbnail="https://code.s3.yandex.net/react/code/bun-02.png"
        />
        <div className={style.info}>
          <div className={style.pricecont}>
            <p className="text text_type_main-large mr-2">610</p>
            <CurrencyIcon />
          </div>
          <Button
            extraClass="ml-10"
            htmlType="button"
            type="primary"
            size="large"
          >
            Оформить заказ
          </Button>
        </div>
      </section>
    );
  }
}

export default BurgerConstructor;