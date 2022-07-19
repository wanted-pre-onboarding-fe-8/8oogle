import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ICampaignItem } from '../../types/campaign';
import AdForm from '../../components/adForm/AdForm';
// import { updateCampaign } from '../../queries/queryRequest';
import axios from 'axios';

function AdEdit() {
  const FORM_TITLE = '광고수정';
  const location = useLocation();
  const campaign = location.state as ICampaignItem;
  const navigate = useNavigate();
  const hasNoState = !location.state;

  React.useEffect(() => {
    if (hasNoState) {
      navigate('/ad');
    }
  }, []);

  const handleSubmit = (campaign: ICampaignItem) => {
    // TODO: invalid-hook-call 이슈 팀원들에게 리뷰 후 제거
    // updateCampaign(campaign.id, campaign);
    axios.put(`http://localhost:8000/campaign/${campaign.id}`, campaign);
    navigate('/ad');
  };

  return <AdForm campaignItem={campaign} title={FORM_TITLE} onSubmit={handleSubmit} />;
}

export default AdEdit;
