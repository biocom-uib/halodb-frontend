interface DataType {
    "VISIBILITY": string,
    "16SR": string, HKGN: string, MECA: string, GARE: string, GAEM: string, BINN: string,
    URL: string, GSTA: string, COMPLETENESS: string, CONTAMINATION: string, METHOD: string,
    GSIZ: string, GGCM: string, DNAE: string, ASEM: string, SEQT: string, BINS: string,
    ASFT: string, HOCS: string, COUN: string, REGI: string, DATI: string, DATU: string,
    SOUR: string, DATS: string, GEOL: string, LATI: string, LONG: string, DEPT: string,
    ALTI: string, TEMS: string, PHSA: string, SALS: string, EME: string, OREL: string,
    ELAC: string, TEMO: string, TEML: string, TEMH: string, TEMC: string, PHOP: string,
    PHLO: string, PHHI: string, PHCA: string, SALO: string, SALL: string, SALH: string,
    SALW: string, SALC: string, BIOS: string, HABT: string, BIOR: string, HOST: string,
    PATH: string, EXTR: string
  }
type DataIndex = keyof DataType;

const data_aux: DataType[] = [
    {
    "VISIBILITY": "public", "16SR": "16SR", HKGN: "HKGN", MECA: "MECA", GARE: "GARE", GAEM: "GAEM", BINN: "BINN",
    URL: "URL", GSTA: "GSTA", COMPLETENESS: "COMP", CONTAMINATION: "CONT", METHOD: "METH",
    GSIZ: "GSIZ", GGCM: "GGCM", DNAE: "DNAE", ASEM: "ASEM", SEQT: "SEQT", BINS: "BINS",
    ASFT: "ASFT", HOCS: "HOCS", COUN: "COUN", REGI: "REGI", DATI: "DATI", DATU: "DATU",
    SOUR: "SOUR", DATS: "DATS", GEOL: "GEOL", LATI: "LATI", LONG: "LONG", DEPT: "DEPT",
    ALTI: "ALTI", TEMS: "TEMS", PHSA: "PHSA", SALS: "SALS", EME: "EME", OREL: "OREL",
    ELAC: "ELAC", TEMO: "TEMO", TEML: "TEML", TEMH: "TEMH", TEMC: "TEMC", PHOP: "PHOP",
    PHLO: "PHLO", PHHI: "PHHI", PHCA: "PHCA", SALO: "SALO", SALL: "SALL", SALH: "SALH",
    SALW: "SALW", SALC: "SALC", BIOS: "BIOS", HABT: "HABT", BIOR: "BIOR", HOST: "HOST",
    PATH: "PATH", EXTR: "EXTR"
  },
  {
    "VISIBILITY": "private", "16SR": "16SR", HKGN: "HKGN", MECA: "MECA", GARE: "GARE", GAEM: "GAEM", BINN: "BINN",
    URL: "URL", GSTA: "GSTA", COMPLETENESS: "COMP", CONTAMINATION: "CONT", METHOD: "METH",
    GSIZ: "GSIZ", GGCM: "GGCM", DNAE: "DNAE", ASEM: "ASEM", SEQT: "SEQT", BINS: "BINS",
    ASFT: "ASFT", HOCS: "HOCS", COUN: "COUN", REGI: "REGI", DATI: "DATI", DATU: "DATU",
    SOUR: "SOUR", DATS: "DATS", GEOL: "GEOL", LATI: "LATI", LONG: "LONG", DEPT: "DEPT",
    ALTI: "ALTI", TEMS: "TEMS", PHSA: "PHSA", SALS: "SALS", EME: "EME", OREL: "OREL",
    ELAC: "ELAC", TEMO: "TEMO", TEML: "TEML", TEMH: "TEMH", TEMC: "TEMC", PHOP: "PHOP",
    PHLO: "PHLO", PHHI: "PHHI", PHCA: "PHCA", SALO: "SALO", SALL: "SALL", SALH: "SALH",
    SALW: "SALW", SALC: "SALC", BIOS: "BIOS", HABT: "HABT", BIOR: "BIOR", HOST: "HOST",
    PATH: "PATH", EXTR: "EXTR"
  },
  {
    "VISIBILITY": "group", "16SR": "16SR", HKGN: "HKGN", MECA: "MECA", GARE: "GARE", GAEM: "GAEM", BINN: "BINN",
    URL: "URL", GSTA: "GSTA", COMPLETENESS: "COMP", CONTAMINATION: "CONT", METHOD: "METH",
    GSIZ: "GSIZ", GGCM: "GGCM", DNAE: "DNAE", ASEM: "ASEM", SEQT: "SEQT", BINS: "BINS",
    ASFT: "ASFT", HOCS: "HOCS", COUN: "COUN", REGI: "REGI", DATI: "DATI", DATU: "DATU",
    SOUR: "SOUR", DATS: "DATS", GEOL: "GEOL", LATI: "LATI", LONG: "LONG", DEPT: "DEPT",
    ALTI: "ALTI", TEMS: "TEMS", PHSA: "PHSA", SALS: "SALS", EME: "EME", OREL: "OREL",
    ELAC: "ELAC", TEMO: "TEMO", TEML: "TEML", TEMH: "TEMH", TEMC: "TEMC", PHOP: "PHOP",
    PHLO: "PHLO", PHHI: "PHHI", PHCA: "PHCA", SALO: "SALO", SALL: "SALL", SALH: "SALH",
    SALW: "SALW", SALC: "SALC", BIOS: "BIOS", HABT: "HABT", BIOR: "BIOR", HOST: "HOST",
    PATH: "PATH", EXTR: "EXTR"
  }
  ];
  const data = Array(20).fill({}).map((_, i) => {
    const aux = Object.assign({}, data_aux[i%3])
    // @ts-ignore: Unreachable code error
    Object.keys(aux).forEach((key, _) => {aux[key] = key == "VISIBILITY"? aux[key] : aux[key] + i});
    return aux
  }
  )
  export {data}
  export type {DataType, DataIndex}


