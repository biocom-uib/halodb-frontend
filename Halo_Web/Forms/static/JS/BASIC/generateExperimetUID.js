CLASSIFICADORS={
    "RAW READS" : "RR",
    "TRIMMED READS" : "TR",
    "CONTIGS" : "CO",
    "PREDICTED GENES" : "PG",
    "MAGS" : "MA",
    "CONTIGS VIRUS": "CV",
    "GENOME" : "GE",
    "PEPTIDES" : "PE",
    "SINGLE CELL GENOME" : "SC",
    "PLASMID" : "PL",
}
function generarClasificador(source_id, id, table) {
  function toBase36Padded(num) {
    return num.toString(36).padStart(4, '0');
  }

  return (CLASSIFICADORS[table] + toBase36Padded(source_id) + toBase36Padded(id));
}
