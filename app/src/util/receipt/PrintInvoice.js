Ext.define('Erp.util.receipt.PrintInvoice', {
    alternateClassName: ['PrintInvoice'],
    singleton: true,
    htmlRender(data) {
        const cntPrint = document.getElementById('erp-container-print');
        const receiptLogo = this.htmlLogo(data);
        const receiptBarcode = this.htmlBarcode(data);
        const receiptHead = `<div class="d-flex flex-column justify-content-evenly mb-2 mt-5" style="height: 400px">
                     <div class="receipt-header">
                         <div style="font-size: 24px; text-align:right; text-transform: uppercase">${i18n.gettext('Moving invoice')}</div>
                     </div>
                     <div class="mb-2 d-flex justify-content-between flex-wrap border-bottom">
                        <div class="mb-2 d-flex justify-content-between align-items-center" style="width: 60%">
                           ${receiptLogo}
                            <div>
                                <div class="px-2">${i18n.gettext('COMPANY')}: ${data.company_name}</div>
                                <div class="px-2">${i18n.gettext('ADDRESS')}: ${data.company_address}</div>
                                <div class="px-2">${i18n.gettext('CITY, STATE')}: ${data.company_city}</div>
                                <div class="px-2">${i18n.gettext('ZIP')}: ${data.company_postcode}</div>
                                <div class="px-2">${i18n.gettext('PHONE')}: ${data.company_phone}</div>
                                <div class="px-2">${i18n.gettext('TAX NUMBER')}: ${data.company_tax}</div>
                            </div>
                         </div>
                        <div class="mb-2 d-flex flex-column">
                            ${receiptBarcode}
                            <div class="px-2">${i18n.gettext('DATE')}:  ${data.date_create}</div>
                            <div class="px-2">${i18n.gettext('INVOICE')}: ${data.doc_number}</div>
                            <div class="px-2">${i18n.gettext('TOTAL INVOICE')}: €${Ext.util.Format.toFloat(data.bill_price_total)}</div>
                            <div class="px-2">${i18n.gettext('TOTAL POSITIONS')}: ${data.bill_products_total}</div>
                            <div class="px-2">${i18n.gettext('BOXES')}: ${data.boxes}</div>
                         </div>
                     </div>
                     <div class="mb-2 d-flex justify-content-between flex-wrap">
                        <div class="mb-2 d-flex flex-column" style="width: 48%">
                             <div class="px-2 blue-light-bg">${i18n.gettext('Source location')}</div>
                             <div class="px-2">${i18n.gettext('COMPANY')}: ${data.company_name}</div>
                             <div class="px-2">${i18n.gettext('ADDRESS')}: ${data.from_place.address}</div>
                             <div class="px-2">${i18n.gettext('CITY, STATE')}: ${data.from_place.city}</div>
                             <div class="px-2">${i18n.gettext('ZIP')}: ${data.from_place.postcode}</div>
                             <div class="px-2">${i18n.gettext('PHONE')}: ${data.from_place.phone}</div>
                             <div class="px-2">${i18n.gettext('MANAGER')}: ${data.operator}</div>
                        </div>
                        <div class="mb-2 d-flex flex-column" style="width: 48%">
                           <div class="px-2 blue-light-bg">${i18n.gettext('Destination location')}</div>
                           <div class="px-2">${i18n.gettext('COMPANY')}: ${data.company_name}</div>
                           <div class="px-2">${i18n.gettext('ADDRESS')}: ${data.to_place.address}</div>
                           <div class="px-2">${i18n.gettext('CITY, STATE')}: ${data.to_place.city}</div>
                           <div class="px-2">${i18n.gettext('ZIP')}: ${data.to_place.postcode}</div>
                           <div class="px-2">${i18n.gettext('PHONE')}: ${data.to_place.phone}</div>
                        </div>
                     </div>
                     <div class="size-24 text-center">${i18n.gettext('Invoice items')}</div>
                             </div>`;
        const receiptSmallHead = `<div class="d-flex flex-column justify-content-between mb-2" style="height: 150px">
                     <div class="receipt-header">
                         <div style="font-size: 24px; text-align:right; text-transform: uppercase">${i18n.gettext('Moving invoice')}</div>
                     </div>
                         <div class="d-flex">
                             <div class="px-2">${i18n.gettext('DATE')}:  ${data.date_create}</div>
                             <div class="px-2">${i18n.gettext('INVOICE')}: ${data.doc_number}</div>
                             <div class="px-2">${i18n.gettext('TOTAL INVOICE')}: €${Ext.util.Format.toFloat(data.bill_price_total)}</div>
                             <div class="px-2">${i18n.gettext('TOTAL POSITIONS')}: ${data.bill_products_total}</div>
                             <div class="px-2">${i18n.gettext('BOXES')}: ${data.boxes}</div>
                         </div>
                     <div class="size-24 text-center">${i18n.gettext('Invoice items')}</div>
                             </div>`;
        const receiptSmallFooter = `<div class="d-flex justify-content-between mt-4" style="height: 100px">
                                   <span class="size-16">${i18n.gettext('Sender')}: ________________</span>
                                   <span class="size-16">${i18n.gettext('Recipient')}: ________________</span>
                                </div>`;
        const receiptFooter = `<div class="receipt-footer d-flex flex-column justify-content-between mt-auto" style="height: 150px">
                                <div class="text-right">
                                   <span class="size-16">${i18n.gettext('Total amount')}: </span>
                                   <span class="bolder size-20">€${Ext.util.Format.toFloat(data.bill_price_total)}</span></br></br>
                                </div>
                                <!-- <div class="d-flex justify-content-between">
                                   <span class="size-16">${i18n.gettext('Sender')}: ________________</span>
                                   <span class="size-16">${i18n.gettext('Recipient')}: ________________</span>
                                </div> -->
                                </div>`;
        let receiptProd = '';
        let receiptProdList = '';
        let htmlTable = '';
        let htmlProd = '';
        let htmlProdList = '';
        let prodList = false;
        let pages = 1;
        let page = 1;
        let receiptArr = [];
        const table = document.createElement("table");
        Ext.Array.each(data.items, (row) => {
            htmlTable = `${htmlTable} ${this.htmlProducts(row)}`;
            table.innerHTML = htmlTable;
            document.body.append(table);
            if (table.offsetHeight > 595 && !prodList) {
                htmlTable = ``;
                prodList = true;
                table.innerHTML = '';
                pages++;
            }
            if (table.offsetHeight > 919 && prodList) {
                htmlTable = ``;
                htmlProdList = ``;
                table.innerHTML = '';
                pages++;
                receiptProdList = '';
            }
            if (table.offsetHeight <= 595 && !prodList) {
                htmlProd = `${htmlProd} ${this.htmlProducts(row)}`;
                receiptArr[1] = `<table class="receipt-products receipt-width">
                    <tr class="blue-light-bg">
                      <td class="px-2" style="border: 1px solid #000; width: 70%">${i18n.gettext('Product name')}</td>
                      <td class="px-2" style="border: 1px solid #000; width: 10%">${i18n.gettext('Count')}</td>
                      <td class="px-2" style="border: 1px solid #000; width: 10%">${i18n.gettext('Price')}</td>
                      <td class="px-2" style="border: 1px solid #000; width: 10%">${i18n.gettext('Total price')}</td>
                    </tr>
                       ${htmlProd}
                 </table>`;
            }
            if (table.offsetHeight <= 919 && prodList) {
               //console.('prodList');
                htmlProdList = `${htmlProdList} ${this.htmlProducts(row)}`;
                receiptArr[pages] = `<table class="receipt-products receipt-width">
                        <tr class="blue-light-bg">
                          <td class="px-2" style="border: 1px solid #000; width: 70%">${i18n.gettext('Product name')}</td>
                          <td class="px-2" style="border: 1px solid #000; width: 10%">${i18n.gettext('Count')}</td>
                          <td class="px-2" style="border: 1px solid #000; width: 10%">${i18n.gettext('Price')}</td>
                          <td class="px-2" style="border: 1px solid #000; width: 10%">${i18n.gettext('Total price')}</td>
                        </tr>
                               ${htmlProdList}
                    </table>`;
            }
        });
        if (receiptArr.length < 3) {
            page = 1;
            receiptProd = ` ${receiptHead}
                            ${receiptArr[1]}
                            ${receiptFooter}
                            <div class="text-center mb-5">Page ${page} of ${pages}</div>`;
        } else {
            receiptProd = ` ${receiptHead}
                        ${receiptArr[1]}
                        ${receiptSmallFooter}
                        <div class="text-center mb-5">Page ${page} of ${pages}</div>`;
            page = 2;
            while (page < receiptArr.length - 1) {
                receiptProd = ` ${receiptProd}
                                ${receiptSmallHead}
                                ${receiptArr[page]}
                                ${receiptSmallFooter}
                                <div class="text-center mb-5">Page ${page} of ${pages}</div>`;
                page++;
            }
            receiptProd = ` ${receiptProd}
                            ${receiptSmallHead}
                            ${receiptArr[receiptArr.length - 1]}
                            ${receiptFooter}
                            <div class="text-center mb-5">Page ${page} of ${pages}</div>`;
        }
        table.classList.add('d-none');
        table.id = 'table_hidden';
        document.getElementById('table_hidden').remove();
        cntPrint.innerHTML = '';
        cntPrint.innerHTML = `<div id="erp-receipt-pt">
                                <div class="receipt-main bg-white d-flex flex-column">
                                    ${receiptProd}
                                </div>
                              </div>`;
        JsBarcode(".barcode", data.doc_number, {height: 40, width: 1.2, displayValue: false});
        setTimeout(() => {
            window.print();
        }, 500);
    },
    htmlProducts(row) {
        let htmlProd = '';
        htmlProd = `<tr>
                        <td class="px-2" style="border: 1px solid #000; width: 70%">${row.title}</td>
                        <td class="px-2" style="border: 1px solid #000; width: 10%">${row.amount}</td>
                        <td class="px-2" style="border: 1px solid #000; width: 10%">${Ext.util.Format.toFloat(row.price)}</td>
                        <td class="px-2" style="border: 1px solid #000; width: 10%">${Ext.util.Format.toFloat(row.price_total)}</td>
                    </tr>`;
        return htmlProd
    },
    htmlLogo(data) {
        let logo = '';
        if (data.logo) {
            logo = `<div class="px-4 d-flex justify-content-center align-items-center">
                         <img src="${data.logo}" style="height: 60px;"/>
                      </div>`;
        } else {
            logo = '';
        }
        return logo;
    },
    htmlBarcode(data) {
        let barcode = '';
        if (data.doc_number) {
            barcode = `<div class="px-2 d-flex to-right align-items-center">
                         <canvas class="barcode"/>
                      </div>`;
        } else {
            barcode = '';
        }
        return barcode;
    }
});