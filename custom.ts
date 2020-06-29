
/**
 * Teknologiskole blocks
 */
//% weight=100 color=#D9534F icon=""
namespace teknologiskolen {
    /**
     * A Multiplexer
     */
    export class Multiplexer {
        signalPin: DigitalPin;
        sPins: DigitalPin[];

        //% block="%multiplexer|Write $value to pin $pin"
        //% multiplexer.defl=multiplexer
        //% pin.min=0 pin.max=15
        //% value.min=0 value.max=1
        writeToMultiplexer(pin: number, value: number): void {
            this.writePinSelector(pin);
            pins.digitalWritePin(this.signalPin, value);
        }

        //% block="%multiplexer|Read from pin $pin"
        //% multiplexer.defl=multiplexer
        //% pin.min=0 pin.max=15
        readFromMultiplexer(pin: number): number {
            this.writePinSelector(pin);
            return pins.digitalReadPin(this.signalPin);
        }

        writePinSelector(pin:number): void {
            let bits = ''; 
            while ( pin > 0 ) { 
                bits = ( pin % 2 ) + bits; 
                pin = Math.floor( pin / 2 ); 
            }
            let bitString = "0000" + bits;
            bitString = bitString.substr(bitString.length-4);

            for (let i = 0; i < 4; i++){
                if (bitString.charAt(i) == "1") {
                    pins.digitalWritePin(this.sPins[i], 1);
                } else {
                    pins.digitalWritePin(this.sPins[i], 0);
                } 
            }
        }
    }

    
    /**
     * Create a new Multiplexer driver.
     * @param signal the pin where the SIG pin of the multiplexer is connected.
     * @param s0 the pin of S0, assuming that the rest of S1 to S3 is connected to increasing pins.
     */
    //% block="Create Multiplexer with SIG:$signal and S0:$s0, S1:$s1, S2:$s2, S3:$s3"
    //% blockSetVariable=multiplexer
    //% inlineInputMode=inline
    export function createMultiplexer(signal: DigitalPin, s0: DigitalPin, s1: DigitalPin, s2: DigitalPin, s3: DigitalPin): Multiplexer {
        let multiplexer = new Multiplexer();
        multiplexer.signalPin = signal;
        multiplexer.sPins = [];
        multiplexer.sPins[0] = s0;
        multiplexer.sPins[1] = s1;
        multiplexer.sPins[2] = s2;
        multiplexer.sPins[3] = s3;
        return multiplexer;
    }
}
