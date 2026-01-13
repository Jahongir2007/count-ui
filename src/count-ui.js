/*
  Author: Jahongir Sobirov
  Lisence: MIT
  All rights reserved (c) 2025
*/
class CountUI extends HTMLElement {
    connectedCallback() {
        this.render()
    }

    static get observedAttributes() {
        return ['val', 'sep', 'short', 'prec', 'pref', 'suff']
    }

    attributeChangedCallback() {
        this.render()
    }

    render() {
        const raw = this.getAttribute('val')
        let num = Number(raw)

        if (isNaN(num)) {
            this.textContent = '—'
            return
        }

        // 1️⃣ Short format
        if (this.hasAttribute('short')) {
            num = this.shortFormat(num)
        } else {
            // 2️⃣ Apply precision if given
            const precisionAttr = this.getAttribute('prec')
            if (precisionAttr !== null) {
                num = num.toFixed(Number(precisionAttr))
            }

            // 3️⃣ Apply separator
            const sep = this.getAttribute('sep') || ','
            let [intPart, decPart] = num.toString().split('.')
            intPart = intPart.replace(/\B(?=(\d{3})+(?!\d))/g, sep)
            num = decPart ? `${intPart}.${decPart}` : intPart
        }

        // 4️⃣ Add prefix / suffix
        const prefix = this.getAttribute('pref') || ''
        const suffix = this.getAttribute('suff') || ''

        this.textContent = `${prefix}${num}${suffix}`
    }


    shortFormat(num) {
        if (num >= 1e9) return (num / 1e9).toFixed(1) + 'B'
        if (num >= 1e6) return (num / 1e6).toFixed(1) + 'M'
        if (num >= 1e3) return (num / 1e3).toFixed(1) + 'K'
        return num.toString()
    }
}

customElements.define('count-ui', CountUI)
