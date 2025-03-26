document.getElementById('compareBtn').addEventListener('click', () => {
    const file1 = document.getElementById('file1').files[0];
    const file2 = document.getElementById('file2').files[0];
  
    if (!file1 || !file2) {
      alert('Por favor, envie os dois arquivos!');
      return;
    }
  
    const reader1 = new FileReader();
    const reader2 = new FileReader();
  
    reader1.onload = (e1) => {
      const data1 = new Uint8Array(e1.target.result);
      const workbook1 = XLSX.read(data1, { type: 'array' });
      const sheet1 = workbook1.Sheets[workbook1.SheetNames[0]];
      const values1 = XLSX.utils.sheet_to_json(sheet1, { header: 1 }).flat();
  
      reader2.onload = (e2) => {
        const data2 = new Uint8Array(e2.target.result);
        const workbook2 = XLSX.read(data2, { type: 'array' });
        const sheet2 = workbook2.Sheets[workbook2.SheetNames[0]];
        const values2 = XLSX.utils.sheet_to_json(sheet2, { header: 1 }).flat();
  
        // Comparar valores
        const commonValues = values1.filter(value => values2.includes(value));
        displayResults(commonValues);
      };
  
      reader2.readAsArrayBuffer(file2);
    };
  
    reader1.readAsArrayBuffer(file1);
  });
  
  function displayResults(commonValues) {
    const resultsContainer = document.getElementById('results');
    if (commonValues.length > 0) {
      resultsContainer.textContent = `Valores em comum:\n${commonValues.join('\n')}`;
    } else {
      resultsContainer.textContent = 'Nenhum valor em comum encontrado.';
    }
  }
  