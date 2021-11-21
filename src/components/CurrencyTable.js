import React, { useState } from 'react';
import CurrencyTableHeader from './sub-Components/CurrencyTableHeader';
import CurrencyTableRow from './sub-Components/CurrencyTableRow';
import '../css/bootstrap.min.css';
import '../css/CurrencyTable.css';
import TabContainer from './sub-Components/TabContainer';
import LoadingInput from './LoadingInput';
import RenderChart from './sub-Components/RenderChart';

function CurrencyTable(props) {
  const { currencyList, currencyInput, baseCurrency, toCurrency } = props;

  const [currentTab, setCurrentTab] = useState('CHART');

  const setTab = (tab) => {
    setCurrentTab(tab);
  }
  let content = <LoadingInput />;
  if (currentTab === 'CHART') {
    content = (
      <React.Fragment>
        <CurrencyTableHeader />
        <div className="currency-list">
          <CurrencyTableRow currencyList={currencyList} currencyInput={currencyInput} />
        </div>
      </React.Fragment>
    );
  }

  if (currentTab === 'GRAPH') {
    content = (
      <React.Fragment>
        <div className="chart">
          <RenderChart baseCurrency={baseCurrency} toCurrency={toCurrency} />
        </div>
      </React.Fragment>
    )
  }

  return (
    <React.Fragment>

      <TabContainer toggleTab={setTab} />
      <div className='currency-table container-fluid'>
        {content}
      </div>
    </React.Fragment>
  )
}

export default CurrencyTable;