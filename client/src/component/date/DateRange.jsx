import React, { useState } from "react";
import DateRangePicker from "react-daterange-picker";
import "react-daterange-picker/dist/css/react-calendar.css";
import originalMoment from "moment";
import { extendMoment } from "moment-range";
import './styles.css';

const moment = extendMoment(originalMoment);

const DateRange = (props)=>{
  const [isOpen,setIsOpen] = useState(false);
  const [value,setValue] = useState(moment.range(moment().clone().subtract(1, "months"), moment().clone()));

  const onSelect = (value, states) => {
    setValue(value);
  };

  const onToggle = () => {
    setIsOpen(!isOpen);
    if(isOpen){
      props.dateChange(value);
    }
  };

  return (
    <div>
      <div style={{display:'flex'}}>
        <div className ="date-toggler button" onClick={onToggle} style={{ width: '250px'}}>
          <img src="/icons/calenderi.svg" style={{ marginRight: '4px'}} alt={""}/>
          <span className="text-white">
            {value.start.format("MMM DD, YYYY")}
            {" - "}
            {value.end.format("MMM DD, YYYY")}
        </span>
        </div>
      {isOpen && (<button className="b__date text-white ml-2" onClick={onToggle}>Apply</button>)}
      </div>
      {isOpen && (
        <div className="date-range">
          <DateRangePicker
            value={value}
            onSelect={onSelect}
            singleDateRange={true}
          />
        </div>
      )}
    </div>
  );
}

export default DateRange;
