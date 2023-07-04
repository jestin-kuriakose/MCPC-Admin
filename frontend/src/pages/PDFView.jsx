import React from 'react';
import { PDFViewer, StyleSheet} from '@react-pdf/renderer';
import TaxSlipTemplate from '../components/TaxSlipTemplate';
import { useParams, useSearchParams } from 'react-router-dom';


const PDFView = () => {
  let searchParams = {}
  const [params] = useSearchParams()

  for (const entry of params.entries()) {
    const [param, value] = entry;
    searchParams[param] = value;
  }

  const styles = StyleSheet.create({
      viewer: {
          width: window.innerWidth, //the pdf viewer will take up all of the width and height
          height: window.innerHeight,
        },
  })

return (
  <PDFViewer style={styles.viewer}>
      <TaxSlipTemplate params={searchParams}/>
  </PDFViewer>
)
}

export default PDFView