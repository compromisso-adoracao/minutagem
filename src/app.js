const toHHMMSS = function(seconds) {
  var hours   = Math.floor(seconds / 3600);
  var minutes = Math.floor((seconds - (hours * 3600)) / 60);
  var seconds = seconds - (hours * 3600) - (minutes * 60);

  if (hours   < 10) {hours   = "0"+hours;}
  if (minutes < 10) {minutes = "0"+minutes;}
  if (seconds < 10) {seconds = "0"+seconds;}

  return hours + ':' + minutes + ':' + seconds;
}

const populateTimeSignatureOptions = function() {
  const selectElement = document.querySelector("#signature-formula")
  Minutagem.timeSignatures.forEach((timeSignature) => {
    const option = document.createElement("option")
    option.value = timeSignature.formula
    option.innerHTML = timeSignature.formula
    selectElement.appendChild(option)
  })
}

const controlValidationError = function(hide) {
  if (hide) {
    document.querySelector("#validation-error").classList.add("d-none")
  } else {
    document.querySelector("#validation-error").classList.remove("d-none")
  }
}

const controlResult = function(hide, value) {
  if (hide) {
    document.querySelector("#result").classList.add("d-none")
  } else {
    document.querySelector("#result").classList.remove("d-none")
  }

  document.querySelector("#result").innerHTML = `A música tem ${value}`
}

const calculateMinutagem = function() {
  const bpm = parseInt(document.querySelector("#bpm").value)
  const signatureFormula = document.querySelector("#signature-formula").value;
  const barCount = parseInt(document.querySelector("#bar-count").value);
  const aditionalSeconds = parseInt(document.querySelector("#aditional-seconds").value);

  if (isNaN(bpm)) return null
  if (!signatureFormula) return null
  if (isNaN(barCount)) return null
  if (isNaN(aditionalSeconds)) return null

  const timeSignature = Minutagem.timeSignatures.find((item) => item.formula === signatureFormula);

  if (timeSignature) {
    return Minutagem.calculate(bpm, timeSignature, barCount) + aditionalSeconds;
  }

  return null
}

window.onload = function() {
  document.querySelector("#aditional-seconds").value = 0;
  controlValidationError(hide = true)
  controlResult(hide = true)

  populateTimeSignatureOptions()
  document.
    querySelector("#calculate-button").
    addEventListener("click", function() {
      controlResult(hide = true)
      controlValidationError(hide = true)

      const resultado = calculateMinutagem();
      if (resultado) {
        controlResult(hide = false, value = toHHMMSS(resultado))
      } else {
        controlValidationError(hide = false);
      }
    })
}
