Ext.define('Erp.util.receipt.English', {
    alternateClassName: ['ReceiptEnglish'],
    singleton: true,
    htmlRender(data) {
        const cntPrint = document.getElementById('erp-container-print');
        cntPrint.innerHTML = '';
        const receiptHead = this.htmlHead(data);
        const receiptProd = this.htmlProducts(data);
        cntPrint.innerHTML = '';
        cntPrint.innerHTML = `<div id="erp-receipt-pt">
                <div class="receipt-main">
                    ${receiptHead}
                    ${receiptProd}
                <div class="receipt-footer to-center d-none">
                    <br/>
                </div>
                <div class="receipt-footer receipt-header">
                    Manager: ${data.operator}<br />
                    Checkout: ${data.caixa}<br /><br />
                    ¡Thank you for choosing us!
                </div>
                <div><canvas class="barcode"/></div>
                </div>
                </div>`;
        JsBarcode(".barcode", `FR ${data.doc_number}`, {height: 40, width: 1.2});
        window.print();
        // setTimeout(() => {
        //     cntPrint.innerHTML = ''
        // }, 2000);
    },
    htmlHead(data) {
        const receiptLogo = this.htmlLogo(data);
        const tpl = `<div class="receipt-header d-flex justify-content-between">
        ${receiptLogo}
        <div>
            <div>${data.company_name}</div>
            <div>${data.company_address_1}</div>
            <div>${data.company_address_2}</div>
            <div>${data.company_phone}</div>
            <div>${data.company_email}</div>
            <div>CIF/NIF: ${data.tax_number}</div>
        </div>
      </div>
      <table class="receipt-type">
        <tr>
          <td style="padding:4px 0px">Invoice Receipt</td>
          <!--<td style="text-align:right;">FT T01P2021/7</td>-->
          <td style="text-align:right;">FR ${data.doc_number}</td>
        </tr>
      </table>
      <table class="receipt-width">
        <tr>
          <td>${data.origin}</td>
          <!--<td class="to-right">2021-06-03 19:51</td>-->
          <td class="to-right">${data.date_time}</td>
        </tr>
      </table>
      <br />
      <table class="receipt-width">
        <tr>
          <td>NIF: </td>
          <!--<td>-&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;</td>-->
          <td>${data.client_tax_number}</td>
        </tr>
        <tr>
          <td style="width:35px">Name: </td>
          <td>${data.client_name}</td>
        </tr>
      </table>`;
        return tpl;
    },
    htmlProducts(data) {
        let htmlProd = '';
        const taxes = {};

        Ext.Array.each(data.items, (row) => {
            if (data.tax_include) {
                htmlProd = `${htmlProd}<tr><td colspan="6">${row.title}</td></tr>
                <tr><td>&nbsp; ${row.amount} x ${row.item_price}</td>
                  <td class="to-right">${row.tax_value}%</td>
                  <td class="to-right">${Ext.util.Format.toFloat(row.price_total)}</td>
                </tr>`;
                if (!taxes[`${row.tax_value}%`]) {
                    taxes[`${row.tax_value}%`] = {
                        base: 0.00,
                        tax: 0.00,
                        total: 0.00
                    }
                }
                taxes[`${row.tax_value}%`].base += (row.price_total - row.tax_total);
                taxes[`${row.tax_value}%`].tax += row.tax_total;
                taxes[`${row.tax_value}%`].total += row.price_total;
            } else {
                htmlProd = `${htmlProd}<tr><td colspan="6">${row.title}</td></tr>
                <tr><td>&nbsp; ${row.amount} x ${row.item_price}</td>
                  <td class="to-right">${Ext.util.Format.toFloat(row.price_total)}</td>
                </tr>`;
            }

        });

        let pay_type_text = 'Cash';
        switch (data.pay_type) {
            case 'card':
            case 'card_visa':
            case 'card_master':
            case 'card_other':
                pay_type_text = 'Credit card';
                break;
            default:
                pay_type_text = 'Cash';
                break;
        }

        const htmlTotal = `<table class="receipt-totals receipt-width">
            <tr>
              <td class="first main">Total</td>
              <td class="main" style="white-space:nowrap">Eur ${Ext.util.Format.toFloat(data.price_total)}</td>
            </tr>
            <tr>
              <td class="first">${pay_type_text}</td>
              <td>Eur ${data.price_total}</td>
            </tr>
          </table>`;

        let htmlTaxes = '';
        if (data.tax_include) {
            let taxesRow = '';
            Ext.Object.each(taxes, function (key, value) {
                taxesRow = `${taxesRow} <tr>
                  <td>${key}</td>
                  <td class='to-right'>${Ext.util.Format.toFloat(value.base)}</td>
                  <td class='to-right'>${Ext.util.Format.toFloat(value.tax)}</td>
                  <td class='to-right'>${Ext.util.Format.toFloat(value.total)}</td>
                </tr>`
            });
            htmlTaxes = `<table class="receipt-taxes receipt-width receipt-border-bottom">
            <tr class="receipt-border-bottom">
              <td>%IVA</td>
              <td class="to-right">Base</td>
              <td class="to-right">IVA</td>
              <td class="to-right">Total</td>
            </tr>${taxesRow}</table>`;
            return `<table class="receipt-products receipt-width receipt-border-bottom">
                <tr class="receipt-border-bottom">
                  <td colspan="6">Product Reference</td>
                </tr>
                <tr class="receipt-border-bottom">
                  <td>&nbsp; Count. x Price</td>
                  <td class="to-right">IVA</td>
                  <td class="to-right">Total</td>
                </tr>${htmlProd}</table>
                    ${htmlTotal}
                    ${htmlTaxes}`;
        } else {
            return `<table class="receipt-products receipt-width receipt-border-bottom">
                <tr class="receipt-border-bottom">
                  <td colspan="6">Product Reference</td>
                </tr>
                <tr class="receipt-border-bottom">
                  <td>&nbsp; Count. x Price</td>
                  <td class="to-right">Total</td>
                </tr>${htmlProd}</table>
                    ${htmlTotal}`;
        }
    },
    htmlLogo(data) {
        let logo = '';
        if (data.logo) {
            logo = `<div class="px-4 d-flex justify-content-center align-items-center">
                         <img src="${data.logo}" style="height: 60px;"/>
                      </div>`;
        }
        return logo;
    },
});