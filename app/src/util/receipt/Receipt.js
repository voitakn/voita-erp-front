Ext.define('Erp.util.receipt.Receipt', {
    alternateClassName: ['Receipt'],
    singleton: true,
    def_translate: {
        "Cashier": "Cashier",
        "Checkout": "Checkout",
        "Tax number": "Tax number",
        "Name": "Name",
        "Cash": "Cash",
        "Credit card": "Credit card",
        "Total": "Total",
        "Eur": "Eur",
        "Base": "Base",
        "Iva": "Iva",
        "Product Reference": "Product Reference",
        "Count. x Price": "Count. x Price",
        "Final customer": "Final customer",
        "Original": "Original",
        "series": "IN",
        "text": "Invoice"
    },
    htmlRender(data) {
        const def_translate = this.def_translate;
        const params = User.data.country.params;
        (!params.receipt_translate) ? data.receipt_translate = def_translate : data.receipt_translate = params.receipt_translate;
        let cntPrint = document.createElement('div');
        if (!data.edit_config) {
            cntPrint = document.getElementById('erp-container-print');
        }
        let cntWidthLine = '';
        let cntBorder = 'class="border border-dark"';
        if (!data.configs.receipt_cfg) {
            data.configs.receipt_cfg = {
                texts: {
                    text_1: '',
                    text_2: '',
                },
                width: 56,
                type: {
                    series: data.receipt_translate.series,
                    text: data.receipt_translate.text
                }
            };
        }
        if (!data.configs.receipt_cfg.texts) {
            data.configs.receipt_cfg.texts = {
                text_1: '',
                text_2: '',
            };
        }
        if (!data.configs.receipt_cfg.type) {
            data.configs.receipt_cfg.type = {
                series: data.receipt_translate.series,
                text: data.receipt_translate.text
            };
        }
        const receipt_cfg = data.configs.receipt_cfg;
        let cntWidth = receipt_cfg.width / 10 + 'cm';
        cntPrint.innerHTML = '';
        const receiptHead = this.htmlHead(data);
        console.log('data', data);

        const receiptProd = this.htmlProducts(data);
        cntPrint.innerHTML = '';
        cntPrint.innerHTML = `${cntWidthLine}<div ${cntBorder} id="erp-receipt-pt" style='width: ${cntWidth}'>
                <div class="receipt-main">
                    ${receiptHead}
                    ${receiptProd}
                <br/>
                <table style="width: 100%">
                <tr>
                <td style="text-align: left">
                    ${data.receipt_translate['Cashier']}: ${data.operator}<br />
                    ${data.receipt_translate['Checkout']}: ${data.receipt_translate['Checkout'] + data.caixa}<br />
                    ${receipt_cfg.texts.text_1}<br />
                    ${receipt_cfg.texts.text_2}<br /><br />
                </td>
                </tr>
                </table>
                <div class="text-center"><canvas class="barcode"/></div>
                </div>
                </div>`;
        if (!data.edit_config) {
            JsBarcode(".barcode", `${receipt_cfg.type.series}${data.doc_number}`, {height: 30, width: 0.9});
            setTimeout(() => {
                window.print();
            }, 500);
        } else {
            return cntPrint;
        }
    },
    htmlHead(data) {
        let tpl = '';
        const receiptLogo = this.htmlLogo(data);
        tpl = `<div class="receipt-header">
        <table style="width: 100%">
        <tr style="text-align: center"><td>${receiptLogo}</td></tr>
        <tr>
        <td style="text-align: left">
            <div>${data.company_name || ''}</div>
            <div>${data.company_address_1 || ''}</div>
            <div>${data.company_address_2 || ''}</div>
            <div>${data.company_phone || ''}</div>
            <div>${data.company_email || ''}</div>
            <div>${data.receipt_translate['Tax number']}: ${data.configs.tax_number || ''}</div>
        </td>
        </tr></table>
        </div>
      <table class="receipt-type">
        <tr>
          <td style="padding:4px 0px">${data.configs.receipt_cfg.type.text}</td>
          <td style="text-align:right;">${data.configs.receipt_cfg.type.series}${data.doc_number}</td>
        </tr>
      </table>
      <table class="receipt-width">
        <tr>
          <td>${data.origin}</td>
          <td class="to-right">${data.date_time}</td>
        </tr>
      </table>
      <br />
      <table class="receipt-width">
        <tr>
          <td>${data.receipt_translate['Tax number']}: </td>
          <td>${data.configs.tax_number || ''}</td>
        </tr>
        <tr>
          <td>${data.receipt_translate['Name']}: </td>
          <td>${data.client_name || ''}</td>
        </tr>
      </table>`;
        return tpl;
    },
    htmlProducts(data) {
        let htmlProd = '';
        const taxes = {};
        Ext.Array.each(data.items, (row) => {
            if (data.tax_include) {
                htmlProd = `${htmlProd}<tr class="text-start"><td colspan="6">${row.title}</td></tr>
                <tr class="text-start"><td>&nbsp; ${row.amount} x ${row.item_price}</td>
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
                htmlProd = `${htmlProd}<tr class="text-start"><td colspan="6">${row.title}</td></tr>
                <tr class="text-start"><td>&nbsp; ${row.amount} x ${row.item_price}</td>
                  <td class="to-right">${Ext.util.Format.toFloat(row.price_total)}</td>
                </tr>`;
            }
        });
        let pay_type_text = data.receipt_translate['Cash'];
        switch (data.pay_type) {
            case 'card':
            case 'card_visa':
            case 'card_master':
            case 'card_other':
                pay_type_text = data.receipt_translate['Credit card'];
                break;
            default:
                pay_type_text = data.receipt_translate['Cash'];
                break;
        }
        const htmlTotal = `<table class="receipt-totals receipt-width">
            <tr>
              <td class="first main">${data.receipt_translate['Total']}</td>
              <td class="main" style="white-space:nowrap">${data.receipt_translate['Eur']} ${Ext.util.Format.toFloat(data.price_total)}</td>
            </tr>
            <tr>
              <td class="first">${pay_type_text}</td>
              <td>${data.receipt_translate['Eur']} ${data.price_total}</td>
            </tr>
          </table>`;
        let htmlTaxes = '';
        if (data.tax_include) {
            let taxesRow = '';
            Ext.Object.each(taxes, function (key, value) {
                taxesRow = `${taxesRow} <tr>
                  <td>${key}</td>
                  <td class="to-right">${Ext.util.Format.toFloat(value.base)}</td>
                  <td class="to-right">${Ext.util.Format.toFloat(value.tax)}</td>
                  <td class="to-right">${Ext.util.Format.toFloat(value.total)}</td>
                </tr>`
            });
            htmlTaxes = `<table class="receipt-taxes receipt-width receipt-border-bottom">
            <tr class="receipt-border-bottom">
              <td>%IVA</td>
              <td class="to-right">${data.receipt_translate['Base']}</td>
              <td class="to-right">${data.receipt_translate['Iva']}</td>
              <td class="to-right">${data.receipt_translate['Total']}</td>
            </tr>${taxesRow}</table>`;
            return `<table class="receipt-products receipt-width receipt-border-bottom">
                <tr class="receipt-border-bottom">
                  <td colspan="6">${data.receipt_translate['Product Reference']}</td>
                </tr>
                <tr class="receipt-border-bottom">
                  <td>&nbsp; ${data.receipt_translate['Count. x Price']}</td>
                  <td class="to-right">${data.receipt_translate['Iva']}</td>
                  <td class="to-right">${data.receipt_translate['Total']}</td>
                </tr>${htmlProd}</table>
                    ${htmlTotal}
                    ${htmlTaxes}`;
        } else {
            return `<table class="receipt-products receipt-width receipt-border-bottom">
                <tr class="receipt-border-bottom">
                  <td colspan="6">${data.receipt_translate['Product Reference']}</td>
                </tr>
                <tr class="receipt-border-bottom">
                  <td>&nbsp; ${data.receipt_translate['Count. x Price']}</td>
                  <td class="to-right">${data.receipt_translate['Total']}</td>
                </tr>${htmlProd}</table>
                    ${htmlTotal}`;
        }
    },
    htmlLogo(data) {
        let logo = '';
        if (data.logo) {
            logo = `<img src="${data.logo || ''}" style="height: 60px;"/>`;
        }
        return logo;
    },
});