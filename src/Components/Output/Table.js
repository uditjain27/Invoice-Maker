import classes from './Table.module.css';

const InfoTable = (props) => {
  const dateArr = props.invoiceDate?.split('-');
  return (
    <div className={classes.wrapper}>
      <div className={classes.first}>
        <div>
          <span>
            <span>Name : &nbsp;</span>
            <span className={classes.bold}>{props.sellerDetails.name}</span>
          </span>
          <span>
            <span>Address : &nbsp;</span>
            <span className={classes.bold}>{props.sellerDetails.address}</span>
          </span>
          <span>
            <span>
              <span>Contact Number :&nbsp;</span>
              <span className={classes.bold}>{props.sellerDetails.contactNo == 'NULL' ? '' : props.sellerDetails.contactNo}</span>
            </span>
            <span>
              <span>State : &nbsp;</span>
              <span className={classes.bold}>{props.sellerDetails.state}</span>
            </span>
            <span>
              <span>State Code :&nbsp;</span>
              <span className={classes.bold}>{props.sellerDetails.stateCode < 10 ? '0'+props.sellerDetails.stateCode : props.sellerDetails.stateCode}</span>
            </span>
          </span>
          <span>
            <span>
              {props.sellerDetails.gstin !== 'NULL' ? 'GSTIN' : 'AADHAR NUMBER'} : &nbsp;
            </span>
            <span className={classes.bold}>{props.sellerDetails.gstin === 'NULL' ? props.sellerDetails.aadhar : props.sellerDetails.gstin}</span>
          </span>
        </div>
        <div className={classes.invoice}>
          <span>
            <span>
              Invoice Number : &nbsp;
            </span>
            <span className={classes.bold}>
              {props.invoiceNumber}
            </span>
          </span>
          <br/>
          <br/>
          <span>
            <span>
              Invoice Date : &nbsp;
            </span>
            <span className={classes.bold}>
              {dateArr[2]}/{dateArr[1]}/{dateArr[0]}<br />
            </span>
          </span>
        </div>
      </div>
      <div className={classes.second}>
        <span>GR/LR No. : </span>
        <span>Place of Supply :&nbsp;
          <span className={classes.bold}>{props.sellerDetails.placeOfSupply ? props.sellerDetails.placeOfSupply : props.sellerDetails.state}</span>
        </span>
        <span>Dated :
          <span className={classes.bold}>
            {dateArr[2]}/{dateArr[1]}/{dateArr[0]}
          </span>
        </span>
      </div>
      <div className={classes.third}>
        <span>
          <span>Transporter : </span>
          <span className={classes.bold}>{props.sellerDetails.transporter ? props.sellerDetails.transporter : ''}</span>
        </span>
        <span>Vehicle No. : </span>
        <span>Station : </span>
      </div>
    </div>
  )
}

export default InfoTable;