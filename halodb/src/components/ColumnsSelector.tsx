import React from 'react';
import { Modal, Checkbox } from 'antd';

import {Options, columns, PlainOptions } from '../data/data2'

const options = columns.map(({ key, title }, i) => ({
  label: title + i,
  value: key,
}));

const ColumnsSelector = ({opened, setModal,
  checkedListSubmission, setCheckedListSubmission,
  checkedListAuthorship,setCheckedListAuthorship,
  checkedListMaterial, setCheckedListMaterial,
  checkedListGene, setCheckedListGene,
  checkedListOrigin, setCheckedListOrigin,
  checkedListMetabolic, setCheckedListMetabolic,
  checkedListOrganism, setCheckedListOrganism,
  checkedListSample, setCheckedListSample,
  checkedListSequencing, setCheckedListSequencing,
  checkedListFiles, setCheckedListFiles}) => {
  const checkedNum = checkedListSample.length + checkedListSubmission.length  + checkedListAuthorship.length + checkedListMaterial.length + checkedListGene.length + checkedListOrigin.length + checkedListMetabolic.length + checkedListOrganism.length + checkedListSequencing.length + checkedListFiles.length;
  const checkAll = options.length === checkedNum ;
  const indeterminate = checkedNum > 0 && checkedNum < options.length;
  const onCheckAllChange = (e) => {
    setCheckedListSubmission(e.target.checked?PlainOptions['Submission']:[]);
    setCheckedListSample(e.target.checked?PlainOptions['Sample']:[]);
    setCheckedListAuthorship(e.target.checked?PlainOptions['Authorship']:[]);
    setCheckedListMaterial(e.target.checked?PlainOptions['Material']:[]);
    setCheckedListGene(e.target.checked?PlainOptions['Gene']:[]);
    setCheckedListOrigin(e.target.checked?PlainOptions['Origin']:[]);
    setCheckedListMetabolic(e.target.checked?PlainOptions['Metabolic']:[]);
    setCheckedListOrganism(e.target.checked?PlainOptions['Organism']:[]);
    setCheckedListSequencing(e.target.checked?PlainOptions['Sequencing']:[]);
    setCheckedListFiles(e.target.checked?PlainOptions['Files']:[]);
  };
  const checkSubmission = checkedListSubmission.length === Options['Submission'].length;
  const checkSample = checkedListSample.length === Options['Sample'].length;
  const checkAuthorship = checkedListAuthorship.length === Options['Authorship'].length;
  const checkMaterial = checkedListMaterial.length === Options['Material'].length;
  const checkGene = checkedListGene.length === Options['Gene'].length;
  const checkOrigin = checkedListOrigin.length === Options['Origin'].length;
  const checkMetabolic = checkedListMetabolic.length === Options['Metabolic'].length;
  const checkOrganism = checkedListOrganism.length === Options['Organism'].length;
  const checkSequencing = checkedListSequencing.length === Options['Sequencing'].length;
  const checkFiles = checkedListFiles.length === Options['Files'].length;
  
  const hiddenSubmission = checkedListSubmission.length === 0;
  const hiddenSample = checkedListSample.length === 0;
  const hiddenAuthorship = checkedListAuthorship.length === 0;
  const hiddenMaterial = checkedListMaterial.length === 0;
  const hiddenGene = checkedListGene.length === 0;
  const hiddenOrigin = checkedListOrigin.length === 0;
  const hiddenMetabolic = checkedListMetabolic.length === 0;
  const hiddenOrganism = checkedListOrganism.length === 0;
  const hiddenSequencing = checkedListSequencing.length === 0;
  const hiddenFiles = checkedListFiles.length === 0;
  

  const indeterminateSubmission = !checkSubmission && !hiddenSubmission;
  const indeterminateSample = !checkSample && !hiddenSample;
  const indeterminateAuthorship = !checkAuthorship && !hiddenAuthorship;
  const indeterminateMaterial = !checkMaterial && !hiddenMaterial;
  const indeterminateGene = !checkGene && !hiddenGene;
  const indeterminateOrigin = !checkOrigin && !hiddenOrigin;
  const indeterminateMetabolic = !checkMetabolic && !hiddenMetabolic;
  const indeterminateOrganism = !checkOrganism && !hiddenOrganism;
  const indeterminateSequencing = !checkSequencing && !hiddenSequencing;
  const indeterminateFiles = !checkFiles && !hiddenFiles;
 return (
    <Modal
    title="Select columns to display"
    centered
    open={opened}
    onOk={() => setModal(false)}
    onCancel={() => setModal(false)}
  >
    <Checkbox indeterminate={indeterminate} onChange={onCheckAllChange} checked={checkAll}>
      <h4>Select All </h4></Checkbox>
  <p></p>    
    <Checkbox indeterminate={indeterminateSubmission} onChange={(e) => {setCheckedListSubmission(e.target.checked?PlainOptions['Submission']:[])}} checked={checkSubmission} key={'Submission'}>
      <h4>Information on the submission </h4></Checkbox>
    <p></p>
    <Checkbox.Group options={Options['Submission']} value={checkedListSubmission} onChange={setCheckedListSubmission}  key={'Submission-Group'} />

    <Checkbox indeterminate={indeterminateSample} onChange={(e) => {setCheckedListSample(e.target.checked?PlainOptions['Sample']:[])}} checked={checkSample} key={'Sample'}>
      <h4>Information on the sample </h4></Checkbox>
    <p></p>
    <Checkbox.Group options={Options['Sample']} value={checkedListSample} onChange={setCheckedListSample}  key={'Sample-Group'} />


    <Checkbox indeterminate={indeterminateAuthorship} onChange={(e) => {setCheckedListAuthorship(e.target.checked?PlainOptions['Authorship']:[])}} checked={checkAuthorship} key={'Authorship'}>
      <h4>Information on the Authorship </h4></Checkbox>
    <p></p>
    <Checkbox.Group options={Options['Authorship']} value={checkedListAuthorship} onChange={setCheckedListAuthorship}  key={'Authorship-Group'} />
  
    <Checkbox indeterminate={indeterminateMaterial} onChange={(e) => {setCheckedListMaterial(e.target.checked?PlainOptions['Material']:[])}} checked={checkMaterial} key={'Material'}>
      <h4>Information on the material </h4></Checkbox>
    <p></p>
    <Checkbox.Group options={Options['Material']} value={checkedListMaterial} onChange={setCheckedListMaterial}  key={'Material-Group'} />
  
    <Checkbox indeterminate={indeterminateGene} onChange={(e) => {setCheckedListGene(e.target.checked?PlainOptions['Gene']:[])}} checked={checkGene} key={'Gene'}>
      <h4>Information on the gene </h4></Checkbox>
    <p></p>
    <Checkbox.Group options={Options['Gene']} value={checkedListGene} onChange={setCheckedListGene}  key={'Gene-Group'} />

    <Checkbox indeterminate={indeterminateOrigin} onChange={(e) => {setCheckedListOrigin(e.target.checked?PlainOptions['Origin']:[])}} checked={checkOrigin} key={'Origin'}>
      <h4>Information on the origin </h4></Checkbox>
    <p></p>
    <Checkbox.Group options={Options['Origin']} value={checkedListOrigin} onChange={setCheckedListOrigin}  key={'Origin-Group'} />
  
    <Checkbox indeterminate={indeterminateMetabolic} onChange={(e) => {setCheckedListMetabolic(e.target.checked?PlainOptions['Metabolic']:[])}} checked={checkMetabolic} key={'Metabolic'}>
      <h4>Information on the Metabolic </h4></Checkbox>
    <p></p>
    <Checkbox.Group options={Options['Metabolic']} value={checkedListMetabolic} onChange={setCheckedListMetabolic}  key={'Metabolic-Group'} />
    
    <Checkbox indeterminate={indeterminateOrganism} onChange={(e) => {setCheckedListOrganism(e.target.checked?PlainOptions['Organism']:[])}} checked={checkOrganism} key={'Organism'}>
      <h4>Information on the Organism </h4></Checkbox>
    <p></p>
    <Checkbox.Group options={Options['Organism']} value={checkedListOrganism} onChange={setCheckedListOrganism}  key={'Organism-Group'} />
  
    <Checkbox indeterminate={indeterminateSequencing} onChange={(e) => {setCheckedListSequencing(e.target.checked?PlainOptions['Sequencing']:[])}} checked={checkSequencing} key={'Sequencing'}>
      <h4>Information on the Sequencing </h4></Checkbox>
    <p></p>
    <Checkbox.Group options={Options['Sequencing']} value={checkedListSequencing} onChange={setCheckedListSequencing}  key={'Sequencing-Group'} />
  
    <Checkbox indeterminate={indeterminateFiles} onChange={(e) => {setCheckedListFiles(e.target.checked?PlainOptions['Files']:[])}} checked={checkFiles} key={'Files'}>
      <h4>Information on the Files </h4></Checkbox>
    <p></p>
    <Checkbox.Group options={Options['Files']} value={checkedListFiles} onChange={setCheckedListFiles}  key={'Files-Group'} />
  </Modal>


  )
}

export default ColumnsSelector