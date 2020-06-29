let multiplexer: teknologiskolen.Multiplexer = null
let multiplexer2: teknologiskolen.Multiplexer = null
basic.forever(function () {
    multiplexer = teknologiskolen.CreateMultiplexer(DigitalPin.P1, DigitalPin.P13, DigitalPin.P14, DigitalPin.P15, DigitalPin.P16)
    multiplexer2 = teknologiskolen.CreateMultiplexer(DigitalPin.P2, DigitalPin.P13, DigitalPin.P14, DigitalPin.P15, DigitalPin.P16)
    for (let index = 0; index <= 15; index++) {
        multiplexer.writeToMultiplexer(index, 1)
        basic.pause(100)
        serial.writeLine("Reading " + multiplexer2.readFromMultiplexer(index) + " on pin " + index)
        multiplexer.writeToMultiplexer(index, 0)
        basic.pause(100)
        serial.writeLine("Reading " + multiplexer2.readFromMultiplexer(index) + " on pin " + index)
        basic.pause(200)
    }
})
