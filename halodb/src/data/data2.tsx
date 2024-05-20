const columns = [
  // Submission
    {title: "id", dataIndex: "id", key: "id"},
    {title: "created", dataIndex: "created", key: "created"},
    {title: "updated", dataIndex: "updated", key: "updated"},
    {title: "user", dataIndex: "user_id", key: "user_id"},
  // Sample information  
    {title: "Sample name", dataIndex: "name", key: "name"},
    {title: "Sample type", dataIndex: "stype", key: "stype"},
    {title: "Sample size", dataIndex: "ssize", key: "ssize"},
    {title: "Sample size unit", dataIndex: "ssizeunit", key: "ssizeunit"},
    {title: "Keywords", dataIndex: "keywords", key: "keywords"},
  // Authorship
    {title: "Authors", dataIndex: "auth", key: "auth"},
    {title: "Title", dataIndex: "titl", key: "titl"},
    {title: "Journal", dataIndex: "jour", key: "jour"},
    {title: "Volume", dataIndex: "volume", key: "volume"},
    {title: "Pages", dataIndex: "pages", key: "pages"},
    {title: "DOI", dataIndex: "doi", key: "doi"},
  // Material
    {title: "Cultured", dataIndex: "cult", key: "cult"},
    {title: "Kind of material", dataIndex: "koma", key: "koma"},
    {title: "Is for a new taxon?", dataIndex: "typn", key: "typn"},
    {title: "Type strain", dataIndex: "otyp", key: "otyp"},
    {title: "Taxonumber", dataIndex: "txnr", key: "txnr"},
    {title: "Submitted to culture collection", dataIndex: "ccsu", key: "ccsu"},
    {title: "Designed type strain name", dataIndex: "type", key: "type"},
    {title: "Strain collection numbers", dataIndex: "coln", key: "coln"},
    {title: "Other", dataIndex: "coth", key: "coth"},
  // Gene and genome
    {title: "16s rRNA", dataIndex: "sixteensr", key: "sixteensr"},
    {title: "235 rRNA", dataIndex: "twentythreesr", key: "twentythreesr"},
    {title: "Sequencing depth", dataIndex: "seqdepth", key: "seqdepth"},
    {title: "Alternative housekeeping", dataIndex: "hkgn", key: "hkgn"},
    {title: "Metagenome accession number", dataIndex: "meca", key: "meca"},
    {title: "RefSeq", dataIndex: "gare", key: "gare"},
    {title: "other", dataIndex: "binn", key: "binn"},
    {title: "Genome status", dataIndex: "gsta", key: "gsta"},
    {title: "Completeness", dataIndex: "completeness", key: "completeness"},
    {title: "Contamination", dataIndex: "contamination", key: "contamination"},
    {title: "Method", dataIndex: "method", key: "method"},
    {title: "Genome size", dataIndex: "gsiz", key: "gsiz"},
    {title: "GC mol %", dataIndex: "ggcm", key: "ggcm"},
    {title: "DNA extraction method", dataIndex: "dnae", key: "dnae"},
    {title: "Assembly", dataIndex: "asem", key: "asem"},
    {title: "Assembly software", dataIndex: "asft", key: "asft"},
    {title: "Sequencing technology", dataIndex: "seqt", key: "seqt"},
    {title: "Binning software", dataIndex: "bins", key: "bins"},
    {title: "Binning software params", dataIndex: "binsparams", key: "binsparams"},
  // Origin
    {title: "Country", dataIndex: "coun", key: "coun"},
    {title: "Region", dataIndex: "regi", key: "regi"},
    {title: "Geographic location", dataIndex: "geol", key: "geol"},
    {title: "Latitude", dataIndex: "lati", key: "lati"},
    {title: "Longitude", dataIndex: "long", key: "long"},
    {title: "Altitude", dataIndex: "alti", key: "alti"},
    {title: "Depth", dataIndex: "dept", key: "dept"},
    {title: "Source", dataIndex: "sour", key: "sour"},
    {title: "Sampling date", dataIndex: "dats", key: "dats"},
    {title: "Hour of collection", dataIndex: "hocs", key: "hocs"},
    {title: "Date of isolation", dataIndex: "dati", key: "dati"},
    {title: "Date of isolation", dataIndex: "datu", key: "datu"},
    {title: "Temperature", dataIndex: "tems", key: "tems"},
    {title: "pH", dataIndex: "phsa", key: "phsa"},
    {title: "Salinity", dataIndex: "sals", key: "sals"},
  // Metabolic traits
    {title: "Energy metabolism", dataIndex: "emet", key: "emet"},
    {title: "Relationship to O2", dataIndex: "orel", key: "orel"},
    {title: "Terminal electron acceptor", dataIndex: "elac", key: "elac"},
    {title: "Temperature optimum", dataIndex: "temo", key: "temo"},
    {title: "Lowest temperature", dataIndex: "teml", key: "teml"},
    {title: "Highest temperature", dataIndex: "temh", key: "temh"},
    {title: "Temperature category", dataIndex: "temc", key: "temc"},
    {title: "pH optimum", dataIndex: "phop", key: "phop"},
    {title: "Lowest pH", dataIndex: "phlo", key: "phlo"},
    {title: "Highest pH", dataIndex: "phhi", key: "phhi"},
    {title: "Salinity optimum", dataIndex: "salo", key: "salo"},
    {title: "Lowest NaCl concentration", dataIndex: "sall", key: "sall"},
    {title: "Highest NaCl concentration", dataIndex: "salh", key: "salh"},
    {title: "Salinity category", dataIndex: "salc", key: "salc"},
  // Other on the organism
    {title: "Biosafety level", dataIndex: "bios", key: "bios"},
    {title: "Habitat", dataIndex: "habt", key: "habt"},
    {title: "Biotic relationship", dataIndex: "bior", key: "bior"},
    {title: "Symbiosis with the host", dataIndex: "host", key: "host"},
    {title: "Known pathogenicity", dataIndex: "path", key: "path"},
    {title: "Miscellaneous", dataIndex: "extr", key: "extr"},
  // Sequencing
    {title: "Sequencing fraction", dataIndex: "sfrac", key: "sfrac"},
    {title: "Target nucelic acid", dataIndex: "target", key: "target"},
    {title: "Raw reads number", dataIndex: "rreadsnum", key: "rreadsnum"},
    {title: "Trimmed reads number", dataIndex: "treadsnum", key: "treadsnum"},
    {title: "Coverage", dataIndex: "coverage", key: "coverage"},
    {title: "Assembly size", dataIndex: "asize", key: "asize"},
    {title: "Number of contigs", dataIndex: "contignumber", key: "contignumber"},
    {title: "Nagoya protocol", dataIndex: "nagoya", key: "nagoya"},
    {title: "Sequrl", dataIndex: "sequrl", key: "sequrl"},
    {title: "Strain collection number", dataIndex: "strccol", key: "strccol"},
  // Files
    {title: "Files", dataIndex: "files", key: "files"}
    
]
interface DataType {
  id: number,
  created: Date,
  updated: Date,
  user_id: number,
  name?: string,
  stype?: string,
  ssize?: number,
  ssizeunit?: string,
  auth?: string,
  titl?: string
  jour?: string,
  volume?: string,
  pages?: string,
  doi?: string,
  cult?: string,
  koma?: string,
  typn?: string,
  otyp?: string,
  txnr?: number,
  ccsu?: string,
  type?: string,
  coln?: string,
  coth?: string
  sixteensr?: string,
  twentythreesr?: string,
  seqdepth?: string,
  hkgn?: string,
  meca?: string,
  gare?: string,
  binn?: string,
  gsta?: string,
  completeness?: number,
  contamination?: number,
  method?: string,
  gsiz?: number,
  ggcm?: number,
  dnae?: string,
  asem?: string,
  asft?: string,
  seqt?: string,
  bins?: string,
  binsparams?: string,
  coun?: string,
  regi?: string,
  geol?: string,
  lati?: string,
  long?: string,
  alti?: number,
  dept?: number
  sour?: string,
  dats?: Date,
  hocs?: string,
  dati?: Date,
  datu?: Date,
  tems?: number,
  phsa?: number,
  sals?: number,
  emet?: string,
  orel?: string,
  elac?: string,
  temo?: number,
  teml?: number,
  temh?: number,
  temc?: string,
  phop?: number,
  phlo?: number,
  phhi?: number,
  salo?: number,
  sall?: number,
  salh?: number,
  salc?: string,
  bios?: string,
  habt?: string,
  bior?: string,
  host?: string,
  path?: string,
  extr?: string,
  sfrac?: string,
  target?: string,
  rreadsnum?: number,
  treadsnum?: number,
  coverage?: string,
  asize?: number,
  contignumber?: number,
  nagoya?: string,
  sequrl?: string,
  strccol?: string,
  Sample?: string,
  files?: string[]
  }

type DataIndex = keyof DataType;




const OptionsSubmission = columns.slice(0,4).map(({ key, title }, _) => ({
  label: title,
  value: key,
}));

const OptionsSample = columns.slice(4,9).map(({ key, title }, _) => ({
  label: title,
  value: key,
}));
const OptionsAuthorship = columns.slice(9,15).map(({ key, title }, _) => ({
  label: title,
  value: key,
}));
const OptionsMaterial = columns.slice(15,24).map(({ key, title }, _) => ({
  label: title,
  value: key,
}));
const OptionsGene = columns.slice(24,43).map(({ key, title }, _) => ({
  label: title,
  value: key,
}));
const OptionsOrigin = columns.slice(43,58).map(({ key, title }, _) => ({
  label: title,
  value: key,
}));
const OptionsMetabolic = columns.slice(58,72).map(({ key, title }, _) => ({
  label: title,
  value: key,
}));
const OptionsOrganism = columns.slice(72,78).map(({ key, title }, _) => ({
  label: title,
  value: key,
}));
const OptionsSequencing = columns.slice(78,88).map(({ key, title }, _) => ({
  label: title,
  value: key,
}));
const OptionsFiles = columns.slice(88,89).map(({ key, title }, _) => ({
  label: title,
  value: key,
}));
const options = columns.map(({ key, title }, i) => ({
  label: title + i,
  value: key,
}));

const PlainOptionsSubmission= OptionsSubmission.map((item) => item.value as string)
const PlainOptionsAuthorship= OptionsAuthorship.map((item) => item.value as string)
const PlainOptionsMaterial= OptionsMaterial.map((item) => item.value as string)
const PlainOptionsGene= OptionsGene.map((item) => item.value as string)
const PlainOptionsOrigin= OptionsOrigin.map((item) => item.value as string)
const PlainOptionsMetabolic= OptionsMetabolic.map((item) => item.value as string)
const PlainOptionsOrganism= OptionsOrganism.map((item) => item.value as string)
const PlainOptionsSample= OptionsSample.map((item) => item.value as string)
const PlainOptionsSequencing= OptionsSequencing.map((item) => item.value as string)
const PlainOptionsFiles= OptionsFiles.map((item) => item.value as string)

const Options = {
  'Submission': OptionsSubmission,
  'Sample': OptionsSample,
  'Authorship': OptionsAuthorship,
  'Material': OptionsMaterial,
  'Gene': OptionsGene,
  'Origin': OptionsOrigin,
  'Metabolic': OptionsMetabolic,
  'Organism': OptionsOrganism,
  'Sequencing': OptionsSequencing,
  'Files': OptionsFiles
}

const PlainOptions = {
  'Submission': PlainOptionsSubmission,
  'Sample': PlainOptionsSample,
  'Authorship': PlainOptionsAuthorship,
  'Material': PlainOptionsMaterial,
  'Gene': PlainOptionsGene,
  'Origin': PlainOptionsOrigin,
  'Metabolic': PlainOptionsMetabolic,
  'Organism': PlainOptionsOrganism,
  'Sequencing': PlainOptionsSequencing,
  'Files': PlainOptionsFiles
}

export {columns, OptionsSubmission, OptionsAuthorship, OptionsMaterial,
  OptionsGene, OptionsOrigin, OptionsMetabolic, OptionsOrganism, OptionsSample, OptionsSequencing, OptionsFiles,
  PlainOptionsSubmission, PlainOptionsAuthorship, PlainOptionsMaterial, PlainOptionsGene, PlainOptionsOrigin,
  PlainOptionsMetabolic, PlainOptionsOrganism, PlainOptionsSample, PlainOptionsSequencing, PlainOptionsFiles,
  Options, PlainOptions, options
}
export type {DataType, DataIndex}
