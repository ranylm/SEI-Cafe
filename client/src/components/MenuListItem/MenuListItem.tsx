import style from "./MenuListItem.module.css";

export default function MenuListItem({ menuItem, handleAddToOrder }) {
  return (
    <div className={style.MenuListItem}>
      <div className={style.emoji + " " + "flex-ctr-ctr"}>{menuItem.emoji}</div>
      <div className={style.name}>{menuItem.name}</div>
      <div className={style.buy}>
        <span>${menuItem.price.toFixed(2)}</span>
        <button
          className="btn-sm"
          onClick={() => handleAddToOrder(menuItem._id)}
        >
          ADD
        </button>
      </div>
    </div>
  );
}
