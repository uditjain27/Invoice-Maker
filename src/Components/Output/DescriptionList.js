import classes from './DescriptionList.module.css';

const DescriptionList = (props) => {
  var dec = props.details.total - Math.floor(props.details.total);
  dec = dec.toFixed(2);
  dec = dec.toString().split('.');
  if(dec.length == 1){
    dec = '00';
  }else{
    dec = parseFloat(dec[1]);
    dec = dec.toString().padStart(2, '0');
  }

  return(
    <div className={classes.wrapper}>
      <section className={classes.tableHeadings}>
        <span>S.No.</span>
        <span>Description of goods</span>
        <span>HSN Code</span>
        <span>Quantity</span>
        <span>rate</span>
        <span>amount
          <br/>
          Rs. &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;P.
        </span>
      </section>
      <section className={`${classes.tableHeadings} ${classes.tableItems}`}>
        <span>{props.details.id}</span>
        <span>{props.details.description}</span>
        <span>{props.details.hsn}</span>
        <span>{props.details.quantity}</span>
        <span>{props.details.rate}/-</span>
        <span>{parseInt(props.details?.total).toLocaleString('en-IN') == 'NaN' ? '00' : parseInt(props.details?.total).toLocaleString('en-IN')}</span>
        <span>{dec}</span>
      </section>
    </div>
  )
}

export default DescriptionList;