const { cse_bbc, cse_bbc1 } = require("./connection")
const publisher = (topic, data) => {
    if (topic === "relay") {
        cse_bbc1.publish(
            "CSE_BBC1/feeds/bk-iot-relay",
            JSON.stringify({
                id: "11",
                name: "RELAY",
                data: data,
                unit: "",
            })
        )
        return
    }

    if (topic === "led") {
        cse_bbc.publish(
            "CSE_BBC/feeds/bk-iot-led",
            JSON.stringify({
                id: "1",
                name: "LED",
                data: data,
                unit: "",
            })
        )
        return
    }

    if (topic === "lcd") {
        cse_bbc.publish(
            "CSE_BBC/feeds/bk-iot-lcd",
            JSON.stringify({
                id: 5,
                name: "LCD",
                data: data,
                unit: "",
            })
        )
        return
    }
    if (topic === "drv") {
        cse_bbc.publish(
            "CSE_BBC/feeds/bk-iot-drv",
            JSON.stringify({
                id: 10,
                name: "DRV_PWM",
                data: data, //Math.round(power * 2.55).toString(),
                unit: "",
            })
        )
        return
    }
}

module.exports = publisher
