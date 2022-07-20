import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useQueryClient } from 'react-query';
import { ICampaignItem } from '../../types/campaign';
import AdForm from '../../components/adForm/AdForm';
import { updateCampaign, invalidateQueriesByName } from '../../queries/queryRequest';
import { CAMPAIGN_CONSTANTS } from '../../utils/constants/data';

function AdEdit() {
  const FORM_TITLE = '광고수정';
  const location = useLocation();
  const campaign = location.state as ICampaignItem;
  const navigate = useNavigate();
  const hasState = location.state;
  const { mutateAsync } = updateCampaign(campaign.id);
  const queryClient = useQueryClient();

  React.useEffect(() => {
    if (!hasState) {
      navigate('/ad');
    }
  }, []);

  const handleSubmit = async (campaign: ICampaignItem) => {
    await mutateAsync(campaign);
    await invalidateQueriesByName(queryClient, CAMPAIGN_CONSTANTS.CAMPAIGN);
    navigate('/ad');
  };

  return (
    <>{hasState && <AdForm campaignItem={campaign} title={FORM_TITLE} onSubmit={handleSubmit} />}</>
  );
}

export default AdEdit;
