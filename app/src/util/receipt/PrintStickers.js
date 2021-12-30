Ext.define('Erp.util.receipt.PrintStickers', {
    alternateClassName: ['ReceiptPrintStickers'],
    singleton: true,
    htmlRender(data) {
        const cntPrint = document.getElementById('erp-container-print');
        cntPrint.innerHTML = '';
        //const receiptProd = this.htmlProducts(data);
        cntPrint.innerHTML = this.htmlProducts(data);
        Ext.Array.each(data.items, (row, ind) => {
            if (row.data.barcode && row.data.barcode.length > 0) {
                let barcode = `#barcode-${ind}-${row.data.barcode}`;
                JsBarcode(barcode, row.data.barcode, {height: 60, width: 1.2});
            }
        });
        window.print();
        setTimeout(() => {
            cntPrint.innerHTML = ''
        }, 500);
    },
    htmlProducts(data) {
        let htmlOut = '';
        let htmlProd = '';
        let strt = 0;
        const total = data.items.length || 0;
        Ext.Array.each(data.items, (row, ind) => {
            const price_int = parseInt(row.data.price.price);
            const price_decimal = (row.data.price.price).toString().split('.')[1] || '00';
            let id = null;
            let canv = '';
            let unit_type = '';
            if (!(row.data.unit_type === '' || row.data.unit_type === undefined || row.data.unit_type === null)) {
                unit_type = "/ " + row.data.unit_type;
            } else {
                unit_type = "/ item";
            }
            if (row.data.barcode && row.data.barcode.length > 0) {
                id = `barcode-${ind}-${row.data.barcode}`;
                canv = `<td style="min-width: 60%"><canvas id="${id}"/></td>`;
            }
            htmlProd = `${htmlProd}<div class="border py-2 px-3" style="width: 50%;">
                                            <div class="bolder" style="font-size: 4.5mm;height: 11.5mm"><b>${row.data.title}</b></div>
                                            <table style="width: 100%">
                                                <tr>${canv}
                                                    <td style="min-width: 40%">
                                                        <div style="text-align: end"><b style="font-size: 12mm">${price_int},</b><b style="font-size: 7mm">${price_decimal} ${User.symbol()}</b></div>
                                                        <div style="text-align: end"><b style="font-size: 5mm">${row.data.price.price} € ${unit_type}</b></div>
                                                    </td>
                                                </tr>
                                            </table>
                                    </div>`;
            strt++;
            if(strt > 11 || (ind + 1 === total)) {
                htmlOut = `${htmlOut} <div class="page-indent">
                <div class="d-flex flex-wrap">
                    ${htmlProd}
                </div></div>`;
                htmlProd = '';
                strt = 0;
            }
        });
        return htmlOut
    },
});