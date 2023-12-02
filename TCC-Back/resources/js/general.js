import moment from "moment";

export default {
    methods: {
        formatError: function (text, response) {
            if (response && response.data !== undefined && response.data.data !== undefined && response.data.data.message !== undefined) {
                text = response.data.data.message;
            }
            new Noty({
                type: 'error',
                text: text + ' Por favor, contate o T.I.!',
            }).show();
        },
        slugify: function (text) {
            return text.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');
        },
        formatMoney: function (value, decimals = 2) {
            if (value === null) {
                value = 0
            }
            return (parseFloat(value)).toLocaleString('pt-BR', {
                style: 'currency',
                currency: 'BRL',
                minimumFractionDigits: decimals,
                maximumFractionDigits: decimals,
            });
        },
        formatMoneyWith4Digits: function (value, decimals = 4) {
            if (value === null) {
                value = 0
            }
            return (parseFloat(value)).toLocaleString('pt-BR', {
                style: 'currency',
                currency: 'BRL',
                minimumFractionDigits: decimals,
                maximumFractionDigits: decimals,
            });
        },
        formatMoneyNoSymbol: function (value, decimals = 2) {
            return this.formatMoney(value, decimals).replace(/R\$\s/, '');
        },
        formatPercent: function (value, decimals = 2, symbol = '%') {
            return this.formatMoneyNoSymbol(value, decimals) + symbol;
        },
        formatDate: function (value, format = 'DD/MM/YYYY', defaultValue = '') {
            if (value) {
                let date = moment(value).format(format);
                return date !== 'Data inválida' ? date : defaultValue;
            }
            return defaultValue;
        },
        formatDatetime: function (value, format = 'DD/MM/YYYY HH:mm:ss', defaultValue = '') {
            return this.formatDate(value, format, defaultValue)
        },
        flashNotify: function (text, type = 'success') {
            new Noty({
                type: type,
                text: text
            }).show();
        },
        formatCpfCnpj: function (text) {
            if (text === undefined || text === null) {
                return '';
            }
            text = typeof text != 'string' ? text.toString() : text;

            if (text.length === 14) {
                text = text.padStart(14, '0');
                return text.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5');
            }

            if (text.length === 11) {
                text = text.padStart(11, '0');
                return text.replace(/^(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
            }

            return text;
        },
        groupBy: function (xs, key) {
            return xs.reduce(function (rv, x) {
                (rv[x[key]] = rv[x[key]] || []).push(x);
                return rv;
            }, {});
        },
        notifyBrowser: function (data) {
            let notification = new Notification(data.title, {
                body: data.body,
                icon: "https://" + window.location.hostname + "/img/logo_drugovich.png"
            });

            notification.onclick = () => {
                notification.close()
            };
        },
        getFilenameFromHeader: function (header, defaultFilename) {
            let filename = defaultFilename;
            let disposition = header['content-disposition'];
            if (disposition && disposition.indexOf('inline') !== -1) {
                let filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
                let matches = filenameRegex.exec(disposition);
                if (matches != null && matches[1]) {
                    filename = matches[1].replace(/['"]/g, '');
                }
            }
            return filename;
        },
        getRange(start, end, reverse = false) {
            let list = [];
            for (let i = start; i <= end; i++) {
                list.push(i);
            }
            if (reverse) {
                list.reverse();
            }
            return list;
        },
        getParameterFromUrl(parameter) {
            parameter = (new RegExp('[?&]' + encodeURIComponent(parameter) + '=([^&]*)')).exec(location.search)
            if (parameter) {
                return decodeURIComponent(parameter[1]);
            }
        },
        removeParameterFromUrl() {
            window.history.pushState({}, document.title, window.location.pathname);
        },
        formatExportToDownload(response, name, extension = 'xlsx') {
            let filename = this.getFilenameFromHeader(response.headers, name + '.' + extension);
            let fileLink = document.createElement('a');
            fileLink.href = window.URL.createObjectURL(new Blob([response.data]));
            fileLink.setAttribute('download', filename);
            document.body.appendChild(fileLink);
            fileLink.click();
        },
        sleep(ms) {
            return new Promise(resolve => setTimeout(resolve, ms));
        },
        // (test, 'level1', 'level2', 'level3')
        getNestedObject(obj, ...args) {
            let reduce = args.reduce((obj, level) => obj && obj[level], obj)
            if (reduce === null || reduce === undefined) {
                return ''
            }
            return reduce
        },
        isObjectEmpty(obj) {
            return Object.keys(obj).length === 0;
        },
        removeAccentuation(str) {
            let conversions = {};
            conversions['ae'] = 'ä|æ|ǽ';
            conversions['oe'] = 'ö|œ';
            conversions['ue'] = 'ü';
            conversions['Ae'] = 'Ä';
            conversions['Ue'] = 'Ü';
            conversions['Oe'] = 'Ö';
            conversions['A'] = 'À|Á|Â|Ã|Ä|Å|Ǻ|Ā|Ă|Ą|Ǎ';
            conversions['a'] = 'à|á|â|ã|å|ǻ|ā|ă|ą|ǎ|ª';
            conversions['C'] = 'Ç|Ć|Ĉ|Ċ|Č';
            conversions['c'] = 'ç|ć|ĉ|ċ|č';
            conversions['D'] = 'Ð|Ď|Đ';
            conversions['d'] = 'ð|ď|đ';
            conversions['E'] = 'È|É|Ê|Ë|Ē|Ĕ|Ė|Ę|Ě';
            conversions['e'] = 'è|é|ê|ë|ē|ĕ|ė|ę|ě';
            conversions['G'] = 'Ĝ|Ğ|Ġ|Ģ';
            conversions['g'] = 'ĝ|ğ|ġ|ģ';
            conversions['H'] = 'Ĥ|Ħ';
            conversions['h'] = 'ĥ|ħ';
            conversions['I'] = 'Ì|Í|Î|Ï|Ĩ|Ī|Ĭ|Ǐ|Į|İ';
            conversions['i'] = 'ì|í|î|ï|ĩ|ī|ĭ|ǐ|į|ı';
            conversions['J'] = 'Ĵ';
            conversions['j'] = 'ĵ';
            conversions['K'] = 'Ķ';
            conversions['k'] = 'ķ';
            conversions['L'] = 'Ĺ|Ļ|Ľ|Ŀ|Ł';
            conversions['l'] = 'ĺ|ļ|ľ|ŀ|ł';
            conversions['N'] = 'Ñ|Ń|Ņ|Ň';
            conversions['n'] = 'ñ|ń|ņ|ň|ŉ';
            conversions['O'] = 'Ò|Ó|Ô|Õ|Ō|Ŏ|Ǒ|Ő|Ơ|Ø|Ǿ';
            conversions['o'] = 'ò|ó|ô|õ|ō|ŏ|ǒ|ő|ơ|ø|ǿ|º';
            conversions['R'] = 'Ŕ|Ŗ|Ř';
            conversions['r'] = 'ŕ|ŗ|ř';
            conversions['S'] = 'Ś|Ŝ|Ş|Š';
            conversions['s'] = 'ś|ŝ|ş|š|ſ';
            conversions['T'] = 'Ţ|Ť|Ŧ';
            conversions['t'] = 'ţ|ť|ŧ';
            conversions['U'] = 'Ù|Ú|Û|Ũ|Ū|Ŭ|Ů|Ű|Ų|Ư|Ǔ|Ǖ|Ǘ|Ǚ|Ǜ';
            conversions['u'] = 'ù|ú|û|ũ|ū|ŭ|ů|ű|ų|ư|ǔ|ǖ|ǘ|ǚ|ǜ';
            conversions['Y'] = 'Ý|Ÿ|Ŷ';
            conversions['y'] = 'ý|ÿ|ŷ';
            conversions['W'] = 'Ŵ';
            conversions['w'] = 'ŵ';
            conversions['Z'] = 'Ź|Ż|Ž';
            conversions['z'] = 'ź|ż|ž';
            conversions['AE'] = 'Æ|Ǽ';
            conversions['ss'] = 'ß';
            conversions['IJ'] = 'Ĳ';
            conversions['ij'] = 'ĳ';
            conversions['OE'] = 'Œ';
            conversions['f'] = 'ƒ';
            for (let i in conversions) {
                let re = new RegExp(conversions[i], "g");
                str = str.replace(re, i);
            }
            return str;
        },
        clickBladeMode(event, href, blademode) {
            if (!blademode) {
                event.preventDefault()
                if (this.$route.path !== href) this.$router.push(href)
            }
        },
        getRandomId() {
            return '_' + Math.random().toString(36).substr(2, 9);
        },
        sumObject(items, prop) {
            return items.reduce(function (a, b) {
                return parseFloat(a) + parseFloat(b[prop]);
            }, 0);
        },
        notAfterToday(date) {
            return date > new Date(new Date().setHours(0, 0, 0, 0));
        },
        imageError(e) {
            e.target.src = '/img/logo_drugovich.png';
        },
    }
}
