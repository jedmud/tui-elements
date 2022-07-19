const ansi = require('ansi-escapes')

module.exports = class {
    constructor(params) {
        this.params = params
        this.rows = []
        this.length = 0

        if (this.params.width >= 1 && this.params.height >= 1) {
            this.init()
        }
    }

    init() {
        this.line = Array(this.params.width + 1).join(' ')
        this.rows = Array(this.params.height).fill(this.line)
        this.length = this.rows.length
    }

    print(rows) {
        let content = ''

        for (let i = 0; i < this.length; i++) {
            const row = rows[i] === undefined ? this.line : rows[i]

            if (row !== this.rows[i]) {
                const cursor = ansi.cursorTo(this.params.left, this.params.top + i)

                this.rows[i] = row
                content += cursor + this.line + cursor + row
            }
        }

        /**
         * Ansi reset escape ensures unclosed escapes
         * do not affect other elements.
         */
        if (content.length !== 0) {
            process.stdout.write('\u001b[0m' + content)
        }
    }
}
