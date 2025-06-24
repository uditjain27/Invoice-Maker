import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { useRef, useState } from 'react';
import style from '../HomePage.module.css';
import classes from './AllInputs.module.css';


const AllInputs = (props) => {

  const dateRef = useRef();
  const invoiceRef = useRef();
  const descriptionRef = useRef();
  const codeRef = useRef();
  const quantityRef = useRef();
  const rateRef = useRef();
  const totalRef = useRef();
  const cgstRef = useRef();
  const sgstRef = useRef();
  const igstRef = useRef();
  const otherChargesRef = useRef();
  const roundOffRef = useRef();
  const grandTotalRef = useRef();

  const [amountDescription, setAmountDescription] = useState({});
  const [seller, setSeller] = useState({ id: 0 });
  const [invoiceNumber, setInvoiceNumber] = useState(0);

  const generatePDF = function () {
    const element = document.getElementById('output');
    const logo = document.getElementById('logo');
    logo.style.right = '570px';
    html2canvas(element, {
      scale: 2,
    }).then((canvas) => {
      const image = canvas.toDataURL('image/png');
      logo.style.right = '550px';
      const pdf = new jsPDF("p", "mm", "a4", true);
      const width = pdf.internal.pageSize.getWidth();
      const height = pdf.internal.pageSize.getHeight();
      pdf.addImage(image, 'JPEG', 0, 0, width, height);
      pdf.save(`${invoiceNumber}-${seller.name}.pdf`);
    }).catch(function (error) {
      console.log(error);
    })
  }

  const selectSeller = () => {
    const list = document.getElementById('sellerInfo');
    const id = list.options[list.selectedIndex].value;
    const arr = props.sellerData.filter((ele) => ele.id == id);
    setSeller(arr[0]);
    props.selectSeller(arr[0]);
  }

  const dateOffFocus = function () {
    props.setDate(dateRef.current.value);
  }

  const numberOffFocus = function () {
    setInvoiceNumber(invoiceRef.current.value);
    props.setNumber(invoiceRef.current.value);
  }

  const enterDetails = function () {
    if (seller.id === 0 || invoiceRef.current.value === '' || dateRef.current.value === '') {
      return;
    }
    document.querySelector('#sellerName').style.display = 'none';
    document.querySelector('#description-details').style.display = 'block';
    document.getElementById('calc-amount').style.display = 'block';
  }

  const calculateAmountDescription = function () {
    const quantity = parseFloat(quantityRef.current.value.replace(/[^\d.-]/g, ''));
    const rate = rateRef.current.value;
    if (quantityRef.current.value === '' || rate === '') {
      return;
    }
    var total = quantity * rate;
    total = parseFloat(total.toFixed(2));
    var tax = total * 0.05;
    tax = parseFloat(tax.toFixed(2));
    const desc = {
      id: 1,
      description: descriptionRef.current.value,
      hsn: codeRef.current.value,
      quantity: quantityRef.current.value,
      rate: rate,
      total: total,
      tax: {
        cgst: seller.stateCode == 7 ? tax / 2 : 0,
        sgst: seller.stateCode == 7 ? tax / 2 : 0,
        igst: seller.stateCode == 7 ? 0 : tax
      },
      other: 0,
      roundOff: 0,
      grandTotal: total + tax
    };
    setAmountDescription(desc);
    props.setDetails(desc);
    document.querySelector('#amount-description').style.display = 'block';
    document.querySelector('#generatePDF').style.display = 'block';
  }

  const totalOnChange = () => {
    var total = parseFloat(totalRef.current.value);
    total = parseFloat(total.toFixed(2));
    const tax = parseFloat((total * 0.05).toFixed(2));

    var prev = amountDescription;
    prev = {
      ...prev,
      total: total,
      tax: {
        ...prev.tax,
        cgst: tax / 2,
        sgst: tax / 2
      },
      grandTotal: prev.grandTotal - prev.tax.cgst - prev.tax.sgst - prev.total + total + tax,
    }
    setAmountDescription(prev);
    props.setDetails(prev);
  };
  const igstOnChange = () => {
    var prev = amountDescription;
    prev = {
      ...prev,
      tax: {
        ...prev.tax,
        igst: igstRef.current.value,
      },
      grandTotal: prev.grandTotal - (prev.tax.igst) + (igstRef.current.value)
    }
    setAmountDescription(prev);
    props.setDetails(prev);
  };
  const cgstOnChange = () => {
    var prev = amountDescription;
    prev = {
      ...prev,
      tax: {
        ...prev.tax,
        cgst: cgstRef.current.value,
        sgst: cgstRef.current.value
      },
      grandTotal: prev.grandTotal - (2 * prev.tax.cgst) + (2 * cgstRef.current.value)
    }
    setAmountDescription(prev);
    props.setDetails(prev);
  };
  const otherOnChange = () => {
    const otherC = parseFloat(otherChargesRef.current.value);
    var prev = amountDescription;
    prev = {
      ...prev,
      other: otherC,
      grandTotal: prev.grandTotal + otherC - prev.other
    }
    setAmountDescription(prev);
    props.setDetails(prev);
  };
  const roundOffOnChange = () => {
    const round = parseFloat(roundOffRef.current.value);
    var prev = amountDescription;
    prev = {
      ...prev,
      roundOff: round,
      grandTotal: prev.grandTotal - prev.roundOff + round
    }
    setAmountDescription(prev);
    props.setDetails(prev);
  };
  const grandTotalOnChange = () => {
    var prev = amountDescription;
    prev = {
      ...prev,
      grandTotal: parseFloat(grandTotalRef.current.value)
    }
    setAmountDescription(prev);
    props.setDetails(prev);
  };

  const radioOnChange = () => {
    const copytype = document.querySelector('input[name="copytype"]:checked');
    console.log(copytype);
    props.setType(copytype.value.toString());
  }

  return (
    <div className={style.half_width}>
      <form>
        <div id='sellerName'>
          <div>
            <label htmlFor='printType'>Copy Type : </label>
            <span>
              <input type='radio' value='buyer'  name='copytype' id='buyer' onChange={radioOnChange} checked={true}></input>
              <label htmlFor='buyer'>Buyer</label>
            </span>
            <span>
              <input type='radio' value='transporter' name='copytype' id='transporter' onChange={radioOnChange}></input>
              <label htmlFor='transporter'>Transporter</label>
            </span>
          </div>
          <div>
            <label htmlFor='seller'>Choose Seller : </label>
            <select name='seller' id='sellerInfo' onChange={selectSeller}>
              <option value='NULL' hidden defaultChecked>Select Seller</option>
              {props.sellerData.map((ele) => <option value={ele.id} key={ele.id}>{ele.name.toUpperCase()}</option>)}
            </select>
          </div>
          <div>
            <label htmlFor='invoiceNumber'>Select Invoice Number : </label>
            <input id='invoiceNumber' type='number' ref={invoiceRef} onBlur={numberOffFocus}></input>
          </div>
          <div>
            <label htmlFor='date'>Select Invoice Date : </label>
            <input id='date' type='date' ref={dateRef} onBlur={dateOffFocus}></input>
          </div>
          <button onClick={enterDetails} type='button'>Enter details</button>
        </div>
        <div className={classes.descriptionList} id='description-details'>
          <div>
            <label>Description : </label>
            <input type='text' ref={descriptionRef} defaultValue='COTTON FABRIC'></input>
          </div>
          <div>
            <label>HSN Code : </label>
            <input type='text' ref={codeRef}></input>
          </div>
          <div>
            <label>Quantity : </label>
            <input type='text' ref={quantityRef}></input>
          </div>
          <div>
            <label htmlFor=''>Rate : </label>
            <input type='number' ref={rateRef}></input>
          </div>
          <div className={classes.amountDescription} id='amount-description'>
            <div>
              <label htmlFor=''>Total : </label>
              <input type='number' ref={totalRef} defaultValue={amountDescription.total} onChange={totalOnChange}></input>
            </div>
            {
              seller.stateCode && seller.stateCode === 7 &&
              <div>
                <div>
                  <label htmlFor=''>CGST : </label>
                  <input type='number' ref={cgstRef} defaultValue={amountDescription.tax?.cgst} onChange={cgstOnChange}></input>
                </div><div>
                  <label htmlFor=''>SGST : </label>
                  <input type='number' ref={sgstRef} defaultValue={amountDescription.tax?.sgst} disabled></input>
                </div>
              </div>
            }
            {
              seller.stateCode && seller.stateCode !== 7 &&
              <div>
                <label htmlFor=''>IGST : </label>
                <input type='number' ref={igstRef} defaultValue={amountDescription.tax?.igst} onChange={igstOnChange}></input>
              </div>
            }
            <div>
              <label htmlFor=''>Other Charges : </label>
              <input type='number' ref={otherChargesRef} defaultValue={amountDescription.other} onChange={otherOnChange}></input>
            </div>
            <div>
              <label htmlFor=''>Round Off : </label>
              <input type='number' ref={roundOffRef} defaultValue={amountDescription.roundOff} onChange={roundOffOnChange}></input>
            </div>
            <div className={classes.grandTotal}>
              <label htmlFor=''>Grand Total : </label>
              <input type='number' ref={grandTotalRef} defaultValue={amountDescription.grandTotal} onChange={grandTotalOnChange}></input>
            </div>

          </div>
        </div>
      </form>
      <div className={classes.button}>
        <button id='calc-amount' className={classes.calc} type='button' onClick={calculateAmountDescription}>Calculate</button>
        <button id='generatePDF' className={classes.generatePDF} onClick={generatePDF}>Download</button>
      </div>
    </div>
  )
}

export default AllInputs;

