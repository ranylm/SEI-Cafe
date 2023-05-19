import style from "./OrderDetail.module.css";
import LineItem from "../LineItem/LineItem";
import { useAutoAnimate } from "@formkit/auto-animate/react";

// Used to display the details of any order, including the cart (unpaid order)
export default function OrderDetail({
  order,
  handleChangeQty,
  handleCheckout,
}: {
  order: {
    lineItems: { _id: number }[];
    isPaid: boolean;
    orderId: number;
    updatedAt: number;
    totalQty: number;
    orderTotal: number;
  } | null;
  handleChangeQty?: (itemId: number, newQty: number) => Promise<void>;
  handleCheckout?: () => void;
}) {
  const [parent] = useAutoAnimate();
  if (!order) return null;

  const lineItems = order.lineItems.map((item) => (
    <LineItem
      lineItem={item}
      isPaid={order.isPaid}
      handleChangeQty={handleChangeQty}
      key={item._id}
    />
  ));

  return (
    <div className={style.OrderDetail}>
      <div className={style.sectionHeading}>
        {order.isPaid ? (
          <span>
            ORDER <span className="smaller">{order.orderId}</span>
          </span>
        ) : (
          <span>NEW ORDER</span>
        )}
        <span>{new Date(order.updatedAt).toLocaleDateString()}</span>
      </div>
      <div
        ref={parent}
        className={`${style.lineItemContainer} flex-ctr-ctr flex-col scroll-y`}
      >
        {lineItems.length ? (
          <>
            {lineItems}
            <section className={style.total}>
              {order.isPaid ? (
                <span className={style.right}>TOTAL&nbsp;&nbsp;</span>
              ) : (
                <button
                  className="btn-sm"
                  onClick={handleCheckout}
                  disabled={!lineItems.length}
                >
                  CHECKOUT
                </button>
              )}
              <span>{order.totalQty}</span>
              <span className={style.right}>
                ${order.orderTotal.toFixed(2)}
              </span>
            </section>
          </>
        ) : (
          <div className={style.hungry}>Hungry?</div>
        )}
      </div>
    </div>
  );
}
