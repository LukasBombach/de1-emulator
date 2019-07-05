const bleno = require("bleno-mac");
const EchoCharacteristic = require("./characteristic");
const BlenoPrimaryService = bleno.PrimaryService;

console.log("bleno - echo");

bleno.on("stateChange", function(state) {
  console.log("on -> stateChange: " + state);

  if (state === "poweredOn") {
    bleno.startAdvertising("echo", ["ec00"]);
  } else {
    bleno.stopAdvertising();
  }
});

bleno.on("advertisingStart", function(error) {
  console.log(
    "on -> advertisingStart: " + (error ? "error " + error : "success")
  );

  if (!error) {
    bleno.setServices([
      new BlenoPrimaryService({
        uuid: "ec00",
        characteristics: [new EchoCharacteristic()]
      })
    ]);
  }
});
