import React, { Fragment, useState, useEffect } from "react";
import { connect } from "react-redux";
import axios from "axios";
import { withRouter, Link } from "react-router-dom";
import { Card, Table } from '@themesberg/react-bootstrap';
import { getDayFormatFrom } from "./RevenueFunc";

import Navbar from "../../component/navbar/Navbar";
import Leftbar from "./Leftbar"
const serverURL = require("../../config.js").serverURL;

const Orders = (props) => {
  const [modal, setModal] = useState(false);

  const toogleModal = () => {
      setModal(!modal);
  };
  const [transactions, setTransactions] = useState([
    {
        "_id": 300500,
        "date": "Paid",
        "name": "Platinum Subscription Plan",
        "transactionLink": "http://",
        "price": "23324"
    },
  ]
  );

  useEffect(() => {
    axios
        .get(serverURL + "/checkout/getall")
        .then(res => {
          setTransactions(res.data);
        })
        .catch(err =>{
          console.log(err);
        });
  }, []);

  const TableRow = (props) => {
    const { _id, date, name, transactionLink, pay } = props;

    return (
      <tr>
        <td>
          <Card.Link as={Link} className="fw-normal text-white" to={"/orders/product/" + _id}>
            #{_id}
          </Card.Link>
        </td>
        <td>
          <span className="fw-normal show_oneline">
            {date} EDT
          </span>
        </td>
        <td>
          <span className="fw-normal">
            {name}
          </span>
        </td>
        <td>
          <select className="text-center">
            <option value="volvo">Unfulfilled</option>
            <option value="saab">Fulfilled</option>
          </select>
        </td>
        <td>
          <a className={`fw-normal`} href={transactionLink} target="_blank" rel="noreferrer">
            {transactionLink.length > 40 ? transactionLink.substring(0,40-3) + "..." : transactionLink }
          </a>
        </td>
        <td>
          <span className="fw-normal">
            {parseFloat(pay).toFixed(3)} ETH
          </span>
        </td>
      </tr>
    );
  };

  return (
    <Fragment>
      <div className="overflow-hidden bg__black min-height-100 position-relative">
        <Navbar toogleModal={toogleModal} type="canvas" />
        <div className="d-lg-flex wrapper__canvas ">
          <Leftbar activeItem={2}></Leftbar>
          <div className="content">
            <div className="container container__canvas">
              <div>
                <h5 className="bold font__size--24 text__24-1024 color__white mb-4 mt-1">
                  Orders
                </h5>
                <Card className="table-wrapper table-responsive shadow-sm wrapper__form-checkout overflow-auto">
                  <Card.Body className="pt-0">
                    <Table className="user-table align-items-center font__size--14">
                      <thead className="text-grey text-center">
                        <tr>
                          <th className="border-bottom">Order Number</th>
                          <th className="border-bottom">Date</th>
                          <th className="border-bottom">Customer</th>
                          <th className="border-bottom">Fulfillment status</th>
                          <th className="border-bottom">Transaction Link</th>
                          <th className="border-bottom">Total</th>
                        </tr>
                      </thead>
                      <tbody className="text-white text-center">
                        {
                          transactions.map(t => 
                            <TableRow 
                              key={`transaction-${t._id}`} {...t} 
                              date={getDayFormatFrom(new Date(t.date)) + ", "+ new Date(t.date).getHours() + ":" + new Date(t.date).getMinutes() } 
                              name={t.firstname + " " + t.lastname}/>
                          )
                        }
                      </tbody>
                    </Table>
                    <Card.Footer className="px-3 border-0 d-lg-flex align-items-center justify-content-between">
                      {/* <Nav>
                        <Pagination className="mb-2 mb-lg-0 ">
                          <Pagination.Prev>
                            Previous
                          </Pagination.Prev>
                          <Pagination.Item active>1</Pagination.Item>
                          <Pagination.Item>2</Pagination.Item>
                          <Pagination.Item>3</Pagination.Item>
                          <Pagination.Next>
                            Next
                          </Pagination.Next>
                        </Pagination>
                      </Nav> */}
                      <small className="fw-bold text-white">
                        Showing <b>{transactions.length}</b> out of <b>{transactions.length}</b> entries
                      </small>
                    </Card.Footer>
                  </Card.Body>
                </Card>

              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};
const mapStateToProps = state => ({
  wallet: state.wallet
});

export default connect(mapStateToProps, {})(withRouter(Orders));
