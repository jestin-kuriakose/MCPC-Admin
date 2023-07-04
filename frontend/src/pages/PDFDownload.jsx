import ReactPDF, { BlobProvider, Document, PDFDownloadLink, PDFViewer, Page, Text, pdf, usePDF } from '@react-pdf/renderer';
import React from 'react'
import TaxSlipTemplate from '../components/TaxSlipTemplate';
import { useSearchParams } from 'react-router-dom';


const PDFDownload = () => {

    let searchParams = {}
    const [params] = useSearchParams()

    for (const entry of params.entries()) {
    const [param, value] = entry;
    searchParams[param] = value;
    }

    const fileName = `Donation_Slip-${searchParams.firstName}_${searchParams.lastName}-${searchParams.year}`

    // const [instance, updateInstance] = usePDF({ document: <MyDocument/> });



return(
    <div className='d-flex align-items-center justify-content-center' style={{height:"100vh"}}>
        <PDFDownloadLink document={<TaxSlipTemplate params={searchParams}/>} fileName={fileName} className='btn btn-primary'>
        {({ blob, url, loading, error }) => 
            loading ? 'Loading document...' : 'Download now!'
        }
        </PDFDownloadLink>
    </div>
)}

export default PDFDownload