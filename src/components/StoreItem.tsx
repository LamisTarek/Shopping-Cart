import { Card } from "react-bootstrap";
import { formatCurrency } from "../utilities/formatCurrency";
import { useShoppingCart } from "../context/ShoppingCartContext";

type StoreItemProps = {
  id: number;
  name: string;
  price: number;
  imgUrl: string;
};

function StoreItem({ id, name, price, imgUrl }: StoreItemProps) {
  const {
    getItemQuantity,
    incrementItemQuantity,
    decrementItemQuantity,
    removeItem,
  } = useShoppingCart();

  const quantity = getItemQuantity(id);
  return (
    <Card>
      <Card.Img
        variant="top"
        src={imgUrl}
        height="200px"
        style={{ objectFit: "cover" }}
      />
      <Card.Body className="d-flex flex-column">
        <Card.Title className="d-flex justify-content-between mb-4 align-items-baseline">
          <span className="fs-4">{name}</span>
          <span className="ms-2 text-muted">{formatCurrency(price)}</span>
        </Card.Title>
        <div className="mt-auto">
          {quantity === 0 ? (
            <button
              className="btn btn-primary w-100"
              onClick={() => incrementItemQuantity(id)}
            >
              + Add to Cart
            </button>
          ) : (
            <div className="d-flex align-items-center justify-content-center flex-column">
              <div
                className="d-flex align-items-center justify-content-center"
                style={{ gap: ".5rem" }}
              >
                <button
                  className="btn btn-primary btn-md"
                  onClick={() => decrementItemQuantity(id)}
                >
                  -
                </button>
                <span className="mx-2">{quantity} in cart</span>
                <button
                  className="btn btn-primary btn-md"
                  onClick={() => incrementItemQuantity(id)}
                >
                  +
                </button>
              </div>
              <button
                className="btn btn-danger btn-md mb-3"
                onClick={() => removeItem(id)}
              >
                Remove
              </button>
            </div>
          )}
        </div>
      </Card.Body>
    </Card>
  );
}

export default StoreItem;
