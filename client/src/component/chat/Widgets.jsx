
import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown, faAngleUp } from '@fortawesome/free-solid-svg-icons';
import { Col, Row, Card, Button } from '@themesberg/react-bootstrap';
import { SalesValueChart, SalesValueChartphone } from "./Charts";


export const CounterWidget = (props) => {
  const { category, title, percentage } = props;
  // const percentageIcon = percentage < 0 ? faAngleDown : faAngleUp;
  const percentageColor = percentage < 0 ? "text-danger" : "text-success";

  return (
    <Card className="shadow-sm wrapper__form-checkout p-1">
      <Card.Body>
        <Row className="d-block d-xl-flex align-items-center">
          <Col xs={12} xl={12} className="px-xl-0">
            <div className="d-none d-sm-block text-center">
              <span className="text-grey">{category}</span>
              <h5 className="mb-1 text-white">{title} ETH</h5>
            </div>
            <div className="small mt-2 text-center" style={{height: "20px"}}>
              <span className={`${percentageColor} fw-bold`} >
                {
                  category !== "Daily AVG" ? (percentage < 100) ? ( "-" + percentage +" %" ) : ( "+" + (percentage - 100) + " %" ) : ""
                }
              </span>
            </div>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

export const SalesValueWidget = (props) => {
  const { title, value } = props;

  return (
    <Card className="bg-secondary-alt shadow-sm">
      <Card.Header className="d-flex flex-row align-items-center flex-0">
        <div className="d-block">
          <h5 className="fw-normal mb-2">
            {title}
          </h5>
          <h3>${value}</h3>
        </div>
        <div className="d-flex ms-auto">
          <Button variant="secondary" size="sm" className="me-2">Month</Button>
          <Button variant="primary" size="sm" className="me-3">Week</Button>
        </div>
      </Card.Header>
      <Card.Body className="p-2">
        <SalesValueChart />
      </Card.Body>
    </Card>
  );
};

export const SalesValueWidgetPhone = (props) => {
  const { title, value, percentage } = props;
  const percentageIcon = percentage < 0 ? faAngleDown : faAngleUp;
  const percentageColor = percentage < 0 ? "text-danger" : "text-success";

  return (
    <Card className="bg-secondary-alt shadow-sm">
      <Card.Header className="d-md-flex flex-row align-items-center flex-0">
        <div className="d-block mb-3 mb-md-0">
          <h5 className="fw-normal mb-2">
            {title}
          </h5>
          <h3>${value}</h3>
          <small className="fw-bold mt-2">
            <span className="me-2">Yesterday</span>
            <FontAwesomeIcon icon={percentageIcon} className={`${percentageColor} me-1`} />
            <span className={percentageColor}>
              {percentage}%
            </span>
          </small>
        </div>
        <div className="d-flex ms-auto">
          <Button variant="secondary" size="sm" className="me-2">Month</Button>
          <Button variant="primary" size="sm" className="me-3">Week</Button>
        </div>
      </Card.Header>
      <Card.Body className="p-2">
        <SalesValueChartphone />
      </Card.Body>
    </Card>
  );
};

