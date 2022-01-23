import AllInputs from "./Input/AllInputs";
import SampleOutput from "./Output/SampleOutput";

import classes from './HomePage.module.css';
import { data } from "./DataBase";
import { useState } from "react";

const HomePage = (props) => {

  const [selectedSeller, setSeller] = useState({});
  const [productDetails, setProductDetails] = useState({});
  const [invoiceDate, setInvoiceDate] = useState('2022-01-01');
  const [invoiceNumber, setInvoiceNumber] = useState();

  const selectSeller = (seller) => {
    setSeller(seller);
  }

  const setDetails = (detailsObj) => {
    setProductDetails(detailsObj);
  }

  const setDate = (date) => {
    setInvoiceDate(date);
  }

  const setNumber = (number) => {
    setInvoiceNumber(number);
  }

  return (
    <div className={classes.full_width}>
      <h1 className={classes.h1}>Welcome to billing page</h1>
      <div>
        <AllInputs
          sellerData={data}
          selectSeller={selectSeller}
          setDetails={setDetails}
          setDate={setDate}
          setNumber={setNumber}
        />
        <SampleOutput
          details={productDetails}
          sellerDetails={selectedSeller}
          productDetails={productDetails}
          invoiceNumber={invoiceNumber}
          invoiceDate={invoiceDate}
        />
      </div>
    </div>
  );
}

export default HomePage;