import classes from './Footer.module.css';

const Footer = () => {
  return (
    <div className={classes.footer}>
      <div className={classes.t_c}>
        <span>TERMS AND CONDITIONS :-</span>
        <span className={classes.nameStyle}>For Rishabh enterprises</span>
      </div>
      <div className={classes.tc_item}>1.	Goods once sold will not be taken back</div>
      <div className={classes.tc_item}>2.	All disputes are subjected to Delhi Jurisdiction only. </div>
      <div className={classes.tc_item}>
        <span>3.	Interest @24%p.a. will be charged if payment is not made within 30 days.</span>
        <span className={classes.auth}>Auth. Signatory</span>
      </div>
    </div>
  )
}

export default Footer;
