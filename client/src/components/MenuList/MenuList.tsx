import style from "./MenuList.module.css";
import MenuListItem from "../MenuListItem/MenuListItem";
import { useAutoAnimate } from "@formkit/auto-animate/react";

export default function MenuList({ menuItems, handleAddToOrder }) {
  const [parent] = useAutoAnimate();
  const items = menuItems.map((item) => (
    <MenuListItem
      key={item._id}
      handleAddToOrder={handleAddToOrder}
      menuItem={item}
    />
  ));
  return (
    <main ref={parent} className={style.MenuList}>
      {items}
    </main>
  );
}
