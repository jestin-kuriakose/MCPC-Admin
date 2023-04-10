import React from 'react';
import { PDFViewer, StyleSheet } from '@react-pdf/renderer';
import PDFDocument from '../components/PDFDocument';

const PDFView = () => {
    const styles = StyleSheet.create({
        viewer: {
            width: window.innerWidth, //the pdf viewer will take up all of the width and height
            height: window.innerHeight,
          },
    })

  return (
    <PDFViewer style={styles.viewer}>
        <PDFDocument />
    </PDFViewer>
  )
}

export default PDFView