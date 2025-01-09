document.addEventListener('DOMContentLoaded', () => {
    const salesData = {
        stefanny: {
            totalSales: 120,
            totalValue: 2400,
            products: {
                termoretratil: 50,
                malhaExpansivel: 30,
                capuz: 20,
                abracadeiras: 20
            }
        },
        kauana: {
            totalSales: 95,
            totalValue: 1900,
            products: {
                termoretratil: 40,
                malhaExpansivel: 25,
                capuz: 15,
                abracadeiras: 15
            }
        },
        hedipo: {
            totalSales: 150,
            totalValue: 3000,
            products: {
                termoretratil: 60,
                malhaExpansivel: 40,
                capuz: 30,
                abracadeiras: 20
            }
        },
        renan: {
            totalSales: 110,
            totalValue: 2200,
            products: {
                termoretratil: 45,
                malhaExpansivel: 30,
                capuz: 20,
                abracadeiras: 15
            }
        }
    };

    Object.keys(salesData).forEach(seller => {
        const salesElement = document.getElementById(`sales-${seller}`);
        if (salesElement) {
            salesElement.textContent = salesData[seller].totalSales;
        }
    });

    // Render chart using Chart.js
    const ctx = document.createElement('canvas');
    document.querySelector('.dashboard-main').appendChild(ctx);

    const labels = Object.keys(salesData);
    const totalSales = labels.map(seller => salesData[seller].totalSales);
    const totalValues = labels.map(seller => salesData[seller].totalValue);

    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [
                {
                    label: 'Total Sales',
                    data: totalSales,
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 1
                },
                {
                    label: 'Total Value ($)',
                    data: totalValues,
                    backgroundColor: 'rgba(153, 102, 255, 0.2)',
                    borderColor: 'rgba(153, 102, 255, 1)',
                    borderWidth: 1
                }
            ]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top',
                },
                tooltip: {
                    callbacks: {
                        afterLabel: function(tooltipItem) {
                            const seller = tooltipItem.label.toLowerCase();
                            const products = salesData[seller].products;
                            return Object.keys(products).map(product => `${product}: ${products[product]}`);
                        }
                    }
                }
            }
        }
    });

    // Example: Add a function to update sales dynamically
    function updateSales(seller, newSales, newValue, newProducts) {
        if (salesData[seller] !== undefined) {
            salesData[seller].totalSales = newSales;
            salesData[seller].totalValue = newValue;
            salesData[seller].products = newProducts;

            const salesElement = document.getElementById(`sales-${seller}`);
            if (salesElement) {
                salesElement.textContent = newSales;
            }
        }
    }

    // Example usage of updateSales function
    // updateSales('stefanny', 130, 2600, { termoretratil: 60, malhaExpansivel: 40, capuz: 20, abracadeiras: 10 });
});
