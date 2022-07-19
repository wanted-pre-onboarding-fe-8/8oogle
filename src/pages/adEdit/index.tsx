import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ICampaignItem } from '../../types/campaign';
import AdForm from '../../components/adForm/AdForm';

function AdEdit() {
  const location = useLocation();
  const navigate = useNavigate();
  const hasNoState = !location.state;
  React.useEffect(() => {
    if (hasNoState) {
      navigate('/ad');
    }
  }, []);
  const campaign = location.state as ICampaignItem;

  return <AdForm campaignItem={campaign} title='광고수정' />;
}

export default AdEdit;
