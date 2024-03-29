const deepmerge = require('deepmerge')
const defautConfig = require('../config.json')

module.exports = class {
    constructor() {
        this.elements = {}
        this.muted = true
    }

    create(types, config) {
        this.types = types
        this.config = config

        for (const element of this.config) {
            const config = deepmerge(defautConfig, element)

            this.elements[element.name] = new this.types[element.type](this, config)
        }

        return this
    }

    mute() {
        this.muted = true

        return this
    }

    unmute() {
        this.muted = false

        return this
    }

    configure(slots) {
        for (const name in this.elements) {
            const element = this.elements[name]

            element.configure(slots[element.config.slot])
        }

        for (const name in this.elements) {
            this.elements[name].ready()
        }

        return this
    }

    write() {
        for (const name in this.elements) {
            this.elements[name].write()
        }
    }
}
