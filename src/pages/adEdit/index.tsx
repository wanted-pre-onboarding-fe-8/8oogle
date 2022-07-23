import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ICampaignItem } from '../../types/campaign';
import AdForm from '../../components/adForm/AdForm';
import { useUpdateCampaign } from '../../queries/queryRequest';
import styled from 'styled-components';

function AdEdit() {
  const FORM_TITLE = '광고수정';
  const location = useLocation();
  const campaign = location.state as ICampaignItem;
  const navigate = useNavigate();
  const hasState = location.state;

  const mutateAsync = useUpdateCampaign(campaign.id);

  React.useEffect(() => {
    if (!hasState) {
      navigate('/ad');
    }
  }, []);

  const handleSubmit = async (campaign: ICampaignItem) => {
    await mutateAsync(campaign);
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
