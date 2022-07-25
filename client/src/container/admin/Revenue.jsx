import React, { Fragment, useState, useEffect } from "react";
import { connect } from "react-redux";
import axios from "axios";
import { withRouter } from "react-router-dom";
import { Col, Row } from '@themesberg/react-bootstrap';
import { faCashRegister } from '@fortawesome/free-solid-svg-icons';
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import moment from "moment";


import { CounterWidget } from "../../component/chat/Widgets";
import DateRangeExample from "../../component/date/DateRange";
import { getDailyAvg, getDataByDay, getTotalRevenueFrom, drawComma, getMonthAgoPrice, getWeekAgo, getDayAgoPrice, getDataBetween} from "./RevenueFunc";
import Navbar from "../../component/navbar/Navbar";
import Leftbar from "./Leftbar"

const serverURL = require("../../config.js").serverURL;

const Revenue = (props) => {
    const [modal, setModal] = useState(false);
    const [totalRevenue, setTotalRevenue] = useState(0);
    const [totalData, setTotalData] = useState([]);
    const [data, setData] = useState([]);
    const [dailyAvg, setDailyAvg] = useState(0);
    const [priceWeek, setPriceWeek] = useState(0);
    const [priceToday, setPriceToday] = useState(0);
    const [priceMonth, setPriceMonth] = useState(0);
    const [priceQuarterly, setPriceQuarterly] = useState(0);
    const [startDate, setStartDate] = useState(moment().subtract(1, "months").format('YYYY-MM-DD'));
    const [endDate, setEndDate] = useState(moment().format('YYYY-MM-DD'));
    const [percentageToday, setPercentageToday] = useState(0);
    const [percentageMonth, setPercentageMonth] = useState(0);
  
    const toogleModal = () => {
        setModal(!modal);
    };

    useEffect(() => {
      axios
          .get(serverURL + "/checkout/getall")
          .then(res => {
                setTotalData(res.data);
                
                const data = getDataBetween(startDate, endDate, res.data);
                setData(getDataByDay(data));
                setTotalRevenue(getTotalRevenueFrom(res.data));
                setDailyAvg(getDailyAvg(res.data));
                setPriceToday(getDayAgoPrice(res.data, 0));
                setPriceMonth(getMonthAgoPrice(res.data, 0));
                setPriceQuarterly(getMonthAgoPrice(res.data, 12));
                setPercentageToday(((getDayAgoPrice(res.data, 0) / getDayAgoPrice(res.data, 1)) * 100).toFixed(0));
                console.log(getMonthAgoPrice(res.data, 0));
                console.log(getMonthAgoPrice(res.data, 1));
                setPercentageMonth(((getMonthAgoPrice(res.data, 0) / getMonthAgoPrice(res.data, 1)) * 100).toFixed(0));
          })
          .catch(err =>{
            console.log(err);
          });
    }, []);

    const onDateChange = ( val )=>{
        setStartDate(val.start.format("YYYY-MM-DD"));
        setEndDate(val.end.format("YYYY-MM-DD"));
        setData(getDataByDay(getDataBetween(val.start, val.end, totalData)));
    }

     return (
        <Fragment>
            <div className="overflow-hidden bg__black min-height-100 position-relative">
                <Navbar toogleModal={toogleModal} type="canvas" />
                <div className="d-lg-flex wrapper__canvas ">
                    <Leftbar activeItem={3}></Leftbar>
                    <div className="content">
                        <Row >
                            <Col xs={12}>
                                <span className="text-white font__size--24 bold">Revenue</span>
                                <div className="b__date float-right mr-4">
                                    <DateRangeExample dateChange={onDateChange}/>
                                </div>
                            </Col>
                        </Row>
                        <Row className="justify-content-md-center wrapper__form-checkout m-2">
                            <Col xs={12} className="mb-4 d-none d-sm-block p-4">
                                <Row>
                                    <Col xs={12}>
                                        <span className="text-white">Total Revenue</span>
                                        <span className="text-green float-right">{ (percentageMonth < 100) ? ( "-" + percentageMonth ) : ( "+" + (percentageMonth - 100) ) } %</span>
                                    </Col>
                                </Row>
                                <Row className="mt-2">
                                    <Col xs={12}>
                                        <span className="text-dark-yellow font__size--24 bold">{totalRevenue} ETH</span>
                                        <span className="text-grey float-right">30 days ago</span>
                                    </Col>
                                </Row>
                                <div className="line-chart-wrapper mt-2">
                                    <LineChart
                                        width={1200} height={400} data={data}
                                        margin={{ top: 0, right: 40, bottom: 20, left: 20 }}
                                    >
                                        <CartesianGrid vertical={false} />
                                        <XAxis dataKey="date" label="" />
                                        <YAxis domain={['auto', 'auto']} label="" />
                                        <Tooltip
                                            wrapperStyle={{
                                                borderColor: 'white',
                                                boxShadow: '2px 2px 3px 0px rgb(204, 204, 204)',
                                            }}
                                            contentStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.8)' }}
                                            labelStyle={{ fontWeight: 'bold', color: '#666666' }}
                                        />
                                        <Line dataKey="price" stroke="#6DC2D4" dot={false} />
                                        {/* <Brush dataKey="date" startIndex={data.length - 40}>
                                            <AreaChart>
                                                <CartesianGrid />
                                                <YAxis hide domain={['auto', 'auto']} />
                                                <Area dataKey="price" stroke="#ff7300" fill="#ff7300" dot={false} />
                                            </AreaChart>
                                        </Brush> */}
                                    </LineChart>
                                </div>
                            </Col>

                            <Col xs={6} sm={3} xl={3} className="mb-4">
                                <CounterWidget
                                    category="Daily AVG"
                                    title={drawComma(dailyAvg)}
                                    period="Feb 1 - Apr 1"
                                    icon={faCashRegister}
                                    iconColor="shape-tertiary"
                                />
                            </Col>
                            <Col xs={6} sm={3} xl={3} className="mb-4">
                                <CounterWidget
                                    category="Today Revenue"
                                    title={drawComma(priceToday)}
                                    period="Feb 1 - Apr 1"
                                    percentage={percentageToday}
                                    icon={faCashRegister}
                                    iconColor="shape-tertiary"
                                />
                            </Col>
                            <Col xs={6} sm={3} xl={3} className="mb-4">
                                <CounterWidget
                                    category="This Month Revenue"
                                    title={drawComma(priceMonth)}
                                    period="Feb 1 - Apr 1"
                                    percentage={percentageMonth}
                                    icon={faCashRegister}
                                    iconColor="shape-tertiary"
                                />
                            </Col>
                            <Col xs={6} sm={3} xl={3} className="mb-4">
                                <CounterWidget
                                    category="Quarterly Avg"
                                    title={drawComma(priceQuarterly)}
                                    period="Feb 1 - Apr 1"
                                    percentage={28.4}
                                    icon={faCashRegister}
                                    iconColor="shape-tertiary"
                                />
                            </Col>
                        </Row>
                    </div>
                </div>
            </div>
        </Fragment>
    );
};
const mapStateToProps = state => ({
  wallet: state.wallet
});

export default connect(mapStateToProps, {})(withRouter(Revenue));
