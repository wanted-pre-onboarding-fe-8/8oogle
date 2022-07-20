import React from 'react';
import Indicators from './Indicators';
import { IOverallItems, IOverallItem } from '../../types/overall';

interface IDataListType {
  ListType: number[];
}

interface IIntegratedAdProps {
  prevOverall: IOverallItems;
  currOverall: IOverallItems;
}

function IntegratedAd({ prevOverall, currOverall }: IIntegratedAdProps): JSX.Element {
  const roasList: IDataListType['ListType'] = [];
  const costList: IDataListType['ListType'] = [];
  const impList: IDataListType['ListType'] = [];
  const clickList: IDataListType['ListType'] = [];
  const cvrList: IDataListType['ListType'] = [];
  const convValueList: IDataListType['ListType'] = [];

  const prevRoasList: IDataListType['ListType'] = [];
  const prevCostList: IDataListType['ListType'] = [];
  const prevImpList: IDataListType['ListType'] = [];
  const prevClickList: IDataListType['ListType'] = [];
  const prevCvrList: IDataListType['ListType'] = [];
  const prevConvValue: IDataListType['ListType'] = [];

  currOverall.forEach((data: IOverallItem) => {
    roasList.push(data.roas);
    costList.push(data.cost);
    impList.push(data.imp);
    clickList.push(data.click);
    cvrList.push(data.cvr);
    convValueList.push(data.convValue);
  });

  prevOverall.forEach((data: IOverallItem) => {
    prevRoasList.push(data.roas);
    prevCostList.push(data.cost);
    prevImpList.push(data.imp);
    prevClickList.push(data.click);
    prevCvrList.push(data.cvr);
    prevConvValue.push(data.convValue);
  });

  return (
    <>
      <Indicators
        roasList={roasList}
        costList={costList}
        impList={impList}
        clickList={clickList}
        cvrList={cvrList}
        convValue={convValueList}
        prevRoasList={prevRoasList}
        prevCostList={prevCostList}
        prevImpList={prevImpList}
        prevClickList={prevClickList}
        prevCvrList={prevCvrList}
        prevConvValue={prevConvValue}
      />
    </>
  );
}

export default IntegratedAd;
