import React from 'react';
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';
import { redirect } from 'react-router-dom';

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#ffffff',
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1
  },
  logo: {
    color: 'red'
  },
  add1: {
    fontWeight: 100,
  }
});

// Create Document Component
const PDFDocument = () => {
    return (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <Text style={styles.logo}>MOUNT CARMEL PENTECOSTAL CHURCH</Text>
        <Text style={styles.add1}>P O Box 46031, Forest Glen Plaza </Text>
        <Text style={styles.add2}>Kitchener, Ontario, N2E 4J3</Text>
        <Text style={styles.tax}>Registration No. 85069 5404 RR 0001</Text>
      </View>
      <View style={styles.section}>
        <Text>Section #2</Text>
      </View>
    </Page>
  </Document>
)};

export default PDFDocument;