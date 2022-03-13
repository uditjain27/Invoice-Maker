import Amount from './Amount';
import classes from './Canvas.module.css';
import DescriptionList from './DescriptionList';
import Footer from './Footer';
import Header from './Header';
import InfoTable from './Table';

const Canvas = (props) => {
  return (
    <div className={classes.canvas}>
      <Header></Header>
      <InfoTable
        sellerDetails={props.sellerDetails}
        invoiceNumber={props.invoiceNumber}
        invoiceDate={props.invoiceDate}
      ></InfoTable>
      <DescriptionList details={props.details}
      description={props.sellerDetails.description}/>
      <Amount amount={props.details} />
      <Footer></Footer>
    </div>
  )
}

export default Canvas;