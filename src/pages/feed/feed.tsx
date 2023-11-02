import React, { useEffect, FC } from "react";
import { useDispatch, useSelector } from "../../services/types/index";
import { OrderCard } from "../../components/order-card/order-card";
import {
  wsPublicConnectionClose,
  wsPublicConnectionStart,
} from "../../services/actions/ws-public";
import {
  maxOrdersInColumn,
  maxOrdersInList,
  edgeOrderNumber,
} from "../../services/types/data";
import style from "./feed.module.css";

export const Feed: FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(wsPublicConnectionStart());

    return () => {
      dispatch(wsPublicConnectionClose());
    };
  }, [dispatch]);

  const ordersPublicData = useSelector(
    (store) => store.wsPublic.ordersPublicData
  );

  const ordersDone = ordersPublicData?.orders?.map((el) => {
    let count = 0;
    if (el.status === "done" && count < maxOrdersInList) {
      count += 1;
      return el;
    }
  });
  const ordersPending = ordersPublicData?.orders?.map((el) => {
    let count = 0;
    if (el.status !== "done" && el.status !== 'created' && count < maxOrdersInList) {
      count += 1;
      return el;
    }
  });

  return (
    <section className={style.section}>
      <p className={"text text_type_main-large mt-10 mb-5 " + style.title}>
        Лента заказов
      </p>
      <div className={style.mainCont}>
        <div className={style.scrollableCont + " pr-2 mr-15"}>
          {ordersPublicData?.orders &&
            ordersPublicData.orders.map((el) => {
              return (
                <OrderCard
                  _id={el._id}
                  ingredients={el.ingredients}
                  createdAt={el.createdAt}
                  name={el.name}
                  status={el.status}
                  number={el.number}
                  owner={el.owner}
                  price={el.price}
                  updatedAt={el.updatedAt}
                  key={el._id}
                />
              );
            })}
        </div>
        <div>
          <div className={style.listsCont}>
            <div className={"mr-9 " + style.orderList}>
              <p className={"text text_type_main-medium mb-6"}>Готовы:</p>
              <ul
                className={style.list + " text text_type_digits-default mr-2 "}
              >
                {ordersDone &&
                  ordersDone.map((el, i) => {
                    if (i < maxOrdersInColumn)
                      return (
                        <li key={i} className={"mb-2 " + style.listItemDone}>
                          {el?.number}
                        </li>
                      );
                  })}
              </ul>
              <ul className={style.list + " text text_type_digits-default"}>
                {ordersDone &&
                  ordersDone.map((el, i) => {
                    if (i < maxOrdersInList && i > edgeOrderNumber)
                      return (
                        <li key={i} className={"mb-2 " + style.listItemDone}>
                          {el?.number}
                        </li>
                      );
                  })}
              </ul>
            </div>
            <div className={style.orderList}>
              <p className={"text text_type_main-medium mb-6"}>В работе:</p>
              <ul className={style.list + " text text_type_digits-default"}>
                {ordersPending &&
                  ordersPending.map((el, i) => {
                    if (i < maxOrdersInColumn)
                      return (
                        <li key={i} className={"mb-2 "}>
                          {el?.number}
                        </li>
                      );
                  })}
              </ul>
              <ul className={style.list + " text text_type_digits-default"}>
                {ordersPending &&
                  ordersPending.map((el, i) => {
                    if (i < maxOrdersInList && i > edgeOrderNumber)
                      return (
                        <li key={i} className={"mb-2 "}>
                          {el?.number}
                        </li>
                      );
                  })}
              </ul>
            </div>
          </div>
          <div>
            <p className="mt-15 text text_type_main-medium">
              Выполнено за все время:
            </p>
            <p className={"text text_type_digits-large " + style.shining}>
              {ordersPublicData?.total}
            </p>
          </div>
          <div>
            <p className="mt-15 text text_type_main-medium">
              Выполнено за сегодня:
            </p>
            <p className={"text text_type_digits-large " + style.shining}>
              {ordersPublicData?.totalToday}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
