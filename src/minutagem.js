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
