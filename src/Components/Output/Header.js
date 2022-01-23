import classes from './Header.module.css';
import logo from '../../images/logo.PNG';

const Header = () => {
  return(
    <div className={classes.header}>
      <div>
        <img src={logo} className={classes.logo} id='logo'></img>
      </div>
      <div>
        <span className={classes.taxHeading}>TAX INVOICE</span>
        <span className={classes.contact}><i className="fas fa-phone-alt"></i>7982630514, 9971296033</span>
      </div>
      <div className={classes.name}>rishabh enterprises</div>
      <div>Deals In All Kinds Of Export Surplus Fabrics</div>
      <div className={classes.address}>IX/5022,First Floor, Gali No.01, Kaushik Puri, Old Seelampur, Gandhi Nagar, Delhi-110031</div>
      <div className={classes.gstin}>GSTIN : 07AEUPJ2563H1Z6</div>
    </div>
  )
}

export default Header;