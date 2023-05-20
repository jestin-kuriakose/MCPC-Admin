import React from 'react';
import { PDFViewer, Document, Page, Text, View, StyleSheet, pdf } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    fontFamily: 'Helvetica',
    fontSize: 12,
    padding: 20,
  },
  section: {
    marginBottom: 10,
  },
  table: {
    display: 'table',
    width: 'auto',
    borderStyle: 'solid',
    borderWidth: 1,
    borderRightWidth: 0,
    borderBottomWidth: 0,
  },
  tableRow: {
    margin: 'auto',
    flexDirection: 'row',
  },
  tableCell: {
    margin: 'auto',
    marginTop: 5,
    marginBottom: 5,
    borderStyle: 'solid',
    borderBottomWidth: 1,
    borderRightWidth: 1,
    borderColor: '#AAAAAA',
    textAlign: 'center',
  },
  buttonContainer: {
    marginTop: 10,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  button: {
    marginRight: 10,
    padding: '5px 10px',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: 4,
    cursor: 'pointer',
    outline: 'none',
  },
});

const ExportTableAsPDF = ({ data, email }) => {
    console.log(data)
  const exportAsPDF = async () => {
    const doc = (
      <Document>
        <Page size="A4" style={styles.page}>
          <View style={styles.section}>
            <View style={styles.table}>
              <View style={styles.tableRow}>
                <View style={styles.tableCell}>
                  <Text>Name</Text>
                </View>
                <View style={styles.tableCell}>
                  <Text>Email</Text>
                </View>
                <View style={styles.tableCell}>
                  <Text>Role</Text>
                </View>
              </View>
              {data.map((row, index) => (
                <View key={index} style={styles.tableRow}>
                    <View style={styles.tableCell}>
                         <Text>{row.id}</Text>
                     </View>
                     <View style={styles.tableCell}>
                         <Text>{row.firstName}</Text>
                     </View>
                     <View style={styles.tableCell}>
                         <Text>{row.lastName}</Text>
                     </View>
                     <View style={styles.tableCell}>
                         <Text>{row.city}</Text>
                     </View>
                </View>
              ))}
            </View>
          </View>
        </Page>
      </Document>
    );

    const blob = await pdf(doc).toBlob()
    console.log(blob)
    const form = new FormData()
    console.log(form)
    const newBlob = new Blob()
    const url = URL.createObjectURL(blob);
    console.log(url)
    const a = document.createElement('a');
    a.href = url;
    a.download = 'table.pdf';
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleEmail = () => {
    const mailtoLink = `mailto:${email}?subject=Table PDF&body=Please find attached the table PDF.`;
    window.location.href = mailtoLink;
  };

  return (
    <div>
      <div className={styles.buttonContainer}>
        <button className={styles.button} onClick={exportAsPDF}>Export as PDF</button>
        <button className={styles.button} onClick={handleEmail}>Email</button>
      </div>
      <PDFViewer style={{ width: '100%', height: '500px' }}>
        <Document>
          <Page size="A4" style={styles.page}>
            <View style={styles.section}>
              <View style={styles.table}>
                <View style={styles.tableRow}>
                  <View style={styles.tableCell}>
                    <Text>Name</Text>
                  </View>
                  <View style={styles.tableCell}>
                    <Text>Email</Text>
                  </View>
                  <View style={styles.tableCell}>
                    <Text>Role</Text>
                  </View>
                </View>
                {data.map((row, index) => (
                <View key={index} style={styles.tableRow}>
                    <View style={styles.tableCell}>
                        <Text>{row.id}</Text>
                    </View>
                    <View style={styles.tableCell}>
                        <Text>{row.firstName}</Text>
                    </View>
                    <View style={styles.tableCell}>
                        <Text>{row.lastName}</Text>
                    </View>
                    <View style={styles.tableCell}>
                        <Text>{row.city}</Text>
                    </View>
                </View>
                ))}
              </View>
            </View>
          </Page>
        </Document>
      </PDFViewer>
    </div>
  );
};

export default ExportTableAsPDF;