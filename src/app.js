String.prototype.toHHMMSS = function () {
  var sec_num = parseInt(this, 10);
  var hours   = Math.floor(sec_num / 3600);
  var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
  var seconds = sec_num - (hours * 3600) - (minutes * 60);

  if (hours   < 10) {hours   = "0"+hours;}
  if (minutes < 10) {minutes = "0"+minutes;}
  if (seconds < 10) {seconds = "0"+seconds;}
  return hours+':'+minutes+':'+seconds;
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
  const bpm = document.querySelector("#bpm").value;
  const signatureFormula = document.querySelector("#signature-formula").value;
  const barCount = document.querySelector("#bar-count").value;

  if (!bpm || isNaN(bpm)) return null
  if (!signatureFormula) return null
  if (!barCount || isNaN(barCount)) return null

  const timeSignature = Minutagem.timeSignatures.find((item) => item.formula === signatureFormula)
  if (timeSignature) {
    return Minutagem.calculate(bpm, timeSignature, barCount)
  }

  return null
}

window.onload = function() {
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
        controlResult(hide = false, value = resultado.toString().toHHMMSS())
      } else {
        controlValidationError(hide = false);
      }
    })
}
