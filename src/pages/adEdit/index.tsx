import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ICampaignItem } from '../../types/campaign';
import AdForm from '../../components/adForm/AdForm';

function AdEdit() {
  const FORM_TITLE = '광고수정';
  const location = useLocation();
  const navigate = useNavigate();
  const hasNoState = !location.state;
  React.useEffect(() => {
    if (hasNoState) {
      navigate('/ad');
    }
  }, []);
  const campaign = location.state as ICampaignItem;

  return <AdForm campaignItem={campaign} title={FORM_TITLE} />;
}

export default AdEdit;
