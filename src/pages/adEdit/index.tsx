import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useQueryClient } from 'react-query';
import { ICampaignItem } from '../../types/campaign';
import AdForm from '../../components/adForm/AdForm';
import { updateCampaign, invalidateQueriesByName } from '../../queries/queryRequest';
import { CAMPAIGN_CONSTANTS } from '../../utils/constants/data';
import styled from 'styled-components';

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
    <Container>
      {hasState ? (
        <AdForm campaignItem={campaign} title={FORM_TITLE} onSubmit={handleSubmit} />
      ) : (
        <></>
      )}
    </Container>
  );
}

export default AdEdit;

const Container = styled.main`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;
