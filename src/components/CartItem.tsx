import { Button, Stack } from "react-bootstrap";
import { useShoppingCart } from "../context/ShoppingCartContext";
import storeItems from "../data/items.json";
import { formatCurrency } from "../utilities/formatCurrency";
type CartItemProps = {
  id: number;
  quantity: number;
};

function CartItem({ id, quantity }: CartItemProps) {
  const { removeItem } = useShoppingCart();
  const item = storeItems.find((item) => item.id === id);
  if (!item) {
    return null;
  }

  return (
    <Stack direction="horizontal" gap={3} className="d-felx align-items-center">
      <img
        src={item.imgUrl}
        alt={item.name}
        style={{ objectFit: "cover", width: "125px", height: "75px" }}
      />
      <div className="me-auto">
        <div>
          {item.name}
          <span className="text-muted mx-1" style={{ fontSize: ".65rem" }}>
            ×{quantity}{" "}
          </span>
        </div>
        <div className="text-muted">{formatCurrency(item.price)}</div>
      </div>
      <div>{formatCurrency(item.price*quantity)}</div>
      <Button variant="outline-danger" size="sm" onClick={() => removeItem(id)}>

    </Stack>
  );
}

export default CartItem;
