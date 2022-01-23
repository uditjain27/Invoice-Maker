import classes from './Amount.module.css';

const Amount = (props) => {

  const func = function (amount) {
    var i = amount - Math.floor(amount);
    i = i.toFixed(2);
    i = i.toString().split('.');
    if (i.length == 1) {
      i = '00';
    } else {
      i = parseFloat(i[1]);
      i = i.toString().padStart(2, '0');
    }
    return i;
  }

  function inWords(num) {
    var a = ['', 'one ', 'two ', 'three ', 'four ', 'five ', 'six ', 'seven ', 'eight ', 'nine ', 'ten ', 'eleven ', 'twelve ', 'thirteen ', 'fourteen ', 'fifteen ', 'sixteen ', 'seventeen ', 'eighteen ', 'nineteen '];
    var b = ['', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'];
    if(num === undefined) return;
    if ((num = num.toString()).length > 9) return 'overflow';
    var n = ('000000000' + num).substr(-9).match(/^(\d{2})(\d{2})(\d{2})(\d{1})(\d{2})$/);
    if (!n) return; 
    var str = '';
    str += (n[1] != 0) ? (a[Number(n[1])] || b[n[1][0]] + ' ' + a[n[1][1]]) + 'crore ' : '';
    str += (n[2] != 0) ? (a[Number(n[2])] || b[n[2][0]] + ' ' + a[n[2][1]]) + 'lakh ' : '';
    str += (n[3] != 0) ? (a[Number(n[3])] || b[n[3][0]] + ' ' + a[n[3][1]]) + 'thousand ' : '';
    str += (n[4] != 0) ? (a[Number(n[4])] || b[n[4][0]] + ' ' + a[n[4][1]]) + 'hundred ' : '';
    str += (n[5] != 0) ? ((str != '') ? 'and ' : '') + (a[Number(n[5])] || b[n[5][0]] + ' ' + a[n[5][1]]) : '';
    str += 'rupees only'; 
    return str;
  }

  return (
    <div className={classes.wrapper}>
      <div className={classes.left}>
        <span>Rupees (in words) :&nbsp;
          <span className={classes.amountInWords}>
            {inWords(props.amount?.grandTotal)}
          </span>
        </span>
        <span className={classes.bankDetails}>
          BANK: AXIS BANK LTD.<br />
          BRANCH : KRISHNA NAGAR, DELHI-51<br />
          C. A/C. No.-916020065513404<br />
          IFS CODE- UTIB0000166</span>
      </div>
      <div className={classes.right}>
        <div>
          <span>TOTAL VALUE BEFORE ADDING GST</span>
          <span className={classes.bold}>{parseInt(props.amount?.total).toLocaleString('en-IN') == 'NaN' ? '00' : parseInt(props.amount?.total).toLocaleString('en-IN')}</span>
          <span className={classes.bold}>{func(props.amount.total)}</span>
        </div>
        <div>
          <span>OTHER CHARGES/FREIGHT</span>
          <span className={classes.bold}>{parseInt(props.amount?.other).toLocaleString('en-IN') == 'NaN' ? '00' : parseInt(props.amount?.other).toLocaleString('en-IN')}</span>
          <span className={classes.bold}>{func(props.amount.other)}</span>
        </div>
        <div>
          <span>ADD: CGST@ {(props.amount?.tax?.cgst == undefined || props.amount?.tax?.cgst == 0) ? '……….……..' : <span className={classes.bold}>2.5&nbsp;</span>}%</span>
          <span className={classes.bold}>{parseInt(props.amount?.tax?.cgst).toLocaleString('en-IN') == 'NaN' ? '00' : parseInt(props.amount?.tax?.cgst).toLocaleString('en-IN')}</span>
          <span className={classes.bold}>{func(props.amount.tax?.cgst)}</span>
        </div>
        <div>
          <span>ADD: SGST@ {(props.amount?.tax?.sgst == undefined || props.amount?.tax?.sgst == 0) ? '……….……..' : <span className={classes.bold}>2.5&nbsp;</span>}%</span>
          <span className={classes.bold}>{parseInt(props.amount?.tax?.sgst).toLocaleString('en-IN') == 'NaN' ? '00' : parseInt(props.amount?.tax.sgst).toLocaleString('en-IN')}</span>
          <span className={classes.bold}>{func(props.amount.tax?.sgst)}</span>
        </div>
        <div>
          <span>ADD: IGST@ {(props.amount?.tax?.igst == undefined || props.amount?.tax?.igst == 0) ? '……….……..' : <span className={classes.bold}>5&nbsp;</span>}%</span>
          <span className={classes.bold}>{parseInt(props.amount?.tax?.igst).toLocaleString('en-IN') == 'NaN' ? '00' : parseInt(props.amount?.tax?.igst).toLocaleString('en-IN')}</span>
          <span className={classes.bold}>{func(props.amount.tax?.igst)}</span>
        </div>
        <div>
          <span>ROUND OFF</span>
          <span className={classes.bold}>{parseInt(props.amount?.roundOff).toLocaleString('en-IN') == 'NaN' ? '00' : parseInt(props.amount?.roundOff).toLocaleString('en-IN')}</span>
          <span className={classes.bold}>{func(props.amount.roundOff)}</span>
        </div>
        <div>
          <span>GRAND TOTAL</span>
          <span className={classes.bold}>{parseInt(props.amount?.grandTotal).toLocaleString('en-IN') == 'NaN' ? '00' : parseInt(props.amount?.grandTotal).toLocaleString('en-IN')}</span>
          <span className={classes.bold}>{func(props.amount.grandTotal)}</span>
        </div>
      </div>
    </div>
  )
}

export default Amount;