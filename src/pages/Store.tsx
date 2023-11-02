import dataItems from "../data/items.json";
import { Row, Col } from "react-bootstrap";
import StoreItem from "../components/StoreItem";

function Store() {
  return (
    <div>
      <h2>Store</h2>
      <Row xs={1} md={2} lg={3} className="g-4">
        {dataItems.map((item) => (
          <Col key={item.id}>
            <StoreItem {...item} />
          </Col>
        ))}
      </Row>
    </div>
  );
}

export default Store;
