import style from '../HomePage.module.css';
import Canvas from './Canvas';
import classes from './SampleOutput.module.css';

const SampleOutput = (props) => {
  // const copyType = 'TRANSPORTER';
  const copyType = 'BUYER';
  return (
    <div className={style.half_width} id='output'>
      <div className={classes.header}>
        <span>||श्री ऋषभ देवाय नम: ||</span>
        <span className={classes.copyType}>{copyType}'s copy</span>
      </div>
      <Canvas
        details={props.details}
        sellerDetails={props.sellerDetails}
        invoiceNumber={props.invoiceNumber}
        invoiceDate={props.invoiceDate}
      ></Canvas>
    </div>
  )
}

export default SampleOutput;
