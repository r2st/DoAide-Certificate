import Papa from 'papaparse';

export function parseCSV(file) {
  return new Promise((resolve, reject) => {
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        const names = results.data
          .map(
            (row) =>
              row.name ||
              row.Name ||
              row.NAME ||
              row['Full Name'] ||
              row['full_name'] ||
              row['Recipient'] ||
              row['Student Name'] ||
              row['Employee Name'] ||
              Object.values(row)[0] ||
              ''
          )
          .filter((n) => n.trim() !== '');
        resolve(names);
      },
      error: (err) => reject(err),
    });
  });
}
