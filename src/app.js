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

const Minutagem = {
  timeSignatures: [
    { formula: "2x4",  tempoCount: 2 },
    { formula: "3x4",  tempoCount: 3 },
    { formula: "4x4",  tempoCount: 4 },
    { formula: "6x4",  tempoCount: 6 },
    { formula: "3x8",  tempoCount: 1 },
    { formula: "6x8",  tempoCount: 2 },
    { formula: "9x8",  tempoCount: 3 },
    { formula: "12x8", tempoCount: 4 }
  ],

  calculate: function(bpm, timeSignature, barCount) {
    beatInSeconds = 60 / bpm
    totalTempoCount = timeSignature.tempoCount * barCount
    return Math.round(beatInSeconds * totalTempoCount);
  }
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

  document.querySelector("#result").innerHTML = `A música tem ${value} minutos`
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
      controlValidationError(hide = true)

      const resultado = calculateMinutagem();
      if (resultado) {
        controlResult(hide = false, value = resultado.toString().toHHMMSS())
      } else {
        controlValidationError(hide = false);
      }
    })
}
