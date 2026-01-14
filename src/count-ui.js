/**
 * Count UI v.0.1.1
 * Author: Jahongir Sobirov
 * Lisence: MIT
 * All rights reserved (c) 2025
 */
class CountUI extends HTMLElement {
    connectedCallback() {
        this.render()
    }

    static get observedAttributes() {
        return ['val', 'sep', 'short', 'prec', 'pref', 'suff', 'to', 'from', 'dur', 'loc', 'curr', 'ease']
    }

    attributeChangedCallback() {
        if (this.hasAttribute('to')) {
            this.animate()
        } else {
            this.render()
        }
    }

    render() {
        const raw = this.getAttribute('val')
        const num = Number(raw)

        if (isNaN(num)) {
            this.textContent = '—'
            return
        }

        this.renderValue(num)
    }


    shortFormat(num) {
        if (num >= 1e9) return (num / 1e9).toFixed(1) + 'B'
        if (num >= 1e6) return (num / 1e6).toFixed(1) + 'M'
        if (num >= 1e3) return (num / 1e3).toFixed(1) + 'K'
        return num.toString()
    }

    animate() {
        const from = Number(this.getAttribute('from')) || 0
        const to = Number(this.getAttribute('to'))
        const duration = Number(this.getAttribute('duration')) || 1000
        const easingFn = this.getEasing().bind(this)

        let startTime = null

        const step = (timestamp) => {
            if (!startTime) startTime = timestamp

            const elapsed = timestamp - startTime
            const progress = Math.min(elapsed / duration, 1)

            // 🔥 Apply easing here
            const eased = easingFn(progress)

            const current = from + (to - from) * eased

            this.renderValue(current)

            if (progress < 1) {
            requestAnimationFrame(step)
            }
        }

        requestAnimationFrame(step)
    }

    renderValue(num) {

        const intlFormatted = this.formatWithIntl(num)
        if (intlFormatted) {
            this.textContent = intlFormatted
            return
        }

        // Apply short
        if (this.hasAttribute('short')) {
            num = this.shortFormat(num)
        } else {
            const prec = this.getAttribute('prec')
            if (prec !== null) num = Number(num).toFixed(prec)

            const sep = this.getAttribute('sep') || ','
            let [intPart, decPart] = num.toString().split('.')
            intPart = intPart.replace(/\B(?=(\d{3})+(?!\d))/g, sep)
            num = decPart ? `${intPart}.${decPart}` : intPart
        }

        const pref = this.getAttribute('pref') || ''
        const suff = this.getAttribute('suff') || ''

        this.textContent = `${pref}${num}${suff}`
    }

    formatWithIntl(num) {
        const locale = this.getAttribute('loc') || undefined
        const currency = this.getAttribute('curr')

        if (currency) {
            return new Intl.NumberFormat(locale, {
            style: 'currency',
            currency
            }).format(num)
        }

        if (locale) {
            return new Intl.NumberFormat(locale).format(num)
        }

        return null
    }

    easeLinear(t) {
        return t
    }

    easeIn(t) {
        return t * t
    }

    easeOut(t) {
        return 1 - Math.pow(1 - t, 2)
    }

    easeInOut(t) {
        return t < 0.5
            ? 2 * t * t
            : 1 - Math.pow(-2 * t + 2, 2) / 2
    }

    getEasing() {
        const easing = this.getAttribute('ease') || 'linear'

        return {
            'linear': this.easeLinear,
            'ease-in': this.easeIn,
            'ease-out': this.easeOut,
            'ease-in-out': this.easeInOut
        }[easing] || this.easeLinear
    }
}

customElements.define('count-ui', CountUI)
