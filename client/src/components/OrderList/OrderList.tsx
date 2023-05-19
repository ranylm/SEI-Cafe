import OrderListItem from "../OrderListItem/OrderListItem";
import style from "./OrderList.module.css";
import { useAutoAnimate } from "@formkit/auto-animate/react";

export default function OrderList({ orders, activeOrder, handleSelectOrder }) {
  const [parent] = useAutoAnimate();
  const orderItems = orders.map((o) => (
    <OrderListItem
      order={o}
      isSelected={o === activeOrder}
      handleSelectOrder={handleSelectOrder}
      key={o._id}
    />
  ));

  return (
    <main ref={parent} className={style.OrderList}>
      {orderItems.length ? (
        orderItems
      ) : (
        <span className={style.noOrders}>No Previous Orders</span>
      )}
    </main>
  );
}
