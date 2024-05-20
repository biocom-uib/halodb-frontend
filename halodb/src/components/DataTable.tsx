import React, { useState, useRef } from 'react';
 
import { SearchOutlined, DownOutlined } from '@ant-design/icons';
import type { FilterDropdownProps } from 'antd/es/table/interface';
import Highlighter from 'react-highlight-words';
import { Space, Button, Table, Input, GetRef, TableColumnType, Popconfirm, Dropdown, Tag } from 'antd';

import type { DataType, DataIndex } from '../data/data2';
import { consoleLogger } from '../utils/logger';

type InputRef = GetRef<typeof Input>;
const { Column, ColumnGroup } = Table;

const DataTable = ({data, checkedListSubmission, checkedListAuthorship, checkedListMaterial, checkedListGene, checkedListOrigin,
  checkedListMetabolic, checkedListOrganism, checkedListSample, checkedListSequencing, checkedListFiles}) => {
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const searchInput = useRef<InputRef>(null);

    const handleSearch = (
        selectedKeys: string[],
        confirm: FilterDropdownProps['confirm'],
        dataIndex: DataIndex,
      ) => {
        confirm();
        setSearchText(selectedKeys[0]);
        setSearchedColumn(dataIndex);
      };
      const handleReset = (clearFilters: () => void) => {
        clearFilters();
        setSearchText('');
      };


    const getColumnSearchProps = (dataIndex: DataIndex): TableColumnType<DataType> => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
          <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
            <Input
              ref={searchInput}
              placeholder={`Search ${dataIndex}`}
              value={selectedKeys[0]}
              onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
              onPressEnter={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
              style={{ marginBottom: 8, display: 'block' }}
            />
            <Space>
              <Button
                type="primary"
                onClick={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
                icon={<SearchOutlined />}
                size="small"
                style={{ width: 90 }}
              >
                Search
              </Button>
              <Button
                onClick={() => clearFilters && handleReset(clearFilters)}
                size="small"
                style={{ width: 90 }}
              >
                Reset
              </Button>
              <Button
                type="link"
                size="small"
                onClick={() => {
                  confirm({ closeDropdown: false });
                  setSearchText((selectedKeys as string[])[0]);
                  setSearchedColumn(dataIndex);
                }}
              >
                Filter
              </Button>
              <Button
                type="link"
                size="small"
                onClick={() => {
                  close();
                }}
              >
                close
              </Button>
            </Space>
          </div>
        ),
        filterIcon: (filtered: boolean) => (
          <SearchOutlined style={{ color: filtered ? '#1677ff' : undefined }} />
        ),
        onFilter: (value, record) =>
          record[dataIndex]
            .toString()
            .toLowerCase()
            .includes((value as string).toLowerCase()),
        onFilterDropdownOpenChange: (visible) => {
          // if (visible) {
          //     setTimeout(() => searchInput.current!.select(), 100);
          // }
        },
        render: (text, record) => {
          if (dataIndex === 'name' && record['Sample'] === '<Sample 16>') {
            return (
              <Tag color={'volcano'} key={record['Sample']}>
                {record['Sample'].toUpperCase()}
              </Tag>
            );
          }
          if (dataIndex === 'name' && record['Sample'] === '<Sample 17>') {
            return (
              <button onClick={()=> console.log(record)}>
                  {"Button Text"}
              </button>

            )
          }
          if (dataIndex === 'name' && record['Sample'] === '<Sample 18>') {
            return   (
            <Popconfirm title="Sure to publish?" onConfirm={() => consoleLogger('publish', record)}>
            <a href="#/">Publish</a>
          </Popconfirm>
            )
          }
          const items = [
            { key: '1', label: <button onClick={() => consoleLogger('click')}>
            {'File 1 - ' + record['Sample']}
          </button> },
            { key: '2', label: <button onClick={() => consoleLogger('click')}>
            {'File 2 - ' + record['Sample']}
          </button> },
          ];
          if (dataIndex === 'files') {
            return(
            <Dropdown menu={{items}}>
            <a href="#/">
              Files <DownOutlined />
            </a>
          </Dropdown>
            )
          }
          const returnValue = searchedColumn === dataIndex ? (
            <Highlighter
              highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
              searchWords={[searchText]}
              autoEscape
              textToHighlight={text ? text.toString() : ''}
            />
          ) : (
            text
          );
          return returnValue;
        },
      });
      const hidden = {
        'Submission': checkedListSubmission.length === 0,
        'Sample': checkedListSample.length === 0,
        'Authorship': checkedListAuthorship.length === 0,
        'Material': checkedListMaterial.length === 0,
        'Gene': checkedListGene.length === 0,
        'Origin': checkedListOrigin.length === 0,
        'Metabolic': checkedListMetabolic.length === 0,
        'Organism': checkedListOrganism.length === 0,
        'Sequencing': checkedListSequencing.length === 0,
        'Files': checkedListFiles.length === 0,
      }
      
    return (
        <Table
        scroll={{ x: 1300}}
        pagination={{ defaultPageSize: 10, showSizeChanger: true, pageSizeOptions: ['10', '20', '30']}}
        bordered
        dataSource={data}>
     <ColumnGroup title="Information on the submission" hidden={hidden['Submission']} >
      <Column title="id" dataIndex="id" key="id" width="2000" hidden={!checkedListSubmission.includes("id")} {...getColumnSearchProps("id")} />
      <Column title="created" dataIndex="created" key="created" hidden={!checkedListSubmission.includes("created")} {...getColumnSearchProps("created")}/>
      <Column title="updated" dataIndex="updated" key="updated" hidden={!checkedListSubmission.includes("updated")} {...getColumnSearchProps("updated")}/>
      <Column title="user" dataIndex="user_id" key="user_id" hidden={!checkedListSubmission.includes("user_id")} {...getColumnSearchProps("user_id")}/>
      </ColumnGroup>
      <ColumnGroup title="Sample information" hidden={hidden['Sample']}>
    <Column title="Sample name" dataIndex="name" key="name" hidden={!checkedListSample.includes("name")} {...getColumnSearchProps("name")}/>
    <Column title="Sample type" dataIndex="stype" key="stype" hidden={!checkedListSample.includes("stype")} {...getColumnSearchProps("stype")}/>
    <Column title="Sample size" dataIndex="ssize" key="ssize" hidden={!checkedListSample.includes("ssize")} {...getColumnSearchProps("ssize")}/>
    <Column title="Sample size unity" dataIndex="ssizeunit" key="ssizeunit" hidden={!checkedListSample.includes("ssizeunit")} {...getColumnSearchProps("ssizeunit")}/>
    </ColumnGroup>
      <ColumnGroup title="Information on the authorship and publications" hidden={hidden['Authorship']}>
      <Column title="Authors" dataIndex="auth" key="auth" hidden={!checkedListAuthorship.includes("auth")} {...getColumnSearchProps("auth")}/>
      <Column title="Title" dataIndex="titl" key="titl" width={2000} hidden={!checkedListAuthorship.includes("titl")} {...getColumnSearchProps("titl")}/>
      <Column title="Journal" dataIndex="jour" key="jour" hidden={!checkedListAuthorship.includes("jour")} {...getColumnSearchProps("jour")}/>
      <Column title="Volume" dataIndex="volume" key="volume" hidden={!checkedListAuthorship.includes("volume")} {...getColumnSearchProps("volume")}/>
      <Column title="Pages" dataIndex="pages" key="pages" hidden={!checkedListAuthorship.includes("pages")} {...getColumnSearchProps("pages")}/>
      <Column title="DOI" dataIndex="doi" key="doi" hidden={!checkedListAuthorship.includes("doi")} {...getColumnSearchProps("doi")}/>
      </ColumnGroup>
      <ColumnGroup title="Kind of material" hidden={hidden['Material']}>
      <Column title="Cultured" dataIndex="cult" key="cult" hidden={!checkedListMaterial.includes("cult")} {...getColumnSearchProps("cult")}/>
      <Column title="Kind of material" dataIndex="koma" key="koma" hidden={!checkedListMaterial.includes("koma")} {...getColumnSearchProps("koma")}/>
      <Column title="Is for a new taxon?" dataIndex="typn" key="typn" hidden={!checkedListMaterial.includes("typn")} {...getColumnSearchProps("typn")}/>
      <Column title="Type strain" dataIndex="otyp" key="otyp" hidden={!checkedListMaterial.includes("otyp")} {...getColumnSearchProps("otyp")}/>
      <Column title="Taxonumber" dataIndex="txnr" key="txnr" hidden={!checkedListMaterial.includes("txnr")} {...getColumnSearchProps("txnr")}/>
      <Column title="Submitted to culture collection" dataIndex="ccsu" key="ccsu" hidden={!checkedListMaterial.includes("ccsu")} {...getColumnSearchProps("ccsu")}/>
      <Column title="Designed type strain name" dataIndex="type" key="type" hidden={!checkedListMaterial.includes("type")} {...getColumnSearchProps("type")}/>
      <Column title="Strain collection numbers" dataIndex="coln" key="coln" hidden={!checkedListMaterial.includes("coln")} {...getColumnSearchProps("coln")}/>
      <Column title="Other" dataIndex="coth" key="coth" hidden={!checkedListMaterial.includes("coth")} {...getColumnSearchProps("coth")}/>      
    </ColumnGroup>
    <ColumnGroup title="Gene and genome information" hidden={hidden['Gene']}>
    <Column title="16S rRNA gene accession number" dataIndex="sixteensr" key="sixteensr" hidden={!checkedListGene.includes("sixteensr")} {...getColumnSearchProps("sixteensr")}/>
    <Column title="Alternative housekeeping genes" dataIndex="hkgn" key="hkgn" hidden={!checkedListGene.includes("hkgn")} {...getColumnSearchProps("hkgn")}/>
    <Column title="Metagenome accession number" dataIndex="meca" key="meca" hidden={!checkedListGene.includes("meca")} {...getColumnSearchProps("meca")}/>
    <Column title="genome/MAG/SAG accession number [RefSeq]" dataIndex="gare" key="gare" hidden={!checkedListGene.includes("gare")} {...getColumnSearchProps("gare")}/>
    <Column title="genome/MAG/SAG accession number [other]" dataIndex="binn" key="binn" hidden={!checkedListGene.includes("binn")} {...getColumnSearchProps("binn")}/>
    <Column title="Genome status" dataIndex="gsta" key="gsta" hidden={!checkedListGene.includes("gsta")} {...getColumnSearchProps("gsta")}/>
    <Column title="Completeness" dataIndex="completeness" key="completeness" hidden={!checkedListGene.includes("completeness")} {...getColumnSearchProps("completeness")}/>
    <Column title="Level of contamination" dataIndex="contamination" key="contamination" hidden={!checkedListGene.includes("contamination")} {...getColumnSearchProps("contamination")}/>
    <Column title="Method" dataIndex="method" key="method" hidden={!checkedListGene.includes("method")} {...getColumnSearchProps("method")}/>
    <Column title="Genome size" dataIndex="gsiz" key="gsiz" hidden={!checkedListGene.includes("gsiz")} {...getColumnSearchProps("gsiz")}/>
    <Column title="GC mol %" dataIndex="ggcm" key="ggcm" hidden={!checkedListGene.includes("ggcm")} {...getColumnSearchProps("ggcm")}/>
    <Column title="DNA extraction method" dataIndex="dnae" key="dnae" hidden={!checkedListGene.includes("dnae")} {...getColumnSearchProps("dnae")}/>
    <Column title="Assembly" dataIndex="asem" key="asem" hidden={!checkedListGene.includes("asem")} {...getColumnSearchProps("asem")}/>
    <Column title="Sequencing Technology" dataIndex="seqt" key="seqt" hidden={!checkedListGene.includes("seqt")} {...getColumnSearchProps("seqt")}/>
    <Column title="Binning software" dataIndex="bins" key="bins" hidden={!checkedListGene.includes("bins")} {...getColumnSearchProps("bins")}/>
    <Column title="Assembly software" dataIndex="asft" key="asft" hidden={!checkedListGene.includes("asft")} {...getColumnSearchProps("asft")}/>
    </ColumnGroup>
    <ColumnGroup title="Metadata on the origin of the sample" hidden={hidden['Origin']}>
    <Column title="Country" dataIndex="coun" key="coun" hidden={!checkedListOrigin.includes("coun")} {...getColumnSearchProps("coun")}/>
    <Column title="Region" dataIndex="regi" key="regi" hidden={!checkedListOrigin.includes("regi")} {...getColumnSearchProps("regi")}/>
    <Column title="Geographic location" dataIndex="geol" key="geol" hidden={!checkedListOrigin.includes("geol")} {...getColumnSearchProps("geol")}/>
    <Column title="Latitude" dataIndex="lati" key="lati" hidden={!checkedListOrigin.includes("lati")} {...getColumnSearchProps("lati")}/>
    <Column title="Longitude" dataIndex="long" key="long" hidden={!checkedListOrigin.includes("long")} {...getColumnSearchProps("long")}/>
    <Column title="Altitude" dataIndex="alti" key="alti" hidden={!checkedListOrigin.includes("alti")} {...getColumnSearchProps("alti")}/>
    <Column title="Depth" dataIndex="dept" key="dept" hidden={!checkedListOrigin.includes("dept")} {...getColumnSearchProps("dept")}/>
    <Column title="Source" dataIndex="sour" key="sour" hidden={!checkedListOrigin.includes("sour")} {...getColumnSearchProps("sour")}/>
    <Column title="Sampling date" dataIndex="dats" key="dats" hidden={!checkedListOrigin.includes("dats")} {...getColumnSearchProps("dats")}/>
    <Column title="Hour of collection" dataIndex="hocs" key="hocs" hidden={!checkedListOrigin.includes("hocs")} {...getColumnSearchProps("hocs")}/>
    <Column title="Date of isolation" dataIndex="dati" key="dati" hidden={!checkedListOrigin.includes("dati")} {...getColumnSearchProps("dati")}/>
    <Column title="Date of isolation" dataIndex="datu" key="datu" hidden={!checkedListOrigin.includes("datu")} {...getColumnSearchProps("datu")}/>
    <Column title="Temperature" dataIndex="tems" key="tems" hidden={!checkedListOrigin.includes("tems")} {...getColumnSearchProps("tems")}/>
    <Column title="pH" dataIndex="phsa" key="phsa" hidden={!checkedListOrigin.includes("phsa")} {...getColumnSearchProps("phsa")}/>
    <Column title="Salinity" dataIndex="sals" key="sals" hidden={!checkedListOrigin.includes("sals")} {...getColumnSearchProps("sals")}/>
    </ColumnGroup>
    <ColumnGroup title="Basic metabolic traits determined nder culture conditions" hidden={hidden['Metabolic']}>
    <Column title="Energy metabolism" dataIndex="emet" key="emet" hidden={!checkedListMetabolic.includes("emet")} {...getColumnSearchProps("emet")}/>
    <Column title="Relationship to O2" dataIndex="orel" key="orel" hidden={!checkedListMetabolic.includes("orel")} {...getColumnSearchProps("orel")}/>
    <Column title="Terminal electron acceptor" dataIndex="elac" key="elac" hidden={!checkedListMetabolic.includes("elac")} {...getColumnSearchProps("elac")}/>
    <Column title="Temperature optimum" dataIndex="temo" key="temo" hidden={!checkedListMetabolic.includes("temo")} {...getColumnSearchProps("temo")}/>
    <Column title="Lowest temperature" dataIndex="teml" key="teml" hidden={!checkedListMetabolic.includes("teml")} {...getColumnSearchProps("teml")}/>
    <Column title="Highest temperature" dataIndex="temh" key="temh" hidden={!checkedListMetabolic.includes("temh")} {...getColumnSearchProps("temh")}/>
    <Column title="Temperature category" dataIndex="temc" key="temc" hidden={!checkedListMetabolic.includes("temc")} {...getColumnSearchProps("temc")}/>
    <Column title="pH optimum" dataIndex="phop" key="phop" hidden={!checkedListMetabolic.includes("phop")} {...getColumnSearchProps("phop")}/>
    <Column title="Lowest pH" dataIndex="phlo" key="phlo" hidden={!checkedListMetabolic.includes("phlo")} {...getColumnSearchProps("phlo")}/>
    <Column title="Highest pH" dataIndex="phhi" key="phhi" hidden={!checkedListMetabolic.includes("phhi")} {...getColumnSearchProps("phhi")}/>
    <Column title="Salinity optimum" dataIndex="salo" key="salo" hidden={!checkedListMetabolic.includes("salo")} {...getColumnSearchProps("salo")}/>
    <Column title="Lowest NaCl concentration" dataIndex="sall" key="sall" hidden={!checkedListMetabolic.includes("sall")} {...getColumnSearchProps("sall")}/>
    <Column title="Highest NaCl concentration" dataIndex="salh" key="salh" hidden={!checkedListMetabolic.includes("salh")} {...getColumnSearchProps("salh")}/>
    <Column title="Salinity category" dataIndex="salc" key="salc" hidden={!checkedListMetabolic.includes("salc")} {...getColumnSearchProps("salc")}/>
    </ColumnGroup>
    <ColumnGroup title="Other infomration details on the organism" hidden={hidden['Organism']}>
    <Column title="Biosafety level" dataIndex="bios" key="bios" hidden={!checkedListOrganism.includes("bios")} {...getColumnSearchProps("bios")}/>
    <Column title="Habitat" dataIndex="habt" key="habt" hidden={!checkedListOrganism.includes("habt")} {...getColumnSearchProps("habt")}/>
    <Column title="Biotic relationship" dataIndex="bior" key="bior" hidden={!checkedListOrganism.includes("bior")} {...getColumnSearchProps("bior")}/>
    <Column title="Symbiosis with the host" dataIndex="host" key="host" hidden={!checkedListOrganism.includes("host")} {...getColumnSearchProps("host")}/>
    <Column title="Known pathogenicity" dataIndex="path" key="path" hidden={!checkedListOrganism.includes("path")} {...getColumnSearchProps("path")}/>
    <Column title="Miscellaneous" dataIndex="extr" key="extr" hidden={!checkedListOrganism.includes("extr")} {...getColumnSearchProps("extr")}/>
    </ColumnGroup>
    <ColumnGroup title="Sequencing information" hidden={hidden['Sequencing']}>
    <Column title="Sequenced fraction" dataIndex="sfrac" key="sfrac" hidden={!checkedListSequencing.includes("sfrac")} {...getColumnSearchProps("sfrac")}/>
    <Column title="Sequencing depth" dataIndex="seqdepth" key="seqdepth" hidden={!checkedListSequencing.includes("seqdepth")} {...getColumnSearchProps("seqdepth")}/>
    <Column title="Target nucleic acid" dataIndex="target" key="target" hidden={!checkedListSequencing.includes("target")} {...getColumnSearchProps("target")}/>
    <Column title="Raw reads number" dataIndex="rreadsnum" key="rreadsnum" hidden={!checkedListSequencing.includes("rreadsnum")} {...getColumnSearchProps("rreadsnum")}/>
    <Column title="Trimmed reads number" dataIndex="treadsnum" key="treadsnum" hidden={!checkedListSequencing.includes("treadsnum")} {...getColumnSearchProps("treadsnum")}/>
    <Column title="Coverage" dataIndex="coverage" key="coverage" hidden={!checkedListSequencing.includes("coverage")} {...getColumnSearchProps("coverage")}/>
    <Column title="Assembly size" dataIndex="asize" key="asize" hidden={!checkedListSequencing.includes("asize")} {...getColumnSearchProps("asize")}/>
    <Column title="Number of contigs" dataIndex="contignumber" key="contignumber" hidden={!checkedListSequencing.includes("contignumber")} {...getColumnSearchProps("contignumber")}/>
    <Column title="235 rRNA gene accession number" dataIndex="twentythreesr" key="twentythreesr" hidden={!checkedListSequencing.includes("twentythreesr")} {...getColumnSearchProps("twentythreesr")}/>
    <Column title="Nagoya Protocol" dataIndex="nagoya" key="nagoya" hidden={!checkedListSequencing.includes("nagoya")} {...getColumnSearchProps("nagoya")}/>
    <Column title="Sequrl" dataIndex="sequrl" key="sequrl" hidden={!checkedListSequencing.includes("sequrl")} {...getColumnSearchProps("sequrl")}/>
    <Column title="Strain collection number" dataIndex="strccol" key="strccol" hidden={!checkedListSequencing.includes("strccol")} {...getColumnSearchProps("strccol")}/>
    </ColumnGroup>
    <ColumnGroup title="Files" hidden={hidden['Files']}>
    <Column title="Files" dataIndex="files" key="files" hidden={!checkedListFiles.includes("files")} {...getColumnSearchProps("files")}/>
    </ColumnGroup>
      </Table>

    )

}

export default DataTable