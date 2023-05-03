import React from 'react';
import ReactPDF, { Document, Font, Image, Link, PDFViewer, Page, StyleSheet, Text, View } from '@react-pdf/renderer';

// Create styles
const styles = StyleSheet.create({
  body: {
    paddingTop: 35,
    paddingBottom: 65,
    paddingHorizontal: 35,
    flexDirection: 'column',
    gap: '10',

  },
  title: {
    fontSize: 24,
    textAlign: 'center',
    fontFamily: 'Oswald'
  },
  author: {
    fontSize: 12,
    textAlign: 'center',
    // marginBottom: 40,
  },
  title2: {
    fontSize: 18,
    textAlign: 'center',
    fontFamily: 'Oswald',
    marginTop: 30
  },
  section: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between'
  },
  moreInfo: {
    marginTop: 10,
    fontSize: 12,
    textAlign: 'center',
    fontFamily: 'Oswald'
  },
  moreInfoSubTitle: {
    fontSize: 10,
    textAlign: 'center',
    // marginBottom: 40,
  },
  subtitle: {
    fontSize: 18,
    margin: 12,
    fontFamily: 'Oswald'
  },
  text: {
    marginTop: 12,
    marginLeft: 12,
    marginRight: 12,
    fontSize: 14,
    textAlign: 'justify',
    fontFamily: 'Times-Roman'
  },
  subText: {
    marginLeft: 12,
    marginRight: 12,
    lineHeight: 0,
    fontSize: 14,
    textAlign: 'justify',
    fontFamily: 'Times-Roman'
  },
  sigText1: {
    marginTop: 18,
    marginLeft: 12,
    marginRight: 12,
    fontSize: 14,
    textAlign: 'right',
    fontFamily: 'Times-Roman'
  },
  sigText2: {
    marginLeft: 12,
    marginRight: 60,
    lineHeight: 0,
    fontSize: 14,
    textAlign: 'right',
    fontFamily: 'Times-Roman'
  },
  lineBreak: {
    textAlign: 'center'
  },

  image: {
    marginVertical: 15,
    marginHorizontal: 100,
  },
  header: {
    fontSize: 12,
    marginBottom: 20,
    textAlign: 'center',
    color: 'grey',
  },
  pageNumber: {
    position: 'absolute',
    fontSize: 12,
    bottom: 30,
    left: 0,
    right: 0,
    textAlign: 'center',
    color: 'grey',
  },
});

// Create Document Component
const PDFDocument = ({params}) => {
    return (
      <Document>
        <Page style={styles.body}>

          <View>
          <Text style={styles.title}>MOUNT CARMEL PENTECOSTAL CHURCH</Text>
          <Text style={styles.author}>P O Box 46031, Forest Glen Plaza</Text>
          <Text style={styles.author}>Kitchener, Ontario, N2E 4J3</Text>
          <Text style={styles.author}>Registration No. 85069 5404 RR 0001</Text>

          <Text style={styles.title2}>OFFICIAL RECIEPT FOR INCOME TAX PURPOSES</Text>

          <View style={styles.section}>
            <View>
              <Text style={styles.text}>Place: Kitchener</Text>
              <Text style={styles.subText}>January 4th, 2023</Text>
            </View>
            <View>
              <Text style={styles.text}>Receipt No. 2022-013</Text>
            </View>
          </View>

          <Text style={styles.text}>Mr. {params.firstName} {params.lastName}</Text>
          <Text style={styles.subText}>Unit A, 79 Florence Avenue,</Text>
          <Text style={styles.subText}>Kitchener, ON, N2A 2K9</Text>

          <View style={styles.section}>
            <Text style={styles.text}>Thank you for your financial support during the year: {params.year}</Text>
            <Text style={styles.text}>Amount: $2000</Text>
          </View>

          <Text style={styles.sigText1}>Authorized signature: …………………………….</Text>
          <Text style={styles.sigText2}>Treasurer</Text>

          <Text style={styles.moreInfo}>For information on all registered charities in Canada under the Income Tax Act please visit:</Text>
          <Text style={styles.moreInfoSubTitle}>Canada Revenue Agency Website: <Link src="www.cra-arc.gc.ca/charities">www.cra-arc.gc.ca/charities</Link></Text>
          </View>

          <Text style={styles.lineBreak}>-------------------------------------------------------------------------------------</Text>

          <View>
          <Text style={styles.title}>MOUNT CARMEL PENTECOSTAL CHURCH</Text>
          <Text style={styles.author}>P O Box 46031, Forest Glen Plaza</Text>
          <Text style={styles.author}>Kitchener, Ontario, N2E 4J3</Text>
          <Text style={styles.author}>Registration No. 85069 5404 RR 0001</Text>

          <Text style={styles.title2}>OFFICIAL RECIEPT FOR INCOME TAX PURPOSES</Text>

          <View style={styles.section}>
            <View>
              <Text style={styles.text}>Place: Kitchener</Text>
              <Text style={styles.subText}>January 4th, 2023</Text>
            </View>
            <View>
              <Text style={styles.text}>Receipt No. 2022-013</Text>
            </View>
          </View>

          <Text style={styles.text}>Mr. Jestin Kuriakose,</Text>
          <Text style={styles.subText}>Unit A, 79 Florence Avenue,</Text>
          <Text style={styles.subText}>Kitchener, ON, N2A 2K9</Text>

          <View style={styles.section}>
            <Text style={styles.text}>Thank you for your financial support during the year: 2022</Text>
            <Text style={styles.text}>Amount: $2000</Text>
          </View>

          <Text style={styles.sigText1}>Authorized signature: …………………………….</Text>
          <Text style={styles.sigText2}>Treasurer</Text>

          <Text style={styles.moreInfo}>For information on all registered charities in Canada under the Income Tax Act please visit:</Text>
          <Text style={styles.moreInfoSubTitle}>Canada Revenue Agency Website: <Link src="www.cra-arc.gc.ca/charities">www.cra-arc.gc.ca/charities</Link></Text>
          </View>
          
          {/* <Text style={styles.pageNumber} render={({ pageNumber, totalPages }) => (
            `${pageNumber} / ${totalPages}`
          )} fixed /> */}
        </Page>
      </Document>
)};

Font.register({
  family: 'Oswald',
  src: 'https://fonts.gstatic.com/s/oswald/v13/Y_TKV6o8WovbUd3m_X9aAA.ttf'
});

export default PDFDocument;