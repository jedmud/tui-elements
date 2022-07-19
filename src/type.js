const deepmerge = require('deepmerge')
const Printer = require('./printer')
const ansiwrap = require('@jedmud/ansiwrap')

module.exports = class {
    constructor(elements, config) {
        this.elements = elements
        this.config = config
        this.options = this.config.options
        this.force = false

        this.construct()
    }

    configure(params) {
        this.config.params = Object.assign(this.config.params, params)
        this.printer = new Printer(this.config.params)
        this.wrap = ansiwrap(this.config.params.width, this.options)
    }

    /**
     * Override in element class so super's constructor stays intact.
     * Most elements need this method.
     */
    construct() {
        //
    }

    /**
     * Override this in your element class.
     * It is called each time after all elements have been configured.
     */
    ready() {
        //
    }

    /**
     * Use this in your element class construct method
     * to merge dedicated config options.
     */
    mergeOptions(options) {
        this.options = deepmerge(options, this.options)
    }

    forceNext() {
        this.force = true

        return this
    }

    print(rows) {
        if (this.elements.muted === false || this.force === true) {
            this.printer.print(rows)

            this.force = false
        }
    }
}
