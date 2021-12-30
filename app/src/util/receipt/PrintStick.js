Ext.define('Erp.util.receipt.PrintStick', {
    alternateClassName: ['ReceiptPrintStick'],
    singleton: true,
    htmlRender(data) {
        const barcode = data.barcode;
        const cntPrint = document.getElementById('erp-container-print');
        cntPrint.innerHTML = '';
        const receiptProd = this.htmlProducts(data);
        cntPrint.innerHTML = `<div id="erp-sticker-print">
                <div class="d-flex flex-wrap">
                    ${receiptProd}
                </div>
                </div>`;
        JsBarcode(".barcode", barcode, {height: 80, width: 1.2});
        window.print();
        setTimeout(() => {
            cntPrint.innerHTML = ''
        }, 2000);
    },
    htmlProducts(data) {
        let htmlProd = '';
        let boxes = data.boxes;
        let i = 0;
        while (i < boxes) {
            htmlProd = `${htmlProd}<div style="width: 33.33%;">
                                            <div>
                                                <canvas class="barcode"/>
                                            </div>
                                       </div>`;
            i++;
        }
        return htmlProd
    },
});